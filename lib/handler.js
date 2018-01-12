"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _context = require("./flows/context");

var _context2 = _interopRequireDefault(_context);

var _init = require("./flows/EXAMPLE_FLOW/INIT_STEP/action/init.action");

var _init2 = _interopRequireDefault(_init);

var _config = require("./flows/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT = "INIT_FLOW";

var validator = function validator(step) {
  return step.conditions ? (0, _ramda.allPass)(step.conditions)(step) : true;
};

var availableAction = function availableAction(userFlow, step) {
  return (0, _ramda.filter)(validator, userFlow[step].actions)[0];
};

var isMenuFlow = function isMenuFlow(message) {
  var postback = (0, _ramda.has)("postback", message);
  var isMenu = postback ? (0, _ramda.has)(message.postback, _config2.default) : false;

  return isMenu;
};

exports.default = function (message, fbId) {
  var user = _context2.default.userId ? _context2.default.userId : (0, _context.User)(fbId);

  var flow = isMenuFlow(message) ? _config2.default[message.postback] : _config2.default[user.flow];

  var step = user.step;

  var action = flow == INIT ? _init2.default : availableAction(_config2.default[flow], step);

  if (action) {
    var newStep = _config2.default[flow];
    action();
    (0, _context.User)(fbId, flow);
  } else {
    var exception = _config2.default[flow[step]].exception;
    exception();
  }
};