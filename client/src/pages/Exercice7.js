import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Rectangle from "../contracts/Rectangle.json";
import BlockchainInfo from "../components/BlockchainInfo";
import TransactionInfo from "../components/TransactionInfo";

function Exercice7() {

  const [infos, setInfos] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const [longueur, setLongueur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [surface, setSurface] = useState("");

  const [dx, setDx] = useState("");
  const [dy, setDy] = useState("");

  const [transactionHash, setTransactionHash] = useState("");
  const [gasUsed, setGasUsed] = useState("");

  // Créer une connexion avec le contrat Rectangle
  const getContract = async () => {

    const web3 = new Web3("http://127.0.0.1:7545");

    const address = Rectangle.networks["5777"].address;

    const contract = new web3.eth.Contract(
      Rectangle.abi,
      address
    );

    return {
      web3,
      contract
    };
  };

  // Afficher les informations du rectangle
  const afficherInfos = async () => {

    try {

      const { contract } = await getContract();

      const resultat = await contract.methods
        .afficheInfos()
        .call();

      setInfos(resultat);

    } catch (error) {

      console.error(error);

    }
  };

  // Afficher les coordonnées
  const afficherXY = async () => {

    try {

      const { contract } = await getContract();

      const resultat = await contract.methods
        .afficheXY()
        .call();

      setX(resultat[0]);
      setY(resultat[1]);

    } catch (error) {

      console.error(error);

    }
  };

  // Afficher la longueur et la largeur
  const afficherLoLa = async () => {

    try {

      const { contract } = await getContract();

      const resultat = await contract.methods
        .afficheLoLa()
        .call();

      setLongueur(resultat[0]);
      setLargeur(resultat[1]);

    } catch (error) {

      console.error(error);

    }
  };

  // Calculer la surface
  const calculerSurface = async () => {

    try {

      const { contract } = await getContract();

      const resultat = await contract.methods
        .surface()
        .call();

      setSurface(resultat);

    } catch (error) {

      console.error(error);

    }
  };

  // Déplacer le rectangle
  const deplacerRectangle = async () => {

    try {

      const { web3, contract } = await getContract();

      const accounts = await web3.eth.getAccounts();

      const receipt = await contract.methods
        .deplacerForme(dx, dy)
        .send({
          from: accounts[0]
        });

      setTransactionHash(receipt.transactionHash);
      setGasUsed(receipt.gasUsed);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="exercise-page">

      <h1>
        Exercice 7 : Programmation Orientee Objet (Formes geometriques)
      </h1>

      <p>
        Cet exercice utilise les contrats Forme et Rectangle.
      </p>

      <hr />

      <h2>Informations du rectangle</h2>

      <button onClick={afficherInfos}>
        Afficher les informations
      </button>

      <p>
        <strong>Type :</strong> {infos}
      </p>

      <h2>Position du rectangle</h2>

      <button onClick={afficherXY}>
        Afficher les coordonnées
      </button>

      <p>
        <strong>X :</strong> {x}
      </p>

      <p>
        <strong>Y :</strong> {y}
      </p>

      <h2>Dimensions du rectangle</h2>

      <button onClick={afficherLoLa}>
        Afficher les dimensions
      </button>

      <p>
        <strong>Longueur :</strong> {longueur}
      </p>

      <p>
        <strong>Largeur :</strong> {largeur}
      </p>

      <h2>Surface</h2>

      <button onClick={calculerSurface}>
        Calculer la surface
      </button>

      <p>
        <strong>Surface :</strong> {surface}
      </p>

      <h2>Déplacer le rectangle</h2>

      <p>Déplacement sur X :</p>

      <input
        type="number"
        value={dx}
        onChange={(e) => setDx(e.target.value)}
        placeholder="Exemple : 5"
      />

      <p>Déplacement sur Y :</p>

      <input
        type="number"
        value={dy}
        onChange={(e) => setDy(e.target.value)}
        placeholder="Exemple : -3"
      />

      <br />
      <br />

      <button onClick={deplacerRectangle}>
        Déplacer
      </button>

      <br />
      <br />

      <Link to="/">
        ← Retour au Sommaire
      </Link>

      <br />
      <br />

      <TransactionInfo
        transactionHash={transactionHash}
        gasUsed={gasUsed}
      />

      <BlockchainInfo />

    </div>
  );
}

export default Exercice7;
