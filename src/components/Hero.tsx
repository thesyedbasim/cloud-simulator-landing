import { SITE } from '@/content/site'
import { LINK_SHORTENER } from '@/content/designs'
import { IsoDesign } from './iso/IsoDesign'
import { Container, StartButton } from './ui'

/** The dock readout under the canvas: the numbers the app really shows for this design at steady load. */
const READOUT = [['P50', '72 ms'], ['P99', '284 ms'], ['ERR', '0.0%'], ['RPS', '600'], ['COST', '~$0.82/hr']] as const

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="iso-grid iso-grid-fade absolute inset-0 -z-10" aria-hidden />
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.12fr] lg:gap-10 lg:py-24">
        <div>
          <p className="label">Cloud architecture simulator</p>
          <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-[3.4rem] lg:text-[3.9rem]">
            Break your architecture before production does.
          </h1>
          <p className="mt-6 max-w-xl text-[1.15rem] leading-relaxed text-dim">{SITE.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <StartButton>Start Now</StartButton>
            <a href="#how-it-works" className="text-[16px] font-medium text-accent underline-offset-4 hover:underline">See how it works</a>
          </div>
          <p className="mt-6 text-[15px] text-dim">Free. No sign-up. Runs in your browser.</p>
        </div>

        <figure className="panel relative overflow-hidden shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--bp-line)_45%,transparent)]">
          <div className="flex items-center gap-2 border-b border-line/10 px-4 py-2.5 text-[13px]">
            <span className="inline-block size-2 rounded-full bg-healthy" aria-hidden />
            <span className="font-medium">{LINK_SHORTENER.name}</span>
            <span className="data ml-auto text-dim">live · healthy</span>
          </div>
          <div className="iso-grid relative">
            <IsoDesign design={LINK_SHORTENER} className="block h-auto w-full" stats={{ client: '600 RPS', lb: '6%', app: '60%', cache: 'HIT 80%', db: '40%' }} />
          </div>
          <dl className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line/10 px-4 py-2.5">
            {READOUT.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-1.5"><dt className="label !text-[11px]">{k}</dt><dd className="data text-[13px]">{v}</dd></div>
            ))}
          </dl>
          <figcaption className="sr-only">The Link Shortener design running at steady load: clients, a load balancer, app servers, a cache and a database, with requests flowing between them.</figcaption>
        </figure>
      </Container>
    </section>
  )
}
