# Hoja de trucos: Bash y PowerShell

## Navegación y archivos
```bash
pwd
ls -la
cd carpeta
mkdir proyecto
touch archivo.txt
cp origen.txt destino.txt
mv viejo.txt nuevo.txt
rm archivo.txt
```

## Buscar y procesos en Bash
```bash
grep -R "texto" .
find . -name "*.js"
ps aux
```

## PowerShell
```powershell
Get-Location
Get-ChildItem
Set-Location .\\carpeta
New-Item archivo.txt -ItemType File
Copy-Item origen.txt destino.txt
Remove-Item archivo.txt
Get-Process
```

## Git desde terminal
```bash
git status
git add .
git commit -m "feat: cambio"
git push
```