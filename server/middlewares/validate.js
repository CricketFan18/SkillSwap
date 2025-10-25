/**
 * Generic schema validation middleware, supporting partial validation for PATCH requests.
 * @param {ZodSchema} schema - Zod schema to validate against (full schema).
 * @returns Express middleware
 */
export const validate = (schema) => (req, res, next) => {
  let validationSchema = schema;
  if (req.method === 'PATCH') {
    validationSchema = schema.partial();
  }
  const safeData = validationSchema.safeParse(req.body);
  if (!safeData.success) {
    const errors = safeData.error.issues.map((e) => e.message).join(", ");
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  req.validatedData = safeData.data;
  next();
};