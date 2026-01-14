using Ollamani.Data;
using Ollamani.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Management;
using System.Web.Mvc;

namespace Ollamani.Controllers
{
    public class AlumnoController : Controller
    {
        private AlumnoRepository _repo = new AlumnoRepository();

        public ActionResult Index()
        {
            return View();
            //var repo = new AlumnoRepository();
            //var dt = repo.ObtenerAlumnos();
            //return View(dt);
        }

        [HttpGet]
        public JsonResult GetAlumnos()
        {
            var dt = _repo.ObtenerAlumnos();

            var alumnos = dt.AsEnumerable().Select(r => new
            {
                IdAlumno = r.Field<int>("IdAlumno"),
                Nombre = r.Field<string>("Nombre"),
                Grado = r.Field<string>("Grado"),
                Edad = r.Field<int>("Edad"),
                Activo = r.Field<bool>("Activo")
            }).ToList();

            return Json(alumnos, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertAlumnos(AlumnoModel model)
        {
            _repo.GuardarAlumno(model);
            return Json(new { success = true });
        }

        [HttpPost]
        public JsonResult UpdateAlumnos(AlumnoModel model)
        {
            _repo.ActualizarAlumno(model);
            return Json(new { success = true });
        }

        [HttpPost]
        public JsonResult DeleteAlumnos(int id)
        {
            try
            {
                _repo.EliminarAlumno(id);
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("ERROR AL ELIMINAR:");
                System.Diagnostics.Debug.WriteLine(ex.Message);
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);

                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CambiarEstado(int id, bool activo)
        {
            try
            {
                _repo.CambiarEstadoAlumno(id, activo);
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
