FROM python:3.9-slim
WORKDIR /app

# Copy requirements first
COPY flask_app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project content
COPY . .

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "flask_app.app:app"]