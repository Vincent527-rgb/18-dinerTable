// ==== Objet ====
const restaurant = {
  nom: "Chez Oli",
  ouvert: true,
  commandes: [
    {
      table: 1,
      client: "Olivier",
      plats: [
        { nom: "Burger", prix: 12.5 },
        { nom: "Frites", prix: 4 }
      ]
    },
    {
      table: 2,
      client: "Aurélio",
      plats: [
        { nom: "Salade César", prix: 9 },
        { nom: "Eau plate", prix: 2 }
      ]
    },
    {
      table: 1,
      client: "Olivier",
      plats: [
        { nom: "Café", prix: 2.5 }
      ]
    },
    {
      table: 3,
      client: "Charlotte",
      plats: [
        { nom: "Pâtes aux champignons", prix: 11 },
        { nom: "Verre de vin rouge", prix: 5 }
      ]
    },
    {
      table: 4,
      client: "Lorian",
      plats: [
        { nom: "Nuggets", prix: 6 },
        { nom: "Compote", prix: 3 },
        { nom: "Jus de pomme", prix: 2 }
      ]
    },
    {
      table: 5,
      client: "Hugo",
      plats: [
        { nom: "Purée carottes", prix: 4 },
        { nom: "Petit pot dessert", prix: 2.5 }
      ]
    },
    {
      table: 6,
      client: "Thomas",
      plats: [
        { nom: "Pizza Margherita", prix: 10 },
        { nom: "Bières artisanale", prix: 4.5 }
      ]
    },
    {
      table: 3,
      client: "Charlotte",
      plats: [
        { nom: "Tiramisu", prix: 5.5 }
      ]
    },
    {
      table: 7,
      client: "Aurélie",
      plats: [
        { nom: "Steak frites", prix: 14 },
        { nom: "Coca zéro", prix: 3 }
      ]
    }
  ]
};

//? Affichez, côté front, un récapitulatif des tables qui ont passé des commandes (pourquoi pas avec <summary> et <detail> où il est possible de consulter le détail des commandes d'une table ainsi que le montant total de la table).

//? Attention : une même table peut avoir plusieurs commandes, il faut cumuler les montants.

// ==== Sélections ====
const containerAddition = document.querySelector(".container-addition");

// ==== Variables ====


// ==== Fonctions générales ====
function createElement(tag, className, content) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;
}

function appendElement(parent, child) {
    parent.append(child);
}

// ==== Fonctions d'action ====
function listNotes() { 
    // Nouvel objet temporaire pour fusionner les commandes
    const fusionCommandes = {};

    // Boucle fusion
    restaurant.commandes.forEach((commande) => {
        const table = commande.table;
        if (fusionCommandes[table]) {
            fusionCommandes[table].plats.push(...commande.plats)
        } else {
            fusionCommandes[table] = {...commande};
        }
    })

    // Convertir l'objet en tableau
    const addition = Object.values(fusionCommandes);

    // Trier mes commandes
    addition.sort((a, b) => a.table - b.table);

    // Création affichage
    restaurant.commandes.forEach((commande) => {
        // Creation éléments details
        const details = createElement("details", `${commande.table}`, "")
        const containerDetails = createElement("ul");
        const definitionDetails = createElement("dt", "", `Client: ${commande.client}`);

        // Addition - total prix
        const tableSum = commande.plats.map(item => item.prix).reduce((sum, curr) => sum + curr, 0);        
        const tableTotal = createElement("summary", "", `Table: ${commande.table} - ${tableSum} €`)
        
        // Plats
        commande.plats.forEach(plat => {
             const descriptionDetails = createElement("li", "", `${plat.nom} - ${plat.prix} €`);
             appendElement(definitionDetails, descriptionDetails)
        })
        
        // Ajout des éléments
        appendElement(containerAddition, details);
        appendElement(details, tableTotal)
        appendElement(details, containerDetails);
        appendElement(containerDetails, definitionDetails);   
    })
}

// ==== Appels des fonctions ====
listNotes();
