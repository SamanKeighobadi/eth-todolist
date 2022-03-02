import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TodoList from "./contracts/TodoList.json";
//custom components
import TasksList from "./components/TasksList/TasksList";
import TaskInput from "./components/common/TaskInput";
import Navbar from "./components/common/Navbar";
// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const App = () => {
  // init states
  const [account, setAccount] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState(null);
  const Alert = withReactContent(Swal);

  /**
   *
   * @param {String} content title of task
   */
  const addNewTask = (content) => {
    setLoading(true);
    // call function which create new task
    todoList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
        Alert.fire({
          icon: "success",
          title: "Task successfully created !",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => window.location.reload(), 3000);
      });
  };

  /**
   *
   * @param {number} id id of task which we want to delete
   */

  const deleteTask = (id) => {
    setLoading(true);
    todoList.methods
      .removeTask(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
        Alert.fire({
          icon: "success",
          title: "Task successfully deleted !",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => window.location.reload(), 3000);
      });
  };

  /**
   *
   * @param {number} id id of task which we want to complete
   */
  const toggleCompleteTask = (id) => {
    setLoading(true);
    // call function which change completed state
    todoList.methods
      .toggleCompleted(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
        Alert.fire({
          icon: "success",
          title: "Task Done !",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => window.location.reload(), 3000);
      });
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      Alert.fire({
        icon:'info',
        title:"Please Install Metamask",
      })
      setLoading(true)
    }
  };

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const networkId = await web3.eth.net.getId();
    const networkData = await TodoList.networks[networkId];

    const todoList = new web3.eth.Contract(TodoList.abi, networkData.address);
    setTodoList(todoList);

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // find and intract with blockchain

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
    loadWeb3();
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
