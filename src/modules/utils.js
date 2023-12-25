export function createDOMElement(tagName, parent, classList = '', content = '') {
    const element = document.createElement(tagName);
    if (classList != '') {
        element.classList = classList;
    }
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
}