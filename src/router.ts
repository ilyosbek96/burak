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
/** =========== Member =========== */
router.post("/member/login", memberController.login);
// routerAdmin.post("/login", restaurantController.processLogin);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout,
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail,
);

/** =========== Product =========== */

/** =========== Order =========== */
export default router;
