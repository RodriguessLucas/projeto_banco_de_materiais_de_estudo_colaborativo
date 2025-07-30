# 📚 Banco de Materiais Colaborativo

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![Linguagem](https://img.shields.io/badge/linguagem-HTML%2FCSS%2FJS-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-yellowgreen)
![Banco de Dados](https://img.shields.io/badge/banco_de_dados-PostgreSQL-blue)
![Ambiente](https://img.shields.io/badge/ambiente-Docker-blueviolet)

Projeto final desenvolvido para a disciplina de **Desenvolvimento Web**, sob a orientação da **Professora Valéria**.

---

## 👥 Equipe

| Nome Completo             |
| ------------------------- |
| Bruno Gustavo Sombra Claudio |
| Davi Lima Rodrigues       |
| Guilherme Messias Silva   |
| Lucas Rodrigues           |

---

## 🎯 Sobre o Projeto

O **Banco de Materiais Colaborativo** é uma plataforma web desenvolvida com o objetivo de centralizar e facilitar o compartilhamento de materiais de estudo entre alunos. A ideia é criar uma comunidade de aprendizado onde os usuários possam contribuir com seus próprios resumos, anotações e trabalhos, e também ter acesso a materiais de outros colegas, promovendo um ambiente de ajuda mútua e otimizando os estudos.

---

## ✨ Funcionalidades

* **Autenticação de Usuários:** Sistema completo de cadastro, login e logout com tokens JWT.
* **Gerenciamento de Perfil:** Visualização e atualização dos dados do perfil do usuário.
* **Upload de Materiais:** Funcionalidade para enviar arquivos (`PDF`, `DOCX`, `PNG`, etc.) com informações associadas.
* **Listagem e Visualização:** Página inicial que exibe todos os materiais compartilhados com pré-visualização inteligente.
* **Página de Detalhes:** Página dedicada para cada material com suas informações completas.
* **Download de Materiais:** Possibilidade de baixar qualquer material da plataforma.
* **Documentação de API:** Interface Swagger interativa para visualização e teste de todos os endpoints.

---

## 🔗 Links de Acesso (Versão em Deploy)

| Recurso               | Link                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 🚀 **Aplicação (Frontend)** | [**Acessar a Plataforma**](https://rodriguesslucas.github.io/projeto_banco_de_materiais_de_estudo_colaborativo/login.html) |
| ⚙️ **Backend (Swagger)** | [**Documentação da API**](https://projeto-banco-de-materiais-de-estudo.onrender.com/api-docs/)                            |
| 🎨 **Design (Figma)** | [**Protótipo do Projeto**](https://www.figma.com/design/T74FQbQJg5Ip4d1ndM1Lnr/Untitled?node-id=0-1&p=f&t=XQ5UhR5FS8GV0kjV-0) |

---

## 🛠️ Tecnologias e Arquitetura

#### **Frontend**
* **HTML5**, **CSS3**, **JavaScript (Puro/Vanilla JS)**.

#### **Backend**
* **Node.js** e **Express.js** para a API RESTful.
* **PostgreSQL** como banco de dados relacional.
* **Sequelize** como ORM para comunicação com o banco.
* **Docker** e **Docker Compose** para containerização do ambiente de desenvolvimento.
* **JSON Web Tokens (JWT)** para autenticação.
* **Multer** para o gerenciamento de uploads de arquivos.
* **Swagger** para documentação da API.

#### **Infraestrutura de Deploy**
* **Frontend:** Hospedado no **GitHub Pages**.
* **Backend:** Hospedado no **Render** (Web Service).
* **Banco de Dados e Armazenamento de Arquivos:** Hospedados no **Supabase** (PostgreSQL e Storage).

---

## 🛠️ Como Executar o Projeto em deploy

A estrutura do código está organizada da seguinte maneira para desenvolvimento e produção:

* **`main`**: Esta é a pasta (ou branch) principal que contém todos os arquivos do projeto.
    * **Frontend**: O código do frontend pode ser executado tanto localmente, abrindo os arquivos `.html`, quanto pelo link de deploy.
    * **Backend**: Para uma experiência completa de desenvolvimento e teste, o backend presente nesta pasta deve ser executado localmente na sua máquina.

* **`tests/deploy_em_render`**: Esta pasta contém a versão do código que foi configurada especificamente para o deploy do backend na plataforma Render. Ela serve exclusivamente para a versão em produção da nossa API.
   OBS: infelizmente parte das funcoes e regras de negócio não funcionam em deploy, pelo fato de utilizarmos serviços gratuitos e possuirem limites de uso.
---

## 🚀 Como Executar o Projeto Localmente

Para rodar a aplicação completa na sua máquina, siga os passos abaixo.

#### **Pré-requisitos**
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) (versão 18 ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [VS Code](https://code.visualstudio.com/) com a extensão **Live Server**

### **1. Backend (com Docker)**

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/RodriguessLucas/projeto_banco_de_materiais_de_estudo_colaborativo.git](https://github.com/RodriguessLucas/projeto_banco_de_materiais_de_estudo_colaborativo.git)
    ```

2.  **Navegue até a Pasta do Backend:**
    ```bash
    cd projeto_banco_de_materiais_de_estudo_colaborativo/backend
    ```

3.  **Crie o Arquivo de Ambiente (`.env`):**
    Na raiz da pasta `backend`, crie um arquivo `.env` e cole o conteúdo abaixo.
    ```env
    # Variáveis para o banco de dados LOCAL do Docker
    DB_HOST=db
    DB_USER=postgres
    DB_PASS=docker
    DB_NAME=meubanco_dev
    DB_DIALECT=postgres

    # Variáveis da Aplicação
    PORT=5555
    JWT_SECRET=meu_jwt_secret_super_seguro
    ```

4.  **Inicie os Contêineres:**
    Este comando irá construir e iniciar o backend e o banco de dados local.
    ```bash
    docker compose up --build
    ```
    Aguarde a mensagem `🚀 Servidor rodando em: http://localhost:5555`.

### **2. Frontend (com Live Server)**

1.  **Abra a Pasta no VS Code:**
    Abra uma **nova janela** do VS Code e arraste a pasta `frontend` do projeto para dentro dela.

2.  **Ajuste a URL da API:**
    Nos arquivos `.js` do frontend (como `login.js`, `home.js`, etc.), garanta que a variável `API_BASE_URL` esteja definida para o servidor local:
    ```javascript
    const API_BASE_URL = 'http://localhost:5555';
    ```

3.  **Inicie o Live Server:**
    * No painel de arquivos, clique com o botão direito no arquivo `login.html`.
    * Selecione **"Open with Live Server"**.

---

## 📄 Documentação Completa

Toda a documentação do projeto, incluindo a idealização e o planejamento, está disponível neste repositório. Consulte os arquivos para mais detalhes sobre:

* **Requisitos Funcionais e Não Funcionais**
* **Personas**
* **Casos de Uso**
* E demais artefatos de desenvolvimento.

---

## 💡 Considerações Finais

Gostaríamos de agradecer imensamente à professora Valéria pela orientação, paciência e por todo o conhecimento compartilhado ao longo desta jornada.

Por questões de tempo, não conseguimos implementar nem metade das funcionalidades que havíamos idealizado para a plataforma. No entanto, estamos muito orgulhosos do que conseguimos construir e, acima de tudo, agradecemos pela experiência. Este projeto foi um grande aprendizado sobre desenvolvimento, trabalho em equipe e superação de desafios.

Obrigado!
