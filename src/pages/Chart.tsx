import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api/api";
import { isDarkAtom } from "../atoms/isDarkAtom";
import { darkTheme, lightTheme } from "../theme";

interface ChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  let validateData = data ?? [];
  if ("error" in validateData) {
    validateData = [];
  }

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                validateData?.map((price) => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              background: "inherit",
              toolbar: { show: false },
            },
            theme: {
              mode: `${isDark ? "dark" : "light"}`,
            },
            xaxis: {
              type: "datetime",
            },
            noData: {
              text: "Not Provided",
              align: "center",
              verticalAlign: "middle",
              offsetX: 0,
              offsetY: 0,
              style: {
                color: `${isDark ? darkTheme.textColor : lightTheme.textColor}`,
                fontSize: "14px",
                fontFamily: "Source Sans Pro",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
