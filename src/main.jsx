import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import ContextClass from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextClass>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ContextClass>
  </React.StrictMode>,
)
