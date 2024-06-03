import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      <div className="d-flex justify-content-between align-items-center p-2 bd-highlight">
        <h2>Task List</h2>
        <button className="btn btn-primary rounded-5 bg-purple" onClick={() => onEdit(null)}>
          <i className="bi bi-plus-lg"></i> Add Task
        </button>
      </div>
      <div id="tasks-container">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
