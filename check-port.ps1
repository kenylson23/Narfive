# Script para verificar se uma porta está disponível
param(
    [int]$Port = 8080
)

Write-Host "Verificando porta $Port..." -ForegroundColor Blue

try {
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
    
    if ($connection.TcpTestSucceeded) {
        Write-Host "❌ Porta $Port está EM USO!" -ForegroundColor Red
        Write-Host "   Processo pode estar rodando na porta $Port" -ForegroundColor Yellow
        Write-Host "   Tente parar o processo ou usar outra porta" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Porta $Port está DISPONÍVEL!" -ForegroundColor Green
        Write-Host "   Você pode iniciar a aplicação na porta $Port" -ForegroundColor Cyan
    }
} catch {
    Write-Host "✅ Porta $Port está DISPONÍVEL!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Dicas:" -ForegroundColor Cyan
Write-Host "   - Para usar outra porta, edite o arquivo .env" -ForegroundColor White
Write-Host "   - Para verificar outras portas: .\check-port.ps1 -Port 3000" -ForegroundColor White
Write-Host "   - Para iniciar a aplicação: .\start.ps1" -ForegroundColor White 