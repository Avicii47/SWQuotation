using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace SWQuotation.Models
{
    public class UserModal
    {
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
        public string QuotId { get; set; }
        public string CustId { get; set; }
        public string QuDt { get; set; }
        public string Total { get; set; }
        public string Adv { get; set; }
        public string Balance { get; set; }
        public string Status { get; set; }

        public String AddUser(UserModal modal)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_AddUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@name", modal.Username);
                cmd.Parameters.AddWithValue("@password", modal.Password);
                cmd.Parameters.AddWithValue("@username", modal.Id);
                cmd.Parameters.AddWithValue("@mobno", modal.Mob);
                cmd.Parameters.AddWithValue("@role", modal.Role);
                cmd.Parameters.Add("@Return", SqlDbType.Int, 50);
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

        public List<UserModal> GetAllQuot()
        {
            String message = "";
            List<UserModal> PList = new List<UserModal>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("QA_AllQuotList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@choice", "AllQuotList");
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    UserModal Role = new UserModal();
                    Role.QuotId = dr.GetValue(0).ToString();
                    Role.CustId = dr.GetValue(1).ToString();
                    Role.QuDt = dr.GetValue(2).ToString();
                    Role.Total = dr.GetValue(3).ToString();
                    Role.Adv = dr.GetValue(4).ToString();
                    Role.Balance = dr.GetValue(5).ToString();
                    Role.Status = dr.GetValue(6).ToString();

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

        public List<UserModal> userDetails(string Id)
        {
            String message = "";
            List<UserModal> PList = new List<UserModal>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            SqlCommand cmd = new SqlCommand("select * from swlive.dbo.ttdswc716100 where t_usid = '" + Id + "'", con);
            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 300;
            con.Open();
            try
            {
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    UserModal Role = new UserModal();
                    Role.Username = dr.GetValue(0).ToString();
                    Role.Password = dr.GetValue(1).ToString();
                    Role.Name = dr.GetValue(2).ToString();
                    Role.Mob = dr.GetValue(3).ToString();
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

        public string changepassword(UserModal customer)
        {
            String message = "";
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SWQ"].ConnectionString);
            var ReturnValue = "";
            SqlCommand cmd = new SqlCommand("QA_ChangePassword", con);
            //cmd.Parameters.Add("@P", SqlDbType.Int, 10);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                cmd.Parameters.AddWithValue("@Username", customer.Username);
                cmd.Parameters.AddWithValue("@name", customer.Name);
                cmd.Parameters.AddWithValue("@mob", customer.Mob);
                cmd.Parameters.AddWithValue("@Pass", customer.Password);

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

    }
}