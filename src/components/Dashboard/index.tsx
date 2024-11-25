import LastMemeStanding from '../LastMemeStanding';
import Staking from '../Staking';
import StakingHistory from '../StakingHistory';

export default function Dashoard() {
  return (
    <>
      <Staking />
      <LastMemeStanding />
      <StakingHistory />
    </>
  );
}
