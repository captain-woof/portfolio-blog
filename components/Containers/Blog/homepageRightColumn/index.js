import Tags from "../../../Misc/Tags";
import MarginWrapper from "../../MarginWrapper";

export default function HomepageRightColumn({ tags }) {
    return (
        <MarginWrapper>
            <Tags tags={tags} id='categories' />
        </MarginWrapper>
    )
}