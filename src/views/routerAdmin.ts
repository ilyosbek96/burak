import express, {Request, Response} from "express";
const routerAdmin = express.Router();
import restaurantController from '../controllers/restaurant.controller';

// router.get("/", (req: Request, res: Response) => {
//     res.send("Home Page");
// });
// router.get("/login", (req: Request, res: Response) => {
//     res.send("Login Page");
// });
// router.get("/signup", (req: Request, res: Response) => {
//     res.send("Signup Page");
// });
routerAdmin.get("/", restaurantController.goHome);
routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.get("/signup", restaurantController.getSignup);

export default routerAdmin;