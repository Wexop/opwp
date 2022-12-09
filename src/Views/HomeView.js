import NavScrollExample from "../header/Header"
import "./homviewCss.css"
import React, { useState } from "react"
import { SimpleButton, simpleButtonStyle } from "../components/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ReactDOM from 'react-dom';
import {useNavigate} from "react-router-dom";



const HomeView = () => {

    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        const player = event.target.player.value
        console.log(player)

        navigate(`/analyse/${player}`)
    };



  /*    const mySuperQuery = useQuery(['my-super-query'], () => {
          return axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ "letmefreezepls" +'?api_key=RGAPI-ec328f75-295a-4408-81fc-86125a9ac658');
      });*/

  const TopWithInputPart = (
    <div className={ "container d-flex flex-column" }>
      <h1 className={ "text-center mt-5" }>Cherchez un joueur !</h1>
      <form onSubmit={ handleSubmit} style={{display: "flex", flexDirection: "column"}}>
        <input

          id={ "findPlayerInput" }
          type="text"
          name={"player"}
          className={ "align-self-center mb-4" }
          required={ true }/>
        <input type="submit"
               style={ simpleButtonStyle }
        value={"Go !"}/>
      </form>
    </div>
  )

  return (
    <>
      { TopWithInputPart }
    </>

  )
}

export default HomeView
