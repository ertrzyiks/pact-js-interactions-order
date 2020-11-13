"use strict"
const { Matchers } = require('@pact-foundation/pact')

const { pactWith } = require('./support')

const { getData } = require("../index")

pactWith(provider => {
  describe("Interaction #4", () => {
    const EXPECTED_DATA = {
      message: Matchers.somethingLike("Hello world5")
    }

    const successResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: EXPECTED_DATA,
    }

    const listRequest = {
      uponReceiving: "request #4",
      withRequest: {
        method: "GET",
        path: "/",
        headers: {
          Accept: "application/json",
        },
      },
    }

    beforeEach(() => {
      const interaction = {
        state: "state #4",
        ...listRequest,
        willRespondWith: successResponse,
      }
      return provider.addInteraction(interaction)
    })

    it("returns a successful body", () => {
      return getData({
        url: provider.mockService.baseUrl,
      }).then(data => {
        expect(data).toHaveProperty('message')
      })
    })
  })
})
