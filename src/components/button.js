import {CSSProperties} from "react";

const {color} = require("../utile/color");
export const SimpleButton = (props: { text: String, onpress: any }) => {

    return (
        <a onClick={props.onpress}
           style={{
            backgroundColor: color.lightPurple,
            width: "15vw",
            alignSelf: "center",
            borderRadius: 10,
            textAlign: "center",
            padding: 7,
            fontSize: "2vw",
            color: color.white,
        }}>
            {props.text}
        </a>
    )
}
