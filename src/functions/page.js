import * as Items from './items.js';

function loadHeader() {
    const body = document.querySelector('body');
    
    const header = document.createElement('header');
    body.appendChild(header);

    const nav = document.createElement('nav');
    header.appendChild(nav);

    const project = document.createElement('div');
    project.classList = 'project';
    nav.appendChild(project);

    const projectBtn = document.createElement('button');
    projectBtn.textContent = 'Home';
    project.appendChild(projectBtn);

    const projectDeleteBtn = document.createElement('button');
    projectDeleteBtn.classList = 'delete';
    projectDeleteBtn.textContent = 'X';
    project.appendChild(projectDeleteBtn);

    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList = 'new-project';
    newProjectBtn.textContent = '+';
    header.appendChild(newProjectBtn);
}

function loadItems() {
    const body = document.querySelector('body');

    const main = document.createElement('main');
    body.appendChild(main);

    const newItemBtn = document.createElement('button');
    newItemBtn.classList = 'new-item';
    newItemBtn.textContent = 'Create new item +';
    newItemBtn.addEventListener('click', () => {
        document.querySelector('dialog').showModal();
    });
    main.appendChild(newItemBtn);
}

function createOptions() {
    const body = document.querySelector('body');

    const container = document.createElement('div');
    container.classList = 'container';
    body.appendChild(container);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        Items.deleteItems();
        Items.refreshOptionsContainer();
    });
    container.appendChild(deleteBtn);

    const moveBtn = document.createElement('button');
    moveBtn.textContent = 'Move';
    container.appendChild(moveBtn);
}

function createDialog() {
    const body = document.querySelector('body');

    const dialog = document.createElement('dialog');
    body.appendChild(dialog);

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        Items.addItem(Items.getInputtedItem());
        document.querySelector('dialog').close();
    })
    dialog.appendChild(form);

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title: ';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    form.appendChild(titleInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'due-date');
    dueDateLabel.textContent = 'Due-date: ';
    form.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'due-date';
    form.appendChild(dueDateInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description: ';
    form.appendChild(descriptionLabel);

    const descriptionTextArea = document.createElement('textarea');
    descriptionTextArea.id = 'description';
    descriptionTextArea.cols = 50;
    descriptionTextArea.rows = 5;
    form.appendChild(descriptionTextArea);

    const priorityFieldSet = document.createElement('fieldset');
    form.appendChild(priorityFieldSet);

    const legend = document.createElement('legend');
    legend.textContent = 'Item priority: ';
    priorityFieldSet.appendChild(legend);

    for (const priority of ['High', 'Medium', 'Low']) {
        const container = document.createElement('div');
        priorityFieldSet.appendChild(container);

        const priorityInput = document.createElement('input');
        priorityInput.type = 'radio';
        priorityInput.id = priority;
        priorityInput.name = 'priority';
        priorityInput.value = priority;
        container.appendChild(priorityInput);

        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', priority);
        inputLabel.textContent = priority;
        container.appendChild(inputLabel);
    }

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    form.appendChild(doneBtn);
}

export default function createPage() {
    loadHeader();
    loadItems();
    createOptions();
    createDialog();
}