import { Navigate, Route, Routes } from "react-router-dom";

import { Loading } from "../../components";
import { Lobby, Login } from "../../pages";


export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/"  loader={() => <Loading />} element={<Navigate to="/lobby" />} />
      <Route path="/lobby" element={<Lobby />} loader={() => <Loading />} errorElement={<div>Error</div>} />
      <Route path="/login" element={<Login />} loader={() => <Loading />} errorElement={<div>Error</div>} />
    </Routes>
  )
}