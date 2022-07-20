#! /usr/bin/env python
"""Generates a SQL script used to seed the database for the Homework application.

Data for each table is contained in separate .csv files stored in a directory called 'data' in the same directory as
gen_sql.py.
"""

import re
import random
from collections import defaultdict


def insert_companies(script):
    company_ids = []
    records = ''
    script.write('''
-------------------------------------------
-- Populate "companies" table (20)
-------------------------------------------

INSERT INTO companies (id, name, credit_line, available_credit, inserted_at, updated_at)
VALUES
''')
    with open('data/companies.csv') as f:
        for line in f.readlines()[1:]:
            id_, name, credit_line = line.strip().split(',')
            amount = int(credit_line) * 100000
            company_ids.append(id_)
            records += f"    ('{id_}', '{name}', {amount}, {amount}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),\n"
    script.write(records[:-2] + ';\n')
    return company_ids


def insert_users(script, company_ids):
    user_company = {}
    user_ids = []
    records = ''
    script.write('''
-------------------------------------------
-- Populate "users" table (100)
-------------------------------------------

INSERT INTO users (id, first_name, last_name, dob, company_id, inserted_at, updated_at)
VALUES
''')
    with open('data/users.csv') as f:
        for line in f.readlines()[1:]:
            line = re.sub(r"'", r"''", line)
            id_, first, last, dob = line.strip().split(',')
            user_ids.append(id_)
            company_id = random.choice(company_ids)
            records += f"    ('{id_}', '{first}', '{last}', '{dob}', '{company_id}', CURRENT_TIMESTAMP, "\
                       "CURRENT_TIMESTAMP),\n"
            user_company[id_] = company_id
    script.write(records[:-2] + ';\n')
    return user_ids, user_company


def insert_merchants(script):
    merchant_ids = []
    records = ''
    script.write('''
-------------------------------------------
-- Populate "merchants" table (20)
-------------------------------------------

INSERT INTO merchants (id, name, description, inserted_at, updated_at)
VALUES
''')
    with open('data/merchants.csv') as f:
        for line in f.readlines()[1:]:
            id_, name, description = line.strip().split(',', 2)
            merchant_ids.append(id_)
            description = re.sub(r'^"(.*)"$', r'\1', description)
            records += f"    ('{id_}', '{name}', '{description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),\n"
    script.write(records[:-2] + ';\n')
    return merchant_ids


def insert_transactions(script, user_ids, merchant_ids, user_company):
    credit_change = defaultdict(int)
    records = ''
    script.write('''
-------------------------------------------
-- Populate "transactions" table (200)
-------------------------------------------

INSERT INTO transactions (id, amount, credit, debit, description, user_id, merchant_id, inserted_at, updated_at)
VALUES
''')
    with open('data/transactions.csv') as f:
        for line in f.readlines()[1:]:
            id_, amount, credit_debit, description = line.strip().split(',', 3)
            credit_debit = 'TRUE, FALSE' if credit_debit == 'TRUE' else 'FALSE, TRUE'
            user_id = random.choice(user_ids)
            merchant_id = random.choice(merchant_ids)
            description = re.sub(r'^"(.*)"$', r'\1', description)
            records += f"    ('{id_}', {amount}, {credit_debit}, '{description}', '{user_id}', '{merchant_id}', "\
                       "CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),\n"
            credit_change[user_company[user_id]] += int(amount) * (1 if credit_debit == 'TRUE' else -1)
    script.write(records[:-2] + ';\n')
    return credit_change


def update_companies(script, credit_change: dict):
    updates = ''
    script.write('''
-------------------------------------------
-- Update "companies" table
-------------------------------------------

''')
    for company_id in credit_change.keys():
        change_amount = credit_change[company_id]
        updates += f"UPDATE companies SET available_credit = available_credit + {change_amount} "\
                   f"WHERE id = '{company_id}';\n"
    script.write(updates)


def main():
    with open('seed.sql', 'w') as script:
        script.write('''
-------------------------------------------
-- Remove existing data from tables
-------------------------------------------

DELETE FROM transactions;
DELETE FROM users;
DELETE FROM merchants;
DELETE FROM companies;
''')
        company_ids = insert_companies(script)
        user_ids, user_company = insert_users(script, company_ids)
        merchant_ids = insert_merchants(script)
        credit_change = insert_transactions(script, user_ids, merchant_ids, user_company)
        update_companies(script, credit_change)


if __name__ == '__main__':
    main()
