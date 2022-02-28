import React, { Fragment } from "react";
// Prop types
import PropTypes from "prop-types";
// Icons
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

const TasksList = ({ tasks, toggleCompleteTask, deleteTask }) => {
  return (
    <Fragment>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="space-y-6 capitalize text-gray-600 mt-4 font-semibold flex justify-between items-center"
        >
          <label className={ task.completed ?" line-through":""} >{task.content}</label>
    
          <div className="flex justify-between items-center space-x-5">
            <CheckCircleIcon  onClick={() => toggleCompleteTask(task.id)} className="h-5 w-5 text-green-500 cursor-pointer"  />
            <TrashIcon  onClick={() => deleteTask(task.id)} className="h-5 w-5 text-red-500 cursor-pointer" />
          </div>
          {/* <span onClick={() => deleteTask(task.id)} >&items;</span> */}
        </div>
      ))}
    </Fragment>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array,
  toggleCompleteTask: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default TasksList;
