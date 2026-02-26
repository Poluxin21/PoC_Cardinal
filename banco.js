const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/transfer') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            let amount = 0;
            try {
                const parsed = JSON.parse(body);
                amount = parseFloat(parsed.amount);
            } catch (e) {
                amount = 0;
            }

            let blocked = false;

            // =====================================================================
            // 🔴 DESAFIO: INTEGRAÇÃO OPEN CARDINAL (gRPC)
            // =====================================================================
            // Atualmente, a regra de segurança está "hardcoded" no código abaixo.
            // Quando a fraude acontecer, teríamos que parar o servidor para alterar.
            // 
            // O SEU OBJETIVO: 
            // 1. Copie o arquivo 'cardinal.proto' para esta pasta.
            // 2. Use os pacotes instalados (@grpc/grpc-js e @grpc/proto-loader).
            // 3. Remova este 'if' abaixo.
            // 4. Conecte-se ao daemon Open Cardinal via gRPC (localhost:50051).
            // 5. Envie um 'Pulse' com a telemetria (amount).
            // 6. Bloqueie a transferência se a 'Reaction' retornar type = 1 (SHUTDOWN).
            // =====================================================================
            
            if (amount > 10000.00) {
                blocked = true;
            }

            // =====================================================================

            if (blocked) {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end('🚫 Transferencia Bloqueada: Limite de seguranca excedido!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`✅ Transferencia de R$ ${amount.toFixed(2)} realizada com sucesso.`);
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método não permitido');
    }
});

server.listen(8000, () => {
    console.log("🏦 Servidor Bancário rodando na porta 8000...");
    console.log("Aguardando requisições...");
});