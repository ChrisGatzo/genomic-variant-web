using System.Collections.Generic;
using System.IO;
using System.Linq;
using FlatFiles;
using FlatFiles.TypeMapping;

namespace genomicvariantserver
{
    public class GeneService : IGeneService
    {
        public Dictionary<string, List<GenomicVariant>> MapGenomicVariantsToDictionary(
            List<GenomicVariant> genomicVariants
        )
        {
            return genomicVariants
                .GroupBy(g => g.Gene)
                .ToDictionary(g => g.Key, g => g.ToList());
        }

        public List<GenomicVariant> ReadGenomicVariantsFromTsv()
        {
            var genomicVariants = new List<GenomicVariant>();
            var mapper = SeparatedValueTypeMapper.Define<GenomicVariant>();
            var options = new SeparatedValueOptions
            {
                Separator = "\t",
                RecordSeparator = "\n",
                PreserveWhiteSpace = false,
                // TODO values.Length != 23 is temporary workaround to fix bug with reading less columns
                PartitionedRecordFilter = (values) => string.IsNullOrEmpty(values[0]) || values.Length != 23,
                IsFirstRecordSchema = true,
                QuoteBehavior = QuoteBehavior.Default,
                Quote = '`'
            };

            mapper.Property(c => c.Gene).ColumnName("Gene");
            mapper.Property(c => c.NucleotideChange).ColumnName("Nucleotide Change");
            mapper.Property(c => c.ProteinChange).ColumnName("Protein Change");
            mapper.Property(c => c.OtherMappings).ColumnName("Other Mappings");
            mapper.Property(c => c.Alias).ColumnName("Alias");
            mapper.Property(c => c.Transcripts).ColumnName("Transcripts");
            mapper.Property(c => c.Region).ColumnName("Region");
            mapper.Property(c => c.ReportedClasification).ColumnName("Reported Classification");
            mapper.Property(c => c.InferredClasification).ColumnName("Inferred Classification");
            mapper.Property(c => c.Source).ColumnName("Source");
            mapper.Property(c => c.LastEvaluated).ColumnName("Last Evaluated");
            mapper.Property(c => c.LastUpdated).ColumnName("Last Updated");
            mapper.Property(c => c.Url).ColumnName("URL");
            mapper.Property(c => c.SubmitterComment).ColumnName("Submitter Comment");
            mapper.Property(c => c.Assembly).ColumnName("Assembly");
            mapper.Property(c => c.Chr).ColumnName("Chr");
            mapper.Property(c => c.GenomicStart).ColumnName("Genomic Start");
            mapper.Property(c => c.GenomicStop).ColumnName("Genomic Stop");
            mapper.Property(c => c.Ref).ColumnName("Ref");
            mapper.Property(c => c.Alt).ColumnName("Alt");
            mapper.Property(c => c.Accession).ColumnName("Accession");
            mapper.Property(c => c.ReportedRef).ColumnName("Reported Ref");
            mapper.Property(c => c.ReportedAlt).ColumnName("Reported Alt");

            using (StreamReader reader = new StreamReader(File.OpenRead(@"Data/variant_results.tsv")))
            {
                genomicVariants = mapper.Read(reader, options).ToList();
            }

            return genomicVariants;
        }
    }
}
