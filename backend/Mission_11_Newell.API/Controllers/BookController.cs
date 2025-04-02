using Microsoft.AspNetCore.Mvc;
using Mission_11_Newell.API.Data;

namespace Mission_11_Newell.API.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class BookController : Controller
    {
        private BookDbContext _BookContext;
        
        public BookController(BookDbContext temp)
        {
            _BookContext = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _BookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Get total count
            var totalNumBooks = query.Count();

            // Apply pagination after sorting
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return the results
            var result = new
            {
                books,
                totalNumBooks
            };

            return Ok(result);
            
        }
        
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var bookTypes = _BookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
        
    }
}

