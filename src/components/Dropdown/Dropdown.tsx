import * as R from 'react';
import cn from 'classnames';
import { TyTask } from '../../types/Task.type';

type DropdownItem = TyTask.Item;
// type DropdownItem = TyTask.Item & { [key: string]: any; };

export const Dropdown = R.memo(FuncComponent);

function FuncComponent({
  items,
  selectedItem = null,
  isProcessing = false,
  onSelectItem = () => { },
  onCreateItem = () => { },
  onRemoveItem = () => { },
}: {
  items: DropdownItem[],
  selectedItem?: DropdownItem | null,
  isProcessing?: boolean,
  onSelectItem?: (itemId: DropdownItem['id']) => void,
  onCreateItem?: ({ name }: { name: TyTask.Item['name'] }) => Promise<void> | void,
  onRemoveItem?: (itemId: DropdownItem['id']) => Promise<void> | void,
}) {
  const [isOpen, setIsOpen] = R.useState(false);
  const [isEditing, setIsEditing] = R.useState(false);
  const [value, setValue] = R.useState(selectedItem?.name || 'Select task');
  const inputRef = R.useRef<HTMLInputElement | null>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleRemove = async (itemId: string) => {
    await onRemoveItem(itemId);
  };

  const handleCreate = async () => {
    await onCreateItem({ name: value.trim() });
    setIsEditing(false);
  };

  const handleKeyDown = (event: R.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <div
      className={cn('relative border border-yellow-300 rounded-md', {
        'is-active': isOpen,
      })}
    >
      <div className='flex space-x-2 rounded-md'>
        <div className={cn('relative flex flex-grow rounded-md', {
          'is-loading': isProcessing,
        })}>
          <input
            type='text'
            className='
              flex flex-grow px-4 py-2
              text-lg sm:text-xl font-bold rounded-md
              text-indigo-400 hover:opacity-70
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition ease-in-out duration-150'
            ref={inputRef}
            value={isProcessing ? 'Processing...' : value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCreate}
            disabled={isProcessing || !isEditing}
          />

          {isProcessing && (
            <div
              className='absolute top-[50%] right-0 
                transform -translate-x-1/2 -translate-y-1/2'
            >
              <svg
                className='
                // animate-spin
                h-5 w-5'
                // xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='blue' stroke-width='4'></circle>
                <path className='opacity-75' fill='blue' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
            </div>
          )}
        </div>

        <button
          className='w-11 sm:w-12 rounded aspect-square
            bg-system-warn text-white
            hover:opacity-70'
          onClick={toggleDropdown}
        >
          <i className={cn('w-4 aspect-square fa-solid fa-angle-down', {
            '-scale-y-100': isOpen,
          })} />
        </button>
      </div>

      {isOpen && (
        <div
          className='
          absolute top-11 z-10
          bg-white border rounded-md shadow-lg mt-2 w-full md:w-auto'
        >
          <div className='py-2'>
            <div
              className='
                px-4 py-2 font-semibold text-sm
                text-gray-700 cursor-pointer hover:bg-gray-100'
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                  setIsEditing(true);
                  toggleDropdown();
                }
              }}
            >
              Create new task
            </div>

            <hr className='border-gray-300' />

            {items.map((item) => (
              <div
                key={item.id}
                className={cn('px-4 py-2 font-semibold text-sm',
                  'text-gray-700 cursor-pointer hover:bg-gray-100', {
                  'bg-blue-100': item.id === selectedItem?.id,
                })}
              >
                <div className='flex justify-between items-center'>
                  <div
                    className='flex-grow'
                    onClick={() => {
                      onSelectItem(item.id);
                      setValue(item.name);
                      toggleDropdown();
                    }}
                  >
                    <p>{item.name}</p>
                  </div>

                  {item.id !== selectedItem?.id && (
                    <div className='ml-4'>
                      <button
                        className='
                          w-6 aspect-square rounded-full
                        text-red-500 hover:text-red-700 focus:outline-none'
                        onClick={() => handleRemove(item.id)}
                      >
                        <i className='fas fa-xmark' />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
