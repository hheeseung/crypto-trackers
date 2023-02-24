import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { IPriceData } from "./Coin";

interface IPrice {
  coinId: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  place-items: center;
`;

const Item = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.tabColor};
  padding: 20px;
  border-radius: 10px;
  font-size: xx-large;
  span:first-child {
    font-size: medium;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  span:last-child {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const HighPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.tabColor};
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.5rem;
  text-transform: uppercase;
  opacity: 0.8;
`;

const ATHPrice = styled.div`
  font-size: 25px;
`;

function Price({ coinId }: IPrice) {
  const { isLoading, data } = useQuery<IPriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <div>
      {isLoading ? (
        <Loader>Loading Price Data...</Loader>
      ) : (
        <>
          <HighPrice>
            <Title>
              <span>{data?.quotes.USD.ath_date.slice(0, 10)}</span>
              <span>All Time High Price</span>
            </Title>
            <ATHPrice>${data?.quotes.USD.ath_price.toFixed(2)}</ATHPrice>
          </HighPrice>
          <Container>
            <Item>
              <span>ath price</span>
              <span>${data?.quotes.USD.ath_price.toFixed(2)}</span>
            </Item>
            <Item>
              <span>ath date</span>
              <span>{data?.quotes.USD.ath_date.slice(0, 10)}</span>
            </Item>
            <Item>
              <span>percent change 1h</span>
              <span>{data?.quotes.USD.percent_change_1h}%</span>
            </Item>
            <Item>
              <span>percent change 6h</span>
              <span>{data?.quotes.USD.percent_change_6h}%</span>
            </Item>
            <Item>
              <span>percent change 12h</span>
              <span>{data?.quotes.USD.percent_change_12h}%</span>
            </Item>
            <Item>
              <span>percent change 24h</span>
              <span>{data?.quotes.USD.percent_change_24h}%</span>
            </Item>
          </Container>
        </>
      )}
    </div>
  );
}

export default Price;
