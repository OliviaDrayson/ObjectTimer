const numTimers = 4;
  const timers = [];
  const pressCounts = Array(numTimers).fill(0);
  const pressTimestamps = Array(numTimers).fill().map(() => []);
  const pressDurations = Array(numTimers).fill().map(() => []);
  const intervals = [];
  const timerDisplays = [];
  const keyMap = { 'a': 0, 'k': 1, 'z': 2, 'm': 3 };
  const keyHints = ['a', 'k', 'z', 'm'];
  const timerNames = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'];
  const activeKeys = {};
  let countdownInterval = null;
  let countdownEndTime = null;
  let countdownRunning = false;
  let countdownStartTime = null;
	
  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const millis = (ms % 1000).toString().padStart(3, '0');
    return `${minutes}:${seconds}:${millis}`;
  }

  function createTimerElement(index) {
    const block = document.createElement('div');
    block.className = 'timer-block';
    block.innerHTML = `
      <div class="timer-label">${timerNames[index]} (key '${keyHints[index]}'):</div>
      <input type="text" id="description-${index}" placeholder="Description (optional)" style="margin-top:5px; margin-bottom:10px; width:90%;">
      <span class="time-display" id="display-${index}">00:00:000</span>
      <button onclick="toggleTimer(${index})" id="startstop-${index}">Start</button>
      <button onclick="resetTimer(${index})" id="reset-${index}">Reset</button>
    `;
    document.getElementById('grid-container').appendChild(block);
  }

  function updateTimer(index) {
    const elapsed = Date.now() - timers[index].start + timers[index].accumulated;
    timerDisplays[index].textContent = formatTime(elapsed);
  }

  function startTimer(index) {
    if (!countdownRunning || timers[index].running) return;
    timers[index].start = Date.now();
    intervals[index] = setInterval(() => updateTimer(index), 10);
    timers[index].running = true;
    document.getElementById(`startstop-${index}`).textContent = 'Stop';
  }

function stopTimer(index) {
  if (!timers[index].running || timers[index].start == null) return;

  const now = Date.now();
  clearInterval(intervals[index]);

  const duration = now - timers[index].start;

  if (!isNaN(duration) && duration >= 0 && countdownStartTime !== null) {
    timers[index].accumulated += duration;

    const relativeTimestamp = now - countdownStartTime;
    pressTimestamps[index].push(relativeTimestamp);
    pressDurations[index].push(duration);
  }

  timers[index].running = false;
  timers[index].start = null;

  document.getElementById(`startstop-${index}`).textContent = 'Start';
}


  function toggleTimer(index) {
    if (!countdownRunning) return;

    pressCounts[index]++;                        // Increment counter

    if (timers[index].running) {
      stopTimer(index);
    } else {
      startTimer(index);
    }

  }

  function resetTimer(index) {
    stopTimer(index);
    timers[index].accumulated = 0;
    timerDisplays[index].textContent = '00:00:000';
 }

  function disableAllTimers() {
    for (let i = 0; i < numTimers; i++) {
      stopTimer(i);
      document.getElementById(`startstop-${i}`).classList.add('disabled');
      document.getElementById(`reset-${i}`).classList.add('disabled');
    }
  }

  function enableAllTimers() {
    for (let i = 0; i < numTimers; i++) {
      document.getElementById(`startstop-${i}`).classList.remove('disabled');
      document.getElementById(`reset-${i}`).classList.remove('disabled');
    }
  }

  function parseCountdownInput() {
    const input = document.getElementById('countdown-input').value;
    const parts = input.split(':');
    if (parts.length !== 2) return 0;
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return (minutes * 60 + seconds) * 1000;
  }

function updateCountdownDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  document.getElementById('countdown-display').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startCountdown() {
  const duration = parseCountdownInput();
  if (duration <= 0) return alert('Enter a valid countdown.');

  countdownStartTime = Date.now();
  countdownEndTime = countdownStartTime + duration;
  countdownRunning = true;

  document.getElementById('pause-resume-btn').disabled = false;

  updateCountdownDisplay(duration);
  enableAllTimers();

  countdownInterval = setInterval(() => {
    const timeLeft = countdownEndTime - Date.now();
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateCountdownDisplay(0);
      countdownRunning = false;
      disableAllTimers();

      document.getElementById('start-btn').disabled = false;
      document.getElementById('start-btn').classList.remove('disabled');
    } else {
      updateCountdownDisplay(timeLeft);
    }
  }, 200);
}

function recordPress() {
  if (!countdownStartTime) return;
  
  if (!pressStartTime) {
    pressStartTime = Date.now(); // Start press timer
  } else {
    // Calculate duration in milliseconds
    const duration = Date.now() - pressStartTime;
    const timestamp = Date.now() - countdownStartTime;
    
    // Generate row data with correct timestamps
    const row = {
      trial: trialCounter,
      timer: "Top Right", // Or get from UI
      timestamp: isNaN(timestamp) ? null : timestamp,
      duration: isNaN(duration) ? null : duration
    };
    
    // Add to results and reset
    results.push(row);
    trialCounter++;
    pressStartTime = null; // Reset press start time
    updateDisplay();
  }
}

  function pauseOrResumeCountdown() {
    const btn = document.getElementById('pause-resume-btn');
    if (countdownRunning) {
      clearInterval(countdownInterval);
      countdownRunning = false;
      countdownEndTime -= Date.now(); // store remaining time as offset
      btn.textContent = 'Resume';
    } else {
      countdownEndTime = Date.now() + countdownEndTime; // apply offset
      countdownRunning = true;
      btn.textContent = 'Pause';

      countdownInterval = setInterval(() => {
        const timeLeft = countdownEndTime - Date.now();
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          updateCountdownDisplay(0);
          countdownRunning = false;
          disableAllTimers();
          btn.disabled = true;
        } else {
          updateCountdownDisplay(timeLeft);
        }
      }, 200);
    }
  }

function resetCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  countdownRunning = false;
  countdownEndTime = null;
  document.getElementById('countdown-display').textContent = '';

  // Re-enable Start Countdown button
  const startBtn = document.getElementById('start-btn');
  startBtn.disabled = false;
  startBtn.classList.remove('disabled');

  // Also reset Pause button
  const pauseBtn = document.getElementById('pause-resume-btn');
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';

  disableAllTimers();
}


  function resetAllTimers() {
    for (let i = 0; i < numTimers; i++) {
      resetTimer(i);
      timers[i].timestamps = [];
    }
    resetCountdown();
    countdownStartTime = null;
  }

function exportToExcel() {
  const projectName = document.getElementById('filename-input').value.trim() || 'Project';
  const experimentType = document.getElementById('experiment-type').value || 'UnknownExp';
  const roundValue = document.getElementById('round-input').value.trim() || '0';
  const arenaValue = document.getElementById('arena-input').value.trim() || '0';

  const roundLabel = `R${roundValue}`;
  const arenaLabel = `A${arenaValue}`;
  const filename = `${projectName}_${experimentType}_${roundLabel}_${arenaLabel}.xlsx`;

  const wsData = [['Timer', 'Description', 'Total Time (mm:ss:ms)', 'Total Time (s.sss)', 'Press Count', 'Timestamps']];

  for (let i = 0; i < numTimers; i++) {
    const desc = document.getElementById(`description-${i}`)?.value.trim() || '';
    const accumulatedMs = timers[i].accumulated || 0;
    const totalTimeFormatted = formatTime(accumulatedMs);
    const totalTimeSeconds = (accumulatedMs / 1000).toFixed(3);
    const pressCount = pressCounts[i] || 0;

    const timestamps = pressTimestamps[i] || [];
    const readableTimestamps = timestamps.map(ms => formatTime(ms)).join(', ');

    wsData.push([
      timerNames[i],
      desc,
      totalTimeFormatted,
      totalTimeSeconds,
      pressCount,
      readableTimestamps
    ]);
  }

  // Add metadata rows at the top
  wsData.unshift([]);
  wsData.unshift(['Arena', arenaValue]);
  wsData.unshift(['Round', roundValue]);
  wsData.unshift(['Experiment Type', experimentType]);

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Timers');
  XLSX.writeFile(wb, filename);
}

function exportRowData() {
  const projectName = document.getElementById('filename-input').value.trim() || 'Project';
  const experimentType = document.getElementById('experiment-type').value || 'UnknownExp';
  const roundValue = document.getElementById('round-input').value.trim() || '0';
  const arenaValue = document.getElementById('arena-input').value.trim() || '0';

  const roundLabel = `R${roundValue}`;
  const arenaLabel = `A${arenaValue}`;
  const filename = `${projectName}_${experimentType}_${roundLabel}_${arenaLabel}_rowdata.csv`;

  const csvData = [
    ['Trial', 'Timer', 'Description', 'Timestamp (ms)', 'Duration (s)']
  ];

  let trial = 1;

  for (let i = 0; i < numTimers; i++) {
    const timerName = timerNames[i];
    const description = document.getElementById(`description-${i}`)?.value.trim() || '';
    const timestamps = pressTimestamps[i];
    const durations = pressDurations[i];

    for (let j = 0; j < timestamps.length; j++) {
      const msSinceStart = timestamps[j];
      const durationInSeconds = durations[j] ? (durations[j] / 1000).toFixed(3) : '';
      csvData.push([trial++, timerName, description, msSinceStart, durationInSeconds]);
    }
  }

  // Convert 2D array to CSV string
  const csv = csvData.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');

  // Create and trigger download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


  // Init
  for (let i = 0; i < numTimers; i++) {
    createTimerElement(i);
    timers.push({ running: false, start: 0, accumulated: 0 });
    timerDisplays.push(document.getElementById(`display-${i}`));
  }

  disableAllTimers();

  // Keyboard control

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap.hasOwnProperty(key) && countdownRunning && !activeKeys[key]) {
      activeKeys[key] = true;
      toggleTimer(keyMap[key]);  // <-- This now logs timestamp and press count
    }
  });

  document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap.hasOwnProperty(key)) {
      activeKeys[key] = false;
      stopTimer(keyMap[key]);
    }
  });
