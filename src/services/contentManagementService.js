// src/services/contentManagementService.js

class ContentManagementService {
    constructor() {
        this.settings = this.loadFromLocalStorage('settings') || {};
        this.services = this.loadFromLocalStorage('services') || [];
        this.teamMembers = this.loadFromLocalStorage('teamMembers') || [];
        this.articles = this.loadFromLocalStorage('articles') || [];
        this.testimonials = this.loadFromLocalStorage('testimonials') || [];
        this.gallery = this.loadFromLocalStorage('gallery') || [];
        this.messages = this.loadFromLocalStorage('messages') || [];
    }

    // Load data from LocalStorage
    loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Save data to LocalStorage
    saveToLocalStorage(key, data) {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    // Settings management
    getSettings() {
        return this.settings;
    }

    setSettings(newSettings) {
        this.settings = newSettings;
        this.saveToLocalStorage('settings', newSettings);
    }

    // Services management
    getServices() {
        return this.services;
    }

    addService(service) {
        this.services.push(service);
        this.saveToLocalStorage('services', this.services);
    }

    // Team members management
    getTeamMembers() {
        return this.teamMembers;
    }

    addTeamMember(member) {
        this.teamMembers.push(member);
        this.saveToLocalStorage('teamMembers', this.teamMembers);
    }

    // Articles management
    getArticles() {
        return this.articles;
    }

    addArticle(article) {
        this.articles.push(article);
        this.saveToLocalStorage('articles', this.articles);
    }

    // Testimonials management
    getTestimonials() {
        return this.testimonials;
    }

    addTestimonial(testimonial) {
        this.testimonials.push(testimonial);
        this.saveToLocalStorage('testimonials', this.testimonials);
    }

    // Gallery management
    getGallery() {
        return this.gallery;
    }

    addImageToGallery(image) {
        this.gallery.push(image);
        this.saveToLocalStorage('gallery', this.gallery);
    }

    // Messages management
    getMessages() {
        return this.messages;
    }

    addMessage(message) {
        this.messages.push(message);
        this.saveToLocalStorage('messages', this.messages);
    }
}

// Exporting the service to be used in other parts of the application
export default new ContentManagementService();