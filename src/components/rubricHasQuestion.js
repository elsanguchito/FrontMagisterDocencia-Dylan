import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

const RubricHasQuestion = () => {
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
        const { data, error } = await supabase
          .from('rubricHasQuestion')
          .select('rubricHasQuestionID,questionID,rubricID,excellent,good,medium,bad');

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
  }, []);

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
      <h2 className="text-2xl font-bold mb-4">Rubricas y Anotacion</h2>
      <div className="mb-4">
        <label htmlFor="questionID" className="block text-sm font-medium text-gray-600">Seleccione una anotacion:</label>
        <select
          id="questionID"
          value={questionID}
          onChange={event => setQuestionID(event.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="" disabled>
            Seleccione una anotacion
          </option>
          {questions.map(question => (
            <option key={question.questionID} value={question.questionID}>
              {question.question}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="rubricID" className="block text-sm font-medium text-gray-600">Seleccione una Rubrica:</label>
        <select
          id="rubricID"
          value={rubricID}
          onChange={event => setRubricID(event.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="" disabled>
            Seleccione una rubrica
          </option>
          {rubrics.map(rubric => (
            <option key={rubric.rubricID} value={rubric.rubricID}>
              {rubric.rubricName}
            </option>
          ))}
        </select>
      </div>
      {/* ... Otras entradas de formulario (Excelente, Bueno, Medio, Malo) */}
      <div className="mb-3">
          <label htmlFor="excellent">Excelente:</label>
          <input
            type="text"
            id="excellent"
            value={excellent}
            onChange={event => setExcellent(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="good">Bueno:</label>
          <input
            type="text"
            id="good"
            value={good}
            onChange={event => setGood(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medium">Medio:</label>
          <input
            type="text"
            id="medium"
            value={medium}
            onChange={event => setMedium(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bad">Malo:</label>
          <input
            type="text"
            id="bad"
            value={bad}
            onChange={event => setBad(event.target.value)}
          />
        </div>
      <div className="mb-4">
        <button className="bg-green-500 text-white p-2 rounded-md" type="submit">
          Agregar Rubrica y anotacion
        </button>
      </div>
      {/*<table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pregunta</th>
            <th>Rubrica</th>
            <th>Excelente</th>
            <th>Bueno</th>
            <th>Medio</th>
            <th>Malo</th>
          </tr>
        </thead>
        <tbody>
          {rubricHasQuestions.map(item => (
            <tr key={item.rubricHasQuestionID}>
              <td>{item.rubricHasQuestionID}</td>
              <td>{item.questionID}</td>
              <td>{item.rubricID}</td>
              <td>{item.excellent}</td>
              <td>{item.good}</td>
              <td>{item.medium}</td>
              <td>{item.bad}</td>
            </tr>
          ))}
        </tbody>
        </table> */}
    </form>
  );
};

export default RubricHasQuestion;