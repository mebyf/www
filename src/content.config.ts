// @ts-ignore
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  posts,
  pages: defineCollection({
    loader: glob({
      pattern: ['**/[^_]*.(mdoc|yaml)'],
      base: 'src/content/pages',
    }),
  }),
};
