import mongoose, {Schema} from "mongoose";
import { MemberStatus, MemberType } from "../libs/types/enums/member.enum";

// Schema first & Code first methodlar bor. Biz  Schema first methodda esa avval schema yaratamiz va undan keyin shu schema asosida model yaratamiz.
// Code first methodni. Code first methodda biz avval modelni yaratamiz va undan keyin shu model asosida schema yaratamiz.

const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER,
    },

     memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    },

     memberNick: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

     memberPhone: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

     memberPassword: {
        type: String,
        select: false, // malumotni olib berma degan shart qo'yyabmiz
        required: true,
    },

     memberImage: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

     memberAddress: {
        type: String,
       
    },

     memberDesc: {
        type: String,
        
    },

     memberPoints: {
        type: Number,
       default: 0,
    },
},
 {timestamps: true} // updatedAt, createAt
); 

// schema modelga aylantirish
export default mongoose.model('Member', memberSchema);
