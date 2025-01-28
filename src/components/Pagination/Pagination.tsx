import React from 'react';
import cn from 'classnames';

export const Pagination
  = React.memo(FuncComponent);

function FuncComponent({
  currentPage,
  totalPages,
  handlersFor,
}: {
  currentPage: number;
  totalPages: number;
  handlersFor: {
    btnPrev?: Pick<
      React.DOMAttributes<HTMLButtonElement>,
      'onClick'>,
    btnPage?: Pick<
      React.DOMAttributes<HTMLButtonElement>,
      'onClick'>,
    btnNext?: Pick<
      React.DOMAttributes<HTMLButtonElement>,
      'onClick'>,
  }
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
        {...handlersFor.btnPrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            data-page={page}
            key={page}
            className={`px-3 py-2 rounded-md border 
              text-sm font-medium transition-all ${currentPage === page
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-800 text-gray-300 border-gray-500 hover:bg-gray-600 hover:text-white'
              }`}
            {...handlersFor.btnPage}
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
        {...handlersFor.btnNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
