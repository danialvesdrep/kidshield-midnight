# KidShield Smart Contract

## Visão Geral

Contrato inteligente em Compact (Midnight Network) para proteção de crianças online usando Zero Knowledge Proofs.

## Funcionalidades

### 1. Registro de Crianças
- Pais registram criança com verificação de idade
- Gera prova ZK de faixa etária (não revela data exata)
- Armazena de forma imutável na blockchain

### 2. Verificação de Plataformas
- Plataformas verificam se usuário é criança
- Recebem apenas faixa etária (5-7, 8-12, 13-17)
- Zero dados pessoais expostos

### 3. Sistema de Denúncias
- Registro imutável de tentativas de contato suspeitas
- Blacklist global cross-platform
- Alertas automáticos para ameaças críticas

### 4. Estatísticas
- Total de crianças protegidas
- Verificações realizadas
- Ameaças bloqueadas

## Estrutura de Dados
```compact
ChildRecord {
  childId: Bytes<32>           // ID único
  ageProofHash: Bytes<32>      // Prova ZK de idade
  parentId: Bytes<32>          // ID do responsável
  registrationTimestamp: Uint64
  isActive: Boolean
}
```

## Circuitos Principais

- `registerChild()` - Registrar nova criança
- `verifyChild()` - Verificar status
- `reportThreat()` - Reportar ameaça
- `getStatistics()` - Obter estatísticas

## Privacidade

✅ Zero Knowledge Proofs garantem que:
- Idade exata nunca é revelada
- Apenas faixa etária é compartilhada
- Dados pessoais permanecem privados
- Blockchain imutável garante auditoria

## Compilação
```bash
# Instalar dependências Midnight
yarn add @midnight-ntwrk/compact-runtime

# Compilar contrato
npx compact compile contract/src/kidshield.compact
```

## Status

🚧 Protótipo em desenvolvimento - Midnight Testnet
