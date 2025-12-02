// KidShield API - Backend TypeScript
// Conecta Smart Contract Midnight com aplicações externas

import express, { Request, Response } from 'express';
import cors from 'cors';

// Tipos do contrato
interface ChildRecord {
  childId: string;
  ageProofHash: string;
  parentId: string;
  registrationTimestamp: number;
  isActive: boolean;
}

interface VerificationResult {
  isVerified: boolean;
  ageRange: number;
  timestamp: number;
}

interface ThreatReport {
  reportId: string;
  victimId: string;
  suspectId: string;
  threatLevel: number;
  platformId: string;
  timestamp: number;
}

interface Statistics {
  totalChildrenRegistered: number;
  totalVerifications: number;
  totalThreatsBlocked: number;
  contractActive: boolean;
}

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Storage temporário (em produção, seria blockchain)
let children: ChildRecord[] = [];
let verifications: VerificationResult[] = [];
let threats: ThreatReport[] = [];

// ==========================================
// ROTAS DA API
// ==========================================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'KidShield API',
    blockchain: 'Midnight Network',
    timestamp: Date.now()
  });
});

// Registrar criança
app.post('/api/register-child', async (req: Request, res: Response) => {
  try {
    const { parentId, childName, birthYear } = req.body;
    
    // Validações
    if (!parentId || !childName || !birthYear) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const currentYear = 2024;
    const age = currentYear - birthYear;
    
    if (age < 5 || age > 17) {
      return res.status(400).json({
        success: false,
        error: 'Child must be between 5-17 years old'
      });
    }
    
    // Simular chamada ao smart contract
    await simulateBlockchainDelay();
    
    // Criar registro
    const childId = generateId('child');
    const ageProofHash = generateId('proof');
    
    const record: ChildRecord = {
      childId,
      ageProofHash,
      parentId,
      registrationTimestamp: Date.now(),
      isActive: true
    };
    
    children.push(record);
    
    res.json({
      success: true,
      data: {
        childId,
        ageProofHash,
        age,
        ageRange: calculateAgeRange(age),
        message: 'Child registered successfully on Midnight blockchain'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Verificar criança
app.post('/api/verify-child', async (req: Request, res: Response) => {
  try {
    const { childId, platformId } = req.body;
    
    if (!childId || !platformId) {
      return res.status(400).json({
        success: false,
        error: 'Missing childId or platformId'
      });
    }
    
    // Simular chamada ao smart contract
    await simulateBlockchainDelay();
    
    // Buscar criança
    const child = children.find(c => c.childId === childId);
    
    if (!child) {
      return res.status(404).json({
        success: false,
        error: 'Child not found',
        isVerified: false
      });
    }
    
    // Criar resultado de verificação
    const verification: VerificationResult = {
      isVerified: true,
      ageRange: 2, // 8-12 anos (simplificado)
      timestamp: Date.now()
    };
    
    verifications.push(verification);
    
    res.json({
      success: true,
      data: {
        isVerified: true,
        ageRange: verification.ageRange,
        ageRangeDescription: getAgeRangeDescription(verification.ageRange),
        protections: {
          blockAdultDMs: true,
          contentFilter: true,
          parentalMonitoring: true,
          safeMatchmaking: true
        },
        message: 'Child verified successfully'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Reportar ameaça
app.post('/api/report-threat', async (req: Request, res: Response) => {
  try {
    const { victimId, suspectId, platformId, threatLevel } = req.body;
    
    if (!victimId || !suspectId || !platformId || !threatLevel) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Simular chamada ao smart contract
    await simulateBlockchainDelay();
    
    // Criar report
    const reportId = generateId('report');
    
    const threat: ThreatReport = {
      reportId,
      victimId,
      suspectId,
      threatLevel,
      platformId,
      timestamp: Date.now()
    };
    
    threats.push(threat);
    
    // Determinar se é alerta crítico
    const isCritical = threatLevel >= 7;
    
    res.json({
      success: true,
      data: {
        reportId,
        isCritical,
        actions: {
          addedToBlacklist: true,
          parentsNotified: isCritical,
          authoritiesNotified: isCritical && threatLevel >= 9,
          crossPlatformBlock: true
        },
        message: 'Threat reported and registered on blockchain'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Obter estatísticas
app.get('/api/statistics', async (req: Request, res: Response) => {
  try {
    await simulateBlockchainDelay();
    
    const stats: Statistics = {
      totalChildrenRegistered: children.length,
      totalVerifications: verifications.length,
      totalThreatsBlocked: threats.length,
      contractActive: true
    };
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Listar crianças registradas (apenas para demo)
app.get('/api/children', async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: children.map(c => ({
        childId: c.childId,
        registrationTimestamp: c.registrationTimestamp,
        isActive: c.isActive
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;
}

function calculateAgeRange(age: number): number {
  if (age <= 7) return 1; // 5-7 anos
  if (age <= 12) return 2; // 8-12 anos
  return 3; // 13-17 anos
}

function getAgeRangeDescription(range: number): string {
  switch (range) {
    case 1: return '5-7 years';
    case 2: return '8-12 years';
    case 3: return '13-17 years';
    default: return 'Unknown';
  }
}

function simulateBlockchainDelay(): Promise<void> {
  // Simular latência da blockchain (500-1500ms)
  const delay = 500 + Math.random() * 1000;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log('🛡️  KidShield API Server');
  console.log('📡 Midnight Network Integration');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  GET  /health - Health check`);
  console.log(`  POST /api/register-child - Register child`);
  console.log(`  POST /api/verify-child - Verify child`);
  console.log(`  POST /api/report-threat - Report threat`);
  console.log(`  GET  /api/statistics - Get statistics`);
  console.log(`  GET  /api/children - List registered children`);
});

export default app;
