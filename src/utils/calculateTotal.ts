export default function calculateTotal(
    weights: (number | undefined)[],
    ratings: (number | undefined)[]
  ) {
    let total = 0;
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i] ?? 0;
      const rating = ratings[i] ?? 0;
      total += weight * rating;
    }
    return total;
  }