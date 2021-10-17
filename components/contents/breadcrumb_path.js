import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../lib/motion'
import { useEffect, useState } from 'react'
import { getPathBreadcrumbs } from '../../utils/wordfu'
import Link from 'next/link'

const BreadcrumbContainer = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    font-family: 'Poppins';
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
`

const BreadcrumbText = styled.span`
    &:hover {
        text-decoration: underline;
    }
`

const BreadcrumbTextBold = styled.span`
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`


export default function BreadcrumbPath() {
    const { textSubtitlesAnimation: animate, textSubtitlesVariants: variants } = useThemeChangeAnim()

    // State for breadcrumbs
    const [breadcrumbs, setBreadcrumbs] = useState([])

    // Set breadcrumbs
    useEffect(() => {
        setBreadcrumbs(getPathBreadcrumbs)
    }, [])

    return (
        <BreadcrumbContainer animate={animate} variants={variants}>
            {breadcrumbs.map((breadcrumbData, index) => (
                <div key={index} className='breadcrumb'>
                    {'> '}
                    <Link href={breadcrumbData.url}><a>
                        {index === breadcrumbs.length - 1
                            ?   <BreadcrumbTextBold>{breadcrumbData.text}</BreadcrumbTextBold>
                            :   <BreadcrumbText>{breadcrumbData.text}</BreadcrumbText>
                        }                        
                    </a></Link>
                </div>
            ))}
        </BreadcrumbContainer >
    )
}