import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import type { NavigationI } from '@/content.config'
import { getRelativeLocaleUrl } from 'astro:i18n'

export default function NavbarClient({
  locale,
  logo,
  items,
  localeSwitcher,
}: NavigationI & { locale: string; localeSwitcher?: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const isImageLogo = logo?.logoType.discriminant === 'image'
  const image = logo.logoType.value

  const ctas = items.filter((item) => item.isCTA)
  const links = items.filter((item) => !item.isCTA)

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <Link href={getRelativeLocaleUrl(locale, '/')}>
          <NavbarBrand>
            {isImageLogo ? (
              <picture>
                {image?.sources?.map((source) => (
                  <source
                    media={source?.media}
                    srcSet={`${source?.image} 1x, ${source?.darkModeImage} 1x`}
                    width={source?.width}
                    height={source?.height}
                  />
                ))}
                <img
                  src={image?.fallback?.image}
                  alt='Logo'
                  width={image?.fallback?.width}
                  height={image?.fallback?.height}
                  className='block dark:hidden'
                />
                <img
                  src={image?.fallback?.darkModeImage}
                  alt='Logo'
                  width={image?.fallback?.width}
                  height={image?.fallback?.height}
                  className='hidden dark:block'
                />
              </picture>
            ) : (
              <span
                style={{
                  fontSize: `${logo?.logoType?.value?.text?.fallbackFontSize}px`,
                }}
                className='text-gray-900 dark:text-white'>
                {logo?.logoType?.value?.text?.content}
              </span>
            )}
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <Link href={getRelativeLocaleUrl(locale, '/')}>
          <NavbarBrand>
            {isImageLogo ? (
              <picture>
                {image?.sources?.map((source) => (
                  <source
                    media={source?.media}
                    srcSet={`${source?.image} 1x, ${source?.darkModeImage} 1x`}
                    width={source?.width}
                    height={source?.height}
                  />
                ))}
                <img
                  src={image?.fallback?.image}
                  alt='Logo'
                  width={image?.fallback?.width}
                  height={image?.fallback?.height}
                  className='block dark:hidden'
                />
                <img
                  src={image?.fallback?.darkModeImage}
                  alt='Logo'
                  width={image?.fallback?.width}
                  height={image?.fallback?.height}
                  className='hidden dark:block'
                />
              </picture>
            ) : (
              <span
                style={{
                  fontSize: `${logo?.logoType?.value?.text?.fallbackFontSize}px`,
                }}
                className='text-gray-900 dark:text-white'>
                {logo?.logoType?.value?.text?.content}
              </span>
            )}
          </NavbarBrand>
        </Link>

        {links?.map((item) => (
          <NavbarItem key={item.label} isActive={item.isActive}>
            {item.children?.length ? (
              <Dropdown showArrow={false} closeOnSelect isOpen={undefined}>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className='p-0 bg-transparent data-[hover=true]:bg-transparent group'
                    endContent={<ChevronDown />}
                    radius='sm'
                    variant='light'>
                    {item.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className='w-[200px]'
                  itemClasses={{
                    base: [
                      'data-[hover=true]:bg-default-100',
                      'data-[hover=true]:text-default-foreground',
                      'rounded-md',
                    ],
                  }}>
                  {item.children.map((child) => (
                    <DropdownItem
                      key={child.label}
                      href={getRelativeLocaleUrl(locale, child.link)}
                      target={child.isExternal ? '_blank' : undefined}
                      rel={
                        child.isExternal ? 'noopener noreferrer' : undefined
                      }>
                      {child.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                color='foreground'
                href={getRelativeLocaleUrl(locale, item.link)}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                aria-current={item.isActive ? 'page' : undefined}>
                {item.label}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        {localeSwitcher}
        {ctas.length > 0 && (
          <>
            {ctas.map((cta) => (
              <NavbarItem key={cta.label}>
                <Button
                  as={Link}
                  color={cta.color}
                  href={getRelativeLocaleUrl(locale, cta.link)}
                  variant={cta.variant}>
                  {cta.label}
                </Button>
              </NavbarItem>
            ))}
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {links.map((item) => (
          <NavbarMenuItem key={item.label}>
            {item.children?.length ? (
              <div className='flex flex-col gap-2'>
                <Link
                  className='text-sm font-medium text-gray-500'
                  color='foreground'
                  href={getRelativeLocaleUrl(locale, item.link)}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  size='lg'>
                  {item.label}
                </Link>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    className='w-full'
                    color='foreground'
                    href={getRelativeLocaleUrl(locale, child.link)}
                    target={child.isExternal ? '_blank' : undefined}
                    rel={child.isExternal ? 'noopener noreferrer' : undefined}
                    size='lg'>
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                className='w-full'
                color='foreground'
                href={getRelativeLocaleUrl(locale, item.link)}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                size='lg'>
                {item.label}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
