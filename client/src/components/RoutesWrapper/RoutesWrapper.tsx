import { Route, Routes } from "react-router-dom";

import { Loading } from "../../components";
import { Lobby } from "../../pages";


export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} loader={() => <Loading/>} errorElement={<div>Error</div>}/>
    </Routes>
  )
}