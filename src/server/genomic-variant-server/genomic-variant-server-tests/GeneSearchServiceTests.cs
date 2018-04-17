using System.Collections.Generic;
using genomicvariantserver;
using genomicvariantserver.Services;
using Moq;
using Xunit;

namespace genomic_variant_server_tests
{
    public class GeneSearchServiceTests
    {
        [Fact]
        public void SearchGenomicVariants_When_GivenAnExistingGeneAsSearchTerm_Then_ReturnsAListOfGenomicVariants()
        {
            var searchTerm = "Gene1";
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns(GetTestGenomicVariantsDictionary());
            var service = new GeneSearchService(mockCacheService.Object,
                                                mockGeneService.Object);

            var result = service.SearchGenomicVariants(searchTerm);

            Assert.IsType<List<GenomicVariant>>(result);
            Assert.Equal(2, result.Count);
            Assert.Equal(searchTerm.ToUpper(), result[0].Gene);
            Assert.Equal(searchTerm.ToUpper(), result[1].Gene);
            Assert.Equal("TestSource1", result[0].Source);
            Assert.Equal("TestSource2", result[1].Source);
        }

        [Fact]
        public void SearchGenomicVariants_When_GivenANonExistentGeneAsSearchTerm_Then_ReturnsAEmptyListOfGenomicVariants()
        {
            var searchTerm = "GeneFake";
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns(GetTestGenomicVariantsDictionary());
            var service = new GeneSearchService(mockCacheService.Object,
                                                mockGeneService.Object);

            var result = service.SearchGenomicVariants(searchTerm);

            Assert.IsType<List<GenomicVariant>>(result);
            Assert.Equal(0, result.Count);
        }

        [Fact]
        public void SearchAutocompleteGenes_When_GivenAnExistingGeneAsSearchTerm_Then_ReturnsAListOfStrings()
        {   
            var searchTerm = "Gene";
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns(GetTestGenomicVariantsDictionary());
            var service = new GeneSearchService(mockCacheService.Object,
                                                mockGeneService.Object);

            var result = service.SearchAutocompleteGenes(searchTerm);

            Assert.IsType<List<string>>(result);
            Assert.Equal(4, result.Count);
            Assert.True(result[0].StartsWith(searchTerm.ToUpper(), System.StringComparison.Ordinal));
            Assert.True(result[1].StartsWith(searchTerm.ToUpper(), System.StringComparison.Ordinal));
            Assert.True(result[2].StartsWith(searchTerm.ToUpper(), System.StringComparison.Ordinal));
            Assert.True(result[3].StartsWith(searchTerm.ToUpper(), System.StringComparison.Ordinal));
        }

        [Fact]
        public void SearchAutocompleteGenes_When_GivenANonExistentGeneAsSearchTerm_Then_ReturnsAnEmptyListOfStrings()
        {
            var searchTerm = "GeneFake";
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns(GetTestGenomicVariantsDictionary());
            var service = new GeneSearchService(mockCacheService.Object,
                                                mockGeneService.Object);

            var result = service.SearchAutocompleteGenes(searchTerm);

            Assert.IsType<List<string>>(result);
            Assert.Equal(0, result.Count);
        }

        [Fact]
        public void GetGenomicVariants_When_GenomicVariantsNotInCache_Then_ReadFromTsvIsCalledOnce() 
        {
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns((Dictionary<string, List<GenomicVariant>>)null);
            mockGeneService.Setup(repo => repo.ReadGenomicVariantsFromTsv())
                           .Returns((List<GenomicVariant>)null);
            mockGeneService.Setup(repo => repo.MapGenomicVariantsToDictionary(null))
                           .Returns((Dictionary<string, List<GenomicVariant>>)null);
            mockCacheService.Setup(repo => repo.StoreGenomicVariants(null));
            var service = new GeneSearchService(mockCacheService.Object,
                                          mockGeneService.Object);

            service.GetGenomicVariants();

            mockGeneService.Verify(x => x.ReadGenomicVariantsFromTsv(), Times.Once());
        }

        [Fact]
        public void GetGenomicVariants_When_GenomicVariantsInCache_Then_ReadFromTsvIsNotCalled()
        {
            var mockCacheService = new Mock<ICacheService>();
            var mockGeneService = new Mock<IGeneService>();
            mockCacheService.Setup(repo => repo.TryGetGenomicVariants())
                            .Returns(GetTestGenomicVariantsDictionary());
            var service = new GeneSearchService(mockCacheService.Object,
                                          mockGeneService.Object);

            service.GetGenomicVariants();

            mockGeneService.Verify(x => x.ReadGenomicVariantsFromTsv(), Times.Never());

        }

        private Dictionary<string, List<GenomicVariant>> GetTestGenomicVariantsDictionary()
        {
            return new Dictionary<string, List<GenomicVariant>>
            {
                {"GENE1", new List<GenomicVariant>{
                        new GenomicVariant { Gene = "GENE1", Source = "TestSource1"},
                        new GenomicVariant { Gene = "GENE1", Source = "TestSource2" }}},
                {"GENE2", new List<GenomicVariant>{new GenomicVariant{Gene = "GENE2", Source = "TestSource1"}}},
                {"GENE3", new List<GenomicVariant>{new GenomicVariant{Gene = "GENE3", Source = "TestSource1"}}},
                {"GENE4", new List<GenomicVariant>{new GenomicVariant{Gene = "GENE4", Source = "TestSource1"}}},
            };
        }
    }
}
