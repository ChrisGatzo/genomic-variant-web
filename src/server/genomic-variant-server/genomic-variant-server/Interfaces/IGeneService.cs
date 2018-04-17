using System.Collections.Generic;

namespace genomicvariantserver
{
    public interface IGeneService
    {
        Dictionary<string, List<GenomicVariant>> MapGenomicVariantsToDictionary(List<GenomicVariant> genomicVariants);
        List<GenomicVariant> ReadGenomicVariantsFromTsv();
    }
}