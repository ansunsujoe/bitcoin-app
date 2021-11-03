FROM postgres:13.3

ADD database/trading.sql /docker-entrypoint-initdb.d

EXPOSE 5432
CMD ["postgres"]