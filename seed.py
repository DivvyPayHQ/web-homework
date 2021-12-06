import uuid
import random
from datetime import datetime
import pytz
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, select
from sqlalchemy.orm import declarative_base, sessionmaker, relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from faker import Faker


faker = Faker()
DATABASE_URI = 'postgresql+psycopg2://cjem:password@localhost/homework_dev'
Base = declarative_base()

engine = create_engine(DATABASE_URI, echo=True)
Session = sessionmaker(bind=engine)
session = Session()

#################################

# creates the table
# Base.metadata.create_all(engine)

#################################

class Company(Base):
    __tablename__='company'
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(String)
    available_credit = Column(Integer)
    credit_line = Column(Integer)
    inserted_at=Column(DateTime, nullable=False)
    updated_at=Column(DateTime, nullable=False)
    user = relationship("Users", back_populates="company", uselist=False)
    transaction  = relationship("Transactions", back_populates="company", uselist=False)

class Users(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(String)
    inserted_at=Column(DateTime, nullable=False)
    updated_at=Column(DateTime, nullable=False)
    transaction = relationship("Transactions", back_populates="users", uselist=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id'))
    company = relationship("Company", back_populates="user")



class Merchants(Base):
    __tablename__ = 'merchants'
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(String)
    description = Column(String)
    inserted_at=Column(DateTime, nullable=False)
    updated_at=Column(DateTime, nullable=False)
    transaction = relationship("Transactions", back_populates="merchants", uselist=False)

class Transactions(Base):
    __tablename__ = 'transactions'
    id = Column(UUID(as_uuid=True), primary_key=True)
    amount = Column(Integer)
    credit = Column(Boolean)
    debit = Column(Boolean)
    description = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    users = relationship("Users", back_populates="transaction")
    merchant_id = Column(UUID(as_uuid=True), ForeignKey('merchants.id'))
    merchants = relationship("Merchants", back_populates="transaction")
    inserted_at=Column(DateTime, nullable=False)
    updated_at=Column(DateTime, nullable=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey('company.id'))
    company = relationship("Company", back_populates="transaction")


# c = Company(
#         id=uuid.uuid1(), 
#         name="Hello",
#         available_credit=1000,
#         credit_line=1000,
#         inserted_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'), 
#         updated_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S')
#         )
for entry in range (1, 10):

    c = Company(
            id=uuid.uuid1(), 
            name=faker.company(),
            credit_line=100000,
            inserted_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'), 
            updated_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S')
            )
    session.add(c)
    session.commit()

    for u in range(1, 20):
        user = Users(
                id=uuid.uuid1(),
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                dob=faker.date_of_birth(),
                inserted_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'),
                updated_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'),
                company_id = c.id
                )
        session.add(user)
        session.commit()

        merch = Merchants(
                id=uuid.uuid1(),
                name=faker.company(),
                description=faker.catch_phrase(),
                inserted_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'), 
                updated_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S')
                )

        session.add(merch)
        session.commit()

        for purchase in range(1, 5):
            purchase = Transactions(
                    id=uuid.uuid1(),
                    amount=random.randrange(1, 1000),
                    credit=False,
                    debit=True,
                    description=faker.sentence(nb_words=5),
                    user_id=user.id,
                    company_id=c.id,
                    merchant_id=merch.id,
                    inserted_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S'), 
                    updated_at=datetime.utcnow().strftime('%Y-%m-%d %H:%m:%S')

                    )
            session.add(purchase)
            session.commit()


#########################################
## QUERIES

## for row in session.query(User, User.first_name).all():
##     print(row.User, row.first_name)

#########################################



## for i in range(1, 10):
##     print(i)
##     user = User(name=fake.name())
##     session.add(user)
##     session.commit()
#    # Base.metadata.create_all(engine)


