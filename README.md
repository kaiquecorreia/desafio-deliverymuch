# Delivery Much

Test for Delivery Much

# Instalação com Docker

## Dependências

- Ter o Node instalado em seu ambiente.
- Ter yarn(recomendado) ou npm instalado.
- Ter docker instalado com suporte a docker compose
- Ter o git instalado em seu ambiente

## Pré Requisitos

- Verifique se nenhum serviço está utilizando as portas 3333, 6379;

## Instalação

- No terminal acesse uma pasta de preferência e clone o repositório do test:
  git clone https://github.com/kaiquecorreia/desafio-deliverymuch.git
- Acesse a pasta do repositório: cd desafio-deliverymuch
- Rode o comando: yarn(Recomendado) ou npm install
- Rode o comando: docker-compose up -d; Obs: No windows o docker pode pedir permissões de acesso, caso aconteça de as permissões e caso não esteja funcionando exclua os containers e rode o comando novamente.

- Seu ambiente deve estar funcionado a partir de agora! 😁

## Execução

- Endpoints da API: http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}
- Exemplo: http://localhost:3333/recipes?i=onions,tomato
- Para tesar a API utilize um browser e acesse a url de exemplo:
  http://localhost:3333/recipes?i=onions,tomato

## Testes

- Para rodar os testes apenas acesse a pasta do projeto e rode o comando:
  yarn test ou npm run test

# Instalação sem Docker

## Dependências

- Ter o Node instalado em seu ambiente.
- Ter yarn(recomendado) ou npm instalado.
- Ter o git instalado em seu ambiente.
- Ter instalado o redis em seu ambiente.

## Pré Requisitos

- Verifique se nenhum serviço está utilizando as portas 3333, 6379;

## Instalação

- No terminal acesse uma pasta de preferência e clone o repositório do test:
  git clone https://github.com/kaiquecorreia/desafio-deliverymuch.git
- Acesse a pasta do repositório: cd desafio-deliverymuch
- Rode o comando: yarn(Recomendado) ou npm install
- Agora acesse o arquivo "pastadoprojeto"/src/app/config/redis.js, e edite as configurações conforme o seu redis instalado no seu ambiente.

- Seu ambiente deve estar funcionado a partir de agora! 😁

## Execução

- Endpoints da API: http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}
- Exemplo: http://localhost:3333/recipes?i=onions,tomato
- Para tesar a API utilize um browser e acesse a url de exemplo:
  http://localhost:3333/recipes?i=onions,tomato

## Testes

- Para rodar os testes apenas acesse a pasta do projeto e rode o comando:
  yarn test ou npm run test

# Curiosidades

- Foi utilizado o redis para fazer um cache temporário nas requisições e melhorar o tempo de resposta da api.
- Foram feitos testes unitários e teste de integração.
- O teste de integração verifica se o controller está funcionando corretamente e acessa diretamente as API's utilizadas no projeto. Caso tenha algum problema na api como ficar sem internet o teste de integração irá retornar um erro.

# Autor

- Kaique Correia.
