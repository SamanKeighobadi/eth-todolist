import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "./contracts/TodoList.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const address = "0x503BB3a1730f91F674970D8cA18Ef8d0b6EbC70C";

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const todoList = new web3.eth.Contract(TodoList.abi, address);
    console.log(todoList);
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount);
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      console.log(task);
      setTasks([...tasks, task]);
    }
    setLoading(false);
  };

  tasks.map(task => {
    console.log(task.content);
  })

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div>loading..</div>
        ) : (
          <>
            <form>
              <input type={"text"} placeholder="todo..." />
              <button> Submit </button>
            </form>
            {tasks.map((task) => (
              <div key={task.id}>
                <label>{task.content}</label>
                <input type={'checkbox'}  />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default App;
