import {useLocation} from "react-router-dom"
import axios from "axios"
import {useState} from "react"
import {riotAPIKey} from "../utile/riotAPIKey";
import {CardStyle} from "../components/card";
import {BasicText} from "../components/basicComponents";
import {color} from "../utile/color";



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

        //ranked

        leagueId: "",
        tier: "Bronze",
        rank: "",
        summonerId: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
        hotStreak: false
    }

    const [summoner, setSummoner] = useState()
    const [rankedStat, setRankedState] = useState()

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

        axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerInfos.id}?${riotAPIKey}`)
            .then(res => {
                setRankedState(res.data)
            })
    }
    let tierRank = playerInfos.tier

    if (rankedStat) {
        playerInfos.leagueId = rankedStat[0]["leagueId"]
        playerInfos.rank = rankedStat[0]["rank"]
        playerInfos.wins = rankedStat[0]["wins"]
        playerInfos.losses = rankedStat[0]["losses"]
        playerInfos.tier = rankedStat[0]["tier"]
        playerInfos.summonerId = rankedStat[0]["summonerId"]
        playerInfos.hotStreak = rankedStat[0]["hotStreak"]

        console.log(rankedStat)

        tierRank = playerInfos.tier.toLowerCase()

    }




    return (
        <>
            <div style={{display: "flex", justifyContent: "center"}}>

                <div style={{
                    ...CardStyle,

                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <img
                            src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${playerInfos.profileIconId}.png`}
                            alt="PlayerIcon"
                            style={{width: "10vw", height: "10vw"}}
                        />
                        <BasicText>{playerInfos.playerName}</BasicText>
                        <BasicText>{playerInfos.playerLevel}</BasicText>
                    </div>

                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", alignContent: "flex-start"}}>
                        <img
                            src={`../emblems/Emblem_${tierRank}.png`}
                            alt="PlayerTier"
                            style={{width: "10vw", height: "auto"}}
                        />
                        <BasicText>{playerInfos.tier + " " + playerInfos.rank }</BasicText>
                        <BasicText style={{color: color.green}} >{playerInfos.wins + " wins"}</BasicText>
                        <BasicText style={{color: color.red}} >{playerInfos.losses + " losses"}</BasicText>
                    </div>


                </div>

            </div>
        </>
    )
}
