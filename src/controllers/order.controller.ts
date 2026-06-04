import { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order.model";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const calculatePrices = (itemsPrice: number) => {
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return {
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export const createOrder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new ApiError(401, "Not authorized");
    }

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      throw new ApiError(400, "No order items provided");
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      throw new ApiError(400, "Complete shipping address is required");
    }

    const preparedOrderItems = await Promise.all(
      orderItems.map(
        async (item: { product: string; quantity: number }) => {
          const product = await Product.findById(item.product);

          if (!product) {
            throw new ApiError(404, `Product not found: ${item.product}`);
          }

          if (product.stock < item.quantity) {
            throw new ApiError(
              400,
              `${product.name} does not have enough stock`
            );
          }

          return {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
          };
        }
      )
    );

    const itemsPrice = Number(
      preparedOrderItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );

    const { shippingPrice, taxPrice, totalPrice } = calculatePrices(itemsPrice);

    const order = await Order.create({
      user: req.user._id,
      orderItems: preparedOrderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    await Promise.all(
      preparedOrderItems.map(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: {
            stock: -item.quantity,
          },
        });
      })
    );

    res.status(201).json(order);
  }
);

export const getMyOrders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new ApiError(401, "Not authorized");
    }

    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  }
);

export const getOrderById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new ApiError(401, "Not authorized");
    }

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new ApiError(403, "Not authorized to view this order");
    }

    res.status(200).json(order);
  }
);

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body;

    const allowedStatuses: OrderStatus[] = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(400, "Invalid order status");
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.status = status;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    if (status === "Cancelled") {
      order.isDelivered = false;
      order.deliveredAt = undefined;
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }
);

export const markOrderAsPaid = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.isPaid = true;
    order.paidAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }
);