const humanDate = (value) => {
  let options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  let date = new Intl.DateTimeFormat("en-US", options).format(value);
  return date;
};

module.exports = humanDate;
