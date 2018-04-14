using System;
using Xunit;
using genomicvariantserver;
using System.Collections.Generic;

namespace genomic_variant_server_tests
{
    public class GeneServiceTests
    {
        [Fact]
        public void When_GivenAListOfGenomicVariants_Then_ReturnsDictionary()
        {
            var geneService = new GeneService();
            var list = new List<GenomicVariant> {
                new GenomicVariant { Gene = "CYFIP1", ProteinChange = "p.Ile1000Val" },
                new GenomicVariant { Gene = "CYFIP1", ProteinChange = "p.Cys972Tyr" },
                new GenomicVariant { Gene = "CYFIP1", ProteinChange = "p.Arg704His" },
                new GenomicVariant { Gene = "CYFIP1", ProteinChange = "" },
                new GenomicVariant { Gene = "DDX52", ProteinChange = "p.Ile1000Val" },
                new GenomicVariant { Gene = "AMY1A", ProteinChange = "p.Ile1000Val" },
                new GenomicVariant { Gene = "AMY1A", ProteinChange = "p.Ile1000Val" },
                new GenomicVariant { Gene = "AMY1A", ProteinChange = "p.Ile1000Val" },
            };

            var result = geneService.MapGenomicVariantsToDictionary(list);

            Assert.True(result.ContainsKey("CYFIP1"));
            Assert.True(result.ContainsKey("DDX52"));
            Assert.True(result.ContainsKey("AMY1A"));
            Assert.Equal(result["CYFIP1"].Count, 4);
        }
    }
}
