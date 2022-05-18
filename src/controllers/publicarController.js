const Publicar = require('../models/PublicarModel');

exports.index = (req, res) => {
    res.render('publicar');
}

exports.publicar = async (req, res) => {
    console.log("chamado");
    try {
        const publicacao = new Publicar(req.body);
        await publicacao.publicar();

    if (publicacao.errors.length > 0) {
        req.flash('errors', publicacao.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return
    }

    req.flash('success', 'Publicação feita com sucesso');
        req.session.save(function() {
            return res.redirect('back');
        });

    }catch(e) {
        console.log(e);
        return res.render('404');
    }  
}