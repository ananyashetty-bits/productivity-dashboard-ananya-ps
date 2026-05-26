import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://127.0.0.1:8000/api";

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [tasksRes, noteRes] = await Promise.all([
          fetch(`${API_BASE}/tasks`),
          fetch(`${API_BASE}/note`)
        ]);

        if (!tasksRes.ok || !noteRes.ok) throw new Error("Synchronization failure.");

        const tasksData = await tasksRes.json();
        const noteData = await noteRes.json();

        setTasks(tasksData);
        setNote(noteData.content);
        setError(null);
      } catch (err) {
        setError("Could not retrieve system metrics.");
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask, completed: false })
      });
      const savedTask = await res.json();
      setTasks([...tasks, savedTask]);
      setNewTask('');
    } catch (err) {
      setError("Task deployment failed.");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PUT' });
      const data = await res.json();
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: data.completed } : t));
    } catch (err) {
      setError("State transition failed.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError("Purge operational failure.");
    }
  };

  const saveNote = async () => {
    try {
      setSavingNote(true);
      await fetch(`${API_BASE}/note`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note })
      });
    } catch (err) {
      setError("Note cache commit failed.");
    } finally {
      setSavingNote(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) return <div className="loading-screen">Booting Dashboard Modules...</div>;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand">HQ Core v1.0</div>
        <div className="metric-box">
          <div className="metric-label">Execution Efficiency</div>
          <div className="metric-value">{completionRate}%</div>
          <div className="metric-bar-container">
            <div className="metric-bar" style={{ width: `${completionRate}%` }}></div>
          </div>
          <p className="metric-subtext">{completedCount} of {tasks.length} metrics finalized</p>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div>
            <h1>Command Workspace</h1>
            <p className="subtitle">Project Execution Platform</p>
          </div>
          {error && <span className="status-badge alert">{error}</span>}
        </header>

        <div className="workspace-grid">
          {/* OPERATIONAL MATRIX */}
          <section className="dashboard-card">
            <div className="card-header">
              <h2>Operational Matrix</h2>
            </div>
            
            <form onSubmit={addTask} className="task-input-group">
              <input 
                type="text" 
                placeholder="Queue new target milestone..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit">Deploy</button>
            </form>

            <ul className="interactive-list">
              {tasks.map(task => (
                <li key={task.id} className={`list-item ${task.completed ? 'done' : ''}`}>
                  <div className="item-click-area" onClick={() => toggleTask(task.id)}>
                    <span className="checkbox-indicator"></span>
                    <span className="item-text">{task.title}</span>
                  </div>
                  <button className="item-purge-btn" onClick={() => deleteTask(task.id)}>✕</button>
                </li>
              ))}
            </ul>
          </section>

          {/* STRATEGIC SCRATCHPAD */}
          <section className="dashboard-card notes-section">
            <div className="card-header split">
              <h2>Strategic Scratchpad</h2>
              <button className="save-note-btn" onClick={saveNote}>
                {savingNote ? "Syncing..." : "Save Notes"}
              </button>
            </div>
            <textarea 
              placeholder="Record deep-work focus parameters, blockages, or raw technical scratch notes here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="notes-textarea"
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;