import { z } from 'zod';

export const addPlannerValidation = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name is too long' }),
});
