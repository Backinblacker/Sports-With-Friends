"""edited Event table

Revision ID: c1291733a081
Revises: 1381dbccdba2
Create Date: 2023-04-28 09:24:35.094408

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c1291733a081'
down_revision = '1381dbccdba2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.Integer(), nullable=False))
        batch_op.drop_column('event')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event', mysql.INTEGER(), autoincrement=True, nullable=False))
        batch_op.drop_column('id')

    # ### end Alembic commands ###