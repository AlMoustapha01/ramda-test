import { calculerMeilleursClients } from "./functional-solution";
import { calculerMeilleursClients as imperativeSolution } from "./imperative-solution";
import { calculerMeilleursClients as ramdaSolution } from "./ramda-solution";
import { commandes } from "./data";
import Benchmark from "benchmark";

function performTests() {
  const suite = new Benchmark.Suite();
  const results: { name: string; mean: number }[] = [];

  suite
    .add("Solution avec l'approche fonctionnelle", function () {
      calculerMeilleursClients(commandes);
    })
    .add("Solution avec l'approche impérative", function () {
      imperativeSolution(commandes);
    })
    .add("Solution avec Ramda", function () {
      ramdaSolution(commandes);
    })
    .on("cycle", (event: any) => {
      console.log(String(event.target));
      results.push({ name: event.target.name, mean: event.target.stats.mean });
    })
    .on("complete", function (this: Benchmark.Suite) {
      console.log("Résultats des performances :");
      results.forEach((result) => {
        console.log(
          `${result.name}: ${result.mean.toFixed(6)} secondes (moyenne)`
        );
      });
      console.log("La plus rapide est " + this.filter("fastest").map("name"));
    })
    .run({ async: true });
}

performTests();
