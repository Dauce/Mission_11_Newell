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

        [HttpGet ("AllProjects")]
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
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _BookContext.Books.Add(newBook);
            _BookContext.SaveChanges();
            return Ok(newBook);
        }
        
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _BookContext.Books.Find(bookID);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _BookContext.Books.Update(existingBook);
            _BookContext.SaveChanges();
            return Ok(existingBook);
        }

        
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _BookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }
            
            _BookContext.Books.Remove(book);
            _BookContext.SaveChanges();
            return NoContent();
        }
        
    }
}

