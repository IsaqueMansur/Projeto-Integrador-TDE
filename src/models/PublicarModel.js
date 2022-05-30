const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const { async } = require('regenerator-runtime');
const PublicacoeSchema = new mongoose.Schema({
    tituloMateria: { type: String, required: true },
    subtituloMateria: { type: String, required: true},
    imgMateria: { type: String, required: true },
    textMateria: { type: String, required: true },
    date: { type: String, required:  true},
    hour: { type: String, required:  true},
    criadoEm: {type: Date, default: Date.now}
});
const PublicacaoModel = mongoose.model('Publicacoe', PublicacoeSchema);

function Publicacao(body) {
    this.body = body;
    this.errors = [];  
    this.publicacao = null;
}

Publicacao.prototype.publicar = async function() {
    this.valida(this.body);
    this.createDate();
    if (this.errors.length < 1) this.publicacao = await PublicacaoModel.create(this.body);
}

Publicacao.prototype.valida = async function(publicacao) {
    const body = [
        publicacao.tituloMateria,
        publicacao.subtituloMateria,
        publicacao.imgMateria,
        publicacao.textMateria
    ];

    for (let i in body) {
        if (body[i] == '')  {
            if (i == 0) this.errors.push("Insira um título !");
            if (i == 1) this.errors.push("Insira um subtítulo !");
            if (i == 2) this.errors.push("Insira uma imagem !");
            if (i == 3) this.errors.push("Insira o texto !");
        }    
    }
    if (body[3].length > 0 && body[3].length < 39) this.errors.push("O seu texto deve ter pelo menos 40 caracteres");
}

Publicacao.prototype.createDate = function() {
    this.body.date = `${new Date().toLocaleDateString("pt-BR", {dateStyle: "short"})}`;
    this.body.hour = `${new Date().toLocaleTimeString("pt-BR", {timeStyle: "short"})}`;
}

Publicacao.buscarPublicacoes = async function() {
    const publicacoes = await PublicacaoModel.find()
    .sort({criadoEm: -1});
    return publicacoes;
}

Publicacao.buscaPorId =  async (id) => {
    if (typeof(id) !== 'string') return;
    const publicacao = await PublicacaoModel.findById(id);
    return publicacao;
}

module.exports = Publicacao;