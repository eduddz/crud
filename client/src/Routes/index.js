import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "../Components/Dashboard";
import { Find } from "../Components/Find";
import { FindByName } from "../Components/FindByName";
import { Register } from "../Components/Register";
import { Update } from "../Components/Update";


export const Routess = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Register />} />
            <Route path="alterar" element={<Update />} />
            <Route path="consultapelonome" element={<FindByName />} />
            <Route path="consultar" element={<Find />} />
          </Route> 
        </Routes>
      </BrowserRouter>
  );
}