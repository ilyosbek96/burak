import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { Collection } from "mongoose";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});

/** 1-ENTRANCE kirish bo'limi **/
const app = express();
// console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // middleware DP > traditional api support qilish uchun kerak bo'ladi, chunki frontenddan kelayotgan ma'lumotlar urlencoded formatida bo'ladi, uni js objectga aylantirish uchun kerak bo'ladi
app.use(express.json()); // middleware DP > rest api support qilish uchun kerak bo'ladi, chunki frontenddan kelayotgan ma'lumotlar json formatida bo'ladi, uni js objectga aylantirish uchun kerak bo'ladi
app.use(morgan(MORGAN_FORMAT)); // (\n hegingi qatorga o'tish degani)

/** 2-SESSIONS **/
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 100 * 3600 * 3, // 3 soat devomida active bo'ladi
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);
/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTTERS **/
app.use("/admin", routerAdmin); // BSSR,SSR: BECKENDda frontentni qurvolish uni EJS ORQALIK QILAMIZ
app.use("/", router); // SPA: REACT.. Middleware Design Pattern..

export default app;
