import * as Projects from './projects.js';

export function getInputtedItem() {
    let title = document.querySelector('#title').value;
    let dueDate = document.querySelector('#due-date').value;
    const description = document.querySelector('#description').value;
    let priority = document.querySelector('input[name="priority"]:checked');

    if (title == '') title = 'Untitled Item';
    if (dueDate == '') dueDate = 'xxxx-xx-xx';
    priority = priority == null ? 'Medium' : priority.value;

    return [dueDate, priority, title, description];
}

export function addItem([dueDate, priority, title, description]) {
    const main = document.querySelector('main');
    const newItemBtn = document.querySelector('.new-item');

    const item = document.createElement('section');
    main.insertBefore(item, newItemBtn);

    const itemDueDate = document.createElement('label');
    itemDueDate.textContent = 'Due: ' + dueDate;
    item.appendChild(itemDueDate);

    const itemPriority = document.createElement('label');
    itemPriority.textContent = priority;
    item.appendChild(itemPriority);

    const container = document.createElement('div');
    item.appendChild(container);

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = title;
    container.appendChild(itemTitle);

    const itemDescription = document.createElement('p');
    itemDescription.textContent = description;
    container.appendChild(itemDescription);

    const detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'Details';
    item.appendChild(detailsBtn);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', refreshOptionsContainer);
    item.appendChild(checkbox);
}

export function deleteItems() {
    const selectedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    selectedBoxes.forEach((box) => {
        const item = box.parentNode;
        item.parentNode.removeChild(item);
    });
}

export function refreshOptionsContainer() {
    const itemsAreChecked = document.querySelector('input[type="checkbox"]:checked') != null;
    const optionsContainer = document.querySelector('.container');
    if (itemsAreChecked && optionsContainer.style.visibility != 'visible') {
        optionsContainer.style.visibility = 'visible';
        optionsContainer.style.position = 'relative';
    }
    if (!itemsAreChecked && optionsContainer.style.visibility == 'visible') {
        optionsContainer.style.visibility = 'hidden';
        optionsContainer.style.position = 'absolute';
    }
}