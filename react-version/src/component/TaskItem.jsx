import React from 'react';

const TaskItem = ({ task, index, editTask, deleteTask }) => {
  const getStatusAngle = (status) => {
    switch (status) {
      case 'To Do':
        return 0;
      case 'In Progress':
        return 180;
      case 'Done':
        return 360;
      default:
        return 0;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const statusAngle = getStatusAngle(task.status);

  return (
    <div className="task-item">
      <div>
        <p className="task-id">Task</p>
        <p className="task-title">{task.task}</p>
      </div>
      <div>
        <p className="task-id">Priority</p>
        <p className={`task-priority text-${getPriorityClass(task.priority)}`}>{task.priority}</p>
      </div>
      <span className="badge badge-secondary">{task.status}</span>
      <div className="circle-container">
        <div className="circle-progress" style={{ background: `conic-gradient(#7d2ae8 ${statusAngle}deg, #ededed 0deg)` }}>
          <p></p>
        </div>
      </div>
      <span className="task-actions">
        <button className="btn text-lg text-primary btn-sm m-3 edit-task" onClick={() => editTask(index)}>
          <i className="bi bi-pencil-square"></i>
        </button>
        <button className="btn text-danger btn-sm delete-task" onClick={() => deleteTask(index)}>
          <i className="bi bi-trash-fill"></i>
        </button>
      </span>
    </div>
  );
};

export default TaskItem;
