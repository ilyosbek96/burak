/* ================================ import { Request, Response } from "express"; ============================*/
import { query, Request, Response } from "express"; // iport qilish kerak bo'ladi, chunki bu controllerda req va res ishlatiladi, shuning uchun ularni import qilish kerak bo'ladi

/* ======================== iimport Errors, { HttpCode, Message } from "../libs/Errors"; ===================*/
import Errors, { HttpCode, Message } from "../libs/Errors"; // Errors, HttpCode, Message import qilish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun Errors, HttpCode, Message ishlatiladi, shuning uchun ularni import qilish kerak bo'ladi

/* ======================== import { T } from "../libs/types/common";  ===================*/
import { T } from "../libs/types/common"; // T import qilish kerak bo'ladi, chunki bu controllerda T tipi ishlatiladi, shuning uchun uni import qilish kerak bo'ladi

/* ======================== import ProductService from "../models/Product.service"; ===================*/
import ProductService from "../models/Product.service"; // ProductService import qilish kerak bo'ladi, chunki bu controllerda ProductService ishlatiladi, shuning uchun uni import qilish kerak bo'ladi

/* ======================== import { ProductInput } from "../libs/types/product"; ===================*/
import { ProductInput, ProductInquiry } from "../libs/types/product"; // ProductInput import qilish kerak bo'ladi, chunki bu controllerda ProductInput tipi ishlatiladi, shuning uchun uni import qilish kerak bo'ladi

/* ======================== import { AdminRequest } from "../libs/types/member"; ===================*/
import { AdminRequest, ExtendedRequest } from "../libs/types/member"; // AdminRequest import qilish kerak bo'ladi, chunki bu controllerda AdminRequest tipi ishlatiladi, shuning uchun uni import qilish kerak bo'ladi
import { ProductCollection } from "../libs/enums/product.enum";
// =============================== test ===========================
// import { AdminRequest } from "../libs/types/member";

/* ======================== const productService = new ProductService(); ===================*/
const productService = new ProductService(); // ProductService dan yangi instance yaratish kerak bo'ladi, chunki bu controllerda ProductService ishlatiladi, shuning uchun uni yaratish kerak bo'ladi

/* ======================== const productController: T = {};  ===================*/
const productController: T = {}; // productController ni T tipida bo'sh objectga tenglashtirish kerak bo'ladi, chunki bu controllerda productController ishlatiladi, shuning uchun uni yaratish kerak bo'ladi
// =============================== test ===========================
// productController.getAllProducts = async (req: AdminRequest, res: Response)

/** ==================SPA => SINGLE PAGE APLICATION ==================*/

/** ================= getProducts =================*/
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    /*const query = req.query; */ //urlda yashedi ? name=devid (qo'shish (&)) va get methoddan foydalaniladi
    const { page, limit, order, productCollection, search } = req.query; //{gullik qavus malumotni yoyishda ishlatiladi}
    /*console.log(req.query);*/ // kerakligini chaqirish uchun `superstring orqalik misol: page:${page}`qilinadi
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (productCollection)
      inquiry.productCollection = productCollection as ProductCollection;
    if (search) inquiry.search = String(search);
    const result = await productService.getProducts(inquiry);
    /*const params = req.params;*/
    /*console.log("req:params:", params);*/ //urlda yashedi urlga flesh(/)orqalik malmot qo'shiladi va routerga urldan kegin(/: qo'yib va get methoddan foydalaniladiishtalgancha malumot qo'shsa bo;ladi)
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error getProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** ================= getProduct =================*/
productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params;

    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error,getProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** =========================== SSR ===========================*/
/* productController.getAllProducts ni async functionga tenglashtirish kerak bo'ladi, chunki bu controllerda getAllProducts ishlatiladi, shuning uchun uni yaratish kerak bo'ladi parametr sifatida req va res arrow function orqalik try catch operatsiyasini amalga oshirish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun try catch operatsiyasi ishlatiladi, shuning uchun uni yaratish kerak bo'ladi */

/** ================= getAllProducts =================*/
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts(); // productService dan getAllProducts methodini chaqirish kerak bo'ladi, chunki bu controllerda getAllProducts ishlatiladi, shuning uchun uni chaqirish kerak bo'ladi
    // console.log("data:", data);
    console.log("products:", data);
    // =============================== test ===========================
    // console.log("req.member:", req.member);
    res.render("products", { products: data }); // products nomli viewni render qilish kerak bo'ladi, chunki bu controllerda products view ishlatiladi, shuning uchun uni render qilish kerak bo'ladi, parametr sifatida products nomli o'zgaruvchini data ga tenglashtirish kerak bo'ladi, chunki bu controllerda data ishlatiladi, shuning uchun uni products nomli o'zgaruvchiga tenglashtirish kerak bo'ladi
  } catch (err: any) {
    // xatoliklarni boshqarish uchun catch block yaratish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun try catch operatsiyasi ishlatiladi, shuning uchun uni yaratish kerak bo'ladi, parametr sifatida err ni any tipida olish kerak bo'ladi, chunki bu controllerda err ishlatiladi, shuning uchun uni any tipida olish kerak bo'ladi
    console.log("Error, getAllProducts:", err);
    if (err instanceof Errors)
      res.status(err.code).json(err); // if block yaratish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun if block ishlatiladi, shuning uchun uni yaratish kerak bo'ladi, agar err Errors instance bo'lsa res statusini err.code ga tenglashtirish va json formatida err ni qaytarish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun if block ishlatiladi, shuning uchun uni yaratish kerak bo'ladi
    else res.status(Errors.standard.code).json(Errors.standard); // else block yaratish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun else block ishlatiladi, shuning uchun uni yaratish kerak bo'ladi, agar err Errors instance bo'lmasa res statusini Errors.standard.code ga tenglashtirish va json formatida Errors.standard ni qaytarish kerak bo'ladi, chunki bu controllerda xatoliklarni boshqarish uchun else block ishlatiladi, shuning uchun uni yaratish kerak bo'ladi
    // res.json({});
  }
};

/** ================= createNewProduct =================*/
productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    // console.log("req.files:", req.files);
    console.log("req.body:", req.body);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files.map((ele) => {
      return ele.path;
    });

    await productService.createNewProduct(data); // await productService dan createNewProduct methodini chaqirish kerak bo'ladi, chunki bu controllerda createNewProduct ishlatiladi, shuning uchun uni chaqirish kerak bo'ladi, parametr sifatida data ni uzatish kerak bo'ladi, chunki bu controllerda data ishlatiladi, shuning uchun uni uzatish kerak bo'ladi

    res.send(
      `<script> alert("Sucessful creation!"); window.location.replace('/admin/product/all') </script>`,
    );

    // console.log("data:", data);

    // res.send("DONE");
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all') </script>`,
    );
    // if (err instanceof Errors) res.status(err.code).json(err);
    // else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};

/** ================= updateChosenProduct =================*/
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
