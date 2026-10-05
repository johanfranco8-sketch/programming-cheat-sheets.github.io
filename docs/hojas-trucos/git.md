# Hoja de trucos: Git

## Configuración
```bash
git config --global user.name "Tu nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
```

## Flujo básico
```bash
git status
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

## Ramas
```bash
git branch
git switch -c feature/nueva-funcion
git switch main
git merge feature/nueva-funcion
```

## Actualizar repositorio
```bash
git pull origin main
git fetch --all
git log --oneline --graph --all
```

## Deshacer con cuidado
```bash
git restore archivo.txt
git restore --staged archivo.txt
git revert HASH_DEL_COMMIT
```