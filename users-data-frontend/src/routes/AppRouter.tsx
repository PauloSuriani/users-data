import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
import { EditCustommer } from '../pages/EditCustommer';
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage"
import { NewCustommerForm } from '../pages/NewCustommerForm';

export function AppRouter() {
return (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/newcustommer" element={<NewCustommerForm/>} />
      <Route path="/custommer/edit/:id" element={<EditCustommer/>} />
    </Routes>
  </Router>
);} 