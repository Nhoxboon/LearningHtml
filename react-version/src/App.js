import React, { useEffect, useState } from 'react';
import TaskList from './component/TaskList';
import AddTaskForm from './component/AddTaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    const loadTasksFromLocalStorage = () => {
      const tasksJSON = localStorage.getItem('tasks');
      if (tasksJSON) {
        setTasks(JSON.parse(tasksJSON));
      } else {
        fetchTasks();
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch('./data.json');
        if (response.ok) {
          const data = await response.text();
          try {
            const jsonData = JSON.parse(data);
            setTasks(jsonData);
          } catch (error) {
            console.error('Invalid JSON:', data);
          }
        } else {
          console.error('Server response:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    loadTasksFromLocalStorage();
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateTask = (index, updatedTask) => {
    const newTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  return (
    <div className="container">
      <div className="task-list">
        <div className="d-flex justify-content-between align-items-center p-2 bd-highlight">
          <h2>Task List</h2>
          <button className="btn btn-primary rounded-5 bg-purple" onClick={() => setEditingTaskIndex(null)}>
            + Add Task
          </button>
        </div>
        <TaskList tasks={tasks} editTask={setEditingTaskIndex} deleteTask={deleteTask} />
      </div>
      {editingTaskIndex !== null && (
        <AddTaskForm
          task={tasks[editingTaskIndex]}
          saveTask={(task) => {
            if (editingTaskIndex !== null) {
              updateTask(editingTaskIndex, task);
              setEditingTaskIndex(null);
            } else {
              addTask(task);
            }
          }}
        />
      )}
    </div>
  );
};

export default App;
