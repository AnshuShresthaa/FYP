import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "../../utils/Calendar";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import MainLayout from '../../components/MainLayout';
import { createPost, getAllJournalEntries, updateJournalEntry, deleteJournalEntry } from "../../services/index/journal"; 
import { useSelector } from "react-redux"; 
import Search from "../../components/Search";

const Journal = () => {
  const [entry, setEntry] = useState({ title: '', content: '', tags: '' });
  const [wordCount, setWordCount] = useState(0);
  const [selectDate, setSelectDate] = useState(dayjs());
  const [journalEntries, setJournalEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]); // State for filtered entries
  
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const data = await getAllJournalEntries(userState.userInfo.token);
        setJournalEntries(data);
        setFilteredEntries(data); // Initialize filtered entries with all journal entries
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, [userState.userInfo.token]);

  // Function to handle search keyword
  const handleSearchKeyword = ({ searchKeyword }) => {
    const filtered = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredEntries(filtered);
  };

  const handleEntryChange = (field, value) => {
    setEntry({ ...entry, [field]: value });

    const words = value.trim().split(/\s+/);
    setWordCount(words.length);
  };

  const handleAddEntry = async () => {
    try {
      await createPost({
        token: userState.userInfo.token,
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
      });

      console.log("Entry added:", entry);
      setEntry({ title: '', content: '', tags: '' });
      setWordCount(0);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setEntry({ title: entry.title, content: entry.content, tags: entry.tags });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete your Post?")) {
        await deleteJournalEntry({ token: userState.userInfo.token, id });
        // Remove the deleted entry from the UI
        setJournalEntries(prevEntries => prevEntries.filter(entry => entry._id !== id));
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleUpdateEntry = async () => {
    try {
      const updatedEntry = await updateJournalEntry({
        token: userState.userInfo.token,
        id: editingEntry._id,
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
      });

      // Update the entry in the UI
      setJournalEntries(prevEntries =>
        prevEntries.map(prevEntry =>
          prevEntry._id === updatedEntry._id ? updatedEntry : prevEntry
        )
      );

      // Reset the editing state and form fields
      setEditingEntry(null);
      setEntry({ title: '', content: '', tags: '' });
      setWordCount(0);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const Calendar = ({ onDateClick }) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);

    return (
      <div className="flex gap-4 sm:divide-x justify-center sm:w-1/3 h-screen items-center sm:flex-row flex-col">
        <div className="w-96 h-96">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-4 items-center">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => setToday(today.subtract(1, 'month'))}
              />
              <h1
                className="cursor-pointer hover:scale-105 transition-all"
                onClick={() => setToday(currentDate)}
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => setToday(today.add(1, 'month'))}
              />
            </div>
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
              <div
                key={index}
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  onClick={() => onDateClick(date)}
                >
                  {date.date()}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex gap-4 items-start py-8 pr- pl-2 max-md:pr-2 max-md:flex-row">
        <Calendar onDateClick={setSelectDate} />
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          {/* Add the Search component */}
          <Search className="mb-4" onSearchKeyword={handleSearchKeyword} />
          {/* Form for adding new entry or editing existing entry */}
          <div className="border rounded-lg p-6">
            <div className="text-xl font-semibold mb-4">
              {selectDate.format("dddd, MMMM D, YYYY")}
            </div>
            <input
              type="text"
              value={entry.title}
              onChange={(e) => handleEntryChange('title', e.target.value)}
              className="px-4 py-2 text-xl text-black bg-white placeholder-font-style mb-4 outline-none"
              placeholder="Title"
            />
            <textarea
              value={entry.content}
              onChange={(e) => handleEntryChange('content', e.target.value)}
              className="px-4 py-2 text-lg text-black bg-white rounded-2xl placeholder-font-style resize-none mb-4 outline-none"
              placeholder="Write something...."
              rows="6"
            />
            <div>
              <input
                type="text"
                value={entry.tags}
                onChange={(e) => handleEntryChange('tags', e.target.value)}
                className="px-4 py-2 text-xl text-black bg-white mr-2 placeholder-font-style outline-none"
                placeholder="Tags"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-600">Word Count: {wordCount}/500</span>
              <button
                className="px-4 py-2 text-2xl text-white bg-green-600 rounded-md outline-none"
                aria-label="Submit"
                onClick={editingEntry ? handleUpdateEntry : handleAddEntry}
              >
                {editingEntry ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
          {/* Display existing journal entries */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">All Journal Entries</h2>
            {filteredEntries.map((entry) => (
              <div key={entry._id} className="border p-4 rounded-md mb-4">
                <p><strong>Title:</strong> {entry.title}</p>
                <p><strong>Content:</strong> {entry.content}</p>
                <p><strong>Tags:</strong> {entry.tags}</p>
                <p><strong>Date:</strong> {dayjs(entry.date).format("MMMM D, YYYY")} </p>
                <div className="mt-2 flex justify-end">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Journal;