process.env.NODE_PATH = "./src";
require("module").Module._initPaths();
require('ts-node/register');

const glob = require('glob');

glob('./test/**/*.ts', (err, files) => {
    files.forEach(file => require(file));
});
