using System;
using genomicvariantserver;
using System.Threading.Tasks;
using Moq;
using Xunit;
using Microsoft.Extensions.Caching.Memory;
using genomicvariantserver.Services;
using System.Collections.Generic;

namespace genomic_variant_server_tests
{
    public class GenesControllerTest
    {
        [Fact]
        public void Search_ReturnsAListOfGenomicVariants_WhenGivenASearchTerm()
        {
            // Arrange
            var searchTerm = "ExampleSearchTerm";
            var mockCache = new Mock<IMemoryCache>();
            var mockGeneService = new Mock<IGeneSearchService>();
            mockGeneService.Setup(repo => repo.SearchGenomicVariants(searchTerm))
                           .Returns(GetTestSearchGenomicVariants());
            var controller = new GenesController(mockCache.Object, mockGeneService.Object);

            // Act
            var result = controller.Search(searchTerm);

            // Assert
            Assert.IsType<List<GenomicVariant>>(result);
            Assert.Equal(2, result.Count);
        }

        [Fact]
        public void Autocomplete_ReturnsAListOfStrings_WhenGivenASearchTerm() 
        {
            // Arrange
            var searchTerm = "ExampleSearchTerm";
            var mockCache = new Mock<IMemoryCache>();
            var mockGeneService = new Mock<IGeneSearchService>();
            mockGeneService.Setup(repo => repo.SearchAutocompleteGenes(searchTerm))
                           .Returns(GetTestAutocompleteGenes());
            var controller = new GenesController(mockCache.Object, mockGeneService.Object);

            // Act
            var result = controller.Autocomplete(searchTerm);

            // Assert
            Assert.IsType<List<string>>(result);
            Assert.Equal(3, result.Count);
        }

        private List<GenomicVariant> GetTestSearchGenomicVariants()
        {
            return new List<GenomicVariant>
            {
                new GenomicVariant { Gene = "Test A" },
                new GenomicVariant { Gene = "Test B" }
            };
        }

        private List<string> GetTestAutocompleteGenes()
        {
            return new List<string>
            {
                "GeneA",
                "GeneB",
                "GeneC",
            };
        }
    }
}
