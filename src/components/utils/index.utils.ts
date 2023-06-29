import { returnObjectFromRequestBody } from "./global.utils";
import { hashPassword, comparePasswords } from "./password.utils";

const utils = {
  password: {
    hashPassword,
    comparePasswords,
  },
  _GlobalUtils: {
    returnObjectFromRequestBody,
  },
};

export default utils;
