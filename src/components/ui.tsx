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

/** Primary call to action. Always goes to the app. A retro keycap: the face drops when pressed. */
export function StartButton({ children = 'Start Now', className = '', size = 'lg', tone = 'blue' }: { children?: ReactNode; className?: string; size?: 'md' | 'lg'; tone?: 'blue' | 'lime' }) {
  return (
    <a href={SITE.appUrl} className={`key group ${tone === 'lime' ? 'key-lime' : ''} ${className}`}>
      <span className={`key-face ${size === 'lg' ? 'px-6 py-3 text-[15px]' : 'px-4 py-2 text-[13px]'}`}>
        {children}
        <ArrowRight size={size === 'lg' ? 18 : 16} className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5" aria-hidden />
      </span>
    </a>
  )
}
