import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { chartData } from '../../services/api/admin/AdminApiMethods';
import ApexCharts, { ApexOptions } from 'apexcharts';

const Diagram: React.FC = () => {
  const [series, setSeries] = useState<number[]>([44, 55, 13, 33]);

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart") as HTMLElement, options);
    chart.render();

    function appendData() {
      setSeries((prevSeries) => [...prevSeries, Math.floor(Math.random() * (100 - 1 + 1)) + 1]);
    }

    function removeData() {
      setSeries((prevSeries) => prevSeries.slice(0, -1));
    }

    function randomize() {
      setSeries((prevSeries) => prevSeries.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1));
    }

    function reset() {
      setSeries([44, 55, 13, 33]);
    }

    document.querySelector("#randomize")?.addEventListener("click", randomize);
    document.querySelector("#add")?.addEventListener("click", appendData);
    document.querySelector("#remove")?.addEventListener("click", removeData);
    document.querySelector("#reset")?.addEventListener("click", reset);

    return () => {
      chart.destroy();
    };
  }, [options]);

  return (
    <div id="chart" className="ms-20 mt-5 items-center p-10 border rounded-lg bg-white" style={{ width: "840px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={350}
      />
    </div>
  );
}

export default Diagram;
