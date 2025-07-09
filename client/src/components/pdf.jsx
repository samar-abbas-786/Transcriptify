import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F9FAFB",
    padding: 30,
  },
  section: {
    marginBottom: 12,
    padding: 12,
    fontSize: 12,
    lineHeight: 1.6,
    color: "#111827",
  },
});

// PDF Document
const MyDocument = ({ transcript }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{transcript}</Text>
      </View>
    </Page>
  </Document>
);

// Main Viewer Component
const TranscriptPDFViewer = ({ transcript }) => {
  return (
    <div className="w-full min-h-screen  bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center">
      <div className="w-full flex-1 rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <PDFViewer width="100%" height="100%" style={{ minHeight: "100vh" }}>
          <MyDocument transcript={transcript} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default TranscriptPDFViewer;
