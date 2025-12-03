#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-4173}"

probe_public_ip() {
  if command -v curl >/dev/null 2>&1; then
    local ip
    ip=$(curl -fs https://api.ipify.org || true)
    if [[ -n "${ip}" ]]; then
      echo "$ip"
      return 0
    fi
  fi

  if command -v dig >/dev/null 2>&1; then
    local ip
    ip=$(dig +short myip.opendns.com @resolver1.opendns.com || true)
    if [[ -n "${ip}" ]]; then
      echo "$ip"
      return 0
    fi
  fi

  if command -v hostname >/dev/null 2>&1; then
    local ip
    ip=$(hostname -I 2>/dev/null | awk '{print $1}')
    if [[ -n "${ip}" ]]; then
      echo "$ip"
      return 0
    fi
  fi

  if [[ "$(uname -s)" == "Darwin" ]]; then
    local ip
    ip=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)
    if [[ -n "${ip}" ]]; then
      echo "$ip"
      return 0
    fi
  fi

  return 1
}

IP=$(probe_public_ip || true)
if [[ -z "${IP:-}" ]]; then
  echo "Could not auto-detect a public IP. Set WEBAPP_URL manually (e.g. https://example.com)." >&2
  exit 1
fi

PROTO=${PROTO:-http}

printf 'Detected URL: %s://%s:%s\n' "$PROTO" "$IP" "$PORT"
printf 'Set this value in WEBAPP_URL so Telegram can open the mini app.\n'
