import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  tags: {
    Testimonial: {
      render: component('./src/components/Testimonial.astro'),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        author: { type: String },
        role: { type: String },
      },
    },
    Hero: {
      render: component('./src/components/Hero.astro'),
      attributes: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: String },
      },
    },

    Projects: {
      render: component('./src/components/Projects.astro'),
      attributes: {
        title: { type: String },
        subtitle: { type: String },
        filter: { type: String },
      },
    },

    Container: {
      render: component('./src/components/Container.tsx', 'Container'),
      attributes: {
        crop: { type: String },
      },
    },

    VideoPlayer: {
      render: component('./src/components/VideoPlayer.astro'),
      attributes: {
        src: {
          type: String,
          required: true,
        },
        controls: {
          type: Boolean,
          required: false,
        },
        autoplay: {
          type: Boolean,
          required: false,
        },
        loop: {
          type: Boolean,
          required: false,
        },
      },
    },
  },
})
