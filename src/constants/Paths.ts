/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Etudiants: {
    Base: '/etudiants',
    Get: '/',
    GetOne: '/:id',
    GetByCours: '/cours/:cours',
    GetByCohorte: '/cohorte/:cohorte',
    GetVulkins: '/vulkins/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Stats: {
    Base: '/stats',
    GetMoyenneParCours: '/moyenne/:nom',
    GetPourcentageVulkins: '/pourcentage/',
  }
} as const;
