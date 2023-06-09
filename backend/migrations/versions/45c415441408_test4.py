"""test4

Revision ID: 45c415441408
Revises: 180a564b90d6
Create Date: 2023-06-09 11:49:46.169618

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '45c415441408'
down_revision = '180a564b90d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_favorite_event')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_favorite_event',
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('favorite_event_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['favorite_event_id'], ['favorite_event.id'], name='user_favorite_event_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='user_favorite_event_ibfk_2'),
    sa.PrimaryKeyConstraint('user_id', 'favorite_event_id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###