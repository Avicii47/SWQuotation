using Newtonsoft.Json;
using SWQuotation.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;

namespace SWQuotation.Models
{
    public class CustomerModel
    {
        public string t_cuid { get; set; }
        public string t_cnam { get; set; }
        public string t_cadd { get; set; }
        public string t_cmob { get; set; }
        public string t_catm { get; set; }
        public string t_cmai { get; set; }
        public string t_cdob { get; set; }
        public string t_cgst { get; set; }
        public string Return { get; set; }
        public string PId { get; set; }
        public string PName { get; set; }
        public string PQty { get; set; }
        public string PPrice { get; set; }
        public string GST { get; set; }
        public string SID { get; set; }
        public string State { get; set; }
        public string QuotId { get; set; }
        public string TPrice { get; set; }
        public string QuID { get; set; }
        public string Prod { get; set; }
        public string Topr { get; set; }
        public string Nou { get; set; }
        public string Diso { get; set; }
        public string ProdId { get; set; }
        public string Position { get; set; }
        public string SId { get; set; }
        public string TotalPrice { get; set; }
        public string Advance { get; set; }
        public string Balance { get; set; }
        public string Catogery { get; set; }
        public string Id { get; set; }
        public string Img { get; set; }
        public string Pincode { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string Landmark { get; set; }
        public string PCol { get; set; }
        public string Taxes { get; set; }
        public string DisoN { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string AddressCode { get; set; }
        public string Billto { get; set; }
        public string Shipto { get; set; }
        public string TaxName { get; set; }
        public string Taxper { get; set; }
        public string TaxCode { get; set; }
        public string CGST { get; set; }
        public string SGST { get; set; }
        public string IGST { get; set; }
        public string FinalPrice { get; set; }
        public string TaxesCode { get; set; }
        public string Disoprice { get; set; }
        public string GAmt { get; set; }
        public string DiscAmt { get; set; }
        public string NetAmt { get; set; }
        public string QuotDt { get; set; }
        public string BCity { get; set; }
        public string BDistrict { get; set; }
        public string BState { get; set; }
        public string BCountry { get; set; }
        public string Bt_cadd { get; set; }
        public string BAddress2 { get; set; }
        public string BAddress3 { get; set; }

        public string CheakCustomer(string t_cmob)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddCustomer", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cmob", t_cmob);
            cmd.Parameters.AddWithValue("@choice", "check");
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);


            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();


                Return = Convert.ToString(cmd.Parameters["@Return"].Value);
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public String AddCustomer(CustomerModel customer)
        {
            String message = "";
            //return null;
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddCustomer", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cnam", customer.t_cnam);
            cmd.Parameters.AddWithValue("@t_cadd", customer.t_cadd);
            cmd.Parameters.AddWithValue("@t_cmob", customer.t_cmob);
            cmd.Parameters.AddWithValue("@t_catm", customer.t_catm);
            cmd.Parameters.AddWithValue("@t_cmai", customer.t_cmai);
            cmd.Parameters.AddWithValue("@t_cdob", customer.t_cdob.Trim());
            cmd.Parameters.AddWithValue("@t_cgst", customer.GST);
            cmd.Parameters.AddWithValue("@billto", customer.Billto);
            cmd.Parameters.AddWithValue("@shipto", customer.Shipto);
            cmd.Parameters.AddWithValue("@choice", "Insert");
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);

            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                Return = cmd.Parameters["@Return"].Value.ToString();

            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public String AddAddress(CustomerModel customer)
        {
            String message = "";
            //return null;
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddCustomer", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cnam", customer.t_cnam);
            cmd.Parameters.AddWithValue("@t_cadd", customer.t_cadd);
            cmd.Parameters.AddWithValue("@Add2", customer.Address2);
            cmd.Parameters.AddWithValue("@Add3", customer.Address3);
            cmd.Parameters.AddWithValue("@Pincode", customer.Pincode);
            cmd.Parameters.AddWithValue("@City", customer.Landmark);
            cmd.Parameters.AddWithValue("@District", customer.District); 
            cmd.Parameters.AddWithValue("@Landmark", customer.Landmark);
            cmd.Parameters.AddWithValue("@Country", customer.Country); 
            cmd.Parameters.AddWithValue("@State", customer.State);
            cmd.Parameters.AddWithValue("@choice", "AddAddress");
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);

            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                Return = cmd.Parameters["@Return"].Value.ToString();

            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public String AddtoQuot(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            //var message = "error";
            SqlCommand cmd = new SqlCommand("SWQuot_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cuid", customer.t_cuid);
            cmd.Parameters.AddWithValue("@billto", customer.Billto);
            cmd.Parameters.AddWithValue("@shipto", customer.Shipto);
            cmd.Parameters.AddWithValue("@choice", "InsertIntoQuot");
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);

            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;

            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                Return = cmd.Parameters["@Return"].Value.ToString();
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public List<CustomerModel> NewCustomerdeatils(string t_cmob)
        {
            String message = "";
            List<CustomerModel> NCList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var MobNo = t_cmob;
            SqlCommand cmd = new SqlCommand("select * from tbl_Customers where MobNo = '" + MobNo + "'", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCust = new CustomerModel();
                    NCust.t_cuid = dr.GetValue(0).ToString();
                    NCust.t_cnam = dr.GetValue(1).ToString();
                    NCust.t_cmob = dr.GetValue(2).ToString();
                    NCust.t_catm = dr.GetValue(3).ToString();
                    NCust.t_cmai = dr.GetValue(4).ToString();
                    NCust.t_cdob = dr.GetValue(5).ToString().Trim();
                    NCust.t_cgst = dr.GetValue(6).ToString();
                    NCust.Billto = dr.GetValue(7).ToString();
                    NCust.Shipto = dr.GetValue(8).ToString();

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

        public List<CustomerModel> GetAddress()
        {
            String message = "";
            List<CustomerModel> NCList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from tbl_CustomerAddress ", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCust = new CustomerModel();
                    NCust.AddressCode = dr.GetValue(0).ToString();
                    NCust.t_cnam = dr.GetValue(1).ToString();
                    NCust.City = dr.GetValue(2).ToString();
                    NCust.District = dr.GetValue(3).ToString();
                    NCust.State = dr.GetValue(4).ToString();
                    NCust.Country = dr.GetValue(5).ToString();
                    NCust.t_cadd = dr.GetValue(6).ToString();
                    NCust.Address2 = dr.GetValue(7).ToString();
                    NCust.Address3 = dr.GetValue(8).ToString();
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

        public List<CustomerModel> ProductList()
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_ProductDDL", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Product = new CustomerModel();
                    Product.PId = dr.GetValue(0).ToString();
                    Product.PName = dr.GetValue(1).ToString();
                    PList.Add(Product);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> GetCountry()
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from tbl_Country", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Product = new CustomerModel();
                    Product.PId = dr.GetValue(0).ToString();
                    Product.Country = dr.GetValue(1).ToString();
                    PList.Add(Product);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> StateList()
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_StateDDL", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Product = new CustomerModel();
                    Product.SID = dr.GetValue(0).ToString();
                    Product.State = dr.GetValue(1).ToString();
                    PList.Add(Product);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> TaxesList()
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select TaxCode, TaxName , TaxPer from tbl_Taxes ", con);
            //SqlCommand cmd = new SqlCommand("select TaxName , TaxPer from tbl_Taxes ", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Product = new CustomerModel();
                    Product.TaxCode = dr.GetValue(0).ToString();
                    Product.TaxName = dr.GetValue(1).ToString();
                    Product.Taxper = dr.GetValue(2).ToString();
                    PList.Add(Product);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> getGST(string tax)
        {
            String message = "";
            List<CustomerModel> Price = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_Taxes", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@getcode", tax);
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel PPrice = new CustomerModel();
                    PPrice.Taxes = dr.GetValue(0).ToString();
                    Price.Add(PPrice);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return Price;
        }

        public List<CustomerModel> CityList(string StateId)
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select CityName from tbl_City where StateId = '" + StateId + "'", con);
            //SqlCommand cmd = new SqlCommand("select * from tbl_Customers where MobNo = '" + MobNo + "'", con);
            
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Product = new CustomerModel();
                    Product.City = dr.GetValue(0).ToString();
                    PList.Add(Product);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> GetPrice(string PId)
        {
            String message = "";
            List<CustomerModel> Price = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            //var ProductId = PId;
            SqlCommand cmd = new SqlCommand("SWQuot_GetProductPrice", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            con.Open();
            cmd.Parameters.AddWithValue("@ProdId", PId);

            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel PPrice = new CustomerModel();
                    PPrice.PPrice = dr.GetValue(0).ToString();
                    Price.Add(PPrice);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return Price;
        }

        public String AddtoLiner(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddtoLiner", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@QuotID", customer.QuID);
            cmd.Parameters.AddWithValue("@ProductID", customer.ProdId);
            cmd.Parameters.AddWithValue("@ProductName", customer.Prod);
            cmd.Parameters.AddWithValue("@DicoPri", customer.Topr);
            cmd.Parameters.AddWithValue("@Qty", customer.Nou);
            cmd.Parameters.AddWithValue("@Discount", customer.Diso);
            cmd.Parameters.AddWithValue("@DiscountN", customer.DisoN);
            cmd.Parameters.AddWithValue("@Amt", customer.Disoprice);
            cmd.Parameters.AddWithValue("@TaxCode", customer.TaxesCode);
            cmd.Parameters.AddWithValue("@CGST", customer.CGST);
            cmd.Parameters.AddWithValue("@SGST", customer.SGST);
            cmd.Parameters.AddWithValue("@IGST", customer.IGST);
            cmd.Parameters.AddWithValue("@Taxes", customer.Taxes);
            cmd.Parameters.AddWithValue("@FinalPrice", customer.FinalPrice);

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
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public List<CustomerModel> AddedProdList(string QuotId)
        {
            String message = "";
            var QuatId = QuotId;
            List<CustomerModel> APList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select Position,ProductName,Qty,DicountPrice,Taxes,FinalPrice from tbl_QuotLiner where QuatId = '" + QuatId + "'", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel AdPo = new CustomerModel();

                    AdPo.Position = dr.GetValue(0).ToString();
                    AdPo.PName = dr.GetValue(1).ToString();
                    AdPo.PQty = dr.GetValue(2).ToString();
                    AdPo.Diso = dr.GetValue(3).ToString();
                    AdPo.Taxes = dr.GetValue(4).ToString();
                    AdPo.TPrice = dr.GetValue(5).ToString();

                    APList.Add(AdPo);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            //return dr;
            return APList;
        }

        public String FinalQuotation(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@QuotID", customer.QuotId);
            cmd.Parameters.AddWithValue("@advance", customer.Advance);
            cmd.Parameters.AddWithValue("@balance", customer.Balance);
            cmd.Parameters.AddWithValue("@totalAmount", customer.TotalPrice);
            cmd.Parameters.AddWithValue("@tax", customer.Taxes);
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);
            cmd.Parameters.AddWithValue("@choice", "Update");
            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;

            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                Return = cmd.Parameters["@Return"].Value.ToString();

            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public List<CustomerModel> CustQuot(string QuotId)
        {
            String message = "";
            List<CustomerModel> NList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_CustomerQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@choice", "GetList");
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCList = new CustomerModel();
                    NCList.QuotId = dr.GetValue(0).ToString();
                    NCList.t_cuid = dr.GetValue(1).ToString();
                    NCList.QuotDt = dr.GetValue(2).ToString();
                    NCList.NetAmt = dr.GetValue(3).ToString();
                    NCList.Taxes = dr.GetValue(4).ToString();
                    NCList.GAmt = dr.GetValue(5).ToString();
                    NCList.Diso = dr.GetValue(6).ToString();
                    NCList.TotalPrice = dr.GetValue(7).ToString();
                    NCList.Advance = dr.GetValue(8).ToString();
                    NCList.Balance = dr.GetValue(9).ToString();
                    NCList.t_cnam = dr.GetValue(10).ToString();
                    NCList.t_cmob = dr.GetValue(11).ToString();
                    NCList.t_cmai = dr.GetValue(12).ToString();
                    NCList.t_cdob = dr.GetValue(13).ToString();
                    NCList.GST = dr.GetValue(14).ToString();
                    NCList.Billto = dr.GetValue(15).ToString();
                    NCList.Shipto = dr.GetValue(16).ToString();

                    NList.Add(NCList);
                }
            }

            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return NList;
        }

        public List<CustomerModel> GetQuotProduct(string QuotId)
        {
            String message = "";
            List<CustomerModel> NList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_CustomerQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@choice", "GetProduct");
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCList = new CustomerModel();
                    NCList.PName = dr.GetValue(0).ToString();
                    NCList.PPrice = dr.GetValue(1).ToString();
                    NCList.Img = dr.GetValue(2).ToString();
                    NCList.PCol = dr.GetValue(3).ToString();
                    NCList.PQty = dr.GetValue(4).ToString();
                    NCList.Diso = dr.GetValue(5).ToString();
                    NCList.Taxes = dr.GetValue(6).ToString();
                    NCList.TotalPrice = dr.GetValue(7).ToString();

                    NList.Add(NCList);
                }
            }

            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return NList;
        }
    }
}