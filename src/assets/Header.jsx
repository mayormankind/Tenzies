import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { ModeSwitcher } from './ModeSwitcher'
import { MoonIcon } from '@chakra-ui/icons'

export default function Header() {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex w='100%'>
      <Flex justify='space-between' align='center' p='10px' w='100%' maxW='1000px' mx='auto'>
          <Heading>Tenzies</Heading>
          <ModeSwitcher/>
    </Flex>
    </Flex>
  )
}
