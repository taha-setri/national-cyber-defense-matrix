export type PillarId = 
  | 'microservices'
  | 'data-layers'
  | 'zero-trust'
  | 'scalability'
  | 'cicd';

export type ViewMode = 
  | 'dashboard'
  | 'client-workspace'
  | 'war-room'
  | 'search-portal'
  | 'visio'
  | 'ingestion-hub'
  | 'dgssi-dossier'
  | 'pillars' 
  | 'topology' 
  | 'code' 
  | 'structure' 
  | 'hardening-lab';

export interface ArchitecturePillar {
  id: PillarId;
  number: number;
  title: string;
  tagline: string;
  executiveSummary: string;
  corePrinciples: string[];
  keyComponents: {
    name: string;
    role: string;
    protocols: string;
    securityControls: string[];
  }[];
  tradeoffAnalysis: {
    decision: string;
    pros: string[];
    cons: string[];
    mitigation: string;
  }[];
  standardsCompliance: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  category: 'perimeter' | 'gateway' | 'service' | 'queue' | 'database' | 'worker';
  tier: 'public' | 'dmz' | 'mesh' | 'isolated';
  description: string;
  techStack: string;
  hardening: string[];
  connections: string[];
}

export interface SecurityHeaderItem {
  name: string;
  recommendedValue: string;
  description: string;
  riskMitigated: string;
  impactScore: 'Critical' | 'High' | 'Medium';
}

export interface OwaspDefenseItem {
  code: string;
  name: string;
  riskSummary: string;
  commonAttackVectors: string[];
  engineeringDefense: string;
  sampleCodeSnippet: string;
  status: 'Hardened' | 'Enforced' | 'Validated';
}

export interface CodeArtifact {
  id: string;
  pillarId: PillarId;
  title: string;
  filename: string;
  language: string;
  description: string;
  securityRationale: string;
  code: string;
}

export interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  securityNote?: string;
  children?: FolderNode[];
}
