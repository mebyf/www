import { Image } from 'astro:assets'
import { Fragment } from 'react'

type Props = {
  title: string
  subtitle: string
  image: string
}

export function Hero({ title, subtitle, image }: Props) {
  const titleLines = title?.split?.('\n')
  return (
    <div className='text-center not-prose relative' contentEditable={false}>
      {image && (
        <img
          src={image}
          alt={title}
          height={750}
          width={700}
          className='w-full max-h-[75vh] object-cover rounded-none'
        />
      )}
      <div className='absolute bottom-3 left-1/2 w-full -translate-x-1/2 flex flex-col items-center justify-center'>
        {title && (
          <h1 className='md:text-4xl/[1.5] mb-5 text-2xl/[1.5] text-left inline px-2 font-bold'>
            {titleLines?.map((line, index) => (
              <Fragment key={index}>
                <span
                  key={index}
                  className='bg-blue-500 px-1 text-white py-0.5 rounded-lg'>
                  {line}
                </span>
                {index < titleLines?.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>
        )}
        {subtitle && (
          <div className='text-lg bg-blue-950 rounded px-1 py-0.5 text-white'>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
