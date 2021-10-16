import { useEffect } from 'react'
import SectionOne from '../components/Containers/Portfolio/section-1'
import SectionTwo from '../components/Containers/Portfolio/section-2'
import SectionThree from '../components/Containers/Portfolio/section-3'
import SectionFour from '../components/Containers/Portfolio/section-4'
import SectionFive from '../components/Containers/Portfolio/section-5'
import SeoPortfolio from '../components/SEO/SeoPortfolio'
import { useGlobalContext } from '../providers/ContextProvider'
import { fetchSkills, fetchProjects, fetchOpenSourceContribs } from '../lib/contentful'

// Get static props at build time
export const getStaticProps = async () => {
  // Fetch data from Contentful
  const [skillsData, projectData, openSourceContribData] = await Promise.all([
    fetchSkills(), fetchProjects(), fetchOpenSourceContribs()
  ])

  return ({
    props: { skillsData, projectData, openSourceContribData },
    revalidate: 60, // 1 minute
  })
}

export default function Index({ skillsData, projectData, openSourceContribData }) {
  // Setting page markers
  const { globalDispatch, globalState: { origin } } = useGlobalContext()
  useEffect(() => {
    globalDispatch({
      type: "SET_MARKERS", payload: {
        markers: [
          { name: "About", link: "#about" },
          { name: "Skills", link: "#skills" },
          { name: "Projects", link: "#projects" },
          { name: "Open Source Contributions", link: "#open-source-contributions" },
          { name: "Contact", link: "#contact" }
        ]
      }
    })
  }, [])

  // Setting share data
  useEffect(() => {
    globalDispatch({
      type: "SET_SHARE", payload: {
        share: {
          title: "Sohail Saha's Portfolio",
          description: "This is Sohail Saha's portfolio website. He is a frontend developer.",
          url: origin,
          image: `${origin}/images/my-card.png`
        }
      }
    })
  }, [])

  return (
    <>
      <SeoPortfolio />
      <SectionOne />
      <SectionTwo skillsData={skillsData} />
      <SectionThree projectData={projectData} />
      <SectionFour openSourceContribData={openSourceContribData} />
      <SectionFive />
    </>
  )
}
