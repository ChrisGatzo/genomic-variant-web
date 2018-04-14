using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using genomicvariantserver.Services;
using Microsoft.AspNetCore.Mvc;

namespace genomicvariantserver
{
    [Route("api/[controller]")]
    public class GenesController : Controller
    {
        // GET: api/genes/search?searchTerm={searchTerm}
        [HttpGet]
        [Route("search")]
        public IList<GenomicVariant> Search(string searchTerm)
        {
            var geneSearchService = new GeneSearchService();
            return geneSearchService.SearchGenomicVariants(searchTerm);
        }

        // GET api/genes/autocomplete?searchTerm={searchTerm}
        [HttpGet]
        [Route("autocomplete")]
        public string Autocomplete(string searchTerm)
        {
            return searchTerm;
        }
    }
}
