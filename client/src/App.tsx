import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./pages/admin/Home";
import Home from "./pages/user/Home";
import Operation from "./pages/admin/Operation";
import History from "./pages/user/History";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./component/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected><HomeAdmin></HomeAdmin></Protected>} path="/admin"></Route>
          <Route element={<Protected><Operation></Operation></Protected>} path="/admin/operation/:name"></Route>
          <Route element={<Login></Login>} path='/admin/login'></Route>
          <Route element={<Register></Register>} path='/admin/register'></Route>
          <Route element={<History></History>} path="/history"></Route>
          <Route element={<Home></Home>} path="*"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;