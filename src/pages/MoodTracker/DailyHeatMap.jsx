import React, { useEffect, useState } from 'react';

// Placeholder for getColor function
const getColor = (mood) => {
    const colorMap = {
      0: '#f0f0f0', // gray: low energy
      1: '#d2fcdf', // green: energetic
      2: '#d4bcbc', // red: normal
      3: '#ffbae5', // pink: love
      4: '#d4ddfa', // blue: sad
      5: '#fcfbc2', // yellow: happy
    };
    return colorMap[mood];
  };
  
  // Placeholder for colorMapMood array
  const colorMapMood = ['Low Energy', 'Energetic', 'Normal', 'Love', 'Sad', 'Happy'];
  
  // Placeholder for selectMood function
  const selectMood = (rowIndex, colIndex, moodIndex) => {
    // You can implement your logic for selecting mood here
  };
  
  // Placeholder for colorMap object
  const colorMap = {
    0: '#f0f0f0', // gray: low energy
    1: '#d2fcdf', // green: energetic
    2: '#d4bcbc', // red: normal
    3: '#ffbae5', // pink: love
    4: '#d4ddfa', // blue: sad
    5: '#fcfbc2', // yellow: happy
  };
  

const DailyHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [colIndexToShowMonth, setColIndexToShowMonth] = useState([]);

  useEffect(() => {
    loadHeatmapData();
    console.log(heatmapData);
    console.log(colIndexToShowMonth);

    window.addEventListener('beforeunload', saveHeatmapData);

    return () => {
      window.removeEventListener('beforeunload', saveHeatmapData);
    };
  }, []);

  const generateHeatmapData = (year) => {
    let currentDay = 1;
    let currentMonth = 1;
    let currentYear = year;
    let dayInFebruary = 28;
    let ShowedMonth = 0;
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      dayInFebruary = 29; // Leap year
    }
    let numberOfDaysInEachMonth = [31, dayInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let firstDay = new Date(year, 0, 1);
    let firstDayInWeek = firstDay.getDay();

    if (firstDayInWeek > 0) {
      currentYear = year - 1;
      currentMonth = 12;
      currentDay = 31 - firstDayInWeek + 1;
    }

    const newHeatmapData = [];
    for (let i = 0; i < 53; i++) {
      const row = [];
      console.log(currentMonth + ' ' + ShowedMonth);
      if (currentMonth !== ShowedMonth) {
        ShowedMonth = currentMonth;
        if (currentMonth > 0 && currentMonth < 13 && currentYear === year) {
          setColIndexToShowMonth((prevColIndexToShowMonth) => [...prevColIndexToShowMonth, i]);
        }
      }
      for (let j = 0; j < 7; j++) {
        // random mood from 0 to 5
        let mood = Math.floor(Math.random() * 6);

        let temp = { mood: 0, year: currentYear, month: currentMonth, day: currentDay, show: true };

        if (currentYear !== year) {
          temp.show = false;
        }

        row.push(temp);

        currentDay++;
        if (currentDay > numberOfDaysInEachMonth[currentMonth - 1]) {
          currentDay = 1;
          currentMonth++;
        }
        if (currentMonth === 13) {
          currentMonth = 1;
          currentYear++;
        }
      }
      newHeatmapData.push(row);
    }

    function transposeArray(array) {
      const rows = array.length;
      const cols = array[0].length;

      const transposedArray = [];
      for (let col = 0; col < cols; col++) {
        const newRow = [];
        for (let row = 0; row < rows; row++) {
          newRow.push(array[row][col]);
        }
        transposedArray.push(newRow);
      }

      return transposedArray;
    }

    setHeatmapData(transposeArray(newHeatmapData));

    saveHeatmapData();
  };

  const saveHeatmapData = () => {
    localStorage.setItem('heatmapData', JSON.stringify(heatmapData));
    localStorage.setItem('colIndexToShowMonth', JSON.stringify(colIndexToShowMonth));
  };

  const loadHeatmapData = () => {
    const storedHeatmapData = localStorage.getItem('heatmapData');
    const storedColIndexToShowMonth = localStorage.getItem('colIndexToShowMonth');

    if (storedHeatmapData && storedColIndexToShowMonth) {
      setHeatmapData(JSON.parse(storedHeatmapData));
      setColIndexToShowMonth(JSON.parse(storedColIndexToShowMonth));
    } else {
      generateHeatmapData(2024);
    }
  };

  // Placeholder for getColor function
  const getColor = (mood) => {
    // Your implementation here
    // Example: return mood === 0 ? 'gray' : mood === 1 ? 'green' : 'white';
  };

  // Placeholder for colorMapMood array
  const colorMapMood = ['Low Energy', 'Energetic', 'Normal', 'Love', 'Sad', 'Happy'];

  // Placeholder for selectMood function
  const selectMood = (rowIndex, colIndex, moodIndex) => {
    // Your implementation here
  };

  // Placeholder for colorMap object
  const colorMap = {
    0: '#f0f0f0', // gray: low energy
    1: '#d2fcdf', // green: energetic
    2: '#d4bcbc', // red: normal
    3: '#ffbae5', // pink: love
    4: '#d4ddfa', // blue: sad
    5: '#fcfbc2', // yellow: happy
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1>
        <span className="text-green-400">Your </span>
        <span className="text-pink-400">Daily </span>
        <span className="text-blue-400">Mood </span>
      </h1>
      <Daily heatmapData={heatmapData} colIndexToShowMonth={colIndexToShowMonth} />
    </div>
  );
};

const Daily = ({ heatmapData, colIndexToShowMonth }) => {
  return (
    <div className="heatmap">
      {heatmapData.map((row, rowIndex) => (
        <div key={rowIndex} className="heatmap-row">
          {row.map((value, colIndex) => (
            <div key={colIndex}>
              <div className="cell">
                {rowIndex === 0 && (
                  <div className="heatmap-text" style={{ display: colIndexToShowMonth.includes(colIndex) ? 'block' : 'none' }}>
                    {value.month}
                  </div>
                )}
              </div>
              <div className="flex-row">
                {colIndex === 0 && (
                  <div style={{ width: '40px' }}>
                    {rowIndex % 2 === 1 && (
                      <div className="heatmap-text">{value.colIndexMapWeekDay[rowIndex]}</div>
                    )}
                  </div>
                )}
                <div className="el-popover" style={{ position: 'relative', display: 'inline-block' }}>
                  <div
                    style={{ backgroundColor: value.show ? getColor(value.mood) : 'white' }}
                    className={`cell heatmap-cell cell-hover ${value.show ? 'heatmap-cell-hover' : ''}`}
                  ></div>
                  <div style={{ fontSize: '18px' }} className="flex-horizontal-center">
                    {new Date(value.year, value.month - 1, value.day).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex-row flex-horizontal-center">
                    {colorMapMood.map((moodRow, moodRowIndex) => (
                      <div
                        key={moodRowIndex}
                        style={{ paddingRight: '10px' }}
                        className="flex-vertical-center mood-cell cell-hover"
                        onClick={() => selectMood(rowIndex, colIndex, moodRowIndex)}
                      >
                        <div style={{ backgroundColor: colorMap[moodRowIndex], marginRight: '5px'  }} className="cell"></div>
                        {moodRow}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DailyHeatmap; 