import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Conversion from "../contracts/Conversion.json";
import BlockchainInfo from "../components/BlockchainInfo";

function Exercice2() {

  const [montant, setMontant] = useState("");
  const [resultatEtherWei, setResultatEtherWei] = useState("");
  const [resultatWeiEther, setResultatWeiEther] = useState("");

  const etherVersWei = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = Conversion.networks["5777"].address;

      const contract = new web3.eth.Contract(
        Conversion.abi,
        address
      );

      const resultat = await contract.methods
        .etherEnWei(montant)
        .call();

      setResultatEtherWei(resultat.toString());

    } catch (error) {

      console.error(error);
      setResultatEtherWei("Erreur lors de la conversion.");

    }
  };

  const weiVersEther = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = Conversion.networks["5777"].address;

      const contract = new web3.eth.Contract(
        Conversion.abi,
        address
      );

      const resultat = await contract.methods
        .weiEnEther(montant)
        .call();

      setResultatWeiEther(resultat.toString());

    } catch (error) {

      console.error(error);
      setResultatWeiEther("Erreur lors de la conversion.");

    }
  };

  return (
    <div className="exercise-page">

      <h1>Exercice 2 : Conversion des Cryptomonnaies</h1>

      <p>
        Cet exercice permet de convertir des montants entre Ether et Wei.
      </p>

      <hr />

      <h2>Conversion Ether → Wei</h2>

      <p>Montant en Ether :</p>

      <input
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
      />

      <br /><br />

      <button onClick={etherVersWei}>
        Convertir Ether en Wei
      </button>

      <h3>Résultat :</h3>

      <p>
        {resultatEtherWei}
      </p>

      <hr />

      <h2>Conversion Wei → Ether</h2>

      <p>Montant en Wei :</p>

      <input
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
      />

      <br /><br />

      <button onClick={weiVersEther}>
        Convertir Wei en Ether
      </button>

      <h3>Résultat :</h3>

      <p>
        {resultatWeiEther}
      </p>

      <br />

      <Link to="/">
        ← Retour au Sommaire
      </Link>

      <br /><br />

      <BlockchainInfo />

    </div>
  );
}

export default Exercice2; 