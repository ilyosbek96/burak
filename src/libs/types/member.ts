import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";

export interface Member {
  _id: Object;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberImage?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberImage?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberPoints?: number;
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: Object;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberImage?: string;
  memberAddress?: string;
  memberDesc?: string;
}

export interface ExtendedRequest extends Request {
  member: Member;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
  // interface deganimiz yangi type yaratish uchun ishlatiladi, AdminRequest ni Requestga tenglashtirish kerak bo'ladi, chunki bu controllerda AdminRequest ishlatiladi, shuning uchun uni yaratish kerak bo'ladi, member: Member ni member ga tenglashtirish kerak bo'ladi, chunki bu controllerda member ishlatiladi, session: Session & { member: Member } ni session ga tenglashtirish kerak bo'ladi, chunki bu controllerda session ishlatiladi, file: Express.Multer.File ni file ga tenglashtirish kerak bo'ladi, chunki bu controllerda file ishlatiladi, files: Express.Multer.File[] ni files ga tenglashtirish kerak bo'ladi, chunki bu controllerda files ishlatiladi

  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
