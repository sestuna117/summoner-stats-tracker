import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./TeamAnalytics.css";

export default function TeamAnalytics(props) {
  const { participants, TEAM } = props;
  console.log(participants);

  // const data = {
  //   labels: ["Red", "Blue"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19],
  //       backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
  //     },
  //   ],
  // };

  const data = {
    labels: ["Blue", "Red"],
    datasets: [
      {
        label: "# of kills",
        data: [10, 20],
        backgroundColor: ["#7db2ff", "#ff938b"],
        borderColor: ["#5f9fff", "#ff7066"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: 50,
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}
