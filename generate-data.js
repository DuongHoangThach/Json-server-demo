const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Set locale to use Vietnamese
faker.locale = 'vi';

// Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.datatype.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.fullName());

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  // loops and push the category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random Data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.color.human(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }

  return productList;
};

// IFFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Thạch',
    },
  };

  // write db object to db.json file
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('write data successfully');
  });
})();
