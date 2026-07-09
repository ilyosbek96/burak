import { OrderStatus } from "../libs/enums/order.enum";
import mongoose, { Schema } from "mongoose";

const orederSchema = new Schema(
  {
    orderTotal: {
      type: Number,
      required: true,
    },
    orderDeliver: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PAUSE,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
  },
  { timestamps: true, collection: "orders" },
);

export default mongoose.model("Oreder", orederSchema);
