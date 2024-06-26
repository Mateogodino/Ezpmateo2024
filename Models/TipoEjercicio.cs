using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Ezpmateo2024.Models;

public class TipoEjercicio
{
    [Key]
    public int TipoEjercicioID { get; set; }
    public string? Descripcion { get; set; } 
    public bool Eliminado { get; set; }
    public virtual ICollection<EjerciciosFisicos> EjerciciosFisicos { get; set; } 
}
