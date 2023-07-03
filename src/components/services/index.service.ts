import { Model, Schema } from "mongoose";
import { createErrorLogs, createLogs, createProperties, handleTheErrorLogs, localLogs } from "./logs.service";
import { createTheJWTForClient } from "./passport.service";
import { sessionStore } from "./session-store.service";







const createNewModels = <T extends Schema> ( model: Model<T>, schema: Schema ) =>
{
  return new model( { ...schema } );
};



const services = {
  createNewModels,
  createLogs,
  createProperties,
  createErrorLogs,
  handleTheErrorLogs,
  localLogs,
  createTheJWTForClient,
  sessionStore,
};

export default services;
