import { userSchema } from "./user.validation.js";
import {
  getAll,
  insert,
  getById,
  deleteById,
  update,
  entityExistis,
} from "./user.model.js";

async function getAllUsers(ctx) {
  try {
    const page = parseInt(ctx.request.query.page, 10) || 1;
    const pageSize = parseInt(ctx.request.query.pageSize, 10) || 10;

    const offset = (page - 1) * pageSize;

    const users = await getAll(pageSize, offset);
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: "Erro ao buscar usuários no banco de dados.",
      error: err.message,
    };
  }
}

async function getUser(ctx) {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      message: "ID do usuário é necessário.",
    };
    return;
  }

  try {
    const user = await getById(id);
    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: "Usuário não encontrado.",
      };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: "Erro ao buscar usuário no banco de dados.",
      error: err.message,
    };
  }
}

async function addUser(ctx) {
  const validationResult = userSchema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.status = 400;
    ctx.body = {
      message: "Validação falhou.",
      errors: validationResult.error.details.map((detail) => detail.message),
    };
    return;
  }

  const { nome, email, idade } = validationResult.value;

  try {
    const userId = await insert(nome, email, idade);
    ctx.status = 201;
    ctx.body = {
      message: "Usuário criado com sucesso!",
      userId,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: "Erro ao inserir usuário no banco de dados.",
      error: err.message,
    };
  }
}

async function deleteUser(ctx) {
  const { id } = ctx.params;

  try {
    // Verificar se o usuário existe
    const exists = await entityExistis(id);
    if (!exists) {
      ctx.status = 404;
      ctx.body = {
        message: "Usuário não encontrado.",
      };
      return;
    }

    await deleteById(id);
    ctx.status = 200;
    ctx.body = {
      message: "Usuário deletado com sucesso.",
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: "Erro ao deletar usuário.",
      error: err.message,
    };
  }
}

async function editUser(ctx) {
  const { id } = ctx.params;

  const { nome, email, idade } = ctx.request.body;

  if (!id || !nome || !email || typeof idade === "undefined") {
    ctx.status = 400;
    ctx.body = {
      message: "Dados incompletos.",
    };
    return;
  }

  const validationResult = userSchema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.status = 400;
    ctx.body = {
      message: "Validação falhou.",
      errors: validationResult.error.details.map((detail) => detail.message),
    };
    return;
  }


  try {
    // Verificar se o usuário existe
    const exists = await entityExistis(id);
    if (!exists) {
      ctx.status = 404;
      ctx.body = {
        message: "Usuário não encontrado.",
      };
      return;
    }

    await update({
      id,
      nome,
      email,
      idade,
    });
    ctx.status = 200;
    ctx.body = {
      message: "Usuário atualizado com sucesso.",
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: "Erro ao atualizar usuário.",
      error: err.message,
    };
  }
}

export { getAllUsers, getUser, addUser, deleteUser, editUser };
