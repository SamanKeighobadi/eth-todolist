import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "./contracts/TodoList.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const address = "0x503BB3a1730f91F674970D8cA18Ef8d0b6EbC70C";

  const addNewTask = (content) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    todoList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const toggleCompleteTask = (id) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    todoList.methods
      .toggleCompleted(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount);
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
          <div>loading..</div>
        ) : (
          <div className="bg-white rounded-xl  p-8 shadow-xl w-96 h-96 overflow-y-auto  ">
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
            {tasks.map((task) => (
              <div
                key={task.id}
                className="space-y-6 capitalize text-gray-600 mt-4 font-semibold flex justify-between items-center"
              >
                <label>{task.content}</label>
                <input
                  type={"checkbox"}
                  onClick={() => toggleCompleteTask(task.id)}
                  defaultChecked={task.completed}
                  className=''
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
