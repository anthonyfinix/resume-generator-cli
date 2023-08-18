module.exports = () =>
  Array.from({ length: 12 }, (_, monthIndex) => {
    const date = new Date(2000, monthIndex, 1);
    return date.toLocaleString(undefined, { month: "long" });
  });
