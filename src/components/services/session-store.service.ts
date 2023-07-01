import DotEnv from "dotenv";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

DotEnv.config();

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.LOCAL_MONGODB_URL + "Server",
  collection: "sessions",
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

export const sessionStore = store;
