export const Spiner = FuncComponent;

function FuncComponent({
  style = {},
}: {
  style?: {
    container?: string,
    circle1?: string,
    path1?: string,
  },
}) {
  const {
    container = 'animate-spin -ml-1 mr-3 h-5 w-5 text-white fill-none',
    circle1 = 'opacity-25',
    path1 = 'opacity-75 fill-current',
  } = style;

  return (
    <svg
      className={container}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle
        className={circle1}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        className={path1}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}