#!/usr/bin/env node
// Offline pack/evidence policy and production converter replay. No vendor IO.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const officialHosts = {
  virustotal: ['docs.virustotal.com'],
  abuseipdb: ['docs.abuseipdb.com'],
  urlscan: ['docs.urlscan.io', 'urlscan.io'],
  greynoise: ['docs.greynoise.io'],
  shodan: ['developer.shodan.io', 'help.shodan.io'],
  alienvault_otx: ['otx.alienvault.com'],
};
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
const sha = value => createHash('sha256').update(value).digest('hex');
const sameKeys = (a, b) => assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort());
const isType = (value, kind) => ({
  string: () => typeof value === 'string',
  integer: () => Number.isSafeInteger(value),
  number: () => typeof value === 'number' && Number.isFinite(value),
  boolean: () => typeof value === 'boolean',
  array: () => Array.isArray(value),
  object: () => value !== null && typeof value === 'object' && !Array.isArray(value),
}[kind]?.() ?? false);
const official = (name, address) => {
  const url = new URL(address);
  assert.equal(url.protocol, 'https:');
  assert.ok(officialHosts[name]?.includes(url.hostname), `${name}: evidence must be an official vendor reference`);
};

export function validateStructure(content, names) {
  let actions = 0, fixtures = 0, unsupported = 0;
  for (const name of names) {
    assert.match(name, /^[a-z0-9_]+$/);
    const directory = path.join(content, 'packs', name);
    for (const file of ['NOTICE', 'EVIDENCE.md', 'evidence.json']) assert.ok(fs.statSync(path.join(directory, file)).isFile());
    assert.match(fs.readFileSync(path.join(directory, 'NOTICE'), 'utf8'), /Action selection informed by demisto\/content \(MIT\)/);
    const reportFile = path.join(directory, 'unsupported.json');
    if (fs.existsSync(reportFile)) {
      for (const entry of Object.values(read(reportFile))) {
        assert.ok(entry.reason.length > 20);
        assert.ok(entry.documentation.length > 0);
        entry.documentation.forEach(url => official(name, url));
        unsupported++;
      }
    }
    const definition = path.join(directory, 'pack.yaml');
    if (!fs.existsSync(definition)) {
      assert.ok(fs.existsSync(reportFile), `${name}: no executable or unsupported report`);
      continue;
    }
    const pack = read(definition), evidence = read(path.join(directory, 'evidence.json'));
    assert.equal(pack.name, name);
    assert.equal(pack.kind, 'action_pack');
    assert.equal(pack.version, 1);
    assert.equal(pack.source.kind, 'nano_authored');
    const used = new Set();
    for (const [actionName, action] of Object.entries(pack.actions)) {
      // Lookup packs admit explicit reads with a complete JSON output contract.
      assert.equal(action.effect, 'read');
      assert.ok(Object.keys(action.outputs).length > 0);
      sameKeys(action.outputs, action.output_types ?? {});
      assert.ok(action.fixtures.length > 0);
      for (const file of action.fixtures) {
        assert.match(file, /^fixtures\/[a-z0-9_]+\.json$/);
        assert.ok(!used.has(file)); used.add(file);
        const recording = read(path.join(directory, file));
        assert.equal(recording.action, actionName);
        assert.ok(!recording.credentials && !recording.credential);
        for (const credential of pack.credentials) assert.ok(!(credential.name in recording.config));
        sameKeys(recording.outputs, action.output_types);
        for (const [key, kind] of Object.entries(action.output_types)) assert.ok(isType(recording.outputs[key], kind), `${name}/${actionName}/${key}: invalid fixture output type`);
        const proof = evidence.fixtures.filter(item => item.fixture === file);
        assert.equal(proof.length, 1); const entry = proof[0];
        official(name, entry.url); official(name, entry.document_url);
        assert.match(entry.document_sha256, /^[a-f0-9]{64}$/);
        for (const doc of entry.supporting_documents ?? []) { official(name, doc.url); assert.match(doc.sha256, /^[a-f0-9]{64}$/); }
        assert.equal(recording.source, entry.url);
        assert.equal(recording.request_evidence, 'independent_http_mock');
        assert.equal(recording.exchanges.length, 1);
        assert.deepEqual(recording.exchanges[0].request, entry.request);
        assert.deepEqual(recording.exchanges[0].response, entry.response);
        const expectedAuth = pack.auth.type === 'api_key_query' ? [pack.auth.param] : [];
        assert.deepEqual(entry.request.auth_query_keys ?? [], expectedAuth);
        assert.ok(action.steps[0].expect.status.includes(entry.response.status));
        fixtures++;
      }
      actions++;
    }
    assert.equal(evidence.fixtures.length, used.size, `${name}: evidence must cover exactly the fixtures`);
  }
  return { packs: names.length, actions, fixtures, unsupported };
}

export function validateNative(content, names, binary, commit) {
  assert.match(commit, /^[a-f0-9]{40}$/);
  const counts = validateStructure(content, names);
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'nan4479-native-'));
  const converterId = sha(fs.readFileSync(binary));
  let negatives = 0;
  try {
    const subset = path.join(temporary, 'source'); fs.mkdirSync(path.join(subset, 'packs'), { recursive: true });
    for (const name of names) fs.cpSync(path.join(content, 'packs', name), path.join(subset, 'packs', name), { recursive: true, dereference: false });
    const invoke = (source, label, reject = false) => {
      const out = path.join(temporary, label + '-bundle');
      let status = 0, output;
      try { output = execFileSync(binary, ['authored-run', '--content', source, '--commit', commit, '--out', out, '--converter-id', converterId], { encoding: 'utf8', timeout: 120_000, maxBuffer: 4 * 1024 * 1024 }); }
      catch (error) {
        assert.equal(error.signal, null, `${label}: native validator must not crash or time out`);
        status = error.status; output = String(error.stdout ?? '') + String(error.stderr ?? '');
      }
      assert.notEqual(status, 101, 'a Rust panic is not a valid rejection');
      if (reject) {
        assert.notEqual(status, 0, `native validator accepted ${label}`);
        assert.match(output, /validation|invalid|replay/i);
        negatives++;
      } else {
        assert.equal(status, 0, output);
        execFileSync(binary, ['check', '--bundle', out], { encoding: 'utf8', timeout: 120_000 });
      }
      return out;
    };
    const baseline = invoke(subset, 'baseline');
    let admitted = 0;
    for (const name of names) {
      const report = read(path.join(baseline, name, 'report.json'));
      for (const action of report.actions) {
        assert.ok(['auto', 'unsupported'].includes(action.status));
        if (action.status === 'auto') admitted++;
      }
    }
    assert.equal(admitted, counts.actions);
    const supported = names.filter(name => fs.existsSync(path.join(subset, 'packs', name, 'pack.yaml')));
    for (const name of supported) {
      const original = read(path.join(subset, 'packs', name, 'pack.yaml'));
      const ipAction = Object.entries(original.actions).find(([, action]) => action.inputs.some(input => input.type === 'ip'));
      const kinds = ['foreign_host', 'invalid_input', 'upstream_error', 'redirect', 'body_error', 'wrong_output_type', 'undeclared_credential', 'incomplete_contract', 'missing_inverse'];
      if (ipAction) kinds.push('internal_ip');
      for (const kind of kinds) {
        const candidate = path.join(temporary, name + '-' + kind);
        fs.mkdirSync(path.join(candidate, 'packs'), { recursive: true });
        fs.cpSync(path.join(subset, 'packs', name), path.join(candidate, 'packs', name), { recursive: true });
        const root = path.join(candidate, 'packs', name), file = path.join(root, 'pack.yaml');
        const pack = read(file), actionName = kind === 'internal_ip' ? ipAction[0] : Object.keys(pack.actions)[0], action = pack.actions[actionName];
        const fixtureFile = path.join(root, action.fixtures[0]), fixture = read(fixtureFile);
        if (kind === 'foreign_host') action.steps[0].request.url = 'https://foreign.example.net/outside';
        if (kind === 'invalid_input') fixture.inputs[action.inputs.find(input => input.required).name] = { unexpected: 'object' };
        if (kind === 'internal_ip') fixture.inputs[action.inputs.find(input => input.type === 'ip').name] = '10.0.0.1';
        if (kind === 'upstream_error') fixture.exchanges[0].response.status = 500;
        if (kind === 'redirect') { fixture.exchanges[0].response.status = 302; fixture.exchanges[0].response.headers = { location: 'https://foreign.example.net/outside' }; }
        if (kind === 'body_error') fixture.exchanges[0].response.body = { error: 'Vendor refused the lookup' };
        if (kind === 'missing_inverse') { action.effect = 'destructive'; delete action.rollback; delete action.rollback_unavailable; }
        if (kind === 'undeclared_credential') pack.auth.credential = 'UNDECLARED_KEY';
        if (kind === 'incomplete_contract') delete action.output_types[Object.keys(action.outputs)[0]];
        if (kind === 'wrong_output_type') {
          const key = Object.keys(action.outputs).find(key => /^steps\.lookup\./.test(action.outputs[key]));
          assert.ok(key);
          const segments = action.outputs[key].slice('steps.lookup.'.length).split('.');
          let target = fixture.exchanges[0].response.body;
          for (const segment of segments.slice(0, -1)) target = target[segment];
          const wrong = action.output_types[key] === 'string' ? 123 : 'wrong-type';
          target[segments.at(-1)] = wrong;
          // Align expected output so native type enforcement must reject it.
          fixture.outputs[key] = wrong;
        }
        write(file, pack); write(fixtureFile, fixture);
        invoke(candidate, name + '-' + kind, true);
      }
    }
    return { ...counts, native_negatives: negatives, commit, converter_id: converterId };
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  assert.equal(process.argv.length, 6, 'usage: node scripts/validate-packs.mjs CONTENT PACKS_CSV NATIVE_CONVERTER COMMIT');
  console.log(JSON.stringify(validateNative(path.resolve(process.argv[2]), process.argv[3].split(','), path.resolve(process.argv[4]), process.argv[5])));
}
