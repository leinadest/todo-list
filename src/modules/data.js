let currentProjectName = 'Home';

// STORAGE DATA

export function updateHome() {
    // Add all projects besides Home to homeData
    let homeData = '';
    Object.keys(localStorage).forEach((project) => {
        if (project != 'Home')
            homeData += localStorage[project];
    });
    // Remove all items in Home that are shared with other projects
    homeData.split('\n').slice(0,-1).forEach((itemData) => {
        itemData += '\n';
        localStorage['Home'] = localStorage['Home'].replace(itemData, '');
    });
    // Add the remainder items in Home (items unique to Home) to homeData
    homeData += localStorage['Home'];
    // homeData now contains all project items + items unique to Home
    localStorage.setItem('Home', homeData);
}

function itemToString(itemNode) {
    const dueDate = itemNode.querySelector('label').textContent.slice(5)
    const priority = itemNode.querySelector('label:nth-child(2)').textContent;
    const title = itemNode.querySelector('h3').textContent;
    const description = itemNode.querySelector('p').textContent;
    return `${dueDate}\t${priority}\t${title}\t${description}\n`;
}

function stringToItem(str) {
    const items = str.split('\n').map((line) => line.split('\t'));
    items.pop();
    return items;
}

export function saveCurrentProject() {
    let stringifiedProject = '';
    const items = document.querySelectorAll('section');
    items.forEach((item) => stringifiedProject += itemToString(item));
    localStorage.setItem(currentProjectName, stringifiedProject);
    updateHome();
}

export function getSavedCurrentProject() {
    const projectData = localStorage.getItem(currentProjectName);
    if (projectData == null) return null;

    return stringToItem(projectData);
}

export function getSavedProjects() {
    return Object.keys(localStorage);
}

export function removeSavedProject(projectName) {
    localStorage[projectName].split('\n').slice(0,-1).forEach((itemData) => {
        itemData += '\n';
        localStorage['Home'] = localStorage['Home'].replace(itemData, '');
    });
    localStorage.removeItem(projectName);
    updateHome();
}

export function removeSavedItem(itemNode) {
    const itemData = itemToString(itemNode);

    // Remove item from Home
    localStorage['Home'] = localStorage['Home'].replace(itemData, '');

    // Search and remove item from its project outside Home
    getSavedProjects().forEach((projectName) => {
        if (
            projectName != 'Home' 
            && localStorage[projectName].includes(itemData)
        ) {
            const newData = localStorage[projectName].replace(itemData, '');
            localStorage.setItem(projectName, newData);
            return;
        }
    });
    updateHome();
}

export function saveEmptyProject(projectName) {
    localStorage[projectName] = '';
}

export function saveItem(itemNode, projectName) {
    const itemData = itemToString(itemNode);
    localStorage[projectName] += itemData;
    updateHome();
}

// UI DATA

export function getSelectedItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const items = [];
    checkboxes.forEach((box) => items.push(box.parentNode));
    return items;
}

export function getItemInput() {
    let title = document.querySelector('#title').value;
    let dueDate = document.querySelector('#due-date').value;
    const description = document.querySelector('#description').value;
    let priority = document.querySelector('input[name="priority"]:checked');

    if (title == '') title = 'Untitled Item';
    if (dueDate == '') dueDate = 'xxxx-xx-xx';
    priority = priority == null ? 'Medium' : priority.value;

    return [dueDate, priority, title, description];
}

export function getCurrentProjectName() {
    return currentProjectName;
}

export function setCurrentProjectName(projectName) {
    currentProjectName = projectName;
}