import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { chartData } from '../../services/api/admin/AdminApiMethods';

interface ChartData {
  _id: string;
  userCount: number;
  postCount: number;
  jobCount: number;
}

interface SeriesData {
  month: string;
  count: number;
}

const ApexChart: React.FC = () => {
  const [userData, setUserData] = useState<SeriesData[]>([]);
  const [jobData, setJobData] = useState<SeriesData[]>([]);
  const [postData, setPostData] = useState<SeriesData[]>([]);
  const [loading, setLoading] = useState(true);

  const [options] = useState({
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value: number, timestamp: number, opts: any) {
          return opts.dateFormatter(new Date(value), "MMM yyyy");
        },
      },
    },
    title: {
      text: "User Growth, Post, and Job Creation",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#7E3AF2", "#3BA55D"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      min: 0,
    },
  });

  // useEffect(() => {
  //   chartData()
  //     .then((response: { data: { userJoinStatus: ChartData[]; postCreationStats: ChartData[]; jobCreationStats: ChartData[] } }) => {
  //       const { userJoinStatus, postCreationStats, jobCreationStats } = response.data;

  //       if (!userJoinStatus || !postCreationStats || !jobCreationStats) {
  //         console.error('Invalid data structure:', response.data);
  //         return;
  //       }

  //       setUserData(userJoinStatus.map((item) => ({
  //         month: new Date(item._id).toISOString(),
  //         count: item.userCount,
  //       })));

  //       setPostData(postCreationStats.map((item) => ({
  //         month: new Date(item._id).toISOString(),
  //         count: item.postCount, // Adjust if needed
  //       })));

  //       setJobData(jobCreationStats.map((item) => ({
  //         month: new Date(item._id).toISOString(),
  //         count: item.jobCount, // Adjust if needed
  //       })));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching chart data:", error);
  //     })
  //     .finally(() => setLoading(false)); 
  // }, []);


  useEffect(() => {
    chartData()
      .then((response:any) => {
        const { userJoinStatus, postCreationStats, jobCreationStats } = response.data.chartData;
  
        setUserData(userJoinStatus.map((item:any) => ({
          month: new Date(item._id).toISOString(),
          count: item.userCount,
        })));
  
        setPostData(postCreationStats.map((item:any) => ({
          month: new Date(item._id).toISOString(),
          count: item.postCount,
        })));
  
        setJobData(jobCreationStats.map((item:any) => ({
          month: new Date(item._id).toISOString(),
          count: item.jobCount,
        })));
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; 
  }

  const userSeries = {
    name: 'Users Joined',
    data: userData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const postSeries = {
    name: 'Posts Created',
    data: postData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  const jobSeries = {
    name: 'Jobs Created',
    data: jobData.map((data) => [new Date(data.month).getTime(), data.count]),
  };

  return (
    <div id="chart" className="ms-20 mt-5 items-center p-10 border rounded-lg bg-white" style={{ width: "840px" }}>
      <ReactApexChart
        options={options}
        series={[userSeries, postSeries, jobSeries]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
