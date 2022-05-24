const Publicacao = require('../models/PublicarModel');
exports.index = async (req, res) => { 
    const publicacoes =  await Publicacao.buscarPublicacoes();
    res.render('index', { publicacoes });
    return;
}