import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { useSession } from "next-auth/react"
import { SignInButton } from "."

jest.mock("next-auth/react")
describe("SignInButton component", () => {
  it("renders correctly when user is not logged in", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })

    render(<SignInButton />)

    expect(screen.getByText("Entrar com Github")).toBeInTheDocument()
    expect(screen.getByText("Entrar com Google")).toBeInTheDocument()
  })

  it("renders correctly when user is logged in", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      status: "authenticated",
      data: {
        expires: "fake-expires",
        user: {
          email: "giovane@giovane",
          name: "Giovane",
          image: "https://avatars0.githubusercontent.com/u/123456789?v=4",
        },
      },
    })

    const { debug } = render(<SignInButton />)
    debug()
    expect(screen.getByText("Olá Giovane")).toBeInTheDocument()
  })
})
