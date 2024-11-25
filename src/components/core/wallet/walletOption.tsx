import { useEffect, useState } from 'react';
import { Connector } from 'wagmi';
import Image from 'next/image';

function WalletOption({
  connector,
  onClick,
  name,
  imgPath,
}: {
  connector: Connector;
  onClick: () => void;
  name: string;
  imgPath: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      className="group relative text-xl min-w-[140px] z-[1] uppercase font-extrabold cursor-pointer text-white px-4 min-h-[60px] flex items-center"
      onClick={onClick}
    >
      <Image
        src="/images/pink-btn.png"
        alt="Button Image"
        layout="fill"
        priority
        className="absolute inset-0 z-[-1] group-hover:opacity-50"
      />
      <span className="mb-3 text-lg">{name}</span>
      <Image
        src={`/images/connectWallet/${imgPath}.svg`}
        alt="logo"
        width="24"
        height="24"
        className="mb-3 ml-auto mr-3"
      />
    </button>
  );
}

export default WalletOption;
