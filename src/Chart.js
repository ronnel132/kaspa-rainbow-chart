import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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
import { parseISO, format } from 'date-fns';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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

const getFairPrice = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.25978043) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
};

const getBand1Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.60720943) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}
const getBand2Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.49139976) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}
const getBand3Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.37559010) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}
const getBand4Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.14397077) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}
const getBand5Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -13.02816110) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}
const getBand6Price = (daysSinceGb) => {
  return parseFloat((Math.pow(10, -12.91235144) * Math.pow(daysSinceGb, 4.218461)).toFixed(7));
}

const PriceChart = ({ priceData, isMobile }) => {
  const chartRef = useRef(null);
  const [scaleType, setScaleType] = useState('logarithmic');

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.canvas.ondblclick = () => {
        chart.resetZoom();
      };
    }
  }, [chartRef]);

  const toggleScaleType = () => {
    setScaleType(prevType => prevType === 'logarithmic' ? 'linear' : 'logarithmic');
  };

  const startDate = new Date('2021-11-07');
  const endDate = new Date('2026-01-01');
  const days = Array.from({ length: 3650 - 100 + 1 }, (_, i) => i + 100); // Example for 100 to 3650 days
  const dates = days.map(day => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);
    return date;
  });
  const band1Prices = days.map(getBand1Price);
  const band2Prices = days.map(getBand2Price);
  const band3Prices = days.map(getBand3Price);
  const fairPrices = days.map(getFairPrice);
  const band4Prices = days.map(getBand4Price);
  const band5Prices = days.map(getBand5Price);
  const band6Prices = days.map(getBand6Price);

  const annotations = dates
    .filter(date => date.getDate() === startDate.getDate() && date.getMonth() === startDate.getMonth()) // Filter for the same day and month each year
    .map(date => ({
      type: 'line',
      xMin: date.getTime(),
      xMax: date.getTime(),
      borderColor: 'rgba(255, 255, 255, 1)', // White color
      borderWidth: 1,
      label: {
        enabled: true,
        content: date.toISOString().split('T')[0],
        position: 'top',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: 'black',
      }
    }));

  const priceDataPoints = Array.isArray(priceData) ? priceData.map(item => ({
    x: parseISO(item.date).getTime(), // Parse date as ISO to handle time zone correctly
    y: item.price,
  })) : [];

  const data = {
    labels: dates.map(date => date.getTime()),
    datasets: [
      {
        label: 'Kaspa is Dead',
        data: band1Prices,
        borderColor: '#D27FFF', // Custom color for Support Price
        backgroundColor: '#D27FFF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
      },
      {
        label: 'Buy!',
        data: band2Prices,
        borderColor: '#7F7FFF', // Custom color for Support Price
        backgroundColor: '#7F7FFF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
      },
      {
        label: 'Still Cheap',
        data: band3Prices,
        borderColor: '#7FB2FF', // Custom color for 25th Percentile Price
        backgroundColor: '#7FB2FF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Fair Price',
        data: fairPrices,
        borderColor: '#7FFF7F', // Custom color for Fair Price
        backgroundColor: '#7FFF7F',
        fill: false, // Disable fill
        pointRadius: 0,
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
      },
      {
        label: 'Getting Warmer',
        data: band4Prices,
        borderColor: '#FFF27F', // Custom color for 75th Percentile Price
        backgroundColor: '#FFF27F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Expensive',
        data: band5Prices,
        borderColor: '#FFB27F', // Custom color for Resistance Price
        backgroundColor: '#FFB27F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
      },
      {
        label: 'Sell Now!',
        data: band6Prices,
        borderColor: '#FF7F7F', // Custom color for Resistance Price
        backgroundColor: '#FF7F7F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
      },
      {
        label: 'Price Data',
        data: priceDataPoints,
        borderColor: '#FFFFFF', // White color for Price Data
        backgroundColor: '#FFFFFF',
        fill: false,
        pointRadius: 0, // Remove points
        pointHitRadius: 10, // Increase hit radius for better hover detection
        borderWidth: 1, // Make line thinner
        order: 1, // Ensure price data overlays other lines
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
          }
        },
        min: startDate.getTime(),
        max: endDate.getTime(),
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          callback: function (value) {
            const date = new Date(value);
            return format(date, 'yyyy-MM-dd'); // Format the date to ensure it's displayed correctly
          },
          maxRotation: 45, // Rotate labels diagonally
          minRotation: 45,
        },
        grid: {
          color: 'rgba(100, 100, 100, 0.5)', // Lighter gray color for grid lines
        }
      },
      y: {
        type: scaleType,
        title: {
          display: true,
          text: 'Price',
        },
        ticks: {
          callback: function (value) {
            if (scaleType === 'logarithmic') {
              const logValue = Math.log10(value);
              if (Number.isInteger(logValue)) {
                return value;
              }
              return null;
            } else {
              return value;
            }
          },
        },
        grid: {
          color: 'rgba(211, 211, 211, 0.5)', // Lighter gray color for grid lines
        }
      },
    },
    plugins: {
      annotation: {
        annotations: annotations
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
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const datasetLabel = context.dataset.label;
            const value = context.dataset.data[index];
            const priceDataPoint = priceDataPoints.find(p => p.x === context.parsed.x);

            if (datasetLabel === 'Price Data' && priceDataPoint) {
              return `${datasetLabel}: ${priceDataPoint.y}`;
            }
            return `${datasetLabel}: ${value}`;
          },
          labelColor: function(context) {
            const colors = {
              'Resistance Price': { borderColor: '#C10000', backgroundColor: '#C10000' },
              '75th Percentile Price': { borderColor: '#EC7C31', backgroundColor: '#EC7C31' },
              'Fair Price': { borderColor: '#FFEB84', backgroundColor: '#FFEB84' },
              '25th Percentile Price': { borderColor: '#62BF7B', backgroundColor: '#62BF7B' },
              'Support Price': { borderColor: '#4573C4', backgroundColor: '#4573C4' },
              'Price Data': { borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' },
            };
            return colors[context.dataset.label];
          }
        }
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ height: '80vh' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <button onClick={toggleScaleType} style={{ zIndex: 10 }}>
          Toggle Y-Axis Scale
        </button>
      </div>
    </div>
  );
};

export default PriceChart;
