using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Ollamani.Data
{
    public class AlumnoRepository
    {
        public SqlService _db = new SqlService();

        // Se crea la capa de repositorio para las peticiones a la db con el service y mandar la respuetsa al controlador
        public DataTable ObtenerAlumnos()
        {
            return _db.EjecutarSP(
                "dbo.sp_Alumno_CRUD",
                new List<SqlParameter>
                {
                    new SqlParameter("@Accion", "GET")
                }
            );
        }
    }
}