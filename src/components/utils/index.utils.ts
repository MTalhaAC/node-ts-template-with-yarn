import { Model, Schema } from "mongoose";
import { createErrorLogs, createLogs, createProperties, handleTheErrorLogs,localLogs } from "./logs.utils";



const createNewModels = <T extends Schema>(model: Model<T>, schema: Schema) => {
  return new model({ ...schema });
};


const utils = {
  createNewModels,
  createLogs,
  createErrorLogs,
  createProperties,
  handleTheErrorLogs,
  localLogs
};

export default utils;
