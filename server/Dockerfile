# Install dependencies only when needed
# Stage 0
FROM python:3.13-slim AS deps
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev \
    libmariadb3 \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
#############################################

# Stage 1: Final image
FROM python:3.13-slim AS prod

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libmariadb3 \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -r appuser && mkdir /app && chown -R appuser /app
WORKDIR /app

COPY --from=deps /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=deps /usr/local/bin/ /usr/local/bin/
COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 3001

CMD ["sh", "-c", "python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:3001 --workers 3 --log-level debug --access-logfile - --error-logfile -"]