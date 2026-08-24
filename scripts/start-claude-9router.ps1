# Arguments are parsed manually from $args instead of using a param() block:
# PowerShell's binder intercepts short flags like -p and binds them to its own
# common parameters (e.g. -PipelineVariable), and ValueFromRemainingArguments
# mangles arrays on Windows PowerShell 5.1, both of which break claude passthrough.
$RouterUrl = $env:NINE_ROUTER_URL
$RouterApiKey = $env:NINE_ROUTER_API_KEY
$Model = $env:CLAUDE_CODE_MODEL
$SkipHealthCheck = $false
$claudeArgs = @()

$i = 0
while ($i -lt $args.Count) {
  switch ($args[$i]) {
    '-RouterUrl'       { $i++; $RouterUrl = $args[$i]; break }
    '-RouterApiKey'    { $i++; $RouterApiKey = $args[$i]; break }
    '-Model'           { $i++; $Model = $args[$i]; break }
    '-m'               { $i++; $Model = $args[$i]; break }
    '-SkipHealthCheck' { $SkipHealthCheck = $true; break }
    default            { $claudeArgs += $args[$i] }
  }
  $i++
}

$envFile = Join-Path (Get-Location) ".env.9router"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) {
      return
    }

    $parts = $line -split "=", 2
    if ($parts.Count -ne 2) {
      return
    }

    $name = $parts[0].Trim()
    $value = $parts[1].Trim().Trim('"')

    $existingValue = [Environment]::GetEnvironmentVariable($name)
    if ($name -and [string]::IsNullOrEmpty($existingValue)) {
      Set-Item -Path "Env:$name" -Value $value
    }
  }

  if (-not $RouterUrl) {
    $RouterUrl = $env:NINE_ROUTER_URL
  }
  if (-not $RouterApiKey) {
    $RouterApiKey = $env:NINE_ROUTER_API_KEY
  }
  if (-not $Model) {
    $Model = $env:CLAUDE_CODE_MODEL
  }
}

if (-not $RouterUrl) {
  Write-Error "NINE_ROUTER_URL is required. Set it in .env.9router or pass -RouterUrl."
  exit 1
}

$routerBaseUrl = $RouterUrl.TrimEnd('/')
$env:ANTHROPIC_BASE_URL = $routerBaseUrl
$env:ANTHROPIC_API_URL = $routerBaseUrl

if ($RouterApiKey) {
  $env:ANTHROPIC_API_KEY = $RouterApiKey
}

if ($Model) {
  $env:ANTHROPIC_MODEL = $Model
}

if (-not $SkipHealthCheck) {
  try {
    Invoke-WebRequest -Uri "$routerBaseUrl/health" -UseBasicParsing -TimeoutSec 5 | Out-Null
  } catch {
    Write-Warning "Health check failed at $routerBaseUrl/health. Continuing anyway."
  }
}

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  Write-Error "Claude Code CLI was not found in PATH. Install it, then rerun this script."
  exit 1
}

Write-Host "Claude Code is configured to use 9router at $routerBaseUrl"
if ($Model) {
  Write-Host "Model override: $Model"
}

& claude @claudeArgs
