<h1 align="center">
  Modelagem Avançada no Redis: Exploração de Hashes, Sorted Sets e Streams
</h1>

## 💻 Sobre o projeto

Projeto desenvolvido para o [artigo](https://medium.com/@fabianapduarte/modelagem-avan%C3%A7ada-no-redis-explora%C3%A7%C3%A3o-de-hashes-sorted-sets-e-streams-828797ff54c7) desenvolvido para a avaliação da disciplina de Banco de Dados NoSQL do curso de Tecnologia da Informação (IMD/UFRN).

A aplicação tem objetivo gerenciar playlists de músicas utilizando Node.js, Express e Redis.

---

## ⚙ Funcionalidades

- Catalogar músicas;
- Selecionar músicas para uma lista de reprodução;
- Exibir a playlist, apresentando em tempo real quando novas músicas são adicionadas;
- Visualizar ranking de músicas mais tocadas.

---

## 🚀 Como executar o projeto

Para executar o projeto, siga os seguintes passos:

1. É preciso ter o Node.js e o Redis instalado na sua máquina.
2. No terminal:

```bash
# Clone este repositório
$ git clone git@github.com:fabianapduarte/redis-playlist.git

# Acesse a pasta do projeto no terminal/cmd
$ cd redis-playlist

# Instale as dependências
$ npm ci

# Execute a apicação
$ npm start

# Execute o consumidor em outro terminal
$ npm run consumer
```

---

## 👥 Autores

- Fabiana Pereira
- Samuel Costa
