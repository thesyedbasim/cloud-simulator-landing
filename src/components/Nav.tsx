import { Menu } from 'lucide-react'
import { NAV, SITE } from '@/content/site'
import { StartButton } from './ui'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`} aria-label={`${SITE.name}, back to top`}>
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden><path d="M16 5 27 11v10L16 27 5 21V11Z" fill="var(--bp-surface)" stroke="var(--bp-line)" strokeWidth="1.8" strokeLinejoin="round" /><path d="M5 11 16 17 27 11M16 17v10" fill="none" stroke="var(--bp-line)" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="16" cy="16" r="2.2" fill="var(--bp-accent)" /></svg>
      {SITE.name}
    </a>
  )
}

/** Sticky, frosted. The mobile menu is a native <details>, so it needs no JavaScript. */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/10 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-6 px-4 sm:px-8">
        <Logo className="text-[17px]" />
        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((n) => <a key={n.href} href={n.href} className="px-3 py-2 text-[15px] text-dim transition-colors duration-[var(--dur-fast)] hover:bg-line/[0.06] hover:text-text">{n.label}</a>)}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href={SITE.github} className="hidden px-3 py-2 text-[15px] text-dim transition-colors hover:text-text sm:block" rel="noopener">GitHub</a>
          <StartButton size="md">Start Now</StartButton>
          <details className="relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center text-dim hover:bg-line/[0.06] [&::-webkit-details-marker]:hidden" aria-label="Menu"><Menu size={20} /></summary>
            <div className="panel-solid absolute right-0 top-12 flex w-56 flex-col p-2">
              {NAV.map((n) => <a key={n.href} href={n.href} className="px-3 py-2.5 text-[16px] hover:bg-line/[0.06]">{n.label}</a>)}
              <a href={SITE.github} className="px-3 py-2.5 text-[16px] hover:bg-line/[0.06]" rel="noopener">GitHub</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
