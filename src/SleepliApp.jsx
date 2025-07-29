import React, { useState, useEffect } from "react";

export default function SleepliApp() {
  const [wakeTime, setWakeTime] = useState("06:00");
  const [napStart, setNapStart] = useState("13:00");
  const [napEnd, setNapEnd] = useState("13:45");
  const [bedTime, setBedTime] = useState("20:00");
  const [wakeGoal, setWakeGoal] = useState("12:30");
  const [napEnabled, setNapEnabled] = useState(false);

  function timeToDate(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
  }

  function calcWachzeit() {
    const now = new Date();
    const wake = timeToDate(wakeTime);
    let diff = (now - wake) / 60000;
    if (napEnabled) {
      const napS = timeToDate(napStart);
      const napE = timeToDate(napEnd);
      diff -= (napE - napS) / 60000;
    }
    return formatDuration(Math.max(0, Math.floor(diff)));
  }

  function calcTotalSleep() {
    const bed = timeToDate(bedTime);
    const wake = timeToDate(wakeTime);
    let diff = (wake - bed) / 60000;
    if (diff < 0) diff += 1440;
    if (napEnabled) {
      const napS = timeToDate(napStart);
      const napE = timeToDate(napEnd);
      diff += (napE - napS) / 60000;
    }
    return formatDuration(Math.floor(diff));
  }

  function recommendedBedtime() {
    const wake = timeToDate(wakeTime);
    const [h, m] = wakeGoal.split(":").map(Number);
    const bedtime = new Date(wake.getTime() + h * 3600000 + m * 60000);
    return bedtime.toTimeString().slice(0, 5);
  }

  return (
    <div>
      <h1>Sleepli</h1>
      <p>🕓 Wach seit: {calcWachzeit()}</p>
      <p>💤 Gesamtschlaf: {calcTotalSleep()}</p>
      <p>🛏️ Empfohlene Schlafenszeit: {recommendedBedtime()}</p>

      <label>☀️ Aufgewacht um:
        <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
      </label>
      <br />

      <label>🌙 Zu Bett gegangen:
        <input type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} />
      </label>
      <br />

      <label>⏱️ Wachziel:
        <input type="time" value={wakeGoal} onChange={(e) => setWakeGoal(e.target.value)} />
      </label>
      <br />

      <label>
        🧸 Nap aktivieren:
        <input type="checkbox" checked={napEnabled} onChange={(e) => setNapEnabled(e.target.checked)} />
      </label>
      {napEnabled && (
        <>
          <br />
          <label>Nap Start:
            <input type="time" value={napStart} onChange={(e) => setNapStart(e.target.value)} />
          </label>
          <br />
          <label>Nap Ende:
            <input type="time" value={napEnd} onChange={(e) => setNapEnd(e.target.value)} />
          </label>
        </>
      )}
    </div>
  );
}
