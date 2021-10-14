import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

export default function UnorderedList({ children }) {
    const { textEmphasisAnimation: animate, textEmphasisVariants: variants } = useThemeChangeAnim()
    return (
        <motion.ul animate={animate} variants={variants}>{children}</motion.ul>
    )
}