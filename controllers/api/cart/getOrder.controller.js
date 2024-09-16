const { literal } = require("sequelize");
const { getOrderPending, getOriginUrl } = require("../../utils")

module.exports = async (req, res) => {
  try {
    const [order, isCreate] = await getOrderPending(req);

    const statusCode = isCreate ? 201 : 200;
    res.status(statusCode).json({
      ok: true,
      data: await order.reload({
        include: [
          {
            association: "products",
            attributes: {
              include: [
                [literal(`CONCAT('${getOriginUrl(req)}/api/product', image)`),
                  "image",
                ], ],
                through: {
                  attributes: ["quantity"],
              }
            },},
        ],
      }),
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
};