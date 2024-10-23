import { z } from 'zod';

export const createPlannerSchema = z.object({
  name: z.string().min(3),
});
