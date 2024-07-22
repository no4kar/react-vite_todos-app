import React from "react";
import cn from "classnames";

export const Loader = React.memo(FuncComponent);

function FuncComponent({
  style,
}: {
  style?: {
    container?: string,
  }
}) {
  return (
    <div className={`block ${style?.container}`}>
      <h1 className='text-xl font-bold bg-transparent text-white'>Processing...</h1>
    </div>
  );
}
