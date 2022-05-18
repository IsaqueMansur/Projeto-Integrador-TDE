const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
    return
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return
    }
    
    req.flash('success', 'Usuário criado com sucesso');
        req.session.save(function() {
            return res.redirect('back');
        });

    }catch(e) {
        console.log(e);
        return res.render('404');
    }  
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

    if (login.errors.length > 0) {
        console.log(login.errors);
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return
    }
    
    req.flash('success', 'Você acessou o sistema');
    console.log("usuario existente");
    req.session.user = login.user;
    req.session.save(function() {
        return res.redirect('/');
    });

    }catch(e) {
        console.log(e);
        return res.render('index');
    }  
}

exports.indexCadastro = (req, res) => {
    res.render('cadastro');
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
} 