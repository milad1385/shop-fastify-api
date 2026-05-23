const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Ban = sequelize.define(
  "Ban",
  {
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_permanent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Ban;
