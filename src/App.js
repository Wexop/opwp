import './App.css';
import "bootstrap"
import HomeView from "./Views/HomeView";
import {QueryClient} from "@tanstack/react-query";
import { Route, Link, BrowserRouter as Router, Routes, useNavigate, Redirect } from "react-router-dom"
import {AnalysesView} from "./Views/analysesView";
import NavScrollExample from "./header/Header";
import { useState } from "react"


function App() {
    return (
        <Router>
            <div>
                {NavScrollExample()}
                <Routes>
                    <Route path="/analyse/:name" element={<AnalysesView />}/>
                    <Route path="/" element={<HomeView />}/>
                </Routes>
            </div>
        </Router>

    );
}

export default App;
