var Reflux = require('reflux');

module.exports = Reflux.createActions(
  [
    'changeLang', 
    'setProjectName',
    'unsetProjectName',
    'changeSection',
    'navigate'
  ]
);

