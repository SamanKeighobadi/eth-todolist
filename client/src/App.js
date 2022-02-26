import React, { useState,useEffect } from "react";
import "./App.css";
import Web3 from "web3";

const App = () => {

  const [account,setAccount] = useState('');
  const [taskCount,setTaskCount] = useState(0);
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true)
  const address = '';

  return (
    <div>Hello Word</div>
  )
}

export default App;
