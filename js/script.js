console.log("Привет из JavaScript! Сайт фотографа Таты загружен.");

// 4. Переменные и типы данных для сайта фотографа
let photographerName = "Устьянцева Тата";
const currentYear = 2025;
let isPhotographerActive = true;
let photographyGenres = ["портретная", "пейзажная", "арт-фотография", "уличная"];
let photographerProfile = {
    name: photographerName,
    profession: "Фотограф",
    education: "Екатеринбургская академия современного искусства",
    specialization: "Цифровое искусство"
};

console.log("=== Информация о фотографе ===");
console.log("Имя фотографа:", photographerName);
console.log("Текущий год:", currentYear);
console.log("Активен ли фотограф:", isPhotographerActive);
console.log("Жанры фотографии:", photographyGenres);
console.log("Профиль фотографа:", photographerProfile);

// 5. Операторы
let photosTaken = 1000;
let photosEdited = 750;
let editingRatio = photosEdited / photosTaken * 100;

console.log("\n=== Статистика ===");
console.log("Всего снято фотографий:", photosTaken);
console.log("Отредактировано фотографий:", photosEdited);
console.log("Процент отредактированных:", editingRatio.toFixed(1) + "%");

let greeting = "Привет! Я " + photographerName + ", фотограф.";
console.log(greeting);

console.log("Снято больше 500 фото?", photosTaken > 500); // true
console.log("Отредактировано все фото?", photosEdited === photosTaken); // false

// 6. Условные конструкции для фотографа
let weatherCondition = "солнечно";
let canShootOutdoor = true;

if (weatherCondition === "солнечно" && canShootOutdoor) {
    console.log("Отличные условия для съемки на улице!");
} else if (weatherCondition === "пасмурно") {
    console.log("Мягкий свет, хорошо для портретной съемки.");
} else {
    console.log("Лучше провести студийную съемку.");
}

// Тернарный оператор для определения опыта
let yearsExperience = 4;
let experienceLevel = (yearsExperience >= 5) ? "Профессионал" : "Продвинутый фотограф";
console.log("Уровень опыта:", experienceLevel);

// 7. Конструкция switch для жанров фотографии
let favoriteGenre = "портретная";

switch (favoriteGenre) {
    case "портретная":
        console.log("Портретная съемка позволяет раскрыть характер человека.");
        break;
    case "пейзажная":
        console.log("Пейзажная фотография - искусство запечатлеть природу.");
        break;
    case "арт-фотография":
        console.log("Арт-фотография - это выражение творческих идей.");
        break;
    default:
        console.log("Интересный жанр для изучения!");
}

// 8. Циклы
console.log("\n=== Мои жанры фотографии ===");
for (let i = 0; i < photographyGenres.length; i++) {
    console.log((i + 1) + ". " + photographyGenres[i]);
}

console.log("\n=== Итерация через массив ===");
for (let genre of photographyGenres) {
    console.log("Я снимаю в жанре: " + genre);
}

console.log("\n=== Информация о профиле ===");
for (let key in photographerProfile) {
    console.log(key + ": " + photographerProfile[key]);
}

// Цикл while для проекта
let projectPhotos = 0;
console.log("\n=== Обработка проекта ===");
while (projectPhotos < 5) {
    console.log("Обработана фотография №" + (projectPhotos + 1));
    projectPhotos++;
}

// 9. Получение элементов
console.log("\n=== Работа с DOM ===");

const mainTitle = document.getElementById("main-title");
const introText = document.getElementById("intro-text");
const profileImage = document.getElementById("profile-image");
const skillsTitle = document.getElementById("skills-title");
const skillsList = document.getElementById("skills-list");

console.log("Заголовок страницы:", mainTitle);
console.log("Вводный текст:", introText);
console.log("Список навыков:", skillsList);

// Получение всех элементов по тегу
const allImages = document.getElementsByTagName("img");
console.log("Все изображения на странице:", allImages.length);

// Получение элементов по классу
const sections = document.getElementsByTagName("section");
console.log("Количество секций:", sections.length);

// 10. Изменение содержимого и атрибутов
if (mainTitle) {
    mainTitle.textContent = "Устьянцева Тата | Фотограф";
    console.log("Заголовок обновлен");
}

if (introText) {
    introText.innerHTML = "Привет! Я <strong>Тата</strong>, профессиональный фотограф. Изучаю цифровое искусство в Екатеринбургской академии современного искусства.";
    console.log("Текст обновлен");
}

if (profileImage) {
    profileImage.alt = "Устьянцева Тата - фотограф";
    console.log("Атрибут alt обновлен");
}

// 11. Изменение стилей
if (mainTitle) {
    mainTitle.style.color = "#667eea"; // Цвет из градиента шапки
    mainTitle.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
    console.log("Стили заголовка изменены");
}

if (skillsTitle) {
    skillsTitle.classList.add("highlight");
    console.log("Класс highlight добавлен к заголовку навыков");
}

// Добавьте в styles.css этот стиль:
// .highlight { background-color: #f8f9fa; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }

// 12. Создание и добавление новых элементов
const newSection = document.createElement("section");
newSection.innerHTML = `
    <h2>Мое оборудование</h2>
    <ul>
        <li>Камера: Canon EOS R5</li>
        <li>Объективы: 50mm f/1.8, 24-70mm f/2.8</li>
        <li>Оборудование для света: Godox AD200Pro</li>
    </ul>
`;
newSection.style.backgroundColor = "#f8f9fa";
newSection.style.padding = "20px";
newSection.style.borderRadius = "10px";
newSection.style.marginTop = "20px";

// Добавляем новую секцию после существующих
const mainElement = document.querySelector("main");
if (mainElement) {
    mainElement.appendChild(newSection);
    console.log("Новая секция добавлена");
}

// 14. Обработка кликов на кнопки
const changeStyleBtn = document.getElementById("change-style-btn");
const addSkillBtn = document.getElementById("add-skill-btn");

if (changeStyleBtn) {
    changeStyleBtn.addEventListener("click", function() {
        if (mainTitle) {
            // Переключаем цвет заголовка
            const currentColor = mainTitle.style.color;
            mainTitle.style.color = currentColor === "rgb(102, 126, 234)" ? "#e74c3c" : "#667eea";
            mainTitle.style.transition = "color 0.3s ease";
            
            // Анимация кнопки
            changeStyleBtn.style.backgroundColor = "#667eea";
            changeStyleBtn.style.color = "white";
            setTimeout(() => {
                changeStyleBtn.style.backgroundColor = "";
                changeStyleBtn.style.color = "";
            }, 300);
            
            console.log("Цвет заголовка изменен");
        }
    });
}

if (addSkillBtn && skillsList) {
    addSkillBtn.addEventListener("click", function() {
        const newSkill = document.createElement("li");
        const skills = [
            "Обработка в Adobe Photoshop и Lightroom",
            "Съемка в студийных условиях",
            "Работа с моделями и клиентами",
            "Создание концептуальных проектов",
            "Организация фотосессий"
        ];
        
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        newSkill.textContent = randomSkill;
        newSkill.style.animation = "fadeIn 0.5s";
        skillsList.appendChild(newSkill);
        
        console.log("Новый навык добавлен:", randomSkill);
    });
}

// 15. Обработка событий для изображений (если есть)
if (profileImage) {
    profileImage.addEventListener("mouseenter", function() {
        this.style.transform = "scale(1.05)";
        this.style.transition = "transform 0.3s ease";
        console.log("Изображение увеличено");
    });
    
    profileImage.addEventListener("mouseleave", function() {
        this.style.transform = "scale(1)";
        console.log("Изображение возвращено к исходному размеру");
    });
}

// 16. Форма обратной связи (для contact.html)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectSelect = document.getElementById("subject");
        const messageTextarea = document.getElementById("message");
        
        // Проверка заполнения полей
        if (nameInput && emailInput && messageTextarea) {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectSelect ? subjectSelect.value : "Не указана";
            const message = messageTextarea.value.trim();
            
            if (name === "" || email === "" || message === "") {
                alert("Пожалуйста, заполните все обязательные поля!");
                return;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Пожалуйста, введите корректный email адрес!");
                return;
            }
            
            // Симуляция отправки
            console.log("=== Данные формы ===");
            console.log("Имя:", name);
            console.log("Email:", email);
            console.log("Тема:", subject);
            console.log("Сообщение:", message);
            
            alert("Спасибо, " + name + "! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.");
            
            // Очистка формы
            contactForm.reset();
            
            // Визуальный фидбек
            const submitBtn = contactForm.querySelector(".submit-btn");
            if (submitBtn) {
                submitBtn.textContent = "Отправлено!";
                submitBtn.style.backgroundColor = "#2ecc71";
                setTimeout(() => {
                    submitBtn.textContent = "Отправить сообщение";
                    submitBtn.style.backgroundColor = "";
                }, 2000);
            }
        }
    });
}

// Добавьте стиль для кнопок в styles.css:
// .style-button {
//     background-color: #f8f9fa;
//     border: 2px solid #667eea;
//     color: #667eea;
//     padding: 10px 20px;
//     margin: 10px 5px;
//     border-radius: 5px;
//     cursor: pointer;
//     font-weight: bold;
//     transition: all 0.3s ease;
// }
// 
// .style-button:hover {
//     background-color: #667eea;
//     color: white;
// }

// Анимация для fadeIn в styles.css:
// @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
// }