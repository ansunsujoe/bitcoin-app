FROM python:3.9

# Environment variables
ENV FLASK_ENV=development
ENV DATABASE_URL=postgresql://postgres:postgres2021@host.docker.internal:5432/deep_trader
ENV SECRET_KEY=bullsandbears

# Make the backend root directory
RUN mkdir /usr/src/backend
WORKDIR /usr/src/backend
ENV PYTHONPATH=/usr/src/backend

# Copy backend code
COPY backend .

# Install requirements and deep-trader package
RUN pip install -r requirements.txt

# Run flask app
EXPOSE 5001
CMD ["python", "app.py"]