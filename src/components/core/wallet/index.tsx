import React from "react";
import { Connector } from "wagmi";

function WalletOption({
    connector,
    onClick,
    name
  }: {
    connector: Connector;
    onClick: () => void;
    name: string
  }) {
    const [ready, setReady] = React.useState(false);
  
    React.useEffect(() => {
      (async () => {
        const provider = await connector.getProvider();
        setReady(!!provider);
      })();
    }, [connector]);
  
    return (
      <button
        disabled={!ready}
        className="rounded bg-gray-400 p-4"
        onClick={onClick}
      >
        {name}
      </button>
    );
  }

  export default WalletOption;