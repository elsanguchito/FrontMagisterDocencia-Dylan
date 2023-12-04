import React, { useState } from 'react';
import supabase from '../supabase'; // Asegúrate de importar correctamente tu instancia de Supabase

const EvaluateTeacherForm = ({ rubricQuestions }) => {
  const [evaluationFormID, setEvaluationFormID] = useState('');

  const [rolHasUserID, setRolHasUserID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const question of rubricQuestions) {
        const { data, error } = await supabase
          .from('evaluateTeacher')
          .upsert([
            {
              evaluationFormID,
              evaluateQuestionID: question.questionID, // Use la pregunta actual para evaluateQuestionID
              rolHasUserID,
              excellent: question.excellent,
              medium: question.medium,
              bad: question.bad,
              good: question.good,
            },
          ], { onConflict: ['evaluateQuestionID'] }); // Upsert para evitar conflictos

        if (error) {
          console.error('Error upserting into evaluateTeacher:', error.message);
        } else {
          console.log('Successfully upserted into evaluateTeacher:', data);
          // Puedes realizar acciones adicionales después de la inserción, si es necesario
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Agrega aquí los campos del formulario para captura de datos */}
      <label>
        Evaluation Form ID:
        <input
          type="text"
          value={evaluationFormID}
          onChange={(e) => setEvaluationFormID(e.target.value)}
        />
      </label>
      <label>
        User ID:
        <input
          type="text"
          value={rolHasUserID}
          onChange={(e) => setRolHasUserID(e.target.value)}
        />
      </label>
      {/* Puedes agregar más campos según tus necesidades */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EvaluateTeacherForm;