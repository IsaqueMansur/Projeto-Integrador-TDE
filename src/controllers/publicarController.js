const Publicacao = require('../models/PublicarModel');

exports.index = (req, res) => {
    res.render('publicar');
}

exports.publicar = async (req, res) => {
      
    try {
        const publicacao = new Publicacao(req.body);
        await publicacao.publicar();

    if (publicacao.errors.length > 0) {
        req.flash('errors', publicacao.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return;
    };

    req.flash('success', 'Publicação feita com sucesso');
        req.session.save(function() {
            return res.redirect('back');
        });

    }catch(e) {
        console.log(e);
        return res.render('404');
    };
};

exports.viewIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const publicacao = await Publicacao.buscaPorId(req.params.id);

    if (!publicacao) return res.render('404');
    res.render('publicacao', { publicacao });
}