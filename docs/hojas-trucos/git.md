# Hoja de trucos: Git

## Configuración inicial
```bash
git config --global user.name "Tu nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
```

## Flujo diario
```bash
git status
git add .
git commit -m "feat: describir el cambio"
git push origin main
```

## Ramas
```bash
git switch -c feature/nueva-funcion
git branch
git switch main
git merge feature/nueva-funcion
```

## Remotos y actualización
```bash
git remote -v
git fetch origin
git pull --rebase origin main
git push -u origin feature/nueva-funcion
```

## Recuperación segura
```bash
git restore archivo.txt
git restore --staged archivo.txt
git revert HASH_DEL_COMMIT
git log --oneline --graph --all
```

## Buenas prácticas
- Haz commits pequeños con mensajes claros y verificables.
- Actualiza tu rama antes de abrir un pull request.
- Prefiere `git revert` para deshacer cambios compartidos.