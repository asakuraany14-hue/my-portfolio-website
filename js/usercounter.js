// Класс для управления счетчиком пользователей
class UserCounter {
    constructor() {
        this.storageKey = 'tatianaGalleryCounter';
        this.sessionStartTime = Date.now();
        this.data = this.loadData();
        
        this.init();
    }
    
    // Загрузка данных из Local Storage
    loadData() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            return JSON.parse(savedData);
        } else {
            return {
                totalVisits: 0,
                totalSessions: 0,
                totalTimeSpent: 0, // в миллисекундах
                lastVisit: null,
                userName: '',
                galleryViews: 0
            };
        }
    }
    
    // Сохранение данных
    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
    
    // Инициализация
    init() {
        this.updateVisitCount();
        this.updateSessionCount();
        this.startSessionTimer();
        this.updatePageCounter();
        this.setupEventListeners();
        
        // Показываем приветствие
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 1000);
    }
    
    // Обновление счетчика посещений
    updateVisitCount() {
        this.data.totalVisits++;
        this.saveData();
    }
    
    // Обновление счетчика сессий
    updateSessionCount() {
        const now = Date.now();
        const lastVisit = this.data.lastVisit;
        
        // Новая сессия, если прошло больше 30 минут
        if (!lastVisit || (now - lastVisit) > 30 * 60 * 1000) {
            this.data.totalSessions++;
        }
        
        this.data.lastVisit = now;
        this.saveData();
    }
    
    // Обновление счетчика просмотров галереи
    updatePageCounter() {
        if (window.location.pathname.includes('gallery.html')) {
            this.data.galleryViews++;
            this.saveData();
        }
    }
    
    // Запуск таймера сессии
    startSessionTimer() {
        setInterval(() => {
            const sessionTime = Date.now() - this.sessionStartTime;
            const totalTime = this.data.totalTimeSpent + sessionTime;
            
            // Сохраняем каждую минуту
            if (sessionTime % 60000 < 1000) {
                this.data.totalTimeSpent = totalTime;
                this.sessionStartTime = Date.now();
                this.saveData();
                this.updateStatsDisplay();
            }
        }, 1000);
    }
    
    // Показ приветственного сообщения
    showWelcomeMessage() {
        const userName = this.data.userName || 'Гость';
        const isFirstVisit = this.data.totalVisits === 1;
        
        let message;
        if (isFirstVisit) {
            message = `Добро пожаловать на сайт, ${userName}! Это ваш первый визит.`;
        } else {
            const lastVisitDate = new Date(this.data.lastVisit);
            const timeSinceLastVisit = this.getTimeSinceLastVisit();
            message = `С возвращением, ${userName}! Вы были здесь ${timeSinceLastVisit} назад.`;
        }
        
        this.showNotification(message);
    }
    
    // Получение времени с последнего визита
    getTimeSinceLastVisit() {
        if (!this.data.lastVisit) return 'никогда';
        
        const now = Date.now();
        const diff = now - this.data.lastVisit;
        
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days > 0) return `${days} дней`;
        if (hours > 0) return `${hours} часов`;
        if (minutes > 0) return `${minutes} минут`;
        return 'только что';
    }
    
    // Обновление отображения статистики
    updateStatsDisplay() {
        // Если есть элемент для статистики
        const statsElement = document.getElementById('user-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-item">Посещений: ${this.data.totalVisits}</div>
                <div class="stat-item">Время на сайте: ${Math.floor(this.data.totalTimeSpent / 60000)} мин</div>
                <div class="stat-item">Просмотров галереи: ${this.data.galleryViews}</div>
            `;
        }
    }
    
    // Показ уведомлений
    showNotification(message, type = 'info') {
        const colors = {
            info: '#667eea',
            success: '#27ae60',
            error: '#e74c3c'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1002;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: 'Arial', sans-serif;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Сброс статистики
    resetStats() {
        if (confirm('Вы уверены, что хотите сбросить статистику?')) {
            localStorage.removeItem(this.storageKey);
            this.data = this.loadData();
            this.showNotification('Статистика сброшена!', 'success');
            this.updateStatsDisplay();
        }
    }
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Сохранение времени при закрытии страницы
        window.addEventListener('beforeunload', () => {
            const sessionTime = Date.now() - this.sessionStartTime;
            this.data.totalTimeSpent += sessionTime;
            this.saveData();
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.userCounter = new UserCounter();
    
    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .stat-item {
            padding: 5px 0;
            border-bottom: 1px solid #eee;
        }
        .stat-item:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
});
