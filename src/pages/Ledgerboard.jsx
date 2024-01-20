import { Button, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Header from '../assets/Header'
import Dice from '../assets/Dice'
import { Context } from '../Context'

export default function Ledgerboard({setView}) {

    const { state, dispatch } = useContext(Context);

  return (
    <Flex w='100%' h='100vh' flexDir='column' overflow='hidden'>
        <Header/>
        <Flex flexDir='column' w='100%' gap='30px' maxW='600px' m='auto' p={'0 20px'}>
            <Heading>Ledgerboard</Heading>
            <Flex justify='space-between'>
                <Text as='p'>Value</Text>
                <Text as='p' >Rolls</Text>
                <Text as='p'>Time Used</Text>
            </Flex>
            <Divider/>
            <Grid gap='20px' h='30%' overflowY='scroll'>
                {state.wins.length === 0 ? (
                    <Flex m='auto'>You have set no record, bruh!</Flex>
                ) : (state.wins.map((score,id)=>(
                    <Flex justify='space-between' key={id} bg={'rgba(0,0,0,0.3)'} p='5px' align='center'>
                        <Dice value={score.value}/>
                        <Text as='p'>{score.rolls}</Text>
                        <Text as='p'>{score.time}</Text>
                    </Flex>
                )))}
            </Grid>
            <Flex justify='space-between'>
                <Button colorScheme='orange' variant='solid'>Clear</Button>
                <Button colorScheme='orange' variant='solid' onClick={()=>setView('menu')}>Home</Button>
            </Flex>
        </Flex>
    </Flex>
  )
}
