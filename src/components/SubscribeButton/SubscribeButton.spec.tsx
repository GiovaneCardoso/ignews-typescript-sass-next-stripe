import { render, screen, fireEvent } from "@testing-library/react"
import { mocked } from "jest-mock"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import SubscribeButton from "."

jest.mock("next-auth/react")
jest.mock("next/router")

describe("Subscribe Button ", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })

    render(<SubscribeButton />)

    expect(screen.getByText("Insrever-se")).toBeInTheDocument()
  })

  it("Redirects user to sign in when not logged in", () => {
    const signInMocked = mocked(signIn)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Insrever-se")
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })
  it("Redirects user to posts page when subscription is active", () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          email: "john@dfas",
          name: "John Doe",
        },
        expires: "fake-expires",
        activeSubscription: true,
      },
      status: "authenticated",
    })
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)
    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Insrever-se")
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith("/posts")
  })
})
