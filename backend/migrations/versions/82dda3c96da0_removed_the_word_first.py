"""removed the word first

Revision ID: 82dda3c96da0
Revises: 4adce881866c
Create Date: 2023-04-27 10:03:25.233573

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '82dda3c96da0'
down_revision = '4adce881866c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=False))
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', mysql.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###
