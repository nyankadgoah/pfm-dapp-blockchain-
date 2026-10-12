import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Positif from "../contracts/Positif.json";
import BlockchainInfo from "../components/BlockchainInfo";

function Exercice4() {

  const [nombre, setNombre] = useState("");
  const [resultat, setResultat] = useState("");

  const testerSigne = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = Positif.networks["5777"].address;

      const contract = new web3.eth.Contract(
        Positif.abi,
        address
      );

      const resultatBlockchain = await contract.methods
        .estPositif(nombre)
        .call();

      if (resultatBlockchain) {
        setResultat("Le nombre est positif.");
      } else {
        setResultat("Le nombre n'est pas positif.");
      }

    } catch (error) {

      console.error(error);
      setResultat("Erreur lors de l'appel au contrat.");

    }
  };

  return (
    <div className="exercise-page">

      <h1>Exercice 4 : Tester le signe d'un nombre</h1>

      <p>
        Cet exercice permet de tester si un nombre est positif.
      </p>

      <hr />

      <h2>Tester le signe</h2>

      <p>Entrez un nombre :</p>

      <input
        type="number"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <button onClick={testerSigne}>
        Tester
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

export default Exercice4; 