export interface Commande {
  id: number;
  client: string;
  articles: { produit: string; quantité: number; prixUnitaire: number }[];
}
export const commandes: Commande[] = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  client: `Client ${i + 1}`,
  articles: Array.from({ length: 2 }, (_, j) => ({
    produit: `Produit ${j + 1}`,
    quantité: Math.floor(Math.random() * 20) + 1,
    prixUnitaire: Math.random() * 10,
  })),
}));
