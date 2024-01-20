import { Flex, Box, Grid } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Context } from '../Context'

export default function Dice({value,size,id}) {

  const { state, dispatch } = useContext(Context);

  const freezeDice = (diceId) =>{
    dispatch({ type: "FREEZE_VALUE", payload: diceId });
    // console.log(diceId,state.frozenDice,state.dice);
  }

    const DiceGrid = ({children,template}) =>{
      return (
        <Grid bg={state.frozenDice.includes(id) ? "green" : 'black'} cursor='pointer' boxShadow='lg' boxSize={size? size : '50px'} borderRadius={size ? '2px' : '10px'}gridTemplateAreas={template} alignItems={'center'} justifyItems={'center'} gridTemplateColumns={'repeat(3fr,1)'} onClick={()=>freezeDice(id)}>{children}</Grid>
      )
    }
    const DotBox = ({char}) =>{
      return (
        <Box boxSize={size? '5px' : '7px'} bg='white' borderRadius='50%' gridArea={char}></Box>
      )
    }
    
    const checkValue = () =>{
      if(value==1){
        return (
          <DiceGrid template={`". . ." ". a ." ". . ."`}>
            <DotBox char={'a'}></DotBox>
          </DiceGrid>
        )
      }
      else if(value==2){
        return (
          <DiceGrid template={`"a . ." ". . ." ". . b"`}>
            <DotBox char={'a'}></DotBox>
            <DotBox char={'b'}></DotBox>
          </DiceGrid>
        )
      }
      else if(value==3){
        return (
          <DiceGrid bg='black' boxShadow='lg' boxSize='50px' borderRadius='10px' template={`"a . ." ". b ." ". . c"`} alignContent={'center'} justifyItems={'center'}>
            <DotBox char={'a'}></DotBox>
            <DotBox char={'b'}></DotBox>
            <DotBox char={'c'}></DotBox>
          </DiceGrid>
        )
      }
      else if(value==4){
        return (
          <DiceGrid template={`"a . b" ". . ." "c . d"`}>
            <DotBox char={'a'}></DotBox>
            <DotBox char={'b'}></DotBox>
            <DotBox char={'c'}></DotBox>
            <DotBox char={'d'}></DotBox>
          </DiceGrid>
        )
      }
      else if(value==5){
        return (
          <DiceGrid bg='black' boxShadow='lg' boxSize='50px' borderRadius='10px' template={`"a . b" ". c ." "d . e"`} alignContent={'center'} justifyItems={'center'}>
            <DotBox char={'a'}></DotBox>
            <DotBox char={'b'}></DotBox>
            <DotBox char={'c'}></DotBox>
            <DotBox char={'d'}></DotBox>
            <DotBox char={'e'}></DotBox>
          </DiceGrid>
        )
      }
      else if(value==6){
        return (
          <DiceGrid template={`"a . b" "c . d" "e . f"`}>
            <DotBox char={'a'}></DotBox>
            <DotBox char={'b'}></DotBox>
            <DotBox char={'c'}></DotBox>
            <DotBox char={'d'}></DotBox>
            <DotBox char={'e'}></DotBox>
            <DotBox char={'f'}></DotBox>
          </DiceGrid>
        )
      }
    }
  return (
    <>
      {checkValue()}
    </>
  )
}
