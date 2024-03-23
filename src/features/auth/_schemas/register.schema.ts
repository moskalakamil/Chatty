import {TFunction} from "@src/i18n/TFunction";
import {z} from "zod";

function getRegisterSchema(t: TFunction) {
  const schema = z
    .object({
      email: z
        .string({required_error: t("error.required")})
        .email({message: t("error.email")}),
      firstName: z.string({required_error: t("error.required")}),
      lastName: z.string({required_error: t("error.required")}),
      password: z
        .string({required_error: t("error.required")})
        .min(8, t("error.password-min", {count: 8})),
      passwordConfirmation: z
        .string({required_error: t("error.required")})
        .min(8, t("error.password-min", {count: 8})),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t("error.passwordsDoNotMatch"),
      path: ["passwordConfirmation"],
    });
  return schema;
}

export default getRegisterSchema;

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>;
