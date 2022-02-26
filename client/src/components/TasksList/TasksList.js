import React,{Fragment} from 'react';

const TasksList = ({ tasks,toggleCompleteTask }) => {
  return (
    <Fragment>
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
            className=""
          />
        </div>
      ))}
    </Fragment>
  );
};

export default TasksList;
