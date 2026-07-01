import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/About';
import Calculator from '../pages/Calculator';
import History from '../pages/History';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Report from '../pages/Report';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="report" element={<Report />} />
        <Route path="history" element={<History />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
