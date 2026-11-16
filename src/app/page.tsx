import { Capabilities } from '@/components/Capabilities'
import { Faq } from '@/components/Faq'
import { FinalCta, Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Honesty } from '@/components/Honesty'
import { Nav } from '@/components/Nav'
import { Starters } from '@/components/Starters'
import { UseCases } from '@/components/UseCases'
import { Walkthrough } from '@/components/Walkthrough'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <UseCases />
        <Walkthrough />
        <Capabilities />
        <Starters />
        <Honesty />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
