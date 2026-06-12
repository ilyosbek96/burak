import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
import { ProductInput } from "../libs/types/product";
import { AdminRequest } from "../libs/types/member";
// =============================== test ===========================
// import { AdminRequest } from "../libs/types/member";

const productService = new ProductService();

const productController: T = {};
// =============================== test ===========================
// productController.getAllProducts = async (req: AdminRequest, res: Response)

/** SPA => SINGLE PAGE APLICATION */

/** SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();
    // console.log("data:", data);
    // =============================== test ===========================
    // console.log("req.member:", req.member);
    res.render("products", { products: data });
  } catch (err: any) {
    console.log("Error, getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};
productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    // console.log("req.files:", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files.map((ele) => {
      return ele.path;
    });

    await productService.createNewProduct(data);

    res.send(
      `<script> alert("Sucessful creation!"); window.location.replace('admin/product/all) </script>`,
    );

    // console.log("data:", data);

    // res.send("DONE");
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/product/all) </script>`,
    );
    // if (err instanceof Errors) res.status(err.code).json(err);
    // else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};
productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id; // paramsda istalgancha id qilsa boladi  console.log("eq.params:", eq.params); dep routeradmingaxam misol (id2) yosizkerak  promisgaxam /dan kegin yoziladi
    // console.log("id:", id); tekshirvolish uchun log
    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};

export default productController;
