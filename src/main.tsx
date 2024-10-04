import * as ReactDOM from "react-dom/client";
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import MainPage from "./components/MainPage/MainPage.tsx";
import Registration from './components/login/Registration.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
