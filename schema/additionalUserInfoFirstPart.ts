import { z } from "zod";

export const additionalUserInfoFirstPart = z.object({
  name: z
    .string()
    .min(2, "SCHEMA.NAME.SHORT")
    .refine((name) => /^[a-zA-Z\s'-]+$/.test(name), {
      message: "SCHEMA.NAME.INVALID_CHARS",
    })
    .optional(),

  surname: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "SCHEMA.USERNAME.SPECIAL_CHARS",
    })
    .optional(),
});

export type AdditionalUserInfoFirstPart = z.infer<
  typeof additionalUserInfoFirstPart
>;
