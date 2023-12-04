import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

const InsertEvaluationForm = () => {
  const [evaluationForm, setEvaluationForm] = useState('');
  const [evaluationForms, setEvaluationForms] = useState([]);

  const handleEvaluationFormChange = (e) => {
    setEvaluationForm(e.target.value);
  };

  const handleInsertEvaluationForm = async () => {
    try {
      const { data, error } = await supabase
        .from('evaluationForm')
        .insert([{ evaluationForm: evaluationForm }]);

      if (error) {
        throw new Error('Failed to insert evaluation form');
      }

      // Después de una inserción exitosa, realiza una nueva consulta para actualizar los datos
      await fetchEvaluationForms();
    } catch (error) {
      console.error('Error inserting evaluation form:', error.message);
    }
  };

  const fetchEvaluationForms = async () => {
    try {
      const { data, error } = await supabase.from('evaluationForm').select('*');

      if (error) {
        throw new Error('Failed to fetch evaluation forms');
      }

      setEvaluationForms(data);
    } catch (error) {
      console.error('Error fetching evaluation forms:', error.message);
    }
  };

  useEffect(() => {
    // Realiza la consulta inicial al montar el componente
    fetchEvaluationForms();
  }, []);

  return (
    <div className="p-4">


      <h2 className="mt-4 text-xl font-bold">Evaluation Forms Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-2 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Evaluation Form</th>
            </tr>
          </thead>
          <tbody>
            {evaluationForms.map((form) => (
              <tr key={form.evaluationFormID}>
                <td className="border p-2">{form.evaluationFormID}</td>
                <td className="border p-2">{form.evaluationForm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label className="block mb-2">
        Evaluation Form:
        <input
          className="border border-gray-400 p-2 w-full"
          type="text"
          value={evaluationForm}
          onChange={handleEvaluationFormChange}
        />
      </label>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleInsertEvaluationForm}
      >
        Insert Evaluation Form
      </button>
    </div>
  );
};

export default InsertEvaluationForm;