import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/**/',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/pages',
              publicPath: '@assets/images/pages/',
            },
          },
        }),
        body: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/pages',
              publicPath: '@assets/images/pages/',
            },
          },
        }),
      },
    }),

    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/**/',
      format: { contentField: 'content' },
      // entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/pages',
              publicPath: '@assets/images/pages/',
            },
          },
        }),

        links: fields.blocks(
          {
            url: {
              label: 'URL',

              schema: fields.text({
                label: 'Test',
                validation: {
                  pattern: {
                    regex:
                      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  },
                },
              }),
              itemLabel(props) {
                return props.value ?? 'No URL selected'
              },
            },
          },
          { label: 'Links', description: 'Links to pages or URLs' }
        ),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: 'Home',
      path: 'src/content/pages/home/',
      schema: {
        heading: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label: 'Heading (note: text that is bolded will show up in red)',
        }),
      },
    }),
    about: singleton({
      label: 'About',
      path: 'src/content/pages/about/',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          // componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
})
