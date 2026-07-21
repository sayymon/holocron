#!/bin/bash
# AppSec Gate for Kiro PreToolUse — lightweight bash-only (no Python)
# Reads JSON from stdin, checks for insecure patterns in tool input.
# Exits 0 always; outputs permissionDecision JSON only if violation found.

CONTENT=$(cat)

# Fast grep check on raw JSON content (avoids spawning extra processes)
if echo "$CONTENT" | grep -qiE '(password|passwd|secret|api_key|token|private_key|access_key|senha|chave)\s*[=:]\s*["'"'"'][^"'"'"']{3,}'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"Possível credencial hardcoded detectada. Confirme antes de prosseguir."}}'
  exit 0
fi

if echo "$CONTENT" | grep -qE 'AKIA[0-9A-Z]{16}'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"AWS Access Key detectada no código. Use variáveis de ambiente."}}'
  exit 0
fi

if echo "$CONTENT" | grep -qiE '(mongodb|postgres|mysql|redis|amqp)://[^:]+:[^@]+@'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"Connection string com credenciais embutidas detectada."}}'
  exit 0
fi

if echo "$CONTENT" | grep -qiE 'rejectUnauthorized\s*:\s*false'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"TLS desabilitado (rejectUnauthorized: false). Isso permite MITM."}}'
  exit 0
fi

# No violations — pass through silently
exit 0
