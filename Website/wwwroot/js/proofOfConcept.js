const log = console.log;
const err = console.error;
const tbl = console.table;
log('Proof-of-Concept Script Loaded');
log('Here are the constants for feedback in the browser console:')
tbl({ log, err, tbl });
