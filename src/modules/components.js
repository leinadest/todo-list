import * as Data from './data.js';
import { createDOMElement } from './utils.js';

// HEADER

function loadHeader() {
    const body = document.querySelector('body');

    const header = createDOMElement('header', body);

    const projectNav = createDOMElement('nav', header);

    Data.getSavedProjects().forEach((projectName) => loadProjectTab(projectName));

    const newProjectBtn = createDOMElement('button', header, 'new-project', '+');
    newProjectBtn.addEventListener('click', () => {
        document.querySelector('.project-dialog').showModal();
    });
}

function loadProjectTab(projectName) {
    const projectNav = document.querySelector('nav');

    const project = createDOMElement('div', projectNav, 'project');

    const projectBtn = createDOMElement('button', project, '', projectName);
    projectBtn.addEventListener('click', () => {
        Data.setCurrentProjectName(projectName);
        loadCurrentProject();
    });

    const projectDeleteBtn = createDOMElement('button', project, 'delete', 'X');
    projectDeleteBtn.addEventListener('click', () => {
        projectNav.removeChild(project);
        Data.removeSavedProject(projectName);
        Data.setCurrentProjectName('Home');
        loadCurrentProject();
    });
}

// MAIN

function loadMain() {
    const main = createDOMElement('main', document.querySelector('body'));

    const newItemBtn = createDOMElement('button', main, 'new-item');
    newItemBtn.textContent = 'Create new item +';
    newItemBtn.addEventListener('click', () => {
        const itemDialog = document.querySelector('.item-dialog');
        itemDialog.dataset.event = 'new item';
        itemDialog.showModal();
    });

    loadCurrentProject();
}

function loadCurrentProject() {
    const main = document.querySelector('main');
    while (main.childNodes[0].nodeName != 'BUTTON') {
        main.removeChild(main.childNodes[0]);
    }

    const projectData = Data.getSavedCurrentProject();
    
    if (projectData == null) return;

    for (const itemData of projectData) {
        loadItem(itemData);
    }
}

function loadItem([dueDate, priority, title, description]) {
    const main = document.querySelector('main');
    const newItemBtn = document.querySelector('.new-item');

    const item = document.createElement('section');
    main.insertBefore(item, newItemBtn);

    const itemDueDate = createDOMElement('label', item, '', 'Due: ' + dueDate);

    const itemPriority = createDOMElement('label', item, '', priority);

    const container = createDOMElement('div', item);

    const itemTitle = createDOMElement('h3', container, '', title);

    const itemDescription = createDOMElement('p', container, '', description)

    const detailsBtn = createDOMElement('button', item, '', 'Details');
    detailsBtn.addEventListener('click', () => {
        item.dataset.needsEdit = true;
        const itemDialog = document.querySelector('.item-dialog');
        itemDialog.dataset.event = 'edit item';
        itemDialog.showModal();
    });
    
    const checkbox = createDOMElement('input', item)
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', refreshOptionsVisibility);
}

// OPTIONS

function loadOptions() {
    const body = document.querySelector('body');

    const container = createDOMElement('div', body, 'container');

    const deleteBtn = createDOMElement('button', container, '', 'Delete');
    deleteBtn.addEventListener('click', () => {
        Data.getSelectedItems().forEach((item) => {
            Data.removeSavedItem(item);
            item.parentNode.removeChild(item);
        });
        refreshOptionsVisibility();
        Data.saveCurrentProject();
    });

    const moveBtn = createDOMElement('button', container, '', 'Move');
}

export function refreshOptionsVisibility() {
    const itemsAreChecked = document.querySelector('input[type="checkbox"]:checked') != null;
    const options = document.querySelector('.container');
    if (itemsAreChecked && options.style.visibility != 'visible') {
        options.style.visibility = 'visible';
        options.style.position = 'relative';
    }
    if (!itemsAreChecked && options.style.visibility == 'visible') {
        options.style.visibility = 'hidden';
        options.style.position = 'absolute';
    }
}

// DIALOGS

function loadItemDialog() {
    const body = document.querySelector('body');

    const dialog = createDOMElement('dialog', body, 'item-dialog');

    const form = createDOMElement('form', dialog);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (dialog.dataset.event == 'new item') {
            loadItem(Data.getItemInput());
        }
        if (dialog.dataset.event == 'edit item') {
            const itemToEdit = document.querySelector('[data-needs-edit="true"]');
            const [dueDate, priority, title, description] = Data.getItemInput();
            itemToEdit.querySelector('label').textContent = 'Due: ' + dueDate;
            itemToEdit.querySelector('label:nth-child(2)').textContent = priority;
            itemToEdit.querySelector('h3').textContent = title;
            itemToEdit.querySelector('p').textContent = description;
            delete itemToEdit.dataset.needsEdit;
        }
        Data.saveCurrentProject();
        document.querySelector('.item-dialog').close();
    });

    const titleLabel = createDOMElement('label', form, '', 'Title: ');
    titleLabel.setAttribute('for', 'title');

    const titleInput = createDOMElement('input', form);
    titleInput.type = 'text';
    titleInput.id = 'title';

    const dueDateLabel = createDOMElement('label', form, '', 'Due-date: ');
    dueDateLabel.setAttribute('for', 'due-date');

    const dueDateInput = createDOMElement('input', form);
    dueDateInput.type = 'date';
    dueDateInput.id = 'due-date';

    const descriptionLabel = createDOMElement('label', form)
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description: ';

    const descriptionTextArea = createDOMElement('textarea', form);
    descriptionTextArea.id = 'description';
    descriptionTextArea.cols = 50;
    descriptionTextArea.rows = 5;

    const priorityFieldSet = createDOMElement('fieldset', form);

    const legend = createDOMElement('legend', priorityFieldSet);
    legend.textContent = 'Item priority: ';

    for (const priority of ['High', 'Medium', 'Low']) {
        const container = createDOMElement('div', priorityFieldSet);

        const priorityInput = createDOMElement('input', container);
        priorityInput.type = 'radio';
        priorityInput.id = priority;
        priorityInput.name = 'priority';
        priorityInput.value = priority;

        const inputLabel = createDOMElement('label', container, '', priority);
        inputLabel.setAttribute('for', priority);
    }

    const doneBtn = createDOMElement('button', form, '', 'Done');
    doneBtn.textContent = 'Done';
}

function loadProjectDialog() {
    const body = document.querySelector('body');

    const dialog = createDOMElement('dialog', body, 'project-dialog');

    const form = createDOMElement('form', dialog);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.project-dialog').close();
        const projectName = nameInput.value == '' ? 'Unnamed' : nameInput.value;
        loadProjectTab(projectName);
        Data.saveEmptyProject(projectName);
    });

    const nameLabel = createDOMElement('label', form, '', 'Project name: ');
    nameLabel.setAttribute('for', 'name');

    const nameInput = createDOMElement('input', form);
    nameInput.type = 'text';
    nameInput.id = 'name';

    const doneBtn = createDOMElement('button', form, '', 'Done');
    doneBtn.textContent = 'Done';
}

// PAGE

export default function loadPage() {
    loadHeader();
    loadMain();
    loadOptions();
    loadItemDialog();
    loadProjectDialog();
}