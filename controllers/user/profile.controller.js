const db = require("../../database/models");
const { Op } = require("sequelize");
const fetch = require("node-fetch");

module.exports = async function (req, res) {
    try {
        const userlogueado = req.session.user;
        let productsCart = [];

        if (userlogueado) {
            const dataOrder = await db.Order.findOne({
                where: {
                    [Op.and]: [
                        { user_id: req.session.user?.id },
                        { state: "pending" },
                    ],
                },
                include: [
                    {
                        association: "products",
                        through: { attributes: ["quantity"] },
                    },
                ],
            });

            if (dataOrder) {
                productsCart = dataOrder.products.map(product => {
                    const quantity = product.OrderProduct ? product.OrderProduct.quantity : 0;

                    return {
                        ...product.toJSON(),
                        quantity,
                    };
                });
            }
        }

        const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
        const data = await response.json();
        const { provincias } = data;

        if (userlogueado) {
            const updatedUser = await db.User.findOne({
                where: { id: userlogueado.id },
            });

            const infouser = await db.infoUser.findOne({
                where: { user_id: updatedUser.id },
            });

            res.render("profileUser", { userlogueado: updatedUser, infouser, provincias, productsCart });
        }
    } catch (err) {
        res.send(err.message);
    }
};
