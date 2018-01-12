"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _example = require("./EXAMPLE_STEP/actions/example.action");

var _example2 = _interopRequireDefault(_example);

var _init = require("./INIT_STEP/action/init.action");

var _init2 = _interopRequireDefault(_init);

var _exception = require("./EXAMPLE_STEP/actions/exception.action");

var _exception2 = _interopRequireDefault(_exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  name: "EXAMPLE_STEP",
  init: _init2.default,
  actions: [{
    name: "Example Action",
    conditions: [],
    action: example
  }],
  exception: _exception2.default
}];