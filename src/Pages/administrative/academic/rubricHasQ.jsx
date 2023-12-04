import React from "react";
import Prueba from '../../../components/rubricHasQuestion';

import Button from "../../../components/buttonReadQuestion";


export const RubricHasQ = () => {
  return (
    <div>
      <Prueba name={'Usuario'}  title={`Bienvenido a gestión de usuarios`} subtitle={'CRUD de Usuarios'} />
      {/*<RubricReadQueestion name={'Usuario'}  title={`Bienvenido a gestión de usuarios`} subtitle={'CRUD de Usuarios'}/>*/}
      <Button name={'Usuario'}  title={`Bienvenido a gestión de usuarios`} subtitle={'CRUD de Usuarios'} />
    </div>
  );
};

export default RubricHasQ;