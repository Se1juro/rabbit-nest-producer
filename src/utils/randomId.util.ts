export const generateUID = () => {
  const timestamp = new Date().getTime().toString(16);

  const randomValue = Math.floor(Math.random() * 0xffffffff).toString(16);

  const uid = timestamp + randomValue;

  return uid;
};
