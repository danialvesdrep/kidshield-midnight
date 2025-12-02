// KidShield SDK
// Easy integration for child protection on any platform

import axios, { AxiosInstance } from 'axios';

// ==========================================
// TIPOS
// ==========================================

export interface KidShieldConfig {
  apiKey: string;
  apiUrl?: string;
  network?: 'testnet' | 'mainnet';
  timeout?: number;
}

export interface ChildRegistration {
  parentId: string;
  childName: string;
  birthYear: number;
}

export interface ChildRegistrationResult {
  success: boolean;
  childId: string;
  ageProofHash: string;
  age: number;
  ageRange: number;
  message: string;
}

export interface ChildVerification {
  childId: string;
  platformId: string;
}

export interface VerificationResult {
  success: boolean;
  isVerified: boolean;
  ageRange: number;
  ageRangeDescription: string;
  protections: {
    blockAdultDMs: boolean;
    contentFilter: boolean;
    parentalMonitoring: boolean;
    safeMatchmaking: boolean;
  };
  message: string;
}

export interface ThreatReport {
  victimId: string;
  suspectId: string;
  platformId: string;
  threatLevel: number;
  description?: string;
}

export interface ThreatReportResult {
  success: boolean;
  reportId: string;
  isCritical: boolean;
  actions: {
    addedToBlacklist: boolean;
    parentsNotified: boolean;
    authoritiesNotified: boolean;
    crossPlatformBlock: boolean;
  };
  message: string;
}

export interface Statistics {
  totalChildrenRegistered: number;
  totalVerifications: number;
  totalThreatsBlocked: number;
  contractActive: boolean;
}

// ==========================================
// KIDSHIELD SDK CLASS
// ==========================================

export class KidShield {
  private client: AxiosInstance;
  private apiKey: string;
  private network: 'testnet' | 'mainnet';

  constructor(config: KidShieldConfig) {
    this.apiKey = config.apiKey;
    this.network = config.network || 'testnet';

    const baseURL = config.apiUrl || 
      (this.network === 'mainnet' 
        ? 'https://api.kidshield.io' 
        : 'http://localhost:3000');

    this.client = axios.create({
      baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        'X-SDK-Version': '1.0.0'
      }
    });
  }

  // ==========================================
  // MÉTODOS PÚBLICOS
  // ==========================================

  /**
   * Registrar uma criança no sistema
   */
  async registerChild(data: ChildRegistration): Promise<ChildRegistrationResult> {
    try {
      const response = await this.client.post('/api/register-child', data);
      return {
        success: true,
        ...response.data.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verificar se um usuário é uma criança verificada
   */
  async verifyChild(data: ChildVerification): Promise<VerificationResult> {
    try {
      const response = await this.client.post('/api/verify-child', data);
      return {
        success: true,
        ...response.data.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verificar rapidamente apenas por childId
   */
  async quickVerify(childId: string, platformId: string): Promise<boolean> {
    try {
      const result = await this.verifyChild({ childId, platformId });
      return result.isVerified;
    } catch (error) {
      return false;
    }
  }

  /**
   * Reportar uma tentativa de contato suspeita
   */
  async reportThreat(data: ThreatReport): Promise<ThreatReportResult> {
    try {
      const response = await this.client.post('/api/report-threat', data);
      return {
        success: true,
        ...response.data.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obter estatísticas do sistema
   */
  async getStatistics(): Promise<Statistics> {
    try {
      const response = await this.client.get('/api/statistics');
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verificar saúde da API
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.data.status === 'online';
    } catch (error) {
      return false;
    }
  }

  /**
   * Obter informações de faixa etária
   */
  getAgeRangeInfo(ageRange: number): { min: number; max: number; description: string } {
    switch (ageRange) {
      case 1:
        return { min: 5, max: 7, description: '5-7 years' };
      case 2:
        return { min: 8, max: 12, description: '8-12 years' };
      case 3:
        return { min: 13, max: 17, description: '13-17 years' };
      default:
        return { min: 0, max: 0, description: 'Unknown' };
    }
  }

  // ==========================================
  // MÉTODOS PRIVADOS
  // ==========================================

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      return new Error(`KidShield API Error: ${message}`);
    }
    return new Error(`Unexpected error: ${error.message}`);
  }
}

// ==========================================
// EXPORT DEFAULT
// ==========================================

export default KidShield;
