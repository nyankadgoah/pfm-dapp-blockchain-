import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      
      <div className="header">
        <h1>PROJET FIN DE MODULE</h1>

        <h2>Développement d'une dAPP</h2>

        <h3>Pour le TP 3 Solidity, Truffle et ReactJS</h3> 
      </div>

      <h2 className="sommaire">Sommaire</h2>

      <ul className="exercise-list">
        <li>
          <Link to="/exercice-1">
            Exercice 1: Sommes de deux variables
          </Link>
        </li>

        <li>
          <Link to="/exercice-2">
            Exercice 2: Conversion des Cryptomonnaies
          </Link>
        </li>

        <li>
          <Link to="/exercice-3">
            Exercice 3: Traitements des Chaines de Caracteres
          </Link>
        </li>

        <li>
          <Link to="/exercice-4">
            Exercice 4: Tester le signe d'un nombre
          </Link>
        </li>

        <li>
          <Link to="/exercice-5">
            Exercice 5: Tester la Parite d'un nombre
          </Link>
        </li>

        <li>
          <Link to="/exercice-6">
            Exercice 6: Gestion des Tableaux
          </Link>
        </li>

        <li>
          <Link to="/exercice-7">
            Exercice 7: Programmation Orientee Objet (Formes geometriques)
          </Link>
        </li>

        <li>
          <Link to="/exercice-8">
            Exercice 8: Utilisations des Variables Globales(msg.sender et msg.value)
          </Link>
        </li>
      </ul>

    </div>
  );
}

export default Home;