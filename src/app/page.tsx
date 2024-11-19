'use client';

import { Button } from '@/components/ui/button';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="main-wrapper">
        <p>Welcome to Crypto All-Stars Staking</p>
        <Button>Hello</Button>
      </div>
    </>
  );
}

export default App;
