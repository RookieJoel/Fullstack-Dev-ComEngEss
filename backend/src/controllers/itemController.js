import { itemFromObject } from "../models/itemModel.js";
import { items } from "../data/items.js";
import { Console } from "console";
import { handleDelete } from "../../../frontend/public/scripts/table.js";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const item = itemFromObject(req.body);
    items.push(item);
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  res.status(200).json(items);
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params; 
    const index = items.findIndex(item => item.id === id);
      items.splice(index, 1);
      return res.status(200).json({ message: "Item deleted successfully." });
  }
  catch (e) {
    console.error(e);
    res.status(400).json({ error: "Bad Request" });
  }
};

/** @type {import("express").RequestHandler} */
export const filterItems = async (req, res) => {
  const { name } = req.body; // Get the filter criteria from the request body


  const filteredItems = items.filter(item => item.name.toLowerCase() === name.toLowerCase()
  );

  res.status(200).json(filteredItems);
};