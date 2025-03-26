// import React, { useState } from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement, TooltipItem } from "chart.js";
import React from "react";

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

// Utility Functions
const Utils = {
  CHART_COLORS: {
    red: "rgb(149,82,211)",
    orange: "rgb(149,82,211)",
  },

  transparentize(color:string, opacity:number) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  },

  bubbles({ count, rmin, rmax, min, max } : { count: number; rmin: number; rmax: number; min: number; max: number }) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * (max - min) + min,
      y: Math.random() * (max - min) + min,
      r: Math.random() * (rmax - rmin) + rmin,
    }));
  },
};
const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, rmin: 2, rmax: 6, min: 0, max: 100 };

const data={
  datasets: [
    {
      // label: "Dataset 1",
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.3),
    },
    {
      // label: "Dataset 2",
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
    },
  ],
}

const BubbleChart:React.FC= () => {

  const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "nearest",  // Ensures tooltip appears when hovering near bubbles
        intersect: true,  // Ensures tooltip only appears when directly over a bubble
        callbacks: {
          label: (context: TooltipItem<"bubble">) => {
            const { x, y, r } = context.raw as { x: number; y: number; r: number };
            return `X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, Size: ${r.toFixed(2)}`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",  // Fixes tooltip not showing by ensuring nearest data point is selected
      intersect: true,  // Requires cursor to be directly on a bubble
    },
  };

  // Actions
  // const randomizeData = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     datasets: prevData.datasets.map((dataset) => ({
  //       ...dataset,
  //       data: Utils.bubbles(NUMBER_CFG),
  //     })),
  //   }));
  // };

  // const addDataset = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     datasets: [
  //       ...prevData.datasets,
  //       {
  //         label: `Dataset ${prevData.datasets.length + 1}`,
  //         backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
  //         borderColor: Utils.CHART_COLORS.orange,
  //         data: Utils.bubbles(NUMBER_CFG),
  //       },
  //     ],
  //   }));
  // };

  // const addData = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     datasets: prevData.datasets.map((dataset) => ({
  //       ...dataset,
  //       data: [...dataset.data, Utils.bubbles({ count: 1, rmin: 5, rmax: 15, min: 0, max: 100 })[0]],
  //     })),
  //   }));
  // };

  // const removeDataset = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     datasets: prevData.datasets.slice(0, -1),
  //   }));
  // };

  // const removeData = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     datasets: prevData.datasets.map((dataset) => ({
  //       ...dataset,
  //       data: dataset.data.slice(0, -1),
  //     })),
  //   }));
  // };

  return (
    <div className="">
      {/* Use Bubble component from react-chartjs-2 */}
      {/* <div className="w-full h-full overflow-hidden"> */}
  <Bubble data={data} options={options} />
{/* </div> */}
      {/* <div className="flex gap-2 mt-4">
        <button onClick={randomizeData} className="px-4 py-2 bg-blue-500 text-white rounded">
          Randomize
        </button>
        <button onClick={addDataset} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Dataset
        </button>
        <button onClick={addData} className="px-4 py-2 bg-yellow-500 text-black rounded">
          Add Data
        </button>
        <button onClick={removeDataset} className="px-4 py-2 bg-red-500 text-white rounded">
          Remove Dataset
        </button>
        <button onClick={removeData} className="px-4 py-2 bg-gray-500 text-white rounded">
          Remove Data
        </button>
      </div> */}
    </div>
  );
};

export default BubbleChart;
