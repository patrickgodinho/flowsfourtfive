//@flow

import { allPass, filter, keys, prop, any, propEq, find } from "ramda";
import { has } from "ramda";
import context, { User } from "./flows/context";
import initAction from "./flows/init.action";
import Flows from "./flows/config";
import endAction from "./flows/end.action";

const INIT: string = "INIT_FLOW";

const validator = (step: number, message: Object) =>
  step.conditions ? allPass(step.conditions)(message) : true;

const availableAction = (
  flow: string,
  step: number,
  message: Object
): [Function, boolean] => {
  if (flow == INIT) return [initAction, true];

  const Step = Flows[flow][step];

  const exception: Function = Step.exception;
  const availableAction = Step.actions.filter(action =>
    validator(action, message)
  )[0];

  return availableAction ? [availableAction.action, true] : [exception, false];
};

export const isMenuFlow = (message: Object): boolean => {
  const postback = has("postback", message);
  const isMenu = postback ? has(message.postback.payload, Flows) : false;

  return isMenu;
};

export default (message: Object) => {
  const fbId: string = message.sender.id;

  const user = find(propEq("id", fbId), context.users) || User(fbId);

  const flow: string = isMenuFlow(message)
    ? message.postback.payload
    : user.flow;

  const step: number = user.step;

  const actions: [Function, boolean] = availableAction(flow, step, message);

  const action: Function = actions[0];

  action();

  if (flow != INIT) {
    const nextStep: number = step + 1;
    Flows[flow][nextStep]
      ? User(fbId, flow, nextStep)
      : User(fbId) && endAction();
  }
};
