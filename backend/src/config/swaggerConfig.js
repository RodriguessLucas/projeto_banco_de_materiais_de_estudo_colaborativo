const PORT = process.env.PORT || 5555;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Projeto de Estudo",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            nome: { type: "string" },
            login: { type: "string" },
            senha: { type: "string" },
          },
        },
        LoginRequest: {
          type: "object",
          properties: {
            login: { type: "string", example: "exemplo@email.com" },
            senha: { type: "string", example: "senha123" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            usuario: {
              type: "object",
              properties: {
                id_usuario: { type: "integer" },
                nome: { type: "string" },
                login: { type: "string" },
              },
            },
            token: { type: "string" },
          },
        },
        PerfilUsuarioResponse: {
          type: "object",
          properties: {
            id_usuario: { type: "integer", example: 1 },
            nome: { type: "string", example: "Fulano da Silva" },
            login: { type: "string", example: "fulano@email.com" },
            qntd_estrelas: { type: "integer", example: 10 },
            materiais_criados: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 5 },
                  nome_material: {
                    type: "string",
                    example: "Resumo de Cálculo",
                  },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/cadastrarUsuario": {
        post: {
          summary: "Cria um novo usuário",
          tags: ["Usuários"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Usuario",
                },
              },
            },
          },
          responses: {
            201: { description: "Usuário criado com sucesso" },
            400: { description: "Erro na requisição" },
          },
        },
      },
      "/login": {
        post: {
          summary: "Autentica um usuário e retorna um token",
          tags: ["Usuários"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login bem-sucedido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginResponse",
                  },
                },
              },
            },
            401: {
              description: "Não autorizado (e-mail ou senha inválidos)",
            },
          },
        },
      },
      "/usuarios/perfil": {
        get: {
          summary: "Retorna o perfil do usuário autenticado",
          tags: ["Usuários"],
          security: [{ bearerAuth: [] }], // ✅ isso habilita o botão "Authorize"
          responses: {
            200: {
              description: "Perfil do usuário autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PerfilUsuarioResponse",
                  },
                },
              },
            },
            401: {
              description: "Token JWT ausente ou inválido",
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerOptions;
