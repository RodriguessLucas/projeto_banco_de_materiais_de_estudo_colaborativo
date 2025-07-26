const PORT = 5555;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Projeto de Estudo",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [{ url: `https://projeto-banco-de-materiais-de-estudo.onrender.com` }],
    tags: [
      {
        name: "Usuários",
        description: "Endpoints para login e cadastro de usuários",
      },
      {
        name: "Materiais",
        description: "Endpoints para gerenciamento de materiais de estudo",
      },
    ],
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

        LoginRequest: {
          type: "object",
          required: ["login", "senha"],
          properties: {
            login: { type: "string", example: "teste@gmail.com" },
            senha: { type: "string", format: "password", example: "123456" },
          },
        },
        AtualizarPerfilRequest: {
          type: "object",
          properties: {
            nome: { type: "string", example: "Fulano da Silva" },
            curso: { type: "string", example: "Sistemas de Informação" },
            universidade: { type: "string", example: "UFC" },
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
            curso: { type: "string", example: "Sistemas de Informação" },
            universidade: { type: "string", example: "UFC" },
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
        MaterialResponse: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome_material: { type: "string", example: "Resumo de Cálculo I" },
            descricao_material: {
              type: "string",
              example: "Material focado em limites.",
            },
            id_materia: { type: "integer", example: 1 },
            id_usuario: { type: "integer", example: 1 },
            caminho_arquivo: { type: "string", example: "1a2b3c4d-Resumo.pdf" },
            instituicao: { type: "string", example: "UFC" },
            curso: { type: "string", example: "Ciência da Computação" },
            nome_professor: { type: "string", example: "Prof. Nélio" },
            qntd_estrela: { type: "integer", example: 0 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
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
        put: {
          summary: "Atualiza o perfil do usuário autenticado",
          tags: ["Usuários"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AtualizarPerfilRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Perfil atualizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PerfilUsuarioResponse",
                  },
                },
              },
            },
            400: {
              description: "Erro na requisição (ex: campos inválidos)",
            },
            401: {
              description: "Token JWT ausente ou inválido",
            },
          },
        },
      },
      "/usuario/cadastrarMateriais": {
        post: {
          summary: "Faz o upload de um novo material de estudo",
          tags: ["Materiais"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    arquivo: {
                      type: "string",
                      format: "binary",
                      description:
                        "O arquivo a ser enviado (PDF, DOCX, PNG, etc.)",
                    },
                    nome_material: { type: "string" },
                    id_materia: { type: "integer" },
                    descricao_material: { type: "string" },
                    instituicao: { type: "string" },
                    curso: { type: "string" },
                    nome_professor: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Material enviado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MaterialResponse",
                  },
                },
              },
            },            
            400: { description: "Requisição inválida ou tipo de arquivo não suportado" },
            401: { description: "Não autorizado (token inválido ou não fornecido)" },
          },
        },
      },

      "/materiais/{id}/download": {
        get: {
          summary: "Realiza o download de um material específico",
          tags: ["Materiais"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "O ID do material para fazer o download.",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Arquivo do material retornado com sucesso.",
              content: {
                "application/octet-stream": {
                  schema: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
            401: { description: "Não autorizado (token inválido ou não fornecido)" },
            404: { description: "Material não encontrado" },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerOptions;
