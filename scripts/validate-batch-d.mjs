#!/usr/bin/env node
// Offline evidence/effect gate. Native rendering/replay runs in private nanosiem.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
assert.equal(process.argv.length, 3, 'usage: node scripts/validate-batch-d.mjs review/batch-d-partN.json');
const policy = read(process.argv[2]);
const types = new Set(['string','integer','number','boolean','array','object']);
const inputTypes = new Set(['string','int','bool','ip','domain','hash','url','email','string_list']);
let actions = 0, fixtures = 0, unsupported = 0;
for (const [name, reviewed] of Object.entries(policy.vendors)) {
  const directory = path.join('packs', name);
  assert.match(fs.readFileSync(path.join(directory, 'NOTICE'), 'utf8'), /Action selection informed by demisto\/content \(MIT\)/);
  const official = url => assert.ok(reviewed.document_prefixes.some(p => url.startsWith(p)), `${name}: non-vendor evidence: ${url}`);
  const absent = path.join(directory, 'unsupported.json');
  const refusals = fs.existsSync(absent) ? read(absent) : {};
  assert.deepEqual(Object.keys(refusals).sort(), [...reviewed.unsupported].sort());
  for (const item of Object.values(refusals)) {
    assert.ok(item.reason.length > 30);
    assert.ok(item.documentation.length);
    item.documentation.forEach(official);
    unsupported++;
  }
  const definition = path.join(directory, 'pack.yaml');
  if (!Object.keys(reviewed.actions).length) {
    assert.ok(!fs.existsSync(definition), `${name}: unsupported-only vendor must not ship a placeholder pack`);
    continue;
  }
  const pack = read(definition), evidence = read(path.join(directory, 'evidence.json'));
  assert.equal(pack.name, name);
  assert.equal(pack.source.kind, 'nano_authored');
  assert.deepEqual(Object.keys(pack.actions).sort(), Object.keys(reviewed.actions).sort());
  for (const [operation, action] of Object.entries(pack.actions)) {
    actions++;
    assert.equal(action.effect, reviewed.actions[operation]);
    action.inputs.forEach(input => assert.ok(inputTypes.has(input.type), `${name}/${operation}: unsupported input type ${input.type}`));
    assert.equal(action.idempotent, action.effect === 'read');
    assert.deepEqual(Object.keys(action.outputs).sort(), Object.keys(action.output_types).sort());
    Object.values(action.output_types).forEach(t => assert.ok(types.has(t)));
    if (action.effect !== 'read') {
      assert.equal(action.effect, 'destructive');
      assert.ok(action.rollback || (action.rollback_unavailable && action.rollback_unavailable_reason.length > 30));
    }
    if (action.rollback) {
      assert.ok(pack.actions[action.rollback], `${name}: missing restoration action`);
      if (name !== 'salesforce') assert.equal(pack.actions[action.rollback].rollback, operation);
      assert.equal(pack.actions[action.rollback].effect, 'destructive');
    }
    if (name === 'microsoft_intune' && action.effect === 'destructive') {
      assert.equal(action.steps[0].request.method, 'GET');
      assert.deepEqual(action.steps[0].expect.input_equals, {id:'device_id'});
      assert.match(action.steps[1].request.url, /\{\{steps\.identity\.id\}\}/);
      assert.ok(!action.steps[1].request.url.includes('input.device_id'));
    }
    if (name === 'jamf_pro' && action.effect === 'destructive') {
      assert.equal(action.steps[0].request.method, 'GET');
      assert.deepEqual(action.steps[0].expect.input_equals, {id:'computer_id','general.managementId':'management_id'});
      assert.equal(action.steps[1].request.json.clientData[0].managementId, '{{steps.identity.general.managementId}}');
    }
    if (name === 'salesforce' && ['freeze_user','unfreeze_user'].includes(operation)) {
      assert.equal(action.rollback, 'restore_user_login_state');
      assert.equal(action.outputs.prior_is_frozen, 'steps.current.IsFrozen');
      assert.deepEqual(action.steps[0].expect.fields, {IsFrozen:operation === 'unfreeze_user'});
    }
    if (name === 'salesforce' && operation === 'restore_user_login_state') {
      assert.equal(action.steps[1].request.json.IsFrozen, '{{input.prior_is_frozen}}');
      assert.ok(action.inputs.some(i => i.name === 'prior_is_frozen' && i.type === 'bool' && i.required));
    }
    assert.ok(action.fixtures.length);
    for (const fixture of action.fixtures) {
      assert.match(fixture, /^fixtures\/[a-z0-9_]+\.json$/);
      const record = read(path.join(directory, fixture));
      const proof = evidence.fixtures.find(p => p.fixture === fixture);
      assert.ok(proof);
      official(proof.url); official(proof.document_url);
      assert.match(proof.document_sha256, /^[a-f0-9]{64}$/);
      assert.equal(record.action, operation);
      assert.equal(record.source, proof.url);
      assert.equal(record.request_evidence, 'independent_http_mock');
      const prerequisites = proof.prerequisites ?? [];
      assert.equal(record.exchanges.length, 1 + prerequisites.length + (evidence.authentication ? 1 : 0));
      prerequisites.forEach((read, index) => {
        official(read.url); official(read.document_url);
        assert.match(read.document_sha256, /^[a-f0-9]{64}$/);
        assert.equal(read.request.method, 'GET');
        const exchange = record.exchanges[index + (evidence.authentication ? 1 : 0)];
        assert.deepEqual(exchange.request, read.request);
        assert.deepEqual(exchange.response, read.response);
      });
      const call = record.exchanges.at(-1);
      assert.deepEqual(call.request, proof.request);
      assert.deepEqual(call.response, proof.response);
      if (evidence.authentication) {
        const auth = evidence.authentication;
        official(auth.document_url);
        assert.match(auth.document_sha256, /^[a-f0-9]{64}$/);
        assert.deepEqual(record.exchanges[0].request, auth.request);
        assert.deepEqual(record.exchanges[0].response, auth.response);
      }
      fixtures++;
    }
  }
}
console.log(JSON.stringify({batch:policy.batch, part:policy.part, vendors:Object.keys(policy.vendors).length, actions, fixtures, unsupported}));
