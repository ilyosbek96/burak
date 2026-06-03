// CONTROLLERLARNI doim OBJECTlar orqalik quramiz
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors from "../libs/Error";

// REACT SPA SINGL PAGE APLICATION
const memberService = new MemberService();
const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    console.log("body", req.body);
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input); // await (async) birga ishlatiladi
    // TODO: TOKENS AUTHENTICATION

    res.json({ member: result });
  } catch (err: any) {
    console.log("Error, signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    // console.log("body:", req.body);
    const input: LoginInput = req.body,
      result = await memberService.login(input);
    // TODO: TOKENS AUTHENTICATION

    res.json({ member: result });
  } catch (err) {
    console.log("Error, login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};

export default memberController;
