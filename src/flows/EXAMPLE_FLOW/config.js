import { exampleAction2 } from "./EXAMPLE_STEP/actions/example.action2";
import { exampleAction } from "./EXAMPLE_STEP/actions/example.action";
import { exception } from "./EXAMPLE_STEP/actions/exception.action";
import { match, has } from "ramda";

export const validation = (message: string) => {
  const postback = has("postback", message);
  const payload = message.postback.payload;
  const valid = match(/(\w+)_(\w+)_(\w+)/, payload)[3].toLowerCase() == "true";
  return valid;
};

export default [
  {
    name: "EXAMPLE_STEP",
    actions: [
      {
        name: "Example Action",
        conditions: [],
        action: exampleAction
      }
    ],
    exception
  },
  {
    name: "EXAMPLE_STEP2",
    actions: [
      {
        name: "Example Action",
        conditions: [validation],
        action: exampleAction2
      }
    ],
    exception
  }
];
