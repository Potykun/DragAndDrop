import { DragEvent, FC, useState } from "react"
import "./App.css"
interface CardItemType {
	id: number
	order: number
	text: string
}

const App: FC = () => {
	const [cardList, setCardList] = useState<CardItemType[]>([
		{ id: 1, order: 1, text: "Card 1" },
		{ id: 2, order: 2, text: "Card 2" },
		{ id: 3, order: 3, text: "Card 3" },
		{ id: 4, order: 4, text: "Card 4" },
		{ id: 5, order: 5, text: "Card 5" },
	])

	const [currentCard, setCurrentCard] = useState<CardItemType | null>(null)

	function dragStartHandler(e: DragEvent<HTMLDivElement>, card: CardItemType) {
		console.log("drag", card)
		setCurrentCard(card)
	}
	function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
		e.preventDefault()
		e.currentTarget.style.background = "grey"
	}
	function dragEndHandler(e: DragEvent<HTMLDivElement>) {
		e.currentTarget.style.background = "none"
	}
	function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
		e.currentTarget.style.background = "none"
	}
	function dropHandler(e: DragEvent<HTMLDivElement>, card: CardItemType) {
		e.preventDefault()
		console.log("drop", card)
		const updatedCardList = cardList.map((c) => {
			if (c.id === card.id) {
				return { ...c, order: currentCard.order }
			}
			if (c.id === currentCard.id) {
				return { ...c, order: card.order }
			}
			return c
		})
		e.currentTarget.style.background = "none"
		const sortCards = [...updatedCardList].sort((a, b) => a.order - b.order)
		setCardList(sortCards)
	}

	return (
		<>
			{cardList.map((card) => (
				<div
					key={card.id}
					onDragStart={(e: DragEvent<HTMLDivElement>) => {
						dragStartHandler(e, card)
					}}
					onDragLeave={(e) => {
						dragLeaveHandler(e)
					}}
					onDragEnd={(e) => {
						dragEndHandler(e)
					}}
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => {
						dropHandler(e, card)
					}}
					draggable
					className={"card"}
				>
					{card.text}
				</div>
			))}
		</>
	)
}

export default App
