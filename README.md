# CliMat V5 — PWA

Version compilée de CliMat V5, publiée gratuitement avec GitHub Pages :

**https://bozomat-cyber.github.io/Climat-PWA/**

Cette distribution contient l’interface, les ressources du paquet documentaire v0.3 et le moteur SQLite WebAssembly. Elle ne contient pas d’archive SQLite ni de fichier de provenance interne.

## Installer sur iPhone

Ouvrir le lien dans Safari, toucher **Partager**, puis **Sur l’écran d’accueil**. Lancer l’icône une première fois avec Internet pour installer les ressources hors ligne.

## Importer la base SQLite

Dans l’application, choisir **Charger les données CliMat**, puis sélectionner l’archive `.zst` depuis Fichiers. L’application vérifie le manifeste et les empreintes avant d’activer la base. Le fichier est traité sur l’appareil et n’est pas envoyé à un serveur.

Les contrôles automatisés de l’import sont passés. Un import complet reste à confirmer sur un iPhone physique avec l’archive v0.3 validée.

## Publication

Le dépôt ne contient que la sortie compilée et ce workflow de publication statique. La source utilisée est `bozomat-cyber/Climat`, branche `climat-v5-import-diagnostic-20261104`, commit `ce68d75a7e5b01a5cd416adf5461452a0a1d670f`. La compilation cible le préfixe GitHub Pages `/Climat-PWA/`.
