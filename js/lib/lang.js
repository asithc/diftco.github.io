
/**
 * Browser lang
 */

var defaultLanguage = 'en';

module.exports = function() {
  return (localStorage.getItem('lang') || navigator.userLanguage || navigator.language).split('-')[0] || defaultLanguage;
};
