let TODO_INPUT // miejsce, gdzie użytkownik wpisuje treść
let ADD_BTN // przycisk ADD - dodaje nowe elementy do listy
let ALERT_INFO // info o braku zadań / konieczności dodania tekstu
let TODO_LIST_UL // nasza lista zadań, tagi <ul></ul>
let NEW_TASK // nowo dodany LI, nowe zadanie
let TODO_LI // lista wszystkich dodanych LI
let ID_NUMBER = 0 // ID dodawane do każdego nowego zadania
let POPUP //pobrany popup
let POPUP_INFO // alert w popupie, jak się doda pusty tekst
let EDITED_TODO // edytowany Todo
let POPUP_INPUT //tekst wpisywany w inputa w popup'ie
let POPUP_BTN_ACCEPT // przycisk "zatwierdź" w popup'ie
let POPUP_BTN_CANCEL //przycisk od zamykania popup'a

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	TODO_INPUT = document.querySelector('.todo-input')
	ADD_BTN = document.querySelector('.add-btn')
	ALERT_INFO = document.querySelector('.alert-info')
	TODO_LIST_UL = document.querySelector('.todo-list ul')
	TODO_LI = document.getElementsByTagName('li')
	POPUP = document.querySelector('.popup')
	POPUP_INFO = document.querySelector('.popup-info')
	POPUP_INPUT = document.querySelector('.popup-input')
	POPUP_BTN_ACCEPT = document.querySelector('.accept')
	POPUP_BTN_CANCEL = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	ADD_BTN.addEventListener('click', addNewTask)
	TODO_INPUT.addEventListener('keyup', enterCheck)
	TODO_LIST_UL.addEventListener('click', checkClick)
	POPUP_BTN_CANCEL.addEventListener('click', cancelPopup)
	POPUP_BTN_ACCEPT.addEventListener('click', changeTodo)
}

const addNewTask = () => {
	if (TODO_INPUT.value === '') {
		ALERT_INFO.innerText = 'Wpisz treść zadania!'
		ALERT_INFO.style.display = 'flex'
	} else {
		ID_NUMBER++

		NEW_TASK = document.createElement('li')
		NEW_TASK.innerText = TODO_INPUT.value
		NEW_TASK.setAttribute('id', `todo-${ID_NUMBER}`)
		createTools()
		TODO_LIST_UL.appendChild(NEW_TASK)
		TODO_INPUT.value = ''
		ALERT_INFO.innerText = ''
	}
}

const createTools = () => {
	NEW_TASK.innerHTML = `${TODO_INPUT.value}
    <div class="tools"><button class="complete">
		<i class="fa-solid fa-check"></i></button
		><button class="edit">Edit</button
		><button class="delete"><i class="fa-solid fa-xmark"></i></button>
	</div>`
}

const enterCheck = () => {
	if (event.code === 'Enter') {
		addNewTask()
	}
}

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('complete')) {
			e.target.closest('li').classList.toggle('completed')
			e.target.closest('button').classList.toggle('completed')
		} else if (e.target.closest('button').classList.contains('edit')) {
			editTask(e)
		} else if (e.target.closest('button').classList.contains('delete')) {
			deleteTask(e)
		}
	}
}

const cancelPopup = () => {
	POPUP.style.display = 'none'
	POPUP_INFO.innerText = ''
	POPUP_INPUT.value = ''
}

const deleteTask = e => {
	const deleteTodo = e.target.closest('li')
	TODO_LIST_UL.removeChild(deleteTodo)

	if (TODO_LI.length === 0) {
		ALERT_INFO.innerText = 'Brak zadań na liście!'
		ALERT_INFO.style.display = 'flex'
	}
}

const editTask = e => {
	const oldTodo = e.target.closest('li').id
	EDITED_TODO = document.getElementById(oldTodo)
	POPUP.style.display = 'flex'
	POPUP_INPUT.value = EDITED_TODO.firstChild.textContent
}

const changeTodo = () => {
	if (POPUP_INPUT.value === '') {
		POPUP_INFO.innerText = 'Musisz podać nową treść zadania!'
	} else {
		POPUP_INFO.innerText = ''
		EDITED_TODO.firstChild.textContent = POPUP_INPUT.value
		POPUP.style.display = 'none'
	}
}

document.addEventListener('DOMContentLoaded', main)
