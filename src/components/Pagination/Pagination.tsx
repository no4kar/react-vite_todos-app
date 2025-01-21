import React from 'react';
import cn from 'classnames';

export const Pagination = React.memo(FuncComponent);

function FuncComponent({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => { },
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  
  return (
      <div className="flex items-center space-x-1">
        <button
          className={cn(
            `px-3 py-2 rounded-md 
            border border-gray-500 bg-gray-800
            text-sm font-medium text-gray-300 
            hover:bg-gray-600 hover:text-white transition-all`,
            {
              'cursor-not-allowed opacity-50': currentPage === 1,
            }
          )}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`px-3 py-2 rounded-md border 
              text-sm font-medium transition-all ${currentPage === page
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-800 text-gray-300 border-gray-500 hover:bg-gray-600 hover:text-white'
                }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className={cn(
            `px-3 py-2 rounded-md 
            border border-gray-500 bg-gray-800
            text-sm font-medium text-gray-300 
            hover:bg-gray-600 hover:text-white transition-all`,
            {
              'cursor-not-allowed opacity-50': currentPage === totalPages,
            }
          )}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
  );
}
