using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;

namespace genomicvariantserver
{
    internal class InMemoryCacheService: ICacheService
    {
        private readonly IMemoryCache _cache;
        private const string _key = "GENOME_VARIANTS_DICTIONARY";

        public InMemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Dictionary<string, List<GenomicVariant>> TryGetGenomicVariants()
        {
            Dictionary<string, List<GenomicVariant>> cacheEntry;

            // Look for cache key.
            _cache.TryGetValue(_key, out cacheEntry);

            return cacheEntry;
        }

        public void StoreGenomicVariants(Dictionary<string, List<GenomicVariant>> cacheEntry)
        {
            List<GenomicVariant> tryCacheEntry;
            if (!_cache.TryGetValue(_key, out tryCacheEntry))
            {
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromHours(24));

                // Save data in cache.
                _cache.Set(_key, cacheEntry, cacheEntryOptions);
            }
        }
    }
}