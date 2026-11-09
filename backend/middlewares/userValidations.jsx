const { body } = require("express-validator");
const userCreateValidation = () => {
  return [
    body("name").notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("Por favor, insira um email válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("As senhas não conferem");
      }
      return true;
    }),
  ];
};
const loginValidation = () => {
  return [
    body("email").isEmail().withMessage("Por favor, insira um email válido"),
    body("password").notEmpty().withMessage("A senha é obrigatória"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Por favor, insira um email válido"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres"),
    body("confirmPassword")
      .optional()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não conferem");
        }
        return true;
      }),
  ];
};

module.exports = {
  loginValidation,
  userCreateValidation,
  userUpdateValidation,
};
