require('regenerator-runtime/runtime');
require('jest-expect-message');
require('babel-polyfill');
const jsdom = require('jsdom');

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const dom = new jsdom.JSDOM(documentHTML, { pretendToBeVisual: true });

global.document = dom.window.document;
global.window = dom.window;
global.window.scroll = jest.fn();
