import SectionOne from '../components/Containers/Portfolio/section-1'
import SectionTwo from '../components/Containers/Portfolio/section-2'
import SectionThree from '../components/Containers/Portfolio/section-3'
import SectionFour from '../components/Containers/Portfolio/section-4'
import SeoPortfolio from '../components/SEO/SeoPortfolio'
import { getContenfulClient } from '../lib/contentful'

// Get static props at build time
export const getStaticProps = async () => {
  // Fetch data from Contentful
  const contentfulClient = getContenfulClient()
  const projectDataPromise = contentfulClient.getEntries({
    content_type: 'project'
  })
  const openSourceContribDataPromise = contentfulClient.getEntries({
    content_type: 'openSourceContributions'
  })
  const [projectDataContentful, openSourceContribDataContentful] = await Promise.all([projectDataPromise, openSourceContribDataPromise])

  // Parse and prepare data to pass as props in containers
  const projectData = projectDataContentful.items.map((data) => ({
    title: data.fields.title,
    description: data.fields.description,
    tags: data.fields.tags,
    liveLink: data.fields.liveLink,
    sourceLink: data.fields.sourceLink,
    backgroundImage: {
      height: data.fields.backgroundImage.fields.file.details.image.height,
      width: data.fields.backgroundImage.fields.file.details.image.width,
      path: `https:${data.fields.backgroundImage.fields.file.url}`,
      alt: data.fields.backgroundImage.fields.title
    }
  }))

  const openSourceContribData = openSourceContribDataContentful.items.map((data) => ({
    title: data.fields.title,
    description: data.fields.description,
    tags: data.fields.tags,
    liveLink: data.fields.liveLink,
    sourceLink: data.fields.sourceLink,
    backgroundImage: {
      height: data.fields.backgroundImage.fields.file.details.image.height,
      width: data.fields.backgroundImage.fields.file.details.image.width,
      path: `https:${data.fields.backgroundImage.fields.file.url}`,
      alt: data.fields.backgroundImage.fields.title
    }
  }))

  return ({
    props: { projectData, openSourceContribData },
    revalidate: 60, // 1 minute
  })
}

export default function Index({ projectData, openSourceContribData }) {
  return (
    <>
      <SeoPortfolio />
      <SectionOne />
      <SectionTwo />
      <SectionThree projectData={projectData} />
      <SectionFour openSourceContribData={openSourceContribData} />
    </>
  )
}
