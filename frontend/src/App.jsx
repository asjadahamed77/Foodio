import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ManageCategory from "./pages/ManageCategory";
import ManageItems from "./pages/ManageItems";
import ManageUsers from "./pages/ManageUsers";


function App() {


  return (
    <div>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/"  element= {<Home/>} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/manage-categories" element={<ManageCategory />} />
    <Route path="/manage-items" element={<ManageItems />} />
    <Route path="/manage-users" element={<ManageUsers />} />
    <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </BrowserRouter>


    </div>
  )
}

export default App
