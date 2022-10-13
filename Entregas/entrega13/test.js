const parseArgs = require('minimist');


args = parseArgs(process.argv.slice(2),{default:{port:8080}});

console.log(process);