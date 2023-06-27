import { Login_GET,Login_POST } from "./Login.controller";
import { getLogs, createLogs } from "./Logs.controller";


const Controllers = {
    logs: {
        getLogs,
        createLogs,
    },
    Login:{
        Login_GET,
        Login_POST
    }
}


export default Controllers;