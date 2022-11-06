import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    RouteObject
  } from 'react-router-dom';
import { EditCustommer } from '../pages/EditCustommer';
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage"
import { NewCustommerForm } from '../pages/NewCustommerForm';

type TParams = { id: string };

// function Product({ match }: RouteObject<TParams>) {
//   return <h2>This is a page for product with ID: {match.params.id} </h2>;
// }

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