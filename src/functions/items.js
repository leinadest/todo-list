function createItem() {
    const title = document.querySelector('#title').value;
    const dueDate = document.querySelector('#due-date').value;
    const description = document.querySelector('#description').value;
    let priority = document.querySelector('input[name="priority"]:checked');
    priority = priority == null ? 'Medium' : priority.value;
    return {title, dueDate, description, priority};
}

function refreshOptionsContainer() {
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

function addItem({title, dueDate, description, priority}) {
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

const newItemBtn = document.querySelector('.new-item');
newItemBtn.addEventListener('click', () => {
    document.querySelector('dialog').showModal();
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addItem(createItem());
    document.querySelector('dialog').close();
})