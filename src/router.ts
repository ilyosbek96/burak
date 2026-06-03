import express, { Request, Response } from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

// router.get("/", (req: Request, res: Response) => {
//     res.send("Home Page");
// });
// router.get("/login", (req: Request, res: Response) => {
//     res.send("Login Page");
// });
// router.get("/signup", (req: Request, res: Response) => {
//     res.send("Signup Page");
// });
// router.get("/", memberController.goHome);
// router.get("/login", memberController.getLogin);
// router.get("/signup", memberController.getSignup);

// call qismi
router.post("/login", memberController.login);
// routerAdmin.post("/login", restaurantController.processLogin);
router.post("/signup", memberController.signup);

export default router;
