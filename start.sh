#!/bin/bash

pkill -f "http.server"

pkill -f "app.py"

echo "Starting Backend..."

cd backend

source venv/bin/activate

python3 app.py &

echo "Backend Started"

cd ../frontend

echo "Starting Frontend..."

python3 -m http.server 8080 &

echo "Frontend Started"

echo ""
echo "Open:"
echo "http://0.0.0.0:8080"

wait
