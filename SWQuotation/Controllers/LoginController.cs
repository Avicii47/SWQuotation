using SWQuotation.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SWQuotation.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            Login login = new Login();
            HttpCookie cookie = Request.Cookies["crm"];
            if (cookie != null)
            {
                string EncryptedPassword = cookie["password"].ToString();
                byte[] b = Convert.FromBase64String(EncryptedPassword);
                string decryptPassword = ASCIIEncoding.ASCII.GetString(b);

                ViewBag.username = cookie["username"].ToString();
                ViewBag.password = decryptPassword.ToString();
                ViewBag.check = true;
                login.RememberMe = true;
            }
            else
            {
                ViewBag.username = "";
                ViewBag.password = "";
                ViewBag.check = false;
            }
            return View();
        }

        public ActionResult LoginResult()
        {
            Login login = new Login();
            HttpCookie cookie = Request.Cookies["crm"];
            if (cookie != null)
            {
                string EncryptedPassword = cookie["password"].ToString();
                byte[] b = Convert.FromBase64String(EncryptedPassword);
                string decryptPassword = ASCIIEncoding.ASCII.GetString(b);

                ViewBag.username = cookie["username"].ToString();
                ViewBag.password = decryptPassword.ToString();
                ViewBag.check = true;
                login.RememberMe = true;
            }
            else
            {
                ViewBag.username = "";
                ViewBag.password = "";
                ViewBag.check = false;
            }
            return View();
        }
        [HttpPost]
        public ActionResult Login(Login users)
        {
            if (ModelState.IsValid)
            {
                //message will collect the String value from the model method.
                String message = users.LoginProcess(users.LoginId, users.Password);
                if (message.Equals("1"))
                {
                    //this will add cookies for the username.

                    Session["userId"] = users.LoginId;
                    Session["userName"] = users.UserName;
                    //Session["userLavel"] = users.Lavel;
                    //Session["LoginType"] = users.LoginType;

                    HttpCookie cookie = new HttpCookie("crm");
                    if (users.RememberMe == true)
                    {
                        cookie["username"] = users.LoginId;
                        byte[] b = ASCIIEncoding.ASCII.GetBytes(users.Password);
                        string EncryptedPassword = Convert.ToBase64String(b);
                        cookie["password"] = EncryptedPassword;
                        cookie.Expires = DateTime.Now.AddDays(7);
                        HttpContext.Response.Cookies.Add(cookie);
                        return RedirectToAction("Index", "Customers");
                    }
                    else
                    {
                        cookie.Expires = DateTime.Now.AddDays(-1);
                        HttpContext.Response.Cookies.Add(cookie);
                        return RedirectToAction("Index", "Customers");
                    }
                }
                else
                    ViewBag.ErrorMessage = message;
            }
            //return RedirectToAction("Index", "Customers");
            return View(users);
        }
    }
}