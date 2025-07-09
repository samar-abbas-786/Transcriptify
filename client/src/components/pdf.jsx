import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

// Register fonts for better typography
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: 600,
    },
  ],
});

// Enhanced PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Inter",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderLeft: "3px solid #4F46E5",
  },
  transcriptText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#374151",
    textAlign: "justify",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
    borderTop: "1px solid #E5E7EB",
    paddingTop: 10,
  },
});

// PDF Document Component
const MyDocument = ({ transcript }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transcript Document</Text>
        <Text style={styles.subtitle}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.transcriptText}>{transcript}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Samar Abbas</Text>
      </View>
    </Page>
  </Document>
);

// Main Viewer Component
const TranscriptPDFViewer = ({ transcript }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="w-full flex-1 rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <PDFViewer
            width="100%"
            height="100%"
            style={{ minHeight: "calc(100vh - 48px)" }}
            className="rounded-lg"
          >
            <MyDocument transcript={transcript} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPDFViewer;
