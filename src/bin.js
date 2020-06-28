#!/usr/bin/env node
const { main } = require('./');

const code = main(
    process.argv.slice(2),
    console.log,
    console.error,
);

// 戻り値が終了コードになる
process.exit(code);
