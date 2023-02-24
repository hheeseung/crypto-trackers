import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atom";

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  transition: all 0.2s ease-in-out;
  a {
    transition: color 0.2s ease-in-out;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ChangeThemeButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-size: x-large;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.tabColor};
  cursor: pointer;
`;

function Coins() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const onClick = () => {
    setIsDark((curr) => !curr);
  };
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);

  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 50).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    alt="coin-img"
                  />
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
      <ChangeThemeButton onClick={onClick}>
        {isDark ? "🌞" : "🌛"}
      </ChangeThemeButton>
    </>
  );
}

export default Coins;
