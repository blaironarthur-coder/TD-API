// Importation des types Request et Response depuis Express
// Request : représente la requête HTTP reçue
// Response : représente la réponse HTTP envoyée au client
import { Request, Response } from 'express';

/**
* Contrôleur pour la route GET /users
* Description : Renvoie un message avec la liste des utilisateurs (simulation)
* @param req - Objet représentant la requête HTTP (non utilisé ici)
* @param res - Objet permettant d'envoyer une réponse HTTP
*/

import { User } from '../types/user';

/**
 * Stockage en mémoire (remis à zéro à chaque redémarrage).
 * Bonus facile à activer : remplacez ce tableau par une base (SQLite, Mongo, etc.).
 */

const users: User[] = [];// Stockage en mémoire
let nextId = 1;

export const getUsers = (req: Request, res: Response) => {
  return res.json({ users });
};

/**
* Contrôleur pour la route POST /users
* Description : Ajoute un nouvel utilisateur en récupérant les données du corps de la requête
* @param req - Objet représentant la requête HTTP contenant les données utilisateur
* @param res - Objet permettant d'envoyer une réponse HTTP
*/

export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body as Partial<User>; // Récupération des données envoyées dans le corps de la requête
// Envoie une réponse JSON confirmant l'ajout de l'utilisateur


  if (!name || !email) {
    return res.status(400).json({ message: 'Nom et email requis.' });
  }

  // Vérification simple d'email (démo)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email invalide.' });
  }

  // Évite les doublons d'email (en mémoire)
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'Email déjà enregistré.' });
  }

  const user: User = { id: nextId++, name, email };
  users.push(user);// Ajout en mémoire
  console.log("🛠 Utilisateur ajouté :", { name, email });
  return res.status(201).json({ message: `Utilisateur ${name} ajouté avec succès !`, user });
};


export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });
  return res.json({ user });
};

export const updateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

  const { name, email } = req.body as Partial<User>;

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email invalide.' });
    }
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== id)) {
      return res.status(409).json({ message: 'Email déjà enregistré par un autre utilisateur.' });
    }
    user.email = email;
  }
  if (typeof name === 'string' && name.trim().length > 0) {
    user.name = name;
  }

  return res.json({ message: 'Utilisateur mis à jour.', user });
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur introuvable.' });
  const [removed] = users.splice(index, 1);
  return res.json({ message: 'Utilisateur supprimé.', user: removed });
};
