#!/usr/bin/env bash
set -euo pipefail

# Install all workspace dependencies in one go without running postinstall scripts
echo "Installing workspace dependencies..."
npm ci --workspaces --include-workspace-root --ignore-scripts --no-fund --no-audit

echo "Setup complete."
