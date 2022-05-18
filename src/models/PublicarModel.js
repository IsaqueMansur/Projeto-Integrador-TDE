const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const PublicacaoSchema = new mongoose.Schema({
    tituloMateria: { type: String, required: true },
    imgMateria: { type: String, required: true },
    tituloMateria: { type: String, required: true }
});
const PublicacaoModel = mongoose.model('Publicacao', PublicacaoSchema);

class Publicacao {
    constructor(body) {
        this.body = body;
        this.errors = [];  
    }


    async publicar() {
        
        /* this.valida(); */

        const infos = [
            body.tituloMateria,
            body.imgMateria,
            body.tituloMateria
        ];

        console.log(infos[0])
        this.user = await PublicacaoModel.create(this.body);
    }

    /* valida(publicacao) {
        
    } */

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            tituloMateria: this.body.tituloMateria,
            imgMateria: this.body.imgMateria,
            tituloMateria: this.body.tituloMateria
        }
    }
}

module.exports = Publicacao;