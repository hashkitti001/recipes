type RecipeItemProps = {
    name: string;
    duration: number;
    servings: number;
    calories: number;
    imgURL: string;
}
const featuredRecipes: Array<RecipeItemProps> = [
    {
        "name": "Boiled Yam",
        "duration": 123,
        "servings": 4,
        "calories": 79,
        "imgURL": "https://i.pinimg.com/564x/27/60/4a/27604a7106b6d1211a28f576576906f7.jpg"
    },
    {
        "name": "Spaghetti Bolognese",
        "duration": 45,
        "servings": 3,
        "calories": 560,
        "imgURL": "https://i.pinimg.com/control/564x/a6/6a/03/a66a0333b456e02fd18b2bfdf6dc8529.jpg"
    },
    {
        "name": "Grilled Chicken Salad",
        "duration": 30,
        "servings": 2,
        "calories": 350,
        "imgURL": "https://i.pinimg.com/564x/c1/16/46/c11646a428c4232d0e62aacaefd2c91b.jpg"
    },
    {
        "name": "Vegetable Stir Fry",
        "duration": 25,
        "servings": 4,
        "calories": 220,
        "imgURL": "https://i.pinimg.com/564x/bc/ec/8c/bcec8c25ce2ef677397cbdf956ab6ec2.jpg"
    },
    {
        "name": "Tuna Sandwich",
        "duration": 15,
        "servings": 1,
        "calories": 280,
        "imgURL": "https://i.pinimg.com/control/564x/54/25/79/542579e72fa94d8f17f9c8c43c3a9efa.jpg"
    },
    {
        "name": "Beef Tacos",
        "duration": 35,
        "servings": 5,
        "calories": 400,
        "imgURL": "https://i.pinimg.com/control/564x/78/0d/1d/780d1d277113b6fc7db6ff6b0c99b402.jpg"
    },
 
];

export default featuredRecipes;
