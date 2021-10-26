import { motion } from "framer-motion"
import { useThemeChangeAnim } from "../../../lib/motion"
import { slugify } from "../../../utils/wordfu"

export const Heading1 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h1 style={{lineHeight: 1.5}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h1>
}
export const Heading2 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h2 style={{lineHeight: 1.5}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h2>
}
export const Heading3 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h3 style={{lineHeight: 1.5}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h3>
}
export const Heading4 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h4 style={{lineHeight: 1.8}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h4>
}
export const Heading5 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h5 style={{lineHeight: 1.8}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h5>
}
export const Heading6 = ({children}) => {
    const {textEmphasisAnimation: animate, textEmphasisVariants: variants} = useThemeChangeAnim()
    return <motion.h6 style={{lineHeight: 1.8}} id={slugify(children)} animate={animate} variants={variants}>{children}</motion.h6>
}