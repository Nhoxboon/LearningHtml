import React, { useState, useEffect } from 'react';

const AddTaskForm = ({ task, saveTask }) => {
  const [taskInput, setTaskInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(null);

  useEffect(() => {
    if (task) {
      setTaskInput(task.task);
      setSelectedPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskInput.trim() || !selectedPriority) {
      return;
    }
    const newTask = {
      task: taskInput.trim(),
      priority: selectedPriority,
      status: 'To Do',
    };
    saveTask(newTask);
    setTaskInput('');
    setSelectedPriority(null);
  };

  return (
    <div className="add-task" id="addTaskFormContainer">
      <h3>{task ? 'Edit Task' : 'Add Task'}</h3>
      <form id="addTaskForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            className="form-control"
            maxLength="100"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            required
          />
          <div className="invalid-feedback">Task cannot exceed 100 characters.</div>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <div className="priority-btns">
            <button
              type="button"
              className={`btn btn-outline-danger priority-btn ${selectedPriority === 'High' ? 'selected-high' : ''}`}
              onClick={() => setSelectedPriority('High')}
            >
              High
            </button>
            <button
              type="button"
              className={`btn btn-outline-warning priority-btn ${selectedPriority === 'Medium' ? 'selected-medium' : ''}`}
              onClick={() => setSelectedPriority('Medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`btn btn-outline-success priority-btn ${selectedPriority === 'Low' ? 'selected-low' : ''}`}
              onClick={() => setSelectedPriority('Low')}
            >
              Low
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {task ? 'Save' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
