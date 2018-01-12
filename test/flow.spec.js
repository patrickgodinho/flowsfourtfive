import handler, { isMenuFlow } from "../src/handler";
import { validation } from "../src/flows/EXAMPLE_FLOW/config";

const start = {
  postback: {
    payload: "PAYLOAD_START"
  },
  sender: {
    id: "123"
  }
};
const example2 = {
  postback: {
    payload: "PAYLOAD_TEST_TRUE"
  },
  sender: {
    id: "123"
  }
};
const example = {
  postback: {
    payload: "EXAMPLE_FLOW"
  },
  sender: {
    id: "123"
  }
};

const exec = () => {
  handler(start);
  handler(example);
  handler(example2);
};

it("TEST FLOW", () => {
  expect(exec());
});

it("TEST IS MENU", () => {
  expect(isMenuFlow(example)).toEqual(true);
});
