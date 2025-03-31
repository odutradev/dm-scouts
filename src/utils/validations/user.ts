import * as yup from "yup";

export const UserAuthSchema = yup.object().shape({
  username: yup
    .string()
    .required("Identificador é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "A senha deve ter no mínimo 4 caracteres")
});