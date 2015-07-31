
var _ = require('lodash');

/**
 * All data object
 */

var data = {
  // HACK : para que vengan mezclados siempre igual
  team: _.shuffle(require('./team')),
  projects: require('./projects'),
  nav: require('./nav'),
  content: require('./content')
};

function getByLang(o, lang) {
  var r = {};

  if (o.i18n) {
    return o[lang];
  }

  for (var key in o) {
    var d = o[key];

    if (_.isArray(d)) {
      r[key] = d.map(function(item) {
        return getByLang(item, lang);
      });
    } else if (typeof d === 'object') {
      r[key] = getByLang(d, lang);
    } else {
      r[key] = d;
    }
  }

  return r;
}

module.exports = function(lang) {
  var r = getByLang(data, lang);

  r.lang = lang;
  
  return r;
};

