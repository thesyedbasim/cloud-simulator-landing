import { Capabilities } from '@/components/Capabilities'
import { FinalCta, Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Walkthrough } from '@/components/Walkthrough'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Walkthrough />
        <Capabilities />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
