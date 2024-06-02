import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div id="tasks-container">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
