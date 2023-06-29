import { AuthenticationRoutes } from "./authentication.route";
import HomeRoute from "./default"
import logRoutes from "./logs.route";
import { TokenRoutes } from "./tokens.route";

const routes = {
    HomeRoute,
    logRoutes,
    AuthenticationRoutes,
    TokenRoutes,
}

export default routes;