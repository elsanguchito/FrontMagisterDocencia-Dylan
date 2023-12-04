import React from "react";
import EvaTeacher from '../../../components/evaluateTeacherForm';
import EvaForm from '../../../components/evaluateForm';
import EvaQuestion from '../../../components/insertQuestionForm';

export const EvaFormI = () => {
 
    return (
        <div>
        {/*<EvaTeacher name={'Usuario'}  title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />*/}
        <EvaForm name={'Usuario'}  title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
        <EvaQuestion name={'Usuario'}  title={`Bienvenido a gestion de usuarios`} subtitle={'CRUD de Usuarios'} />
        </div>
        )
}
export default EvaFormI;