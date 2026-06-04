import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const getProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { search, category, brand, minPrice, maxPrice } = req.query;

    const query: Record<string, unknown> = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        (query.price as Record<string, number>).$gte = Number(minPrice);
      }

      if (maxPrice) {
        (query.price as Record<string, number>).$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json(products);
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json(product);
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, image, category, brand, stock } = req.body;

    if (!name || !description || price === undefined || !image || !category || !brand) {
      throw new ApiError(
        400,
        "Please provide name, description, price, image, category, and brand"
      );
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      brand,
      stock: stock ?? 0,
    });

    res.status(201).json(product);
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const { name, description, price, image, category, brand, stock } = req.body;

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.stock = stock ?? product.stock;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  }
);