import chai from "chai";
import chaiHttp from "chai-http";
import chaiJson from "chai-json-schema";
import app from "../config/app/app.js";
import { userSchema } from "./schema/user.schema.js";
import {
  MOCK_USER_SUCCESS,
  MOCK_LIST_USERS,
  MOCK_SIMPLE_USER,
  MOCK_USER_WITHOUT_MIN_AGE,
  MOCK_USER_WITHOUT_AGE,
  MOCK_USER_WITH_INVALID_AGE,
  MOCK_USER_WITHOUT_NAME,
  MOCK_USER_WITHOUT_EMAIL,
  MOCK_USER_WITH_INVALID_EMAIL,
} from "./mocks/user.mock.js";
import * as userModel from "../api/users/user.model.js";

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

describe("Unit Tests - User API", () => {
  describe("GET /users", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return users successfully", async () => {
      jest.spyOn(userModel, "getAll").mockResolvedValue(MOCK_LIST_USERS);

      const res = await chai.request(app.callback()).get("/users");

      expect(res).to.have.status(200);
    });

    it("should handle errors when fetching users", async () => {
      jest.spyOn(userModel, "getAll").mockRejectedValue(new Error("DB error"));

      const res = await chai.request(app.callback()).get("/users");

      expect(res).to.have.status(500);
      expect(res.body).to.deep.equal({
        message: "Erro ao buscar usuários no banco de dados.",
        error: "DB error",
      });
    });

    it("should paginate users correctly", async () => {
      let userIds = [];

      const mockUsers = Array(10)
        .fill()
        .map((_, index) => ({
          nome: `Test User ${index + 1}`,
          email: `test${index + 1}@example.com`,
          idade: 25 + index,
        }));

      const promiseInsert = mockUsers.map(async (newUser) => {
        userIds.push(
          await userModel.insert(newUser.nome, newUser.email, newUser.idade)
        );
      });

      await Promise.all(promiseInsert);

      const res = await chai
        .request(app.callback())
        .get("/users?page=2&pageSize=5");

      expect(res).to.have.status(200);
      expect(res.body.data.length).to.equal(5);
      expect(res.body.data[0].nome).to.equal("Test User 9");
    });
  });

  describe("GET /users/:id", () => {
    it("should return a single user", async () => {
      userModel.getById = jest.fn().mockResolvedValue(MOCK_SIMPLE_USER);

      const res = await chai.request(app.callback()).get("/users/1");
      expect(res).to.have.status(200);
      expect(res.body).to.be.jsonSchema(userSchema);
    });

    it("should return 404 when user not found", async () => {
      userModel.getById = jest.fn().mockResolvedValue(null);

      const res = await chai.request(app.callback()).get("/users/1000");
      expect(res).to.have.status(404);
    });
  });

  describe("POST /users/", () => {
    beforeEach(() => {
      jest.spyOn(userModel, "insert").mockResolvedValue(MOCK_USER_SUCCESS);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should create a user with all infos ok", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_SIMPLE_USER);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property(
        "message",
        "Usuário criado com sucesso!"
      );
    });

    it("should fail validation when idade is less than 18", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITHOUT_MIN_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Idade mínima é 18 anos");
    });

    it("should fail validation when idade is missing", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITHOUT_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Idade é obrigatória");
    });

    it("should fail validation when idade is not a number", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITH_INVALID_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Idade deve ser um número");
    });

    it("should fail validation when nome is missing", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITHOUT_NAME);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Nome é obrigatório");
    });

    it("should fail validation when email is missing", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITHOUT_EMAIL);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Email é obrigatório");
    });

    it("should fail validation when email is invalid", async () => {
      const res = await chai
        .request(app.callback())
        .post("/users/")
        .send(MOCK_USER_WITH_INVALID_EMAIL);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
      expect(res.body.errors).to.include("Email inválido");
    });
  });

  describe("PUT /users/:id", () => {
    const userId = "some-fake-id-for-put-user-testing";

    it("should fail validation when nome is missing", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITHOUT_NAME);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Dados incompletos.");
    });

    it("should fail validation when email is missing", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITHOUT_EMAIL);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Dados incompletos.");
    });

    it("should fail validation when email is invalid", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITH_INVALID_EMAIL);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
    });

    it("should fail validation when idade is missing", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITHOUT_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Dados incompletos.");
    });

    it("should fail validation when idade is invalid", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITH_INVALID_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
    });

    it("should fail validation when age is less than 18", async () => {
      const res = await chai
        .request(app.callback())
        .put(`/users/${userId}`)
        .send(MOCK_USER_WITHOUT_MIN_AGE);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Validação falhou.");
    });
  });

  describe("DELETE /users/:id", () => {
    let createdUserId;

    beforeEach(async () => {
      try {
        createdUserId = await userModel.insert(
          MOCK_SIMPLE_USER.nome,
          MOCK_SIMPLE_USER.email,
          MOCK_SIMPLE_USER.idade
        );
      } catch (error) {
        console.error("Error creating user during delete tests:", error);
      }
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should delete an existing user", async () => {
      const res = await chai
        .request(app.callback())
        .delete(`/users/${createdUserId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Usuário deletado com sucesso."
      );

      const deletedUser = await userModel.getById(createdUserId);
      expect(deletedUser).to.equal(null);
    });

    it("should return 404 error for non-existent user", async () => {
      const res = await chai.request(app.callback()).delete("/users/99");
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Usuário não encontrado.");
    });
  });
});
