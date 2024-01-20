import { useState } from 'react';
import Game from './Game'
import Ledgerboard from './pages/Ledgerboard'
import GameMenu from './pages/GameMenu'

function App() {
  const [ view, setView ] = useState('menu')

  return (
      <>
        {view === 'menu' && <GameMenu setView={setView}/>}
        {view === 'gameplay' && <Game setView={setView}/>}
        {view === 'scoreboard' && <Ledgerboard setView={setView}/>}
      </>
  )
}

export default App
