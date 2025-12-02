# 🛡️ KidShield Protocol

**Proteção de Crianças Online usando Midnight Network e Zero Knowledge Proofs**

---

## 📋 Visão Geral

KidShield é um protocolo descentralizado de verificação e proteção infantil que pode ser integrado em redes sociais, jogos e plataformas digitais existentes. Construído na Midnight Network, garante privacidade total através de Zero Knowledge Proofs.

## 🎯 Problema

- **1 em 5 crianças** sofre assédio online
- **68% dos pais** não sabem o que filhos fazem online  
- **95% das plataformas** têm falhas críticas de verificação
- Sistemas atuais violam privacidade ou são facilmente burlados

## 💡 Solução

### Verificação Real via Blockchain
- Impossível mentir sobre idade
- Verificação parental obrigatória
- Identidade imutável

### Privacy-First Design
- Zero Knowledge Proofs nativos
- Dados pessoais nunca expostos
- Conformidade automática COPPA/LGPD/GDPR

### Cross-Platform Protection
- Uma verificação, todas plataformas
- Predadores bloqueados em todo ecossistema
- Controle parental unificado

### Real-Time Monitoring
- Notificações instantâneas de ameaças
- IA detecta comportamento suspeito
- Ação automática antes do dano

---

## 🏗️ Arquitetura
```
┌─────────────────────────────────────────────┐
│  Plataformas (Discord, Roblox, etc)        │
│  - Integram via SDK/API                     │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  KidShield API (Node.js/TypeScript)         │
│  - REST endpoints                           │
│  - Webhook system                           │
│  - Real-time notifications                  │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Smart Contract (Compact/Midnight)          │
│  - Child registration                       │
│  - Age verification (ZK Proofs)             │
│  - Threat reporting                         │
│  - Cross-platform blacklist                 │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Midnight Blockchain                        │
│  - Private state management                 │
│  - Zero Knowledge Proofs                    │
│  - Immutable audit trail                    │
└─────────────────────────────────────────────┘
```

---

## 📁 Estrutura do Projeto
```
kidshield-midnight/
├── contract/              # Smart Contracts (Compact)
│   ├── src/
│   │   └── kidshield.compact
│   └── README.md
├── api/                   # Backend API (TypeScript)
│   └── src/
│       └── index.ts
├── cli/                   # Command Line Interface
│   └── src/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js v20+
- Yarn
- Docker (para Proof Server)

### Setup
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/kidshield-midnight.git
cd kidshield-midnight

# Instalar dependências
yarn install

# Compilar TypeScript
yarn build
```

---

## 💻 Uso

### Iniciar API
```bash
yarn dev
```

A API estará disponível em `http://localhost:3000`

### Endpoints Principais

#### 1. Registrar Criança
```bash
POST /api/register-child

{
  "parentId": "parent_abc123",
  "childName": "João",
  "birthYear": 2014
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "childId": "child_xyz789",
    "ageProofHash": "proof_def456",
    "age": 10,
    "ageRange": 2,
    "message": "Child registered successfully"
  }
}
```

#### 2. Verificar Criança
```bash
POST /api/verify-child

{
  "childId": "child_xyz789",
  "platformId": "discord"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "isVerified": true,
    "ageRange": 2,
    "ageRangeDescription": "8-12 years",
    "protections": {
      "blockAdultDMs": true,
      "contentFilter": true,
      "parentalMonitoring": true,
      "safeMatchmaking": true
    }
  }
}
```

#### 3. Reportar Ameaça
```bash
POST /api/report-threat

{
  "victimId": "child_xyz789",
  "suspectId": "adult_suspect_456",
  "platformId": "roblox",
  "threatLevel": 8
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "reportId": "report_abc123",
    "isCritical": true,
    "actions": {
      "addedToBlacklist": true,
      "parentsNotified": true,
      "authoritiesNotified": false,
      "crossPlatformBlock": true
    }
  }
}
```

#### 4. Obter Estatísticas
```bash
GET /api/statistics
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalChildrenRegistered": 847,
    "totalVerifications": 3521,
    "totalThreatsBlocked": 142,
    "contractActive": true
  }
}
```

---

## 🔐 Smart Contract (Compact)

### Circuitos Principais

#### `registerChild()`
Registra criança com prova ZK de idade

#### `verifyChild()`
Verifica status sem revelar dados pessoais

#### `reportThreat()`
Registra incidente imutavelmente

#### `getStatistics()`
Retorna estatísticas do sistema

---

## 🎨 Frontend (Demo)

O protótipo HTML está em `/kidshield-web/index.html`

Para abrir:
```bash
open ../kidshield-web/index.html
```

---

## 🧪 Testes
```bash
# Rodar testes (em desenvolvimento)
yarn test
```

---

## 📊 Roadmap

### ✅ Fase 1: Protótipo (CONCLUÍDO)
- Smart contract básico
- API REST funcional
- Interface demo

### 🚧 Fase 2: Testnet (EM ANDAMENTO)
- Deploy no Midnight Testnet
- Integração com Proof Server
- Lace Wallet integration

### 📅 Fase 3: MVP (Q1 2025)
- SDK JavaScript/TypeScript
- Documentação completa
- Primeiros parceiros pilotos

### 📅 Fase 4: Mainnet (Q2 2025)
- Deploy em produção
- Certificação COPPA/GDPR
- Programa de desenvolvedores

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

MIT License - veja arquivo LICENSE para detalhes

---

## 📞 Contato

- **Website:** (em breve)
- **Email:** (seu email)
- **Twitter:** (seu twitter)

---

## 🌟 Por Que Midnight Network?

- ✅ Zero Knowledge Proofs nativos
- ✅ Privacidade + auditabilidade
- ✅ TypeScript/Compact (developer-friendly)
- ✅ Sidechain do Cardano (ecossistema maduro)
- ✅ Escalável e performático

---

## 🎯 Status

🟢 **Protótipo funcional** - Pronto para demonstração
🟡 **Testnet deployment** - Em desenvolvimento
⚪ **Production** - Planejado Q2 2025

---

**Construído com ❤️ para proteger crianças online**
