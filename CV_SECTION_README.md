# Section CV Téléchargeable - Documentation

## 🎯 Objectif
Ajouter une section CV téléchargeable avec aperçu dans le portfolio Angular.

## 📁 Structure des fichiers

### Fichier CV
```
src/assets/cv/cv_yao.pdf
```
- Fichier PDF original déplacé depuis `src/cv_yao/`
- Accessible publiquement après le build

### Section HTML
**Fichier :** `src/app/components/apropos/apropos.html`
- Section CV ajoutée avant le footer
- Iframe pour l'aperçu du PDF
- Deux boutons : "Voir en plein écran" et "Télécharger"

### Styles CSS
**Fichier :** `src/app/components/apropos/apropos.scss`
- Styles pour la section CV
- Design responsive (desktop, tablette, mobile)
- Animations et effets hover

## 🎨 Caractéristiques

### Design
- Section centrée avec espacement approprié
- Iframe avec bordures arrondies et ombre
- Boutons colorés avec icônes emoji
- Animations hover fluides

### Boutons
- **Voir en plein écran** (rouge) : `target="_blank"`
- **Télécharger** (bleu) : attribut `download`

### Responsive
- **Desktop** : Iframe 500px de hauteur
- **Tablette** : Iframe 400px de hauteur
- **Mobile** : Iframe 350px de hauteur, boutons verticaux

## 🚀 Fonctionnalités

### Aperçu en ligne
- Iframe affiche le PDF directement dans la page
- Scrollable pour naviguer dans le document
- Pas besoin de quitter le site

### Téléchargement
- Bouton de téléchargement direct
- Attribut `download` force le téléchargement
- Compatible avec tous les navigateurs

### Plein écran
- Ouvre le PDF dans un nouvel onglet
- Expérience utilisateur native du navigateur

## 🔧 Configuration Angular

### Assets Configuration
**Fichier :** `angular.json`
```json
"assets": [
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "assets"
  }
]
```

### Build Test
- ✅ Build réussi sans erreurs
- ✅ CV inclus dans `dist/yao/browser/assets/cv/cv_yao.pdf`
- ✅ Compatible avec déploiement Vercel

## 📱 Accessibilité

### URLs après déploiement
- **Local** : `http://localhost:4200/assets/cv/cv_yao.pdf`
- **Vercel** : `https://mon-site.vercel.app/assets/cv/cv_yao.pdf`

### Navigation
- Accessible depuis la page "À propos"
- Boutons avec contrastes appropriés
- Responsive sur tous les appareils

## 🎯 Résultat final

Le portfolio inclut maintenant :
- ✅ Aperçu CV interactif
- ✅ Téléchargement CV direct
- ✅ Design moderne et responsive
- ✅ Compatible Vercel
- ✅ Expérience utilisateur optimale

## 🔍 Tests recommandés

1. **Local** : `ng serve` puis naviguer vers `/apropos`
2. **Build** : `ng build` pour vérifier l'inclusion du CV
3. **Déploiement** : Tester sur Vercel après déploiement
4. **Mobile** : Tester responsive sur différents appareils
5. **Accessibilité** : Tester navigation clavier et lecteurs d'écran
