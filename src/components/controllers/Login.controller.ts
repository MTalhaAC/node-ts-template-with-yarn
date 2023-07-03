import { NextFunction, Request, Response } from "express";
import utils from "../utils/index.utils";
import { IUser, Users } from "../models/user.models";
import { returnType } from "../types/global";
import services from "../services/index.service";
import Configs from "../configs/index.configs";

export const Login_GET = async ( req: Request, res: Response ): Promise<void> =>
{
  try
  {
    /**
     * Here send the user credentials using token based authentication soon.
     */

    let Query = req.query;

    res.json(
      utils._FeedBack.feedbackForRoutes( {
        success: true,
        message: "OK|DONE|SUCCESSFUL|COMPLETED",
        data: {
          success: true,
          body: {
            auth: {
              token: "",
            },
            payload: {
              message: "Redirect to Login Page",
            },
          },
        },
      } )
    );
  } catch ( error )
  {
    services.handleTheErrorLogs( req, res, error as Error );
  }
};

export const Login_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> =>
{
  try
  {
    const { username, password } =
      utils._GlobalUtils.returnObjectFromRequestBody( req );

    let user = await Users.findOne( { username } );

    if ( !user )
    {
      services.handleTheErrorLogs( req, res, { message: "User doesn't exist Or incorrect username" } as Error );
      res.status( 404 ).json(
        utils._FeedBack.feedbackForRoutes( {
          success: false,
          message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED",
          data: {
            success: false,
            body: {
              auth: {
                token: "",
              },
              payload: {
                message: "User doesn't exist Or incorrect username",
              },
            },
          },
        } )
      );
      return;
    }

    let isMatch: boolean = await utils.password.comparePasswords(
      password,
      user?.password!
    );

    if ( !isMatch )
    {
      services.handleTheErrorLogs( req, res, { message: "invalid password" } as Error );
      res.status( 403 ).json(
        utils._FeedBack.feedbackForRoutes( {
          success: false,
          message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED|UNAUTHORIZED",
          data: {
            success: false,
            body: {
              auth: {
                token: "",
              },
              payload: {
                message: "invalid password",
              },
            },
          },
        } )
      );
      return;
    }
    const token = await services.createTheJWTForClient(
      {
        username: user.username,
        password: user.password,
        id: user._id,
      } as IUser,
      res,
      req,
      Configs.SECRET_KEY
    );
    // Store the token in the session
    ( req.session as any ).token = token;
    res.status( 200 ).json(
      utils._FeedBack.feedbackForRoutes( {
        success: true,
        message: "OK|DONE|SUCCESSFUL|COMPLETED",
        data: {
          success: true,
          body: {
            auth: {
              token: token,
            },
            payload: {
              message: "Login Successfully",
            },
          },
        },
      } )
    );
  } catch ( error )
  {
    services.handleTheErrorLogs( req, res, error as Error );
    res.status( 500 ).json(
      utils._FeedBack.feedbackForRoutes( {
        success: false,
        message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED|SERVERERROR",
        data: {
          success: false,
          body: {
            auth: {
              token: "",
            },
            payload: {
              message: "Server error",
            },
          },
        },
      } )
    );
  }
};

export const Login_PUT = async ( req: Request, res: Response ): Promise<void> =>
{
  try
  {
    /**
     * Return the Payload actual body and params to search the record in database to update their body with Payload body.
     */
    const { Payload, ParamsQuery } = <returnType> (
      utils._GlobalUtils.returnObjectFromRequestBodyWithOnlyUsername( req )
    );
    let paramsUsername: string = ParamsQuery.username;

    // * Find the User in database if exist then
    const user = await Users.findOne( { username: paramsUsername } );
    if ( !user )
    {

      res.status( 404 ).json(
        utils._FeedBack.feedbackForRoutes( {
          success: false,
          message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED|NOTFOUND",
          data: {
            success: false,
            body: {
              auth: {
                token: "",
              },
              payload: {
                message: "User doesn't exist Or incorrect username",
              },
            },
          },
        } )
      );
      services.handleTheErrorLogs( req, res, { message: "User doesn't exist Or incorrect username" } as Error );
      return;
    }

    let { username } = user;

    let hashedPassword: string | undefined = Payload.password
      ? await utils.password.hashPassword( Payload.password )
      : undefined;

    const UserDocs = await Users.findOneAndUpdate(
      { username },
      { username: Payload.username, password: hashedPassword },
      {
        returnDocument: "after",
      }
    );

    if ( !UserDocs )
    {

      res.status( 500 ).json(
        utils._FeedBack.feedbackForRoutes( {
          success: false,
          message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED|SERVERERROR",
          data: {
            success: false,
            body: {
              auth: {
                token: "",
              },
              payload: {
                message: "Server error",
              },
            },
          },
        } )
      );
      services.handleTheErrorLogs( req, res, { message: "Server error" } as Error );
      return;
    }

    /**
     * Here we create the new jwt credentials based on the modified field and return back to the client.
     */
    const newJWTCredentials: string | undefined =
      await services.createTheJWTForClient(
        {
          username: UserDocs.username,
          password: UserDocs.password,
          id: UserDocs._id,
        } as IUser,
        res,
        req,
        Configs.SECRET_KEY
      );

    // Store the token in the session
    ( req.session as any ).token = newJWTCredentials;

    res.status( 200 ).json(
      utils._FeedBack.feedbackForRoutes( {
        success: true,
        message: "OK|DONE|SUCCESSFUL|COMPLETED",
        data: {
          success: true,
          body: {
            auth: {
              token: newJWTCredentials,
            },
            payload: {
              message: "Update successfully",
            },
          },
        },
      } )
    );
  } catch ( error )
  {

    res.status( 500 ).json(
      utils._FeedBack.feedbackForRoutes( {
        success: false,
        message: "FAIL|ONGOING|UNSUCCESSFUL|UNCOMPLETED|SERVERERROR",
        data: {
          success: false,
          body: {
            auth: {
              token: "",
            },
            payload: {
              message: "Server error",
            },
          },
        },
      } )
    );
    services.handleTheErrorLogs( req, res, error as Error );
  }
};
