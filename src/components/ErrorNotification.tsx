import React from 'react';
import cn from 'classnames';

export const ErrorNotification = React.memo(MyComponent);

function MyComponent({
  errorMsg,
  onErrorDelete = () => { },
  delay = 3000,
}: {
  errorMsg: string;
  onErrorDelete?: () => void;
  delay: number;
}) {
  React.useEffect(() => {
    const timeoutID = setTimeout(onErrorDelete, delay);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [onErrorDelete, delay]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMsg,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={onErrorDelete}
      />
      <p>{errorMsg}</p>
    </div>
  );
}
