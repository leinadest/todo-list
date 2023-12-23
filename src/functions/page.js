import * as Items from './items.js';
import * as Projects from './projects.js';

function loadHeader() {
    const body = document.querySelector('body');
    
    const header = document.createElement('header');
    body.appendChild(header);

    const nav = document.createElement('nav');
    header.appendChild(nav);

    Projects.addProjectTab('Home');

    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList = 'new-project';
    newProjectBtn.textContent = '+';
    newProjectBtn.addEventListener('click', () => {
        document.querySelector('.project-dialog').showModal();
    });
    header.appendChild(newProjectBtn);
}

function loadProjects() {
    const body = document.querySelector('body');

    const main = document.createElement('main');
    body.appendChild(main);

    Projects.getStoredProjects().forEach((project) => {
        Projects.addProjectTab(project);
    })

    Projects.loadCurrentProject();
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
        Projects.saveCurrentProject();
    });
    container.appendChild(deleteBtn);

    const moveBtn = document.createElement('button');
    moveBtn.textContent = 'Move';
    container.appendChild(moveBtn);
}

function createItemDialog() {
    const body = document.querySelector('body');

    const dialog = document.createElement('dialog');
    dialog.classList = 'item-dialog';
    body.appendChild(dialog);

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.item-dialog').close();
        Items.addItem(Items.getInputtedItem());
        Projects.saveCurrentProject();
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

function createProjectDialog() {
    const body = document.querySelector('body');

    const dialog = document.createElement('dialog');
    dialog.classList = 'project-dialog';
    body.appendChild(dialog);

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.project-dialog').close();
        const name = nameInput.value == '' ? 'Unnamed' : nameInput.value;
        Projects.addProjectTab(name);
    })
    dialog.appendChild(form);

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Project name: ';
    form.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    form.appendChild(nameInput);

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    form.appendChild(doneBtn);
}

export default function createPage() {
    loadHeader();
    loadProjects();
    createOptions();
    createItemDialog();
    createProjectDialog();
}