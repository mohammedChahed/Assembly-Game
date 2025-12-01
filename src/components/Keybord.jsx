import alphabets from "../alphabets";
export default function Keybord(){
    const keyboardElements = alphabets.map((letter,index) =>{
        return(
            <button className="btnKey" key={index}>{letter}</button>
        );
    })
    return(
        <div className="keybord">
            {keyboardElements}
        </div>
    );
}