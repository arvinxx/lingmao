const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './style/themes/override.less'), 'utf8'));

module.exports = themeVariables;
