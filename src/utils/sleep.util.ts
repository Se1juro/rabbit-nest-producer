export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export const sleepLoop = async (number: number, cb) => {
  while (number--) {
    await sleep(400);

    cb();
  }
};
