import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import MainLayout from "../../components/MainLayout";
import CalendarPopup from "./CalendarPopup";
import { getAllMoodEntries, deleteMoodEntry, updateMoodEntry } from "../../services/index/mood";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const MoodTracker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const loggedInUserName = userState.userInfo ? userState.userInfo.name : "";
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loading, setLoading] = useState(true);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [moodEntries, setMoodEntries] = useState([]);
  const [mood, setMood] = useState(""); 
  const [editingMoodEntry, setEditingMoodEntry] = useState(null);
  const [note, setNote] = useState(""); 
  const popupRef = useRef(null);

  const moodIcons = [
    {
      icon: "🙁",
      text: "Rough day",
      color: "bg-red-200",
    },
    {
      icon: "😐",
      text: "Not good",
      color: "bg-yellow-200",
    },
    {
      icon: "🙂",
      text: "Not bad",
      color: "bg-green-200",
    },
    {
      icon: "😄",
      text: "Good",
      color: "bg-blue-200",
    },
    {
      icon: "🤗",
      text: "Great!",
      color: "bg-purple-200",
    },
  ];

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        if (userState && userState.userInfo && userState.userInfo.token) {
          const data = await getAllMoodEntries(); 
          setMoodEntries(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching mood entries:", error);
      }
    };

    fetchMoodEntries();
  }, [userState]);

  useEffect(() => {
    // Clear mood entries when user logs out
    if (!userState.userInfo) {
      setMoodEntries([]);
    }
  }, [userState]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowCalendarPopup(false);
    }
  };

  

  const toggleCalendarPopup = () => {
    setShowCalendarPopup((prev) => !prev);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendarPopup(false);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleEditMoodEntry = (entry) => {
    // Set the editing mood entry and populate the form fields
    setEditingMoodEntry(entry);
    setMood(entry.mood);
    setNote(entry.note);
  };
  
  const handleUpdateMoodEntry = async () => {
    try {
      const updatedEntry = await updateMoodEntry({
        token: userState.userInfo.token,
        id: editingMoodEntry._id, // Pass the mood entry ID
        mood: mood,
        note: note,
      });

      // Update the mood entry in the UI
      setMoodEntries((prevEntries) =>
        prevEntries.map((prevEntry) =>
          prevEntry._id === updatedEntry._id ? updatedEntry : prevEntry
        )
      );

      // Reset the editing state and form fields
      setEditingMoodEntry(null);
      setMood("");
      setNote("");
    } catch (error) {
      console.error("Error updating mood entry:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // Call the update mood entry API
      const updatedEntry = await updateMoodEntry({
        token: userState.userInfo.token,
        id: editingMoodEntry._id,
        mood: editingMoodEntry.mood,
        note: note, // Use the updated note
      });
  
      // Update the mood entry in the moodEntries state array
      setMoodEntries(prevEntries =>
        prevEntries.map(entry =>
          entry._id === updatedEntry._id ? updatedEntry : entry
        )
      );
  
      // Reset state
      setEditingMoodEntry(null);
      setNote("");
      toast.success("Mood entry updated successfully");
    } catch (error) {
      console.error("Error updating mood entry:", error);
      toast.error("Failed to update mood entry");
    }
  };

  const handleDeleteMoodEntry = async (id) => {
    try {
      if (window.confirm("Do you want to delete your mood?")) {
        await deleteMoodEntry({ token: userState.userInfo.token, id });
        // Remove the deleted entry from the UI
        setMoodEntries(prevEntries => prevEntries.filter(entry => entry._id !== id));
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting entry");
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-200 min-h-screen">
        <div className="flex justify-center items-center px-16 py-20 text-2xl font-medium max-md:px-5">
          <div className="bg-white p-6 w-[800px] max-md:mt-10 flex flex-col items-center">
            <div className="text-3xl font-semibold">
              Hey, <span className="text-sky-500">{loggedInUserName} 👋</span>
            </div>
            <div className="mt-8 text-xl max-md:mt-6 mb-10 text-center">How was your day?</div>
            <div>
              <div
                className="px-8 py-4 text-white bg-sky-500 rounded-md max-md:pr-6 max-md:pl-5 max-md:mt-6 cursor-pointer text-sm w-38"
                onClick={toggleCalendarPopup}
              >
                Add Mood
              </div>
            </div>
          </div>
          
          {/* Mood calendar*/}
          <div className="bg-white p-6 ml-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Mood Calendar</h2>
            <div className="flex justify-between mb-4">
              <GrFormPrevious className="cursor-pointer" onClick={handlePreviousMonth} />
              <div>
                <h2 className="text-l font-semibold mb-2 text-center text-sm">
                  {currentMonth.format("MMMM, YYYY")}
                </h2>
              </div>
              <GrFormNext className="cursor-pointer" onClick={handleNextMonth} />
            </div>
            {loading ? (
              <p>Loading mood entries...</p>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: currentMonth.daysInMonth() }).map((_, index) => {
                  const currentDate = currentMonth.date(index + 1);
                  const moodEntry = moodEntries.find((entry) =>
                    dayjs(entry.date).isSame(currentDate, "day")
                  );
                  const moodIcon = moodEntry ? moodEntry.mood : "";
                  const note = moodEntry ? moodEntry.note : "";
                  return (
                    <div
                      key={index}
                      className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                        moodIcon === "🙁"
                          ? "bg-red-200"
                          : moodIcon === "😐"
                          ? "bg-yellow-200"
                          : moodIcon === "🙂"
                          ? "bg-green-200"
                          : moodIcon === "😄"
                          ? "bg-blue-200"
                          : moodIcon === "🤗"
                          ? "bg-purple-200"
                          : "bg-gray-200"
                      }`}
                      onMouseEnter={() => setHoveredDate(currentDate)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <span className="text-sm">{moodIcon ? moodIcon : currentDate.date()}</span>
                      {hoveredDate && dayjs(hoveredDate).isSame(currentDate, "day") && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-2 bg-white border rounded-md shadow-md z-10 w-48">
                          <div className="text-sm">{dayjs(hoveredDate).format("MMMM DD, YYYY")}</div>
                          <div className="text-sm">{moodIcon}</div>
                          <div className="text-sm">{note}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6"></div>
        {/* Mood entry list */}
        <div className="flex justify-center flex-wrap">
          {moodEntries.map((entry, index) => (
            <div key={index} className="p-4 m-2 bg-white flex flex-col items-center mb-12">
              <div className={`w-full h-32 flex items-center justify-center mb-2 ${moodIcons.find((icon) => icon.icon === entry.mood).color}`}>
                <span className="text-3xl">{entry.mood}</span>
              </div>
              <div className="bg-white rounded-md p-2 mt-2">
                <div className="mb-2">{moodIcons.find((icon) => icon.icon === entry.mood).text}</div>
                <div className="mb-2">{entry.note}</div>
                <div>{dayjs(entry.date).format("MMMM DD, YYYY")}</div>
                <div className="flex mt-6">
                  <span className="text-blue-500 hover:underline cursor-pointer mr-4" onClick={() => handleEditMoodEntry(entry)}>Edit</span>
                  <span className="text-red-500 hover:underline cursor-pointer" onClick={() => handleDeleteMoodEntry(entry._id)}>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Edit mood entry popup */}
        {editingMoodEntry && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md max-w-[750px] max-h-[500px] overflow-y-auto relative" ref={popupRef}>
                <button className="absolute top-2 right-5 text-gray-500 hover:text-gray-700" onClick={() => setEditingMoodEntry(null)}>
                  X
                </button>

                <div className="flex flex-col items-start pt-5 pb-8 text-base font-medium text-black">
                  <div className="mb-4 font-bold">Edit Mood</div>
                  <div className="mt-8 font-bold">How do you feel today?</div>
                  <div className="flex items-center mt-2">
                    {moodIcons.map((mood, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center mt-2 cursor-pointer ${editingMoodEntry.mood === mood.icon ? "font-bold scale-125" : ""}`}
                        onClick={() => setEditingMoodEntry({ ...editingMoodEntry, mood: mood.icon })}
                        style={{ marginRight: index < moodIcons.length - 1 ? "3rem" : "0" }}
                      >
                        <span className="text-2xl mb-1">{mood.icon}</span>
                        <span>{mood.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">Edit Note:</div>
                  <textarea
                    className="mt-2 h-20 w-full border border-gray-300 rounded-md p-2"
                    placeholder="Edit your note here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-center mt-4">
                    <button className="py-2 px-4 bg-sky-500 text-white rounded-md cursor-pointer" onClick={handleSaveEdit}>
                      Save
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )}


        {/* Calendar popup */}
        {showCalendarPopup && (
          <CalendarPopup
            selectedDate={selectedDate}
            onClose={toggleCalendarPopup}
            onDateSelect={handleDateSelect}
            moodIcons={moodIcons}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MoodTracker;
