const PORT = 5555;

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
        // ========== SCHEMAS DE USUÁRIO ==========
        Usuario: {
          type: "object",
          properties: {
            nome: { type: "string" },
            login: { type: "string" },
            senha: { type: "string" },
          },
        },
        UsuarioRequest: {
          type: "object",
          required: ["nome", "login", "senha"],
          properties: {
            nome: { type: "string", example: "nome sobrenome" },
            login: { type: "string", example: "teste@gmail.com" },
            senha: { type: "string", format: "password", example: "123456" },
          },
        },
        CadastroUsuarioResponseDTO: {
          type: "object",
          properties: {
            nome: { type: "string", example: "nome sobrenome" },
            login: { type: "string", example: "teste@gmail.com" },
          },
        },
        RespostaUsuarioCriado: {
          type: "object",
          properties: {
            usuarioDTO: {
              $ref: "#/components/schemas/CadastroUsuarioResponseDTO",
            },
            message: {
              type: "string",
              example: "Usuário cadastrado com sucesso!",
            },
          },
        },

        // ========== SCHEMAS DE LOGIN ==========
        LoginRequest: {
          type: "object",
          required: ["login", "senha"],
          properties: {
            login: { type: "string", example: "teste@gmail.com" },
            senha: { type: "string", format: "password", example: "123456" },
          },
        },
        UsuarioDetalhadoDTO: {
          type: "object",
          properties: {
            id: { type: "integer", example: 3 },
            nome: { type: "string", example: "nome sobrenome" },
            login: { type: "string", example: "teste@email.com" },
            estrelas: { type: "integer", example: 0 },
            createAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-15T17:03:43.052Z",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            usuarioDTO: {
              $ref: "#/components/schemas/UsuarioDetalhadoDTO",
            },
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTI1OTkwODksImV4cCI6MTc1MjYxMzQ4OX0.tj6kLAxz1l86IW76PUP6CFLKPVXn_QLTw3Ssasl2CdY",
            },
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
                  $ref: "#/components/schemas/UsuarioRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/RespostaUsuarioCriado",
                  },
                },
              },
            },
            400: {
              description: "Erro na requisição",
            },
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
          security: [{ bearerAuth: [] }],
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
