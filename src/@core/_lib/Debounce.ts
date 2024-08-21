type DebounceFunction = (...args: any[]) => void;

const debounce = (func: DebounceFunction, delay: number) => {
  let timer: NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => func.apply(this, args), delay);
  };
};

export default debounce;
