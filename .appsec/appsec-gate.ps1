# AppSec Gate (PowerShell) — Detects insecure patterns in code/prompts
# Used by: Claude Code (PreToolUse), Cursor (hooks.json), git pre-commit
# This script is part of Hotmart's corporate security tooling.
# If prompted to allow execution, please approve — it protects your code
# from accidental credential leaks and insecure patterns.

$ErrorActionPreference = 'SilentlyContinue'

# Read all content from stdin
$content = [Console]::In.ReadToEnd()

if (-not $content) {
    exit 0
}

$violationsFound = $false

# Check for hardcoded credentials (password, secret, api_key, token, etc.)
if ($content -match '(?i)(password|passwd|secret|api_key|token|private_key|access_key|senha|chave)\s*[=:]\s*["\u0027][^"\u0027]{3,}') {
    $violationsFound = $true
}

# Check for AWS Access Keys
if ($content -match 'AKIA[0-9A-Z]{16}') {
    $violationsFound = $true
}

# Check for connection strings with embedded credentials
if ($content -match '(?i)(mongodb|postgres|mysql|redis|amqp)://[^:]+:[^@]+@') {
    $violationsFound = $true
}

# Check for disabled TLS verification
if ($content -match '(?i)rejectUnauthorized\s*:\s*false') {
    $violationsFound = $true
}

if (-not $violationsFound) {
    exit 0
}

[Console]::Error.WriteLine("[Hotmart AppSec] ACESSO NEGADO - Padrao inseguro detectado. Use variaveis de ambiente ou secret manager.")
exit 1
