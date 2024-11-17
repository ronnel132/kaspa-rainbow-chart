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
import { parseISO, format, addDays } from 'date-fns';
import { CircularProgress, Box } from '@mui/material';

const _ = require('lodash');

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

const calculatePrice = (daysSinceGb, slope, intercept) => {
  return parseFloat((Math.pow(10, intercept) * Math.pow(daysSinceGb, slope)).toFixed(7));
};

const PriceChart = ({ priceData, powerLawData, isMobile, kasPrice }) => {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.canvas.ondblclick = () => {
        chart.resetZoom();
      };
      // Register the custom plugin
      const watermarkPlugin = {
        id: 'watermark',
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          const { width, height } = chart;
          const text = 'KaspaRainbowChart.com';
          const watermarkPositionX = isMobile ? width / 1.7 : width - (width / 4);

          ctx.save();
          ctx.font = isMobile ? 'bold 20px sans-serif' : 'bold 30px sans-serif';
          ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'; // Light gray color with transparency
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.translate(watermarkPositionX, height - (height / 4));
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      };
      ChartJS.register(watermarkPlugin);
    }
  }, [chartRef, kasPrice, powerLawData, isMobile]);

  useEffect(() => {
    if (!_.isEmpty(powerLawData) && !_.isEmpty(priceData)) {
      setIsLoading(false);
    }
  }, [powerLawData, priceData]);

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const lastPowerLawData = powerLawData;
  const fairSlope = lastPowerLawData.power_law_slope;
  const fairIntercept = lastPowerLawData.power_law_intercept;
  const deltaIntercept = 0.11580967;

  const startDate = new Date('2021-11-07');
  const endDate = addDays(new Date(priceData[priceData.length - 1].date), 365);
  const days = Array.from({ length: 3650 - 100 + 1 }, (_, i) => i + 100);
  const dates = days.map((day) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);
    return date;
  });

  const getFairPrice = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept);
  const getBand1Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept - 3 * deltaIntercept);
  const getBand2Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept - 2 * deltaIntercept);
  const getBand3Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept - deltaIntercept);
  const getBand4Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept + deltaIntercept);
  const getBand5Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept + 2 * deltaIntercept);
  const getBand6Price = (daysSinceGb) => calculatePrice(daysSinceGb, fairSlope, fairIntercept + 3 * deltaIntercept);

  const band1Prices = days.map(getBand1Price);
  const band2Prices = days.map(getBand2Price);
  const band3Prices = days.map(getBand3Price);
  const fairPrices = days.map(getFairPrice);
  const band4Prices = days.map(getBand4Price);
  const band5Prices = days.map(getBand5Price);
  const band6Prices = days.map(getBand6Price);

  const today = new Date().setHours(0, 0, 0, 0);
  const priceDataPoints = priceData.map((item) => {
    const itemDate = parseISO(item.date).getTime();
    if (itemDate === today && kasPrice !== null) {
      return { x: itemDate, y: kasPrice };
    }
    return { x: itemDate, y: item.price };
  });

  // Add current price if it's not already in the data
  if (kasPrice !== null && !priceDataPoints.some(point => point.x === today)) {
    priceDataPoints.push({ x: today, y: kasPrice });
  }

  const data = {
    labels: dates.map((date) => date.getTime()),
    datasets: [
      {
        label: 'Kaspa is NOT Dead',
        data: band1Prices,
        borderColor: '#D27FFF',
        backgroundColor: '#D27FFF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Buy!',
        data: band2Prices,
        borderColor: '#7F7FFF',
        backgroundColor: '#7F7FFF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Still Cheap',
        data: band3Prices,
        borderColor: '#7FB2FF',
        backgroundColor: '#7FB2FF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Fair Price',
        data: fairPrices,
        borderColor: '#7FFF7F',
        backgroundColor: '#7FFF7F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Getting Warmer',
        data: band4Prices,
        borderColor: '#FFF27F',
        backgroundColor: '#FFF27F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Expensive',
        data: band5Prices,
        borderColor: '#FFB27F',
        backgroundColor: '#FFB27F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Sell Now!',
        data: band6Prices,
        borderColor: '#FF7F7F',
        backgroundColor: '#FF7F7F',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
      },
      {
        label: 'Price Data',
        data: priceDataPoints,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        fill: false,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 1,
        order: 1,
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
        min: startDate.getTime(),
        max: endDate.getTime(),
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          color: '#CCCCCC',
          callback: function (value) {
            const date = new Date(value);
            return format(date, 'yyyy-MM-dd');
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: 'rgba(100, 100, 100, 0.5)',
        },
      },
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Price',
        },
        ticks: {
          color: '#CCCCCC',
          callback: function (value) {
            const logValue = Math.log10(value);
            if (Number.isInteger(logValue)) {
              return value;
            }
            return null;
          },
        },
        grid: {
          color: 'rgba(211, 211, 211, 0.5)',
        },
      },
    },
    plugins: {
      annotation: {
        annotations: !isMobile ? {
          krakenListing: {
            type: 'line',
            xMin: new Date('2024-11-19').getTime(),
            xMax: new Date('2024-11-19').getTime(),
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [5, 5]
          },
          krakenText: {
            type: 'label',
            xValue: new Date('2024-11-19').getTime(),
            yValue: 0.00015, // Position at bottom of chart
            content: 'Kraken Listing',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'rgba(255, 255, 255, 1)',
            font: {
              size: 12
            },
            padding: 4,
            position: 'start'
          },
          krc20Launch: {
            type: 'line',
            xMin: new Date('2024-09-15').getTime(),
            xMax: new Date('2024-09-15').getTime(),
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [5, 5]
          },
          krc20Text: {
            type: 'label',
            xValue: new Date('2024-09-15').getTime(),
            yValue: 0.0003, // Position at bottom of chart
            content: 'KRC-20 Launch',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'rgba(255, 255, 255, 1)',
            font: {
              size: 12
            },
            padding: 4,
            position: 'start'
          },
          gateIoLaunch: {
            type: 'line',
            xMin: new Date('2023-03-21').getTime(),
            xMax: new Date('2023-03-21').getTime(),
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [5, 5]
          },
          gateIoText: {
            type: 'label',
            xValue: new Date('2023-03-21').getTime(),
            yValue: 0.00015, // Position at bottom of chart
            content: 'Gate IO Listing',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'rgba(255, 255, 255, 1)',
            font: {
              size: 12
            },
            padding: 4,
            position: 'start'
          },
          kucoinLaunch: {
            type: 'line',
            xMin: new Date('2023-05-06').getTime(),
            xMax: new Date('2023-05-06').getTime(),
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [5, 5]
          },
          kucoinText: {
            type: 'label',
            xValue: new Date('2023-05-06').getTime(),
            yValue: 0.0003, // Position at bottom of chart
            content: 'KuCoin Listing',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'rgba(255, 255, 255, 1)',
            font: {
              size: 12
            },
            padding: 4,
            position: 'start'
          },
          mexcLaunch: {
            type: 'line',
            xMin: new Date('2022-09-27').getTime(),
            xMax: new Date('2022-09-27').getTime(),
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [5, 5]
          },
          mexcText: {
            type: 'label',
            xValue: new Date('2022-09-27').getTime(),
            yValue: 0.00015, // Position at bottom of chart
            content: 'MEXC Listing',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'rgba(255, 255, 255, 1)',
            font: {
              size: 12
            },
            padding: 4,
            position: 'start'
          },
        } : {},
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
          label: function (context) {
            const index = context.dataIndex;
            const datasetLabel = context.dataset.label;
            const value = context.dataset.data[index];
            const priceDataPoint = priceDataPoints.find((p) => p.x === context.parsed.x);

            if (datasetLabel === 'Price Data' && priceDataPoint) {
              return `${datasetLabel}: ${priceDataPoint.y}`;
            }
            return `${datasetLabel}: ${value}`;
          },
          labelColor: function (context) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.backgroundColor,
            };
          },
        },
      },
      legend: {
        labels: {
          color: '#CCCCCC',
          font: {
            size: 16,
          },
        },
        onClick: null,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default PriceChart;
