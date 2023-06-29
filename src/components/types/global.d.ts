import { IUser } from "../models/user.models";

export type PayloadWithOnlyUsername = Omit<IUser, "password">;

export type ParamsDictionary = {
    [key:string]:string
}

type returnObjectType = <TBody extends IUser>(req: Request) => {
    Payload: TBody;
    ParamsQuery: ParamsDictionary;
}
export type returnType = ReturnType<returnObjectType>
