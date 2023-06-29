import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api/api";
import { isDarkAtom } from "../atoms/isDarkAtom";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

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
  max-width: 400px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.accentColor};
`;

const ChangeThemeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.themeIconColor};
  cursor: pointer;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 15px;
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

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const onClick = () => {
    setIsDark((curr) => !curr);
  };
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Coins List</Title>
        <ChangeThemeButton onClick={onClick} aria-label="Theme">
          {isDark ? <BsMoonFill /> : <BsSunFill />}
        </ChangeThemeButton>
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
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coin-img"
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
