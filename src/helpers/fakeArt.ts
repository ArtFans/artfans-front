import { faker } from '@faker-js/faker';

const fakeArt = () => ({
  id: faker.database.mongodbObjectId(),
  owner_id: `${faker.internet.userName()}.near`.toLowerCase(),
  name: faker.name.fullName(),
  metadata: {
    media: faker.image.image(400, 400),
    date: faker.date.past()
  }
});

export default fakeArt;
