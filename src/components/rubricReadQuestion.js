import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

const RubricReadQueestion = () => {
  const [rubricHasQuestions, setRubricHasQuestions] = useState([]);
  const [questionID, setQuestionID] = useState('');
  const [rubricID, setRubricID] = useState('');
  const [excellent, setExcellent] = useState('-');
  const [good, setGood] = useState('-');
  const [medium, setMedium] = useState('-');
  const [bad, setBad] = useState('-');

  const [questions, setQuestions] = useState([]);
  const [rubrics, setRubrics] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRubricHasQuestions() {
      try {
        let query = supabase
          .from('rubricHasQuestion')
          .select('rubricHasQuestionID,questionID,rubricID,excellent,good,medium,bad');

        if (rubricID) {
          query = query.eq('rubricID', rubricID);
        }

        const { data, error } = await query;

        if (error) {
          setError(error.message);
        } else {
          setRubricHasQuestions(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    async function fetchQuestionsAndRubrics() {
      try {
        const { data: questionData, error: questionError } = await supabase
          .from('question')
          .select('questionID,question');

        const { data: rubricData, error: rubricError } = await supabase
          .from('rubric')
          .select('rubricID,rubricName');

        if (questionError || rubricError) {
          setError(questionError?.message || rubricError?.message);
        } else {
          setQuestions(questionData);
          setRubrics(rubricData);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchRubricHasQuestions();
    fetchQuestionsAndRubrics();
  }, [rubricID]);

  const handleAddRubricHasQuestion = async () => {
    if (questionID && rubricID) {
      try {
        const { data, error } = await supabase
          .from('rubricHasQuestion')
          .insert([
            {
              questionID,
              rubricID,
              excellent,
              good,
              medium,
              bad,
            }
          ]);

        if (error) {
          setError(error.message);
        } else {
          setRubricHasQuestions([...rubricHasQuestions, data[0]]);
          setQuestionID('');
          setRubricID('');
          setExcellent('-');
          setGood('-');
          setMedium('-');
          setBad('-');
          setError(null);
          // Puedes agregar un mensaje de éxito aquí
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Por favor, complete los campos de pregunta y rubrica.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleAddRubricHasQuestion} className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Rubricas y Anotaciones</h2>
      <div className="mb-4">
        <label htmlFor="rubricID" className="block text-sm font-medium text-gray-600">Seleccione una Rubrica:</label>
        <select
          id="rubricID"
          value={rubricID}
          onChange={event => setRubricID(event.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="">
            Seleccione una rubrica
          </option>
          {rubrics.map(rubric => (
            <option key={rubric.rubricID} value={rubric.rubricID}>
              {rubric.rubricName}
            </option>
          ))}
        </select>
      </div>
      {/* ... Resto del formulario y tabla */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Anotacion</th>
            <th className="py-2 px-4">Excelente</th>
            <th className="py-2 px-4">Bueno</th>
            <th className="py-2 px-4">Medio</th>
            <th className="py-2 px-4">Malo</th>
          </tr>
        </thead>
        <tbody>
          {rubricHasQuestions.map(item => (
            <tr key={item.rubricHasQuestionID} className="border-t border-gray-300">
              <td className="py-2 px-4">{getQuestionText(item.questionID)}</td>
              <td className="py-2 px-4">{item.excellent}</td>
              <td className="py-2 px-4">{item.good}</td>
              <td className="py-2 px-4">{item.medium}</td>
              <td className="py-2 px-4">{item.bad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );


  function getQuestionText(questionID) {
    const question = questions.find(q => q.questionID === questionID);
    return question ? question.question : '';
  }
};

export default RubricReadQueestion;