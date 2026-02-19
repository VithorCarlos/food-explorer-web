import { faker } from "@faker-js/faker";

function createRandomFood() {
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

function createRandomTags() {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.product(),
  };
}

export const tags = faker.helpers.multiple(createRandomTags, {
  count: 5,
});
