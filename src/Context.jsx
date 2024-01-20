import { useEffect, useReducer } from "react";
import { createContext } from "react";


const randomizeDice = () =>{
    return [...Array(25)].map(()=> Math.floor(Math.random() * 6) + 1);
}

const INITIAL_STATE = {
    dice: randomizeDice(),
    frozenDice: [],
    isRolling: false,
    rolls: 0,
    time: 59,
    win: false,
    showModal: false,
    winModal: false,
    wins: JSON.parse(localStorage.getItem('gameWins')),
}

export const Context = createContext(INITIAL_STATE)

const ContextClass = ({children}) =>{
    useEffect(()=>{
        const timer = setInterval(()=>{
            dispatch({ type: "COUNTER" })
        },1000)
        return()=> clearInterval(timer)
    },[])
    const GameReducer = (state,action)=>{
        switch(action.type){
            case "ROLL_DICE":
                if (!state.isRolling && state.time > 0 && !state.isWin) {
                    const unfrozenIndices = state.dice.map((_, index) => index).filter(index => !state.frozenDice.includes(index));
                    const newDice = [...state.dice];
                    
                    // Reroll only the unfrozen dice
                    unfrozenIndices.forEach(index => {
                        newDice[index] = Math.floor(Math.random() * 6) + 1;
                    });
                    const Win = newDice.every(value => value === newDice[0]);
                    if (Win) {
                        const winData ={
                            time: 59 - state.time,
                            value: newDice[0],
                            rolls: state.rolls
                        }
                        const oldWins = JSON.parse(localStorage.getItem('gameWins'));
                        const updatedWins = [ oldWins, winData ]
                        localStorage.setItem('gameWins',JSON.stringify(updatedWins));

                        return { ...state, isWin:true, wins:updatedWins, showModal:true, winModal:true };
                    }

                    return { ...state, dice: newDice, isRolling: true, rolls: state.rolls + 1 };
                }
                return state;
            case "END_ROLL":
                return { ...state, isRolling: false };
            case "FREEZE_VALUE":
                if(!state.isRolling && state.time > 0){
                    const updatedFrozen = state.frozenDice.includes(action.payload) ? state.frozenDice.filter((id) => id !== action.payload) : [...state.frozenDice, action.payload];
                    return { ...state, frozenDice: updatedFrozen };
                }
                return state;
            case "COUNTER":
                if(state.time > 0 && !state.isWin){
                    return { ...state, time:state.time - 1 }
                }else{
                    return { ...INITIAL_STATE, isRolling:false,  showModal:true, winModal:false, time:0 }
                }
            case "START_GAME":
                return { ...INITIAL_STATE }
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