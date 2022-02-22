import {action, computed, makeObservable, observable} from 'mobx';

class Tasks {
  tasks = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      setDoneTask: action,
      deleteTask: action,
      count: computed,
    });
  }
  addTask(task) {
    this.tasks = [
      ...this.tasks,
      {
        ...task,
        isDone: false,
        createDate: new Date(),
        id: Math.random(),
      },
    ];
  }

  setDoneTask(id) {
    const newTaskList = [];
    this.tasks.forEach(t => {
      if (t.id === id) {
        newTaskList.push({...t, isDone: true});
      } else {
        newTaskList.push(t);
      }
    });
    this.tasks = newTaskList;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  get count() {
    return this.tasks.length;
  }
}

export const tasksStore = new Tasks();
