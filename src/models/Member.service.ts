import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";

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
    console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
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

    const isMatch = input.memberPassword === member.memberPassword;
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
