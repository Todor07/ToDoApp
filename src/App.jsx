import React, { useState, useEffect } from 'react';
import './App.css';
import ClipboardIcon from './ClipboardIcon.jsx';
import AnimatedBackground from './AnimatedBackground.jsx';

const FILTERS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="clock">{time.toLocaleTimeString()}</div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { text: input, completed: false, id: Date.now(), dueDate },
    ]);
    setInput('');
    setDueDate('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ALL) return true;
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  return (
    <>
      <AnimatedBackground />
      <div className="App">
        <h1 className="title">To-Do App</h1>
        <form className="todo-form" onSubmit={addTodo}>
          <div className="input-wrapper">
            <input
              className="todo-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new to-do"
            />
            <span className="input-icon">
              <ClipboardIcon />
            </span>
          </div>
          <input
            className="todo-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Select for when"
          />
          <button className="add-btn" type="submit">Add</button>
        </form>
        <div className="filters">
          {Object.values(FILTERS).map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}> 
              <span onClick={() => toggleComplete(todo.id)} className="todo-text">
                {editId === todo.id ? (
                  <>
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button className="save-btn" onClick={() => saveEdit(todo.id)}>Save</button>
                  </>
                ) : (
                  <>
                    {todo.text}
                    {todo.dueDate && (
                      <span className="due-date"> (Due: {todo.dueDate})</span>
                    )}
                  </>
                )}
              </span>
              <div className="actions">
                {editId !== todo.id && (
                  <button className="edit-btn" onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
      </div>
      <Clock />
    </>
  );
}

export default App;
