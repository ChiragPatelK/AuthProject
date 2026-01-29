const db = require("../models");

exports.getMe = async (req, res) => {
    try {
        // req.user is set by auth middleware
        const userId = req.user.id;

        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            name: user.name,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch user",
        });
    }
};

exports.updateMe = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    const t = await db.sequelize.transaction();

    try {
        // 1️⃣ Find user
        const user = await db.User.findByPk(userId, { transaction: t });

        if (!user) {
            await t.rollback();
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;

        await user.save({ transaction: t });

        await t.commit();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        await t.rollback();

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "Email already in use",
            });
        }

        return res.status(500).json({
            message: "Failed to update profile",
        });
    }
};

exports.deleteMe = async (req, res) => {
    const userId = req.user.id;

    const t = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(userId, { transaction: t });

        if (!user) {
            await t.rollback();
            return res.status(404).json({
                message: "User not found",
            });
        }

        await user.destroy({ transaction: t });

        await t.commit();

        return res.status(200).json({
            message: "Account deleted successfully",
        });
    } catch (error) {
        await t.rollback();

        return res.status(500).json({
            message: "Failed to delete account",
        });
    }
};