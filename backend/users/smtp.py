from email.mime.text import MIMEText
from smtplib import SMTP

from config import settings


SMTP_HOST = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.SMTP_USER
SMTP_PASSWORD = settings.SMTP_APPLICATION_PASSWORD
SERVER_ORIGIN = settings.SERVER_ORIGIN


async def send_email_confirmation_code(username: str, user_email: str, code: str): 
    body = f"""
    Приветствуем, {username}!

    Благодарим Вас за интерес к нашему сервису BoBoo! Для завершения процесса регистрации аккаунта просим Вас подтвердить адрес электронной почты, перейдя по ссылке ниже и введя специальный код.
    
    Ссылка: {settings.CLIENT_ORIGIN}/confirm-email
    Код подтверждения: {code}

    Если Вы не регистрировались на BoBoo, пожалуйста проигнорируйте это письмо."""
    msg = MIMEText(body)
    msg["Subject"] = "Регистрация на BoBoo"
    msg["From"] = SMTP_USER
    msg["To"] = user_email

    with SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, user_email, msg.as_string())


async def send_password_reset_code(username: str, user_email: str, code: str): 
    body = f"""
    Приветствуем, {username}!

    Для сброса пароля Вам необходимо перейти по ссылке ниже и ввести специальный код. 
    
    Ссылка: {SERVER_ORIGIN}/reset-password
    Код подтверждения: {code}

    Если Вы не выбирали опцию сброса пароля от аккаунта на BoBoo, пожалуйста проигнорируйте это письмо."""
    msg = MIMEText(body)
    msg["Subject"] = "Сброс пароля от аккаунта на BoBoo"
    msg["From"] = SMTP_USER
    msg["To"] = user_email

    with SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, user_email, msg.as_string())
