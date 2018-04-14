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

        public GenesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        // GET: api/genes/search?searchTerm={searchTerm}
        [HttpGet]
        [Route("search")]
        public IList<GenomicVariant> Search(string searchTerm)
        {
            var cacheService = new InMemoryCacheService(_cache);
            var geneSearchService = new GeneSearchService(cacheService);
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
