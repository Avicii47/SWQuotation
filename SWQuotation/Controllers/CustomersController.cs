using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SWQuotation.Models;

namespace SWQuotation.Controllers
{
    public class CustomersController : Controller
    {
        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }

        public ActionResult Quot()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CheakCustomer(string t_cmob)
        {
            try
            {
                return Json(new { model = (new CustomerModel().CheakCustomer(t_cmob)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]

        public ActionResult AddCust(string Name, string mobile, string alterMobile, string dob, string Mail, string GstNo, string BillTo, string ShipTo)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.t_cnam = Name;
                customerModel.t_cmob = mobile;
                customerModel.t_catm = alterMobile;
                customerModel.t_cdob = dob;
                customerModel.t_cmai = Mail;
                customerModel.GST = GstNo;
                customerModel.Billto = BillTo;
                customerModel.Shipto = ShipTo;
                return Json(new { model = (new CustomerModel().AddCustomer(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddAddress(string Name, string Address, string Address2, string Address3, string StateName, string Pincode, string Landmark, string City, string District, string Country)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.t_cnam = Name;
                customerModel.t_cadd = Address;
                customerModel.Address2 = Address2;
                customerModel.Address3 = Address3;
                customerModel.State = StateName;
                customerModel.Pincode = Pincode;
                customerModel.Landmark = Landmark;
                customerModel.City = City;
                customerModel.District = District;
                customerModel.Country = Country;
                return Json(new { model = (new CustomerModel().AddAddress(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetNewCustomerDetails(string t_cmob)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.NewCustomerdeatils(t_cmob);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddtoQuot(string CustId, string BillTo, string ShipTo)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.t_cuid = CustId;
                customerModel.Billto = BillTo;
                customerModel.Shipto = ShipTo;

                return Json(new { model = (new CustomerModel().AddtoQuot(customerModel)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddtoLiner(string QuotationID,string ProductId,string Product,string Totalprice,string NoOfUnits,string Discount, string DiscountN, string Taxes,
                                        string TaxCode, string CGST, string SGST, string Discprice, string FinalPrice, string IGST)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.QuID = QuotationID;
                customerModel.ProdId = ProductId;
                customerModel.Prod = Product;
                customerModel.Topr = Totalprice;
                customerModel.Nou = NoOfUnits;
                customerModel.Diso = Discount;
                customerModel.DisoN = DiscountN;
                customerModel.Taxes = Taxes;
                customerModel.TaxesCode = TaxCode;
                customerModel.CGST = CGST;
                customerModel.SGST = SGST;
                customerModel.Disoprice = Discprice;
                customerModel.IGST = IGST;
                customerModel.FinalPrice = FinalPrice;


                return Json(new { model = (new CustomerModel().AddtoLiner(customerModel)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetProductList()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.ProductList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetCountry()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetCountry();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetAddress()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetAddress();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult getGST(string tax)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.getGST(tax);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetPrice(string PId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetPrice(PId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult StateList()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.StateList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult TaxesList()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.TaxesList();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult CityList(string StateId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.CityList(StateId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetList(string QuotId)
        {
            try
            {
                return Json(new CustomerModel().AddedProdList(QuotId), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult FinalQuotation(string QuotId, string Advance, string Balance,string TotalPrice,string TTax, string GAmt, string DiscAmt, string NetAmt)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.QuotId = QuotId;
                customerModel.Advance = Advance;
                customerModel.Balance = Balance;
                customerModel.TotalPrice = TotalPrice;
                customerModel.Taxes = TTax;
                customerModel.GAmt = GAmt;
                customerModel.DiscAmt = DiscAmt;
                customerModel.NetAmt = NetAmt;

                return Json(new { model = (new CustomerModel().FinalQuotation(customerModel)) }, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CustQuot(string QuotId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.CustQuot(QuotId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetQuotProduct(string QuotId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetQuotProduct(QuotId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}