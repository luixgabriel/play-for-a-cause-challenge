<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Desafio Play for a cause, Chat em Nest.js!
O desafio constava em desenvolver uma aplicação de chat com next.js, com uma autenticação de usuário simples e envio de mensagens em tempo real.

## Visão Geral

O projeto foi desenvolvido utilizando o framework Nest.js, conforme solicitado, proporcionando uma arquitetura eficiente baseada nos princípios da Clean Architecture, juntamente com a aplicação de padrões de projeto como injeção de dependências, alinhada às melhores práticas de desenvolvimento. O banco de dados utilizado foi o PostgreSQL, e para otimizar sua utilização, incorporamos o Prisma como ORM.

## Tecnologias Utilizadas

- **JWT Token:** Utilizado para criar e gerenciar tokens de autenticação na nossa aplicação.

- **Hospedagem de imagem com Cloudinary:** Integração com o upload de imagens com o cloudinary junto com o multer para salvar a foto de perfil do usuário.

- **Socket.IO:** A versão server do Socket.IO para manipular os usuários onlines e o envio de mensagens em tempo real.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- `Node.js` (versão 12 ou superior)
- `NPM` (gerenciador de pacotes do Node.js)
- `Postgres SQL` (instância local ou remota)

## Instalação

1. Clone este repositório: git clone [https://github.com/luixgabriel/play-for-a-cause-challenge.git](https://github.com/luixgabriel/play-for-a-cause-challenge.git)
2. Navegue até o diretório do projeto: `cd play-for-a-cause-chat`
3. Instale as dependências: `npm install`

### Defina as variáveis de ambiente
- Crie o arquivo `.env` e configure as variáveis de ambiente necessárias, que são DATABASE_UR, JWT_SECRET, CLOUD_API_HOST, CLOUD_API_KEY e CLOUD_API_SECRET.
  
### Execute o Projeto

```
npm run start
```
## Endpoints

#### Teams

- `GET /`: Lista todos os times cadastrados no banco de dados.
- `GET /show/:id`: Lista um time específico pelo id dele no banco de dados.
- `POST /create`: Realiza um cadastro de um time no banco de dados.
- `PUT /update/:id`: Realiza a atualização no cadastro de um time específico pelo id no banco de dados.
- `DELETE /delete/:id`: Deleta um time específico pelo id no banco de dados.

#### Players

- `GET /player/showPLayers`: Lista todos os jogadores cadastrados no banco de dados.
- `GET /player/selectedPlayer/:id`: Lista um jogador específico pelo id dele no banco de dados.
- `POST /player`: Realiza um cadastro de um jogador no banco de dados.
- `PUT /player/updatePlayer/:id`: Realiza a atualização no cadastro de um jogador específico pelo id no banco de dados.
- `DELETE /player/deletePlayer/:id`: Deleta um jogador específico pelo id no banco de dados.

#### Match

- `GET /match/matches`: Lista todas as partidas cadastradas no banco de dados.
- `GET /match/searchmatch/:id`: Lista uma partida específica pelo id dela no banco de dados.
- `POST /match`: Realiza um cadastro de uma partida no banco de dados.
- `PUT /match/current/:id`: Lista a partida em andamento específica pelo id e atualiza os eventos dela.
- `DELETE /match/deleteMatch/:id`: Deleta uma partida específica pelo id no banco de dados.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```
📂 prisma
 ┗ 📜 multer.js
📂 src
 ┗ 📂 auth
  ┗ 📂 dto
    ┗ 📜 auth-login.dto.ts
    ┗ 📜 auth-register.dto.ts
  ┗ 📜 auth.controller.ts
  ┗ 📜 auth.module.ts
  ┗ 📜 auth.service.ts
 ┗ 📂 chat
  ┗ 📂 dto
    ┗ 📜 create-chat.dto.ts
    ┗ 📜 update-chat.dto.ts
  ┗ 📜 chat.controller.ts
  ┗ 📜 chat.module.ts
  ┗ 📜 chat.service.ts
 ┗ 📂 guards
  ┗ 📜 auth.guard.ts
 ┗ 📂 message
   ┗ 📂 dto
    ┗ 📜 create-message.dto.ts
    ┗ 📜 update-message.dto.ts
  ┗ 📜 message.controller.ts
  ┗ 📜 message.module.ts
  ┗ 📜 message.service.ts
 ┗ 📂 prisma
  ┗ 📜 prisma.service.ts
  ┗ 📜 prisma.module.ts
 ┗ 📂 users
  ┗ 📂 dto
    ┗ 📜 create-user.dto.ts
    ┗ 📜 update-user.dto.ts
  ┗ 📜 users.controller.ts
  ┗ 📜 users.module.ts
  ┗ 📜 users.service.ts
 ┗ 📜  app.controller.ts
 ┗ 📜  app.module.ts
 ┗ 📜  app.service.ts
 ┗ 📜  main.ts
 ┗ 📜  socket-gateway.ts
📂 storage

```

