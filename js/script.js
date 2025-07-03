// эффекты

const sections = document.querySelectorAll('.section'); // только <section class="section">

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // отключить, если не нужно повторное появление
    }
  });
}, {
  threshold: 0.1, // можно увеличить до 0.3–0.5 для плавности
});

sections.forEach(section => {
  observer.observe(section);
});


const burger = document.getElementById('burger');
const burgerClose = document.getElementById('burgerClose');
const mobileMenu = document.getElementById('mobileMenu');


 burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');

});


 mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');

});



document.addEventListener('click', function (e) {
  const target = e.target;

  const clickedInsideMenu = mobileMenu.contains(target);
  const clickedOnBurger = burger.contains(target);

  if (!clickedInsideMenu && !clickedOnBurger) {
    mobileMenu.classList.remove('active');
  }
});


// галерея


const slides = [
  { image: 'images/art_01.png', title: '#Metaverse', author: 'By The Salvare' },
  { image: 'images/art_02.png', title: '#Polly Doll', author: 'By The Native' },
  { image: 'images/art_03.png', title: '#Alec Art', author: 'By GeorgZvic' },
  { image: 'images/art_04.png', title: '#Toxic Poeth', author: 'By YazoiLup' },
  { image: 'images/art_05.png', title: '#Future NFT', author: 'By Dreamer' },
];


const prevBtn = document.querySelector('.button-prev');
const nextBtn = document.querySelector('.button-next');
const galleryUnits = document.querySelectorAll('.gallery__unit');
const navButtons = document.querySelectorAll('.gallery__button');

let currentIndex = 0;

function renderSlides() {
  for (let i = 0; i < galleryUnits.length; i++) {
    const index = (currentIndex + i) % slides.length;
    const unit = galleryUnits[i];
    const imageDiv = unit.querySelector('.gallery__image');
    const heading = unit.querySelector('.gallery__heading');
    const text = unit.querySelector('.gallery__text');

    imageDiv.style.backgroundImage = `url('${slides[index].image}')`;
    heading.textContent = slides[index].title;
    text.textContent = slides[index].author;
  }

  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  renderSlides();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  renderSlides();
});

navButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    currentIndex = i;
    renderSlides();
  });
});


renderSlides();

let startX = 0;
let endX = 0;
const swipeThreshold = 50; 

const gallery = document.querySelector('.gallery');

gallery.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

gallery.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff < 0) {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    renderSlides();
  }
});


// вопросы

const faqs = document.querySelectorAll('.faqs__faq');
const arrows = document.querySelectorAll('.faqs__arrow');

faqs.forEach((faq, index) => {
  const question = faq.querySelector('.faqs__question');
  const arrow = faq.querySelector('.faqs__arrow');

  question.addEventListener('click', () => {
    const isActive = faq.classList.contains('active');
    arrow.classList.contains('active');

    // Сначала закрываем все
    faqs.forEach((f, i) => {
      f.classList.remove('active');
       arrows[i].classList.remove('active');
    });

    // Если текущий не был открыт — открываем
    if (!isActive) {
      faq.classList.add('active');
       arrow.classList.add('active');
    }
  });
});