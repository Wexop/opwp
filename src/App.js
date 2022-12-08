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
                    <Route path="/analyse" element={<Analyse />}/>
                    <Route path="/" element={<Home />}/>
                </Routes>
            </div>
        </Router>

    );
}

function Analyse(props) {

    return AnalysesView();
}

function Home() {

    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        const player = event.target.player.value
        console.log(player)

        navigate("/analyse", {state: {
            player: player
            }})
    };

    return HomeView(handleSubmit);
}

export default App;
