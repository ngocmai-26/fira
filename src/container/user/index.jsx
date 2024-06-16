import { useLayoutEffect } from "react";
import Layout from "../layout";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllDashboard } from "../../thunks/DashboardThunk";

import loading from "../../asset/images/loading.png";

// Register the CategoryScale
Chart.register(CategoryScale);

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
function JobStatusDoughnutChart({ data }) {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null;
  }

  const jobStatuses = data.statusJobInMonth.jobsInMonth.map(
    (job) => job.status
  );
  const jobStatusCounts = jobStatuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Ensure labels include all possible statuses even if their count is zero
  const allStatuses = ["PENDING", "PROCESSING", "DONE"];
  const doughnutData = {
    labels: allStatuses,
    datasets: [
      {
        label: "Trạng thái công việc",
        data: allStatuses.map((status) => jobStatusCounts[status] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // PENDING
          "rgba(255, 205, 86, 0.6)", // PROCESSING
          "rgba(75, 192, 192, 0.6)", // DONE
        ],
      },
    ],
  };

  return <Doughnut data={doughnutData} />;
}
function DailyJobCreationChart({ data }) {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const jobCreationCounts = daysInMonth.map((day) => {
    const jobsCreatedOnDay = data.statusJobInMonth.jobsInMonth.filter(
      (job) =>
        new Date(job.createdAt).toLocaleDateString() ===
        day.toLocaleDateString()
    ).length;
    return jobsCreatedOnDay;
  });

  const lineData = {
    labels: daysInMonth.map((day) => day.toLocaleDateString()),
    datasets: [
      {
        label: "Số lượng công việc",
        data: jobCreationCounts,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Ẩn legend hoàn toàn
      },
    },
  };

  return <Line data={lineData} options={options} />;
}
function KPIChart({ data }) {
  if (
    !data ||
    !data.statusKPI ||
    !data.statusKPI.Kpi ||
    data.statusKPI.Kpi.length === 0
  ) {
    return (
      <div className="text-center">
        Hiện tại bạn chưa có phần đánh giá nào của bản thân
      </div>
    );
  }

  const kpis = data.statusKPI.Kpi;
  const doneKpis = kpis.filter((kpi) => kpi.description === "DONE").length;
  const evaluateKpis = kpis.filter(
    (kpi) => kpi.description === "EVALUATE"
  ).length;
  const totalKpis = kpis.length;

  const doneRate = (doneKpis / totalKpis) * 100;
  const evaluateRate = (evaluateKpis / totalKpis) * 100;
  const notCompletedRate = 100 - doneRate - evaluateRate;

  const doughnutData = {
    labels: ["DONE", "EVALUATE", "NOT COMPLETED"],
    datasets: [
      {
        label: "Kpi Completion Rate",
        data: [doneRate, evaluateRate, notCompletedRate],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // DONE - teal
          "rgba(255, 99, 132, 0.6)", // EVALUATE - salmon
          "rgba(54, 162, 235, 0.6)", // NOT COMPLETED - dodgerblue
        ],
      },
    ],
  };

  return <Doughnut data={doughnutData} />;
}

function JobEvaluateChart({ data }) {
  const jobs = data?.statusJobInMonth?.jobsInMonth || [];

  // Separate jobs into evaluated and not done
  const jobEvaluates = jobs
    .filter((job) => job.status === "done")
    .map((job) => job.jobEvaluate)
    .filter((evaluate) => evaluate !== null);

  const notDoneCount = jobs.filter((job) => job.status !== "done").length;

  // Count occurrences of each job evaluation
  const evaluateCounts = {
    BAD: 0,
    MEDIUM: 0,
    GOOD: 0,
    "NOT DONE": notDoneCount,
  };

  jobEvaluates.forEach((evaluate) => {
    evaluateCounts[evaluate] += 1;
  });
  const allStatuses = ["BAD", "MEDIUM", "GOOD", "NOT DONE"];

  const barData = {
    labels: allStatuses,
    datasets: [
      {
        label: false,
        data: allStatuses.map((status) => evaluateCounts[status] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // BAD
          "rgba(255, 205, 86, 0.6)", // MEDIUM
          "rgba(75, 192, 192, 0.6)", // GOOD
          "rgba(201, 203, 207, 0.6)", // NOT DONE
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn legend hoàn toàn
      },
    },
  };

  return <Bar data={barData} options={options} />;
}

const DailyJobManagerCreationChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null;
  }

  const jobs = data.statusJobInMonth.jobsInMonth;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const jobCreationCounts = daysInMonth.map((day) => {
    const jobsCreatedOnDay = jobs.filter(
      (job) =>
        new Date(job.createdAt).toLocaleDateString() ===
        day.toLocaleDateString()
    ).length;
    return jobsCreatedOnDay;
  });

  const lineData = {
    labels: daysInMonth.map((day) => day.toLocaleDateString()),
    datasets: [
      {
        label: "Số lượng công việc",
        data: jobCreationCounts,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Ẩn legend hoàn toàn
      },
    },
  };
  return <Line data={lineData} options={options} />;
};

const JobStatusManagerDoughnutChart = ({ data }) => {
  if (!data || !data.statusJobInMonth || !data.statusJobInMonth.jobsInMonth) {
    return null;
  }

  const jobs = data.statusJobInMonth.jobsInMonth;
  const jobStatusCounts = {
    PENDING: 0,
    PROCESSING: 0,
    DONE: 0,
  };

  jobs.forEach((job) => {
    // Duyệt qua từng userJob trong mỗi công việc
    job.userJobs.forEach((userJob) => {
      // Tăng đếm cho trạng thái tương ứng
      jobStatusCounts[userJob.status] += 1;
    });
  });

  const doughnutData = {
    labels: Object.keys(jobStatusCounts),
    datasets: [
      {
        label: "Trạng thái công việc",
        data: Object.values(jobStatusCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // PENDING
          "rgba(255, 205, 86, 0.6)", // PROCESSING
          "rgba(75, 192, 192, 0.6)", // DONE
        ],
      },
    ],
  };

  return <Doughnut data={doughnutData} />;
};

function Home() {
  const { allDashboard } = useSelector((state) => state.dashboardReducer);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAllDashboard());
  }, [dispatch]);

  return (
    <Layout>
      <div className="absolute top-0  bottom-0 right-0 left-0">
        {account.role.roleName === "ROLE_ADMIN" ||
        account.role.roleName === "ANONYMOUS" ? (
          <div className="loading pb-5 justify-center text-center ">
            <img src={loading} className="object-cover w-[30%] h-auto mx-auto" alt="loading" />
            <p className="text-xl">Hiện tại trang này đang được bảo trì và nâng cấp vui lòng quay lại sau</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5 mx-4">
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div
                    className="bg-white px-3 py-5 rounded-md"
                    style={{
                      boxShadow:
                        "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-5xl font-bold">
                        {allDashboard?.myJob || 0}
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <span>Công việc của tôi</span>
                    </div>
                  </div>
                  {account.role.roleName === "ROLE_MANAGER" && (
                    <div
                      className="bg-white px-3 py-5 rounded-md"
                      style={{
                        boxShadow:
                          "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="text-center">
                        <span className="text-5xl font-bold">
                          {allDashboard?.giveJob}
                        </span>
                      </div>
                      <div className="text-center mt-4">
                        <span>Công việc đã giao</span>
                      </div>
                    </div>
                  )}
                  <div
                    className="bg-white px-3 py-5 rounded-md"
                    style={{
                      boxShadow:
                        "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-5xl font-bold">
                        {allDashboard?.runningPlan}
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <span>Kế hoạch đang chạy</span>
                    </div>
                  </div>
                  <div
                    className="bg-white px-3 py-5 rounded-md"
                    style={{
                      boxShadow:
                        "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-5xl font-bold">
                        {allDashboard?.dataJobInMonth?.jobDone || 0}
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <span>Việc đã hoàn thành trong tháng</span>
                    </div>
                  </div>

                  <div
                    className="bg-white px-3 py-5 rounded-md"
                    style={{
                      boxShadow:
                        "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-5xl font-bold">
                        {allDashboard.checkedIn || 0}
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <span>Đã chấm công</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mx-4">
              {account.role.roleName === "ROLE_STAFF" && (
                <>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      height: "430px",
                      justifyContent: "center",
                    }}
                  >
                    <h2 className="text-center ">
                      Biểu đồ Trạng thái công việc
                    </h2>
                    <div
                      style={{
                        height: "350px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <JobStatusDoughnutChart data={allDashboard} />
                    </div>
                  </div>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                  >
                    <h2 className="text-center mb-4">
                      Biểu đồ Số lượng công việc hàng ngày
                    </h2>
                    <DailyJobCreationChart data={allDashboard} />
                  </div>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      height: "450px",
                    }}
                  >
                    <h2 className="text-center mb-4">Biểu đồ Kết quả KPI</h2>
                    <div
                      style={{
                        height: "350px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <KPIChart data={allDashboard} />
                    </div>
                  </div>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                  >
                    <h2 className="text-center mb-4">
                      Biểu đồ Kết quả công việc
                    </h2>
                    <JobEvaluateChart data={allDashboard} />
                  </div>
                </>
              )}
              {account.role.roleName === "ROLE_MANAGER" && (
                <>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      height: "430px",
                      justifyContent: "center",
                    }}
                  >
                    <h2 className="text-center ">
                      Biểu đồ Trạng thái công việc
                    </h2>
                    <div
                      style={{
                        height: "350px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <JobStatusManagerDoughnutChart data={allDashboard} />
                    </div>
                  </div>
                  <div
                    className="bg-white p-5 rounded-md"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      height: "430px",
                      justifyContent: "center",
                    }}
                  >
                    <h2 className="text-center ">
                      Biểu đồ công việc hằng ngày
                    </h2>
                    <div
                      style={{
                        height: "350px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <DailyJobManagerCreationChart data={allDashboard} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
