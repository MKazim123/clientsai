import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MultiLineChart = () => {
  const labels = [
    "Raw Signals Detected",
    "Key Observations",
    "Opportunities Identified",
    "Breakthrough Discoveries",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [53532120, 899304, 48189, 2500032], // Data for first line
        borderColor: "rgba(255, 99, 132, 1)", // Red
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        pointRadius: 6,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
      },
      {
        label: "Dataset 2",
        data: [10000000, 300000, 45000, 100], // Data for second line
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        pointRadius: 6,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        borderWidth: 3,
      },
      {
        label: "Dataset 3",
        data: [2000000, 0, 40000, 1009800], // Data for third line
        borderColor: "rgba(75, 192, 192, 1)", // Green
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        pointRadius: 6,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Show legend for multiple lines
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return String(tickValue);
          },
      }},
      x: {
        ticks: { font: { size: 10 } },
      },
    },
    elements: {
        point: {
          radius: 0, // Hide points unless hovered
          hoverRadius: 6, // Show larger points when hovered
        },
      },
  };

  return (
    <div className="w-full h-64 p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default MultiLineChart;
