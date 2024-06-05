const dataTest = "Lorem ipsum";

const addPaging = (data) => {
  return {
    page: 1,
    next: 2,
    prev: null,
    data,
  };
};

module.exports = {
  dataTest,
  addPaging,
};
