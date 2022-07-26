import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import Posts, { getStaticProps } from "../../pages/posts"
import { getPrismicClient } from "../../services/prismic"
const posts = [
  {
    slug: "pagina-1",
    title: "Página 1",
    excerpt: "essa é a pagina 1, confia",
    updatedAt: "Março, 10"
  }
]
jest.mock("../../services/prismic")
describe("Posts page", () => {
  it("Renders correctly", () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText("Página 1")).toBeInTheDocument()
  })

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [
                {
                  type: "heading",
                  text: "Example"
                }
              ],
              content: [
                {
                  type: "paragraph",
                  text: "meu texto de exemplo"
                }
              ]
            },
            last_publication_date: "04-01-2021"
          }
        ]
      })
    } as any)
    const response = await getStaticProps({})
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "Example",
              excerpt: "meu texto de exemplo",
              updatedAt: "01 de abril de 2021"
            }
          ]
        }
      })
    )
  })
})
