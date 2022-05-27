export const dateFormat = (n) => {
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  const date = new Date();
  const month = pad2(date.getMonth() + 1); //months (0-11)
  const day = pad2(date.getDate()); //day (1-31)
  const year = date.getFullYear();

  const formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};
