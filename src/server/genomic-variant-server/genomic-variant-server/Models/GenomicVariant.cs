using System;
namespace genomicvariantserver
{
    public class GenomicVariant
    {
        public string Gene { get; set; }
        public string ReportedClasification { get; set; }
        public string NucleotideChange { get; set; }
        public string ProteinChange { get; set; }
        public string Region { get; set; }
        public string InferredClasification { get; set; }
        public string Source { get; set; }
        public string ReportedAlt { get; set; }
        public string ReportedRef { get; set; }
        public string AltAccession { get; set; }
        public string Ref { get; set; }
        public string GenomicStop { get; set; }
        public string GenomicStart { get; set; }
        public string Chr { get; set; }
        public string Assembly { get; set; }
        public string SubmitterComment { get; set; }
        public string Url { get; set; }
        public string LastUpdated { get; set; }
        public string LastEvaluated { get; set; }
        public string Transcripts { get; set; }
        public string Alias { get; set; }
        public string OtherMappings { get; set; }
    }
}
