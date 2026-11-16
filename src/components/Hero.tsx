import { SITE } from '@/content/site'
import { LINK_SHORTENER } from '@/content/designs'
import { IsoDesign } from './iso/IsoDesign'
import { Container, StartButton } from './ui'

/** The dock readout under the canvas: the numbers the app really shows for this design at steady load. */

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="iso-grid iso-grid-fade absolute inset-0 -z-10" aria-hidden />
      <Container className="flex flex-col items-center py-14 text-center sm:py-20 lg:py-24">
        <div className="flex flex-col items-center">
          <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-[3.4rem] lg:text-[3.9rem]">
            Break your architecture before production does.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-dim">{SITE.description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <StartButton>Start Now</StartButton>
            <a href="#how-it-works" className="text-[16px] font-medium text-accent underline-offset-4 hover:underline">See how it works</a>
          </div>
          <p className="mt-6 text-[15px] text-dim">Free. No sign-up. Runs in your browser.</p>
        </div>

        <figure className="mt-10 w-full max-w-[1040px] lg:mt-14">
          <IsoDesign design={LINK_SHORTENER} labelScale={0.62} className="block h-auto w-full" stats={{ client: '600 RPS', lb: '6%', app: '60%', cache: 'HIT 80%', db: '40%' }} />
          <figcaption className="sr-only">The Link Shortener design running at steady load: clients, a load balancer, app servers, a cache and a database, with requests flowing between them.</figcaption>
        </figure>
      </Container>
    </section>
  )
}
