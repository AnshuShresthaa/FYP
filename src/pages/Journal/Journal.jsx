import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import { Redirect } from "react-router-dom";
import MainLayout from '../../components/MainLayout';
import Search from "../../components/Search";
import { toast } from "react-hot-toast";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import dayjs from "dayjs";
import { generateDate, months } from "../../utils/Calendar";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  createPost,
  getUserJournalEntries,
  updateJournalEntry,
  deleteJournalEntry,
  getAllJournalEntries
} from "../../services/index/journal"; 

const Journal = () => {
  const [entry, setEntry] = useState({ title: '', content: '', tags: '' });
  const [wordCount, setWordCount] = useState(0);
  const [selectDate, setSelectDate] = useState(dayjs());
  const [journalEntries, setJournalEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]); // State for filtered entries
  
  const userState = useSelector((state) => state.user);
    useEffect(() => {
      const fetchEntries = async () => {
        try {
          const userEntries = await getUserJournalEntries({
            token: userState.userInfo.token,
            userId: userState.userInfo._id
          });
          console.log(userEntries);
          setJournalEntries(userEntries);
          console.log(journalEntries);
          setFilteredEntries(userEntries);
        } catch (error) {
          console.error("Error fetching journal entries:", error);
        }
      };
    
      if (userState && userState.userInfo && userState.userInfo.token) {
        fetchEntries();
      }
    }, [userState]);
  


  // Function to handle search keyword
  const handleSearchKeyword = ({ searchKeyword }) => {
    const filtered = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredEntries(filtered);
  };

  // Function to handle entry change
  const handleEntryChange = (field, value) => {
    setEntry({ ...entry, [field]: value });

    const words = value.trim().split(/\s+/);
    setWordCount(words.length);
  };

  // Function to add a new journal entry
  const handleAddEntry = async () => {
    try {
      
      const newEntry = {
        token: userState.userInfo.token,
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
        user: userState.userInfo._id // Pass the user information
      };
  
      const addedEntry = await createPost(newEntry);
  
      // Update the journalEntries state by adding the new entry
      setJournalEntries(prevEntries => [...prevEntries, addedEntry]);
  
      setEntry({ title: '', content: '', tags: '' });
      setWordCount(0);
      toast.success("Post added successfully");
    } catch (error) {
      toast.error("Error adding entry");
      console.error("Error adding entry:", error);
    }
  };


  // Function to handle editing an entry
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setEntry({ title: entry.title, content: entry.content, tags: entry.tags });
    // Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to handle deleting an entry
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete your Post?")) {
        await deleteJournalEntry({ token: userState.userInfo.token, id });
        // Remove the deleted entry from the UI
        setJournalEntries(prevEntries => prevEntries.filter(entry => entry._id !== id));
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting entry");
      console.error("Error deleting entry:", error);
    }
  };

  // Function to handle updating an entry
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

      toast.success("Post updated successfully");
    } catch (error) {
      toast.error("Error updating entry");
      console.error("Error updating entry:", error);
    }
  };

  // Component for the calendar
  const Calendar = ({ onDateClick }) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);

    return (
      <div className="flex gap-4 sm:divide-x justify-center sm:w-1/3 h-screen sm:flex-row flex-col mt-24">
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

  if (!userState || !userState.userInfo || !userState.userInfo.token) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">You are not logged in!</h2>
            <p>Please <a href="/login" className="text-blue-500">login</a> to access the journal feature.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex gap-4 items-start py-8 pr- pl-2 max-md:pr-2 max-md:flex-row">
        <Calendar onDateClick={setSelectDate} />
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          {/* Add the Search component */}
          <Search className="mb-8" onSearchKeyword={handleSearchKeyword} />
          {/* Form for adding new entry or editing existing entry */}
          <div className="border rounded-lg p-6 bg-gray-100">
            <div className="text-xl font-semibold mb-4">
              {selectDate.format("dddd, MMMM D, YYYY")}
            </div>
            <div className="mb-2"> 
              <input
                type="text"
                value={entry.title}
                onChange={(e) => handleEntryChange('title', e.target.value)}
                className="py-2 text-xl text-black bg-white placeholder-font-style mb-2 outline-none w-full border rounded-lg p-4" 
                placeholder="Add a title"
              />
            </div>
            <div className="mb-4"> 
              <textarea
                value={entry.content}
                onChange={(e) => handleEntryChange('content', e.target.value)}
                className="py-2 text-lg text-black bg-white placeholder-font-style resize-none outline-none w-full border rounded-lg p-4" 
                placeholder="Write something...."
                rows="6"
              />
            </div>
            <div>
              <input
                type="text"
                value={entry.tags}
                onChange={(e) => handleEntryChange('tags', e.target.value)}
                className="py-2 text-xl text-black bg-white mr-2 placeholder-font-style outline-none w-full border rounded-lg p-4" 
                placeholder="Tags"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-600">Word Count: {wordCount}/500</span>
              <div className="flex gap-4">
                {/* Add the Cancel button */}
                <button
                  className="px-4 py-2 text-xl text-white bg-gray-500 rounded-md outline-none mt-4"
                  aria-label="Cancel"
                  onClick={() => {
                    setEntry({ title: '', content: '', tags: '' });
                    setWordCount(0);
                    setEditingEntry(null);
                  }}
                >
                  Cancel
                </button>
                {/* Add the Save/Update button */}
                <button
                  className="px-4 py-2 text-xl text-white bg-green-600 rounded-md outline-none mt-4"
                  aria-label="Submit"
                  onClick={editingEntry ? handleUpdateEntry : handleAddEntry}
                >
                  {editingEntry ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          {/* Display existing journal entries */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4 text-center">Journal Entries</h2>
            {filteredEntries.map((entry) => (
              <div key={entry._id} className="border p-4 rounded-md mb-4 bg-gray-100">

                <p className="text-center text-lg mb-4 mt-2">
                  <strong>{dayjs(entry.date).format("MMMM D, YYYY")}</strong>
                </p>
                <p><strong>Title:</strong> {entry.title}</p>
                <p><strong>Content:</strong> {entry.content}</p>
                <p><strong>Tags:</strong> {entry.tags}</p>
                <div className="mt-2 flex justify-end">
                  <button
                    className="px-3 py-1 bg-primary text-white rounded-md mr-2"
                    onClick={() => handleEdit(entry)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(entry._id)}
                  >
                    <AiOutlineDelete />
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
