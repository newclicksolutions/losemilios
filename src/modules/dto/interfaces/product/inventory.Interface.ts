import { Double } from "typeorm";

export interface InventoryInterface {
  inventory_id: number;
  stock_quantity: number;
  unit_stock_quantity: Double;
}
