import React, { useState, useEffect } from 'react';
import ahorcado0 from '../assets/ahorcado0.png'
import ahorcadoDerrota from '../assets/ahorcadoDerrota.png';
import ahorcado1 from '../assets/ahorcado1.png';
import ahorcado2 from '../assets/ahorcado2.png';
import ahorcado3 from '../assets/ahorcado3.png';
import ahorcado4 from '../assets/ahorcado4.png';

const Ahorcado = () => {
  const palabras = ['fuerza', 'energia', 'velocidad', 'masa', 'aceleracion'];
  const [palabraAAdivinar, setPalabraAAdivinar] = useState('');
  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState([]);
  const [intentosRestantes, setIntentosRestantes] = useState(6);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensajeVictoria, setMensajeVictoria] = useState(false);
  const [imagenAhorcado, setImagenAhorcado] = useState(ahorcado0); // Establece la imagen inicial

  const seleccionarPalabraAleatoria = () => {
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
  };

  useEffect(() => {
    setPalabraAAdivinar(seleccionarPalabraAleatoria());
  }, []);

  useEffect(() => {
    if (intentosRestantes === 0) {
      setJuegoTerminado(true);
      setImagenAhorcado(ahorcadoDerrota); // Cambia a la imagen de derrota del ahorcado cuando se pierde
    } else {
      // Determina qué imagen mostrar en función de los intentos restantes
      switch (intentosRestantes) {
        case 6:
          setImagenAhorcado(ahorcado0);
          break;
        case 5:
          setImagenAhorcado(ahorcado1);
          break;
        case 4:
          setImagenAhorcado(ahorcado2);
          break;
        case 3:
          setImagenAhorcado(ahorcado3);
          break;
        case 2:
          setImagenAhorcado(ahorcado4);
          break;
        default:
          break;
      }
    }
  }, [intentosRestantes]);

  const manejarSeleccionLetra = letra => {
    if (!juegoTerminado && !letrasSeleccionadas.includes(letra)) {
      setLetrasSeleccionadas([...letrasSeleccionadas, letra]);
      if (!palabraAAdivinar.split('').includes(letra)) {
        setIntentosRestantes(intentosRestantes - 1);
        if (intentosRestantes === 1) {
          setJuegoTerminado(true); // Juego perdido
        }
      }
    }
  };

  useEffect(() => {
    if (palabraAAdivinar) {
      // Verificar si todas las letras han sido adivinadas
      const todasLetrasAdivinadas = palabraAAdivinar.split('').every(letra => letrasSeleccionadas.includes(letra));
      
      // Si todas las letras han sido adivinadas, marcar el juego como terminado
      if (todasLetrasAdivinadas) {
        setJuegoTerminado(true);
        setMensajeVictoria(true);
      }
    }
  }, [letrasSeleccionadas, palabraAAdivinar]);

  const mostrarPalabraAAdivinar = () => {
    const palabraMinusculas = palabraAAdivinar.toLowerCase();
    return palabraMinusculas
      .split('')
      .map(letra =>
        letra === ' ' ? ' ' : letrasSeleccionadas.includes(letra) ? letra : '_'
      )
      .join(' ');
  };

  const mostrarPalabraCorrecta = () => {
    if (intentosRestantes === 0) {
      return (
        <p>¡Se acabaron los intentos! La palabra era: {palabraAAdivinar}</p>
      );
    } else if (mensajeVictoria) {
      return (
        <p>¡Felicidades, has adivinado la palabra: {palabraAAdivinar}!</p>
      );
    }
  };

  const reiniciarJuego = () => {
    setPalabraAAdivinar(seleccionarPalabraAleatoria());
    setLetrasSeleccionadas([]);
    setIntentosRestantes(6);
    setJuegoTerminado(false);
    setMensajeVictoria(false);
    setImagenAhorcado(ahorcado0); // Restaurar la imagen inicial
  };

  return (
    <div>
      <h1>Ahorcado de Física</h1>
      <img src={imagenAhorcado} alt="Hombre ahorcado" />
      <p>Palabra a adivinar: {mostrarPalabraAAdivinar()}</p>
      <p>Intentos restantes: {intentosRestantes}</p>
      <div>
        {Array.from(Array(26)).map((_, index) => (
          <button
            key={index}
            onClick={() => manejarSeleccionLetra(String.fromCharCode(65 + index).toLowerCase())}
            disabled={juegoTerminado || letrasSeleccionadas.includes(String.fromCharCode(65 + index).toLowerCase())}
          >
            {String.fromCharCode(65 + index)}
          </button>
        ))}
      </div>
      {mostrarPalabraCorrecta()}
      {juegoTerminado && <button onClick={reiniciarJuego}>Volver a jugar</button>}
    </div>
  );
};

export default Ahorcado;
