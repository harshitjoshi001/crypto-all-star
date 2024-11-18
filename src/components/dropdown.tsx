'use client';

import { useState } from 'react';

interface DropdowmInterface {
  options?: {
    value: string;
  };
}

const Dropdown: React.FC<DropdowmInterface> = ({ options }) => {
  const [dropdownOpen, setToggleDropdown] = useState(false);
  const [value, setValue] = useState();

  const dropdownOptions = () => {};

  return (
    <div className="relative">
      <button
        onClick={() => setToggleDropdown((prev) => !prev)}
        className="py-2 px-4 text-lg font-semibold text-gray-500 hover:text-gray-700"
      >
        Dropdown
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul>
            <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              Option 1
            </li>
            <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              Option 2
            </li>
            <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              Option 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
