import React from "react";
import Pagination from "../UI/Pagination/Pagination.jsx";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar/Navbar.jsx";
import Authorization from "../pages/Authorization.jsx";
import Registration from "../pages/Registration.jsx";
import AddMusic from "../pages/AddMusic.jsx";
import MusicPage from "../pages/MusicPage.jsx";
import RecoverPassword from "../pages/RecoverPassword.jsx"
import UpdatePassword from "../pages/UpdatePassword.jsx"
const AppRouter = (props) => {

  return (
    <HashRouter>
      <Navbar {...props} />
      <Routes>
        <Route path="/authorization" element={<Authorization {...props} />} />
        <Route path="/musicpage" element={<MusicPage {...props} />} />
        <Route path="/registration" element={<Registration {...props} />} />
        <Route path="/updatepassword" element={<UpdatePassword {...props} />} />
        <Route path="/addmusic" element={<AddMusic {...props} />} />
        <Route path="/recoverpassword" element={<RecoverPassword {...props} />} />
        <Route
          path="*"
          element={
            <div>
               <MusicPage {...props}/>
              <Outlet />
            </div>
          }
        />
      </Routes>
      <div>
         <Pagination {...props}></Pagination>
         </div>
    </HashRouter>
  );
};

export default AppRouter;