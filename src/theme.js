// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const path = require('path');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './style/themes/override.less'), 'utf8'));
module.exports = themeVariables;

// module.exports = {
//   '@primary-color': '#439afc',
//   'card-actions-background': '#f5f8fa',
// };
