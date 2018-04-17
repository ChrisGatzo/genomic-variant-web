using System.Collections.Generic;
using System.Linq;

namespace genomicvariantserver.Services
{
    public class GeneSearchService : IGeneSearchService
    {
        private readonly ICacheService _cacheService;
        private readonly IGeneService _geneService;

        public GeneSearchService(ICacheService cacheService, IGeneService geneService)
        {
            _cacheService = cacheService;
            _geneService = geneService;
        }

        public List<GenomicVariant> SearchGenomicVariants(string searchTerm)
        {
            var genes = GetGenomicVariants();

            var toUpperSearchTerm = searchTerm?.ToUpper();

            return genes.ContainsKey(toUpperSearchTerm) ?
                        genes[toUpperSearchTerm] :
                        new List<GenomicVariant>();
        }

        public List<string> SearchAutocompleteGenes(string searchTerm) 
        {
            var genes = GetGenomicVariants();

            var toUpperSearchTerm = searchTerm?.ToUpper();

            List<string> keyList = new List<string>(genes.Keys);
            return keyList
                .Where(k => k.StartsWith(toUpperSearchTerm, System.StringComparison.Ordinal))
                .ToList();
        }

        public Dictionary<string, List<GenomicVariant>> GetGenomicVariants()
        {
            var genomicVariantsDictionary = _cacheService.TryGetGenomicVariants();
            if (genomicVariantsDictionary == null) {
                var genomicVariants = _geneService.ReadGenomicVariantsFromTsv();
                genomicVariantsDictionary =
                    _geneService.MapGenomicVariantsToDictionary(genomicVariants);
                _cacheService.StoreGenomicVariants(genomicVariantsDictionary);   
            }

            return genomicVariantsDictionary;
        }
    }
}