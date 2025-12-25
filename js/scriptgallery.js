// Массив для хранения изображений
let images = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        title: "Горный пейзаж",
        category: "nature"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
        title: "Городская архитектура",
        category: "city"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        title: "Портрет",
        category: "people"
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
        title: "Лесной водопад",
        category: "nature"
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
        title: "Ночной город",
        category: "city"
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
        title: "Семейное фото",
        category: "people"
    }
];

// Переменные для модального окна
let currentImageIndex = 0;
let filteredImages = [...images];

// Получение элементов DOM
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const closeBtn = document.getElementById('close-modal');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const addImageForm = document.getElementById('add-image-form');
const filterButtons = document.querySelectorAll('.filter-btn');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderGallery();
    setupEventListeners();
});

// Функция для отображения галереи
function renderGallery(imagesToShow = images) {
    galleryGrid.innerHTML = '';
    
    imagesToShow.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = image.category;
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${image.title}</div>
                <div class="gallery-item-category">${getCategoryName(image.category)}</div>
            </div>
        `;
        
        // Добавляем обработчик клика для открытия модального окна
        galleryItem.addEventListener('click', () => {
            openModal(index, imagesToShow);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Функция для получения названия категории на русском языке
function getCategoryName(category) {
    const categoryNames = {
        'nature': 'Природа',
        'city': 'Город',
        'people': 'Люди'
    };
    return categoryNames[category] || category;
}

// Функция для открытия модального окна
function openModal(index, imagesToShow) {
    currentImageIndex = index;
    filteredImages = imagesToShow;
    
    const image = filteredImages[currentImageIndex];
    modalImage.src = image.url;
    modalImage.alt = image.title;
    modalTitle.textContent = image.title;
    modalCategory.textContent = getCategoryName(image.category);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Функция для показа предыдущего изображения
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateModalImage();
}

// Функция для показа следующего изображения
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateModalImage();
}

// Функция для обновления изображения в модальном окне
function updateModalImage() {
    const image = filteredImages[currentImageIndex];
    modalImage.src = image.url;
    modalImage.alt = image.title;
    modalTitle.textContent = image.title;
    modalCategory.textContent = getCategoryName(image.category);
}

// Функция для фильтрации изображений
function filterImages(category) {
    const imagesToShow = category === 'all' ? images : images.filter(img => img.category === category);
    renderGallery(imagesToShow);
    
    // Обновляем активную кнопку фильтра
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
}

// Функция для добавления нового изображения
function addNewImage(url, title, category) {
    const newImage = {
        id: Date.now(),
        url: url,
        title: title,
        category: category
    };
    
    images.push(newImage);
    
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    if (activeFilter === 'all' || activeFilter === category) {
        renderGallery(activeFilter === 'all' ? images : images.filter(img => img.category === activeFilter));
    }
    
    showNotification('Изображение успешно добавлено!');
}

// Функция для показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Функция для настройки всех обработчиков событий
function setupEventListeners() {
    // Обработчики для модального окна
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Закрытие модального окна при клике вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Обработчики клавиатуры для модального окна
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterImages(filter);
        });
    });
    
    // Обработчик для формы добавления изображения
    addImageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const url = document.getElementById('image-url').value.trim();
        const title = document.getElementById('image-title').value.trim();
        const category = document.getElementById('image-category').value;
        
        if (url && title && category) {
            addNewImage(url, title, category);
            
            // Очищаем форму
            this.reset();
        } else {
            alert('Пожалуйста, заполните все поля формы.');
        }
    });
}
