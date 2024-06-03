import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

const App = () => {
  const initializeTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    
    const request = new XMLHttpRequest();
    request.open('GET', './data.json', false); // synchronous request
    request.send(null);

    if (request.status === 200) {
      return JSON.parse(request.responseText);
    } else {
      return [];
    }
  };

  const [tasks, setTasks] = useState(initializeTasks);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const startEditing = (index) => {
    if (index !== null) {
      setEditingTaskIndex(index);
      setTaskToEdit(tasks[index]);
      setSelectedPriority(tasks[index].priority);
      setShowAddTaskForm(true);
    } else {
      // Handle adding a new task here, if desired
      setShowAddTaskForm(true);
    }
  };
  

  const stopEditing = () => {
    setEditingTaskIndex(null);
    setTaskToEdit(null);
    setSelectedPriority(null);
    setShowAddTaskForm(false);
  };

  const handleFormSubmit = (task) => {
    if (editingTaskIndex !== null) {
      updateTask(editingTaskIndex, task);
    } else {
      addTask(task);
    }
    stopEditing();
  };

  return (
    <div className="container">
      <TaskList
        tasks={tasks}
        onEdit={startEditing}
        onDelete={deleteTask}
      />
      {showAddTaskForm && (
        <AddTaskForm
          onSubmit={handleFormSubmit}
          taskToEdit={taskToEdit}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          stopEditing={stopEditing}
        />
      )}
    </div>
  );
};

export default App;
