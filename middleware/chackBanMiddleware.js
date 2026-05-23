const banService = require("../services/banService");
const { calculateRemainingBanTime } = require("../utils/func");

async function checkBanMiddleware(req, res) {
  try {
    if (!req.user) return;

    const activeBan = await banService.findBanByUserId(req.user.id);

    if (activeBan) {
      const banMessage = calculateRemainingBanTime(
        activeBan.is_permanent,
        activeBan.expires_at,
      );

      throw createError.Forbidden(banMessage);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = checkBanMiddleware;
