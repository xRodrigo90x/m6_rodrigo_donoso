const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas del método GET', () => {
    it('Debería devolver un listado de animes', async () => {
        const res = await chai.request(app).get('/api/anime');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Listado de animes');
    });

    it('Debería devolver el detalle de un anime específico', async () => {
        const res = await chai.request(app).get('/api/anime/1'); 
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Detalle del anime');
    });

    it('Debería devolver un error cuando se busca un anime inexistente', async () => {
        const res = await chai.request(app).get('/api/anime/999'); 
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Anime no encontrado');
    });
});