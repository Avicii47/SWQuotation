using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Windows.Media.Imaging;
using iTextSharp.text;
using iTextSharp.text.pdf;
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
        public ActionResult cheakTaxes(string billto, string shipto)
        {
            try
            {
                return Json(new { model = (new CustomerModel().cheakTaxes(billto,shipto)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetCustAdd(string AddressCode)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetCustAdd(AddressCode);
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
                return Json(new { model =  ex.Message }, JsonRequestBehavior.AllowGet);
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
        public ActionResult PricetList()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.PricetList();
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
        public ActionResult GetAddress(string custid)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetAddress(custid);
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

        public ActionResult AddressDetails(string AddressCode)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.AddressDetails(AddressCode);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult StateList(string StateId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.StateList(StateId);
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
        public ActionResult Details(string QuotId,string Position)
        {
            try
            {
                return Json(new CustomerModel().Details(QuotId, Position), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult EditADD(string Add1, string Add2, string Add3, string Country, string City, string Dist, string Pin, string State)
        {
            try
            {
                return Json(new CustomerModel().EditADD(Add1, Add2, Add3, Country, City, Dist, Pin, State), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult FinalQuotation(string QuotId, string Advance, string Balance,string TotalPrice,string TTax, string GAmt, string DiscAmt, string NetAmt, 
                                           string Taxes, string Taxesinno, string TaxCode, string CGST, string SGST, string IGST, string Transport, string Intsall,string DiscountPrice, string Tprice)
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
                customerModel.Taxper = Taxes;
                customerModel.NetAmt = Taxesinno;
                customerModel.CGST = CGST;
                customerModel.SGST = SGST;
                customerModel.IGST = IGST;
                customerModel.ShipCost = Transport;
                customerModel.InstallCost = Intsall;
                customerModel.Diso = DiscountPrice;
                customerModel.Topr = Tprice;

                return Json(new { model = (new CustomerModel().FinalQuotation(customerModel)) }, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CustQuot(string QuotId, string tst)
        {
            string Test = (string)Session["userId"];
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.CustQuot(QuotId, Test);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CustQuots(string QuotId, string ID)
        {
            string Test = ID;
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.CustQuot(QuotId, Test);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetQuotProduct(string QuotId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetQuotProduct(QuotId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Editproduct(string QuotId, string Postion, string No, string Discprice, string Diso, string DisoN, string dis, string price)
        {
            try
            {
                CustomerModel db = new CustomerModel();
                return Json(new { model = (new CustomerModel().Editproduct(QuotId, Postion, No, Discprice, Diso, DisoN, dis, price)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetFooter()
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.GetFooter();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteProduct(CustomerModel model)
        {
            try
            {
                return Json(new { model = (new CustomerModel().DeleteQuotProduct(model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteADD(string AddressCode)
        {
            try
            {
                return Json(new { model = (new CustomerModel().DeleteADD(AddressCode)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult sendemail(SendMail data)
        {
            var dir = Server.MapPath("~/PDF/");
            var fileName = dir + data.quot;
            
            var pdfBinary = Convert.FromBase64String(data.Attachment);
            dir = Server.MapPath("~/PDF/");
            if (!Directory.Exists(dir))
            {
                Directory.Delete(dir);
            }
            else
            {
                Directory.CreateDirectory(dir);
            }
            Directory.CreateDirectory(dir);

            fileName = dir + data.quot;
            string paths = Server.MapPath("~/PDF/" + data.quot);
            FileInfo file = new FileInfo(paths);

            if (file.Exists)//check file exsit or not  
            {
                using (var fsa = new FileStream(fileName, FileMode.Create))
                using (var writer = new BinaryWriter(fsa))
                {
                    writer.Write(pdfBinary, 0, pdfBinary.Length);
                    writer.Close();
                }
                var messages = "Mail Send!";
                try
                {
                    //var img= "<img src='~/images/loginlogo.png' />";
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("mail.spacewood.in");
                    
                    //SmtpServer.EnableSsl = false;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    mail.From = new MailAddress("exp.ngp@spacewood.in");
                    mail.To.Add(data.Email);
                    mail.Subject = "Spacewood Quotation";
                    mail.Body = "Hi " + data.Name + "," + " This is the requested Quotation " + " Thanks And Regards " + " Spacewood ";

                    System.Net.Mail.Attachment attachment;
                    attachment = new Attachment(dir + "/" + data.quot);
                    mail.Attachments.Add(attachment);

                    SmtpServer.Port = 587;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("exp.ngp@spacewood.in", "dYVK^Mbe8q#m");
                    SmtpServer.EnableSsl = false;

                    SmtpServer.Send(mail);
                    return Json(new { Response = messages }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception Ex)
                {
                    return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                 using (var fsa = new FileStream(fileName, FileMode.Create))
                 using (var writer = new BinaryWriter(fsa))
                 {
                    writer.Write(pdfBinary, 0, pdfBinary.Length);
                    writer.Close();
                 }
            
                 var messages = "Mail Send!";
                 try
                 {
                    //var img= "<img src='~/images/loginlogo.png' />";
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("mail.spacewood.in");

                    //SmtpServer.EnableSsl = false;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    mail.From = new MailAddress("exp.ngp@spacewood.in");
                    mail.To.Add(data.Email);
                    mail.Subject = "Spacewood Quotation";
                    mail.Body = "Hi " + data.Name + "," + " This is the requested Quotation " + " Thanks And Regards " + " Spacewood ";

                    System.Net.Mail.Attachment attachment;
                    attachment = new Attachment(dir + "/" + data.quot);
                    mail.Attachments.Add(attachment);

                    SmtpServer.Port = 587;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("exp.ngp@spacewood.in", "dYVK^Mbe8q#m");
                    SmtpServer.EnableSsl = false;

                    SmtpServer.Send(mail);
                    return Json(new { Response = messages }, JsonRequestBehavior.AllowGet);
                 }
                    catch (Exception Ex)
                 {
                    return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
                 }
            }
        }

        

        [HttpPost]
        public ActionResult EditQuot(string QuotId, string Advance, string Balance, string TotalPrice, string Tax, string GAmt, string DiscAmt, string NetAmt,
                                          string Taxes, string Taxesinno, string TaxCode, string CGST, string SGST, string IGST, string Transport, string Intsall, string DiscountPrice, string Tprice, string Billto, string Shipto)
        {
            try
            {
                CustomerModel customerModel = new CustomerModel();
                customerModel.QuotId = QuotId;
                customerModel.Advance = Advance;
                customerModel.Balance = Balance;
                customerModel.TotalPrice = TotalPrice;
                customerModel.Taxes = Tax;
                customerModel.GAmt = GAmt;
                customerModel.DiscAmt = DiscAmt;
                customerModel.NetAmt = NetAmt;
                customerModel.Taxper = TaxCode;
                customerModel.NetAmt = Taxesinno;
                customerModel.CGST = CGST;
                customerModel.SGST = SGST;
                customerModel.IGST = IGST;
                customerModel.ShipCost = Transport;
                customerModel.InstallCost = Intsall;
                customerModel.Diso = DiscountPrice;
                customerModel.Topr = Tprice;
                customerModel.Billto = Billto;
                customerModel.Shipto = Shipto;

                return Json(new { model = (new CustomerModel().EditQuot(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception Ex)
            {
                return Json(new { model = Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Approved(string QuotId)
        {
            try
            {
                return Json(new { model = (new CustomerModel().Approved(QuotId)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteQuot(string QuotId)
        {
            try
            {
                return Json(new { model = (new CustomerModel().DeleteQuot(QuotId)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult cheakforedit(string QuotId)
        {
            try
            {
                return Json(new { model = (new CustomerModel().cheakforedit(QuotId)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        
    }
}