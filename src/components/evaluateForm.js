/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import 'tailwindcss/tailwind.css';  // Asegúrate de importar la hoja de estilos de Tailwind

const InsertQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleInsertQuestion = async () => {
    try {
      // Utiliza el método insert en lugar de upsert para realizar una inserción
      const { data, error } = await supabase.from('evaluateQuestion').insert([{ evaluateQuestion: question }]);

      if (error) {
        throw new Error('Failed to insert question');
      }

      // Después de una inserción exitosa, realiza una nueva consulta para actualizar los datos
      await fetchQuestions();
    } catch (error) {
      console.error('Error inserting question:', error.message);
    }
  };

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase.from('evaluateQuestion').select('*');

      if (error) {
        throw new Error('Failed to fetch questions');
      }

      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  useEffect(() => {
    // Realiza la consulta inicial al montar el componente
    fetchQuestions();
  }, []);

  return (
    <div>


      <h2 className="mt-4 text-xl font-bold">Questions Table</h2>
      <table className="min-w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">ID</th>
            <th className="border border-gray-300 py-2 px-4">Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.evaluateQuestionID} className="hover:bg-gray-50">
              <td className="border border-gray-300 py-2 px-4">{q.evaluateQuestionID}</td>
              <td className="border border-gray-300 py-2 px-4">{q.evaluateQuestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Question:
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <button
        onClick={handleInsertQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Insert Question
      </button>
    </div>
  );
};

export default InsertQuestionForm;