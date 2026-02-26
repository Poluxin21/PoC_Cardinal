# Desafio Open Cardinal – Downtime Zero

## Preparação

O desafiante precisa do **Node.js 18 ou superior** instalado.

1. Na pasta do projeto, ele roda:

   ```bash
   npm install
   ```

   Isso baixa os drivers **gRPC**, que já estão definidos no `package.json`.

2. Em seguida, ele inicia o servidor:

   ```bash
   npm start
   ```

3. Em **outro terminal**, ele roda o cliente fraudador:

   ```bash
   npm run hacker
   ```

---

## O Problema – A dor do Downtime

* O desenvolvedor pressiona **Ctrl+C** no `BankServer.js` para alterar o limite de transferência de **10000 para 5000**.
* Exatamente nesse momento:

  * O `FraudClient.js` começa a **piscar a tela em vermelho**.
  * Ele passa a **contabilizar o prejuízo por segundo**, enquanto o servidor Node.js está fora do ar.
* O problema: o **Node demora alguns segundos para subir novamente**, e cada segundo representa dinheiro perdido.

---

## A Solução do Desafiante – O gRPC

* O desenvolvedor integra o **Open Cardinal** usando gRPC.

* Para isso, ele utiliza as bibliotecas do Node:

  * `@grpc/grpc-js`
  * `@grpc/proto-loader`

* Essas bibliotecas são usadas para:

  * Carregar o arquivo `.proto`
  * Chamar o **Open Cardinal em background**, sem derrubar o servidor

* Após finalizar a integração, o desenvolvedor sobe o servidor novamente.

* O cliente fraudador recomeça o ataque, tentando transferir **R$ 9000**.

---

## A Magia – Downtime Zero ✨

* Agora vem o truque final:

  1. Você abre o script `limit.lua` do **Open Cardinal**.
  2. Altera o limite de **10000 para 5000**.
  3. Salva o arquivo.

* Resultado imediato:

  * O cliente fraudador mostra na tela:

    **🛑 BLOQUEADO**

  * O cronômetro do Node.js continua marcando:

    **0s de downtime** 🚀

---

## Conclusão

O desafio demonstra que:

* Reiniciar serviços críticos gera **downtime e prejuízo**.
* gRPC permite **integração dinâmica** com motores externos.
* O Open Cardinal possibilita **mudança de regras em tempo real**, sem parar o sistema.

💡 **Regra mudou, servidor não caiu, ataque bloqueado.**
