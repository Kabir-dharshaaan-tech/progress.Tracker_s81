





import { useState, useEffect } from "react";

const StudentTodaysWork = () => {
  const [formData, setFormData] = useState({
    purple: ["", "", "", "", ""],
    blue: ["", "", "", "", ""],
    brown: ["", "", "", "", ""],
  });
  const [selectedBelt, setSelectedBelt] = useState("purple");

  useEffect(() => {
    const fetchLatestQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/mentor/latest");
        if (!response.ok) throw new Error("Failed to fetch student work");

        const data = await response.json();
        setFormData({ purple: data.purple, blue: data.blue, brown: data.brown });
      } catch (error) {
        console.error("❌ Error fetching student work:", error);
      }
    };
    fetchLatestQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
          Student Today's Work
        </h2>
        
       
        <div className="mb-6 flex justify-center">
          <select
            className="p-3 text-lg border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            value={selectedBelt}
            onChange={(e) => setSelectedBelt(e.target.value)}
          >
            <option value="purple">Purple Belt</option>
            <option value="blue">Blue Belt</option>
            <option value="brown">Brown Belt</option>
          </select>
        </div>
        
    
        <div className="space-y-6">
          <h3 className={`text-2xl font-semibold text-center ${selectedBelt === "purple" ? "text-purple-600" : selectedBelt === "blue" ? "text-blue-600" : "text-yellow-700"}`}>
            {selectedBelt.charAt(0).toUpperCase() + selectedBelt.slice(1)} Belt
          </h3>
          {formData[selectedBelt].map((link, index) => (
            <div key={`${selectedBelt}-${index}`} className="flex gap-2 items-center justify-center mt-2">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-500 hover:underline hover:text-blue-700 transition"
                >
                  🔗 Open Question {index + 1}
                </a>
              ) : (
                <p className="text-gray-500 text-lg">No work assigned</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTodaysWork;
