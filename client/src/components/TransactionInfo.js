function TransactionInfo({
  transactionIndex,
  from,
  to,
  transactionHash,
  nonce,
  value,
  gasFee,
  gasLimit,
  gasUsed,
  balanceAfter,
  status,
  blockNumber,
  timestamp,
  functionCalled,
  contractName
}) {
  return (
    <div className="transaction-info">

      <div className="transaction-card">
        
        <div className="transaction-card-title">
          Transaction #1
        </div>

        <div className="transaction-card-content">

          <p>
            <strong>Numéro :</strong>{" "}
            {transactionIndex || "N/A"}
          </p>

          <p>
            <strong>Expéditeur :</strong>{" "}
            {from || "N/A"}
          </p>

          <p>
            <strong>Destinataire :</strong>{" "}
            {to || "N/A"}
          </p>

          <p>
            <strong>Hash :</strong>{" "}
            {transactionHash || "N/A"}
          </p>

          <p>
            <strong>Nonce :</strong>{" "}
            {nonce || "N/A"}
          </p>

          <p>
            <strong>Montant :</strong>{" "}
            {value || "N/A"}
          </p>

          <p>
            <strong>Frais de transaction (Gas) :</strong>{" "}
            {gasFee || "N/A"}
          </p>

          <p>
            <strong>Limite de Gas :</strong>{" "}
            {gasLimit || "N/A"}
          </p>

          <p>
            <strong>Gas utilisé :</strong>{" "}
            {gasUsed || "N/A"}
          </p>

          <p>
            <strong>Solde après transaction :</strong>{" "}
            {balanceAfter || "N/A"}
          </p>

          <p>
            <strong>Statut :</strong>{" "}
            {status || "N/A"}
          </p>

          <p>
            <strong>Bloc :</strong>{" "}
            {blockNumber || "N/A"}
          </p>

          <p>
            <strong>Horodatage :</strong>{" "}
            {timestamp || "N/A"}
          </p>

          <p>
            <strong>Fonction appelée :</strong>{" "}
            {functionCalled || "N/A"}
          </p>

          <p>
            <strong>Nom du contrat :</strong>{" "}
            {contractName || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default TransactionInfo; 