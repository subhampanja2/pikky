import { Request, Response } from "express";
import { func1, func2, func3, func4 } from "../service/foodService";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    // Call all four functions concurrently
    const [foodList, locations, nutritionalInfo, stockOutFoods] =
      await Promise.all([func1(), func2(), func3(), func4()]);

    // Prepare response data by merging the results
    const data = foodList.map((food: any) => ({
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      locations: locations?.filter((location: any) => location.id === food.id),
      nutritionalInfo: nutritionalInfo?.filter(
        (info: any) => info.id === food.id
      ),
      stockOut: stockOutFoods?.filter((stock: any) => stock.id === food.id),
    }));

    // Calculate pagination details
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);

    // Extract items for the current page
    const currentPageData = data.slice(startIndex, endIndex);

    // Construct pagination URLs
    const prevPage =
      page > 1 ? `${req.baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
    const nextPage =
      page < totalPages
        ? `${req.baseUrl}?page=${page + 1}&perPage=${perPage}`
        : null;

    // Prepare response object
    const foodDetails = {
      data: currentPageData,
      meta: {
        totalFood: totalItems,
        pagination: {
          page,
          perPage,
          prevPage,
          nextPage,
        },
      },
      status_code: 200,
    };

    // Return merged data as JSON response
    res.json(foodDetails).status(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
