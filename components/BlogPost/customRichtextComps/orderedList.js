import { motion } from 'framer-motion'
import { useThemeChangeAnim } from '../../../lib/motion'

export default function OrderedList({ children }) {
    const { textEmphasisAnimation: animate, textEmphasisVariants: variants } = useThemeChangeAnim()
    return (
        <motion.ol animate={animate} variants={variants}>{children}</motion.ol>
    )
}