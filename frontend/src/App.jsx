import Header from "./components/Header"
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ManageCategory from "./pages/ManageCategory";
import ManageItems from "./pages/ManageItems";
import ManageUsers from "./pages/ManageUsers";
import  { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";


function App() {

  const location = useLocation()

  return (
    <div className="h-screen">
        {/* Hide header on login page */}
    {location.pathname !== "/login" && <Header />}

    <Toaster position="top-center" reverseOrder={false} />
  

    <div className="h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden">
    <Routes>
    <Route path="/"  element= {<Home/>} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/manage-categories" element={<ManageCategory />} />
    <Route path="/manage-items" element={<ManageItems />} />
    <Route path="/manage-users" element={<ManageUsers />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </div>
  


    </div>
  )
}

export default App
