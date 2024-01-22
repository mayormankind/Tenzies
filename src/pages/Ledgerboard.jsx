import { Button, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React, { useContext, useState, useEffect } from 'react'
import Header from '../assets/Header'
import Dice from '../assets/Dice'
import { Context } from '../Context'

// landingPages:landings.dev
// BestWebsites: godly.website
// webDesignCatalog:curated.design
// OnePageWebsites:onepagelove.com
// SaasLandingPages: saaslandingpage.com

export default function Ledgerboard({setView}) {
    const [ scores, setScores ] = useState([]);
    const { state, dispatch } = useContext(Context);
    
    useEffect(()=>{
        setScores(JSON.parse(localStorage.getItem('gameWins')) || [])
    },[state.gameOver,dispatch])
    
    const clearWins = () =>{
        dispatch({ type: "CLEAR_SCORE" });
        setScores([]);
    }

  return (
    <Flex w='100%' h='100vh' flexDir='column'>
        <Header/>
        <Flex flexDir='column' w='100%' gap='30px' maxW='600px' m='auto' p={'0 20px'}>
            <Heading>Ledgerboard</Heading>
            <Flex justify='space-between'>
                <Text as='p'>Value</Text>
                <Text as='p' >Rolls</Text>
                <Text as='p'>Time Used</Text>
            </Flex>
            <Divider/>
            <Flex h='300px' overflowY='scroll' w='100%' flexDir='column'>
                <Grid gap='20px' w='100%'>
                    {scores.length === 0 ? (
                        <Flex m='auto'>You have set no record, bruh!</Flex>
                    ) : (scores.map((score,id)=>(
                        <Flex justify='space-between' key={id} bg={'rgba(0,0,0,0.3)'} p='5px' align='center' h='fit-content'>
                            <Dice value={score.value}/>
                            <Text as='p'>{score.rolls}</Text>
                            <Text as='p'>{score.time}</Text>
                        </Flex>
                    )))}
                </Grid>

            </Flex>
            <Flex justify='space-between'>
                <Button colorScheme='orange' variant='solid' onClick={clearWins}>Clear</Button>
                <Button colorScheme='orange' variant='solid' onClick={()=>setView('menu')}>Home</Button>
            </Flex>
        </Flex>
    </Flex>
  )
}
