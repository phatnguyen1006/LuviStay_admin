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

export const reverseDateFormat = (date: string) => {
  return date.split("-").reverse().join("-");
};

export const convertMongoDatetoDMY = (date?: string) => {  
  return date ? reverseDateFormat(date.substring(0,10)) : "";
};

export const convertMongoDatetoYMD = (date?: string) => {  
  return date ? date.substring(0,10) : "";
};

