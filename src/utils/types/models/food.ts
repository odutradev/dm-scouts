export interface FoodMealsType {
    items: string[];
    time: string;
};

export interface FoodModelType {
    meals: FoodMealsType[];
    spaceID: string;
    userID: string;
    createAt: Date;
    _id: string;
    date: Date;
};

//bonfire-api version: 1.3.9