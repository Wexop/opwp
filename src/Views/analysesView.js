import {useLocation} from "react-router-dom"
import axios from "axios"
import {useState} from "react"
import {riotAPIKey} from "../utile/riotAPIKey";


export const AnalysesView = () => {

    const location = useLocation()

    const name = location.state.player

    let playerInfos = {
        playerLevel: 0,
        playerName: "",
        accountId: "",
        id: "",
        profileIconId: "",
        puuid: "",
        revisionDate: "",
    }

    const [summoner, setSummoner] = useState()

    axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotAPIKey}`)
        .then(res => {
            setSummoner(res.data)
        })

    console.log(summoner)

    if (summoner) {
        playerInfos.playerLevel = summoner["summonerLevel"]
        playerInfos.playerName = summoner["name"]
        playerInfos.accountId = summoner["accountId"]
        playerInfos.id = summoner["id"]
        playerInfos.puuid = summoner["puuid"]
        playerInfos.profileIconId = summoner["profileIconId"]
        playerInfos.revisionDate = summoner["revisionDate"]
    }


    return (
        <>
            <h1>wsh</h1>
            <h2>{playerInfos.playerName}</h2>
            <h2>{playerInfos.playerLevel}</h2>
        </>
    )
}
