from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv
import os
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from ..models import schemas, db_models
from ..database.database import get_db, engine

auth_router = APIRouter()

load_dotenv()

SECRET_KEY = str(os.getenv("SECRET_KEY"))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


@auth_router.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync((db_models.Base.metadata.create_all))


@auth_router.on_event("shutdown")
async def shutdown():
    await engine.dispose()


@auth_router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(db_models.DbUser).where(db_models.DbUser.username == form_data.username)
    )
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/register", response_model=schemas.UserResponse)
async def register(user: schemas.UserRegister, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(db_models.DbUser).where(db_models.DbUser.username == user.username)
    )
    db_user = result.scalars().first()

    if db_user:
        raise HTTPException(status_code=400, detail="Username already registred")
    hashed_password = hash_password(user.password)
    new_user = db_models.DbUser(
        username=user.username, email=user.email, password=hashed_password
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    result = await db.execute(
        select(db_models.DbUser.id).where(db_models.DbUser.username == user.username)
    )
    user_id = result.scalars().first()

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.username}, expires_delta=access_token_expires
    )

    return {
        "id": user_id,
        "username": new_user.username,
        "access_token": access_token,
        "token_type": "bearer",
    }


@auth_router.post("/login")
async def login(
    user: schemas.UserLogin,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(db_models.DbUser).where(db_models.DbUser.username == user.username)
    )
    db_user = result.scalars().first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/account/delete")
async def delete_account(
    current_user: str = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(db_models.DbUser).where(db_models.DbUser.username == current_user)
    )
    db_user = result.scalars().first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    await db.delete(db_user)
    await db.commit()

    return {"username": db_user.username, "message": "Account deleted successfully"}
