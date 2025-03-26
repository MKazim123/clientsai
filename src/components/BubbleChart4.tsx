import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, TooltipItem } from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "Group 1",
      data: [{ x: -10, y: 4, r: 5 }],
      backgroundColor: "rgba(149,82,211,0.9)", // Purple with transparency
    },
    {
      label: "Group 2",
      data: [{ x: -20, y: 10, r: 10 }],
      backgroundColor: " rgba(149,82,211,0.6)", 
    },
    {
      label: "Group 3",
      data: [{ x: -56, y: 4.3, r: 15 }],
      backgroundColor: "rgba(149,82,211,0.5)", 
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: { display: false }, // Hide legend
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bubble">)=> `${context.dataset.label}`,
      },
    },
  },
  scales: {
    x: {
      display: false, // Hide x-axis
    },
    y: {
      beginAtZero: true,
    },
  },
};

const BubbleChart4 = () => {
  return <Bubble data={data} options={options} />;
};

export default BubbleChart4;
