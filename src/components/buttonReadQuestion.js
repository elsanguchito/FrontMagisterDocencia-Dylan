import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import RubricReadQuestion from './rubricReadQuestion';
import { PDFViewer } from '@react-pdf/renderer';
import PDFComponent from './PDFcomponent';

const ButtonReadQuestion = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [rubricReadQuestions, setRubricReadQuestions] = useState([]);
  const [selectedRubric, setSelectedRubric] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRubricQuestions() {
      try {
        const { data, error } = await supabase.from('rubric_question_view').select('*');
        if (error) {
          throw new Error(error.message);
        }
        setRubricReadQuestions(data);
      } catch (error) {
        setError(`Error fetching rubric questions: ${error.message}`);
      }
    }

    fetchRubricQuestions();
  }, []);

  const generatePDF = () => {
    if (!selectedRubric) {
      setError("Por favor, seleccione una rubrica antes de generar el PDF.");
      return;
    }
    setShowPDF(true);
  };

  return (
    <div>
      {showPDF && selectedRubric && (
        <PDFViewer width="100%" height="200%">
          <PDFComponent rubricQuestions={rubricReadQuestions.filter(rubric => rubric.rubricID === parseInt(selectedRubric, 10))} />
        </PDFViewer>
      )}

      <RubricReadQuestion setSelectedRubric={setSelectedRubric} />

      <div>
        <button onClick={generatePDF}>Generate PDF</button>
      </div>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ButtonReadQuestion;