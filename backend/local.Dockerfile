FROM python:3.9

# Environment variables
ENV FLASK_ENV=development
ENV SECRET_KEY=bullsandbears

# Make the backend root directory
WORKDIR /usr/src/backend
ENV PYTHONPATH=/usr/src/backend

# Install requirements and deep-trader package
RUN pip install Flask Flask-Cors requests flask_sqlalchemy \
    SQLAlchemy-Utils PyMySQL cryptography flask-bcrypt

# Run flask app
EXPOSE 5000
CMD ["python", "run.py"]