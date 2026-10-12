import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import Payment from "../contracts/Payment.json";
import BlockchainInfo from "../components/BlockchainInfo";
import TransactionInfo from "../components/TransactionInfo";

function Exercice8() {

  const [recipient, setRecipient] = useState("");
  const [montant, setMontant] = useState("");
  const [balance, setBalance] = useState("");

  const [transactionHash, setTransactionHash] = useState("");
  const [gasUsed, setGasUsed] = useState("");

  const getContract = async () => {

    const web3 = new Web3("http://127.0.0.1:7545");

    const address = Payment.networks["5777"].address;

    const contract = new web3.eth.Contract(
      Payment.abi,
      address
    );

    return {
      web3,
      contract
    };
  };

  // Afficher le destinataire
  const afficherDestinataire = async () => {

    try {

      const { contract } = await getContract();

      const resultat = await contract.methods
        .recipient()
        .call();

      setRecipient(resultat);

    } catch (error) {

      console.error(error);

    }
  };

  // Envoyer un paiement
  const effectuerPaiement = async () => {

    try {

      const { web3, contract } = await getContract();

      const accounts = await web3.eth.getAccounts();

      const valeurWei = web3.utils.toWei(
        montant,
        "ether"
      );

      const receipt = await contract.methods
        .receivePayment()
        .send({
          from: accounts[0],
          value: valeurWei
        });

      setTransactionHash(receipt.transactionHash);
      setGasUsed(receipt.gasUsed);

      setMontant("");

    } catch (error) {

      console.error(error);

    }
  };

  // Afficher le solde du contrat
  const afficherSolde = async () => {

    try {

      const { web3, contract } = await getContract();

      const address = contract.options.address;

      const resultat = await web3.eth.getBalance(address);

      const resultatEther = web3.utils.fromWei(
        resultat,
        "ether"
      );

      setBalance(resultatEther);

    } catch (error) {

      console.error(error);

    }
  };

  // Retirer les fonds
  const retirerFonds = async () => {

    try {

      const { web3, contract } = await getContract();

      const accounts = await web3.eth.getAccounts();

      const receipt = await contract.methods
        .withdraw()
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
        Exercice 8 : Utilisations des Variables Globales
        (msg.sender et msg.value)
      </h1>

      <p>
        Cet exercice permet d'effectuer des paiements
        et d'utiliser les variables globales msg.sender et msg.value.
      </p>

      <hr />

      <h2>Destinataire</h2>

      <button onClick={afficherDestinataire}>
        Afficher le destinataire
      </button>

      <p>
        <strong>Adresse du destinataire :</strong>
        <br />
        {recipient || "Aucune adresse affichée"}
      </p>

      <h2>Effectuer un paiement</h2>

      <p>
        Montant à envoyer en ETH :
      </p>

      <input
        type="number"
        step="0.01"
        min="0"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        placeholder="Exemple : 1"
      />

      <br />
      <br />

      <button onClick={effectuerPaiement}>
        Envoyer le paiement
      </button>

      <h2>Solde du contrat</h2>

      <button onClick={afficherSolde}>
        Afficher le solde
      </button>

      <p>
        <strong>Solde :</strong>{" "}
        {balance || "Aucun solde affiché"} ETH
      </p>

      <h2>Retirer les fonds</h2>

      <p>
        Seul le destinataire peut effectuer le retrait.
      </p>

      <button onClick={retirerFonds}>
        Retirer les fonds
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

export default Exercice8; 