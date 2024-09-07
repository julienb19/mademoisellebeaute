document.addEventListener('DOMContentLoaded', () => {
    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a'); // Correction ici : 'menuLniks' à 'menuLinks'

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Fermer le menu quand on clique sur un lien
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // Modal for reviews
    const openModalBtn = document.getElementById('open-modal-submit');
    const modalSubmit = document.getElementById('modal-submit');
    const closeBtnSubmit = document.getElementById('close-btn-submit');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (openModalBtn && modalSubmit && closeBtnSubmit && reviewForm && reviewsList) {
        // Ouvrir la modal
        function openModal() {
            modalSubmit.style.display = 'block';
        }

        // Fermer la modal
        function closeModal() {
            modalSubmit.style.display = 'none';
        }

        // Événement pour ouvrir la modal
        openModalBtn.addEventListener('click', openModal);

        // Événement pour fermer la modal
        closeBtnSubmit.addEventListener('click', closeModal);

        // Événement pour soumettre le formulaire
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupère les données du formulaire
            const name = document.getElementById('name').value;
            const review = document.getElementById('review').value;
            const rating = document.getElementById('rating').value;

            // Vérification des champs obligatoires
            if (!name || !review || !rating) {
                alert('Veuillez remplir tous les champs avant de soumettre votre avis.');
                return;
            }

            // Crée un objet pour l'avis
            const reviewData = { name, review, rating };

            // Ajoute l'avis au localStorage
            addReviewToLocalStorage(reviewData);

            // Crée un nouvel élément pour l'avis et l'ajoute en haut de la liste
            addReviewToDOM(reviewData, true);

            // Réinitialise le formulaire
            reviewForm.reset();

            // Ferme la modal
            closeModal();

            // Défile vers la section des avis
            document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Fonction pour générer les étoiles
    function generateStars(review, rating) {
        const ratingElement = review.querySelector('.rating');
        ratingElement.innerHTML = '';

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= rating) {
                star.classList.add('fas', 'fa-star');
            } else {
                star.classList.add('far', 'fa-star');
            }
            ratingElement.appendChild(star);
        }
    }

    // Fonction pour ajouter un avis au DOM
    function addReviewToDOM(reviewData, prepend = false) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.setAttribute('data-rating', reviewData.rating);
        reviewItem.innerHTML = `
            <h4>${reviewData.name}</h4>
            <p>${reviewData.review}</p>
            <div class="rating"></div>
        `;

        // Génère les étoiles pour le nouvel avis
        generateStars(reviewItem, reviewData.rating);

        // Ajoute l'avis en haut de la liste
        if (prepend) {
            reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
        } else {
            reviewsList.appendChild(reviewItem);
        }
    }

    // Fonction pour ajouter un avis au localStorage
    function addReviewToLocalStorage(reviewData) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(reviewData);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Fonction pour charger les avis du localStorage
    function loadReviewsFromLocalStorage() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.reverse().forEach(reviewData => {
            addReviewToDOM(reviewData);
        });

        // Masquer les avis supplémentaires au-delà des 3 premiers
        const reviewItems = document.querySelectorAll('#reviews-list .review-item');
        reviewItems.forEach((review, index) => {
            if (index >= 3) {
                review.classList.add('hidden');
            }
        });
    }

    // Bouton pour voir tous les avis
    const toggleReviewsBtn = document.getElementById('toggle-reviews');

    if (toggleReviewsBtn) {
        toggleReviewsBtn.addEventListener('click', () => {
            const hiddenReviews = document.querySelectorAll('#reviews-list .hidden');

            if (hiddenReviews.length > 0) {
                hiddenReviews.forEach(review => {
                    review.classList.remove('hidden');
                });
                toggleReviewsBtn.textContent = 'Réduire';
                toggleReviewsBtn.setAttribute('aria-expanded', 'true');
            } else {
                const reviewItems = document.querySelectorAll('#reviews-list .review-item');
                reviewItems.forEach((review, index) => {
                    if (index >= 3) {
                        review.classList.add('hidden');
                    }
                });
                toggleReviewsBtn.textContent = 'Voir tous les avis';
                toggleReviewsBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Charger les avis depuis le localStorage au démarrage
    loadReviewsFromLocalStorage();
    
});


 // Ajouter ici votre nouvelle fonctionnalité de popup
    const phoneIcon = document.querySelector('.phone-icon');
    const phonePopup = document.getElementById('phonePopup');

    if (phoneIcon && phonePopup) {
        // Toggle la popup au clic sur l'icône
        phoneIcon.addEventListener('click', (event) => {
            event.stopPropagation();  // Empêche le clic sur l'icône de déclencher la fermeture de la popup
            phonePopup.style.display = (phonePopup.style.display === 'block') ? 'none' : 'block';
        });

        // Fermer la popup si on clique ailleurs sur le document
        document.addEventListener('click', (event) => {
            if (!phonePopup.contains(event.target)) {
                phonePopup.style.display = 'none';
            }
        });
    }

/* section messages mail */
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message envoyé avec succès');
        } else {
            alert('Erreur lors de l\'envoi du message');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi du message');
    });
});
