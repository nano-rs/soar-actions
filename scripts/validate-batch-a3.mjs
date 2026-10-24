#!/usr/bin/env node
// Shared validator comes from batch=A (1/3), soar-actions PR #4.
import path from 'node:path';
import { officialHosts, validateNative } from './validate-packs.mjs';
Object.assign(officialHosts, {
  have_i_been_pwned: ['haveibeenpwned.com'],
  misp: ['www.misp-project.org', 'raw.githubusercontent.com'],
});
if (process.argv.length !== 6) throw new Error('usage: CONTENT PACKS_CSV NATIVE_CONVERTER COMMIT');
console.log(JSON.stringify(validateNative(path.resolve(process.argv[2]), process.argv[3].split(','), path.resolve(process.argv[4]), process.argv[5])));
