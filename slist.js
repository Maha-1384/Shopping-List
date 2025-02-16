const itemForm = document.querySelector('#item-form');
const FormInput = document.querySelector('#item-input');
const Filter = document.querySelector('.form-input-filter');
const itemList = document.querySelector('.items');
const clearAll = document.querySelector('.btn-clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions in Events

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((items) => AddtoDOM(items));
  ui();
}

function additems(e) {
  e.preventDefault();
  if (FormInput.value == '') {
    alert('Enter item');
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(FormInput.value)) {
      alert('that item already exists!');
      return;
    }
  }

  AddtoDOM(FormInput.value);

  addItemToStorage(FormInput.value);

  // const li = document.createElement('li');
  // li.appendChild(document.createTextNode(FormInput.value));
  // button = document.createElement('button');
  // button.className = 'remove-item btn-link text-red';
  // icon = document.createElement('i');
  // icon.className = 'fa-solid fa-xmark';
  // button.appendChild(icon);
  // li.appendChild(button);
  // itemList.appendChild(li);

  ui();
  FormInput.value = '';
}

function AddtoDOM(x) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(x));
  button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function filtering(e) {
  const list = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  list.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i>Update Item';
  formBtn.style.backgroundColor = 'green';
  FormInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure ?')) {
    item.remove();
    removeItemFromStorage(item.textContent);

    ui();
  }
}
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem('items');

  ui();
}
function ui() {
  FormInput.value = '';
  const list = document.querySelectorAll('li');
  if (list.length == 0) {
    Filter.style.display = 'none';
    clearAll.style.display = 'none';
  } else {
    Filter.style.display = 'block';
    clearAll.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

// EVENTS
itemForm.addEventListener('submit', additems);
Filter.addEventListener('input', filtering);
itemList.addEventListener('click', onClickItem);
clearAll.addEventListener('click', removeAll);
document.addEventListener('DOMContentLoaded', displayItems);

ui();
