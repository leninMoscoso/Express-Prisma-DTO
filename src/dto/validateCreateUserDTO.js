import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import addKeywords from 'ajv-keywords'

const createUserDtoSchema = Type.Object(
  {
    name: Type.String({
      minLength: 3,
      transform: ["trim"],
      errorMessage: { minLength: "Debe tener no menos de 3 caracteres" },
    }),
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El tipo de email debe ser un string",
        format: "email debe contener un correo electronico valido",
      },
    }),
    password: Type.String({
      minLength: 8,
      errorMessage: {
        type: "El tipo password deber ser un string",
        minLength: "Debe tener no menos de 8 caracteres",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es valido",
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv);
addKeywords(ajv, ["transform"]);
const validate = ajv.compile(createUserDtoSchema);

const validateCreateUserDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateCreateUserDTO;
