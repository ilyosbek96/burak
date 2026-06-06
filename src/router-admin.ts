import express, { Request, Response } from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

// router.get("/", (req: Request, res: Response) => {
//     res.send("Home Page");
// });
// router.get("/login", (req: Request, res: Response) => {
//     res.send("Login Page");
// });
// router.get("/signup", (req: Request, res: Response) => {
//     res.send("Signup Page");
// });

/** Restaurant */
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
// routerAdmin.post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);
routerAdmin.get("/check_me", restaurantController.checkAuthSession);

/** Product */
/** User */
export default routerAdmin;
