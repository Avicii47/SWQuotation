using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
using SWQuotation.Models;

namespace SWQuotation.Controllers
{
    public class ProductController : Controller
    {
       

        public string ProductId { get; private set; }

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductList()
        {
            return View();
        }

        public ActionResult ProductGrp()
        {
            return View();
        }

        public ActionResult ProductSubCate()
        {
            return View();
        }

        public ActionResult ProductColour()
        {
            return View();
        }

        public ActionResult SaveProduct(Product model)
        {
            String message = "";
            //String successmessage = "Product Added";
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                if (i==0)
                {
                    fb = Request.Files[i];
                    string filePath = "";
                    string fileName = "";
                    string sysFileName = "";
                    if (fb != null && fb.ContentLength > 0)
                    {
                        filePath = HttpContext.Server.MapPath("~/Uploads/");
                        DirectoryInfo di = new DirectoryInfo(filePath);
                        if (!di.Exists)
                        {
                            di.Create();
                        }
                        fileName = fb.FileName;
                        sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                        fb.SaveAs(filePath + "//" + sysFileName);
                        if (!string.IsNullOrWhiteSpace(fb.FileName))
                        {
                            string afileName = HttpContext.Server.MapPath("~/Uploads/") + "/" + sysFileName;
                        }
                    }

                    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
                    //var ReturnValue = "";
                    SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@choice", "Insert");
                    cmd.Parameters.AddWithValue("@ProdName", model.ProductName);
                    cmd.Parameters.AddWithValue("@PId", model.Id);
                    cmd.Parameters.AddWithValue("@ProdCatogery", model.ProductCatogery);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    cmd.Parameters.AddWithValue("@PColour", model.PC);
                    cmd.Parameters.AddWithValue("@PGrp", model.GrpId);
                    cmd.Parameters.AddWithValue("@PSubGrp", model.SubCateId);
                    cmd.Parameters.AddWithValue("@PFinish", model.FinishID);
                    cmd.Parameters.AddWithValue("@ImgName", sysFileName);
                    cmd.Parameters.AddWithValue("@PPrice", model.ProductPrice);
                    cmd.Parameters.AddWithValue("@UOM", model.UOM);
                    cmd.Parameters.AddWithValue("@Height", model.Height);
                    cmd.Parameters.AddWithValue("@Width", model.Width);
                    cmd.Parameters.AddWithValue("@Depth", model.Depth);
                    cmd.Parameters.AddWithValue("@Thickness", model.Thickness);
                    cmd.Parameters.AddWithValue("@P", "");
                    try
                    {
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                            message = ex.Message.ToString() + "Error.";
                    }
                    finally
                    {
                        con.Close();
                    }
                    
                }
                else
                    {
                        fb = Request.Files[i];
                        string filePath = "";
                        string fileName = "";
                        string sysFileName = "";
                        if (fb != null && fb.ContentLength > 0)
                        {
                            filePath = HttpContext.Server.MapPath("~/Uploads/");
                            DirectoryInfo di = new DirectoryInfo(filePath);
                            if (!di.Exists)
                            {
                                di.Create();
                            }
                            fileName = fb.FileName;
                            sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                            fb.SaveAs(filePath + "//" + sysFileName);
                            if (!string.IsNullOrWhiteSpace(fb.FileName))
                            {
                                string afileName = HttpContext.Server.MapPath("~/Uploads/") + "/" + sysFileName;
                            }
                            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
                            //var ReturnValue = "";
                            SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@choice", "InsertImg");
                            cmd.Parameters.AddWithValue("@PId", model.Id);
                            cmd.Parameters.AddWithValue("@ImgPath", filePath);
                            cmd.Parameters.AddWithValue("@PColour", model.PC);
                            cmd.Parameters.AddWithValue("@ImgName", sysFileName);
                            cmd.Parameters.AddWithValue("@P", "");
                            try
                            {
                                cmd.Connection = con;
                                con.Open();
                                cmd.ExecuteNonQuery();
                            }
                            catch (Exception ex)
                            {
                                message = ex.Message.ToString() + "Error.";
                            }
                            finally
                            {
                                con.Close();
                            }
                        }
                    }
                return Json(new { Response = true }, JsonRequestBehavior.AllowGet);
                //return Json(new { model = message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult cheakforId(string id)
        {
            try
            {
                return Json(new { model = (new Product().cheakforId(id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ProductList(Product model)
        {
            try
            {
                return Json(new Product().ProductList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UOM()
        {
            Product db = new Product();
            List<Product> obj = db.UOMList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        

        [HttpPost]
        public ActionResult GrpList()
        {
            Product db = new Product();
            List<Product> obj = db.GrpList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProdCategory(string GrpId)
        {
            Product db = new Product();
            List<Product> obj = db.ProdCategory(GrpId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProdCate(string GrpId)
        {
            Product db = new Product();
            List<Product> obj = db.ProdCate(GrpId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult AddProdCategory()
        {
            Product db = new Product();
            List<Product> obj = db.AddProdCategory();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProdSubCategory(string CategoryID)
        {
            Product db = new Product();
            List<Product> obj = db.ProdSubCategory(CategoryID);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProdSubCate(string CategoryID)
        {
            Product db = new Product();
            List<Product> obj = db.ProdSubCate(CategoryID);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult FinishList()
        {
            Product db = new Product();
            List<Product> obj = db.FinishList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UserProductList(Product model)
        {
            try
            {
                return Json(new Product().UserProductList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult DeleteProduct(string ProductId)
        {
            try
            {
                return Json(new { model = (new Product().DeleteProduct(ProductId)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { model = Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteImg(Product model)                                                                                                                                                                                                                               
        {
            try
            {
                return Json(new { model = (new Product().DeleteImg(model)) }, JsonRequestBehavior.AllowGet);   
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ProductDetails(string ProductId)
        {
            Product db = new Product();
            List<Product> obj = db.ProductDetails(ProductId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Editdata(string PName, string Cat, string UOM, string Ht, string Wdt, string Dpt, string Th, string Price,string Pid, string Col, string SubCategory, string Finish, string Category, string Grp)
        {
            try
            {
                Product customerModel = new Product();
                customerModel.ProductId = Pid;
                customerModel.ProductName = PName;
                customerModel.ProductCatogery = Cat;
                customerModel.UOM= UOM;
                customerModel.Height = Ht;
                customerModel.Width = Wdt;
                customerModel.Depth = Dpt;
                customerModel.Thickness = Th;
                customerModel.ProductPrice = Price;
                customerModel.colour = Col;
                customerModel.SubCateId = SubCategory;
                customerModel.Finish = Finish;
                customerModel.Category = Category;
                customerModel.GrpId = Grp;
                return Json(new { model = (new Product().Editdata(customerModel)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ProductImage(string ProductId)
        {
            Product db = new Product();
            List<Product> obj = db.ProductImage(ProductId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Colourlist()
        {
            Product db = new Product();
            List<Product> obj = db.Colourlist();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditColor(string ColourID, string colour)
        {
            try
            {
                return Json(new { model = (new Product().EditColor(ColourID, colour)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult AddNewImg(Product model)
        {
            String message = "";
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];

                    string filePath = "";
                    string fileName = "";
                    string sysFileName = "";
                    if (fb != null && fb.ContentLength > 0)
                    {
                        filePath = HttpContext.Server.MapPath("~/Uploads/");
                        DirectoryInfo di = new DirectoryInfo(filePath);
                        if (!di.Exists)
                        {
                            di.Create();
                        }
                        fileName = fb.FileName;
                        sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                        fb.SaveAs(filePath + "//" + sysFileName);
                        if (!string.IsNullOrWhiteSpace(fb.FileName))
                        {
                            string afileName = HttpContext.Server.MapPath("~/Uploads/") + "/" + sysFileName;
                        }
                    }
                    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
                    SqlCommand cmd = new SqlCommand("QA_AddNewImg", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProdID", model.ProductId);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    cmd.Parameters.AddWithValue("@ImgName", sysFileName);
                    try
                    {
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();

                    }
                    catch (Exception ex)
                    {
                        message = ex.Message.ToString() + "Error.";
                    }
                    finally
                    {
                        con.Close();
                    }
                }
                return ViewBag;
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult editImage(Product model)
        {
            String message = "";
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];

                    string filePath = "";
                    string fileName = "";
                    string sysFileName = "";
                    if (fb != null && fb.ContentLength > 0)
                    {
                        filePath = HttpContext.Server.MapPath("~/Uploads/");
                        DirectoryInfo di = new DirectoryInfo(filePath);
                        if (!di.Exists)
                        {
                            di.Create();
                        }
                        fileName = fb.FileName;
                        sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                        fb.SaveAs(filePath + "//" + sysFileName);
                        if (!string.IsNullOrWhiteSpace(fb.FileName))
                        {
                            string afileName = HttpContext.Server.MapPath("~/Uploads/") + "/" + sysFileName;
                        }
                    }
                    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
                    SqlCommand cmd = new SqlCommand("[QA_AddProduct]", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@PId", model.ProductId);
                    cmd.Parameters.AddWithValue("@Position", model.Position);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    cmd.Parameters.AddWithValue("@ImgName", sysFileName);
                    cmd.Parameters.AddWithValue("@choice", "EditImg");
                    cmd.Parameters.AddWithValue("@P", "");
                    try
                    {
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();

                    }
                    catch (Exception ex)
                    {
                        message = ex.Message.ToString() + "Error.";
                    }
                    finally
                    {
                        con.Close();
                    }
                }
                return ViewBag;
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddCate(string Prodgrp, string Prodcate, string CatID)
        {
            try
            {
                Product customerModel = new Product();
                customerModel.GrpId = Prodgrp;
                customerModel.Category = Prodcate;
                customerModel.CategoryID = CatID;

                return Json(new { model = (new Product().AddCate(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddColour(string Colour, string ColourId)
        {
            try
            {
                Product customerModel = new Product();
                customerModel.colour = Colour;
                customerModel.ColourID = ColourId;

                return Json(new { model = (new Product().AddColour(Colour, ColourId)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddSubCate(string Prodgrp, string Prodcate, string SubId)
        {
            try
            {
                Product customerModel = new Product();
                customerModel.CategoryID = Prodgrp;
                customerModel.SubCateId = Prodcate;
                customerModel.SCategory = SubId;

                return Json(new { model = (new Product().AddSubCate(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Deletecate(string CategoryID)
        {
            try
            {
                return Json(new { model = (new Product().Deletecate(CategoryID)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteColour(string ColourID)
        {
            try
            {
                return Json(new { model = (new Product().DeleteColour(ColourID)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteSubcate(string CategoryID)
        {
            try
            {
                return Json(new { model = (new Product().DeleteSubcate(CategoryID)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult EditCate(string Cate, string Grp)
        {
            try
            {
                return Json(new { model = (new Product().EditCate(Cate,Grp)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult EditSubCate(string Cate, string Grp)
        {
            try
            {
                return Json(new { model = (new Product().EditSubCate(Cate, Grp)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}