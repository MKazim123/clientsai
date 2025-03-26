import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, Chart } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Group A", "Group B", "Group C"],
  datasets: [
    {
      data: [72, 10, 18], // 72% primary, 18% secondary, 10% remaining
      backgroundColor: ["rgb(149, 82, 211)", "rgb(188, 115, 237)", "rgba(105, 73, 140, 0.7)"], // Purple shades
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  cutout: "70%", // Creates the doughnut hole
  plugins: {
    legend: { display: false }, // Hide legend
    tooltip: {
      enabled: true, // Ensure tooltips are visible
      callbacks: {
        label: (context: TooltipItem<"doughnut">)  => `${context.label}: ${context.raw}%`,
      },
    },
  },
};

const CenterText = {
  id: "centerText",
  beforeDraw(chart: Chart<'doughnut'>){
    const { ctx, width, height } = chart;
    ctx.restore();
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `bold ${fontSize}em sans-serif`;
    ctx.fillStyle = "#9b5de5";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("72%", width / 2, height / 2);

    // Positioning the text
    const text = "72%";
    const textX = Math.round(width / 2);
    const textY = Math.round(height / 2);

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const DoughnutChart = () => {
  return (
      <Doughnut data={data} options={options} plugins={[CenterText]} />
     
  );
};

export default DoughnutChart;
