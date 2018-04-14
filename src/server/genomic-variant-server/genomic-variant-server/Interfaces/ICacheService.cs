using System.Collections.Generic;

namespace genomicvariantserver
{
    public interface ICacheService
    {
        Dictionary<string, List<GenomicVariant>> TryGetGenomicVariants();
        void StoreGenomicVariants(Dictionary<string, List<GenomicVariant>> cacheEntry);
    }
}