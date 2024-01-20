import { Button, Divider, Flex, Grid, Text, useColorMode, Heading, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import React, { useContext } from 'react'
import Dice from './assets/Dice'
import Header from './assets/Header'
import { Context } from './Context'

export default function Game({ setView }) {

  const { colorMode } = useColorMode();
  const isDark = colorMode == 'dark';

  const { state, dispatch } = useContext(Context)
  const rollDice = () =>{
    dispatch({ type: "ROLL_DICE" });
    console.log('roll your boat')
    setTimeout(()=>{
      dispatch({ type: "END_ROLL" })
    },5)
  }

  const playAgain = () =>{
    dispatch({ type: "START_GAME" })
    setView('gameplay');
  }

  return (
    <>
      <Flex w='100%' h='100vh' flexDir='column'>
        <Flex flexDir='column' w='100%' gap='30px'>
          <Header/>
          <Flex flexDir='column' gap='10px' w='100%' maxW='600px' m='auto' p='0 20px'>
            <Flex justify='space-between'>
              <Text>Rolls: {state.rolls}</Text>
              <Text>Time: 00:{state.time}</Text>
              <Text>Best: {20}</Text>
            </Flex>
            <Divider/>
            <Grid w='100%' maxW='300px' gap='5px' gridTemplateColumns={'repeat(5,1fr)'} mx='auto'>
              {state.dice.map((dice,id)=>(
                <Dice key={id} value={dice} id={id}/>
              ))}
            </Grid>
            <Button colorScheme='teal' w='fit-content' mx='auto' onClick={rollDice} disabled={state.time===0 && true}>Roll Dice</Button>
          </Flex>
        </Flex>
      </Flex>
      {state.showModal && !state.winModal && <Flex pos='fixed' top='0' left='0' w='100%' h='100%' bg='rgba(0,0,0,0.7)' justify='center' align='center' zIndex='100' transition='opacity 0.3s'>
        <Flex bg={isDark ? '#121212' : 'white'} borderRadius='10px' w='100%' maxW='500px' p='30px 20px' boxShadow='0 0 10px rgba(0,0,0,0.3)' pos='relative' gap='30px' flexDir='column' maxH='500px'>
            <Grid gap='20px'>
                <Heading>Game alert!</Heading>
                <Text as='p'><Text as='span' mr='5px'>🎲📍</Text>You did well 👍👊 but your time is up! 😉😉 Try again</Text>
                <Flex justify='space-between'>
                  <Button onClick={()=>setView('menu')}>Home</Button>
                  <Button onClick={()=>setView('scoreboard')}>Score board</Button>
                  <Button onClick={playAgain}>Play Again</Button>
                </Flex>
            </Grid>
        </Flex>
      </Flex>}
      {state.showModal && state.winModal && <Flex pos='fixed' top='0' left='0' w='100%' h='100%' bg='rgba(0,0,0,0.7)' justify='center' align='center' zIndex='100' transition='opacity 0.3s'>
        <Flex bg={isDark ? '#121212' : 'white'} borderRadius='10px' w='100%' maxW='500px' p='30px 20px' boxShadow='0 0 10px rgba(0,0,0,0.3)' pos='relative' gap='30px' flexDir='column' maxH='500px'>
            <Grid gap='20px'>
                <Heading>Game alert!</Heading>
                <Text as='p'><Text as='span' mr='5px'>🎲📍</Text>You won! You did well gamer! 👍👊</Text>
                <Flex justify='space-between'>
                  <Button onClick={()=>setView('menu')}>Home</Button>
                  <Button onClick={()=>setView('scoreboard')}>Score board</Button>
                  <Button onClick={playAgain}>Play Again</Button>
                </Flex>
            </Grid>
        </Flex>
    </Flex>}
    </>
  )
}
