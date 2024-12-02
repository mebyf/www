import { components } from '@/keystatic/components'
import { collection, config, fields, singleton } from '@keystatic/core'
import { KEYSTATIC_STORAGE_KIND } from 'astro:env/client'
import './src/styles.css'

const navigationConfig = collection({
  label: 'Navigation',
  slugField: 'name',
  path: 'src/content/navigation/**/',
  format: 'json',
  schema: {
    name: fields.text({
      label: 'Name',
    }),
    logo: fields.object({
      logoType: fields.conditional(
        fields.select({
          label: 'Logo Type',
          options: [
            { label: 'Image Logo', value: 'image' },
            { label: 'Text Logo', value: 'text' },
          ],
          defaultValue: 'image',
        }),
        {
          image: fields.object({
            sources: fields.array(
              fields.object({
                media: fields.text({
                  label: 'Media Query',
                  description: 'e.g., (max-width: 768px)',
                }),
                image: fields.image({
                  label: 'Logo Image',
                  directory: 'public/images/logo',
                  publicPath: '/images/logo/',
                }),
                darkModeImage: fields.image({
                  label: 'Dark Mode Logo',
                  directory: 'public/images/logo',
                  publicPath: '/images/logo/',
                }),
                width: fields.number({
                  label: 'Logo Width (px)',
                }),
                height: fields.number({
                  label: 'Logo Height (px)',
                }),
              }),
              {
                label: 'Responsive Logo Sources',
                itemLabel: (props) => props.fields.media.value || 'Default',
              }
            ),
            fallback: fields.object({
              image: fields.image({
                label: 'Fallback Logo Image',
                directory: 'public/images/logo',
                publicPath: '/images/logo/',
              }),
              darkModeImage: fields.image({
                label: 'Fallback Dark Mode Logo',
                directory: 'public/images/logo',
                publicPath: '/images/logo/',
              }),
              width: fields.number({
                label: 'Fallback Logo Width (px)',
                defaultValue: 120,
              }),
              height: fields.number({
                label: 'Fallback Logo Height (px)',
                defaultValue: 40,
              }),
            }),
          }),
          text: fields.object({
            content: fields.text({
              label: 'Default Logo Text',
            }),
            responsiveText: fields.array(
              fields.object({
                media: fields.text({
                  label: 'Media Query',
                  description: 'e.g., (max-width: 768px)',
                }),
                content: fields.text({
                  label: 'Text Content',
                }),
                fontSize: fields.number({
                  label: 'Font Size (px)',
                }),
              }),
              {
                label: 'Responsive Text Variants',
                itemLabel: (props) => props.fields.media.value || 'Default',
              }
            ),
            fallbackFontSize: fields.number({
              label: 'Default Font Size (px)',
              defaultValue: 24,
            }),
          }),
        }
      ),
      link: fields.text({
        label: 'Logo Link',
        defaultValue: '/',
      }),
      position: fields.select({
        label: 'Logo Position',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
        ],
        defaultValue: 'left',
      }),
    }),
    items: fields.array(
      fields.object({
        label: fields.text({ label: 'Label' }),
        link: fields.text({ label: 'Link' }),
        isExternal: fields.checkbox({
          label: 'External Link',
          defaultValue: false,
        }),
        isCTA: fields.checkbox({
          label: 'Is Call to Action',
          defaultValue: false,
        }),
        ctaStyle: fields.select({
          label: 'CTA Style',
          options: [
            { label: 'Primary Button', value: 'primary' },
            { label: 'Secondary Button', value: 'secondary' },
            { label: 'Outlined Button', value: 'outlined' },
            { label: 'Text Button', value: 'text' },
          ],
          defaultValue: 'primary',
          // visibility: (fields) => fields.isCTA.value,
        }),
        children: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            link: fields.text({ label: 'Link' }),
            isExternal: fields.checkbox({
              label: 'External Link',
              defaultValue: false,
            }),
            isCTA: fields.checkbox({
              label: 'Is Call to Action',
              defaultValue: false,
            }),
            ctaStyle: fields.select({
              label: 'CTA Style',
              options: [
                { label: 'Primary Button', value: 'primary' },
                { label: 'Secondary Button', value: 'secondary' },
                { label: 'Outlined Button', value: 'outlined' },
                { label: 'Text Button', value: 'text' },
              ],
              defaultValue: 'primary',
              // visibility: (fields) => fields.isCTA.value,
            }),
          }),
          {
            label: 'Dropdown Items',
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      }),
      {
        label: 'Navigation Items',
        itemLabel: (props) => props.fields.label.value,
      }
    ),
  },
})

const footerConfig = collection({
  label: 'Footer',
  slugField: 'id',
  path: 'src/content/footer/**/',
  format: 'json',
  schema: {
    id: fields.text({
      label: 'ID',
    }),
    logo: fields.conditional(
      fields.select({
        label: 'Footer Logo',
        options: [
          { label: 'No Logo', value: 'none' },
          { label: 'Image Logo', value: 'image' },
          { label: 'Text Logo', value: 'text' },
        ],
        defaultValue: 'none',
      }),
      {
        none: fields.empty(),
        image: fields.object({
          image: fields.image({
            label: 'Logo Image',
            directory: 'public/images/footer',
            publicPath: '/images/footer/',
          }),
          darkModeImage: fields.image({
            label: 'Dark Mode Logo',
            directory: 'src/assets/images/footer',
            publicPath: '@assets/images/footer/',
          }),
          width: fields.number({
            label: 'Width (px)',
            defaultValue: 120,
          }),
          height: fields.number({
            label: 'Height (px)',
            defaultValue: 40,
          }),
        }),
        text: fields.object({
          text: fields.text({ label: 'Logo Text' }),
          fontSize: fields.number({
            label: 'Font Size (px)',
            defaultValue: 24,
          }),
        }),
      }
    ),
    columns: fields.array(
      fields.object({
        title: fields.text({ label: 'Column Title' }),
        content: fields.conditional(
          fields.select({
            label: 'Column Type',
            options: [
              { label: 'Links', value: 'links' },
              { label: 'Text Content', value: 'text' },
              { label: 'Social Links', value: 'social' },
            ],
            defaultValue: 'links',
          }),
          {
            links: fields.array(
              fields.object({
                label: fields.text({ label: 'Link Label' }),
                link: fields.text({ label: 'URL' }),
                isExternal: fields.checkbox({
                  label: 'External Link',
                  defaultValue: false,
                }),
              }),
              {
                label: 'Links',
                itemLabel: (props) => props.fields.label.value,
              }
            ),
            text: fields.text({
              label: 'Text Content',
              multiline: true,
            }),
            social: fields.array(
              fields.object({
                platform: fields.select({
                  label: 'Platform',
                  options: [
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                  defaultValue: 'twitter',
                }),
                url: fields.text({ label: 'URL' }),
                icon: fields.image({
                  label: 'Custom Icon (Optional)',
                  directory: 'src/assets/images/social',
                  publicPath: '@assets/images/social/',
                }),
              }),
              {
                label: 'Social Links',
                itemLabel: (props) => props.fields.platform.value,
              }
            ),
          }
        ),
      }),
      {
        label: 'Footer Columns',
        itemLabel: (props) => props.fields.title.value,
      }
    ),
    bottomSection: fields.object({
      copyright: fields.text({
        label: 'Copyright Text',
        defaultValue: '© 2024 Your Company. All rights reserved.',
      }),
      links: fields.array(
        fields.object({
          label: fields.text({ label: 'Link Label' }),
          url: fields.text({ label: 'URL' }),
        }),
        {
          label: 'Bottom Links',
          itemLabel: (props) => props.fields.label.value,
        }
      ),
    }),
  },
})

const projectsCollection = collection({
  label: 'Projects',
  slugField: 'title',
  path: 'src/content/projects/**/',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    description: fields.text({ label: 'Description', multiline: true }),
    featuredImage: fields.image({
      label: 'Featured Image',
      directory: 'src/assets/images/projects',
      publicPath: '@assets/images/projects/',
    }),
    images: fields.array(fields.image({
      label: 'Image',
      directory: 'src/assets/images/projects',
      publicPath: '@assets/images/projects/',
    })),
    location: fields.text({ label: 'Location' }),
    stage: fields.select({
      label: 'Stage',
      options: [
        { label: 'Request', value: 'request' },
        { label: 'Proposal', value: 'proposal' },
        { label: 'Execution', value: 'execution' },
        { label: 'Close-out', value: 'close-out' },
      ],
      defaultValue: 'request',
    }),
    tags: fields.array(fields.text({ label: 'Tag' }), {
      label: 'Project Tags',
      itemLabel: (props) => props.value,
    }),
    url: fields.text({ label: 'Project URL' }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/images/projects',
          publicPath: '@assets/images/projects/',
        },
      },
    }),
    relatedProjects: fields.array(fields.relationship({
      label: 'Related Project',
      collection: 'projects',
    })),
  },
})

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    kind: KEYSTATIC_STORAGE_KIND,
    repo: {
      owner: 'mebyf',
      name: 'www',
    },
  },

  // ui: {
  //   navigation: {
  //     Content: ['pages', 'posts'],
  //     // Settings: ['site', 'seo'],
  //   },
  // },
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
          components: components,
        }),
      },
    }),

    navigation: navigationConfig,

    footer: footerConfig,

    projects: projectsCollection,
  },
})
