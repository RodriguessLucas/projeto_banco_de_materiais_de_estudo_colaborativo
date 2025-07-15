function toCadastroRes(usuario){
    if(!usuario){
        return null;
    }

    return {
        nome: usuario.nome,
        login: usuario.login,
    }

}

module.exports = {
    toCadastroRes
}