import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "./contracts/TodoList.json";
//components
import TasksList from "./components/TasksList/TasksList";

const App = () => {

  // init states
  const [account, setAccount] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const address = "0xa996868e4491930bd4c232eA796919b0eA97668C";

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
      tasksContainer.push(task);
      setTasks(tasksContainer);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen bg-indigo-900">
        {loading ? (
          <div className="">
            <div className="text-white capitalize text-xl">Loading...</div>
          </div>
        ) : (
          <div className="bg-white rounded-xl  p-8 shadow-xl w-96 h-80 overflow-y-auto  ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewTask(text);
              }}
              className="flex justify-between items-center mb-2"
            >
              <input
                className="focus:outline-none focus:ring-2 focus:ring-indigo-600 px-2 w-3/4 border-2 rounded placeholder:font-gray-800 "
                type={"text"}
                required
                autoFocus
                onChange={(e) => setText(e.target.value)}
                placeholder="What do you want to do?"
              />
              <button className="text-sm bg-indigo-600 rounded px-2 py-1 text-white transition hover:bg-indigo-500">
                {" "}
                Submit{" "}
              </button>
            </form>
            <TasksList tasks={tasks} toggleCompleteTask={toggleCompleteTask} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
