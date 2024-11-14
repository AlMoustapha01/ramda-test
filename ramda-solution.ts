import * as R from "ramda";
import { Commande } from "./data";

// Fonction pour calculer le total d'une commande
const calculerTotalCommande = R.pipe(
  R.prop("articles"),
  R.map(
    (article: { quantité: number; prixUnitaire: number }) =>
      article.quantité * article.prixUnitaire
  ),
  R.sum
);

// Fonction pour regrouper les commandes par client et calculer le montant total par client
export const calculerTotauxParClient = (commandes: Commande[]) => {
  const commandesParClient = R.groupBy(R.prop("client"), commandes) as Record<
    string,
    Commande[]
  >;

  return R.map(
    R.pipe(R.map(calculerTotalCommande), R.sum),
    commandesParClient
  ) as Record<string, number>;
};

// Fonction pour obtenir les trois meilleurs clients
export const obtenirMeilleursClients = (
  totauxParClient: Record<string, number>
) => {
  return R.pipe(
    R.toPairs as (obj: Record<string, number>) => [string, number][],
    R.map(([client, total]) => ({ client, total })),
    R.sortWith([R.descend(R.prop("total"))]),
    R.slice(0, 3),
    R.map((item: { client: string; total: number }) => item.client)
  )(totauxParClient);
};

export function calculerMeilleursClients(commandes: Commande[]) {
  console.time("ramda-solution");

  // Appel des fonctions pour obtenir les meilleurs clients
  const meilleursClients = obtenirMeilleursClients(
    calculerTotauxParClient(commandes)
  );

  console.log(meilleursClients); // Exemple de sortie : ['Alice', 'Charlie', 'Bob']
  console.timeEnd("ramda-solution");
}
