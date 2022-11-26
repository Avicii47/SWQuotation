using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SWQuotation.Models
{
    public class UserModal
    {
        public string LinkName { get; set; }
        public string Link { get; set; }
        public string MenuName { get; set; }
        public string MenuPath { get; set; }
        public string LoginId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Mob { get; set; }
        public string Return { get; set; }
        public string Id { get; set; }
        public string Role { get; set; }

        public String AddUser(UserModal modal)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("SWQuot_AddUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@name", modal.Username);
                cmd.Parameters.AddWithValue("@password", modal.Password);
                cmd.Parameters.AddWithValue("@username", modal.Id);
                cmd.Parameters.AddWithValue("@mobno", modal.Mob);
                cmd.Parameters.AddWithValue("@role", modal.Role);
                cmd.Parameters.Add("@Return", SqlDbType.Int,50);
                cmd.Parameters["@Return"].Direction = ParameterDirection.Output;
                cmd.Parameters.AddWithValue("@choice", "Add");

                cmd.Connection = con;
                con.Open();
                cmd.ExecuteNonQuery();
                Return = Convert.ToString(cmd.Parameters["@Return"].Value);
                con.Close();

                if (Return == null)
                {
                    return ReturnValue;
                    
                }
                else
                {
                    return Return;
                }
            }
            catch (Exception ex)
            {
                message = ex.Message.ToString() + "Error.";
            }
            return ReturnValue;
        }

        public List<UserModal> GetRole()
        {
            String message = "";
            List<UserModal> PList = new List<UserModal>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from tbl_UserRole", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    UserModal Role = new UserModal();
                    Role.Id = dr.GetValue(0).ToString();
                    Role.Role = dr.GetValue(1).ToString();
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
    }
}