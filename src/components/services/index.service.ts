import { Model, Schema } from "mongoose";
import { createErrorLogs, createLogs, createProperties, handleTheErrorLogs,localLogs } from "./logs.service";
import { createTheJWTForClient } from "./passport.service";








const createNewModels = <T extends Schema>(model: Model<T>, schema: Schema) => {
  return new model({ ...schema });
};



const services = {
  createNewModels,
  createLogs,
  createErrorLogs,
  createProperties,
  handleTheErrorLogs,
  localLogs,
  createTheJWTForClient,

};

export default services;
