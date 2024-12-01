import { localesObject } from '@/i18n/ui'
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { Dropdown } from '@nextui-org/react'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { Globe } from 'lucide-react'

export const LocaleSwitcherClient = ({
  path,
  locale,
}: {
  path: string
  locale: string
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='light' size='sm'>
          <Globe className='w-4 h-4' /> {localesObject[locale as 'en' | 'es']}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {Object.entries(localesObject).map(([lang, label]) => (
          <DropdownItem key={lang} href={getRelativeLocaleUrl(lang, path)}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
