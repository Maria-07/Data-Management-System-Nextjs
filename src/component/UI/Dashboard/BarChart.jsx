import React, { useEffect, useState }from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);
const BarChart = ({token}) => {
  const [GraphData, setGraphData] = useState([]);
  useEffect(() => {
    const getGraphData = async () => {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/total-session-vs-rendered-session`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": token || null,
      }
    });
    const data = res?.data;
    setGraphData(data);
  }
  getGraphData();
}, []);
console.log('Bar Graph',GraphData);
  return (
    <div div className="bar border rounded-t-xl">
      {/* <div div className="lg:w-4/12 md:w-6/12"> */}
      <h1 className="graph-box bg-gradient-to-b from-teal-400 to-blue-900 py-1 mb-0 text-center text-white">
        {/* Total Billed vs Total Paid */}
        Total Sessions Vs Rendered Sessions
      </h1>
      {GraphData?.months ? (
      <Bar
        className=" chart p-2"
        data={{
          labels: GraphData?.months,
          datasets: [
            {
              label: "Total",
              data: GraphData?.sum?.[0],
              backgroundColor: "#56BBF1",
              barThickness: 25,
            },
            {
              label: "Rendered",
              data: GraphData?.sum?.[1],
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
      ) : (
        <p>load</p>
      )}
    </div>
  );
};

export default BarChart;
