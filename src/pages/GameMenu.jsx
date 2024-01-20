import { Button, Box, Flex, Heading, Text, keyframes } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import Header from '../assets/Header'
import Dice from '../assets/Dice'
import Instruction from './Instruction';
import { Context } from '../Context';

export default function GameMenu({setView}) {
    const [ showModal, setShowModal ] = useState(false);
    const { state, dispatch } = useContext(Context)
    const anim = keyframes `
        0%{transform:rotate(180deg)}
        50%{transform:rotate(-180deg)}
        100%{transform:rotate(0deg)}
    `;
    const anim1 = keyframes `
        0%{transform:translateY(-600px)}
        25%{transform:translateY(-450px)}
        50%{transform:translateY(-300px)}
        75%{transform:translateY(-150px)}
        100%{transform:translateY(0)}
    `;

    const startGame = () =>{
        setView('gameplay');
        dispatch({ type: "START_GAME" })
    }
  return (
    <Flex w='100%' h='100vh' flexDir='column' pos='relative'>
        <Header/>
        <Flex flexDir='column' w='100%' gap='40px' maxW='600px' m='auto' p={'0 20px'}>
            <Heading>Tenzies Menu</Heading>
            <Flex gap='20px' flexDir='column'>
                <Button onClick={startGame}>Start game</Button>
                <Button onClick={()=>setView('scoreboard')}>Score board</Button>
                <Button onClick={()=>setShowModal(true)}>Game instructions</Button>
            </Flex>
        </Flex>
        <Flex w='100%' maxW='1000px' mx='auto' justify='space-between' fontWeight='bold' align='center' p={{base:'10px 20px',md:'10px 0'}}>
            <Box animation={`${anim} 2s linear infinite`}>
                <Dice size={'30px'} value={6}/>
            </Box>
            <Text as='p' animation={`${anim1} 2s linear`}>Designed by Mankind</Text>
        </Flex>
        {showModal && <Instruction setShowModal={setShowModal}/>}
    </Flex>
  )
}
