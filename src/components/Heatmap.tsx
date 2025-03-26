import  { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

// Register Chart.js components & Matrix plugin
Chart.register(...registerables, MatrixController, MatrixElement);

const Heatmap = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);;
  const chartInstance =  useRef<Chart<"matrix"> | any|null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous instance if exists
    }

    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;
    chartInstance.current = new Chart(ctx, {
      type: "matrix",
      data: {
        datasets: [
          {
            label: "Heatmap",
            data: [
   // Channel 1
   { x: "Channel 1", y: "A", v: 5 },
   { x: "Channel 1", y: "B", v: 10 },
   { x: "Channel 1", y: "C", v: 20 },
   { x: "Channel 1", y: "D", v: 15 },
   { x: "Channel 1", y: "E", v: 25 },
   
   // Channel 2
   { x: "Channel 2", y: "A", v: 15 },
   { x: "Channel 2", y: "B", v: 30 },
   { x: "Channel 2", y: "C", v: 10 },
   { x: "Channel 2", y: "D", v: 25 },
   { x: "Channel 2", y: "E", v: 35 },

   // Channel 3
   { x: "Channel 3", y: "A", v: 25 },
   { x: "Channel 3", y: "B", v: 40 },
   { x: "Channel 3", y: "C", v: 5 },
   { x: "Channel 3", y: "D", v: 20 },
   { x: "Channel 3", y: "E", v: 30 },

   // Channel 4
   { x: "Channel 4", y: "A", v: 35 },
   { x: "Channel 4", y: "B", v: 20 },
   { x: "Channel 4", y: "C", v: 35 },
   { x: "Channel 4", y: "D", v: 10 },
   { x: "Channel 4", y: "E", v: 45 },

   // Channel 5
   { x: "Channel 5", y: "A", v: 45 },
   { x: "Channel 5", y: "B", v: 10 },
   { x: "Channel 5", y: "C", v: 50 },
   { x: "Channel 5", y: "D", v: 30 },
   { x: "Channel 5", y: "E", v: 15 },
   
              
            ],
            // backgroundColor: (ctx) => {
            //   const value = (ctx.raw as { v: number }).v;
            //   return value%2?"rgba(149,82,211,0.9)":" rgba(149,82,211,0.6)"; // Dynamic purple shades
            // },
            backgroundColor: (() => {
              // Define the four possible colors
              const colors = [
                "rgba(149,82,211,0.9)",
                "rgba(149,82,211,0.6)",
                // "rgba(149,82,211,0.3)",
                "rgba(149,82,211,0.1)",
              ];
            
              // Shuffle and pick two random unique colors
              const shuffled = colors.sort(() => Math.random() - 0.5);
              const selectedColors = shuffled.slice(0, 2);
            
              // Return a function that alternates between the two chosen colors
              return (ctx: any) => {
                const value = (ctx.raw as { v: number }).v;
                return value % 2 ? selectedColors[0] : selectedColors[1];
              };
            })(),
            borderWidth: 2,
            borderColor: "white",
            width: 40, // Adjust cell width
            height: 15, // Adjust cell height
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            labels: ["Channel 1", "Channel 2", "Channel 3", "Channel 4", "Channel 5"],
            offset: true, // Add space around labels

          },
          y: {
            type: "category",
            labels: ["A", "B", "C", "D", "E"],
            offset: true, // Add space around labels
            ticks: {
              padding: 10, // Add extra padding to avoid overlap
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend for cleaner UI
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup when component unmounts
      }
    };
  }, []);

  return (
      <canvas ref={chartRef}></canvas>
  );
};

export default Heatmap;
