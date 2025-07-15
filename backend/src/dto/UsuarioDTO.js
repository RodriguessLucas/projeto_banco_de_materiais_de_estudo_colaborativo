function toLoginRes(usuario){
    if(!usuario){
        return null;
    }

    return {
        id: usuario.id_usuario,
        nome: usuario.nome,
        login: usuario.login,
        estrelas: usuario.qntd_estrelas,
        createAt: usuario.createdAt,
    }
}

module.exports = {
    toLoginRes
};