import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";

// router.get("/", (req: Request, res: Response) => {
//     res.send("Home Page");
// });
// router.get("/login", (req: Request, res: Response) => {
//     res.send("Login Page");
// });
// router.get("/signup", (req: Request, res: Response) => {
//     res.send("Signup Page");
// });
//=================================// RUTER METHODLARI VAZIFASI =================================//
// get pagega yuborish
// POST login yoki signup tugmasi bosilganda ma'lumotlarni olish va bazaga saqlash yoki tekshirish uchun ishlatiladi

// ulanish: frontend => backend => databesa xamasi MVC (MODEL VIEW CONTROLLER) arxitektura asosida ishlaydi. ROUTER => CONTROLLER => SERVICE => MODEL => DATABASE
// biz traditoinal dan foydalanyapmiz ani json manoni javascript object notation

/** Restaurant */
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin); // o'qilishi post methodi xamda login pointi qanoatlantirilsa restaurantControllerobyektini processlogin methodini chaqiradi
// routerAdmin.post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);
routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check_me", restaurantController.checkAuthSession);

/** Product */
routerAdmin.get("/product/all", productController.getAllProducts);
routerAdmin.post("/product/create", productController.createNewProduct);
routerAdmin.post("/product/:id", productController.updateChosenProduct);

/** User */
export default routerAdmin;
