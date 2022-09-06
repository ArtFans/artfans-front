import { faker } from '@faker-js/faker';

const fakeUser = () => ({
  avatarUrl: faker.internet.avatar(),
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  username: `${faker.internet.userName()}.near`.toLowerCase(),
  isFollowing: faker.datatype.boolean(),
  nfts: faker.datatype.number({ min: 0, max: 1000 }),
  collections: faker.datatype.number({ min: 0, max: 100 }),
  followers: faker.datatype.number({ min: 0, max: 5000 })
});

export default fakeUser;
