// CONTROLLERLARNI doim OBJECTlar orqalik quramiz
import { AdminRequest, Member } from "../libs/types/member";
import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

// obshitga chaqirib olish controllerni
const memberService = new MemberService();
/* request manosi so'rov, response manosi javob, next manosi keyingi middlewarega o'tish uchun kerak bo'ladi, chunki bu controllerda middleware design pattern ishlatiladi, shuning uchun next manosi kerak bo'ladi */
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    // res.send("Home Page");
    // RESPONSLAR => send | redirect | end | render
    /** “send response” → javob yuborish
     * redirect manosi yo'naltirish
     * end manosi tugatish. “end response” → javob tugadi
     * render manosi ko'rsatish. “javobni tayyorlab, ko‘rinadigan shaklda chiqarish”.
      res.send("Home Page");
     res.redirect("/admin/product/all");
     res.end();
      res.render("home");
     */
    res.render("home");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};
restaurantController.getSignup = (req: Request, res: Response) => {
  // getSignup ni functionga tenglashtirish kerak bo'ladi, chunki bu controllerda getSignup ishlatiladi, shuning uchun uni yaratish kerak bo'ladi parametr sifatida req va res arrow function orqalik try catch operatsiyasini amalga oshirish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun try catch operatsiyasi ishlatiladi, shuning uchun uni yaratish kerak bo'ladi
  try {
    console.log("getSignup");
    // res.send("Signup Page");
    res.render("signup"); //
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/admin");
  }
};
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    // res.send("Login Page");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
  }
};
// define qilgan methodlarni restaurantController obyektiga biriktirib chiqamiz
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processSignup");
    console.log("req.body:", req.body);
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    // if (!req.body.name) {
    //   return res.status(400).json({ error: "Name is required" });
    // }

    /** ulanishni tekshirish
     console.log("file:", file);
    throw new Error("Foreced Quit");
    */

    // console.log("body", req.body);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember); // await (async) birga ishlatiladi
    // TODO: SESSIONS AUTHENTICATION

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err: any) {
    console.log("Error, processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`,
    );
  }
};
// define
restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processLogin");
    console.log("req.body:", req.body);

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input); // call
    // TODO: SESSIONS AUTHENTICATION

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processLogin:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace("/admin/login") </script>`,
    );
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    console.log("body:", req.body);

    // TODO: SESSIONS AUTHENTICATION
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result:", result);

    res.render("users", { users: result }); //{ users: result } users nomlik resultni pass qilyapmiz
    // res.send("Login Page");
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
    // res.send("Login Page");
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    console.log("Error, signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      //   res.send(`SALOM, ${req.session.member.memberNick}`);
      // else res.send(Message.NOT_AUTHENTICATED);
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next(); // next(); albatta qo'yilishi kerak bo'lmasam abnavleniya bo'p turoradi
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace("/admin/login") </script>`,
    );
  }
};
export default restaurantController;
