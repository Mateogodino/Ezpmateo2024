using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ezpmateo2024.Models;

namespace Ezpmateo2024.Models
{
    public class EjerciciosFisicos
    {
        [Key]
        public int EjerciciosFisicosID { get; set; }
        public int TipoEjercicioID { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }
        public EstadoEmocional EstadoEmocionalInicio {get; set; } 
        public EstadoEmocional EstadoEmocionalFin {get; set; } 
        public string? Observaciones {get; set; }

        public virtual TipoEjercicio TipoEjercicio { get; set; }
    }

    public enum EstadoEmocional{
        Feliz = 1,
        Triste,
        Enojado,
        Ansioso,
        Estresado,
        Relajado,
        Aburrido,
        Emocionado,
        Agobiado,
        Confundido,
        Optimista,
        Pesimista,
        Motivado,
        Cansado,
        Eufórico,
        Agitado,
        Satisfecho,
        Desanimado
    }

    public class VistaSumaEjercicioFisico
    {
        public string? TipoEjercicioID {get; set;}
        public int TotalidadMinutos {get; set; }
        public int TotalidadDiasConEjercicio {get;set;}
        public int TotalidadDiasSinEjercicio {get;set;}

        public List<VistaEjercicioFisico>? DiasEjercicios {get;set;}
    }

    public class VistaEjercicioFisico
    {   
        public int EjerciciosFisicosID { get ; set; }
        public int TipoEjercicioID { get; set; }
        public object? EjercicioDescripcion { get; internal set; }
        public string InicioString { get; internal set; }
        public string FinString { get; internal set; }
        public string? EstadoEmocionalInicio { get; internal set; }
        public string? EstadoEmocionalFin { get; internal set; }
        public string? Observaciones { get; internal set; }
    }
}