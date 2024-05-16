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
    public EjerciciosFisicosController(ApplicationDbContext context)

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
        ViewBag.EstadoEmocionalInicio = selectListItems.OrderBy(t => t.Text).ToList();
        ViewBag.EstadoEmocionalFin = selectListItems.OrderBy(t => t.Text).ToList();

        var EjerciciosFisicos = _context.TipoEjercicios.ToList();
        EjerciciosFisicos.Add(new TipoEjercicio { TipoEjercicioID = 0, Descripcion = "[SELECCIONE...]" });
        ViewBag.TipoEjercicioID = new SelectList(EjerciciosFisicos.OrderBy(c => c.Descripcion), "TipoEjercicioID", "Descripcion");

        return View();
    }

    public JsonResult MostrarListadoEjercicios(int? id)
    {
        List<VistaEjercicioFisico> MostrarEjercicios = new List<VistaEjercicioFisico>();

        var ejerciciosFisicos = _context.EjerciciosFisicos.ToList();
        if (id != null)
        {
            ejerciciosFisicos = ejerciciosFisicos.Where(e => e.EjerciciosFisicosID == id).ToList();
        }

        var Ejercicio = _context.TipoEjercicios.ToList();

        foreach (var ejercicioFisico in ejerciciosFisicos)
        {
            var ejercicio = Ejercicio.Where(e => e.TipoEjercicioID == ejercicioFisico.TipoEjercicioID).Single();

            var mostrarEjercicios = new VistaEjercicioFisico
            {
                EjerciciosFisicosID = ejercicioFisico.EjerciciosFisicosID,
                TipoEjercicioID = ejercicioFisico.TipoEjercicioID,
                EjercicioDescripcion = ejercicio.Descripcion,
                InicioString = ejercicioFisico.Inicio.ToString("dd/MM/yyyy HH:mm"),
                FinString = ejercicioFisico.Fin.ToString("dd/MM/yyyy HH:mm"),
                EstadoEmocionalInicio = Enum.GetName(typeof(EstadoEmocional), ejercicioFisico.EstadoEmocionalInicio),
                EstadoEmocionalFin = Enum.GetName(typeof(EstadoEmocional), ejercicioFisico.EstadoEmocionalFin),
                Observaciones = ejercicioFisico.Observaciones
            };
            MostrarEjercicios.Add(mostrarEjercicios);
        }

        return Json(MostrarEjercicios);
    }

    // public JsonResult GetEjerciciosFisicos(int? EjerciciosFisicosID)
    // {
    //     var EjerciciosFisicos = _context.EjerciciosFisicos.ToList();

    //     if (EjerciciosFisicosID != null)
    //     {
    //         EjerciciosFisicos = EjerciciosFisicos.Where(e => e.EjerciciosFisicosID == EjerciciosFisicosID).ToList();
    //     }

    //     return Json(EjerciciosFisicos.ToList());

    // }

    public JsonResult GuardarEjercicioFisico(int EjerciciosFisicosID, int TipoEjercicioID, DateTime Inicio, DateTime Fin, EstadoEmocional EstadoEmocionalInicio, EstadoEmocional EstadoEmocionalFin, string Observaciones)
    {
        //1- VERIFICAMOS SI REALMENTE INGRESO ALGUN CARACTER Y LA VARIABLE NO SEA NULL
        //INGRESA SI ESCRIBIO SI O SI       
        string resultado = "";
        if (EjerciciosFisicosID != null)
        {
            //2- VERIFICAR SI ESTA EDITANDO O CREANDO NUEVO REGISTRO
            if (EjerciciosFisicosID == 0)
            {
                var EjercicioFisico = new EjerciciosFisicos
                {
                    EjerciciosFisicosID = EjerciciosFisicosID,
                    TipoEjercicioID = TipoEjercicioID,
                    Inicio = Inicio,
                    Fin = Fin,
                    EstadoEmocionalInicio = EstadoEmocionalInicio,
                    EstadoEmocionalFin = EstadoEmocionalFin,
                    Observaciones = Observaciones
                };
                _context.Add(EjercicioFisico);
                _context.SaveChanges();
            }

            else
            {
                var ejercicioFisicoEditar = _context.EjerciciosFisicos.Find(EjerciciosFisicosID);
                if (ejercicioFisicoEditar != null)
                {
                    {
                        ejercicioFisicoEditar.TipoEjercicioID = TipoEjercicioID;
                        ejercicioFisicoEditar.Inicio = Inicio;
                        ejercicioFisicoEditar.Fin = Fin;
                        ejercicioFisicoEditar.EstadoEmocionalInicio = EstadoEmocionalInicio;
                        ejercicioFisicoEditar.EstadoEmocionalFin = EstadoEmocionalFin;
                        ejercicioFisicoEditar.Observaciones = Observaciones;
                        _context.SaveChanges();

                        resultado = "Ejercicio físico actualizado correctamente";
                    }
                }
            }
        }
        return Json(resultado);
    }

    //  public JsonResult GetEstadoEmocional(){
    //     var EstadoEmocional = Enum.GetNames(typeof(EstadoEmocional)).ToList();
    //     return Json(EstadoEmocional.ToList());
    // }


    public JsonResult EliminarEjercicioFisico(int EjerciciosFisicosID)
    {
        var EjercicioFisico = _context.EjerciciosFisicos.Find(EjerciciosFisicosID);
        _context.Remove(EjercicioFisico);
        _context.SaveChanges();

        return Json(true);
    }

    public JsonResult TraerListaEjercicios(int? EjerciciosFisicosID)
    {
        var EjerciciosFisicos = _context.EjerciciosFisicos.ToList();

        if (EjerciciosFisicosID != null)
        {
            EjerciciosFisicos = EjerciciosFisicos.Where(e => e.EjerciciosFisicosID == EjerciciosFisicosID).ToList();
        }

        return Json(EjerciciosFisicos.ToList());
    }
}