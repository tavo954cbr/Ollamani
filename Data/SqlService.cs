using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Ollamani.Data
{
    public class SqlService
    {
        private readonly string _connectionString;

        //Se genera el servicio de la conecion con la db sin usar entityframework se creo un sp para el CRUD 
        public SqlService()
        {
            _connectionString = ConfigurationManager
                .ConnectionStrings["DefaultConnection"].ConnectionString;
        }

        public void EjecutarSPNonQuery(string nombreSp, List<SqlParameter> parametros)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand(nombreSp, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                if (parametros != null)
                    cmd.Parameters.AddRange(parametros.ToArray());

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }


        public DataTable EjecutarSP(string nombreSp, List<SqlParameter> parametros = null)
        {
            DataTable dt = new DataTable();

            using (SqlConnection conn = new SqlConnection( _connectionString ))
            using (SqlCommand cmd = new SqlCommand(nombreSp, conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                if (parametros  != null )
                    cmd.Parameters.AddRange(parametros.ToArray());

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }

            return dt;
        }
    }
}