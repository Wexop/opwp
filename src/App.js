import './App.css';
import "bootstrap"
import HomeView from "./Views/HomeView";
import {QueryClient} from "@tanstack/react-query";
import {Route, Link, BrowserRouter as Router, Routes} from "react-router-dom";
import {AnalysesView} from "./Views/analysesView";
import NavScrollExample from "./header/Header";


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

function Analyse() {
    return AnalysesView();
}

function Home() {
    return HomeView();
}

export default App;
