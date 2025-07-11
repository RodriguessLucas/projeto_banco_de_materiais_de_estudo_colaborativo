const PORT = process.env.PORT || 5555;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Projeto de Estudo',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            login: { type: 'string' },
            senha: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/cadastrarUsuario': {
        post: {
          summary: 'Cria um novo usuário',
          tags: ['Usuários'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Usuario',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Usuário criado com sucesso' },
            '400': { description: 'Erro na requisição' },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerOptions;