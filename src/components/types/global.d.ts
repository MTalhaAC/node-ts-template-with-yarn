import { IUser } from "../models/user.models";

export type PayloadWithOnlyUsername = Omit<IUser, "password">;

export interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

export type ParamsDictionary = {
  [key: string]: string;
};

export type TFeedBack = {
  success: boolean;
  timestamp?: Date;
  header?: {
    [key: PropertyKey]: string;
  };
  body?:{
    [key:PropertyKey]: any
  }
};

export type TMessage = "OK" | "DONE" | "SUCCESSFUL" | "COMPLETED";

export interface IFeedBack<T> {
  success: boolean;
  message: string;
  data: T | null;
}

type returnObjectType = <TBody extends IUser>(
  req: Request
) => {
  Payload: TBody;
  ParamsQuery: ParamsDictionary;
};
export type returnType = ReturnType<returnObjectType>;
