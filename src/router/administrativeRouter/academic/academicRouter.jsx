import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../Pages/administrative/academic/home';
import QuestionI from '../../../Pages/administrative/academic/questionI';
import RubricHasQ from '../../../Pages/administrative/academic/rubricHasQ';
import EvaluateTeacher from '../../../Pages/administrative/academic/evaluateTeacherI';
const AcademicRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="questionI" element={<QuestionI/>}/>
        <Route path='rubricHasQ' element={<RubricHasQ/>} />
        <Route path='EvaluateTeacher' element={<EvaluateTeacher/>} />
      </Route>
    </Routes>
  );
};

export default AcademicRouter;
