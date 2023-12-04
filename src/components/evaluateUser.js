import React, { useState, useEffect } from 'react';
import supabase from '../supabase';

const EvaluateA = () => {
  const [rubrics, setRubrics] = useState([]);
  const [description, setDescription] = useState('');
  const [rubricName, setRubricName] = useState('');
  const [evaluateHasUserID, setEvaluateHasUserID] = useState('');
  const [evaluateUsers, setEvaluateUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener datos de la tabla rubric
        const { data: rubricData, error: rubricError } = await supabase
          .from('rubric')
          .select('rubricID, description, rubricName, evaluateHasUserID');

        if (rubricError) {
          setError(rubricError.message);
        } else {
          setRubrics(rubricData);
        }

        // Obtener datos de la tabla evaluateHasUser
        const { data: evaluateUserData, error: evaluateUserError } = await supabase
          .from('evaluateHasUser')
          .select('evaluateHasUserID, evaluateName');

        if (evaluateUserError) {
          setError(evaluateUserError.message);
        } else {
          setEvaluateUsers(evaluateUserData);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  const handleAddRubric = async () => {
    if (description && rubricName && evaluateHasUserID) {
      try {
        const { data, error } = await supabase
          .from('rubric')
          .insert([
            {
              description,
              rubricName,
              evaluateHasUserID: parseInt(evaluateHasUserID, 10),
            },
          ]);

        if (error) {
          setError(error.message);
        } else {
          setRubrics([...rubrics, data[0]]);
          setDescription('');
          setRubricName('');
          setEvaluateHasUserID('');
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Por favor, complete todos los campos obligatorios.');
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleAddRubric} className="m-4">
        <h2 className="text-2xl font-bold mb-4">Rubrica para asignar</h2>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Nombre de la Rúbrica"
            value={rubricName}
            onChange={(event) => setRubricName(event.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <select
            value={evaluateHasUserID}
            onChange={(event) => setEvaluateHasUserID(event.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="" disabled>
              Seleccione Usuario Evaluador
            </option>
            {evaluateUsers.map((user) => (
              <option key={user.evaluateHasUserID} value={user.evaluateHasUserID}>
                {user.evaluateName}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Agregar Rúbrica
          </button>
        </div>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Nombre de la Rúbrica</th>
            <th className="border p-2">ID de Usuario Evaluador</th>
          </tr>
        </thead>
        <tbody>
          {rubrics.map((rubric) => (
            <tr key={rubric.rubricID}>
              <td className="border p-2">{rubric.rubricID}</td>
              <td className="border p-2">{rubric.description}</td>
              <td className="border p-2">{rubric.rubricName}</td>
              <td className="border p-2">{rubric.evaluateHasUserID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluateA;