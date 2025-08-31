#!/usr/bin/env bash
set -euo pipefail

# Install root workspace packages
echo "Installing root dependencies..."
npm install

# Install mobile packages if present
if [ -d "mobile" ]; then
  echo "Installing mobile dependencies..."
  npm --prefix mobile install
fi

echo "Setup complete."
