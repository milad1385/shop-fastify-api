exports.createPagination = (page, limit, totalCount, resourceName) => {
  return {
    currentPage : page,
    limit,
    totalPage: Math.ceil(totalCount / limit),
    ["total" + resourceName]: totalCount,
  };
};
