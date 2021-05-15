import "./App.css";
import Logo from "./logo.svg";
import _ from "lodash";

export default function App ({ name }){

    return   `
    <img src="${Logo}" alt="build icon" />
    <h2>Welcome, ${name} </h2>`

}