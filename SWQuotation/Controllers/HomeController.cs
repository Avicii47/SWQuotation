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


        public ActionResult UserDetailInView()
        {
            String message = "";
            var tst = Session["userId"];
            List<UserModal> NCList = new List<UserModal>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_UserDetails", con);
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
    }
}