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
Set-Location .\carpeta
New-Item archivo.txt -ItemType File
Copy-Item origen.txt destino.txt
Remove-Item archivo.txt
Get-Process
```

## Permisos y scripts
```bash
chmod +x script.sh
./script.sh
```

```powershell
Set-ExecutionPolicy -Scope Process RemoteSigned
.\script.ps1
```

## Buenas prácticas
- Comprueba la ruta actual antes de ejecutar comandos destructivos.
- Usa `--` o comillas cuando trabajes con nombres de archivo especiales.
- Prueba scripts en una carpeta de ejemplo antes de automatizar tareas reales.