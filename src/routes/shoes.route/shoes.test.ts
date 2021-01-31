import express from 'express';
import request from 'supertest'
import app from '../../../app';
describe('shoes route', ()=>{
    it('should get 5 items', async(done)=>{
        await request(app)
        .get('/shoes?page=10&items=5')
        .then((result) => {
            expect(result.body.length).toEqual(5)
        }).catch(e =>{
            throw e
        })
        done()
    })


    it('should return error msg missing page', async(done)=>{
        await request(app)
        .get('/shoes?items=5')
        .then((result) => {
            expect(result.text).toEqual('missing param page')
        }).catch(e =>{
            throw e
        })
        done()
    })

    it('should return error msg missing items', async(done)=>{
        await request(app)
        .get('/shoes?page=5')
        .then((result) => {
            expect(result.text).toEqual("missing param items")
        }).catch(e =>{
            throw e
        })
        done()
    })
})