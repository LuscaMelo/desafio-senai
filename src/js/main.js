//Modal Bem-Vindo
const welcomeModal = document.getElementById('welcomeModal');
const closeWelcomeModalBtn = document.getElementById('closeWelcomeModalButton');
const closeWelcomeModalX = document.getElementById('closeWelcomeModalX');

function openWelcomeModal() {
    welcomeModal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden'); // Desativa scroll
}

function closeWelcomeModal() {
    welcomeModal.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden'); // Reativa scroll
}

window.addEventListener('DOMContentLoaded', openWelcomeModal);

closeWelcomeModalBtn.addEventListener('click', closeWelcomeModal);
closeWelcomeModalX.addEventListener('click', closeWelcomeModal);

welcomeModal.addEventListener('click', (e) => {
    if (e.target === welcomeModal) closeWelcomeModal();
});

//Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = mobileMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
    if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px') {
        mobileMenu.style.maxHeight = '0px';
    } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    }
});

// Fecha o menu quando clicar em qualquer link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
    });
});

//Slider do passo a passo
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.1,
    spaceBetween: 16,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
    },
    breakpoints: {
        800: {
            slidesPerView: 2.2,
        },
        1250: {
            slidesPerView: 3,
        },
    },
    on: {
        init: updateNavButtons,
        slideChange: updateNavButtons,
    },
});

const prevBtn = document.getElementById('custom-prev');
const nextBtn = document.getElementById('custom-next');

function updateNavButtons() {
    prevBtn.disabled = swiper.isBeginning;
    nextBtn.disabled = swiper.isEnd;
}

//Validação dos exercícios
function verificarRespostas() {
    const respostasCorretas = {
        q1: 'c',
        q2: 'b',
        q3: 'v',
    };

    const feedbacks = {
        q1: {
            correta: "Correto! A batata Asterix é ideal para fritura.",
            incorreta: "Incorreto. A batata Asterix, de casca rosada, é a mais indicada."
        },
        q2: {
            correta: "Correto! Cortes uniformes garantem fritura por igual.",
            incorreta: "Incorreto. Cortes uniformes ajudam a fritar de maneira uniforme."
        },
        q3: {
            correta: "Correto! A fritura dupla é o segredo para o equilíbrio ideal.",
            incorreta: "Incorreto. A fritura dupla proporciona crocância por fora e maciez por dentro."
        }
    };

    ['q1', 'q2', 'q3'].forEach((questao) => {
        const opSelecionada = document.querySelector(`input[name="${questao}"]:checked`);
        const feedbackEl = document.getElementById(`feedback-${questao}`);
        const opcoes = document.querySelectorAll(`input[name="${questao}"]`);

        // Se já está respondida (opções desabilitadas), ignora
        const todasDesabilitadas = Array.from(opcoes).every(op => op.disabled);
        if (todasDesabilitadas) return;

        if (!opSelecionada) {
            feedbackEl.textContent = "Por favor, selecione uma opção.";
            feedbackEl.className = "text-yellow-600 mt-2";
            return;
        }

        if (opSelecionada.value === respostasCorretas[questao]) {
            feedbackEl.textContent = feedbacks[questao].correta;
            feedbackEl.className = "text-green-600 mt-2";
        } else {
            feedbackEl.textContent = feedbacks[questao].incorreta;
            feedbackEl.className = "text-red-600 mt-2";
        }

        // Desativa as opções da questão, independentemente da resposta estar certa ou errada
        opcoes.forEach(op => op.disabled = true);
    });
}