import React, { useState } from 'react';
import './css/AddTaskForm.css';

const AddTaskForm = ({ onSubmit, taskToEdit, selectedPriority, setSelectedPriority, stopEditing }) => {
  const [taskInput, setTaskInput] = useState(taskToEdit ? taskToEdit.task : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskInput.trim()) {
      alert('Please enter a task.');
      return;
    }
    if (!selectedPriority) {
      alert('Please select a priority.');
      return;
    }
    const newTask = {
      task: taskInput,
      priority: selectedPriority,
      status: taskToEdit ? taskToEdit.status : 'To Do'
    };
    onSubmit(newTask);
    setTaskInput('');
    setSelectedPriority(null);
  };

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task"><h2>Add Task</h2></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <div className="priority-btns">
            <button
              type="button"
              className={`btn btn-outline-danger priority-btn ${selectedPriority === 'High' ? 'selected-high' : ''}`}
              onClick={() => handlePriorityClick('High')}
            >
              High
            </button>
            <button
              type="button"
              className={`btn m-1 btn-outline-warning priority-btn ${selectedPriority === 'Medium' ? 'selected-medium' : ''}`}
              onClick={() => handlePriorityClick('Medium')}
            >
              Medium
            </button>
            <button
              type="button"
              className={`btn btn-outline-success priority-btn ${selectedPriority === 'Low' ? 'selected-low' : ''}`}
              onClick={() => handlePriorityClick('Low')}
            >
              Low
            </button>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-auto">
            <button type="submit" className="btn btn-secondary mt-2">
              {taskToEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

      </form>
      {/* <button onClick={stopEditing} className="btn btn-secondary mt-2">Cancel</button> */}
    </div>
  );
};

export default AddTaskForm;
