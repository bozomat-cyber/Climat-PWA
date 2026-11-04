# CliMat V5 — PWA

Version compilée de CliMat V5, publiée gratuitement avec GitHub Pages :

**https://bozomat-cyber.github.io/Climat-PWA/**

Cette distribution contient l’interface, les ressources du paquet documentaire v0.3 et le moteur SQLite WebAssembly. Elle ne contient pas d’archive SQLite ni de fichier de provenance interne.

## Installer sur iPhone

Ouvrir le lien dans Safari, toucher **Partager**, puis **Sur l’écran d’accueil**. Lancer l’icône une première fois avec Internet pour installer les ressources hors ligne.

## Importer la base SQLite

Dans l’application, choisir **Charger les données CliMat**, puis sélectionner l’archive `.zst` depuis Fichiers. L’application vérifie le manifeste et les empreintes avant d’activer la base. Le fichier est traité sur l’appareil et n’est pas envoyé à un serveur.

Le contrôle automatisé de l’import est passé. Le transfert OPFS complet reste à confirmer sur un iPhone physique.

## Publication

Le dépôt ne contient que la sortie compilée et ce workflow de publication statique. La source utilisée est `bozomat-cyber/Climat`, branche `climat-v5-sqlite-pathologies-v03`, commit `440fc3b18ce61d778aad32ab5ce9d1dc444aaee3`. La compilation cible le préfixe GitHub Pages `/Climat-PWA/`.
