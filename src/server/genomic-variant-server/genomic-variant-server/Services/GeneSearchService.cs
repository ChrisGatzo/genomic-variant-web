using System.Collections.Generic;

namespace genomicvariantserver.Services
{
    public class GeneSearchService
    {
        private readonly ICacheService _cacheService;
        private readonly GeneService _geneService;

        public GeneSearchService(ICacheService cacheService)
        {
            _cacheService = cacheService;
            _geneService = new GeneService();
        }

        public List<GenomicVariant> SearchGenomicVariants(string searchTerm)
        {
            var genes = GetGenomicVariants();

            return genes.ContainsKey(searchTerm) ?
                        genes[searchTerm] :
                        new List<GenomicVariant>();
        }

        private Dictionary<string, List<GenomicVariant>> GetGenomicVariants()
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