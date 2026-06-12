import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

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
  .post("/login", restaurantController.processLogin); // o'qilishi post methodi xamda login pointi qanoatlantirilsa restaurantControllerobyektini processlogin methodini (caal qilib) chaqiradi
// routerAdmin.post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup,
  );
routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

/** Product */
routerAdmin.get(
  "/product/all",
  restaurantController.verifyRestaurant,
  productController.getAllProducts,
);
routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant,
  // uploadProductImage.single("productImage"), // file yuklash
  makeUploader("products").array("productImages", 5), // (single 1-rasm yuklaydi) array => ko'p rasm yuklaydi raqam kiritib qo'ish keraak(5 vh)
  productController.createNewProduct,
);
routerAdmin.post(
  "/product/:id", // requestni ichidam  paramsni qabul qilib olyapmiz
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct,
);

/** User */
export default routerAdmin;
