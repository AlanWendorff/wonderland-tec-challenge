interface ITokenData {
  balance: number;
  isLoading: boolean;
}

interface IBalancesState {
  dai: ITokenData;
  usdc: ITokenData;
}

export default IBalancesState;
