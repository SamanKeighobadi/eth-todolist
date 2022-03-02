import React from "react";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import PropTypes from 'prop-types';

const Navbar = ({ account, copyToClipboard }) => {
  return (
    <div
      className="bg-indigo-600 flex justify-between px-10 py-3
         text-indigo-300 "
    >
      <div>
        <h1 className="font-semibold text-lg">TodoList</h1>
      </div>
      <div className="flex items-center ">
        <ClipboardCopyIcon
          onClick={() => copyToClipboard(account)}
          className="w-5 h-5 mr-4 cursor-pointer"
        />{" "}
        {account ? account : "0x"}
      </div>
    </div>
  );
};

Navbar.propTypes = {
    account:PropTypes.string,
    copyToClipboard:PropTypes.func
}

export default Navbar;
