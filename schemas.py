"""
CyberArch Platform - Pydantic Request & Response Schemas
Type-safe validation for Zero-Trust tokens, telemetry ingestion,
SOAR automated responses, and real-time dashboard state.
"""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


# ---------------------------------------------------------
# Zero-Trust & Identity Schemas
# ---------------------------------------------------------

class ZeroTrustContext(BaseModel):
    """Zero-Trust session metadata evaluated upon every API gateway request."""
    user_id: int
    username: str
    role: str
    security_clearance: str
    device_trust_score: float = Field(..., ge=0.0, le=1.0)
    client_ip: str
    token_verified: bool = True


class TokenResponse(BaseModel):
    """JWT bearer token response with Zero-Trust authorization parameters."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int = 3600
    security_clearance: str
    role: str


class RoleResponse(BaseModel):
    id: int
    name: str
    code: str
    description: Optional[str] = None
    permissions: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    uuid: str
    username: str
    email: str
    security_clearance: str
    device_trust_score: float
    mfa_enforced: bool
    is_active: bool
    role: RoleResponse

    class Config:
        from_attributes = True


# ---------------------------------------------------------
# Security Event Telemetry & Logging
# ---------------------------------------------------------

class SecurityLogCreate(BaseModel):
    """Schema for ingesting raw security event telemetry."""
    severity: str = Field(..., example="ALERT", description="INFO, WARN, ALERT, or CRITICAL")
    event: str = Field(..., example="Cross-Site Scripting (XSS) payload quarantined by WAF")
    source_ip: str = Field(..., example="198.51.100.42")
    destination_ip: Optional[str] = Field(default="10.0.0.1")
    category: Optional[str] = Field(default="WAF", description="WAF, AUTH, EBPF, PERIMETER, MALWARE, AUDIT")
    raw_payload: Optional[str] = Field(default=None, description="Optional raw payload for forensic hashing")


class SecurityLogResponse(BaseModel):
    """Schema for streaming and viewing immutable security event logs."""
    id: int
    uuid: str
    timestamp: str
    severity: str
    event: str
    source_ip: str
    destination_ip: Optional[str] = "10.0.0.1"
    category: str
    encrypted_payload: Optional[str] = None
    mitigation_status: str
    soar_playbook_triggered: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ---------------------------------------------------------
# SOAR (Security Orchestration, Automation, & Response)
# ---------------------------------------------------------

class SoarMitigationRequest(BaseModel):
    """Payload to trigger an on-demand SOAR automated countermeasure playbook."""
    target_ip: str = Field(..., example="91.240.118.82")
    threat_type: str = Field(..., example="SQL_INJECTION", description="BRUTE_FORCE, SQL_INJECTION, DDOS_VOLUMETRIC, or XSS")
    playbook_override: Optional[str] = Field(default=None, description="Optional playbook name override")


class SoarMitigationResponse(BaseModel):
    """Response returned upon SOAR execution."""
    success: bool
    playbook_executed: str
    action_taken: str
    target_quarantined: str
    mitigation_timestamp: str
    details: dict


# ---------------------------------------------------------
# Dashboard Telemetry & Compliance
# ---------------------------------------------------------

class DashboardStatsResponse(BaseModel):
    """Response schema for real-time dashboard telemetry synchronization."""
    total_threats: int = Field(..., example=128)
    assets_monitored: int = Field(..., example=1982)
    compliance_score: int = Field(..., example=92)
    critical_alerts: int = Field(..., example=7)
    system_status: str = Field(..., example="SECURE")
    threats_change: str = Field(default="+12% vs last 24h")
    assets_change: str = Field(default="+8% vs last 24h")
    compliance_change: str = Field(default="+5% vs last 24h")
    alerts_change: str = Field(default="+3 vs last 24h")
    timestamp: str = Field(..., example="14:35:42")
    zero_trust_posture: str = Field(default="OPTIMAL", example="OPTIMAL")
    soar_mitigations_count: int = Field(default=42, example=42)

    class Config:
        from_attributes = True


class ThreatFeedResponse(BaseModel):
    """Response schema for active threat intelligence indicators."""
    id: int
    ioc_type: str
    ioc_value: str
    threat_name: str
    confidence_score: int
    severity: str
    source_feed: str
    is_active: bool

    class Config:
        from_attributes = True


class ComplianceFrameworkResponse(BaseModel):
    """Response schema for sovereign framework compliance scores."""
    id: int
    framework: str
    domain: str
    score: int
    status: str
    controls_tested: int
    controls_passed: int

    class Config:
        from_attributes = True


# ---------------------------------------------------------
# Next-Gen 2027 Supremacy Schemas: eBPF, AI Agent, PQC
# ---------------------------------------------------------

class EbpfFilterRequest(BaseModel):
    ip_address: str = Field(..., example="198.51.100.42")
    reason: str = Field(..., example="Autonomous XDP drop rule injected by SOC Operator")


class AiAnalyzeRequest(BaseModel):
    event_text: str = Field(..., example="SQL Injection: ' UNION SELECT null, username, password FROM users --")
    source_ip: str = Field(..., example="194.26.29.112")
    category: Optional[str] = Field(default="WAF", example="WAF")


class ZeroTrustSimulateRequest(BaseModel):
    vector_overrides: Optional[dict] = Field(
        default=None,
        example={"tpm_hardware_attestation": 0.45, "network_geo_drift_stability": 0.30}
    )


class DualCustodyAuthRequest(BaseModel):
    action: str = Field(..., example="EMERGENCY_NATIONAL_BGP_QUARANTINE")
    founder_alpha_signature: str = Field(..., example="YUBIKEY_FIPS_RSA4096_SIG_ALPHA")
    founder_beta_signature: str = Field(..., example="TITAN_FIPS_ECC_SIG_BETA")
    target_tenant_id: Optional[str] = Field(default=None, example="T-BANK-01")
    air_gap_duration_minutes: Optional[int] = Field(default=60)


class TenantQuarantineRequest(BaseModel):
    tenant_id: str = Field(..., example="T-BANK-01")
    isolate: bool = Field(..., example=True)
    reason: str = Field(default="Suspected APT lateral movement")


