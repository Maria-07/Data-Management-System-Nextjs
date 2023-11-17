import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// import "./Dashboard.css";
import axios from "axios";
// import { Placeholder } from "rsuite";
Chart.register(...registerables);

const TreatmentBarChart = () => {
  const [Graph, setGraph] = useState([]);
  const data1 = [9];
  const data2 = [5];
  const data3 = [5.08333333333, 0.063333333];
  const data4 = [0, 2.78333333333];
  const data5 = [0.1];

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        setGraph(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="border rounded-t-xl">
      {/* <div className="lg:w-4/12 md:w-5/12"> */}
      <h1 className=" graph-box bg-gradient-to-b from-teal-400 to-blue-900 py-1 mb-0 text-center text-white">
        Total Billed vs Total Paid
      </h1>
      {Graph.length > 0 ? (
        <Bar
          className=" chart p-2 "
          data={{
            labels: Graph.map((x) => x.name.slice(1, 8)),
            // labels: ["June", "July", "August"],

            datasets: [
              {
                label: "97153",
                data: data1,
                backgroundColor: "#00A4D6",
                barThickness: 25,
              },
              {
                label: "97156",
                data: data2,
                backgroundColor: "#00B88A",
                barThickness: 20,
              },
              {
                label: "0002",
                data: data3,
                backgroundColor: "#FFAD33",
                barThickness: 20,
              },
              {
                label: "0002",
                data: data4,
                backgroundColor: "#217FB5",
                barThickness: 20,
              },
              {
                label: "0",
                data: data5,
                backgroundColor: "#EB4444",
                barThickness: 20,
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
                    max: 100,
                  },
                },
              ],
            },
          }}
        ></Bar>
      ) : (
        // <Placeholder.Graph active />
        <></>
      )}
    </div>
  );
};

export default TreatmentBarChart;
