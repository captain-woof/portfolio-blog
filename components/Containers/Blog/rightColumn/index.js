import Tags from "../../../Misc/Tags";
import MarginWrapper from "../../MarginWrapper";

export default function RightColumn({ tags }) {
    return (
        <MarginWrapper>
            <Tags tags={tags} id='categories' />
        </MarginWrapper>
    )
}