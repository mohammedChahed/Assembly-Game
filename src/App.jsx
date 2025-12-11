
import { languages } from "./components/langague";
import React, { useState } from "react";
import { getFarewellText , getRandomWord } from "./components/utils";
import clsx from "clsx";
import Confetti from "react-confetti" ;
import { useWindowSize } from "react-use";



function App() {
    const [currentWord , setCurrentWord] = useState(() => getRandomWord()) ;
    const [guessedLetters , setGuessedLetters] = useState([]);

    const {width , height} = useWindowSize();

    const numGuessesLeft = languages.length - 1 ;

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length ;

    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter)) ;

    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameLost || isGameWon ;
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLasstGuessedIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    
    function addGuessedLetters(letter) {
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters , letter]
       )
    }

    const langagueElement = languages.map((lang,index) => {
        const isLanguageLost = index < wrongGuessCount ;
        const style={
            backgroundColor : lang.backgroundColor ,
            color : lang.color
        }

        
        return (
            <span
                className={`chip ${isLanguageLost ? 'lost' : ""}` }
                style={style}
                key={lang.name}
            
            >
                {lang.name}
            </span>
        );
    })
    
    const letterElement = currentWord.split("").map((letter,index) => {
        return(
            <p key={index}> 
                {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
            </p>
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
                    disabled={isGameOver}
                    aria-disabled={guessedLetters.includes(letter)}
                    aria-label={`Letter ${letter}`}
                    onClick={()=> addGuessedLetters(letter)} 
                    key={index}>
                    
            {letter.toLocaleUpperCase()}</button>
        );
    })

    function renderGameStatus(){
        if(!isGameOver && isLasstGuessedIncorrect){
            return(
                <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
            );
        }
        if(isGameWon){
            return(
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            );
        }
        if(isGameLost){
            return(
                <>
                    <h2>Game over !</h2>
                    <p> You lose! Better start learning Assembly 😭</p>
                    <p className="current-word">The word is  " {currentWord.toLocaleUpperCase()}" </p>
                </>
            );
        }{
            return null ;
        }
    }
    const gameStatus = clsx("status",{
        gamewon : isGameWon ,
        gamelost : isGameLost ,
        farewall : !isGameOver && isLasstGuessedIncorrect 
    })

    function newGame(){
        setCurrentWord(getRandomWord());
        setGuessedLetters([]);
        wrongGuessCount = 0 ;
        
    }
    return(
        <main>
            <header>
                <div className="title">
                    <h2>Assembly EndGame</h2>
                    <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                </div>
                <div 
                    aria-live="polite"
                    role="status"
                    className={gameStatus}>
                   {renderGameStatus()}
                </div>
            </header>
            <aside>
                {langagueElement}
            </aside>

            <div className="letters">
                {letterElement}
            </div>
            {/* Combined visually-hidden aria-live region for status updates */}
            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>

                <p>
                    Current word: {currentWord.split("").map(letter => 
                    guessedLetters.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}
                </p>
            
            </section>

            <div className="keybord">
                {keyboardElements}
            </div>

           {isGameOver &&  <button onClick={() => newGame()} className="newgame">New game</button> }
           <div>
                {isGameWon && (<Confetti 
                    width={width}
                    height={height}
                />)}
           </div>
        </main>
    );
}

export default App
