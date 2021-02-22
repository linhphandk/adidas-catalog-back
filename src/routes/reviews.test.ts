import request from "supertest"
import app from "../../app"

describe('get reviews route', () => {
  it('should get review of shoeid 1', async (done) => {
    await request(app)
      .get('/reviews/1')
      .then((result) => {
        expect(result.status).toBe(200)
      }).catch(e => {
        throw e
      })
    done()
  });

  it('should insert an item', async (done) => {
    const user_name = Date.now().toString();
    const newReview = {
      user_name,
      rating: 3,
      user_comment: 'comment',
      fk_shoes: 1
    }
    await request(app)
      .post('/reviews/')
      .send(newReview)
      .then((result) => {
        const { user_name, rating, user_comment, fk_shoes } = result.body;
        expect({ user_name, rating, user_comment, fk_shoes }).toEqual(newReview);

      }).catch(e => {
        throw e
      })
    done()
  })

  it('should insert an item', async (done) => {
    const user_name = Date.now().toString();
    const newReview = {
      rating: 3,
      user_comment: 'comment',
      fk_shoes: 1
    }
    await request(app)
      .post('/reviews/')
      .send(newReview)
      .then((result) => {
        expect(result.text).toEqual('missing param user_name');

      }).catch(e => {
        throw e
      })
    done()
  })

  it('should insert an item', async (done) => {
    const user_name = Date.now().toString();
    const newReview = {
      user_name,
      user_comment: 'comment',
      fk_shoes: 1
    }
    await request(app)
      .post('/reviews/')
      .send(newReview)
      .then((result) => {
        const { user_name, rating, user_comment, fk_shoes } = result.body;
        expect(result.text).toEqual('missing param rating');

      }).catch(e => {
        throw e
      })
    done()
  })
  it('should insert an item', async (done) => {
    const user_name = Date.now().toString();
    const newReview = {
      user_name,
      rating: 3,
      fk_shoes: 1
    }
    await request(app)
      .post('/reviews/')
      .send(newReview)
      .then((result) => {
        expect(result.text).toEqual('missing param user_comment');

      }).catch(e => {
        throw e
      })
    done()
  })
  it('should insert an item', async (done) => {
    const user_name = Date.now().toString();
    const newReview = {
      user_name,
      rating: 3,
      user_comment: 'comment',
    }
    await request(app)
      .post('/reviews/')
      .send(newReview)
      .then((result) => {
        expect(result.text).toEqual('missing param fk_shoes');

      }).catch(e => {
        throw e
      })
    done()
  })

})