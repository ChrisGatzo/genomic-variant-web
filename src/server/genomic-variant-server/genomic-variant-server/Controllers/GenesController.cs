using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using genomicvariantserver.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace genomicvariantserver
{
    [Route("api/[controller]")]
    public class GenesController : Controller
    {
        private IMemoryCache _cache;
        private readonly IGeneSearchService _geneSearchService;

        public GenesController(IMemoryCache memoryCache, IGeneSearchService geneSearchService)
        {
            _cache = memoryCache;
            _geneSearchService = geneSearchService;
        }

        // GET: api/genes/search?searchTerm={searchTerm}
        [HttpGet]
        [Route("search")]
        public IList<GenomicVariant> Search(string searchTerm)
        {
            return _geneSearchService.SearchGenomicVariants(searchTerm);
        }

        // GET api/genes/autocomplete?searchTerm={searchTerm}
        [HttpGet]
        [Route("autocomplete")]
        public IList<string> Autocomplete(string searchTerm)
        {
            return _geneSearchService.SearchAutocompleteGenes(searchTerm);
        }
    }
}
