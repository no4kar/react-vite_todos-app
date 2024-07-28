import React from "react";

export const Loader = React.memo(FuncComponent);

function FuncComponent({
  content = <h1 className='text-xl font-bold bg-transparent text-white animate-pulse'>Processing...</h1>,
  style,
}: {
  content?: JSX.Element,
  style?: {
    container?: string,
  },
}) {
  return (
    <div className={style?.container}>
      {content}
    </div>
  );
}
