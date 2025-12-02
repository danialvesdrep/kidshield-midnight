// KidShield SDK - Exemplos de Uso

import { KidShield } from './index';

// ==========================================
// EXEMPLO 1: Setup Básico
// ==========================================

const kidshield = new KidShield({
  apiKey: 'your_api_key_here',
  network: 'testnet'
});

// ==========================================
// EXEMPLO 2: Registrar Criança
// ==========================================

async function example_registerChild() {
  try {
    const result = await kidshield.registerChild({
      parentId: 'parent_maria_123',
      childName: 'João Silva',
      birthYear: 2014
    });
    
    console.log('✅ Criança registrada!');
    console.log('Child ID:', result.childId);
    console.log('Idade:', result.age, 'anos');
    console.log('Faixa etária:', result.ageRange);
    
    return result.childId;
  } catch (error) {
    console.error('❌ Erro ao registrar:', error);
  }
}

// ==========================================
// EXEMPLO 3: Verificar Criança (Completo)
// ==========================================

async function example_verifyChild(childId: string) {
  try {
    const result = await kidshield.verifyChild({
      childId: childId,
      platformId: 'discord'
    });
    
    if (result.isVerified) {
      console.log('✅ Criança verificada!');
      console.log('Faixa etária:', result.ageRangeDescription);
      console.log('Proteções:', result.protections);
      
      // Aplicar proteções
      if (result.protections.blockAdultDMs) {
        console.log('🛡️  Bloqueando DMs de adultos...');
      }
      if (result.protections.contentFilter) {
        console.log('🛡️  Ativando filtro de conteúdo...');
      }
    } else {
      console.log('❌ Criança não verificada');
      console.log('⚠️  Bloquear acesso até verificação');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao verificar:', error);
    return null;
  }
}

// ==========================================
// EXEMPLO 4: Verificação Rápida (Simples)
// ==========================================

async function example_quickVerify(childId: string) {
  const isVerified = await kidshield.quickVerify(childId, 'roblox');
  
  if (isVerified) {
    console.log('✅ Acesso permitido');
    allowAccess();
  } else {
    console.log('❌ Acesso negado');
    blockAccess();
  }
}

// ==========================================
// EXEMPLO 5: Reportar Ameaça
// ==========================================

async function example_reportThreat(victimId: string) {
  try {
    const result = await kidshield.reportThreat({
      victimId: victimId,
      suspectId: 'suspect_adult_892',
      platformId: 'minecraft',
      threatLevel: 8, // 1-10 (7+ é crítico)
      description: 'Tentou pedir informações pessoais'
    });
    
    console.log('✅ Ameaça registrada!');
    console.log('Report ID:', result.reportId);
    
    if (result.isCritical) {
      console.log('🚨 ALERTA CRÍTICO - Pais notificados imediatamente');
    }
    
    if (result.actions.crossPlatformBlock) {
      console.log('🚫 Suspeito bloqueado em todas plataformas');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao reportar:', error);
  }
}

// ==========================================
// EXEMPLO 6: Estatísticas
// ==========================================

async function example_getStatistics() {
  try {
    const stats = await kidshield.getStatistics();
    
    console.log('📊 Estatísticas KidShield:');
    console.log('   Crianças protegidas:', stats.totalChildrenRegistered);
    console.log('   Verificações feitas:', stats.totalVerifications);
    console.log('   Ameaças bloqueadas:', stats.totalThreatsBlocked);
    console.log('   Status:', stats.contractActive ? '🟢 Ativo' : '🔴 Inativo');
    
    return stats;
  } catch (error) {
    console.error('❌ Erro ao obter estatísticas:', error);
  }
}

// ==========================================
// EXEMPLO 7: Integração em Discord Bot
// ==========================================

async function example_discordBot(userId: string) {
  // Quando novo usuário entra no servidor
  const isVerified = await kidshield.quickVerify(userId, 'discord');
  
  if (isVerified) {
    // Dar role "Criança Verificada"
    assignRole(userId, 'verified-child');
    
    // Configurar permissões
    setChannelPermissions(userId, {
      canDM: false, // Não pode receber DMs de adultos
      canJoinVoice: true, // Pode entrar em voz
      canUseEmojis: true
    });
    
    console.log(`✅ Usuário ${userId} configurado como criança verificada`);
  } else {
    // Pedir verificação
    sendVerificationRequest(userId);
  }
}

// ==========================================
// EXEMPLO 8: Integração em Jogo (Roblox/Minecraft)
// ==========================================

async function example_gameIntegration(playerId: string) {
  const verification = await kidshield.verifyChild({
    childId: playerId,
    platformId: 'roblox'
  });
  
  if (verification?.isVerified) {
    // Configurar matchmaking seguro
    const ageRange = kidshield.getAgeRangeInfo(verification.ageRange);
    
    console.log(`🎮 Jogador verificado: ${ageRange.description}`);
    
    // Só conectar com crianças da mesma faixa etária
    joinSafeMatch(playerId, ageRange.min, ageRange.max);
    
    // Desabilitar chat com adultos
    disableAdultChat(playerId);
    
    // Habilitar filtro de linguagem
    enableLanguageFilter(playerId);
  }
}

// ==========================================
// EXEMPLO 9: Health Check
// ==========================================

async function example_healthCheck() {
  const isOnline = await kidshield.healthCheck();
  
  if (isOnline) {
    console.log('✅ KidShield API online');
  } else {
    console.log('❌ KidShield API offline - usando modo fallback');
    // Aplicar proteções padrão
    applyDefaultProtections();
  }
}

// ==========================================
// EXEMPLO 10: Fluxo Completo
// ==========================================

async function example_completeFlow() {
  console.log('🚀 Iniciando fluxo completo KidShield\n');
  
  // 1. Registrar criança
  console.log('1️⃣ Registrando criança...');
  const childId = await example_registerChild();
  
  if (!childId) return;
  
  console.log('\n---\n');
  
  // 2. Verificar criança
  console.log('2️⃣ Verificando criança...');
  const verification = await example_verifyChild(childId);
  
  console.log('\n---\n');
  
  // 3. Simular ameaça
  console.log('3️⃣ Simulando tentativa de contato suspeito...');
  await example_reportThreat(childId);
  
  console.log('\n---\n');
  
  // 4. Ver estatísticas
  console.log('4️⃣ Obtendo estatísticas...');
  await example_getStatistics();
  
  console.log('\n✅ Fluxo completo executado!');
}

// ==========================================
// FUNÇÕES AUXILIARES (Placeholders)
// ==========================================

function allowAccess() { console.log('→ Acesso permitido'); }
function blockAccess() { console.log('→ Acesso bloqueado'); }
function assignRole(userId: string, role: string) { console.log(`→ Role ${role} atribuída`); }
function setChannelPermissions(userId: string, perms: any) { console.log('→ Permissões configuradas'); }
function sendVerificationRequest(userId: string) { console.log('→ Solicitação de verificação enviada'); }
function joinSafeMatch(playerId: string, min: number, max: number) { console.log(`→ Matchmaking seguro: ${min}-${max} anos`); }
function disableAdultChat(playerId: string) { console.log('→ Chat com adultos desabilitado'); }
function enableLanguageFilter(playerId: string) { console.log('→ Filtro de linguagem ativado'); }
function applyDefaultProtections() { console.log('→ Proteções padrão aplicadas'); }

// ==========================================
// EXECUTAR EXEMPLO
// ==========================================

// Descomente para testar:
// example_completeFlow();

export {
  example_registerChild,
  example_verifyChild,
  example_quickVerify,
  example_reportThreat,
  example_getStatistics,
  example_discordBot,
  example_gameIntegration,
  example_healthCheck,
  example_completeFlow
};
