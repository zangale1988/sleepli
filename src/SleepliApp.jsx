import { useState } from 'react';
import './index.css';

export default function SleepliApp() {
  const [wakeTime, setWakeTime] = useState('06:00');
  const [bedTime, setBedTime] = useState('19:30');
  const [napStart, setNapStart] = useState('13:00');
  const [napEnd, setNapEnd] = useState('14:00');
  const [napEnabled, setNapEnabled] = useState(true);
  const [wakeHours, setWakeHours] = useState(12);
  const [wakeMinutes, setWakeMinutes] = useState(0);

  function parseTime(t) {
    const [h, m] = t.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  }

  function formatDuration(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}min`;
  }

  function calcWachzeit() {
    const now = new Date();
    const wake = parseTime(wakeTime);
    let nap = 0;
    if (napEnabled) {
      const napS = parseTime(napStart);
      const napE = parseTime(napEnd);
      nap = (napE - napS) / 60000;
    }
    return Math.max(0, Math.floor((now - wake) / 60000) - nap);
  }

  function calcTotalSleep() {
    const bed = parseTime(bedTime);
    const wake = parseTime(wakeTime);
    const diff = (wake - bed + 1440 * 60000) % (1440 * 60000);
    const nap = napEnabled ? (parseTime(napEnd) - parseTime(napStart)) / 60000 : 0;
    return Math.floor(diff / 60000 + nap);
  }

  function recommendedBedtime() {
    const wake = parseTime(wakeTime);
    const totalMin = wakeHours * 60 + wakeMinutes;
    const bed = new Date(wake.getTime() + totalMin * 60000);
    return bed.toTimeString().slice(0, 5);
  }

  return (
    <main className="app">
      <h1>Sleepli</h1>
      <p className="tagline">Kinderschlaf smart & einfach</p>

      <div className="card">
        <label>☀️ Aufgewacht um:
          <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} />
        </label>

        <label>🧸 Nap aktiviert:
          <input type="checkbox" checked={napEnabled} onChange={e => setNapEnabled(e.target.checked)} />
        </label>

        {napEnabled && (
          <div className="nap-row">
            <label>Start:
              <input type="time" value={napStart} onChange={e => setNapStart(e.target.value)} />
            </label>
            <label>Ende:
              <input type="time" value={napEnd} onChange={e => setNapEnd(e.target.value)} />
            </label>
          </div>
        )}

        <label>🌙 Zu Bett gegangen:
          <input type="time" value={bedTime} onChange={e => setBedTime(e.target.value)} />
        </label>

        <div className="wakegoal">
          <label>⏱️ Wachziel:</label>
          <input type="number" value={wakeHours} onChange={e => setWakeHours(+e.target.value)} /> h
          <input type="number" value={wakeMinutes} onChange={e => setWakeMinutes(+e.target.value)} /> min
        </div>

        <div className="result">
          <p><strong>🕓 Wach seit:</strong> {formatDuration(calcWachzeit())}</p>
          <p><strong>💤 Gesamtschlaf:</strong> {formatDuration(calcTotalSleep())}</p>
          <p><strong>📅 Empf. Bettzeit:</strong> {recommendedBedtime()}</p>
        </div>
      </div>
    </main>
  );
}
