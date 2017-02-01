#!/usr/bin/env node

const pkg = require('../package.json');
const cwebp = require('../lib/cwebp');
const argv = process.argv.slice(2);
const argvs = require('minimist')(argv);
// console.log(argv);

function help() {
    console.log(pkg.description);
    console.log('\r\n USEAGE: \r\n\tcwebp-batch --in img-folder --out webp-folder <-q 75>');
}

function formatArgv() {
    if (argvs.version || argvs.v) {
        console.log(pkg.version);
        return;
    }

    if (argvs.h || argvs.help || argv.length < 4 || argv[0] !== '--in' || argv[2] !== '--out') {
        help();
        return;
    }

    const options = {};
    const len = argv.length;
    let i = 4;
    let key;

    for (;i < len; i++) {
        if (0 === argv[i].indexOf('-')) {
            key = argv[i].split('-')[1];
            options[key] = '';
        } else if (options[key] !== undefined) {
            if (options[key]) {
                options[key] += ' ' + argv[i];
            } else {
                options[key] = argv[i];
            }
        }
    }

    return options;
}

const opts = formatArgv();
// console.log(opts);

if (opts) {
    cwebp(argv[1], argv[3], opts);
}