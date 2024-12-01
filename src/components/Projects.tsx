import { type FC } from 'react'

interface ProjectsProps {
  title?: string
  subtitle?: string
  filter?: 'all' | 'active' | 'completed'
  projects: any[]
}

export const Projects: FC<ProjectsProps> = ({
  title,
  subtitle,
  filter = 'all',
  projects,
}) => {
  return (
    <section className='py-16 not-prose'>
      <div className='container mx-auto px-4'>
        {title && (
          <h2 className='text-4xl font-bold text-center mb-4'>{title}</h2>
        )}
        {subtitle && (
          <p className='text-xl text-center text-gray-600 mb-12'>{subtitle}</p>
        )}

        {/* Project grid will be implemented here */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Project cards will be added here */}

          {projects.map((project) => (
            <a key={project.id} href={`/projects/${project.id}`}>
              <img
                width={300}
                height={200}
                className='h-48 w-full object-cover'
                src={project.data.featuredImage}
                alt={project.data.title}
              />
              <h3 className='text-2xl font-bold'>{project.data.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
