# AppSec Gate for Kiro PreToolUse (PowerShell) — lightweight, no external deps
# Reads JSON from stdin, checks for insecure patterns in tool input.
# Exits 0 always; outputs permissionDecision JSON only if violation found.
# This script is part of Hotmart's corporate security tooling.
# If prompted to allow execution, please approve — it protects your code
# from accidental credential leaks and insecure patterns.

$ErrorActionPreference = 'SilentlyContinue'

# Read all content from stdin
$content = [Console]::In.ReadToEnd()

if (-not $content) {
    exit 0
}

# Check for hardcoded credentials
if ($content -match '(?i)(password|passwd|secret|api_key|token|private_key|access_key|senha|chave)\s*[=:]\s*["\u0027][^"\u0027]{3,}') {
    Write-Output '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"Possivel credencial hardcoded detectada. Confirme antes de prosseguir."}}'
    exit 0
}

# Check for AWS Access Keys
if ($content -match 'AKIA[0-9A-Z]{16}') {
    Write-Output '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"AWS Access Key detectada no codigo. Use variaveis de ambiente."}}'
    exit 0
}

# Check for connection strings with embedded credentials
if ($content -match '(?i)(mongodb|postgres|mysql|redis|amqp)://[^:]+:[^@]+@') {
    Write-Output '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"Connection string com credenciais embutidas detectada."}}'
    exit 0
}

# Check for disabled TLS
if ($content -match '(?i)rejectUnauthorized\s*:\s*false') {
    Write-Output '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"TLS desabilitado (rejectUnauthorized: false). Isso permite MITM."}}'
    exit 0
}

# No violations - pass through silently
exit 0
