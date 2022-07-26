import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { getPrismicClient } from "../../services/prismic"
const post = {
  slug: "pagina-1",
  title: "Página 1",
  content: "<p>essa é a pagina 1, confia</p>",
  updatedAt: "Março, 10"
}

jest.mock("../../services/prismic")
jest.mock("next/router")
jest.mock("next-auth/react")

describe("Post preview page", () => {
  it("Renders correctly", () => {
    const mockedSession = mocked(useSession)
    mockedSession.mockReturnValueOnce({
      data: {
        activeSubscription: ""
      }
    } as any)
    render(<Post post={post} />)
    expect(screen.getByText("Página 1")).toBeInTheDocument()
    expect(screen.getByText("essa é a pagina 1, confia")).toBeInTheDocument()
    expect(screen.getByText("Continue lendo")).toBeInTheDocument()
  })
  it("Redirect if user has active subscription correctly", () => {
    const mockedRouter = mocked(useRouter)
    const mockedSession = mocked(useSession)
    const pushmock = jest.fn()
    mockedRouter.mockReturnValueOnce({
      push: pushmock
    } as any)
    mockedSession.mockReturnValueOnce({
      data: {
        activeSubscription: "fake-subscription"
      }
    } as any)
    render(<Post post={post} />)
    expect(pushmock).toHaveBeenCalledWith(`/posts/${post.slug}`)
  })

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

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

    const response = await getStaticProps({
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
