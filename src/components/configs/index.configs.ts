/**
 * * Configs the mongoose
 */
import mongoose from "mongoose";

const ConfigMongoose = async (database: string, options?: object) => {
  await mongoose
    .connect(process.env.LOCAL_MONGODB_URL + `${database}`,{ })
    .then(() => console.log("Successfully connects with the mongo atlas..."));
};

const Configs = {
  ConfigMongoose,
};

export default Configs;
