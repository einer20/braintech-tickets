import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const theme = {
  colors : {
    ticket : {
      active : "red"
    }
  }
}

const _theme = extendTheme(theme);
console.log(_theme)
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={_theme}> 
      <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
