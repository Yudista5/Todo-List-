window.addEventListener('load', () =>{
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';
    
    nameInput.value = username;

    nameInput.addEventListener('change', encodeURI => {
        localStorage.setItem('username', encodeURI.target.value);

    })

    newTodoForm.addEventListener('submit', encodeURI => {
        encodeURI.preventDefault();

        const todo = {
            content: encodeURI.target.elements.content.value,
            category: encodeURI.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        encodeURI.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('input');
        const actions = document.createElement('input');
        const edit = document.createElement('a');
        const deleteA = document.createElement('a');
        
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteA.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>` ;
        edit.innerHTML = 'edit';
        deleteA.innerHTML = 'delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteA);
        todoItem.appendChild(label);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', encodeURI => {
            todo.done = encodeURI.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', encodeURI =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', encodeURI =>{
                input.setAttribute('readonly', true);
                todo.content = encodeURI.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        de
    })
}

