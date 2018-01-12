'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var context = {
  users: []
};

var User = exports.User = function User(fbId) {
  var flow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'INIT_FLOW';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var oldUserIndex = context.users.findIndex(function (value) {
    return value.id == fbId;
  });

  var user = {
    fbId: {
      flow: flow,
      step: step
    }
  };

  if (oldUserIndex) context.users.splice(oldUserIndex, 1);

  context.users.push(user);

  return user;
};

exports.default = context;