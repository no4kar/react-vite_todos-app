import React from 'react';
import cn from 'classnames';

export const Notification = React.memo(FuncComponent);

function FuncComponent({
  children,
  onClose = () => { },
  delay = 3000,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  delay?: number;
}) {
  const [visible, setVisible] = React.useState(false);

  const handleClose = () => {
    onClose();
    setVisible(false);
  };

  React.useEffect(() => {
    setVisible(true);
    const timeoutID = setTimeout(handleClose, delay);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [delay]);

  return (
    <div
      data-cy="Notification"
      className={cn(`relative
        py-4 px-6 bg-red-100 text-system-error 
        font-normal rounded`, {
        'pointer-events-none hidden': !visible,
        // 'pointer-events-none transition-all opacity-0': !visible,
      })}
    >
      {children}

      <button
        type="button"
        data-cy="CloseButton"
        aria-label="CloseButton"
        className='absolute top-1 right-1 w-6 aspect-square 
        rounded-full bg-system-error text-white
        hover:opacity-70'
        onClick={handleClose}
      >
        <i className='w-4 aspect-square fa-solid fa-xmark' />
      </button>
    </div>
  );
}
