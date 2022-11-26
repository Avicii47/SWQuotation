using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SWQuotation.Models
{
    public class Login
    {
        [Required(ErrorMessage = "Please enter your User ID.")]
        [Display(Name = "Username : ")]
        public string LoginId { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Please enter your Password.")]
        [Display(Name = "Password : ")]
        public string Password { get; set; }

        public string UserName { get; set; }
        public int Lavel { get; set; }
        public bool RememberMe { get; set; }
        public string UrlLink { get; set; }
        public string LoginType { get; set; }
        public string filePath { get; set; }
        public string fileName { get; set; }
        public string MenuName { get; set; }
        public string MenuPath { get; set; }


        public static void ClearAspNetCache(HttpContext context)
        {
            foreach (DictionaryEntry entry in context.Cache)
            {
                context.Cache.Remove((string)entry.Key);
            }
        }

        //This method validates the Login credentials
        public String LoginProcess(String strUsername, String strPassword)
        {
            String message = "";
            //my connection string
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SWQuot_UserLogin", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@t_usid", strUsername);
            cmd.Parameters.AddWithValue("@t_pass", strPassword);
            try
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    Boolean login = (strPassword.Equals(reader["Password"].ToString(), StringComparison.InvariantCulture)) ? true : false;
                    if (login)
                    {
                        message = "1";
                        UserName = reader["UserName"].ToString();
                    }
                    else
                        message = "Invalid Credentials";
                }
                else
                    message = "Invalid Credentials";

                reader.Close();
                reader.Dispose();
                cmd.Dispose();
                con.Close();
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            return message;
        }
    }
}