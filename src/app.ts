import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_CONFIG } from "./libs/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { Collection } from "mongoose";
import { T } from "./libs/types/common";
import cookieParser from "cookie-parser";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});

/** 1-ENTRANCE kirish bo'limi **/
const app = express();
// console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true })); // middleware DP > traditional api support qilish uchun kerak bo'ladi, chunki frontenddan kelayotgan ma'lumotlar urlencoded formatida bo'ladi, uni js objectga aylantirish uchun kerak bo'ladi
app.use(cookieParser()); // middleware DP > cookie support qilish uchun kerak bo'ladi, chunki frontenddan kelayotgan ma'lumotlar cookie formatida bo'ladi, uni js objectga aylantirish uchun kerak bo'ladi
app.use(express.json()); // middleware DP > rest api support qilish uchun kerak bo'ladi, chunki frontenddan kelayotgan ma'lumotlar json formatida bo'ladi, uni js objectga aylantirish uchun kerak bo'ladi
app.use(cors({ credentials: true, origin: true }));
app.use(morgan(MORGAN_CONFIG)); // (\n hegingi qatorga o'tish degani)

/** 2-SESSIONS **/ // Middleware sessionni ishlatish uchun kerak bo'ladi, chunki foydalanuvchi ma'lumotlarini saqlash va boshqarish uchun kerak bo'ladi, masalan, foydalanuvchi tizimga kirganida uning ma'lumotlarini saqlash va keyingi so'rovlarida bu ma'lumotlarni olish uchun kerak bo'ladi
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 100 * 3600 * 3, // 3 soat devomida active bo'ladi
    },
    store: store,
    resave: true, // authontication 10:30 dan 13:30 gacha kirsa bo'ladi 3saot davomida
    /**======================= resave: true, ============================
     * agar resave: true, bolsa misol 12:00da kirsak vaqt ozgaradi 15:00 gacha xar kirganimizda o'sha vaqtdan boshlab 3 saot degani
     */
    /**======================= resave: false, ============================
     * agar resave: false, bolsa misol 12:00da kirsakxam vaqt o'zgarmaydi yani 13:30 gacha foydalansa bo'ladi
     */

    saveUninitialized: true,
  }),
);
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
}); // xamma murojatlar uchun ishga tushadi
/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTTERS **/
app.use("/admin", routerAdmin); // BSSR,SSR: BECKENDda frontentni qurvolish uni EJS ORQALIK QILAMIZ
app.use("/", router); // SPA: REACT.. Middleware Design Pattern..

export default app;
