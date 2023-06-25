import mongoose, { Document, Schema } from 'mongoose';

// ? Define the interface for the log document
export interface ILog {
  timestamp: Date;
  endpoint: string;
  userId: string;
  userIpAddress: string;
  requestMethod: string;
  requestUrl: string;
  requestPayload?: Record<string, any>;
  responseStatusCode: number;
  responsePayload?: Record<string, any>;
  userAgent?: string;
  errorMessage?: Error | null|string;
}

// * Create the log schema
const logSchema: Schema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userIpAddress: {
      type: String,
      required: true,
    },
    requestMethod: {
      type: String,
      required: true,
    },
    requestUrl: {
      type: String,
      required: true,
    },
    requestPayload: {
      type: Schema.Types.Mixed,
    },
    responseStatusCode: {
      type: Number,
      required: true,
    },
    responsePayload: {
      type: Schema.Types.Mixed,
    },
    userAgent: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
  },
  { collection: 'logs' } // ** Optional: Specify the collection name
);

// ** Create the log model
export const LogModel = mongoose.model<ILog>('Log', logSchema);


