// GroupedBarChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const GroupedBarChart = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'round'
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      title: {
        text: 'Months'
      }
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    colors: ['#FF4560', '#00E396'],
    dataLabels: {
      enabled: true
    },
    title: {
      text: 'Monthly Report: Posts vs Jobs',
      align: 'left'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  };

  const chartSeries = [
    {
      name: 'Posts',
      data: [15, 25, 35, 45, 55]
    },
    {
      name: 'Jobs',
      data: [20, 30, 40, 50, 60]
    }
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default GroupedBarChart;
