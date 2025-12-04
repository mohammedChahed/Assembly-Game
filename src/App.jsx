
import { languages } from "./components/langague";
import React, { useState } from "react";

import clsx from "clsx";

function App() {
    const [currentWord , setCurrentWord] = useState("react") ;
    const [guessedLetters , setGuessedLetters] = useState([]);

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    function addGuessedLetters(letter) {
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters , letter]
       )
    }

    console.log(guessedLetters)

    const langagueElement = languages.map(lang => {
        const style={
            backgroundColor : lang.backgroundColor ,
            color : lang.color
        }
        return (
            <span
                className=""
                style={style}
                key={lang.name}
            
            >
                {lang.name}
            </span>
        );
    })

    const letterElement = currentWord.split("").map((letter,index) => {
        return(
            <p key={index}> {letter.toUpperCase()} </p>
        );
    })

    const keyboardElements = alphabet.split("").map((letter,index) =>{
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = currentWord.includes(letter) && isGuessed ;
        const isWrong = !currentWord.includes(letter) && isGuessed ; 
        const className = clsx({
            correct : isCorrect,
            wrong : isWrong
        })
        
        return(
            <button 
                    className={className} 
                    onClick={()=> addGuessedLetters(letter)} 
                    key={index}>
                    
            {letter}</button>
        );
    })

    return(
        <main>
            <header>
                <div className="title">
                    <h2>Assembly EndGame</h2>
                    <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                </div>
                <div className="status">
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </div>
            </header>
            <aside>
                {langagueElement}
            </aside>

            <div className="letters">
                {letterElement}
            </div>

            <div className="keybord">
                {keyboardElements}
            </div>

            <button className="newgame">New game</button>
        </main>
    );
}

export default App
