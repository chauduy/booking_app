import { useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Wrapper } from './App.style'
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
