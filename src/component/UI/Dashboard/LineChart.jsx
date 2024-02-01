import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const LineChart = ({token}) => {
  //const [LineChartGraph, SetLineChartGraph] = useState([]);
  const [GraphData, setGraphData] = useState([]);
  /*useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        SetLineChartGraph(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);*/
  useEffect(() => {
    const getGraphData = async () => {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/cancelled-session-chart`,
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
}, [token]);
console.log('LIne Graph',GraphData);
  return (
    // <div div className="lg:w-4/12 md:w-6/12">
    <div className="border rounded-t-xl">
      <h1 className="graph-box bg-gradient-to-b from-teal-400 to-blue-900 py-1 mb-0 text-center text-white">
        {/* Charge Analysis by Service Date */}
        Cancelled Sessions
      </h1>
      {GraphData?.months ? (
        <Line
          className=" chart p-2"
          data={{
            labels: GraphData?.months,
            datasets: [
              {
                label: "Cancelled Sessions",
                data: GraphData?.sum,
                backgroundColor: "#56BBF1",
                barThickness: 35,
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
                    color: "#56BBF1",
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
        ></Line>
      ) : (
        <p>load</p>
      )}
    </div>
  );
};

export default LineChart;
