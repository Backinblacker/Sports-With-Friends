"""empty message

Revision ID: b99cacb021b1
Revises: 2a79676ee84d
Create Date: 2023-05-01 13:47:20.261884

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b99cacb021b1'
down_revision = '2a79676ee84d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index('establishment_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index('establishment_name', ['establishment_name'], unique=False)

    # ### end Alembic commands ###
