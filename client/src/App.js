import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "./contracts/TodoList.json";
//custom components
import TasksList from "./components/TasksList/TasksList";
import TaskInput from "./components/common/TaskInput";
import Navbar from "./components/common/Navbar";
// React Toastify for notifications
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  // init states
  const [account, setAccount] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const address = "0x13FCc4F583C4209B0b17AF26B10fa02ff2e3F5D6";

  /**
   *
   * @param {String} content title of task
   */
  const addNewTask = (content) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    // call function which create new task
    todoList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
        alert("task created");
      });
  };

  /**
   *
   * @param {number} id id of task which we want to delete
   */

  const deleteTask = (id) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    todoList.methods
      .removeTask(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  /**
   *
   * @param {number} id id of task which we want to complete
   */
  const toggleCompleteTask = (id) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    // call function which change completed state
    todoList.methods
      .toggleCompleted(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const loadBlockchainData = async () => {
    // init web3
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // find and intract with blockchain
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount);
    //fetch created tasks
    const tasksContainer = [];
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      if (task.content !== "") {
        tasksContainer.push(task);
        setTasks(tasksContainer);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <div>
        <Navbar account={account} />
        <div className="flex items-center justify-center flex-col min-h-screen bg-indigo-900">
          {loading ? (
            <div className="">
              <div className="text-white capitalize text-xl">Loading...</div>
            </div>
          ) : (
            <div className="bg-white rounded-xl  p-8 drop-shadow-xl w-96 h-80 overflow-y-auto  ">
              <TaskInput addNewTask={addNewTask} />
              <TasksList
                tasks={tasks}
                toggleCompleteTask={toggleCompleteTask}
                deleteTask={deleteTask}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
