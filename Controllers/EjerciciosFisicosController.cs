using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpmateo2024.Models;
using Ezpmateo2024.Data;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace Ezpmateo2024.Controllers;

[Authorize]
public class EjerciciosFisicosController : Controller 
{
    private ApplicationDbContext _context;

    //Comstructor
    public  EjerciciosFisicosController(ApplicationDbContext context)

    {
        _context = context;
    }

    public IActionResult Index()
    {
        

         // Crear una lista de SelectListItem que incluya el elemento adicional
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]" }
        };

        // Obtener todas las opciones del enum
        var enumValues = Enum.GetValues(typeof(EstadoEmocional)).Cast<EstadoEmocional>();

        // Convertir las opciones del enum en SelectListItem
        selectListItems.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString().ToUpper()
        }));

        // Pasar la lista de opciones al modelo de la vista
        ViewBag.EstadoInicio = selectListItems.OrderBy(t => t.Text).ToList();
        ViewBag.EstadoFin = selectListItems.OrderBy(t => t.Text).ToList();

        var EjerciciosFisicos = _context.TipoEjercicios.ToList();
        EjerciciosFisicos.Add(new TipoEjercicio{TipoEjercicioID = 0, Descripcion = "[SELECCIONE...]"});
        ViewBag.IdEjercicio = new SelectList(EjerciciosFisicos.OrderBy(c => c.Descripcion), "TipoEjercicioID", "Nombre");
        
        return View();
    }


    public JsonResult GetEjerciciosFisicos(int? EjerciciosFisicosID)
    {
        var EjerciciosFisicos = _context.EjerciciosFisicos.ToList();

        if (EjerciciosFisicosID != null)
        {
            EjerciciosFisicos = EjerciciosFisicos.Where(e => e.EjerciciosFisicosID == EjerciciosFisicosID).ToList();
        }

        return Json(EjerciciosFisicos.ToList());

    }

    public JsonResult GuardarEjercicioFisico(int IdEjercicioFisico, int TipoEjercicioID, DateTime Inicio, DateTime Fin, EstadoEmocional EstadoInicio, EstadoEmocional EstadoFin, string Observaciones)
    {
        //1- VERIFICAMOS SI REALMENTE INGRESO ALGUN CARACTER Y LA VARIABLE NO SEA NULL
        //INGRESA SI ESCRIBIO SI O SI       
        string resultado = "";
        if (IdEjercicioFisico != null)
        {
            //2- VERIFICAR SI ESTA EDITANDO O CREANDO NUEVO REGISTRO
            if (IdEjercicioFisico == 0)
            {
                var EjercicioFisico = new EjerciciosFisicos
                {
                    EjerciciosFisicosID = IdEjercicioFisico,
                    TipoEjercicioID = TipoEjercicioID,
                    Inicio = Inicio,
                    Fin = Fin,
                    EstadoEmocionalInicio = EstadoInicio,
                    EstadoEmocionalFin = EstadoFin,
                    Observaciones = Observaciones
                };
                _context.Add(EjercicioFisico);
                _context.SaveChanges();
            }   

            else{
                var ejercicioFisicoEditar = _context.EjerciciosFisicos.Where(e => e.EjerciciosFisicosID == IdEjercicioFisico).SingleOrDefault();
                
                {
                    var existeEjercicioFisico = _context.EjerciciosFisicos.Where(e => e.EjerciciosFisicosID == IdEjercicioFisico).Count(); {
                        ejercicioFisicoEditar.TipoEjercicioID = TipoEjercicioID;
                        ejercicioFisicoEditar.Inicio = Inicio;
                        ejercicioFisicoEditar.Fin = Fin;
                        ejercicioFisicoEditar.EstadoEmocionalInicio = EstadoInicio;
                        ejercicioFisicoEditar.EstadoEmocionalFin = EstadoFin;
                        ejercicioFisicoEditar.Observaciones = Observaciones;
                        _context.SaveChanges();
                    }
                }
            }
        }
        return Json(resultado);
    }
    
     public JsonResult GetEstadoEmocional(){
        var EstadoEmocional = Enum.GetNames(typeof(EstadoEmocional)).ToList();
        return Json(EstadoEmocional.ToList());
    }


    public JsonResult DeleteEjercicioFisico(int IdEjercicioFisico)
    {
        var EjercicioFisico = _context.EjerciciosFisicos.Find(IdEjercicioFisico);
        _context.Remove(EjercicioFisico);
        _context.SaveChanges();

        return Json(true);
    }
    
}