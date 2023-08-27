import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ChainId,ThirdwebProvider} from '@thirdweb-dev/react'
import {Sepolia,Goerli} from '@thirdweb-dev/chains'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider supportedChains={[Sepolia]} activeChain={Sepolia} clientId='993bd3998ec707500236fcf27afde9d6' >
    <Component {...pageProps} />
  </ThirdwebProvider>
  
  )
}

