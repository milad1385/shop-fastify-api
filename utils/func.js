exports.createPagination = (page, limit, totalCount, resourceName) => {
  return {
    currentPage: page,
    limit,
    totalPage: Math.ceil(totalCount / limit),
    ["total" + resourceName]: totalCount,
  };
};

exports.calculateRemainingBanTime = (is_permanent, expires_at) => {
  if (!is_permanent && expires_at) {
    const now = new Date();
    const expiry = new Date(expires_at);
    const diffMs = expiry - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % 86400000) / (1000 * 60 * 60));

    remainingTime = `${diffDays} روز و ${diffHours} ساعت`;
  }

  const banMessage = is_permanent
    ? "حساب کاربری شما به طور دائمی مسدود شده است"
    : ` حساب کاربری شما تا تاریخ ${new Date(expires_at).toLocaleDateString("fa-IR")} مسدود است`;
  return banMessage;
};
