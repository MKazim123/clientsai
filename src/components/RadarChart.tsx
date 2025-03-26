import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Radar chart
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Utility Functions
const Utils = {
  CHART_COLORS: {
    red: "rgb(105, 73, 140)",
    orange: "rgb(149,82,211)",
  },
  transparentize(color:string, opacity:number) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  },
  generateData(count:number, min:number, max:number) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min) + min));
  },
};
const DATA_COUNT = 7;

const data ={ 
  labels: ["A", "B", "C", "D", "E", "F", "G"], // Labels for each axis
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.generateData(DATA_COUNT, 10, 100), // Generate random data
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.3),
    },
    {
      label: "Dataset 2",
      data: Utils.generateData(DATA_COUNT, 10, 100),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.2),
    },
  ],
}
const RadarChart = () => {

  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false, position: "top" as const },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
