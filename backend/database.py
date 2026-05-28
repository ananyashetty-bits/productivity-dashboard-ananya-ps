from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://productivityuser:JdG0P5dUX2KFe6fVVVvVLlSAc3f9JmeY@dpg-d8bt6lreo5us73do5r3g-a.oregon-postgres.render.com/productivitydb_v96t"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)