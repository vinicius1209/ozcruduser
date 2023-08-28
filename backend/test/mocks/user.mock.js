import { faker } from "@faker-js/faker";

export const MOCK_SIMPLE_USER = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  idade: faker.number.int({ min: 18 }),
};

export const MOCK_LIST_USERS = [
  {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    idade: faker.number.int({ min: 18 }),
  },
  {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    idade: faker.number.int({ min: 18 }),
  },
];

export const MOCK_USER_SUCCESS = {
  message: "Usuário criado com sucesso!",
  userId: faker.number.int({ min: 1 }),
};

export const MOCK_USER_WITHOUT_MIN_AGE = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  idade: faker.number.int({ max: 17 }),
};

export const MOCK_USER_WITHOUT_AGE = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
};

export const MOCK_USER_WITH_INVALID_AGE = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  idade: faker.string.alpha(),
};

export const MOCK_USER_WITHOUT_NAME = {
  email: faker.internet.email(),
  idade: faker.number.int({ max: 17 }),
};

export const MOCK_USER_WITHOUT_EMAIL = {
  nome: faker.person.fullName(),
  idade: faker.number.int({ max: 17 }),
};

export const MOCK_USER_WITH_INVALID_EMAIL = {
  nome: faker.person.fullName(),
  idade: faker.number.int({ max: 17 }),
  email: "wrongemail",
};
