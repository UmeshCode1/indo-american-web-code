/**
 * Indo American Play School - Main JavaScript File
 * This file contains general scripts for the website functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Initialize language functionality
    initLanguageSwitcher();

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.3rem 0';
            backToTop.classList.add('active');
        } else {
            navbar.style.padding = '0.5rem 0';
            backToTop.classList.remove('active');
        }
    });

    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotPopup = document.querySelector('.chatbot-popup');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    chatbotToggle.addEventListener('click', function() {
        chatbotPopup.style.display = chatbotPopup.style.display === 'block' ? 'none' : 'block';
    });

    chatbotClose.addEventListener('click', function() {
        chatbotPopup.style.display = 'none';
    });

    // Simple chatbot responses
    const botResponses = {
        'hello': 'Hi there! How can I help you today?',
        'hi': 'Hello! How can I assist you with Indo American Play School?',
        'admission': 'For admissions information, please visit our Admissions page or contact us at +91 98765 43210.',
        'fees': 'Our fee structure varies by program. Please contact our admissions office for detailed information.',
        'timing': 'School hours are Monday-Friday: 8:00 AM - 3:00 PM, Saturday: 9:00 AM - 12:00 PM, and we are closed on Sundays.',
        'contact': 'You can reach us at +91 98765 43210 or email us at info@indoamericanplayschool.com.',
        'age': 'We accept children from 2-6 years of age across our different programs.',
        'curriculum': 'We follow a blend of American teaching methodologies with Indian values, focusing on holistic development.',
        'location': 'We are located at 123 Education Lane, City Name, State, PIN - 123456.',
        'programs': 'We offer Playgroup (2-3 years), Nursery (3-4 years), LKG (4-5 years), and UKG (5-6 years) programs.',
        'facilities': 'Our facilities include smart classrooms, outdoor play areas, art corner, library, music room, and more!',
        'transport': 'Yes, we provide safe transportation services with GPS-enabled buses and trained attendants.',
        'food': 'We provide nutritious meals prepared in our hygienic kitchen. We also cater to specific dietary requirements.',
        'security': 'We have CCTV surveillance, trained security personnel, and strict pick-up policies to ensure child safety.',
        'teacher': 'Our teachers are experienced educators with specialized training in early childhood education.',
        'activities': 'We offer a range of extracurricular activities including music, dance, art, sports, and language classes.',
        'bye': 'Thank you for chatting with us! Feel free to reach out if you have more questions.',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?'
    };

    function sendChatMessage() {
        if (chatbotInput.value.trim() === '') return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `<p>${chatbotInput.value}</p>`;
        chatbotMessages.appendChild(userMessage);
        
        // Get response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            
            let response = 'I\'m sorry, I didn\'t understand that. Could you try asking about our programs, admissions, facilities, timing, or contact information?';
            
            // Check for keywords in user input
            const userText = chatbotInput.value.toLowerCase();
            for (const [keyword, reply] of Object.entries(botResponses)) {
                if (userText.includes(keyword)) {
                    response = reply;
                    break;
                }
            }
            
            botMessage.innerHTML = `<p>${response}</p>`;
            chatbotMessages.appendChild(botMessage);
            
            // Scroll to bottom of chat
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 500);
        
        // Clear input
        chatbotInput.value = '';
        
        // Scroll to bottom of chat
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotSend.addEventListener('click', sendChatMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Initialize any Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /**
     * Language Switcher Functionality
     * Handles switching between languages using the translations.js file
     */
    function initLanguageSwitcher() {
        // Get language preference from localStorage or default to English
        const currentLang = localStorage.getItem('language') || 'en';
        
        // Set the initial language
        setLanguage(currentLang);
        
        // Update dropdown display
        updateLanguageDropdown(currentLang);
        
        // Add event listeners to language dropdown items
        const languageItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="languageDropdown"] .dropdown-item');
        
        if (languageItems) {
            languageItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    if (lang) {
                        setLanguage(lang);
                        updateLanguageDropdown(lang);
                    }
                });
            });
        }
    }
    
    // Function to set the language and update text content
    function setLanguage(lang) {
        // Save to localStorage for persistence
        localStorage.setItem('language', lang);
        
        // Skip if translations object isn't available
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded');
            return;
        }
        
        // Get the translation set for the selected language
        const texts = translations[lang];
        
        // Skip if language isn't available
        if (!texts) {
            console.warn(`Translation for "${lang}" not found`);
            return;
        }
        
        // Update navigation
        updateElementText('nav_home', texts.nav_home);
        updateElementText('nav_about', texts.nav_about);
        updateElementText('nav_programs', texts.nav_programs);
        updateElementText('nav_facilities', texts.nav_facilities);
        updateElementText('nav_admissions', texts.nav_admissions);
        updateElementText('nav_gallery', texts.nav_gallery);
        updateElementText('nav_parent_zone', texts.nav_parent_zone);
        updateElementText('nav_contact', texts.nav_contact);
        updateElementText('nav_apply_now', texts.nav_apply_now);
        
        // Update page content based on the current page
        const currentPage = getCurrentPage();
        
        if (currentPage === 'index') {
            // Update homepage content
            updateElementText('hero_title', texts.hero_title);
            updateElementText('hero_subtitle', texts.hero_subtitle);
            updateElementText('hero_btn_visit', texts.hero_btn_visit);
            updateElementText('hero_btn_tour', texts.hero_btn_tour);
            
            // Why Choose Us section
            updateElementText('why_choose_title', texts.why_choose_title);
            updateElementText('why_choose_subtitle', texts.why_choose_subtitle);
            updateElementText('feature_holistic', texts.feature_holistic);
            updateElementText('feature_holistic_desc', texts.feature_holistic_desc);
            updateElementText('feature_global', texts.feature_global);
            updateElementText('feature_global_desc', texts.feature_global_desc);
            updateElementText('feature_educators', texts.feature_educators);
            updateElementText('feature_educators_desc', texts.feature_educators_desc);
            updateElementText('feature_safe', texts.feature_safe);
            updateElementText('feature_safe_desc', texts.feature_safe_desc);
            
            // Programs section
            updateElementText('programs_title', texts.programs_title);
            updateElementText('programs_subtitle', texts.programs_subtitle);
            updateElementText('program_playgroup', texts.program_playgroup);
            updateElementText('program_playgroup_age', texts.program_playgroup_age);
            updateElementText('program_nursery', texts.program_nursery);
            updateElementText('program_nursery_age', texts.program_nursery_age);
            updateElementText('program_lkg', texts.program_lkg);
            updateElementText('program_lkg_age', texts.program_lkg_age);
            updateElementText('program_ukg', texts.program_ukg);
            updateElementText('program_ukg_age', texts.program_ukg_age);
            updateElementsWithClass('program_learn_more', texts.program_learn_more);
            updateElementText('programs_explore_all', texts.programs_explore_all);
            
            // Facilities section
            updateElementText('facilities_title', texts.facilities_title);
            updateElementText('facilities_subtitle', texts.facilities_subtitle);
            updateElementText('facility_smart', texts.facility_smart);
            updateElementText('facility_smart_desc', texts.facility_smart_desc);
            updateElementText('facility_outdoor', texts.facility_outdoor);
            updateElementText('facility_outdoor_desc', texts.facility_outdoor_desc);
            updateElementText('facility_art', texts.facility_art);
            updateElementText('facility_art_desc', texts.facility_art_desc);
            updateElementText('facility_library', texts.facility_library);
            updateElementText('facility_library_desc', texts.facility_library_desc);
            updateElementText('facilities_view_all', texts.facilities_view_all);
            
            // Testimonials section
            updateElementText('testimonials_title', texts.testimonials_title);
            updateElementText('testimonials_subtitle', texts.testimonials_subtitle);
            
            // Events section
            updateElementText('events_title', texts.events_title);
            updateElementText('events_subtitle', texts.events_subtitle);
            updateElementText('events_view_all', texts.events_view_all);
            
            // CTA section
            updateElementText('cta_title', texts.cta_title);
            updateElementText('cta_subtitle', texts.cta_subtitle);
            updateElementText('cta_apply', texts.cta_apply);
            updateElementText('cta_contact', texts.cta_contact);
        }
        
        // Footer (common to all pages)
        updateElementText('footer_about', texts.footer_about);
        updateElementText('footer_quick_links', texts.footer_quick_links);
        updateElementText('footer_contact_us', texts.footer_contact_us);
        updateElementText('footer_address', texts.footer_address);
        updateElementText('footer_phone', texts.footer_phone);
        updateElementText('footer_email', texts.footer_email);
        updateElementText('footer_hours', texts.footer_hours);
        updateElementText('footer_weekdays', texts.footer_weekdays);
        updateElementText('footer_saturday', texts.footer_saturday);
        updateElementText('footer_sunday', texts.footer_sunday);
        updateElementText('footer_copyright', texts.footer_copyright);
        updateElementText('footer_privacy', texts.footer_privacy);
        updateElementText('footer_terms', texts.footer_terms);
        
        // Chatbot (common to all pages)
        updateElementText('chat_with', texts.chat_with);
        updateElementText('chat_greeting', texts.chat_greeting);
        updateAttributeValue('chat_placeholder', 'placeholder', texts.chat_placeholder);
    }
    
    // Helper function to update text content of an element with a specific ID
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
    
    // Helper function to update text content of all elements with a specific class
    function updateElementsWithClass(className, text) {
        const elements = document.getElementsByClassName(className);
        if (elements && elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].textContent = text;
            }
        }
    }
    
    // Helper function to update attribute value of an element
    function updateAttributeValue(id, attribute, value) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute(attribute, value);
        }
    }
    
    // Helper function to update the language dropdown display
    function updateLanguageDropdown(lang) {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
            // Update the button text
            if (lang === 'en') {
                dropdown.innerHTML = '<i class="fas fa-globe"></i> EN';
            } else if (lang === 'hi') {
                dropdown.innerHTML = '<i class="fas fa-globe"></i> हिन्दी';
            }
            
            // Update the active state in dropdown
            const items = document.querySelectorAll('.dropdown-menu[aria-labelledby="languageDropdown"] .dropdown-item');
            if (items) {
                items.forEach(item => {
                    if (item.getAttribute('data-lang') === lang) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // Helper function to get the current page name
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        if (!page || page === '' || page === 'index.html') {
            return 'index';
        } else {
            return page.replace('.html', '');
        }
    }
});