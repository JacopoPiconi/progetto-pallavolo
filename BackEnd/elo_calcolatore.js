const K = 32;// Costante K per il calcolo Elo, può essere adattata in base alla stabilità desiderata dei rating
function calcolaProbabilitaAttesa(ratingA, ratingB) {// Calcola la probabilità  che A vinca contro B
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));// Formula standard Elo per la probabilità attesa di vittoria di A contro B
}
function aggiornaRating(ratingA, ratingB, risultatoA) {// Aggiorna i rating di A e B dopo un match, dove risultatoA è 1 se A vince, 0 se perde
    const probabilitaA = calcolaProbabilitaAttesa(ratingA, ratingB);
    const probabilitaB = 1 - probabilitaA;
    const risultatoB = 1 - risultatoA;

    const nuovoA = Math.round(ratingA + K * (risultatoA - probabilitaA));
    const nuovoB = Math.round(ratingB + K * (risultatoB - probabilitaB));
    return { nuovoA, nuovoB };
}
module.exports = {
    calcolaProbabilitaAttesa,
    aggiornaRating
};