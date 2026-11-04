# CliMat V5 — PWA

Distribution compilée de CliMat V5, hébergée par GitHub Pages.

- URL : https://bozomat-cyber.github.io/Climat-PWA/
- Les ressources documentaires v0.3 sont incluses en fichiers compressés par fragments.
- Les archives SQLite ne sont pas incluses. L’import SQLite se fait localement depuis l’app Fichiers.
- Aucun corpus source de provenance n’est distribué.

## Installer sur iPhone

Ouvrir l’URL dans Safari, toucher **Partager**, puis **Sur l’écran d’accueil**. Lancer l’icône une première fois avec Internet pour installer les ressources hors ligne.

## Import SQLite local

Dans l’application, choisir **Charger les données CliMat**, puis sélectionner l’archive `.zst` dans Fichiers. L’application vérifie le manifeste et l’empreinte avant d’activer une base. L’archive n’est pas envoyée ni hébergée ici. L’import complet OPFS doit encore être confirmé sur un iPhone réel pour cette publication.

## Publication

Le dépôt contient uniquement la sortie compilée. La publication est déclenchée par push sur `main` via GitHub Actions et Pages. Les mises à jour applicatives doivent être compilées depuis le dépôt privé, contrôlées, puis remplacer les fichiers de distribution dans ce dépôt.

La source utilisée est `bozomat-cyber/Climat`, branche `climat-v5-sqlite-pathologies-v03`, commit `440fc3b18ce61d778aad32ab5ce9d1dc444aaee3`, avec adaptation du préfixe URL `/Climat-PWA/`.
