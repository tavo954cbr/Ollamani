using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ollamani.Models
{
    public class AlumnoModel
    {
        public int IdAlumno { get; set; }
        public string Nombre { get; set; }
        public string Grado { get; set; }
        public int Edad {  get; set; }
    }
}