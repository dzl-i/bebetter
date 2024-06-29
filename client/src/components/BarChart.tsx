"use client";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

import { Bar } from "react-chartjs-2";

export default function BarChart({ datasets }: { datasets: any[] }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <Bar
        width="100%"
        height="100%"
        data={{
          datasets: datasets,
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </div>
  );
}
