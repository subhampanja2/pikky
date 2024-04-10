const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random nutritional information
const generateNutritionalInfo = () => {
    return {
        calories: randomInRange(100, 500),
        fat: randomInRange(5, 20),
        carbohydrates: randomInRange(20, 100),
        protein: randomInRange(5, 30),
    };
};

// Generate random food list with details
const generateFoodList = () => {
    const foodInventory: any = [];
    const numFoodItems = randomInRange(5, 10);
    for (let i = 1; i <= numFoodItems; i++) {
        const foodItem = {
            id: i,
            name: `Food ${i}`,
            description: `Description of Food ${i}`,
            price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
            locations: ['Location 1', 'Location 2', 'Location 3'],
            nutritionalInfo: generateNutritionalInfo(),
            stockOut: Math.random() < 0.5
        };
        foodInventory.push(foodItem);
    }
    return foodInventory;
};

// Static food list with details
export const foodInventory = generateFoodList();