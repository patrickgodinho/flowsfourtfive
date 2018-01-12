'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _example = require('./actions/example.action');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  EXAMPLE_FLOW: {
    actions: [{
      name: 'Example Action',
      conditions: [],
      action: _example2.default
    }]
  }
};