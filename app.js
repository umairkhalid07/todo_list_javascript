const form = document.querySelector(".input");
const user_input = document.querySelector(".user_input");
const tasks_list = document.querySelector(".tasks_list");

// creating a new todo task template
const createNewTask = (todo, element) => {
	// no element passed means create all new template
	if (element == null) {
		tasks_list.innerHTML += `
            <li>
                <div class="list">
                    <input type="checkbox" class="tick">
                
                    <span class="text">${todo}</span>
                
                    <button class="edit">Edit</button>
                
                    <button class="delete">Delete</button>
                </div>
            </li>
        `;
	} else {
		//element passed means replace element with following template
		element.parentElement.innerHTML = `
            <li>
                <div class="list">
                    <input type="checkbox" class="tick">
                
                    <span class="text">${todo}</span>
                
                    <button class="edit">Edit</button>
                
                    <button class="delete">Delete</button>
                </div>
            </li>
        `;
	}
};

// creating update element
const createUpdateElement = (element) => {
	element.parentElement.innerHTML = `
            <div class="update_list">
                <input type="text" class="update_text">
        
                <button class="update">Update</button>
        
                <button class="delete">Delete</button>
            </div>
        `;
};

// event listener for input field to crate new task
form.addEventListener("submit", (e) => {
	e.preventDefault();

	// creating new template if length is not 0 and resetting form
	const todo = user_input.value.trim();
	if (todo.length) {
		createNewTask(todo);
		form.reset();
	}
});

// event listener for list
tasks_list.addEventListener("click", (e) => {
	// deleting specific task from list
	if (e.target.classList.contains("delete")) {
		e.target.parentElement.remove();
	}

	//ticking or unticking specific task from list
	if (e.target.classList.contains("tick")) {
		if (
			e.target.nextElementSibling.style.textDecoration === "line-through"
		) {
			e.target.nextElementSibling.style.textDecoration = "none";
		} else {
			e.target.nextElementSibling.style.textDecoration = "line-through";
		}
	}

	//initializing updating specific task from list
	if (e.target.classList.contains("edit")) {
		createUpdateElement(e.target.parentElement);
	}

	//finally updating specific task from list
	if (e.target.classList.contains("update")) {
		const new_todo = e.target.previousElementSibling.value.trim();
		createNewTask(new_todo, e.target.parentElement);
	}
});
