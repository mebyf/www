import { block, wrapper } from '@keystatic/core/content-components'
import { fields } from '@keystatic/core'
import { HeroClient } from '@/components/Hero'

export const components = {
  // Content components here
  Testimonial: wrapper({
    label: 'Testimonial',
    schema: {
      author: fields.text({ label: 'Author' }),
      role: fields.text({ label: 'Role' }),
    },
  }),
  Hero: wrapper({
    label: 'Hero',
    schema: {
      title: fields.text({ label: 'Title', multiline: true }),
      subtitle: fields.text({
        label: 'Subtitle',
        multiline: true,
      }),
      image: fields.image({
        label: 'Image',
        directory: 'src/assets/images/pages',
        publicPath: '/src/assets/images/pages/',
      }),
    },
    ContentView(props) {
      const { image, ...otherProps } = props.value
      if (!image) {
        return <></>
      }

      // (1)
      const blob = new Blob([image.data], { type: 'image/jpeg' })

      // (2)
      const url = URL.createObjectURL(blob)

      return <HeroClient {...otherProps} image={url} />
    },
  }),

  Container: wrapper({
    label: 'Container',
    schema: {
      crop: fields.select({
        label: 'Crop',
        description: 'Max width container and options',
        options: [
          { label: 'normal', value: 'normal' },
          { label: 'narrow', value: 'narrow' },
          { label: 'narrower', value: 'narrower' },
          { label: 'bleed', value: 'bleed' },
          { label: 'boxed', value: 'boxed' },
          { label: 'narrow-boxed', value: 'narrow-boxed' },
        ],
        defaultValue: 'normal',
      }),
    },
  }),

  Projects: wrapper({
    label: 'Projects Section',
    schema: {
      title: fields.text({ label: 'Title' }),
      subtitle: fields.text({ label: 'Subtitle' }),
      filter: fields.select({
        label: 'Filter',
        description: 'Filter projects by type',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Completed', value: 'completed' },
        ],
        defaultValue: 'all',
      }),
    },
  }),

  VideoPlayer: block({
    label: 'Video Player',
    description: 'Upload a video',
    schema: {
      src: fields.file({
        label: 'Video file',
        description: 'Select a video file',
        directory: 'src/assets/videos/',
        publicPath: '/videos/',
      }),
      controls: fields.checkbox({
        label: 'Controls',
        description: 'Show video controls',
        defaultValue: false,
      }),
      autoplay: fields.checkbox({
        label: 'Autoplay',
        description: 'Enable autoplay (will mute the video)',
        defaultValue: false,
      }),
      loop: fields.checkbox({
        label: 'Loop',
        description: 'Enable looping',
        defaultValue: false,
      }),
    },
  }),
}
