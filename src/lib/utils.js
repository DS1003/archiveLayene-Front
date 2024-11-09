// Fonction utilitaire pour formater les dates
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  
  // Fonction utilitaire pour vérifier si une chaîne est vide ou non
  export function isEmptyString(str) {
    return !str || str.trim().length === 0;
  }
  
  // Fonction utilitaire pour générer un identifiant unique
  export function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Exemple de fonction pour calculer la somme d'un tableau de nombres
  export function sumArray(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
  
  // Fonction utilitaire pour capitaliser la première lettre d'une chaîne
  export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Fonction utilitaire pour combiner des classes CSS
  export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  