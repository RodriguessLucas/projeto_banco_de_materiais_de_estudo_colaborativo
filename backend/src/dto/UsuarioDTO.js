function toCadastroRes(usuario) {
  if (!usuario) {
    return null;
  }

  return {
    nome: usuario.nome,
    login: usuario.login,
  };
}

function toLoginRes(usuario) {
  if (!usuario) {
    return null;
  }

  return {
    id: usuario.id_usuario,
    nome: usuario.nome,
    login: usuario.login,
    estrelas: usuario.qntd_estrelas,
  };
}
function toPerfilRes(usuario) {
  if (!usuario) return null;

  return {
    id: usuario.id_usuario,
    nome: usuario.nome,
    login: usuario.login,
    estrelas: usuario.qntd_estrelas,
  };
}

module.exports = {
  toCadastroRes,
  toLoginRes,
  toPerfilRes,
};

module.exports = {
  toCadastroRes,
  toLoginRes,
};