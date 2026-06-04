import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";

/** 1-ENTRANCE kirish bo'limi **/
const app = express();
// console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT)); // (\n hegingi qatorga o'tish degani)

/** 2-SESSIONS **/

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTTERS **/
app.use("/admin", routerAdmin); // BSSR,SSR: BECKENDda frontentni qurvolish uni EJS ORQALIK QILAMIZ
app.use("/", router); // SPA: REACT.. Middleware Design Pattern..

export default app;
