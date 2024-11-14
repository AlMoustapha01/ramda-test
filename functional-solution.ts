import { Commande } from "./data";

export function calculerMeilleursClients(data: Commande[]) {
  console.time("functional-solution");
  // Calcul du montant total par client
  const totauxParClient: Record<string, number> = data.reduce(
    (acc: Record<string, number>, commande: Commande) => {
      const totalCommande = commande.articles.reduce((sum, article) => {
        return sum + article.quantité * article.prixUnitaire;
      }, 0);

      acc[commande.client] = (acc[commande.client] || 0) + totalCommande;
      return acc;
    },
    {}
  );

  // Conversion en tableau et tri des clients par montant total dépensé
  const meilleursClients = Object.entries(totauxParClient)
    .map(([client, total]) => ({ client, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3)
    .map((item) => item.client);

  console.log(meilleursClients); // Exemple de sortie : ['Alice', 'Charlie', 'Bob']
  console.timeEnd("functional-solution");
}
