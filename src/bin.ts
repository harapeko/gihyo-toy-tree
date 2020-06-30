#!/usr/bin/env node
import { main } from "./";

const code = main(process.argv.slice(2), console.log, console.error);

// 戻り値が終了コードになる
process.exit(code);
