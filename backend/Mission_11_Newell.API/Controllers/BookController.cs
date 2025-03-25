using Microsoft.AspNetCore.Mvc;

namespace Mission_11_Newell.API.Controllers;

public class BookController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}