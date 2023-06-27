import { Login_GET,Login_POST } from "./Login.controller";
import { Logout_POST } from "./Logout.controller";
import { getLogs, createLogs } from "./Logs.controller";
import { Register_GET, Register_POST } from "./Registration.controller";


const Controllers = {
    logs: {
        getLogs,
        createLogs,
    },
    Login:{
        Login_GET,
        Login_POST
    },
    Logout:{
        Logout_POST,
    },
    Registration:{
        Register_GET,
        Register_POST,
    }
}


export default Controllers;