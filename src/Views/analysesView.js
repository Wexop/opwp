import {useParams} from "react-router-dom"
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

    //const [gamesId, setGamesID] = useState([])
    const [games, setGames] = useState([])
    /*const [games, setGames] = useState({

        info: {
            gameMode: "",
            gameDuration: 0,
            teams: [{
                bans: [{
                    championId: 0, pickTurn: 0
                }],
                teamId: 0,
                win: false,
            }],
            participants: [
                {
                    championName: "",
                    kills: 0,
                    teamId: 0,
                    summonerName: ""
                }
            ]
        }

    })*/

    //get sumonner
    useEffect(() => {
        name && axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotAPIKey}`)
            .then(res => {
                console.log(res.data)
                setSummoner(res.data)
            })
    }, [name])

    //get sumonner ranked stats

    useEffect(() => {
        summoner.id && axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?${riotAPIKey}`)
            .then(res => {
                setRankedState(res.data?.[0])
                console.log(res.data)
            })
    }, [summoner])

    //get last 20 games id
    useEffect(() => {
        // Fetch game ids
        summoner.puuid && axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=20&${riotAPIKey}`)
            .then(res => {
                const gameIds = res.data.slice(0, 5)
                Promise.all(gameIds.map((id) => {
                    // Fetch game
                    return axios.get (`https://europe.api.riotgames.com/lol/match/v5/matches/${id}?${riotAPIKey}`).then(res => res.data)
                })).then((games) => {
                    setGames(games)
                })
            })
    }, [summoner])

    if (!name) {
        return <h1>pending</h1>
    }

    console.log("games", games);

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
                        <BasicText>{summoner.name}</BasicText>
                        <BasicText> Level {summoner.summonerLevel}</BasicText>
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
