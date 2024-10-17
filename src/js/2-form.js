import '../css/styles.css';

// Оголошуємо об'єкт formData
const formData = {
    email: "",
    message: ""
};

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Отримуємо елемент форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log('Збережено у локальне сховище:', formData); 
}

// Перевірка локального сховища на наявність даних
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
    emailInput.value = formData.email;
    messageInput.value = formData.message;
}

// Делегування події input для збереження даних у локальне сховище
form.addEventListener('input', event => {
    // Оновлюємо значення в об'єкті formData
    formData[event.target.name] = event.target.value.trim(); // Видаляємо пробіли по краях

    // Зберігаємо актуальні дані в локальне сховище
    saveToLocalStorage();
});

// Обробка події відправки форми
form.addEventListener('submit', event => {
    event.preventDefault();

    // Перевірка чи поля не пусті
    if (emailInput.value.trim() === '' || messageInput.value.trim() === '') {
        alert('Fill please all fields');
        return;
    }

    // Виведення актуальних даних у консоль
    console.log('Form data submitted:', formData);

    // Очищуємо форму і локальне сховище після відправки
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData.email = "";
    formData.message = "";
});
