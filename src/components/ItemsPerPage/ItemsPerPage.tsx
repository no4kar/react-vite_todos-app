import React from 'react';
import cn from 'classnames';

export const ItemsPerPage
  = React.memo(FuncComponent);

function FuncComponent({
  selected = 10,
  options = [5, 10, 20],
  handlersFor,
}: {
  selected: number;
  options: number[];
  handlersFor: {
    select?: Pick<
      React.DOMAttributes<HTMLSelectElement>,
      'onChange'>,
  }
}) {

  return (
    <div className="flex items-center space-x-2">
      {/* Label */}
      <label
        htmlFor="itemsPerPage"
        className="text-sm font-medium text-gray-300"
      >
        Items per page:
      </label>

      {/* Dropdown */}
      <select
        id="itemsPerPage"
        className="block w-20 p-2 rounded-md border border-gray-500 
          bg-gray-800 text-sm text-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring focus:ring-blue-200"
        value={selected}
        {...handlersFor.select}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className={cn(
              'bg-gray-800 text-gray-300 hover:bg-gray-600',
              {
                'bg-blue-500 text-white': selected === option
              }
            )}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

