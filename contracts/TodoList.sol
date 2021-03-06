// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string countent, bool completed);
    event TaskCompleted(uint256 id, bool completed);
    event TaskDeleted(uint id);

    constructor() public {
        createTask("start learning blockchain");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCreated(taskCount, _content,false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    function removeTask(uint _id) public {
        delete tasks[_id];
        emit TaskDeleted(_id);
    }
}
