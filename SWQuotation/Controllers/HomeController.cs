using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using SWQuotation.Models;

namespace SWQuotation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult AddUser()
        {
            return View();
        }
        public ActionResult EditQuot()
        {
            return View();
        }
        public ActionResult ViewQuot()
        {
            return View();
        }

        public ActionResult WhatsappQuot()
        {
            return View();
        }

        public ActionResult Changepassword()
        {
            return View();
        }


        public ActionResult UserDetailInView()
        {
            String message = "";
            var tst = Session["userId"];
            List<UserModal> NCList = new List<UserModal>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_UserDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", tst);
            cmd.Parameters.AddWithValue("@choice", "Detail");
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    UserModal Prod = new UserModal();
                    Prod.MenuPath = dr.GetValue(0).ToString();
                    Prod.MenuName = dr.GetValue(1).ToString();
                    NCList.Add(Prod);
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con.Close();

            List<UserModal> username = new List<UserModal>();
            SqlConnection con1 = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd1 = new SqlCommand("select swlive.dbo.ttdswc716100.t_name from swlive.dbo.ttdswc716100 where swlive.dbo.ttdswc716100.t_usid= '" + tst + "'", con1);
            cmd1.CommandType = CommandType.Text;
            cmd1.CommandTimeout = 300;
            con1.Open();
            try
            {
                SqlDataReader dr = cmd1.ExecuteReader();
                while (dr.Read())
                {
                    UserModal Prod = new UserModal();
                    Prod.Name = dr.GetValue(0).ToString();
                    username.Add(Prod);

                    ViewBag.Prod = Prod.Name;
                    //return PartialView("UserDetailInView", Prod);
                }
                
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            con1.Close();
            
            return PartialView("UserDetailInView", NCList);
        }

        public ActionResult GetUserDetails(string t_cmob)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.NewCustomerdeatils(t_cmob);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            return RedirectToAction("Login", "Login");
        }

        [HttpPost]
        public ActionResult AddUser(UserModal modal)
        {
            try
            {
                return Json(new { model = (new UserModal().AddUser(modal)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetRole()
        {
            UserModal db = new UserModal();
            List<UserModal> obj = db.GetRole();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetAllQuot()
        {
            UserModal db = new UserModal();
            List<UserModal> obj = db.GetAllQuot();
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult QuotDetails(string QuotId)
        {
            CustomerModel db = new CustomerModel();
            List<CustomerModel> obj = db.QuotDetail(QuotId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public ActionResult userDetails(string Id)
        {
            UserModal db = new UserModal();
            List<UserModal> obj = db.userDetails(Id);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public ActionResult chgpassword(string ID, string Name, string Mob, string Pass)
        {
            try
            {
                UserModal customerModel = new UserModal();
                customerModel.Username = ID;
                customerModel.Name = Name;
                customerModel.Mob = Mob;
                customerModel.Password = Pass;
                return Json(new { model = (new UserModal().changepassword(customerModel)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




    }
}