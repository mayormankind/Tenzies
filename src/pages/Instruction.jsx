import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, Heading, IconButton, Text, useColorMode, keyframes } from '@chakra-ui/react'
import React from 'react'
import Dice from '../assets/Dice';

export default function Instruction({setShowModal}) {
    const { colorMode } = useColorMode();
    const isDark = colorMode == 'dark';

  return (
    <Flex pos='fixed' top='0' left='0' w='100%' h='100%' bg='rgba(0,0,0,0.7)' justify='center' align='center' zIndex='100' transition='opacity 0.3s'>
        <Flex bg={isDark ? '#121212' : 'white'} borderRadius='10px' w='100%' maxW='500px' p='30px 20px' boxShadow='0 0 10px rgba(0,0,0,0.3)' pos='relative' gap='30px' flexDir='column' maxH='500px'>
            <Heading>Game instructions</Heading>
            <Grid gap='5px'>
                <Text as='p'><Text as='span' mr='5px'>🎲📍</Text>When the game begins, click on a dice to freeze or unfreeze its current value.</Text>
                <Text as='p'><Text as='span' mr='5px'>🎲📍</Text>To win, roll all dice until they are the same before your play time is elapsed.</Text>
                <Text as='p'><Text as='span' mr='5px'>🎲📍</Text>This concept sucks, but still have fun. lol😂</Text>
            </Grid>
            <IconButton icon={<CloseIcon/>} variant='ghost' onClick={()=>setShowModal(false)} pos='absolute' color='red' top='10px' right='10px'/>
        </Flex>
    </Flex>
  )
}
