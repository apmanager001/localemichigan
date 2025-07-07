import Hero from './comp/hero'
import News from './comp/news'
import TopCities from './comp/homepage/topCities'
import ExploreHero from './comp/homepage/categoryhero'
import HomepageMap from './comp/homepageMap'

export default function Home() {
  return (
    <div>
      <Hero />
      <TopCities />
      <ExploreHero />
      <News />
      <HomepageMap />
    </div>
  );
}
