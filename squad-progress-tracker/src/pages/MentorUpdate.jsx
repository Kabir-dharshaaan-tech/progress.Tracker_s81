





import { useState, useEffect } from "react";

const MentorUpdate = () => {
  const [formData, setFormData] = useState({
    purple: ["", "", "", "", ""],
    blue: ["", "", "", "", ""],
    brown: ["", "", "", "", ""],
  });

  // ✅ Fetch Latest Questions on Load
  useEffect(() => {
    const fetchLatestQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/mentor/latest");
        if (!response.ok) throw new Error("Failed to fetch mentor questions");

        const data = await response.json();
        setFormData({ purple: data.purple, blue: data.blue, brown: data.brown });
      } catch (error) {
        console.error("❌ Error fetching mentor questions:", error);
      }
    };
    fetchLatestQuestions();
  }, []);

  const handleChange = (belt, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [belt]: prev[belt].map((item, i) => (i === index ? value : item)),
    }));
  };

  // ✅ Send Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/mentor/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Mentor Questions Updated Successfully!");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Error submitting mentor questions:", error);
      alert("❌ Server error while updating mentor questions.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Mentor Daily LeetCode Questions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["purple", "blue", "brown"].map((belt) => (
            <div key={belt}>
              <h3 className={`text-xl font-semibold ${belt === "purple" ? "text-purple-600" : belt === "blue" ? "text-blue-600" : "text-yellow-700"}`}>
                {belt.charAt(0).toUpperCase() + belt.slice(1)} Belt
              </h3>
              {formData[belt].map((link, index) => (
                <input
                  key={`${belt}-${index}`}
                  type="url"
                  placeholder={`LeetCode Question ${index + 1}`}
                  value={link}
                  onChange={(e) => handleChange(belt, index, e.target.value)}
                  className="w-full p-2 mt-2 border rounded-lg focus:ring-2 outline-none"
                  required
                />
              ))}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            ✅ Update Mentor Questions
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorUpdate; // ✅ Fix: Ensure the component is exported as default
