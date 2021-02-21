import request from "supertest"
import app from "../../app"

describe('shoes route', () => {
  it('should get 5 items', async (done) => {
    await request(app)
      .get('/reviews/1')
      .then((result) => {
        expect(result.status).toBe(200)
      }).catch(e => {
        throw e
      })
    done()
  })
})