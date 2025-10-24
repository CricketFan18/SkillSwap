/**
 * Generic schema validation middleware
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns Express middleware
 */
export const validate = (schema) => (req, res, next) => {
  const safeData = schema.safeParse(req.body);
  if (!safeData.success) {
    const errors = safeData.error.issues.map((e) => e.message).join(", ");
    throw new Error(errors);
  }
  req.validatedData = safeData.data;
  next();
};
