using System.ComponentModel.DataAnnotations;

namespace Mission_11_Newell.API.Data;

public class Project
{
    [Key]
    public int BookID { get; set; }
    [Required]
    public string Title {get; set;}
    [Required]
    public string Author {get; set;}
    [Required]
    public string Publisher {get; set;}
    [Required]
    public string ISBN {get; set;}
    [Required]
    public string Classification {get; set;}
    [Required]
    public string Category {get; set;}
    [Required]
    public int PageCount {get; set;}
    [Required]
    public decimal Price {get; set;}
    
}