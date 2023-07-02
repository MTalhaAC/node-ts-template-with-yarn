import { IFeedBack, TFeedBack } from "../types/global";

export const feedbackForSuccessful: IFeedBack<TFeedBack> = {
  success: true,
  message: "OK|DONE|SUCCESSFUL|COMPLETED",
  data: {
    success: true,
    body: {
      message: "Redirect to Login Page.",
      token: "",
    },
  },
};

export const feedbackForRoutes = (feedbackObject: IFeedBack<TFeedBack>) => {
  return {
    ...feedbackObject,
  };
};

let feedback = feedbackForRoutes({
  success: true,
  message: "OK|DONE|SUCCESSFUL|COMPLETED",
  data: {
    success: true,
    body: {
      auth: {
        token: "",
      },
      payload: {
        message: "",
      },
    },
  },
});
export const feedbackForFails: IFeedBack<TFeedBack> = {
  success: false,
  message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED",
  data: {
    success: false,
    body: {
      message: "Redirect to Login Page.",
      token: "",
    },
  },
};
