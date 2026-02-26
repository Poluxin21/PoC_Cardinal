const url = 'http://localhost:8000/transfer';

console.log("😈 Iniciando ataque de fraude!");
console.log("Sacando R$ 9000 repetidamente (abaixo do limite de 10k)...");
console.log("---------------------------------------------------");

let tentativas = 1;
let isServerDown = false;
let downtimeStart = 0;

async function attack() {
    const payload = JSON.stringify({ amount: 9000.00, account_id: "hacker_99" });

    try {
        // Timeout de 1 segundo para não travar a chamada se o servidor cair
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);

        // A API fetch é nativa do Node.js a partir da versão 18
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Se o servidor estava fora do ar e agora respondeu, paramos o contador
        if (isServerDown) {
            const downtimeEnd = Date.now();
            const downtimeSeconds = ((downtimeEnd - downtimeStart) / 1000).toFixed(1);
            console.log("\n\n✅ SERVIDOR VOLTOU!");
            console.log(`🩸 Tempo total de DOWNTIME: ${downtimeSeconds} segundos.`);
            console.log(`💸 Prejuízo estimado durante a queda: R$ ${Math.floor(downtimeSeconds * 1500)}`);
            console.log("---------------------------------------------------");
            isServerDown = false;
        }

        const text = await response.text();
        if (response.status === 200) {
            console.log(`💸 SUCESSO [${tentativas}]: Roubou R$ 9000!`);
        } else {
            console.log(`🛑 BLOQUEADO [${tentativas}]: ${text}`);
        }

    } catch (error) {
        // Se deu erro (ECONNREFUSED) ou timeout, o servidor caiu (ex: Ctrl+C)
        if (!isServerDown) {
            isServerDown = true;
            downtimeStart = Date.now();
            console.log("\n💥 O SERVIDOR CAIU! (Iniciando contador de downtime...)");
        } else {
            const currentDowntime = Math.floor((Date.now() - downtimeStart) / 1000);
            // O \r sobrescreve a mesma linha no terminal (animação de relógio)
            process.stdout.write(`\r⏳ Servidor fora do ar... Downtime atual: ${currentDowntime}s`);
        }
    }

    tentativas++;
    // Tenta roubar a cada 1 segundo
    setTimeout(attack, 1000);
}

// Inicia o loop
attack();