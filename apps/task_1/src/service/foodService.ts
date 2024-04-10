import { foodInventory } from "../mock/foodData";

// Function to simulate data retrieval with a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function 1: Returns a food list
export const func1 = async () => {
  await delay(115);
  return foodInventory.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
  }));
};

// Function 2: Returns food available locations
export const func2 = async () => {
  await delay(2 * 60 * 1000); // 2 minutes
  return foodInventory.map((item: any) => ({
    id: item.id,
    locations: item.locations,
  }));
};

// Function 3: Returns food nutritional information
export const func3 = async () => {
  await delay(300);
  return foodInventory.map((item: any) => ({
    id: item.id,
    nutritionalInfo: item.nutritionalInfo,
  }));
};

// Function 4: Returns stock-out foods
export const func4 = async () => {
  await delay(100);
  return foodInventory.map((item: any) => ({
    id: item.id,
    stockOut: item.stockOut,
  }));
};
