import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
import { EditCustommer } from '../pages/EditCustommer';
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"
import { NewCustommerForm } from '../pages/NewCustommerForm';
import { NewProduct } from '../pages/NewProductForm';
import { EditProduct } from '../pages/EditProduct';
import { RoutePage } from '../pages/RoutePage';

export function AppRouter() {
return (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/product/edit/:id" element={<EditProduct/>} />
      <Route path="/newproduct" element={<NewProduct/>} />
      <Route path="/custommer/edit/:id" element={<EditCustommer/>} />
      <Route path="/newcustommer" element={<NewCustommerForm/>} />
      <Route path="/rotas" element={<RoutePage/>} />
    </Routes>
  </Router>
);} 