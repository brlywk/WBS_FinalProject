const asyncWrap = (func) =>
  function (...args) {
    const funcReturn = func(...args);
    const next = args[args.length - 1];

    return Promise.resolve(funcReturn).catch(next);
  };

export default asyncWrap;
