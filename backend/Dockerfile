# backend/Dockerfile

FROM python:3.9-slim
# То все чат) я з окером на вінді відмовляюсь працювати
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p uploads
RUN mkdir -p models/weights

EXPOSE 5000

# Run the application
CMD ["python", "app.py"]