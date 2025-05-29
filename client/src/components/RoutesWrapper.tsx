import { Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "./Loading";
import { Lobby } from "../pages/Lobby";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Game } from "../pages/Game";



const loadingLoader = () => <Loading />;
const errorElement = <div>Error</div>;

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" loader={loadingLoader} element={<Navigate to="/lobby" />} />
      <Route path="/lobby" element={<Lobby />} loader={loadingLoader} errorElement={errorElement} />
      <Route path="/login" element={<Login />} loader={loadingLoader} errorElement={errorElement} />
      <Route path="/register" element={<Register />} loader={loadingLoader} errorElement={errorElement} />
      <Route path="/game/:id" element={<Game />} loader={loadingLoader} errorElement={errorElement} />
    </Routes>
  )
}