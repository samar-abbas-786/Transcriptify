import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column", // better for multiple sections
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginBottom: 15,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  point: {
    marginBottom: 4,
  },
});

// Create Document Component
const MyDocument = ({ summary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {summary.map((data, i) => (
        <View style={styles.section} key={i}>
          <Text style={styles.heading}>{data.heading}</Text>
          {data.points.map((point, j) => (
            <Text style={styles.point} key={j}>
              • {point}
            </Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

// Viewer Component
const SummaryPdf = ({ summary }) => {
  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <MyDocument summary={summary} />
      </PDFViewer>
    </div>
  );
};

export default SummaryPdf;
