import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

import GestionChaines from "../contracts/GestionChaines.json";
import BlockchainInfo from "../components/BlockchainInfo";
import TransactionInfo from "../components/TransactionInfo"; 

function Exercice3() {
  const [message, setMessage] = useState("");
  const [messageRecupere, setMessageRecupere] = useState("");

  const [chaine1, setChaine1] = useState("");
  const [chaine2, setChaine2] = useState("");

  const [concatResultat, setConcatResultat] = useState("");
  const [longueurResultat, setLongueurResultat] = useState("");
  const [comparaisonResultat, setComparaisonResultat] = useState("");

  // Informations de transaction
  const [transactionHash, setTransactionHash] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [transactionFrom, setTransactionFrom] = useState("");
  const [transactionTo, setTransactionTo] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionGas, setTransactionGas] = useState("");
  const [transactionBlock, setTransactionBlock] = useState("");
  const [transactionIndex, setTransactionIndex] = useState("");
  const [transactionNonce, setTransactionNonce] = useState("");
  const [transactionGasFee, setTransactionGasFee] = useState("");
  const [transactionBalanceAfter, setTransactionBalanceAfter] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionTimestamp, setTransactionTimestamp] = useState("");
  const [transactionFunction, setTransactionFunction] = useState("");
  const [transactionContractName, setTransactionContractName] = useState("");

  const getContract = () => {
    const web3 = new Web3("http://127.0.0.1:7545");

    const address = GestionChaines.networks["5777"].address;

    const contract = new web3.eth.Contract(
      GestionChaines.abi,
      address
    );

    return { web3, contract };
  };

  // SET + GET MESSAGE
  const setGetMessage = async () => {
    try {
      const { web3, contract } = getContract();

      const accounts = await web3.eth.getAccounts();

      const receipt = await contract.methods
        .setMessage(chaine1)
        .send({
          from: accounts[0]
        });

      setMessage(chaine1);

      // Hash de la transaction
      setTransactionHash(receipt.transactionHash);

      // Gas utilisé
      setGasUsed(receipt.gasUsed.toString());

      // Récupération de la transaction
      const transaction = await web3.eth.getTransaction(
        receipt.transactionHash
      );

      if (transaction) {

        // Numéro de transaction
        // On ajoute 1 pour afficher la numérotation comme dans le PFM
        setTransactionIndex(
          transaction.transactionIndex !== undefined
            ? (Number(transaction.transactionIndex) + 1).toString()
            : "N/A"
        );

        // Expéditeur
        setTransactionFrom(transaction.from || "N/A");

        // Destinataire
        setTransactionTo(transaction.to || "N/A");

        // Hash
        setTransactionHash(
          transaction.hash || receipt.transactionHash
        );

        // Nonce
        setTransactionNonce(
          transaction.nonce !== undefined
            ? transaction.nonce.toString()
            : "N/A"
        );

        // Montant
        setTransactionValue(
          transaction.value !== undefined
            ? transaction.value.toString()
            : "0"
        );

        // Limite de Gas
        setTransactionGas(
          transaction.gas !== undefined
            ? transaction.gas.toString()
            : "N/A"
        );

        // Numéro du bloc
        setTransactionBlock(
          transaction.blockNumber !== undefined
            ? transaction.blockNumber.toString()
            : "N/A"
        );

        // Fonction appelée
        setTransactionFunction("setMessage");

        // Nom du contrat
        setTransactionContractName("GestionChaines");

        // Statut
        setTransactionStatus(
          receipt.status?.toString() === "1"
            ? "Réussie"
            : "Échec"
        );

        // Frais de transaction
        if (
          receipt.gasUsed !== undefined &&
          transaction.gasPrice !== undefined
        ) {
          const gasFee =
            Number(receipt.gasUsed.toString()) *
            Number(transaction.gasPrice.toString());

          setTransactionGasFee(
            gasFee.toLocaleString("fr-FR") + " Wei"
          );
        }

        // Solde après transaction
        const balance = await web3.eth.getBalance(
          transaction.from
        );

        setTransactionBalanceAfter(
          balance.toString() + " Wei"
        );

        // Informations du bloc
        if (transaction.blockNumber !== undefined) {

          const block = await web3.eth.getBlock(
            transaction.blockNumber
          );

          if (block && block.timestamp !== undefined) {

            const date = new Date(
              Number(block.timestamp) * 1000
            );

            setTransactionTimestamp(
              date.toLocaleString("fr-FR")
            );
          }
        }
      }

      // Récupération du message
      const resultat = await contract.methods
        .getMessage()
        .call();

      setMessageRecupere(resultat);

    } catch (error) {
      console.error(error);
    }
  };

  // CONCATENATION
  const concatener = async () => {
    try {
      const { contract } = getContract();

      const resultat = await contract.methods
        .concatener(chaine1, chaine2)
        .call();

      setConcatResultat(resultat);

    } catch (error) {
      console.error(error);
    }
  };

  // LONGUEUR
  const longueur = async () => {
    try {
      const { contract } = getContract();

      const resultat = await contract.methods
        .longueur(chaine1)
        .call();

      setLongueurResultat(resultat.toString());

    } catch (error) {
      console.error(error);
    }
  };

  // COMPARAISON
  const comparer = async () => {
    try {
      const { contract } = getContract();

      const resultat = await contract.methods
        .comparer(chaine1, chaine2)
        .call();

      setComparaisonResultat(resultat);

    } catch (error) {
      console.error(error);
    }
  };

  // MESSAGE RESULT
  const getResultMessage = () => {

    if (
      comparaisonResultat === true ||
      comparaisonResultat === "true"
    ) {
      return (
        <>
          Les deux chaînes <strong>"{chaine1}"</strong> et{" "}
          <strong>"{chaine2}"</strong> sont{" "}
          <strong>IDENTIQUES</strong>.
        </>
      );
    }

    if (
      comparaisonResultat === false ||
      comparaisonResultat === "false"
    ) {
      return (
        <>
          Les deux chaînes <strong>"{chaine1}"</strong> et{" "}
          <strong>"{chaine2}"</strong> sont{" "}
          <strong>DIFFÉRENTES</strong>.
        </>
      );
    }

    if (concatResultat) {
      return (
        <>
          Résultat de la concaténation :{" "}
          <strong>"{concatResultat}"</strong>
        </>
      );
    }

    if (longueurResultat) {
      return (
        <>
          La longueur de <strong>"{chaine1}"</strong> est{" "}
          <strong>{longueurResultat}</strong>.
        </>
      );
    }

    if (messageRecupere) {
      return (
        <>
          Message récupéré :{" "}
          <strong>"{messageRecupere}"</strong>
        </>
      );
    }

    return (
      <>
        Les résultats des traitements apparaîtront ici.
      </>
    );
  };

  return (
    <div className="ex3-page">

      {/* TITRE */}
      <div className="ex3-title">
        Exercice 3: Traitement des chaines de caractères
      </div>

      {/* ZONE DES INPUTS */}
      <div className="ex3-input-area">

        <div className="ex3-input-group">
          <label>Chaine 1 :</label>

          <input
            type="text"
            value={chaine1}
            onChange={(e) => setChaine1(e.target.value)}
          />
        </div>

        <div className="ex3-input-group">
          <label>Chaine 2 :</label>

          <input
            type="text"
            value={chaine2}
            onChange={(e) => setChaine2(e.target.value)}
          />
        </div>

      </div>

      {/* BOUTONS */}
      <div className="ex3-buttons">

        <button onClick={setGetMessage}>
          Set/Get message
        </button>

        <button onClick={longueur}>
          Longueur
        </button>

        <button onClick={concatener}>
          Concaténation
        </button>

        <button onClick={comparer}>
          Comparer
        </button>

        <button
          className="ex3-disabled-button"
          title="La fonction decouper n'existe pas dans GestionChaines.sol"
        >
          Découper
        </button>

      </div>

      {/* RESULTAT JAUNE */}
      <div className="ex3-result">
        {getResultMessage()}
      </div>

      {/* SOMMAIRE */}
      <div className="ex3-sommaire">
        <Link to="/">
          Sommaire
        </Link>
      </div>

      {/* ESPACE */}
      <div className="ex3-separator"></div>

      {/* INFORMATIONS BLOCKCHAIN */}
      <div className="ex3-blockchain-container">

        <div className="ex3-blockchain-title">
          Informations de la Blockchain
        </div>

        <div className="ex3-info-columns">

          {/* BLOCKCHAIN */}
          <div className="ex3-info-box">

            <div className="ex3-info-box-title">
              Blockchain
            </div>

            <BlockchainInfo />

          </div>

          {/* TRANSACTIONS */}
          <div className="ex3-info-box">

            <div className="ex3-info-box-title">
              Transactions (1)
            </div>

            <TransactionInfo
              transactionIndex={transactionIndex}
              from={transactionFrom}
              to={transactionTo}
              transactionHash={transactionHash}
              nonce={transactionNonce}
              value={transactionValue}
              gasFee={transactionGasFee}
              gasLimit={transactionGas}
              gasUsed={gasUsed}
              balanceAfter={transactionBalanceAfter}
              status={transactionStatus}
              blockNumber={transactionBlock}
              timestamp={transactionTimestamp}
              functionCalled={transactionFunction}
              contractName={transactionContractName}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Exercice3;