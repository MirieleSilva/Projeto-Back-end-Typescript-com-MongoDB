## API REST - Estoque de Perfumes Importados

Projeto em TypeScript + Express para controle de perfumes e estoque. Atende aos requisitos: rotas protegidas, CRUD completo, DTOs validados, persistência em memória ou MongoDB e seeds.

## Tecnologias

Node.js, Express

TypeScript

JWT (jsonwebtoken) + bcryptjs

Zod (validação)

MongoDB + Mongoose / repositórios em memória

Jest + Supertest (testes)

## Requisitos

Node 18+

MongoDB local/Atlas


## Endpoints

# Perfumes

POST /perfumes — criar

GET /perfumes — listar

GET /perfumes/:id — obter

PUT /perfumes/:id — atualizar

DELETE /perfumes/:id — excluir

# Estoque

PUT /estoque/:perfumeId — definir/atualizar quantidade

GET /estoque/:perfumeId — obter quantidade

GET /estoque — listar todos

DELETE /estoque/:perfumeId — excluir registro
