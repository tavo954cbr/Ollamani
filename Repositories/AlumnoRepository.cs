using Ollamani.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Ollamani.Data
{
    public class AlumnoRepository
    {
        private SqlService _db = new SqlService();

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

        public void GuardarAlumno(AlumnoModel model)
        {
            _db.EjecutarSPNonQuery(
                "dbo.sp_Alumno_CRUD",
                new List<SqlParameter>
                {
                    new SqlParameter("@Accion", "INSERT"),
                    new SqlParameter("@Nombre", model.Nombre),
                    new SqlParameter("@Grado", model.Grado),
                    new SqlParameter("@Edad", model.Edad)
                });
        }

        public void ActualizarAlumno(AlumnoModel model)
        {
            _db.EjecutarSPNonQuery(
                "dbo.sp_Alumno_CRUD",
                new List<SqlParameter>
                {
                    new SqlParameter("@Accion", "UPDATE"),
                    new SqlParameter("@IdAlumno", model.IdAlumno),
                    new SqlParameter("@Nombre", model.Nombre),
                    new SqlParameter("@Grado", model.Grado),
                    new SqlParameter("@Edad", model.Edad)
                });
        }

        public void EliminarAlumno(int idAlumno)
        {
            _db.EjecutarSPNonQuery(
                "dbo.sp_Alumno_CRUD",
                new List<SqlParameter>
                {
                    new SqlParameter("@Accion", "DELETE"),
                    new SqlParameter("@IdAlumno", idAlumno)
                });
        }
    }
}