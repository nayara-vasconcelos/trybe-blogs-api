# Trybe Blogs API

**Status:** Finalizado em Julho de 2022.

<br>

## O projeto:

A API se trata de um sistema de gerenciamento de conteúdos para um blog, em que um usuário pode se cadastrar ou excluir sua conta, se logar, criar, editar e excluir seus posts quando autenticado, além de ler posts de outros usuários.

Esse projeto foi proposto pela [Trybe](https://www.betrybe.com/) para praticar e fixar os conteúdos estudados e teve como desafio desenvolver uma RESTful API com arquitetura MSC (Model-Service-Controller) utilizando Sequelize para gerenciar o banco de dados no MySQL e JWT para autenticação.

:warning: **Obs:** Alguns commits e arquivos de autoria da Trybe necessários para o sistema de avaliação, como alguns testes automatizados, foram excluídos. Todos os arquivos de configuração são de autoria da Trybe, assim como os arquivos Dockerfile, docker-compose.yml e os arquivos da pasta src/database/seeders.

<br>

## Tecnologias usadas:

Node.js com JavaScript, Express.js, Sequelize, JWT e npm para instalar e executar dependências.

<br>

## Requisitos para executar o projeto:

Esse projeto utiliza a versão 16 do Node e a versão 8.0.21 do MySQL.

Para executar esse projeto em sua máquina é necessário instalar o Node.js e o MySQL.

:warning: **Obs:** Caso possua o Docker e o Docker Compose instalado em sua máquina, você pode configurar o arquivo `.env` na raiz do projeto e executar o comando `docker-compose up -d` para criar os containers de Node e MySQL.
Dessa forma será necessário instalar as dependências do projeto dentro do container (Node) utilizando o comando `docker exec -it blogs_api bash` (caso utilize o VS Code, também é possível usar as extensões Remote - Containers ou Docker) para anexar o terminal da sua máquina ao terminal do container.

<br>

## Como instalar e executar o projeto:

**1) Clone o repositório em sua máquina:**
* Ex: `git clone git@github.com:nayara-vasconcelos/trybe-blogs-api.git` OU `git clone https://github.com/nayara-vasconcelos/trybe-blogs-api.git`

**2) Entre na pasta do projeto:**
* Ex: `cd /trybe-blogs-api`

**3) Configure o arquivo .env:**
* Ex: Renomeie o arquivo `.env.example` para `.env`

---
### :warning: ATENÇÃO :warning:: Caso esteja usando Docker, lembre-se de executar os scripts (npm) no terminal do container (Node).
---

**4) Instale o projeto:**
* Ex: `npm install`

**5) Após se conectar ao MySQL, crie o banco de dados e as tabelas:**
* Ex: `npm run prestart`

**6) Popule as tabelas do banco de dados:**
* Ex: `npm run seed`

**7) Execute a aplicação:**
* Ex: `npm start`  OU `npm run dev`

<br>

### Pronto! Agora você pode testar a aplicação na sua máquina.

:bulb: **Dica:** Você pode utilizar a extensão Thunder Client no VS Code ou instalar o Insomnia para testar as rotas.