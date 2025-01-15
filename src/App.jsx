import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React.js', completed: true },
    { id: 2, text: 'Learn Golang', completed: false },
    { id: 3, text: 'Learn Docker', completed: true },
    { id: 4, text: 'Learn something else', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showCompletedLast, setShowCompletedLast] = useState(false);
  const listRef = useRef(null);

  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks(prevTasks => [...prevTasks, { 
      id: Date.now(), 
      text: inputValue, 
      completed: false 
    }]);
    setInputValue('');
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const progress = tasks.length > 0
    ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100)
    : 0;

  const displayedTasks = showCompletedLast
    ? [...tasks].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      })
    : tasks;

  return (
    <div className="todo-app"> 
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>
        <div className="todo-subtitle">Add things to do</div>

        <div className="wrapper-container">
          <div className="progress-container">
            <div className="progress-percentage">{progress}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div ref={listRef} className="task-list">
            {displayedTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-marker" />
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="toggle-container">
          <span className="toggle-label">Move done things to end?</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={showCompletedLast}
              onChange={() => setShowCompletedLast(!showCompletedLast)}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="input-section">
          <label className="input-label">Add to list</label>
          <div className="input-container">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="todo-input"
            />
            <button onClick={addTask} className="add-button">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;