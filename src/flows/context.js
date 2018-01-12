//@flow
import { propEq, filter, not } from "ramda";

const context: {
  users: Array<Object>
} = {
  users: []
};

export const User = (fbId: string, flow: ?string, step: ?number): Object => {
  const findUser = user => not(propEq("id", fbId), user);
  context.users = filter(findUser, context.users);

  const user: {
    id: string,
    flow: string,
    step: number
  } = {
    id: fbId,
    flow: flow || "INIT_FLOW",
    step: step || 0
  };

  context.users.push(user);
  return user;
};

export default context;
