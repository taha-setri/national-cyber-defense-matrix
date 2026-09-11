"""
CyberArch Platform - High-Performance Database Engine & Connection Pooling
Enterprise 2027 Standards: Robust Connection Pooling, SQLite WAL Mode,
PostgreSQL Production Readiness & Safe Session Lifecycle Management.
"""

import os
import logging
from contextlib import contextmanager
from typing import Generator
from sqlalchemy import create_engine, event
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy.engine import Engine

logger = logging.getLogger("cyberarch.database")

# Database URL configuration (defaults to local WAL SQLite, easily swapped for PostgreSQL)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./cyberarch.db")
IS_SQLITE = DATABASE_URL.startswith("sqlite")

# Engine configuration with connection pooling parameters
if IS_SQLITE:
    # check_same_thread=False allows multithreaded and async FastAPI workers to share the engine
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        pool_pre_ping=True
    )

    # Enable SQLite WAL (Write-Ahead Logging) and Foreign Keys for enterprise concurrency
    @event.listens_for(Engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("PRAGMA synchronous=NORMAL;")
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()
else:
    # Enterprise PostgreSQL connection pool settings for high-throughput SOC telemetry
    engine = create_engine(
        DATABASE_URL,
        pool_size=int(os.getenv("DB_POOL_SIZE", "25")),
        max_overflow=int(os.getenv("DB_MAX_OVERFLOW", "50")),
        pool_timeout=int(os.getenv("DB_POOL_TIMEOUT", "30")),
        pool_recycle=int(os.getenv("DB_POOL_RECYCLE", "1800")),
        pool_pre_ping=True
    )

# Session factory configuration
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency providing isolated SQLAlchemy session per request.
    Guarantees automatic rollback on unhandled exceptions and deterministic closure.
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as exc:
        db.rollback()
        logger.error(f"Database session error occurred, rolling back: {exc}")
        raise
    finally:
        db.close()


@contextmanager
def get_db_context() -> Generator[Session, None, None]:
    """
    Synchronous context manager for background worker tasks (asyncio / cron jobs)
    where FastAPI dependency injection is not directly available.
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception as exc:
        db.rollback()
        logger.error(f"Background worker database error, transaction rolled back: {exc}")
        raise
    finally:
        db.close()


def check_database_health() -> bool:
    """Verifies active connectivity to the underlying storage cluster."""
    try:
        with engine.connect() as conn:
            conn.exec_driver_sql("SELECT 1")
            return True
    except Exception as err:
        logger.critical(f"Database health check failed: {err}")
        return False
