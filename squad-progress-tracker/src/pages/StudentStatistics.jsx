




// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const StudentStatistics = () => {
//   const [students, setStudents] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/progress/all");
//         if (!response.data || !Array.isArray(response.data)) throw new Error("Invalid progress data");

//         console.log("📊 Fetched Student Progress Data:", response.data);
//         setStudents(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching student progress:", error);
//       }
//     };
//     fetchProgressData();
//   }, []);

//   if (!students.length) return <p className="text-center text-gray-600">Loading student progress...</p>;

//   const student = students[currentIndex];

//   // ✅ Ensure there is progress data
//   const progressData = [{ day: parseInt(student.date.split("/")[0], 10), questionsSolved: student.solved }];

//   // ✅ Fill missing days with default 0 values for 30 days
//   const progressMap = {};
//   progressData.forEach(({ day, questionsSolved }) => {
//     progressMap[day] = questionsSolved;
//   });

//   let filledProgressData = Array.from({ length: 30 }, (_, i) => ({
//     day: i + 1,
//     questionsSolved: progressMap[i + 1] || 0, // Default to 0 if no data
//   }));

//   // ✅ Calculate total solved questions
//   let totalSolved = filledProgressData.reduce((sum, entry) => sum + entry.questionsSolved, 0);

//   // ✅ Reset progress when total reaches 50
//   if (totalSolved >= 50) {
//     totalSolved = 0;
//     filledProgressData = Array.from({ length: 30 }, (_, i) => ({
//       day: i + 1,
//       questionsSolved: 0,
//     }));
//   }

//   const chartData = {
//     labels: filledProgressData.map((entry) => `Day ${entry.day}`),
//     datasets: [
//       {
//         label: "Questions Solved",
//         data: filledProgressData.map((entry) => entry.questionsSolved),
//         borderColor: "#3B82F6",
//         backgroundColor: "rgba(59, 130, 246, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { display: true } },
//     scales: {
//       x: { title: { display: true, text: "Days" } },
//       y: {
//         beginAtZero: true,
//         max: 5, // ✅ Updated max value to 5 since each day has 5 questions
//         title: { display: true, text: "Questions Solved" },
//         ticks: {
//           stepSize: 1, // ✅ Ensures Y-axis shows whole numbers up to 5
//         },
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
//         <h1 className="text-2xl font-bold text-blue-600">📊 {student.name}'s Progress</h1>
//         <p className="text-gray-700">Belt Level: {student.belt}</p>
//         <div className="w-full h-80">
//           <Line data={chartData} options={chartOptions} />
//         </div>
//         <p className="text-lg font-semibold text-blue-700 mt-4">
//           Total Progress: {totalSolved} / 50 Questions Solved
//         </p>
//         <div className="mt-4 flex justify-center gap-4">
//           <button
//             onClick={() => setCurrentIndex((prev) => (prev === 0 ? students.length - 1 : prev - 1))}
//             className="bg-gray-600 text-white px-4 py-2 rounded-md"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentIndex((prev) => (prev === students.length - 1 ? 0 : prev + 1))}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentStatistics;




import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentStatistics = () => {
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/progress/all");
        if (!response.data || !Array.isArray(response.data)) throw new Error("Invalid progress data");

        console.log("📊 Fetched Student Progress Data:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("❌ Error fetching student progress:", error);
      }
    };
    fetchProgressData();
  }, []);

  if (!students.length) return <p className="text-center text-gray-600">Loading student progress...</p>;

  const student = students[currentIndex];

  // ✅ Ensure there is progress data
  const progressData = [{ day: parseInt(student.date.split("/")[0], 10), questionsSolved: student.solved }];

  // ✅ Fill missing days with default 0 values for 30 days
  const progressMap = {};
  progressData.forEach(({ day, questionsSolved }) => {
    progressMap[day] = questionsSolved;
  });

  let filledProgressData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    questionsSolved: progressMap[i + 1] || 0, // Default to 0 if no data
  }));

  // ✅ Calculate total solved questions
  let totalSolved = filledProgressData.reduce((sum, entry) => sum + entry.questionsSolved, 0);

  // ✅ Get last recorded day
  const lastRecordedDay = Math.max(...filledProgressData.map((entry) => entry.day), 1);

  // ✅ Reset progress when total reaches 50 or when the last recorded day exceeds 30
  if (lastRecordedDay > 30 || totalSolved >= 50) {
    totalSolved = 0;
    filledProgressData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      questionsSolved: 0,
    }));
  }

  const chartData = {
    labels: filledProgressData.map((entry) => `Day ${entry.day}`),
    datasets: [
      {
        label: "Questions Solved",
        data: filledProgressData.map((entry) => entry.questionsSolved),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: {
      x: { title: { display: true, text: "Days" } },
      y: {
        beginAtZero: true,
        max: 5, // ✅ Updated max value to 5 since each day has 5 questions
        title: { display: true, text: "Questions Solved" },
        ticks: {
          stepSize: 1, // ✅ Ensures Y-axis shows whole numbers up to 5
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600">📊 {student.name}'s Progress</h1>
        <p className="text-gray-700">Belt Level: {student.belt}</p>
        <div className="w-full h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="text-lg font-semibold text-blue-700 mt-4">
          Total Progress: {totalSolved} / 50 Questions Solved
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? students.length - 1 : prev - 1))}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === students.length - 1 ? 0 : prev + 1))}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentStatistics;
