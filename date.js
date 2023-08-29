exports.getDate = () => {
  const obj = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return new Date().toLocaleDateString("en-US", obj);
};

exports.getDay = () => {
  const obj = {
    weekday: "long",
  };
  return new Date().toLocaleDateString("en-US", obj);
};
