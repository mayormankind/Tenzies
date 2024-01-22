import { useEffect, useReducer } from "react";
import { createContext } from "react";


const randomizeDice = () =>{
    return [...Array(25)].map(()=> Math.floor(Math.random() * 6) + 1);
}

const INITIAL_STATE = {
    dice: randomizeDice(),
    frozenDice: [],
    rolls: 0,
    time: 59,
    win: false,
    showModal: false,
    winModal: false,
    gameOver: false,
}

export const Context = createContext(INITIAL_STATE)

const ContextClass = ({children}) =>{
   
    const GameReducer = (state,action)=>{
        switch(action.type){
            case "ROLL_DICE":
                if (state.time > 0 && !state.isWin) {
                    const unfrozenIndices = state.dice.map((_, index) => index).filter(index => !state.frozenDice.includes(index));
                    const newDice = [...state.dice];
                    
                    // Reroll only the unfrozen dice
                    unfrozenIndices.forEach(index => {
                        newDice[index] = Math.floor(Math.random() * 6) + 1;
                    });

                    return { ...state, dice: newDice, rolls: state.rolls + 1 };
                }
                return state;
            case "FREEZE_VALUE":
                if(state.time > 0){
                    const updatedFrozen = state.frozenDice.includes(action.payload) ? state.frozenDice.filter((id) => id !== action.payload) : [...state.frozenDice, action.payload];

                    const Win = updatedFrozen.length === state.dice.length &&
                    updatedFrozen.every(index => state.dice[index] === state.dice[updatedFrozen[0]]);

                    if (Win) {
                        const winData = {
                            time: 60 - state.time,
                            value: state.dice[updatedFrozen[0]],
                            rolls: state.rolls
                        };
                        const oldWins = JSON.parse(localStorage.getItem('gameWins')) || [];
                        const updatedWins = [...oldWins, winData];
                        localStorage.setItem('gameWins', JSON.stringify(updatedWins));

                        return { ...state, isWin: true, showModal: true, winModal: true, gameOver: true, frozenDice: updatedFrozen };
                    }
                    return { ...state, frozenDice: updatedFrozen };
                }
                return state;
            case "COUNTER":
                if(state.time > 0 && !state.isWin && !state.gameOver){
                    return { ...state, time:state.time - 1 }
                }else{
                    return { ...INITIAL_STATE, showModal:true, winModal:false, time:0, gameOver:true }
                }
            case "START_GAME":
                return { ...INITIAL_STATE }
            case "CLEAR_SCORE":
                localStorage.removeItem('gameWins');
                return { ...state }
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer(GameReducer,INITIAL_STATE);

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export default ContextClass;