import React from "react";// eslint-disable-next-line 
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Chart = (props) => {
  const { forcastData } = props;
  const data = {
    labels: forcastData
      .slice(1)
      .map((d, i) =>
        d?.dt_txt ?? "" ? format(parseISO(d?.dt_txt ?? ""), "EEEE") : ""
      ),
    datasets: [
      {
        label: "Maximum temperature",
        data: forcastData.slice(1).map(
          (d, i) =>
            // console.log(d?.main.temp_max ?? 0)
            d?.main.temp_max + Math.random() ?? 0
        ),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        label: "Minimum temperature",
        data: forcastData.slice(1).map(
          (d, i) =>
            // console.log(d?.main.temp_min ?? 0)
            d?.main.temp_min - Math.random() ?? 0
        ),
        fill: true,
        backgroundColor: "rgba(235, 91, 0, 0.2)",
        borderColor: "#EB5B00",
        borderWidth: 2,
      },
    ],
  };

  const option = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        display: "flex",
        text: "Temperature Chart",
      },
    },
    pan: {
      enabled: true,
      mode: "x",
    },
    zoom: {
      enabled: true,
      mode: "x",
      sensitivity: 0.5,
    },
  };
  return (
    <div className=" w-[100%] min-h-[400px] pt-2 flex justify-center items-center">
      <Line data={data} options={option} />
    </div>
  );
};

export default Chart;
