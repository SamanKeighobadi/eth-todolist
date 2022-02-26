import React, { useState,useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import TodoList from './contracts/TodoList.json'

const App = () => {

  const [account,setAccount] = useState('');
  const [taskCount,setTaskCount] = useState(0);
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true)
  const address = '';

  const loadBlockchainData = () =>{
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const todoList = new web3.eth.Contract(TodoList.abi,address)
    console.log(todoList)
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount)

    setLoading(false)
  }

  useEffect(() => {
    loadBlockchainData()
  },[])

  return (
    <div>Hello Word</div>
  )
}

export default App;
