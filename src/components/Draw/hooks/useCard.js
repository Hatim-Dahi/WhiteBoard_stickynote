import { useState } from "react";
export const useCard =()=>{
    const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [newCardText, setNewCardText] = useState('');

  return {cards,setCards,currentCard,setCurrentCard,newCardText,setNewCardText}
}