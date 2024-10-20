import { HomePage } from 'pages/home/index';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './constant';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} />} />
      <Route path={routes.home}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path="*" element={<Navigate to={routes.home} />} />
      </Route>
      <Route path="*" element={<Navigate to={routes.home} />} />
    </Routes>
  );
};
