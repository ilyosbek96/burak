import express from 'express';
import path from 'path'
import router from "./router"
import routerAdmin from "./views/routerAdmin"

/** 1-ENTRANCE **/ 
const app = express();
console.log("__dirname:",__dirname)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/** 2-SESSIONS **/

/** 3-VIEWS **/
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

/** 4-ROUTTERS **/
app.use('/admin', routerAdmin);// BSSR: BECKENDda frontentni qurvolish uni EJS ORQALIK QILAMIZ
app.use('/', router); // SPA: REACT.. Middleware Design Pattern.. 


export default app;  