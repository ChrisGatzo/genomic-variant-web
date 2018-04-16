using System.Collections.Generic;

namespace genomicvariantserver.Services
{
    public interface IGeneSearchService
    {
        List<string> SearchAutocompleteGenes(string searchTerm);
        List<GenomicVariant> SearchGenomicVariants(string searchTerm);
    }
}