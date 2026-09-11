"""
CyberArch Platform - High-Performance SQLAlchemy ORM Models
Zero-Trust Architecture: Users & Roles (RBAC), Immutable Security Logs with Encrypted Payloads,
Threat Intelligence Feeds, and Continuous Sovereign Compliance Audits.
"""

import uuid
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, DateTime, Float, Boolean, Text, ForeignKey, Index
)
from sqlalchemy.orm import relationship
from database import Base


class Role(Base):
    """
    Role-Based Access Control (RBAC) model defining granular authorizations
    within the Zero-Trust security perimeter.
    """
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    code = Column(String(30), unique=True, nullable=False, index=True)  # e.g., CISO_ADMIN, SOC_ANALYST
    description = Column(String(255), nullable=True)
    permissions = Column(Text, nullable=False, default="[]")  # JSON string of authorized scopes
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    users = relationship("User", back_populates="role")


class User(Base):
    """
    Zero-Trust User Entity with Device Trust Attestation, Multi-Factor Authentication,
    and Sovereign Security Clearance classification.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()), index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    
    # Zero-Trust Attributes
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    security_clearance = Column(String(30), default="CONFIDENTIAL")  # CONFIDENTIAL, SECRET, TOP_SECRET, SOVEREIGN
    device_trust_score = Column(Float, default=0.98)  # 0.0 - 1.0 continuously assessed risk score
    mfa_enforced = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    
    last_login_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    role = relationship("Role", back_populates="users")


class SecurityLog(Base):
    """
    Immutable, high-throughput security event telemetry.
    Features cryptographic tamper-evident payload hashing and SOAR mitigation status.
    """
    __tablename__ = "security_logs"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()), index=True)
    timestamp = Column(String(20), nullable=False)  # HH:MM:SS format for UI terminal streaming
    severity = Column(String(15), nullable=False, index=True)  # INFO, WARN, ALERT, CRITICAL
    event = Column(String(255), nullable=False)
    source_ip = Column(String(45), nullable=False, index=True)
    destination_ip = Column(String(45), default="10.0.0.1")
    category = Column(String(50), default="NETWORK", index=True)  # WAF, AUTH, EBPF, PERIMETER, MALWARE, AUDIT
    
    # Encrypted / HMAC Tamper-Evident Forensic Payload
    encrypted_payload = Column(Text, nullable=True)
    
    # SOAR Mitigation Lifecycle Status
    mitigation_status = Column(String(30), default="NONE")  # NONE, PENDING, MITIGATED, ISOLATED, BLOCKED
    soar_playbook_triggered = Column(String(100), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    __table_args__ = (
        Index("ix_security_logs_sev_created", "severity", "created_at"),
    )


class ThreatFeed(Base):
    """
    Threat Intelligence Feed containing Indicators of Compromise (IoCs)
    synchronized from national and sovereign threat exchange channels.
    """
    __tablename__ = "threat_feeds"

    id = Column(Integer, primary_key=True, index=True)
    ioc_type = Column(String(30), nullable=False, index=True)  # IP, DOMAIN, SHA256, CVE, SIGNATURE
    ioc_value = Column(String(255), nullable=False, unique=True, index=True)
    threat_name = Column(String(100), nullable=False)
    confidence_score = Column(Integer, default=85)  # 0 to 100
    severity = Column(String(15), default="HIGH")  # LOW, MEDIUM, HIGH, CRITICAL
    source_feed = Column(String(100), default="MOROCCO_DGSSI_SOVEREIGN")
    is_active = Column(Boolean, default=True)
    detected_at = Column(DateTime, default=datetime.utcnow)


class ComplianceAudit(Base):
    """
    Tracks sovereign audit compliance metrics against international and national standards
    (ISO 27001, NIST CSF 2.0, GDPR Sovereignty, PCI DSS v4.0).
    """
    __tablename__ = "compliance_audits"

    id = Column(Integer, primary_key=True, index=True)
    framework = Column(String(50), nullable=False, index=True)  # ISO 27001, NIST CSF, GDPR, PCI DSS
    domain = Column(String(100), nullable=False)  # Access Control, Cryptography, Incident Management
    score = Column(Integer, nullable=False)  # 0 to 100
    status = Column(String(20), default="COMPLIANT")  # COMPLIANT, IN_PROGRESS, NON_COMPLIANT
    controls_tested = Column(Integer, default=114)
    controls_passed = Column(Integer, default=106)
    last_assessed = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class MetricSnapshot(Base):
    """
    High-speed cache for top-level SOC telemetry cards and 24-hour rate calculations.
    """
    __tablename__ = "metric_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    metric_key = Column(String(50), unique=True, index=True, nullable=False)
    value_display = Column(String(50), nullable=False)
    numeric_value = Column(Float, nullable=False)
    change_rate = Column(String(50), default="+0% vs last 24h")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
