/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import 'tailwindcss/tailwind.css';

function Page() {
  const [evaluateTeachers, setEvaluateTeachers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvaluateTeachers() {
      try {
        const { data, error } = await supabase.from('evaluateTeacher').select('*');

        if (error) {
          setError(error.message);
        } else {
          setEvaluateTeachers(data);
          // Inicializa selectedOptions con las opciones por defecto para cada pregunta
          const initialSelectedOptions = {};
          data.forEach((teacher) => {
            initialSelectedOptions[teacher.evaluateTeacherID] = {
              excellent: teacher.excellent,
              good: teacher.good,
              medium: teacher.medium,
              bad: teacher.bad,
            };
          });
          setSelectedOptions(initialSelectedOptions);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchEvaluateTeachers();
  }, []);

  const handleOptionChange = (evaluateTeacherID, attribute) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [evaluateTeacherID]: {
        ...prevOptions[evaluateTeacherID],
        [attribute]: !prevOptions[evaluateTeacherID][attribute],
      },
    }));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const updateDatabase = async () => {
    try {
      for (const teacher of evaluateTeachers) {
        const { data, error } = await supabase
          .from('evaluateTeacher')
          .update({
            excellent: selectedOptions[teacher.evaluateTeacherID].excellent,
            good: selectedOptions[teacher.evaluateTeacherID].good,
            medium: selectedOptions[teacher.evaluateTeacherID].medium,
            bad: selectedOptions[teacher.evaluateTeacherID].bad,
          })
          .eq('evaluateTeacherID', teacher.evaluateTeacherID);

        if (error) {
          setError(error.message);
          return;
        }
      }

      alert('Selección actualizada en la base de datos.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">evaluateTeacherID</th>
            <th className="py-2 px-4 border-b">excellent</th>
            <th className="py-2 px-4 border-b">good</th>
            <th className="py-2 px-4 border-b">medium</th>
            <th className="py-2 px-4 border-b">bad</th>
            <th className="py-2 px-4 border-b">rolHasUserID</th>
          </tr>
        </thead>
        <tbody>
          {evaluateTeachers.map((teacher) => (
            <tr key={teacher.evaluateTeacherID} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{teacher.evaluateTeacherID}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedOptions[teacher.evaluateTeacherID].excellent}
                  onChange={() => handleOptionChange(teacher.evaluateTeacherID, 'excellent')}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedOptions[teacher.evaluateTeacherID].good}
                  onChange={() => handleOptionChange(teacher.evaluateTeacherID, 'good')}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedOptions[teacher.evaluateTeacherID].medium}
                  onChange={() => handleOptionChange(teacher.evaluateTeacherID, 'medium')}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedOptions[teacher.evaluateTeacherID].bad}
                  onChange={() => handleOptionChange(teacher.evaluateTeacherID, 'bad')}
                />
              </td>
              <td className="py-2 px-4 border-b">{teacher.rolHasUserID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={updateDatabase}
      >
        Confirmar selección y actualizar base de datos
      </button>
    </div>
  );
}

export default Page;