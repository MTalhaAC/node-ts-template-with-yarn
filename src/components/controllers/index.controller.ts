import { Login_GET,Login_POST, Login_PUT } from "./Login.controller";
import { Logout_POST } from "./Logout.controller";
import { getLogs, createLogs } from "./Logs.controller";
import { Register_GET, Register_POST } from "./Registration.controller";
import { Get_Token,Create_Token_POST } from "./Token.controller";


const Controllers = {
    logs: {
        getLogs,
        createLogs,
    },
    Login:{
        Login_GET,
        Login_POST,
        Login_PUT
    },
    Logout:{
        Logout_POST,
    },
    Registration:{
        Register_GET,
        Register_POST,
    },
    tokens:{
        Get_Token,
        Create_Token_POST,
    },
}


export default Controllers;