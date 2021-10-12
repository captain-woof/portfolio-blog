import { useTheme } from "styled-components";
import { useGlobalContext } from "../../../../providers/ContextProvider";
import Tags from "../../../Misc/Tags";
import MarginWrapper from "../../MarginWrapper";

export default function HomepageRightColumn({ tags }) {
    const theme = useTheme()
    const { globalState: { isPhone } } = useGlobalContext()

    return (
        <MarginWrapper style={{
            boxShadow: (isPhone ? null : `0 0 4px ${theme.shadow}`)
        }}>
            <Tags tags={tags} id='categories' />

        </MarginWrapper>
    )
}