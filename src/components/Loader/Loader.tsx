import React from "react";

export const Loader = React.memo(FuncComponent);

function FuncComponent({
  children = <h1 className='text-xl font-bold bg-transparent text-white animate-pulse'>Processing...</h1>,
  style,
}: {
  children?: JSX.Element,
  style?: {
    container?: string,
  },
}) {
  return (
    <div className={style?.container}>
      {children}
    </div>
  );
}
