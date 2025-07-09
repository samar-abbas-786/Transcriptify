import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

// Register fonts (optional - if you want custom fonts)
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf",
      fontWeight: 600,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Open Sans",
  },
  section: {
    marginBottom: 16,
    padding: 16,
    fontSize: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 6,
    borderLeft: "4px solid #4285F4",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#202124",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  point: {
    marginBottom: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    width: 10,
    fontSize: 14,
    color: "#4285F4",
  },
  pointText: {
    flex: 1,
    marginLeft: 6,
    lineHeight: 1.4,
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
});

// Create Document Component
const MyDocument = ({ summary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        {summary.map((data, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.heading}>{data.heading}</Text>
            {data.points.map((point, j) => (
              <View key={j} style={styles.point}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Viewer Component
const SummaryPdf = ({ summary }) => {
  return (
    <PDFViewer style={styles.viewer}>
      <MyDocument summary={summary} />
    </PDFViewer>
  );
};

export default SummaryPdf;
