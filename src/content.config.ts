// @ts-ignore
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
  }),
})

const navigationSchema = z.object({
  logo: z.object({
    logoType: z.object({
      discriminant: z.enum(['image', 'text']),
      value: z.object({
        sources: z.array(
          z.object({
            image: z.string(),
            media: z.string(),
            width: z.number(),
            height: z.number(),
            darkModeImage: z.optional(z.string()),
          })
        ),
        fallback: z.object({
          image: z.string(),
          width: z.number(),
          height: z.number(),
          darkModeImage: z.optional(z.string()),
        }),
        text: z.optional(
          z.object({
            content: z.string(),
            fallbackFontSize: z.number(),
          })
        ),
      }),
    }),
  }),
  items: z.array(
    z.object({
      label: z.string(),
      link: z.optional(z.string()),
      isExternal: z.optional(z.boolean()),
      isActive: z.optional(z.boolean()),
      isCTA: z.optional(z.boolean()),
      color: z.optional(
        z.enum([
          'default',
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
        ])
      ),
      variant: z.optional(
        z.enum([
          'flat',
          'ghost',
          'shadow',
          'solid',
          'bordered',
          'light',
          'faded',
        ])
      ),
      children: z.optional(z.array(z.any())),
    })
  ),
})

const navigation = defineCollection({
  loader: glob({
    pattern: ['**/[^_]*.json'],
    base: 'src/content/navigation',
  }),
  schema: navigationSchema,
})

export type NavigationI = z.infer<typeof navigationSchema>

const pagesSchema = z.any()

export const collections = {
  posts,
  pages: defineCollection({
    loader: glob({
      pattern: ['**/[^_]*.(mdoc|yaml)'],
      base: 'src/content/pages',
    }),
    schema: pagesSchema,
  }),
  navigation,
}
