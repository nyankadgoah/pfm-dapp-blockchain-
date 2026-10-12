import { useEffect, useState } from "react";
import Web3 from "web3";

import GestionChaines from "../contracts/GestionChaines.json";

function BlockchainInfo() {
  const [account, setAccount] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [chainId, setChainId] = useState("");
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const getBlockchainInfo = async () => {
      try {
        // Connexion à Ganache
        const web3 = new Web3("http://127.0.0.1:7545");

        // Comptes Ganache
        const accounts = await web3.eth.getAccounts();

        // Chain ID
        const networkId = await web3.eth.getChainId();

        // Dernier numéro de bloc
        const latestBlockNumber = await web3.eth.getBlockNumber();

        // Informations du dernier bloc
        const latestBlock = await web3.eth.getBlock(
          latestBlockNumber,
          true
        );

        setAccount(accounts[0] || "");
        setChainId(networkId.toString());
        setBlockNumber(latestBlockNumber.toString());
        setBlock(latestBlock);

      } catch (error) {
        console.error("Erreur BlockchainInfo :", error);
      }
    };

    getBlockchainInfo();
  }, []);

  // Adresse du contrat GestionChaines
  const contractAddress =
    GestionChaines.networks["5777"]?.address || "";

  // Formatage du timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Date inconnue";
    }

    const date = new Date(Number(timestamp) * 1000);

    return date.toLocaleString("fr-FR");
  };

  return (
    <div className="blockchain-info">

      {/* INFOS DU RESEAU */}
      <div className="blockchain-card">

        <div className="blockchain-card-title">
          Infos du réseau :
        </div>

        <div className="blockchain-card-content">

          <p>
            <strong>URL :</strong>{" "}
            HTTP://127.0.0.1:7545
          </p>

          <p>
            <strong>ID :</strong>{" "}
            {chainId}
          </p>

        </div>

      </div>


      {/* INFOS DU CONTRAT */}
      <div className="blockchain-card">

        <div className="blockchain-card-title">
          Infos du contrat :
        </div>

        <div className="blockchain-card-content">

          <p>
            <strong>Adresse :</strong>{" "}
            {contractAddress}
          </p>

          <p>
            <strong>Compte :</strong>{" "}
            {account}
          </p>

        </div>

      </div>


      {/* INFOS DU DERNIER BLOC */}
      <div className="blockchain-card">

        <div className="blockchain-card-title">
          Infos du dernier bloc :
        </div>

        <div className="blockchain-card-content">

          <p>
            <strong>N° :</strong>{" "}
            {blockNumber}
          </p>

          <p>
            <strong>Hash :</strong>{" "}
            {block?.hash || "N/A"}
          </p>

          <p>
            <strong>Timestamp :</strong>{" "}
            {formatTimestamp(block?.timestamp)}
          </p>

          <p>
            <strong>parentHash :</strong>{" "}
            {block?.parentHash || "N/A"}
          </p>

          <p>
            <strong>nonce :</strong>{" "}
            {block?.nonce || "N/A"}
          </p>

          <p>
            <strong>transactions :</strong>{" "}
            {block?.transactions
              ? block.transactions.length
              : 0}
          </p>

          <p>
            <strong>difficulty :</strong>{" "}
            {block?.difficulty?.toString() || "0"}
          </p>

          <p>
            <strong>gasLimit :</strong>{" "}
            {block?.gasLimit?.toString() || "N/A"}
          </p>

          <p>
            <strong>gasUsed :</strong>{" "}
            {block?.gasUsed?.toString() || "N/A"}
          </p>

          <p>
            <strong>size :</strong>{" "}
            {block?.size?.toString() || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default BlockchainInfo; 