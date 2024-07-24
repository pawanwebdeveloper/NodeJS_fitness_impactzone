module.exports = {
  success: async (message, data, paginationAndSort) => {
    let res = {
      success: true,
      message,
      data,
      paginationAndSort,
    };
    return res;
  },
  error: async (message, data) => {
    let res = {
      success: false,
      message,
      data,
    };
    return res;
  },
};
