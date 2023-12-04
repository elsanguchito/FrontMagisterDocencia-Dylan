import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

const QuestionInsert = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data, error } = await supabase
          .from('question')
          .select('questionID,question');

        if (error) {
          setError(error.message);
        } else {
          setQuestions(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (question) {
      try {
        const { data, error } = await supabase
          .from('question')
          .insert([
            {
              question,
            },
          ]);

        if (error) {
          setError(error.message);
        } else {
          setQuestions([...questions, data[0]]);
          setQuestion('');
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Por favor, complete el campo de anotación.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleAddQuestion} className="my-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Anotaciones</h2>
        <div className="mb-3 flex items-center">
          <input
            type="text"
            placeholder="Anotacion"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="border rounded-l px-3 py-2 w-64 focus:outline-none"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-r"
            type="submit"
          >
            Agregar Anotacion
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID de Anotacion</th>
              <th className="py-2 px-4 border-b">Anotacion</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.questionID} className="border-b">
                <td className="py-2 px-4">{question.questionID}</td>
                <td className="py-2 px-4">{question.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default QuestionInsert;