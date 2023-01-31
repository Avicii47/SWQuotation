using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace SWQuotation.Models
{
    public class Product
    {

        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImagePath { get; set; }
        public string Return { get; set; }
        public string ProductCatogery { get; set; }
        public string PC { get; set; }
        public string filePath { get; set; }
        public string fileName { get; set; }
        public string P { get; set; }
        public string Pic { get; set; }
        public string delete { get; set; }
        public string Img { get; set; }
        public string ProductPrice { get; set; }
        public string Position { get; set; }
        public string UOM { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string Depth { get; set; }
        public string Thickness { get; set; }
        public string UOMDesc { get; set; }
        public string colour { get; set; }
        public string Id { get; set; }
        public string Category { get; set; }


        public List<Product> ProductList()
        {
            String message = "";
            List<Product> ProductList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_ProductList", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product Prod = new Product();
                    Prod.ProductId = dr.GetValue(0).ToString();
                    Prod.ProductName = dr.GetValue(1).ToString();
                    Prod.PC = dr.GetValue(2).ToString();
                    Prod.ProductCatogery = dr.GetValue(3).ToString();
                    Prod.Height = dr.GetValue(4).ToString();
                    Prod.Width = dr.GetValue(5).ToString();
                    Prod.Depth = dr.GetValue(6).ToString();
                    Prod.Thickness = dr.GetValue(7).ToString();
                    Prod.UOM = dr.GetValue(8).ToString();
                    Prod.ProductPrice = dr.GetValue(9).ToString();
                    ProductList.Add(Prod);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return ProductList;
        }

        public string DeleteProduct(string ProductId)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@PId", ProductId);
            cmd.Parameters.AddWithValue("@choice", "Delete");
            cmd.Parameters.Add("@delete", SqlDbType.Int, 10);
            //cmd.Parameters.Add("@Img", SqlDbType.Int, 10);
            cmd.Parameters.Add("@Back", SqlDbType.NVarChar, 100);
            cmd.Parameters.AddWithValue("@P", "");


            cmd.Parameters["@delete"].Direction = ParameterDirection.Output;
            cmd.Parameters["@Back"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                delete = Convert.ToString(cmd.Parameters["@delete"].Value);
                Img = Convert.ToString(cmd.Parameters["@Back"].Value);

                string filename = Img;
                string filePath = HttpContext.Current.Server.MapPath("~/Uploads/" + filename);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                };
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = delete;
            }
            return ReturnValue;
        }

        public string cheakforId(string id)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@PId", id);
            cmd.Parameters.AddWithValue("@choice", "cheakforId");
            cmd.Parameters.Add("@P", SqlDbType.Int, 10);
            cmd.Parameters["@P"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                delete = Convert.ToString(cmd.Parameters["@P"].Value);
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = delete;
            }
            return ReturnValue;
        }

        public string DeleteImg(Product model)
        {
            String message = "";
            ProductId = model.ProductId;
            fileName = model.fileName;
            Position = model.Position;
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + fileName );
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            else {
                File.Delete(filePath);
            };


            SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PId", ProductId);
            cmd.Parameters.AddWithValue("@Position", Position);
            cmd.Parameters.AddWithValue("@choice", "DeleteImg");
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
            return ReturnValue;
        }

        public List<Product> UOMList()
        {
            String message = "";
            List<Product> UOMList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select t_cuni,t_dsca from swlive.dbo.ttcmcs001100", con);

            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product Ulist = new Product();
                    Ulist.UOM = dr.GetValue(0).ToString();
                    Ulist.UOMDesc = dr.GetValue(1).ToString();
                    UOMList.Add(Ulist);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return UOMList;
        }

        public List<Product> GetCategory()
        {
            String message = "";
            List<Product> PList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from tbl_ProductCategory", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product Category = new Product();
                    Category.Id = dr.GetValue(0).ToString();
                    Category.Category = dr.GetValue(1).ToString();
                    PList.Add(Category);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<Product> ProductDetails(string ProductId)
        {
            String message = "";
            List<Product> NCList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_ProductDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProductId", ProductId);
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product NCust = new Product();
                    NCust.ProductId = dr.GetValue(0).ToString();
                    NCust.ProductName = dr.GetValue(1).ToString();
                    NCust.ProductCatogery = dr.GetValue(2).ToString();
                    NCust.UOM = dr.GetValue(3).ToString();
                    NCust.Height = dr.GetValue(4).ToString();
                    NCust.Width = dr.GetValue(5).ToString();
                    NCust.Depth = dr.GetValue(6).ToString();
                    NCust.Thickness = dr.GetValue(7).ToString();
                    NCust.colour = dr.GetValue(8).ToString();
                    NCust.ProductPrice = dr.GetValue(9).ToString();
                    NCList.Add(NCust);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return NCList;
        }

        public string Editdata(Product customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddProduct", con);
            //cmd.Parameters.Add("@P", SqlDbType.Int, 10);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@PId", customer.ProductId);
                cmd.Parameters.AddWithValue("@ProdName", customer.ProductName);
                cmd.Parameters.AddWithValue("@ProdCatogery", customer.ProductCatogery);
                cmd.Parameters.AddWithValue("@UOM", customer.UOM);
                cmd.Parameters.AddWithValue("@Height", customer.Height);
                cmd.Parameters.AddWithValue("@Width", customer.Width);
                cmd.Parameters.AddWithValue("@Depth", customer.Depth);
                cmd.Parameters.AddWithValue("@Thickness", customer.Thickness);
                cmd.Parameters.AddWithValue("@PPrice", customer.ProductPrice);
                cmd.Parameters.AddWithValue("@PColour", customer.colour);
                cmd.Parameters.AddWithValue("@choice", "Update");
                cmd.Parameters.AddWithValue("@P", "");

                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                return ReturnValue;
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            return ReturnValue;
        }

        public List<Product> ProductImage(string ProductId)
        {
            String message = "";
            List<Product> NCList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from swlive.dbo.ttdswc720100 where t_item = '" + ProductId + "'", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product NCust = new Product();
                    NCust.ProductId = dr.GetValue(0).ToString();
                    NCust.Position = dr.GetValue(1).ToString();
                    NCust.Pic = dr.GetValue(2).ToString();
                    NCust.filePath = dr.GetValue(3).ToString();
                    NCList.Add(NCust);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return NCList;
           
        }

        public List<Product> UserProductList()
        {
            String message = "";
            List<Product> ProductList = new List<Product>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_UserProductList", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Product Prod = new Product();
                    Prod.ProductId = dr.GetValue(0).ToString();
                    Prod.ProductName = dr.GetValue(1).ToString();
                    Prod.ProductPrice = dr.GetValue(2).ToString();
                    Prod.Pic = dr.GetValue(3).ToString();
                    Prod.ImagePath = dr.GetValue(4).ToString();
                    ProductList.Add(Prod);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return ProductList;
        }

    }
}