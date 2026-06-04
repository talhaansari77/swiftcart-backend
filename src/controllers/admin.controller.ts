import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";

export const getAdminStats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const salesResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalSales = salesResult[0]?.totalSales || 0;

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalSales,
      recentOrders,
    });
  }
);