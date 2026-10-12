import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Parite from "../contracts/Parite.json";
import BlockchainInfo from "../components/BlockchainInfo";

function Exercice5() {

  const [nombre, setNombre] = useState("");
  const [resultat, setResultat] = useState("");

  const testerParite = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = Parite.networks["5777"].address;

      const contract = new web3.eth.Contract(
        Parite.abi,
        address
      );

      const estPair = await contract.methods
        .estPair(nombre)
        .call();

      if (estPair) {
        setResultat("Le nombre est pair.");
      } else {
        setResultat("Le nombre est impair.");
      }

    } catch (error) {

      console.error(error);

      setResultat(
        "Erreur lors de l'appel au contrat."
      );
    }
  };

  return (
    <div className="exercise-page">

      <h1>Exercice 5 : Tester la Parite d'un nombre</h1>

      <p>
        Cet exercice permet de déterminer si un nombre est pair ou impair.
      </p>

      <hr />

      <h2>Tester la parité</h2>

      <p>Entrez un nombre :</p>

      <input
        type="number"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <button onClick={testerParite}>
        Tester
      </button>

      <h3>Résultat :</h3>

      <p>{resultat}</p>

      <br />

      <Link to="/">
        ← Retour au Sommaire
      </Link>

      <br />
      <br />

      <BlockchainInfo />

    </div>
  );
}

export default Exercice5; 