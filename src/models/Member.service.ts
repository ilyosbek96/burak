import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
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
        const exist = await this.memberModel.findOne({memberType: MemberType.RESSTAURANT}).exec();
        console.log("exist", exist)
        if (exist) throw new Errors(HttpCode.BAD_REQUEST,Message.CREATE_FAILED);
        try {
        const result = await this.memberModel.create(input);
        result.memberPassword = "";
        return result;
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATE_FAILED);
        }
        
    }
}

export default MemberService;