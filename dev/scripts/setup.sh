#!/usr/bin/env bash

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "DATABASE_PATH=./dev/data/sqlite.db" > .env
    echo "✅ Created .env file"
fi

# Create dev/data directory if it doesn't exist
if [ ! -d ./dev/data ]; then
    mkdir -p ./dev/data
    echo "✅ Created dev/data directory"
fi

# Create empty SQLite database if it doesn't exist
if [ ! -f ./dev/data/sqlite.db ]; then
    touch ./dev/data/sqlite.db
    echo "✅ Created SQLite database for development"
fi

echo "Development setup complete!"
