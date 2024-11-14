import { Commande } from "./data";

export function calculerMeilleursClients(commandes: Commande[]) {
  console.time("imperative-solution");
  // Calcul du montant total par client
  const totauxParClient: Record<string, number> = {};

  for (let i = 0; i < commandes.length; i++) {
    const commande = commandes[i];
    const client = commande.client;
    if (!totauxParClient[client]) {
      totauxParClient[client] = 0;
    }
    let totalCommande = 0;
    for (let j = 0; j < commande.articles.length; j++) {
      const article = commande.articles[j];
      totalCommande += article.quantité * article.prixUnitaire;
    }
    totauxParClient[client] += totalCommande;
  }

  // Conversion en tableau pour le tri
  const clients = [];
  for (let client in totauxParClient) {
    clients.push({ client: client, total: totauxParClient[client] });
  }

  // Tri des clients par montant total dépensé
  clients.sort(function (a, b) {
    return b.total - a.total;
  });

  // Extraction des noms des trois meilleurs clients
  const meilleursClients = [];
  for (let i = 0; i < 3 && i < clients.length; i++) {
    meilleursClients.push(clients[i].client);
  }

  console.log(meilleursClients); // Exemple de sortie : ['Alice', 'Charlie', 'Bob']
  console.timeEnd("imperative-solution");
}
