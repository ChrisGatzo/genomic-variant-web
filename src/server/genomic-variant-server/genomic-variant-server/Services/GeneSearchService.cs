using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FlatFiles;
using FlatFiles.TypeMapping;

namespace genomicvariantserver.Services
{
    public class GeneSearchService
    {
        private readonly GeneService _geneService;

        public GeneSearchService()
        {
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
            // TODO read genes dictionary from cache
            // cacheService.ReadGenes();
            // If cache is empty 
            var genomicVariants = _geneService.ReadGenomicVariantsFromTsv();
            var genomicVariantsDictionary = 
                _geneService.MapGenomicVariantsToDictionary(genomicVariants);
            // store result to cache
            // cacheService.StoreGenes(dictionary);

            return genomicVariantsDictionary;
        }
    }
}