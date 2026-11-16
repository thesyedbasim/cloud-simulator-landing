import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/content/site'

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 ${className}`}>{children}</div>
)

export function SectionHead({ title, body, className = '' }: { title: string; body?: string; className?: string }) {
  return (
    <header className={`max-w-2xl ${className}`}>
      <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.5rem]">{title}</h2>
      {body && <p className="mt-4 text-lg text-dim">{body}</p>}
    </header>
  )
}

/** Primary call to action. Always goes to the app. */
export function StartButton({ children = 'Start Now', className = '', size = 'lg' }: { children?: ReactNode; className?: string; size?: 'md' | 'lg' }) {
  return (
    <a
      href={SITE.appUrl}
      className={`group inline-flex items-center gap-2 bg-accent font-medium text-white transition-[transform,background-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:bg-[color-mix(in_srgb,var(--bp-accent)_88%,black)]  ${size === 'lg' ? 'px-6 py-3 text-[17px]' : 'px-4 py-2 text-[15px]'} ${className}`}
    >
      {children}
      <ArrowRight size={size === 'lg' ? 18 : 16} className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5" aria-hidden />
    </a>
  )
}
