const humanDate = (value) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(value);
    return date;
  };
  
  module.exports = humanDate;
  