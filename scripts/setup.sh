#!/usr/bin/env bash
set -euo pipefail

# Install all workspace dependencies in one go
echo "Installing workspace dependencies..."
npm install --workspaces

echo "Setup complete."
