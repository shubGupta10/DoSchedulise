import React from "react";
import {Route, Routes} from "react-router-dom";
import User from "./components/GetUser/User.js";
import Add from "./components/AddUser/Add.js"
import Home from "./components/Home.js";
import Edit from "./components/UpdateUser/Edit.js";
function App (){
    return(
        <Routes>
            <Route path={"/"} element={<Home/>} />
            <Route path={"/User"} element={<User/>}/>
            <Route path={"/add"} element={<Add/>}/>
            <Route path={"/edit/:id"} element={<Edit/>}/>
        </Routes>
    )
}

export default App