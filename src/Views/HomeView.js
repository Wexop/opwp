import NavScrollExample from "../header/Header";
import "./homviewCss.css"
import React, {useState} from "react";
import {SimpleButton} from "../components/button";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const HomeView = () => {

    const [summoner, setSummoner] = useState('')

/*    const mySuperQuery = useQuery(['my-super-query'], () => {
        return axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ "letmefreezepls" +'?api_key=RGAPI-ec328f75-295a-4408-81fc-86125a9ac658');
    });*/

    const TopWithInputPart = (
        <div className={"container d-flex flex-column"}>
            <h1 className={"text-center mt-5"}>Cherchez un joueur !</h1>
            <input
                onChange={(event) => setSummoner(event.target.value)} id={"findPlayerInput"} type="text"
                   className={"align-self-center mb-4"}/>
            <SimpleButton text={"Go !"} onpress={() => {
            }}/>
        </div>
    )

    const getAnalyse = () => {

        return (
            <h2>
            </h2>
        )
    }

    return (
        <>
            {TopWithInputPart}
        </>

    )
}

export default HomeView
