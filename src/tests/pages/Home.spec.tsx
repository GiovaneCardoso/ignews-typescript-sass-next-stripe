import { render, screen } from "@testing-library/react"
import { stripe } from "../../services/stripe"
import { mocked } from "jest-mock"
import { useSession } from "next-auth/react"
import Home, { getStaticProps } from "../../pages"

jest.mock("next-auth/react")
jest.mock("../../services/stripe")
describe("home page", () => {
  it("Renders correctly", () => {
    const sessionMocked = mocked(useSession)
    sessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })
    render(<Home product={{ priceId: "fake-price-id", amount: "R$25,00" }} />)

    expect(screen.getByText(/R\$25,00/i)).toBeInTheDocument()
  })
  it("loads initial data", async () => {
    const retrieveStripeMocked = mocked(stripe.prices.retrieve)
    retrieveStripeMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 2500,
    } as any)
    const response = await getStaticProps({})
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "R$\xa025,00",
          },
        },
      })
    )
  })
})
