import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./pages/admin/Home";
import Home from "./pages/user/Home";
import Operation from "./pages/admin/Operation";
import History from "./pages/user/History";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeAdmin></HomeAdmin>} path="/admin"></Route>
          <Route element={<Operation></Operation>} path="/admin/operation/:name"></Route>
          <Route element={<Login></Login>} path='/admin/login'></Route>
          <Route element={<Register></Register>} path='/admin/register'></Route>
          <Route element={<Home></Home>} path="/"></Route>
          <Route element={<History></History>} path="/history"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;