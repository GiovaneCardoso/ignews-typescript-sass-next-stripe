import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { getSession } from "next-auth/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"
const post = {
  slug: "pagina-1",
  title: "Página 1",
  content: "<p>essa é a pagina 1, confia</p>",
  updatedAt: "Março, 10"
}

jest.mock("../../services/prismic")
jest.mock("next-auth/react")
describe("Post page", () => {
  it("Renders correctly", () => {
    render(<Post post={post} />)
    expect(screen.getByText("Página 1")).toBeInTheDocument()
    expect(screen.getByText("essa é a pagina 1, confia")).toBeInTheDocument()
  })

  it("Redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    } as any)

    const response = await getServerSideProps({} as any)
    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false
        }
      })
    )
  })
  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-sub"
    } as any)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
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
      })
    } as any)

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post"
      }
    } as any)
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "Example",
            content: "<p>meu texto de exemplo</p>",
            updatedAt: "01 de abril de 2021"
          }
        }
      })
    )
  })
})
