import { fetchPostsSummary } from "../../lib/contentful"

export default async function handler(req, res) {
    // /api/fetchPostsSummary?page=N (0, 1, 2, ...)
    // /api/fetchPostsSummary?page=N&tag=NAME (0, 1, 2, ...)
    try {
        let blogPostsData = await fetchPostsSummary(req.query.page, req.query.tag)
        res.status(200).json(blogPostsData)
    } catch (e) {
        res.status(500).json(e.message)
    }
}