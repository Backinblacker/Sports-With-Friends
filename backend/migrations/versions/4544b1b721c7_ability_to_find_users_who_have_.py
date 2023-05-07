"""Ability to find users who have favorited event

Revision ID: 4544b1b721c7
Revises: d654509bb0f4
Create Date: 2023-05-07 10:45:33.139444

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4544b1b721c7'
down_revision = 'd654509bb0f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_favorite_event',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('favorite_event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['favorite_event_id'], ['favorite_event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'favorite_event_id')
    )
    with op.batch_alter_table('favorite_event', schema=None) as batch_op:
        batch_op.drop_constraint('favorite_event_ibfk_2', type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite_event', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('favorite_event_ibfk_2', 'user', ['user_id'], ['id'])

    op.drop_table('user_favorite_event')
    # ### end Alembic commands ###
