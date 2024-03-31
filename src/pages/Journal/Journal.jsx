import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../../utils/Calendar";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import MainLayout from '../../components/MainLayout';

const Journal = () => {
  const [entry, setEntry] = useState({ title: '', content: '', tags: '' });
  const [wordCount, setWordCount] = useState(0);
  const [selectDate, setSelectDate] = useState(dayjs());

  const handleEntryChange = (field, value) => {
    setEntry({ ...entry, [field]: value });

    // Calculate word count
    const words = value.trim().split(/\s+/);
    setWordCount(words.length);
  };

  const handleAddEntry = () => {
    console.log("Entry added:", entry);
    setEntry({ title: '', content: '', tags: '' });
    setWordCount(0);
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
          <input
            type="text"
            value={entry.title}
            onChange={(e) => handleEntryChange('title', e.target.value)}
            className="px-4 py-2 mt-2 text-xl text-black bg-white rounded-2xl border border-black border-solid tracking-[2.4px] w-[342px] max-md:px-2 max-md:mt-4 max-md:w-[342px] placeholder-font-style"
            placeholder="Title"
          />
          <textarea
            value={entry.content}
            onChange={(e) => handleEntryChange('content', e.target.value)}
            className="px-4 py-2 mt-4 text-lg text-black bg-white rounded-2xl border border-black border-solid tracking-[2.4px] w-[342px] max-md:px-2 max-md:mt-2 max-md:w-[342px] placeholder-font-style resize-none"
            placeholder="Write something...."
            rows="6"
          />
          <div className="flex gap-2 justify-between items-start mt-4 ml-2 max-w-full text-3xl font-bold text-black w-[390px] max-md:flex-wrap max-md:mt-4 max-md:text-2xl">
            <div className="flex-auto self-end mt-2 max-md:text-2xl">
              {selectDate.format("MMMM YYYY")}
            </div>
          </div>
          <div className="flex flex-col grow pt-6 w-full bg-white max-md:mt-4 max-md:max-w-full">
            <div className="flex flex-col self-start mt-4 ml-4 text-3xl text-zinc-500 max-md:mt-4 max-md:max-w-full max-md:text-2xl">
              <div className="text-2xl max-md:max-w-full">
                {selectDate.format("dddd, MMMM D, YYYY")}
              </div>
              <div className="mt-2 font-bold max-md:max-w-full max-md:text-2xl">
                Add tags
              </div>
              <input
                type="text"
                value={entry.tags}
                onChange={(e) => handleEntryChange('tags', e.target.value)}
                className="mt-2 px-4 py-2 max-md:py-1 text-2xl text-black bg-white rounded-md border border-black border-solid max-md:w-full"
                placeholder="Tags"
              />
            </div>
            <div className="justify-center items-end py-5 pr-8 pl-6 text-2xl text-black whitespace-nowrap bg-zinc-300 mt-[313px] max-md:pr-4 max-md:pl-2 max-md:mt-4 max-md:max-w-full">
              {wordCount}/500
            </div>
          </div>
          <button
            className="px-4 py-2 mt-4 text-2xl text-white bg-green-600 rounded-md max-md:mt-2"
            aria-label="Add"
            onClick={handleAddEntry}
          >
            Add
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Journal;
