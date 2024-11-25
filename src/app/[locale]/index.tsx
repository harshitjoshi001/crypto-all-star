'use client'

import { createContext, ReactNode, useState } from "react";

interface ChainContextType {
    currentChain: number | null;
    setCurrentChain: (chain: number | null) => void;
  }
  
  export const ChainContext = createContext<ChainContextType>({
    currentChain: null,
    setCurrentChain: () => {},
  });

export default function RootComponent({children} : {children : ReactNode}){

    const [currentChain , setCurrentChain] = useState<number | null>(11155111)

    return(
        <ChainContext.Provider value={{currentChain , setCurrentChain}}>
          {children}
        </ChainContext.Provider>
    )
}