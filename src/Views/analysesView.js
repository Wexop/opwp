import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import {useEffect, useState} from "react"
import {riotAPIKey} from "../utile/riotAPIKey";
import {CardStyle, GamesContainerStyle, GamesInfoContainerStyle} from "../components/card";
import {BasicText} from "../components/basicComponents";
import {color} from "../utile/color";

export const AnalysesView = () => {
    const {name} = useParams()
    const navigate = useNavigate()

    const [summoner, setSummoner] = useState({
        summonerLevel: '',
        name: '',
        accountId: '',
        id: '',
        puuid: '',
        profileIconId: '',
        revisionDate: '',
    })
    const [rankedStat, setRankedState] = useState([])

    //const [gamesId, setGamesID] = useState([])
    const [games, setGames] = useState([])

    const [summonersSpell, setSummonersSpell] = useState()


    //get sumonner
    useEffect(() => {
        name && axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotAPIKey}`)
            .then(res => {
                console.log(res.data)
                setSummoner(res.data)
            })
    }, [name])

    //summonersSpells

    useEffect(() => {
        axios.get("http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/summoner.json").then(res => {
            setSummonersSpell(res.data)
            console.log("sums spell", res.data)
        })
    }, [name])

    //get sumonner ranked stats

    useEffect(() => {
        summoner.id && axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?${riotAPIKey}`)
            .then(res => {
                if (res.data?.length > 0) {
                    setRankedState(res.data)
                }
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
                    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${id}?${riotAPIKey}`).then(res => res.data)
                })).then((games) => {
                    setGames(games)
                })
            })
    }, [summoner])

    if (!name) {
        return <h1>pending</h1>
    }

    const showRankedStats = () => {

        return rankedStat.map((rank, index) => {
            return (
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <BasicText style={{fontWeight: 700}}>{rank.queueType}</BasicText>
                    <img
                        src={`https://raw.githubusercontent.com/Wexop/opwp/master/src/emblems/Emblem_${rank.tier.toLowerCase()}.png`}
                        alt="PlayerTier"
                        style={{width: "10vw", height: "auto"}}
                    />
                    <BasicText>{rank.tier + " " + rank.rank}</BasicText>
                    <BasicText style={{color: color.green}}>{rank.wins + " wins"}</BasicText>
                    <BasicText style={{color: color.red}}>{rank.losses + " losses"}</BasicText>
                </div>
            )
        })
    }

    console.log("games", games);

    const SummonerStatsCard = () => {
        return (

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
                   showRankedStats()
                ) : (
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <BasicText>UNRANKED</BasicText>
                    </div>
                )}

            </div>

        )
    }

    const SummonerGamesStats = () => {

        return (

            <div style={{
                ...CardStyle,
                width: "70vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
            }}>

                {
                    games.map((game, index) => {

                        const gameInfos = game["info"]
                        const participants = gameInfos["participants"]

                        const blueTeamPlayers = []
                        const redTeamPlayers = []

                        let playerTeam = 0
                        let playerStats = false

                        participants.map((player, index) => {
                            player["teamId"] === 100 ? blueTeamPlayers.push(player) : redTeamPlayers.push(player)
                            if (player["summonerName"] === summoner.name) {
                                playerTeam = player["teamId"] === 100 ? 0 : 1
                                playerStats = player
                            }
                        })

                        let playerWin = gameInfos["teams"][playerTeam]["win"]

                        const playerItems = []
                        for (let i = 0; i < 6; i++) {
                            playerItems.push(playerStats[`item${i}`])
                        }

                        const showTeamStat = (team: any) => {
                            return team.map((player, index) => {

                                const isPlayer = player.summonerName === summoner.name

                                return (
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignSelf: "start",
                                        alignItems: "center"
                                    }}>
                                        <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${player.championName}.png`}
                                            alt="champIcon"
                                            style={{width: "2vw", height: "2vw"}}
                                        />
                                        <a onClick={() => {
                                            navigate(`/analyse/${player.summonerName}`)
                                        }
                                        }>
                                            <BasicText style={{
                                                margin: 0,
                                                marginLeft: "5%",
                                                fontWeight: isPlayer ? 700 : 400
                                            }}>{player.summonerName}</BasicText>
                                        </a>
                                    </div>
                                )
                            })
                        }

                        const data = summonersSpell.data

                        const getSummonerSpellImgLink = (spellId: any) => {

                            let imageLink = "http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/"

                            Object.keys(data).forEach((summoners, index) => {
                                console.log(summoners)
                                if ( parseInt(summonersSpell.data[summoners]["key"])  == spellId) {
                                    imageLink += summonersSpell.data[summoners]["image"]["full"]
                                }
                            })

                            return imageLink

                        }

                        return (
                            <div style={{
                                ...GamesContainerStyle,
                                backgroundColor: playerWin ? color.blueWin : color.redLose,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>

                                <div style={{...GamesInfoContainerStyle}}>
                                    <BasicText style={{fontSize: "2vw"}}>{playerWin ? "Victory" : "Defeat"} </BasicText>
                                    <BasicText>Game duration </BasicText>
                                    <BasicText>{Math.floor(gameInfos.gameDuration / 60)} min </BasicText>
                                </div>

                                <div style={{...GamesInfoContainerStyle}}>
                                    <img
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${playerStats.championName}.png`}
                                        alt="ChampIcon"
                                        style={{width: "4vw", height: "4vw", borderRadius: "50px"}}
                                    />
                                    <BasicText>{playerStats.championName}</BasicText>
                                    <BasicText>{`${playerStats.kills}/${playerStats.deaths}/${playerStats.assists}`}</BasicText>
                                    <BasicText>{`${playerStats.totalMinionsKilled} CS (${Math.round(10 * (playerStats.totalMinionsKilled / (gameInfos.gameDuration / 60))) / 10} / min)`}</BasicText>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "85%"
                                    }}>

                                        <img
                                            src={getSummonerSpellImgLink(playerStats.summoner1Id)}
                                            alt="ChampIcon"
                                            style={{width: "3vw", height: "3vw", borderRadius: "5px"}}
                                        />
                                        <img
                                            src={getSummonerSpellImgLink(playerStats.summoner2Id)} alt="ChampIcon"
                                            style={{width: "3vw", height: "3vw", borderRadius: "5px"}}
                                        />

                                    </div>
                                </div>

                                <div style={{...GamesInfoContainerStyle}}>
                                    {
                                        playerItems.map((item, index) => {
                                            return item !== 0 ? (
                                                    <img
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${item}.png`}
                                                        alt={`item${index}`}
                                                        style={{width: "2.5vw", height: "2.5vw"}}
                                                    />)
                                                : (
                                                    <div style={{
                                                        width: "2.5vw",
                                                        height: "2.5vw",
                                                        backgroundColor: color.black
                                                    }}/>
                                                )
                                        })
                                    }

                                    <img
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${playerStats.item6}.png`}
                                        alt={`item${index}`}
                                        style={{width: "2.5vw", height: "2.5vw", marginTop: "1vh"}}/>

                                </div>

                                <div style={{
                                    width: "50%", display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}>
                                    <div style={{...GamesInfoContainerStyle, justifyContent: "space-around"}}>
                                        {showTeamStat(blueTeamPlayers)}
                                    </div>
                                    <div style={{
                                        ...GamesInfoContainerStyle, justifyContent: "space-around"
                                    }}>
                                        {showTeamStat(redTeamPlayers)}
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        )
    }


    return (
        <>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <SummonerStatsCard/>
                <SummonerGamesStats/>
            </div>
        </>
    )
}
