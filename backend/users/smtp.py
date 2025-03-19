from dotenv import dotenv_values
from email.mime.text import MIMEText
from smtplib import SMTP
from uuid import uuid4
from . import _ENV_PATH


env = dotenv_values(_ENV_PATH)
SMTP_HOST = env.get("SMTP_HOST")
SMTP_PORT = env.get("SMTP_PORT")
SMTP_USER = env.get("SMTP_USER")
SMTP_PASSWORD = env.get("SMTP_APPLICATION_PASSWORD")
WEBSERVICE_URL = env.get("WEBSERVICE_URL")


async def send_confirmation_mail(user_email: str) -> str: 
    code = str(uuid4())
    body = f"""
    Приветствуем, Пользователь!

    Благодарим Вас за интерес к нашему сервису BoBoo! Для завершения процесса регистрации аккаунта просим Вас подтвердить адрес электронной почты, перейдя по ссылке ниже и введя специальный код.
    
    Ссылка: {WEBSERVICE_URL}/confirm-email
    Код подтверждения: {code}"""
    msg = MIMEText(body)
    msg["Subject"] = "Регистрация на BoBoo"
    msg["From"] = SMTP_USER
    msg["To"] = user_email

    with SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, user_email, msg.as_string())

    return code
