
/**
 * Browser lang
 */

var defaultLanguage = 'es';

module.exports = function() {
  return (localStorage.getItem('lang') || navigator.userLanguage || navigator.language).split('-')[0] || defaultLanguage;
};
