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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "title", string sortOrder = "asc")
        {
            var query = _BookContext.Books.AsQueryable();

            // Normalize sortBy and sortOrder to lowercase
            sortBy = sortBy.ToLower();
            sortOrder = sortOrder.ToLower();

            // Apply sorting
            if (sortBy == "title")
            {
                query = sortOrder == "desc"
                    ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
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
        
    }
}

