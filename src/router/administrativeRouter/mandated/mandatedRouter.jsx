import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/mandated/home';
import { Users } from '../../../Pages/administrative/mandated/users/users';
import EvaluateA from '../../../components/evaluateUser';
import EvaFormI from '../../../Pages/administrative/mandated/evaluateAssignTeacher';


const MandatedRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Users" element={<Users />} />
        <Route path='evaluateHasUserID' element={<EvaluateA/>} />
        <Route path='evaluateAssignTeacher' element={<EvaFormI/>} />
      </Route>
    </Routes>
  );
};

export default MandatedRouter;
