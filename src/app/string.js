const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "m",
  "n",
  "q",
  "w",
  "x",
  "z",
  "u",
  "i",
  "l",
];

export const generateString = (length) => {
  let str = "";
  for (let i = 0; i < length; i++) {
    str +=
      Math.floor(Math.random() * 2) == 1
        ? chars[Math.floor(Math.random() * chars.length)].toUpperCase()
        : chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};
