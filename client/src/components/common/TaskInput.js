import React,{useState} from 'react';
import PropTypes from 'prop-types'

const TaskInput = ({ addNewTask }) => {

    const [text,setText] = useState('')

  return (
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
  );
};

TaskInput.propTypes = {
    addNewTask:PropTypes.func
}

export default TaskInput;
