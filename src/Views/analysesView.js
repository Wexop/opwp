import {useLocation, useParams} from "react-router-dom"
import axios from "axios"
import {useEffect, useState} from "react"
import {riotAPIKey} from "../utile/riotAPIKey";
import {CardStyle} from "../components/card";
import {BasicText} from "../components/basicComponents";
import {color} from "../utile/color";

export const AnalysesView = () => {
    const {name} = useParams()

    const [summoner, setSummoner] = useState({
        summonerLevel: '',
        name: '',
        accountId: '',
        id: '',
        puuid: '',
        profileIconId: '',
        revisionDate: '',
    })
    const [rankedStat, setRankedState] = useState({
        leagueId: "",
        tier: "Bronze",
        rank: "",
        summonerId: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
        hotStreak: false
    })

    useEffect(() => {
        name && axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotAPIKey}`)
            .then(res => {
                console.log("res.data")
                console.log(res.data)
                setSummoner(res.data)
            })
    }, [name])

   useEffect(() => {
       summoner.id && axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?${riotAPIKey}`)
           .then(res => {
               setRankedState(res.data?.[0])
           })
   }, [summoner])

    if (!name) {
        return <h1>pending</h1>
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "center"}}>

                <div style={{
                    ...CardStyle,
                    width: "70vw",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                }}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column",}}>
                        <img
                            src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${summoner.profileIconId}.png`}
                            alt="PlayerIcon"
                            style={{width: "10vw", height: "10vw"}}
                        />
                        <BasicText>{summoner.playerName}</BasicText>
                        <BasicText> Level {summoner.playerLevel}</BasicText>
                    </div>

                    {rankedStat ? (
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <img
                                src={`https://raw.githubusercontent.com/Wexop/opwp/master/src/emblems/Emblem_${rankedStat.tier.toLowerCase()}.png`}
                                alt="PlayerTier"
                                style={{width: "10vw", height: "auto"}}
                            />
                            <BasicText>{rankedStat.tier + " " + rankedStat.rank}</BasicText>
                            <BasicText style={{color: color.green}}>{rankedStat.wins + " wins"}</BasicText>
                            <BasicText style={{color: color.red}}>{rankedStat.losses + " losses"}</BasicText>
                        </div>
                    ) : (
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <BasicText>UNRANKED</BasicText>
                        </div>
                    )}


                </div>

            </div>
        </>
    )
}
