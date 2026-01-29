const db = require("../models");

class UserService {
    // 🔹 GET LOGGED-IN USER
    static async getMe(userId) {
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    // 🔹 UPDATE LOGGED-IN USER
    static async updateMe(userId, data) {
        const t = await db.sequelize.transaction();

        try {
            const user = await db.User.findByPk(userId, { transaction: t });

            if (!user) {
                throw new Error("User not found");
            }

            if (data.name !== undefined) user.name = data.name;
            if (data.email !== undefined) user.email = data.email;

            await user.save({ transaction: t });
            await t.commit();

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                updatedAt: user.updatedAt,
            };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    // 🔹 DELETE LOGGED-IN USER
    static async deleteMe(userId) {
        const t = await db.sequelize.transaction();

        try {
            const user = await db.User.findByPk(userId, { transaction: t });

            if (!user) {
                throw new Error("User not found");
            }

            await user.destroy({ transaction: t });
            await t.commit();

            return true;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

module.exports = UserService;
