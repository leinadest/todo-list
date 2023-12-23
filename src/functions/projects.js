import * as Items from './items.js';

let currentProjectName = 'Home';

export function loadCurrentProject() {
    const main = document.querySelector('main');
    main.replaceChildren();

    const newItemBtn = document.createElement('button');
    newItemBtn.classList = 'new-item';
    newItemBtn.textContent = 'Create new item +';
    newItemBtn.addEventListener('click', () => {
        document.querySelector('.item-dialog').showModal();
    });
    main.appendChild(newItemBtn);

    if (localStorage.getItem(currentProjectName) == null) return;

    const items = localStorage.getItem(currentProjectName).split('\n');
    items.forEach((line) => {
        if (line == '') return;
        Items.addItem(line.split('\t'));
    })
}

function deleteProject(projectNode) {
    projectNode.parentNode.removeChild(projectNode);
}

export function addProjectTab(name) {
    const projectNav = document.querySelector('nav');

    const project = document.createElement('div');
    project.classList = 'project';
    projectNav.appendChild(project);

    const projectBtn = document.createElement('button');
    projectBtn.textContent = name;
    projectBtn.addEventListener('click', () => {
        currentProjectName = name;
        loadCurrentProject(projectBtn.parentNode);
    });
    project.appendChild(projectBtn);

    const projectDeleteBtn = document.createElement('button');
    projectDeleteBtn.classList = 'delete';
    projectDeleteBtn.textContent = 'X';
    projectDeleteBtn.addEventListener('click', () => {
        deleteProject(projectDeleteBtn.parentNode);
    });
    project.appendChild(projectDeleteBtn);
}

export function saveCurrentProject() {
    let projectString = '';
    const items = document.querySelectorAll('section');
    items.forEach((item) => {
        const dueDate = item.querySelector('label').textContent.slice(5)
        const priority = item.querySelector('label:nth-child(2)').textContent;
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        projectString += `${dueDate}\t${priority}\t${title}\t${description}\n`;
    });
    localStorage.setItem(currentProjectName, projectString);
}

export function getStoredProjects() {
    let storedProjectNames = Object.keys(localStorage);
    storedProjectNames.pop();
    return storedProjectNames;
}