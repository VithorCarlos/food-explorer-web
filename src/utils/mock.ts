import { FoodPropsDTO, TagsPropsDTO } from "@/dto/food.dto";
import { faker } from "@faker-js/faker";

function createRandomFood(): FoodPropsDTO {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.product(),
    imageUrl: faker.image.urlPicsumPhotos(),
    description: faker.lorem.text(),
    price: Number(faker.commerce.price({ min: 10, max: 20 })),
  };
}

export const foodData = faker.helpers.multiple(createRandomFood, {
  count: 10,
});

function createRandomTags(): TagsPropsDTO {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.product(),
  };
}

export const tags = faker.helpers.multiple(createRandomTags, {
  count: 5,
});

export const foodCategories = [
  {
    key: "main_dishes",
    title: "Pratos Principais",
  },
  {
    key: "pizzas_and_sandwiches",
    title: "Pizzas e Sanduíches",
  },
  {
    key: "desserts",
    title: "Sobremesas",
  },
  {
    key: "drinks",
    title: "Bebidas",
  },
  {
    key: "japanese_food",
    title: "Comida Japonesa",
  },
  {
    key: "mexican_food",
    title: "Comida Mexicana",
  },
  {
    key: "healthy_food",
    title: "Comida Saudável",
  },
  {
    key: "arabic_food",
    title: "Comida Árabe",
  },
].sort((a, b) => {
  return a.title.toLowerCase().localeCompare(b.title.toLowerCase(), "pt-BR");
});
