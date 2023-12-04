import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfComponent = ({ rubricReadQuestion }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    headerCell: {
      width: '25%',
      fontWeight: 'bold',
    },
    cell: {
      width: '25%',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Rubrica</Text>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.cell]}>Question</Text>
            <Text style={[styles.headerCell, styles.cell]}>Excellent</Text>
            <Text style={[styles.headerCell, styles.cell]}>Good</Text>
            <Text style={[styles.headerCell, styles.cell]}>Medium</Text>
            <Text style={[styles.headerCell, styles.cell]}>Bad</Text>
          </View>
          {rubricReadQuestion.map((question) => (
            <View key={question.question} style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.cell]}>{question.question}</Text>
              <Text style={[styles.headerCell, styles.cell]}>{question.excellent}</Text>
              <Text style={[styles.headerCell, styles.cell]}>{question.good}</Text>
              <Text style={[styles.headerCell, styles.cell]}>{question.medium}</Text>
              <Text style={[styles.headerCell, styles.cell]}>{question.bad}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PdfComponent; 