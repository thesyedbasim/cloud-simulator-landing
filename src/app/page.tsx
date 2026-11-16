import { Capabilities } from '@/components/Capabilities'
import { FinalCta, Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
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
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
