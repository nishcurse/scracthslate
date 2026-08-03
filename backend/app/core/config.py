from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str

    GOOGLE_CLIENT_ID: str

    JWT_SECRET: str

    JWT_ALGORITHM: str = "HS256"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings() # type: ignore pylance ka issue hai its working fine at runtime 
