import databases
import ormar
import sqlalchemy
from dotenv import dotenv_values


environment = dotenv_values('.env')
DATABASE_URL = str(environment.get('DB_PATH'))
ECHO = bool(environment.get('ECHO'))

base_ormar_config = ormar.OrmarConfig(
    metadata=sqlalchemy.MetaData(),
    database=databases.Database(DATABASE_URL),
    engine=sqlalchemy.create_engine(DATABASE_URL, echo=ECHO)
)
