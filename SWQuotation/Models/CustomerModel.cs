using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace SWQuotation.Models
{
    public class CustomerModel
    {
        public string t_cuid { get; set; }
        public string t_cnam { get; set; }
        public string To { get; set; }
        public string Attachment { get; set; }
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

        [RegularExpression("([1-9][0-9]*)", ErrorMessage = "Cannot be in decimal")]
        public string Nou { get; set; }
        public string Diso { get; set; }
        public string ProdId { get; set; }
        public string TotalPrice { get; set; }
        public string Advance { get; set; }
        public string Balance { get; set; }
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
        public string MobNo { get; set; }
        public string Display1 { get; set; }
        public string MobNo1 { get; set; }
        public string Email1 { get; set; }
        public string ShipCost { get; set; }
        public string InstallCost { get; set; }
        public string address { get; set; }
        public string gross { get; set; }
        public string custId { get; set; }
        public string QuDt { get; set; }
        public string Position { get; set; }
        public string FDate { get; set; }
        public string TDate { get; set; }
        public string StateId { get; set; }
        public string Tax { get; set; }
        public string addcode { get; set; }

        public string CheakCustomer(string t_cmob)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddCustomer", con);
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

        public string cheakTaxes(string billto, string shipto)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddCustomer", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@billto", billto);
            cmd.Parameters.AddWithValue("@shipto", shipto);
            cmd.Parameters.AddWithValue("@choice", "cheakTaxes");
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
            string Outparam="";
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddCustomer", con);
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
            cmd.Parameters.Add("@Return", SqlDbType.NVarChar,50);
            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;
            try
            {
                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();

                Outparam = cmd.Parameters["@Return"].Value.ToString();
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            finally
            {
                con.Close();
                ReturnValue = Outparam;
            }
            return ReturnValue;
        }

        public String AddAddress(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddCustomer", con);
            //cmd.Parameters.Add("@Return", SqlDbType.Int, 10);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cnam", customer.t_cnam);
            cmd.Parameters.AddWithValue("@t_cadd", customer.t_cadd);
            cmd.Parameters.AddWithValue("@Add2", customer.Address2);
            cmd.Parameters.AddWithValue("@Add3", customer.Address3);
            cmd.Parameters.AddWithValue("@Pincode", customer.Pincode);
            cmd.Parameters.AddWithValue("@City", customer.City);
            cmd.Parameters.AddWithValue("@District", customer.District); 
            cmd.Parameters.AddWithValue("@Landmark", customer.Landmark);
            cmd.Parameters.AddWithValue("@Country", customer.Country); 
            cmd.Parameters.AddWithValue("@State", customer.State);
            cmd.Parameters.AddWithValue("@choice", "AddAddress");
            cmd.Parameters.Add("@Return", SqlDbType.NVarChar, 50);

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
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@t_cuid", customer.t_cuid);
            cmd.Parameters.AddWithValue("@billto", customer.Billto);
            cmd.Parameters.AddWithValue("@shipto", customer.Shipto);
            cmd.Parameters.AddWithValue("@choice", "InsertIntoQuot");
            cmd.Parameters.Add("@Return", SqlDbType.NVarChar, 50);

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
            SqlCommand cmd = new SqlCommand("select * from swlive.dbo.ttdswc722100 where t_telp = '" + MobNo + "'", con);
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

        public List<CustomerModel> GetCustAdd(string AddressCode)
        {
            String message = "";
            List<CustomerModel> NCList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var MobNo = t_cmob;
            SqlCommand cmd = new SqlCommand("QA_Address", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@addresscode", AddressCode);
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCust = new CustomerModel();
                    NCust.address = dr.GetValue(0).ToString();

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

        public List<CustomerModel> GetAddress(string custid)
        {
            String message = "";
            List<CustomerModel> NCList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AddCustomer", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@choice", "GetAddress");
            cmd.Parameters.AddWithValue("@t_cnam", custid);
            cmd.Parameters.AddWithValue("@Return", 0);

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
                    NCust.Pincode = dr.GetValue(9).ToString();
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
            SqlCommand cmd = new SqlCommand("QA_ProductDDL", con);
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

        public List<CustomerModel> PricetList()
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_ProdPriceHistory", con);
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
                    Product.PId = dr.GetValue(1).ToString();
                    Product.FDate = dr.GetValue(2).ToString();
                    Product.TDate = dr.GetValue(3).ToString();
                    Product.PPrice = dr.GetValue(4).ToString();
                    Product.PName = dr.GetValue(5).ToString();
                    Product.t_catm = dr.GetValue(6).ToString();
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
            SqlCommand cmd = new SqlCommand("select t_ccty, t_dsca from swlive.dbo.ttcmcs010100 order by t_dsca asc", con);
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

        public List<CustomerModel> StateList(string countID)
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select t_cste,t_dsca from swlive.dbo.ttcmcs143100 where t_ccty = '" + countID + "' order by t_dsca", con);
            cmd.CommandType = CommandType.Text;
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
            SqlCommand cmd = new SqlCommand("select t_txcd, t_name , t_perc from swlive.dbo.ttdswc726100 ", con);
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
            SqlCommand cmd = new SqlCommand("QA_Taxes", con);
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
            SqlCommand cmd = new SqlCommand("select t_city,t_cste from swlive.dbo.ttccom139100 where t_cste = '" + StateId + "' order by t_city", con);
           
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
                    Product.SID = dr.GetValue(1).ToString();
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
            SqlCommand cmd = new SqlCommand("QA_GetProductPrice", con);
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

        public List<CustomerModel> AddressDetails(string AddressCode)
        {
            String message = "";
            List<CustomerModel> Price = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from swlive.dbo.ttdswc723100 where t_cadr = '" + AddressCode + "'", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel PPrice = new CustomerModel();
                    PPrice.AddressCode = dr.GetValue(0).ToString();
                    PPrice.t_cnam = dr.GetValue(1).ToString();
                    PPrice.City = dr.GetValue(2).ToString();
                    PPrice.District = dr.GetValue(3).ToString();
                    PPrice.Country = dr.GetValue(4).ToString();
                    PPrice.address = dr.GetValue(5).ToString();
                    PPrice.Address2 = dr.GetValue(6).ToString();
                    PPrice.Address3 = dr.GetValue(7).ToString();
                    PPrice.Pincode = dr.GetValue(8).ToString();
                    PPrice.State = dr.GetValue(9).ToString();
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
            SqlCommand cmd = new SqlCommand("QA_AddtoLiner", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QuotID", customer.QuID);
            cmd.Parameters.AddWithValue("@ProductID", customer.ProdId);
            cmd.Parameters.AddWithValue("@ProductName", customer.Prod);
            cmd.Parameters.AddWithValue("@DicoPri", customer.Topr);
            cmd.Parameters.AddWithValue("@Qty", customer.Nou);
            cmd.Parameters.AddWithValue("@Discount", customer.Diso);
            cmd.Parameters.AddWithValue("@DiscountN", customer.DisoN);
            cmd.Parameters.AddWithValue("@Amt", customer.Disoprice);
            cmd.Parameters.AddWithValue("@FinalPrice", customer.FinalPrice);
            cmd.Parameters.AddWithValue("@choice","add");
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
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            con.Open();
            cmd.Parameters.AddWithValue("@QuotID", QuotId);
            cmd.Parameters.AddWithValue("@choice", "AddedProdList");
            cmd.Parameters.AddWithValue("@Return", "");
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel AdPo = new CustomerModel();

                    AdPo.PId = dr.GetValue(0).ToString();
                    AdPo.PName = dr.GetValue(1).ToString();
                    AdPo.Position = dr.GetValue(2).ToString();
                    AdPo.PQty = dr.GetValue(3).ToString();
                    AdPo.PPrice = dr.GetValue(4).ToString();
                    AdPo.Diso = dr.GetValue(5).ToString();
                    AdPo.DisoN = dr.GetValue(6).ToString();
                    AdPo.DiscAmt = dr.GetValue(7).ToString();
                    AdPo.TPrice = dr.GetValue(8).ToString();
                    AdPo.Nou = dr.GetValue(9).ToString();

                    APList.Add(AdPo);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return APList;
        }

        public List<CustomerModel> Details(string QuotId ,string Position)
        {
            String message = "";
            var QuatId = QuotId;
            List<CustomerModel> APList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            con.Open();
            cmd.Parameters.AddWithValue("@QuotID", QuotId);
            cmd.Parameters.AddWithValue("@pono", Position);
            cmd.Parameters.AddWithValue("@choice", "getDetails");
            cmd.Parameters.AddWithValue("@Return", "");
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel AdPo = new CustomerModel();

                    AdPo.PName = dr.GetValue(0).ToString();
                    AdPo.Position = dr.GetValue(1).ToString();
                    AdPo.ProdId = dr.GetValue(2).ToString();
                    AdPo.PQty = dr.GetValue(3).ToString();
                    AdPo.PPrice = dr.GetValue(4).ToString();
                    AdPo.TPrice = dr.GetValue(5).ToString();
                    AdPo.Diso = dr.GetValue(6).ToString();
                    AdPo.DisoN = dr.GetValue(7).ToString();
                    AdPo.FinalPrice = dr.GetValue(8).ToString();

                    APList.Add(AdPo);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return APList;
        }

        public String FinalQuotation(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@QuotID", customer.QuotId);
            cmd.Parameters.AddWithValue("@advance", customer.Advance);
            cmd.Parameters.AddWithValue("@balance", customer.Balance);
            cmd.Parameters.AddWithValue("@cgst", customer.CGST);
            cmd.Parameters.AddWithValue("@sgst", customer.SGST);
            cmd.Parameters.AddWithValue("@igst", customer.IGST);
            cmd.Parameters.AddWithValue("@taxcode", customer.Taxper);
            cmd.Parameters.AddWithValue("@taxprice", customer.Taxes);
            cmd.Parameters.AddWithValue("@DiscAmt", customer.Diso);
            cmd.Parameters.AddWithValue("@shipCost", customer.ShipCost);
            cmd.Parameters.AddWithValue("@InstallCost", customer.InstallCost);
            cmd.Parameters.AddWithValue("@Total", customer.Topr); 
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);
            cmd.Parameters.AddWithValue("@choice", "Update");
            cmd.Parameters["@Return"].Direction = ParameterDirection.Output;

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
                Return = customer.QuotId;
                ReturnValue = Return;
            }
            return ReturnValue;
        }

        public List<CustomerModel> CustQuot(string QuotId, string Test)
        {
            String message = "";
            List<CustomerModel> NList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_CustomerQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@Id", Test);
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
                    NCList.GAmt = dr.GetValue(4).ToString();
                    NCList.Diso = dr.GetValue(5).ToString();
                    NCList.Taxes = dr.GetValue(6).ToString();
                    NCList.ShipCost = dr.GetValue(7).ToString();
                    NCList.InstallCost = dr.GetValue(8).ToString();
                    NCList.TotalPrice = dr.GetValue(9).ToString();
                    NCList.Advance = dr.GetValue(10).ToString();
                    NCList.Balance = dr.GetValue(11).ToString();
                    NCList.t_cnam = dr.GetValue(12).ToString();
                    NCList.t_cmob = dr.GetValue(13).ToString();
                    NCList.t_cmai = dr.GetValue(14).ToString();
                    NCList.t_cdob = dr.GetValue(15).ToString();
                    NCList.GST = dr.GetValue(16).ToString();
                    NCList.MobNo = dr.GetValue(17).ToString();
                    NCList.Billto = dr.GetValue(18).ToString();
                    NCList.Shipto = dr.GetValue(19).ToString();
                    NCList.MobNo1 = dr.GetValue(20).ToString();
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
            SqlCommand cmd = new SqlCommand("QA_CustomerQuot", con);
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
                    NCList.TotalPrice = dr.GetValue(5).ToString();
                    NCList.Position = dr.GetValue(6).ToString();
                    NCList.Prod = dr.GetValue(7).ToString();
                    NCList.Diso = dr.GetValue(8).ToString();
                    NCList.DisoN = dr.GetValue(9).ToString();
                    NCList.DiscAmt = dr.GetValue(10).ToString();
                    NCList.Nou = dr.GetValue(11).ToString(); ;
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

        public List<CustomerModel> GetFooter()
        {
            String message = "";
            List<CustomerModel> NList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select t_dnam,t_telp,t_emai from swlive.dbo.ttdswc728100  ", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel NCList = new CustomerModel();

                    NCList.Display1 = dr.GetValue(0).ToString();
                    NCList.MobNo1 = dr.GetValue(1).ToString();
                    NCList.Email1 = dr.GetValue(2).ToString();
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

        public List<CustomerModel> QuotDetail(string QuotId)
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("[QA_CustomerQuot]", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@choice", "Details");
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Role = new CustomerModel();
                    Role.QuotId = dr.GetValue(0).ToString();
                    Role.custId = dr.GetValue(1).ToString();
                    Role.QuDt = dr.GetValue(2).ToString();
                    Role.t_cmob = dr.GetValue(3).ToString();
                    Role.Billto = dr.GetValue(4).ToString();
                    Role.Shipto = dr.GetValue(5).ToString();
                    Role.ShipCost = dr.GetValue(6).ToString();
                    Role.InstallCost = dr.GetValue(7).ToString();
                    Role.Advance = dr.GetValue(8).ToString();
                    Role.t_cnam = dr.GetValue(9).ToString();
                    //Role.gross = dr.GetValue(5).ToString();
                    //Role.DiscAmt = dr.GetValue(6).ToString();
                    //Role.NetAmt = dr.GetValue(7).ToString();
                    //Role.TotalPrice = dr.GetValue(8).ToString();
                    //Role.Advance = dr.GetValue(9).ToString();
                    //Role.Balance = dr.GetValue(10).ToString();
                    //Role.TaxCode = dr.GetValue(11).ToString();
                    //Role.Tax = dr.GetValue(12).ToString();
                    //Role.CGST = dr.GetValue(13).ToString();
                    //Role.SGST = dr.GetValue(14).ToString();
                    //Role.IGST = dr.GetValue(15).ToString();
                    //Role.Taxes = dr.GetValue(16).ToString();
                    //Role.ShipCost = dr.GetValue(17).ToString();
                    //Role.InstallCost = dr.GetValue(18).ToString();
                    //Role.t_cnam = dr.GetValue(19).ToString();
                    //Role.t_cmob = dr.GetValue(20).ToString();
                    //Role.MobNo = dr.GetValue(21).ToString();
                    //Role.Email1 = dr.GetValue(22).ToString();
                    //Role.t_cdob = dr.GetValue(23).ToString();
                    //Role.GST = dr.GetValue(24).ToString();
                    //Role.TaxName = dr.GetValue(25).ToString();


                    PList.Add(Role);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }

        public List<CustomerModel> Qdetail(string QuotId)
        {
            String message = "";
            List<CustomerModel> PList = new List<CustomerModel>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("[QA_CustomerQuot]", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@choice", "Qdetail");
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CustomerModel Role = new CustomerModel();
                    Role.Tax = dr.GetValue(0).ToString();
                    Role.CGST = dr.GetValue(1).ToString();
                    Role.SGST = dr.GetValue(2).ToString();
                    Role.IGST = dr.GetValue(3).ToString();
                    Role.Taxes = dr.GetValue(4).ToString();
                    Role.ShipCost = dr.GetValue(5).ToString();
                    Role.InstallCost = dr.GetValue(6).ToString();
                    Role.TotalPrice = dr.GetValue(7).ToString();
                    Role.Advance = dr.GetValue(8).ToString();
                    Role.Balance = dr.GetValue(9).ToString();

                    PList.Add(Role);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();
            return PList;
        }




        public string DeleteQuotProduct(CustomerModel model)
        {
            String message = "";
            QuotId = model.QuotId;
            Position = model.Position;
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_CustomerQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@Position", Position);
            cmd.Parameters.AddWithValue("@choice", "DeleteProduct");
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
            return message;
        }
         
        public string DeleteADD(string AddressCode)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_EditAddress", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.Add("@Return", SqlDbType.Int, 10);
            cmd.Parameters.AddWithValue("@Address", AddressCode);
            cmd.Parameters.AddWithValue("@choice", "Delete");

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
            }
            return Return;
        }

        public string EditQuot(CustomerModel customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@QuotID", customer.QuotId);
                cmd.Parameters.AddWithValue("@advance", customer.Advance);
                cmd.Parameters.AddWithValue("@CustId", customer.t_cuid);
                cmd.Parameters.AddWithValue("@balance", customer.Balance);
                cmd.Parameters.AddWithValue("@cgst", customer.CGST);
                cmd.Parameters.AddWithValue("@sgst", customer.SGST);
                cmd.Parameters.AddWithValue("@igst", customer.IGST);
                cmd.Parameters.AddWithValue("@taxcode", customer.Taxper);
                cmd.Parameters.AddWithValue("@taxprice", customer.Taxes);
                cmd.Parameters.AddWithValue("@DiscAmt", customer.Diso);
                cmd.Parameters.AddWithValue("@shipCost", customer.ShipCost);
                cmd.Parameters.AddWithValue("@InstallCost", customer.InstallCost);
                cmd.Parameters.AddWithValue("@Total", customer.Topr);
                cmd.Parameters.AddWithValue("@billto", customer.Billto);
                cmd.Parameters.AddWithValue("@shipto", customer.Shipto);
                cmd.Parameters.Add("@Return", SqlDbType.Int, 10);
                cmd.Parameters.AddWithValue("@choice", "Editdata");
                cmd.Parameters["@Return"].Direction = ParameterDirection.Output;

                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                //return ReturnValue;
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            
            SqlCommand cmd1 = new SqlCommand("QA_AddtoQuot", con);
            cmd1.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd1.Parameters.AddWithValue("@billto", customer.Billto);
                cmd1.Parameters.AddWithValue("@shipto", customer.Shipto);
                cmd1.Parameters.AddWithValue("@CustId", customer.t_cuid);

                cmd1.Parameters.Add("@Return", SqlDbType.Int, 10);
                cmd1.Parameters.AddWithValue("@choice", "EAdd");
                cmd1.Parameters["@Return"].Direction = ParameterDirection.Output;

                cmd1.Connection = con;
                con.Open();
                cmd1.ExecuteNonQuery();
                con.Close();
                //return ReturnValue;
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }

            return ReturnValue;




        }

        public string EditADD(string Add1, string Add2, string Add3, string Country, string City, string Dist, string Pin, string State, string addcode)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("[QA_EditAddress]", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@city", City);
                cmd.Parameters.AddWithValue("@district", Dist);
                cmd.Parameters.AddWithValue("@state", State);
                cmd.Parameters.AddWithValue("@country", Country);
                cmd.Parameters.AddWithValue("@Add1", Add1);
                cmd.Parameters.AddWithValue("@Add2", Add2);
                cmd.Parameters.AddWithValue("@Add3", Add3);
                cmd.Parameters.AddWithValue("@Pincode",Pin);
                cmd.Parameters.AddWithValue("@Address", addcode);
                cmd.Parameters.AddWithValue("@choice", "Edit");
                cmd.Parameters.AddWithValue("@Return", "");

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

        public string Editproduct(string QuotId, string Postion,string Discprice,string No,string Diso,string DisoN, string dis, string price)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_EditProduct", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Quat", QuotId);
            cmd.Parameters.AddWithValue("@position", Postion);
     
            try
            {
                cmd.Parameters.AddWithValue("@DicoPer", Diso);
                cmd.Parameters.AddWithValue("@Qty", Discprice);
                cmd.Parameters.AddWithValue("@totalprice", No);
                cmd.Parameters.AddWithValue("@DiscountN", DisoN);
                cmd.Parameters.AddWithValue("@Discount", dis);
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

        public string Approved(string QuotId)
        {
            String message = "";
            var ReturnValue = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@QuotId", QuotId);
            cmd.Parameters.AddWithValue("@choice", "Approved");
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

        public string DeleteQuot(string QuotId)
        {
            String ReturnValue = "";
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@QuotId", QuotId);
            cmd.Parameters.AddWithValue("@choice", "Delete");
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

        public string cheakforedit(string QuotId)
        {
            String ReturnValue = "";
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AddtoQuot", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 300;
            cmd.Parameters.AddWithValue("@QuotId", QuotId);
            cmd.Parameters.AddWithValue("@choice", "CheckEdit");
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

        
    }
}