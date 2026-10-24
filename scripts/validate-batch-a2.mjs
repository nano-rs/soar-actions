#!/usr/bin/env node
// Shared validator comes from batch=A (1/3), soar-actions PR #4.
import path from 'node:path';
import { officialHosts, validateNative } from './validate-packs.mjs';
Object.assign(officialHosts, {
  urlhaus: ['urlhaus-api.abuse.ch', 'urlhaus.abuse.ch'],
  threatfox: ['threatfox.abuse.ch'],
  malwarebazaar: ['bazaar.abuse.ch'],
  recorded_future: ['docs.recordedfuture.com'],
  ipinfo: ['ipinfo.io'],
  hybrid_analysis: ['www.hybrid-analysis.com', 'hybrid-analysis.com'],
});
if (process.argv.length !== 6) throw new Error('usage: CONTENT PACKS_CSV NATIVE_CONVERTER COMMIT');
console.log(JSON.stringify(validateNative(path.resolve(process.argv[2]), process.argv[3].split(','), path.resolve(process.argv[4]), process.argv[5])));
