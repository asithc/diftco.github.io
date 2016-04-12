
/**
 * Browser lang
 */

var defaultLanguage = 'es';

module.exports = function() {
  return (defaultLanguage || localStorage.getItem('lang') || navigator.userLanguage || navigator.language).split('-')[0] || defaultLanguage;
};
