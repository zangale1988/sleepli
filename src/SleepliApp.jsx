
import React, { useState } from "react";

export default function SleepliApp() {
  const [wakeTime, setWakeTime] = useState("06:00");
  const [napEnabled, setNapEnabled] = useState(false);
  const [wakeGoal, setWakeGoal] = useState("12:30");

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sleepli</h1>
      <label>Aufgewacht um:
        <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
      </label>
      <br />
      <label>Nap aktivieren:
        <input type="checkbox" checked={napEnabled} onChange={e => setNapEnabled(e.target.checked)} />
      </label>
      <br />
      <label>Wachziel:
        <input type="time" value={wakeGoal} onChange={e => setWakeGoal(e.target.value)} />
      </label>
    </main>
  );
}
