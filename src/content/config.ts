import { defineCollection, z } from "astro:content";

const contentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z
    .string()
    .or(z.date())
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  public: z.boolean().default(true),
});

const createCollection = () =>
  defineCollection({
    schema: contentSchema,
  });

export const collections = {
  blog: createCollection(),
  works: createCollection(),
  projects: createCollection(),
};