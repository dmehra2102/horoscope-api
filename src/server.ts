import App from "./app";
import { AuthRoute, HoroscopeRoute } from "@/routes";

const app = new App([new AuthRoute(), new HoroscopeRoute()]);

app.listen();
