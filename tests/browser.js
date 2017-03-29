require('babel-register')();

var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document', 'fetch'];

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
  exposedProperties.push(property);
  global[property] = document.defaultView[property];
}
});

global.navigator = {
  userAgent: 'node.js'
};

require('whatwg-fetch')
global.td = require('testdouble')
global.fetch = self.fetch
global.window.fetch = self.fetch

/*

console.log('self', self.fetch)
console.info('this', self.window.fetch, self.fetch)


*/
