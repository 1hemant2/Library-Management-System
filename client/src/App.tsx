import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./admin/Home";
import Home from "./user/Home";
import Operation from "./admin/Operation";
import History from "./user/History";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeAdmin></HomeAdmin>} path="/admin"></Route>
          <Route element={<Operation></Operation>} path="/admin/operation"></Route>
          <Route element={<Home></Home>} path="/"></Route>
          <Route element={<History></History>} path="/history"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;