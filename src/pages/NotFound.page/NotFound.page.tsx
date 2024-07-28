import * as R from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../components/Loader';

export const NotFoundPage = R.memo(FuncComponent);

function FuncComponent({
  title = 'Page not found',
  navigateTo,
  style = {},
}: {
  title?: string;
  navigateTo?: string;
  style?: {
    container?: string;
  }
}) {
  const {
    container = `flex flex-col gap-16 items-center justify-center content min-h-96`,
  } = style;

  const navigate = useNavigate();

  R.useEffect(() => {
    if (navigateTo) {
      const timeoutId = setTimeout(() => {
        navigate(navigateTo);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }

    return () => { };
  }, []);


  return (
    <div
      className={container}
    >
      <h1 className='font-robotomono-bold text-3xl font-bold text-center'>{title}</h1>

      {navigateTo && (
        <Loader />
      )}
    </div>
  );
}
