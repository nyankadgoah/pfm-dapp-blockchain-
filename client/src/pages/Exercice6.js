import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import TableauNombres from "../contracts/TableauNombres.json";
import BlockchainInfo from "../components/BlockchainInfo";
import TransactionInfo from "../components/TransactionInfo"; 

function Exercice6() {

  const [nombre, setNombre] = useState("");
  const [index, setIndex] = useState("");

  const [element, setElement] = useState("");
  const [tableau, setTableau] = useState([]);
  const [somme, setSomme] = useState("");

  const [transactionHash, setTransactionHash] = useState("");
  const [gasUsed, setGasUsed] = useState("");

  // Ajouter un nombre au tableau
  const ajouterNombre = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const accounts = await web3.eth.getAccounts();

      const address = TableauNombres.networks["5777"].address;

      const contract = new web3.eth.Contract(
        TableauNombres.abi,
        address
      );

      const receipt = await contract.methods
        .ajouterNombre(nombre)
        .send({ from: accounts[0] });

      setTransactionHash(receipt.transactionHash);
      setGasUsed(receipt.gasUsed);

      setNombre("");

    } catch (error) {

      console.error(error);

    }
  };

  // Récupérer un élément du tableau
  const recupererElement = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = TableauNombres.networks["5777"].address;

      const contract = new web3.eth.Contract(
        TableauNombres.abi,
        address
      );

      const resultat = await contract.methods
        .getElement(index)
        .call();

      setElement(resultat);

    } catch (error) {

      console.error(error);

      setElement("Index inexistant");

    }
  };

  // Afficher tout le tableau
  const afficherTableau = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = TableauNombres.networks["5777"].address;

      const contract = new web3.eth.Contract(
        TableauNombres.abi,
        address
      );

      const resultat = await contract.methods
        .afficheTableau()
        .call();

      setTableau(resultat);

    } catch (error) {

      console.error(error);

    }
  };

  // Calculer la somme
  const calculerSomme = async () => {

    try {

      const web3 = new Web3("http://127.0.0.1:7545");

      const address = TableauNombres.networks["5777"].address;

      const contract = new web3.eth.Contract(
        TableauNombres.abi,
        address
      );

      const resultat = await contract.methods
        .calculerSomme()
        .call();

      setSomme(resultat);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="exercise-page">

      <h1>Exercice 6 : Gestion des Tableaux</h1>

      <p>
        Cet exercice permet de gérer un tableau de nombres
        avec le smart contract TableauNombres.
      </p>

      <hr />

      <h2>Ajouter un nombre</h2>

      <input
        type="number"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Entrez un nombre"
      />

      <br />
      <br />

      <button onClick={ajouterNombre}>
        Ajouter
      </button>

      <h2>Récupérer un élément</h2>

      <p>
        Entrez l'index de l'élément :
      </p>

      <input
        type="number"
        value={index}
        onChange={(e) => setIndex(e.target.value)}
        placeholder="Exemple : 0"
      />

      <br />
      <br />

      <button onClick={recupererElement}>
        Récupérer l'élément
      </button>

      <p>
        <strong>Élément :</strong> {element}
      </p>

      <h2>Afficher le tableau</h2>

      <button onClick={afficherTableau}>
        Afficher le tableau
      </button>

      <p>
        <strong>Tableau :</strong>
      </p>

      <p>
        {tableau.length > 0
          ? tableau.join(" - ")
          : "Aucun tableau affiché"}
      </p>

      <h2>Calculer la somme</h2>

      <button onClick={calculerSomme}>
        Calculer la somme
      </button>

      <p>
        <strong>Somme :</strong> {somme}
      </p>

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

export default Exercice6;