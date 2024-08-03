import React, { useEffect, useRef, useState } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { RefreshCw } from 'lucide-react';
import { diagramData } from '../../services/api/admin/AdminApiMethods';
import './Diagram.css';

interface SeriesData {
  month: string;
  count: number;
}

const Diagram: React.FC = () => {
  const chartRef = useRef<ApexCharts | null>(null);
  const [userData, setUserData] = useState<SeriesData[]>([]);
  const [jobData, setJobData] = useState<SeriesData[]>([]);
  const [jobApplied, setJobApplied] = useState<SeriesData[]>([]);

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      width: 300,
      height: 250,
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
    labels: ['Active Users', 'Jobs Applied', 'Active Jobs'],
  };

  const reset = () => {
    if (chartRef.current) {
      chartRef.current.updateSeries([
        userData.reduce((sum, item) => sum + item.count, 0),
        jobApplied.reduce((sum, item) => sum + item.count, 0),
        jobData.reduce((sum, item) => sum + item.count, 0),
      ]);
    }
  };

  useEffect(() => {
    diagramData()
      .then((response: any) => {
        const { userJoinStatus, appliedJobStats, jobCreationStats } = response.data.diagramData;

        setUserData(userJoinStatus.map((item: any) => ({
          month: new Date(item._id).toISOString(),
          count: item.userCount,
        })));

        setJobApplied(appliedJobStats.map((item: any) => ({
          month: new Date(item._id).toISOString(),
          count: item.applicationCount,
        })));

        setJobData(jobCreationStats.map((item: any) => ({
          month: new Date(item._id).toISOString(),
          count: item.jobCount,
        })));
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.updateSeries([
        userData.reduce((sum, item) => sum + item.count, 0),
        jobApplied.reduce((sum, item) => sum + item.count, 0),
        jobData.reduce((sum, item) => sum + item.count, 0),
      ]);
    }
  }, [userData, jobApplied, jobData]);

  useEffect(() => {
    chartRef.current = new ApexCharts(document.querySelector("#chart") as HTMLElement, {
      ...options,
      series: [
        userData.reduce((sum, item) => sum + item.count, 0),
        jobApplied.reduce((sum, item) => sum + item.count, 0),
        jobData.reduce((sum, item) => sum + item.count, 0),
      ],
    });

    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ms-20 p-2 w-fit">
      <div id="chart"></div>
      <div className="refresh-button">
        <button onClick={reset}>
          <RefreshCw size={14} strokeWidth={2} style={{ color: 'green' }} />
        </button>
      </div>
    </div>
  );
};

export default Diagram;
