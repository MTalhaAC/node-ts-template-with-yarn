/**
 * * Configs the mongoose
 */
import mongoose from "mongoose";
import { SECRET_KEY, passportConfig } from "./passport.configs";
const ConfigMongoose = async (database: string, options?: mongoose.MongooseOptions) => {
  await mongoose
    .connect(process.env.LOCAL_MONGODB_URL + `${database}`,{ })
    .then(() => console.log("Successfully connects with the mongo atlas..."));
};

const Configs = {
  ConfigMongoose,
  passportConfig,
  SECRET_KEY
};

export default Configs;
