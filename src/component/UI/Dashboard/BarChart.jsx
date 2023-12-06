import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const BarChart = () => {
  return (
    <div div className="bar border rounded-t-xl">
      {/* <div div className="lg:w-4/12 md:w-6/12"> */}
      <h1 className="graph-box bg-gradient-to-b from-teal-400 to-blue-900 py-1 mb-0 text-center text-white">
        {/* Total Billed vs Total Paid */}
        Total Sessions Vs Rendered Sessions
      </h1>
      <Bar
        className=" chart p-2"
        data={{
          labels: [
            "December",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
          ],
          datasets: [
            {
              label: "Total",
              data: [3328, 1800, 940],
              backgroundColor: "#56BBF1",
              barThickness: 25,
            },
            {
              label: "Rendered",
              data: [2.24],
              backgroundColor: "#6CC4A1",
              barThickness: 25,
            },
          ],
        }}
        options={{
          tooltips: {
            mode: "index",
            callbacks: {
              label: function (toolTipItem) {
                return "Revenue: $" + toolTipItem.value;
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "cyan",
                },
                scaleLabel: {
                  labelString: "Months",
                  display: true,
                  fontColor: "blue",
                  fontSize: 20,
                },
                ticks: {
                  fontColor: "green",
                },
              },
            ],
            yAxes: [
              {
                suggestedMax: 10000,
                gridLines: {
                  color: "cyan",
                },
                scaleLabel: {
                  labelString: "Revenue",
                  display: true,
                  fontColor: "blue",
                  fontSize: 20,
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "green",
                },
              },
            ],
          },
        }}
      ></Bar>
    </div>
  );
};

export default BarChart;
