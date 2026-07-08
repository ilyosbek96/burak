import { ProductStatus } from "../libs/enums/product.enum";
import { ObjectId } from "mongoose";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProductUpdateInput,
} from "../libs/types/product";
// import ProductModel from "../schema/Product.model";
import ProductModel from "../schema/Product.model";
import { T } from "../libs/types/common";
import ViewService from "./View.servece";
import { ViewGroup } from "../libs/enums/view.enum";
import { ViewInput } from "../libs/types/view";

class ProductService {
  private readonly productModel;
  public viewService;

  constructor() {
    this.viewService = new ViewService();
    this.productModel = ProductModel;
  }
  /** ======================= SPA ======================= */

  /** ====================== getProducts ====================== */
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    // console.log("inquiry:", inquiry);
    const match: T = { productStatus: ProductStatus.PROCESS };
    if (inquiry.productCollection)
      match.productCollection = inquiry.productCollection;
    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }
    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 } // [daynamic object(key)] (productPrice kattasidan boshlab olib beradi 3,2,1)
        : { [inquiry.order]: -1 }; //productPrice dan boshqa productlarni boshidan 1,2,3
    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit }, //page * 1 pageni songa aylantirish
        { $limit: inquiry.limit * 1 },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  /** ====================== getProduct ====================== */
  public async getProduct(
    memberId: ObjectId | null,
    id: string,
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
      .findOne({ _id: productId, productStatus: ProductStatus.PROCESS })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    if (memberId) {
      //TODO: If authenticated users => fist => view log creation
      // Check  Existence
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistence(input);
      // Insert New Log
      console.log("exist:", !!existView);
      if (!existView) {
        // Insert View
        // console.log("PLANNING TO INSERT NEW VIEW");
        await this.viewService.insertMemberView(input);
        // Increase Counts
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true },
          )
          .exec();
      }
    }

    return result;
  }

  /** ======================= SSR ======================= */

  // define

  /** ====================== getAllProducts ====================== */
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // console.log("result:", result);
    return result;
  }

  /** ====================== createNewProduct ====================== */
  public async createNewProduct(
    input: ProductInput,
  ) /** ProductInput tipiodagi input qabul qilanadi*/ : Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  /** ====================== updateChosenProduct ====================== */
  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput,
  ): Promise<Product> {
    // stringdi => objectIdga òzgartiramiz
    id = shapeIntoMongooseObjectId(id); // "strinddi" object ("strinddi") aylantirib olyapmiz
    const result = await this.productModel
      .findOneAndUpdate(
        { _id: id }, //filter
        input, // update
        { new: true },
      ) // option { new: true } yangi qiymatni qaytarish degani
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    // console.log("result:", result);
    return result;
  }
}

export default ProductService;
