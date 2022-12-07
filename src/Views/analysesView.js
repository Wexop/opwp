import NavScrollExample from "../header/Header"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useState } from "react"


export const AnalysesView = () => {

  const location = useLocation()

  const name = location.state.player

  let playerInfos = {
    playerLevel: 0
  }

  const [summoner, setSummoner] = useState()

  axios.get( `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ name }?api_key=RGAPI-58bb6b89-66ef-40d5-a51d-51c687318726` )
    .then( res => {
      setSummoner( res.data )
    } )

  console.log( summoner )

  if(summoner) {
    const summonerLevel = summoner["summonerLevel"]
    playerInfos.playerLevel = summonerLevel
  }



  return (
    <>
      <h1>wsh</h1>
      <h2>{ location.state.player }</h2>
      <h2>{ playerInfos.playerLevel }</h2>
    </>
  )
}
