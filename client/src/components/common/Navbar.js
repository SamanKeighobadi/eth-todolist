import React from 'react';

const Navbar = ({account}) => {
    return ( 
        <div className='bg-indigo-600 flex justify-between px-10 py-3
         text-indigo-300 '>
            <div>
                <h1 className='font-semibold text-lg'>TodoList</h1>
            </div>
            <div>
                {account ? account : '0x'}
            </div>
        </div>
     );
}
 
export default Navbar;