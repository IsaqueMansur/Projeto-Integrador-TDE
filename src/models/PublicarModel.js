const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const PublicacoeSchema = new mongoose.Schema({
    tituloMateria: { type: String, required: true },
    imgMateria: { type: String, required: true },
    textMateria: { type: String, required: true }
});
const PublicacaoModel = mongoose.model('Publicacoe', PublicacoeSchema);

class Publicacao {
    constructor(body) {
        this.body = body;
        this.errors = [];  
        this.publicacao = null;
    }

    async publicar() {
        
        this.valida(this.body);

        if (this.errors.length < 1) this.publicacao = await PublicacaoModel.create(this.body);
        
    }

    valida(publicacao) {

        const body = [
            publicacao.tituloMateria,
            publicacao.imgMateria,
            publicacao.textMateria
        ];

        for (let i in body) {
            if (body[i] == '')  {
                if (i == 0) this.errors.push("Insira um título !");
                if (i == 1) this.errors.push("Insira uma imagem !");
                if (i == 2) this.errors.push("Insira o texto !");
            }    
        }
        if (body[2].length > 0 && body[2].length < 39) this.errors.push("O seu texto deve ter pelo menos 40 caracteres");
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        };

        this.body = {
            tituloMateria: this.body.tituloMateria,
            imgMateria: this.body.imgMateria,
            textMateria: this.body.textMateria
        };
    }
}

module.exports = Publicacao;