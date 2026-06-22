import MemberModel from "../schema/Member.model";

import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import { broadcastProtocol } from "node:stream/iter";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

// member va schema fayllar CLASS orqalik yasaladi
class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }
  // **============================== SPA => SINGLE PAGE APLICATION =============================== */
  /** SPA */ // REACT
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 },
      )
      .exec(); // findOne 2chi argumenttidan foydalanib maxfiy narsani misol memberNick memberPassword (1) raqam qoyib chaqirib oldik (0) raqam qoyilsa olib tashlaydi

    if (!member)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK); // agar error bo'lsa
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }
    // ============== {bcrypt.compare} orqalik asl parolni chiqarib olish oli
    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );
    /* ============ parolni tekshirish ============
    const isMatch = input.memberPassword === member.memberPassword;
     console.log("isMatch:", isMatch);
     */
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    // const result = await this.memberModel.findById(member._id).exec();
    return await this.memberModel.findById(member._id).lean().exec();
    // console.log("result:", result);
    // return result;
  }

  //**======================================================================== */
  // bssr manosi backend server side rendering yani backendda frontendni qurvolish uni EJS ORQALIK QILAMIZ
  /** =================== (BSSR), SSR =================*/
  // Promise => async method bo'lsa promise<> ishlatiladi
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();
    // console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    //=================== PAROLNI (bcrypt.hash) XIMOYA QILISH =========
    // bcrypt bu passwordni tushunarsiz yani boshqalar asl parolni ko'raolmaydigon qilib qo'yadi yani uzun soxta parolqo'yadi
    console.log("before:", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after:", input.memberPassword);
    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  /** define
   promise => async method bo'lsa promise<> ishlatiladi kutish degani
   * */

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick }, // FILTER yani memberNick ni inputdan kelgan memberNick ga teng bo'lganini top degani
        { memberNick: 1, memberPassword: 1 }, // PROJECTION, yani memberNick va memberPassword ni olib kel degani
      )
      .exec(); // findOne 2chi argumenttidan foydalanib maxfiy narsani misol memberNick memberPassword (1) raqam qoyib chaqirib oldik (0) raqam qoyilsa olib tashlaydi

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK); // agar error bo'lsa

    // ============== {bcrypt.compare} nima: asl parolni chiqarib olish yoki tekshirish uchun ishlatiladi, yani inputdan kelgan parolни (memberPassword) va bazadan olingan parolni (member.memberPassword) solishtirib tekshiradi, agar ular mos kelsa true qaytaradi, aks holda false qaytaradi
    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );
    /* ============ parolni tekshirish ============
    const isMatch = input.memberPassword === member.memberPassword;
     console.log("isMatch:", isMatch);
     */
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    // const result = await this.memberModel.findById(member._id).exec();
    return await this.memberModel.findById(member._id).exec();
    // console.log("result:", result);
    // return result;
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER }) //memberType QIYMATI USER BOLGANINI IZLA DEGAN SHARTNI QOYYAPMIZ
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id); // inputdan _idni qabul qilib olyapmiz
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true }) //memberType QIYMATI USER BOLGANINI IZLA DEGAN SHARTNI QOYYAPMIZ
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
}

export default MemberService;
