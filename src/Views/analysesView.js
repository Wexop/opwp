import NavScrollExample from "../header/Header";
import { useLocation } from "react-router-dom"

export const AnalysesView = () => {

    const location = useLocation()
  
    return (
        <>
            <h1>wsh</h1>
          <h2>{location.state.player}</h2>
        </>
    )
}
