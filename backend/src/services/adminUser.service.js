const db = require("../models");

class AdminUserService {
    // 🔹 GET ALL USERS
    static async getAllUsers() {
        return await db.User.findAll({
            attributes: { exclude: ["password", "resetOtp", "resetOtpExpiry"] },
        });
    }

    // 🔹 GET USER BY ID
    static async getUserById(userId) {
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ["password", "resetOtp", "resetOtpExpiry"] },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    // 🔹 UPDATE USER BY ADMIN
    static async updateUser(userId, data) {
        const t = await db.sequelize.transaction();

        try {
            const user = await db.User.findByPk(userId, { transaction: t });

            if (!user) {
                throw new Error("User not found");
            }

            if (data.name !== undefined) user.name = data.name;
            if (data.email !== undefined) user.email = data.email;
            if (data.role !== undefined) user.role = data.role;

            await user.save({ transaction: t });
            await t.commit();

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                updatedAt: user.updatedAt,
            };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    // 🔹 DELETE USER BY ADMIN
    static async deleteUser(userId) {
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

module.exports = AdminUserService;
