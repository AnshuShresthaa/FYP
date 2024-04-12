import React, { useState } from "react";
import { generateDate } from "../../utils/Calendar";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { createMoodEntry } from "../../services/index/mood"; 
import { useSelector } from "react-redux"; 
import toast from "react-hot-toast";

const CalendarPopup = ({ selectedDate, onClose, onDateSelect, moodIcons }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const userState = useSelector((state) => state.user);

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const calendarDates = generateDate(currentDate.month(), currentDate.year());
  
  const handleDateClick = (date, event) => {
    event.stopPropagation(); // Prevent event propagation
    onDateSelect(date);
    onClose(); // Close the calendar popup
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleAddMood = async () => {
    try {
      // Check if a mood is selected
      if (!selectedMood) {
        alert("Please select a mood.");
        return;
      }
  
      // Call API to create mood entry
      await createMoodEntry({ token: userState.userInfo.token, mood: selectedMood.icon, note: note });
  
      // Reset state
      setSelectedMood(null);
      setNote("");
  
      // Close the calendar popup
      onClose();
      toast.success("Mood added successfully!");
    } catch (error) {
      console.error("Error adding mood entry:", error);
      alert("Error adding mood entry. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md max-w-[750px] max-h-[500px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-start pt-5 pb-8 text-base font-medium text-black">
          <div className="mb-4 font-bold">Add Mood</div>    
          <div className="ml-4 mb-2 flex justify-between w-full">
            <GrFormPrevious className="cursor-pointer" onClick={handlePreviousMonth} />
            <div>{currentDate.format("MMMM, YYYY")}</div>
            <GrFormNext className="cursor-pointer" onClick={handleNextMonth} />
          </div>
          <div className="grid grid-cols-7 mt-2 gap-12">
            {calendarDates.map((dateInfo, index) => (
              <div
                key={index}
                className={`text-center ${
                  dateInfo.currentMonth ? "text-black" : "text-gray-400"
                } ${dateInfo.today ? "text-red-600 font-bold" : ""} ${
                  selectedDate.isSame(dateInfo.date, 'day') ? "bg-black text-white" : ""
                }`}
                onClick={(event) => handleDateClick(dateInfo.date, event)}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              >
                <span className={dateInfo.today ? "inline-block w-8 h-8 bg-red-600 text-white rounded-full grid place-content-center" : ""}>
                  {dateInfo.date.date()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 font-bold">How do you feel today?</div>
          <div className="flex items-center mt-2">
            {moodIcons.map((mood, index) => (
              <div
                key={index}
                className={`flex flex-col items-center mt-2 cursor-pointer ${selectedMood === mood ? "font-bold scale-125" : ""}`}
                onClick={() => handleMoodClick(mood)}
                style={{ marginRight: index < moodIcons.length - 1 ? "3rem" : "0" }}
              >
                <span className="text-2xl mb-1">{mood.icon}</span>
                <span>{mood.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">Add Note:</div>
          <textarea
            className="mt-2 h-20 w-full border border-gray-300 rounded-md p-2"
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <button className="py-2 px-4 bg-sky-500 text-white rounded-md cursor-pointer" onClick={handleAddMood}>
              Add Mood
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-5 text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarPopup;