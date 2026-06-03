import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";
import { broadcastProtocol } from "node:stream/iter";
import * as bcrypt from "bcryptjs";

// member va schema fayllar CLASS orqalik yasaladi
class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  // Promise => async method bo'lsa promise<> ishlatiladi
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESSTAURANT })
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
  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 },
      )
      .exec(); // findOne 2chi argumenttidan foydalanib maxfiy narsani misol memberNick memberPassword (1) raqam qoyib chaqirib oldik (0) raqam qoyilsa olib tashlaydi

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK); // agar error bo'lsa

    // ============== {bcrypt.compare} orqalik asl parolni chiqarib olish oli
    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );
    // const isMatch = input.memberPassword === member.memberPassword;
    // console.log("isMatch:", isMatch);
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    // const result = await this.memberModel.findById(member._id).exec();
    return await this.memberModel.findById(member._id).exec();
    // console.log("result:", result);
    // return result;
  }
}

export default MemberService;
