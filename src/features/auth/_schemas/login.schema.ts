import {TFunction} from "@src/i18n/TFunction";
import {z} from "zod";

function getLoginSchema(t: TFunction) {
  const schema = z.object({
    email: z
      .string({required_error: t("error.required")})
      .email(t("error.email")),
    password: z
      .string({required_error: t("error.required")})
      .min(8, t("error.password-min", {count: 8})),
  });
  return schema;
}
export default getLoginSchema;

export type LoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;
