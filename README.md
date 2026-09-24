# Texas Burguer API

API backend para o sistema de delivery Texas Burguer, desenvolvida para gerenciar usuários, autenticação, catálogo de produtos, pedidos, categorias e pagamentos.

O projeto foi estruturado para servir como base de um fluxo completo de e-commerce gastronômico, com foco em organização, segurança, escalabilidade e integração com interfaces frontend.

---

## Visão geral

A aplicação oferece suporte às operações essenciais de um restaurante digital, incluindo:

- Cadastro e autenticação de clientes e administradores
- Gestão de produtos e categorias
- Criação, listagem e atualização de pedidos
- Controle de status do pedido
- Integração com processamento de pagamento
- Upload de imagens para produtos e categorias

---

## Funcionalidades

### Para usuários

- Cadastro de conta
- Login com autenticação JWT
- Consulta de produtos
- Consulta por categorias
- Criação de pedidos
- Acompanhamento do status do pedido

### Para administração

- Cadastro de novos produtos
- Edição e remoção de itens
- Cadastro de categorias
- Listagem completa de pedidos
- Atualização do status do pedido
- Fluxo de pagamento via Stripe

---

## Stack tecnológica

- Node.js
- Express
- Sequelize
- PostgreSQL
- MongoDB
- JWT
- Bcrypt
- Multer
- Stripe
- dotenv
- CORS

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18+
- pnpm
- PostgreSQL
- Git
- Opcional: Docker e MongoDB local

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/DevRainer/texas-burguer.git
cd texas-burguer
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o conteúdo abaixo:

```env
PORT=3001
JWT_SECRET=seuSegredoAqui
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=texasburguer
```

> O projeto também possui configuração local em `src/config/database.cjs`, que define conexão com PostgreSQL. Ajuste os dados conforme seu ambiente local.

### 4. Configure o banco de dados

Certifique-se de que o PostgreSQL esteja em execução e com um banco disponível.

Se necessário, ajuste as credenciais em:

- `src/config/database.cjs`

### 5. Execute a seed inicial

Para criar um usuário administrador de exemplo:

```bash
node seed.js
```

### 6. Inicie a aplicação

```bash
pnpm dev
```

A API estará disponível em:

```bash
http://localhost:3001
```

---

## Usuários de teste

Os dados abaixo podem ser usados para testar os fluxos locais da aplicação:

### Administrador

- Email: `rainer@gmail.com`
- Senha: `123456`

### Usuário comum

- Email: `paulo@gmail.com`
- Senha: `123456`

---

## Estrutura do projeto

```text
texas-burguer/
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── config/
│   ├── database/
│   ├── app.js
│   ├── routes.js
│   └── server.js
├── uploads/
├── .env
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── seed.js
├── README.md
└── .gitignore
```

---

## Endpoints principais

### Autenticação

| Método | Rota        | Descrição                         |
| ------ | ----------- | --------------------------------- |
| POST   | `/sessions` | Realiza login e retorna token JWT |
| POST   | `/users`    | Cria novo usuário                 |
| GET    | `/users`    | Lista usuários                    |

### Produtos

| Método | Rota                               | Descrição                 |
| ------ | ---------------------------------- | ------------------------- |
| POST   | `/Products` ou `/products`         | Cria novo produto (admin) |
| GET    | `/Products` ou `/products`         | Lista produtos            |
| PUT    | `/Products/:id` ou `/products/:id` | Atualiza produto (admin)  |

### Categorias

| Método | Rota                                   | Descrição                  |
| ------ | -------------------------------------- | -------------------------- |
| POST   | `/Categories` ou `/categories`         | Cria categoria (admin)     |
| GET    | `/Categories` ou `/categories`         | Lista categorias           |
| PUT    | `/Categories/:id` ou `/categories/:id` | Atualiza categoria (admin) |

### Pedidos

| Método | Rota                    | Descrição                 |
| ------ | ----------------------- | ------------------------- |
| POST   | `/Orders`               | Cria pedido               |
| GET    | `/Orders`               | Lista pedidos             |
| GET    | `/Orders/:id`           | Busca pedido por ID       |
| PUT    | `/Orders/:id`           | Atualiza pedido           |
| PUT    | `/Orders/:id/status`    | Atualiza status do pedido |
| POST   | `/Orders/:id/advance`   | Avança status do pedido   |
| GET    | `/Orders/status/labels` | Retorna labels de status  |
| DELETE | `/Orders/:id`           | Remove pedido             |

### Pagamentos

| Método | Rota                     | Descrição                             |
| ------ | ------------------------ | ------------------------------------- |
| POST   | `/create-payment-intent` | Cria intenção de pagamento com Stripe |

---

## Scripts disponíveis

No arquivo `package.json`, os principais scripts são:

```bash
pnpm dev
pnpm dev:verbose
```

O comando principal inicia o servidor em modo de desenvolvimento com observação de alterações.

---

## Contribuição

Contribuições são bem-vindas. Para contribuir com o projeto:

```bash
git checkout -b minha-feature
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin minha-feature
```

Em seguida, abra um Pull Request para revisão.

---

## Autor

Desenvolvido por Rainer, com foco em backend, arquitetura de APIs e desenvolvimento fullstack.

---

## Observação

Este README foi organizado para servir como guia de apresentação, execução e manutenção da API, proporcionando uma visão clara do projeto, suas rotas e os passos necessários para rodar o ambiente local de desenvolvimento.
