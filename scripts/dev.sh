#!/usr/bin/env bash
set -euo pipefail

# Start Supabase if available and Docker is running
if command -v supabase >/dev/null 2>&1; then
  if docker info >/dev/null 2>&1; then
    echo "Starting Supabase..."
    supabase start &
    SUPABASE_PID=$!
  else
    echo "Docker daemon not running, skipping Supabase startup" >&2
  fi
else
  echo "Supabase CLI not found, skipping database startup" >&2
fi

# Start admin console
npm --prefix admin run dev &
ADMIN_PID=$!

# Start mobile app
npm --prefix mobile run start &
MOBILE_PID=$!

trap "kill $ADMIN_PID $MOBILE_PID ${SUPABASE_PID:-} 2>/dev/null" EXIT

wait $ADMIN_PID
