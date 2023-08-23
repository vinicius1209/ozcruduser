import Joi from "joi";

const userSchema = Joi.object({
  nome: Joi.string().required().messages({
    "string.empty": "Nome é obrigatório",
    "any.required": "Nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "string.empty": "Email é obrigatório",
    "any.required": "Email é obrigatório",
  }),
  idade: Joi.number().integer().min(18).required().messages({
    "number.base": "Idade deve ser um número",
    "number.empty": "Idade é obrigatória",
    "number.min": "Idade mínima é {#limit} anos",
    "any.required": "Idade é obrigatória",
  }),
});

export { userSchema };
