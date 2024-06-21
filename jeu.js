
let tirageAleatoire = Math.random();
console.log(tirageAleatoire);

tirageAleatoire = tirageAleatoire * 100;
console.log(tirageAleatoire);

tirageAleatoire = Math.round(tirageAleatoire);
console.log(tirageAleatoire);

let jeuContinue = false;
while (jeuContinue) {

    let valeurChoisiParUtilisateur = prompt('Trouve le nombre');
    console.log(valeurChoisiParUtilisateur);

    if (valeurChoisiParUtilisateur == tirageAleatoire) {
        alert('Bravo !');
        jeuContinue = false;
    } else if (valeurChoisiParUtilisateur > tirageAleatoire) {
        alert("C'est moins !");
    } else {
        alert("C'est plus !");
    }

}

