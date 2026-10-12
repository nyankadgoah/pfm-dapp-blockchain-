import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Addition from "../contracts/Addition.json";
import BlockchainInfo from "../components/BlockchainInfo";

function Exercice1() {

  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [resultat, setResultat] = useState("");

  const additionner = async () => {
    try {

      // Connexion à Ganache
      const web3 = new Web3("http://127.0.0.1:7545");

      // Adresse du contrat Addition déployé sur Ganache
      const address = Addition.networks["5777"].address;

      // Création de l'objet contrat
      const contract = new web3.eth.Contract(
        Addition.abi,
        address
      );

      // Appel de la fonction addition2(x, y)
      const resultatBlockchain = await contract.methods
        .addition2(nombre1, nombre2)
        .call();

      setResultat(resultatBlockchain);

    } catch (error) {

      console.error(error);
      setResultat("Erreur lors de l'appel au contrat.");

    }
  };

  return (
    <div className="exercise-page">

      <h1>Exercice 1 : Sommes de deux variables</h1>

      <p>
        Cet exercice permet d'interagir avec le smart contract Addition.
      </p>

      <hr />

      <h2>Somme de deux variables</h2>

      <p>Premier nombre :</p>

      <input
        type="number"
        value={nombre1}
        onChange={(e) => setNombre1(e.target.value)}
      />

      <p>Deuxième nombre :</p>

      <input
        type="number"
        value={nombre2}
        onChange={(e) => setNombre2(e.target.value)}
      />

      <br /><br />

      <button onClick={additionner}>
        Additionner
      </button>

      <h3>Résultat :</h3>

      <p>{resultat}</p>

      <br />

      <Link to="/">
        ← Retour au Sommaire
      </Link>
      <br /><br />

<BlockchainInfo /> 

    </div>
  );
}

export default Exercice1;