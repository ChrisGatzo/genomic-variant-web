using System;
using System.Collections.Generic;

namespace genomicvariantserver.Services
{
    public class GeneSearchService
    {
        public List<GenomicVariant> GetGenomicVariants()
        {
            return new List<GenomicVariant> {
                new GenomicVariant { Gene = "CYFIP1", ReportedClasification = "conflicting data from submitters " }
            };
        }
    }
    }