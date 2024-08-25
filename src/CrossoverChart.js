import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  zoomPlugin
);

const SMAChart = ({ priceData, isMobile }) => {
  const chartRef = useRef(null);

  // Hook to handle double-click event
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const chart = chartRef.current;
      chart.canvas.ondblclick = () => {
        chart.resetZoom();
      };
    }
  }, [chartRef]);

  // Ensure priceData is an array
  if (!Array.isArray(priceData)) {
    console.error("priceData should be an array but received:", priceData);
    return null;
  }

  const calculateSMA = (data, window) => {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        sma.push(null);
      } else {
        let sum = 0;
        for (let j = 0; j < window; j++) {
          sum += data[i - j].price;
        }
        sma.push(sum / window);
      }
    }
    return sma;
  };

  // Calculate SMAs
  const sma66 = calculateSMA(priceData, 66);
  const sma85 = calculateSMA(priceData, 85);

  // Identify crossovers
  const annotations = [];
  for (let i = 1; i < priceData.length; i++) {
    if (sma85[i] > sma66[i] && sma85[i - 1] <= sma66[i - 1]) {
      annotations.push({
        type: 'line',
        xMin: priceData[i].date,
        xMax: priceData[i].date,
        borderColor: 'red',
        borderWidth: 1,
        borderDash: [5, 5],
        label: {
          enabled: true,
          content: 'Crossover',
          position: 'top',
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
  }

  const latestDate = priceData[priceData.length - 1].date; // Get the latest date in the data

  const data = {
    labels: priceData.map((item) => item.date),
    datasets: [
      {
        label: 'Price Data',
        data: priceData.map((item) => item.price),
        borderColor: 'white', // Change price line to white
        backgroundColor: 'white',
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
        pointHitRadius: 10, // Increase hit radius for better hover detection
      },
      {
        label: '66-Day Moving Average',
        data: sma66,
        borderColor: 'green',
        backgroundColor: 'green',
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
        pointHitRadius: 10, // Increase hit radius for better hover detection
      },
      {
        label: '85-Day Moving Average',
        data: sma85,
        borderColor: 'orange',
        backgroundColor: 'orange',
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
        pointHitRadius: 10, // Increase hit radius for better hover detection
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'yyyy-MM-dd',
          displayFormats: {
            month: 'yyyy-MM-dd',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          color: 'rgba(100, 100, 100, 0.5)',
        },
        max: latestDate, // Limit the x-axis to the latest date
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
        grid: {
          color: 'rgba(211, 211, 211, 0.5)',
        },
      },
    },
    plugins: {
      annotation: {
        annotations: annotations,
      },
      zoom: {
        pan: {
          enabled: isMobile,
          mode: 'xy',
        },
        zoom: {
          drag: {
            enabled: true,
            borderColor: 'rgba(54, 162, 235, 0.5)',
            borderWidth: 1,
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
          },
          mode: 'xy',
          pinch: {
            enabled: isMobile,
          },
        },
      },
      tooltip: {
        mode: 'nearest',
        intersect: true,
      },
      legend: {
        labels: {
          color: '#CCCCCC',
        },
        onClick: null, // Disables the legend's click functionality
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ height: '80vh' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default SMAChart;
