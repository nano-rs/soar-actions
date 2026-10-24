#!/usr/bin/env node
// No vendor shapes live here: structured actions must delegate the entire body.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const vendors = { slack: 'slack', microsoft_teams: 'teams', pagerduty: 'pagerduty', webhook: 'generic' };
for (const [pack, vendor] of Object.entries(vendors)) {
  const spec = JSON.parse(fs.readFileSync(`packs/${pack}/pack.yaml`, 'utf8'));
  const action = spec.actions.notify_event;
  assert.equal(action.effect, 'write');
  assert.equal(action.idempotent, false);
  assert.equal(action.steps.length, 1);
  assert.deepEqual(action.inputs.find(i => i.name === 'notification'), { name: 'notification', type: 'notification', required: true });
  const request = action.steps[0].request;
  assert.equal(request.json, undefined);
  assert.equal(request.form, undefined);
  const destination = pack === 'slack' ? 'input.channel_id' : '""';
  assert.equal(request.json_text, `{{notification_body "${vendor}" input.notification ${destination}}}`);
  assert.deepEqual(action.fixtures, ['fixtures/notify_event.json']);
  const evidence = JSON.parse(fs.readFileSync(`packs/${pack}/evidence.json`, 'utf8'));
  for (const [name, candidate] of Object.entries(spec.actions)) {
    for (const file of candidate.fixtures) {
      const recording = JSON.parse(fs.readFileSync(`packs/${pack}/${file}`, 'utf8'));
      const proof = evidence.fixtures.find(f => f.fixture === file);
      assert.ok(proof, `${pack}/${name}: missing evidence`);
      assert.equal(recording.action, name);
      assert.equal(recording.source, proof.url);
      assert.match(proof.document_sha256, /^[a-f0-9]{64}$/);
      assert.deepEqual(recording.exchanges[0].request, proof.request);
      assert.deepEqual(recording.exchanges[0].response, proof.response);
    }
  }
  console.log(`PASS ${pack}: entire canonical body comes from the production formatter`);
}
