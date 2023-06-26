import {LogModel }from "./logs.models";


const Logs_Instance = new LogModel(undefined,undefined,true);

export const Logs_Models_Instance = {
    Logs_Instance,
}

const Models = {
    LogModel
}
export default Models;