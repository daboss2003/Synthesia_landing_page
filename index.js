import { mute, onMute, presentation, play, pause, demoData, removeHover, addHover } from './store.js';

let currentPosition = window.scrollY + 10;

const initApp = () => {
    let isIntersecting = false;
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const header = document.querySelector('.header');
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
            entry.target.classList.add('fadein');
        }
       if (isIntersecting && header.clientHeight > 150) header.style.position = 'fixed';
       if (isIntersecting && window.innerWidth <= 700 && entry.target === document.querySelector('.section__1__part2')) header.style.position = 'static';
        
    });
   }, { treshold: 0 });

    const targetElement = document.querySelector('.section__1__part2');
    const allTarget = [targetElement, ...Array.from(document.querySelectorAll('section'))];
    allTarget.forEach(item => {
        observer.observe(item);
    });
    

    const year = new Date();
    document.querySelector('.year').innerHTML = year.getFullYear();
}

window.addEventListener('DOMContentLoaded', () => {
    window.innerWidth < 900 ? document.querySelector('.popup').style.width = 80 + '%' : document.querySelector('.popup').style.width = 'fit-content'; 
    window.innerWidth < 900 ? document.querySelector('#login').innerHTML = 'Book a demo' : document.querySelector('#login').innerHTML = 'Log in';
    initApp();
    if (window.innerWidth > 500) {
        const container = document.querySelector('.section__3__container__text');
        container.style.left = 0 + 'px';
        container.style.position = 'static';
    }
    if (window.innerWidth <= 950 && window.innerWidth > 500) {
        const scrollContainerList = [document.querySelector('.control__container'), document.querySelector('.section__3__container__text')];
        scrollContainerList.forEach(item => {
            const scrollRight = item.querySelector('.scroll__right');
            const scrollLeft = item.querySelector('.scroll__left');
            if (item.scrollLeft === (item.scrollWidth - item.clientWidth)) scrollLeft.style.opacity = 0;
            if (item.scrollLeft <= 0) scrollRight.style.opacity = 0;
        });
    }
});
window.addEventListener('mouseover', (e) => {
    if (e.target.closest('.link')) {

        document.body.style.backgroundColor = "#faf6fd";
    }

    if (e.target.closest('.grid__box__item')) {
        const current = e.target.closest('.grid__box__item');
        const allBox = Array.from(document.querySelectorAll('.grid__box__item'));
        allBox.forEach(item => item.classList.remove('opacity'));
        const filtered = allBox.filter(item => item !== current);
        filtered.forEach(item => item.classList.add('opacity'));

    }
});

window.addEventListener('mouseout', (e) => {
    if (e.target.closest('.link')) {

        document.body.style.backgroundColor = "#fff";
    }

    if (e.target.closest('.grid__box__item')) {
    const allBox = Array.from(document.querySelectorAll('.grid__box__item'));
    allBox.forEach(item => item.classList.remove('opacity'));

   }
});

window.addEventListener('resize', () => {
    window.innerWidth < 900 ? document.querySelector('.popup').style.width = 80 + '%' :document.querySelector('.popup').style.width = 'fit-content';
    window.innerWidth < 900 ? document.querySelector('#login').innerHTML = 'Book a demo' : document.querySelector('#login').innerHTML = 'Log in'; 
    if (window.innerWidth > 500) {
        const container = document.querySelector('.section__3__container__text');
        container.style.left = 0 + 'px';
        container.style.position = 'static';
    }
    else if(window.innerWidth < 500) {
        const container = document.querySelector('.section__3__container__text');
        container.style.left = -14000 + 'px';
        container.style.position = 'absolute';
    }

    if (window.innerWidth <= 950 && window.innerWidth > 500) {
        const scrollContainerList = [document.querySelector('.control__container'), document.querySelector('.section__3__container__text')];
        scrollContainerList.forEach(item => {
            const scrollRight = item.querySelector('.scroll__right');
            const scrollLeft = item.querySelector('.scroll__left');
            if (item.scrollLeft === (item.scrollWidth - item.clientWidth)) scrollLeft.style.opacity = 0;
            if (item.scrollLeft <= 0) scrollRight.style.opacity = 0;
        });
    }

})

window.addEventListener('click', (e) => {
    
    if (e.target.closest('.hambugger__btn')) {
        document.querySelector('.hambugger').classList.toggle('active__btn');
        document.getElementById('header').classList.toggle('active');
    }

    if (e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        const { todo } = btn.dataset;
        if (todo === 'sound') {
            const video = btn.closest('.style__btn').previousElementSibling;
            if (video.muted === false) {
                video.muted = true;
                btn.closest('.style__btn').querySelector('.choice').innerHTML = 'Listen';
                btn.innerHTML = mute;
            }
            else {
                video.muted = false;
                btn.closest('.style__btn').querySelector('.choice').innerHTML = 'Mute';
                btn.innerHTML = onMute;
            }
        }
        if (todo === 'playControl') {
            const iframeContainer = btn.closest('#iframe__container');
            const { src } = iframeContainer.dataset;
            iframeContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${src}?autoplay=1" allowfullscreen frameborder="0" width="560" height="315" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>`
        }
    }

   
    
    if (e.target.closest('.ques')) {
        document.querySelector('.tooltip').style.opacity = 1;
    }

    if (e.target.closest('.control_btn')) {
        const current = e.target.closest('.control_btn')
        const controlList = Array.from(document.querySelectorAll('.control_btn'));
        controlList.forEach(control => control.classList.remove('selected'));
        current.classList.add('selected');
        const mobileSelect = document.querySelector('.mobile__select');
        mobileSelect.innerHTML = '';
        const copyElement = controlList[controlList.indexOf(current)].cloneNode(true);
        copyElement.className = 'control_btn__copy';
        mobileSelect.appendChild(copyElement)
        mobileSelect.insertAdjacentHTML('beforeend', `<div id="select__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#084df2" class="bi bi-chevron-down"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    </svg>
                </div>`);
        const controlContainer = document.querySelector('.control__body');
        const currentData = presentation.find(data => data.id === controlList.indexOf(current) + 1);
        controlContainer.innerHTML = `<div class="control__body__1">
                    <h2>${currentData.h2}</h2>
                    <h4>${currentData.h4}"</h4>
                    <div class="control__bottom">
                        <figure>
                            <img src="${currentData.img}" alt="">
                        </figure>
                        <div class="control__bottom__text">
                            <h5>${currentData.h5}</h5>
                            <p>${currentData.p}</p>
                        </div>
                        
                    </div>
                    <button>Learn more <img src="img/arrow-black.svg" alt=""></button>
                </div>
                <div class="control__body__2" id="iframe__container" data-src="${currentData.link}">
                    <img src="${currentData.poster}" alt="">
                    <div class="style__btn control__play">
                        <button class="btn" data-todo="playControl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="#fff" class="bi bi-play-fill"
                                viewBox="0 0 16 16">
                                <path
                                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                            </svg>
                        </button>
                        <span class="choice">Click to play</span>
                    </div>
                </div>`;
        
        if (window.innerWidth <= 500) {
            const controlButtonContainer = document.querySelector('.control__container');
            mobileSelect.style.borderColor = "#dfccccd5";
            controlButtonContainer.style.position = 'absolute';
            controlButtonContainer.style.left = -14000 + 'px';
        }
       
        
    }

    if (e.target.closest('.scroll__left')) {
        const container = e.target.closest('.scroll__left').closest('.control__container') || e.target.closest('.scroll__left').closest('.section__3__container__text');
        container.scrollLeft += 200; 
    }
    if (e.target.closest('.scroll__right')) {
        const container = e.target.closest('.scroll__right').closest('.control__container') || e.target.closest('.scroll__right').closest('.section__3__container__text');
        container.scrollLeft -= 200;
    }
    if (e.target.closest('#select__btn')) {
        const controlContainer = document.querySelector('.control__container');
        const mobileContainer = document.querySelector('.mobile__select');
        if (controlContainer.offsetLeft < 0) {
            mobileContainer.style.borderColor = "#084df2";
            controlContainer.style.left = 0;
            controlContainer.style.position = 'static';
            e.target.closest('#select__btn').style.transform = `rotateZ(${180}deg)`;
        }
        else {
            mobileContainer.style.borderColor = "#dfccccd5";
            controlContainer.style.position = 'absolute';
            controlContainer.style.left = -14000 + 'px';
            e.target.closest('#select__btn').style.transform = `rotateZ(${0}deg)`;
        }
    }
    if (e.target.closest('.section__3__container__text__top')) {
        const demoList = Array.from(document.querySelectorAll('.section__3__container__text__top'));
        const demoTextList = Array.from(document.querySelectorAll('.section__3__container__text__bottom'));
        const currentItemNo = demoList.indexOf(e.target.closest('.section__3__container__text__top'));
        demoTextList.forEach(item => item.innerHTML = "");
        demoTextList[currentItemNo + 1].innerHTML = demoData[currentItemNo].description;
        document.querySelector('.section__3__container__video').innerHTML = demoData[currentItemNo].video;
        demoList.forEach(item => item.classList.remove('current'));
        demoList[currentItemNo].classList.add('current');
        if (window.innerWidth < 500) {
            const container = document.querySelector('.section__3__container__text');
            container.style.left = -1400 + 'px';
            container.style.position = 'absolute';
            document.querySelector('.copy__preview').innerHTML = demoData[currentItemNo].description;
            const copyContainer = document.querySelector('.copy__container');
            copyContainer.innerHTML = "";
            const copiedElement = demoList[currentItemNo].cloneNode(true);
            copiedElement.className = 'copy__element';
            copyContainer.appendChild(copiedElement);
            copyContainer.insertAdjacentHTML('beforeend', `<div id="section3__select__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#084df2" class="bi bi-chevron-down"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    </svg>
                </div>`);
            copyContainer.style.borderColor = "#dfccccd5";
            document.querySelector('#section3__select__btn').style.transform = `rotateZ(${0}deg)`;
        }
        
    }

    if (e.target.closest('#section3__select__btn')) {
        const container = document.querySelector('.section__3__container__text');
        if (container.offsetLeft < 0) {
            document.querySelector('.copy__container').style.borderColor = "#084df2";
            e.target.closest('#section3__select__btn').style.transform = `rotateZ(${180}deg)`;
            container.style.left = 0 + 'px';
            container.style.position = 'static';
        } else {
            document.querySelector('.copy__container').style.borderColor = "#dfccccd5";
            e.target.closest('#section3__select__btn').style.transform = `rotateZ(${0}deg)`;
            container.style.position = 'absolute';
            container.style.left = -14000 + 'px';
            
        }
        

    }

    if (e.target.closest('.remove__hover') && window.innerWidth <= 900) {
        let link = e.target.closest('.remove__hover').closest('.link');
        let allLinks = Array.from(document.querySelectorAll('.link'));
        allLinks = allLinks.filter(item => item.querySelector('span') && item !== link);
        const position = window.getComputedStyle(e.target.closest('.remove__hover')).getPropertyValue('position');
        if (position !== 'static') removeHover(link);
        else addHover(link);
        allLinks.forEach(item => {
            if (window.getComputedStyle(item.querySelector('.remove__hover')).getPropertyValue('position') === 'fixed') {
                removeHover(item);
            }
        });
    }

    if (e.target.closest('.language')) {
        const languageList = Array.from(document.querySelectorAll('.language'));
        languageList.forEach(item => item.classList.remove('working'));
        const language = e.target.closest('.language');
        const { location, image } = language.dataset;
        document.querySelector('.current__country').src = image;
        language.parentNode.closest('.item__2').querySelector('video').src = location;
        language.classList.add('working');
        language.parentNode.closest('.item__2').querySelector('.playPause__btn').innerHTML = play;
    }

    if (e.target.closest('.playPause__btn')) {
        const button = e.target.closest('.playPause__btn');
        const video = button.closest('.playPause').parentNode.querySelector('video');
        if (!video.paused) {
            video.pause();
            button.innerHTML = play;
        } else {
            video.play();
            button.innerHTML = pause;
        }
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            button.innerHTML = play;
        })
    }

    if (e.target.closest('.heineken')) {
        const button = e.target.closest('.heineken');
        const video = button.closest('.style__btn').parentNode.querySelector('video');
        const Poster = video.getAttribute('poster');
        video.play();
        video.setAttribute('controls', "");
        button.closest('.style__btn').style.display = 'none';
        video.addEventListener('ended', () => {
            video.removeAttribute('controls');
            button.closest('.style__btn').style.display = 'flex';
            video.currentTime = 0;
            video.poster = Poster;
        })
    }

    if (e.target.closest('.showoff')) {
        const button = e.target.closest('.showoff');
        const currentContainer = button.closest('.style__btn').parentNode;
        const { src } = currentContainer.dataset;
        currentContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${src}?autoplay=1" allowfullscreen frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
        
    }

    if (e.target.closest('.modal__top')) {
        const currentModal = e.target.closest('.modal__top').parentNode;
        const allModals = Array.from(document.querySelectorAll('.modal'));
        const filteredModals = allModals.filter(item => item !== currentModal);
        filteredModals.forEach(item => item.classList.remove('open__modal'));
        currentModal.classList.toggle('open__modal');
    }

    if (e.target.closest('.cta__btn__close')) {
        document.querySelector('.cta').style.top = -50 + "%";
        document.querySelector('.cta__drop').classList.remove('cta__active');
    }
    

});





if (document.querySelector('.control__container') || document.querySelector('.section__3__container__text')) {
    const scrollContainerList = [document.querySelector('.control__container'), document.querySelector('.section__3__container__text')];
    scrollContainerList.forEach(item => {
    const scrollRight = item.querySelector('.scroll__right');
    const scrollLeft = item.querySelector('.scroll__left');
        item.addEventListener('scroll', () => {
            if (item.scrollLeft === (item.scrollWidth - item.clientWidth)) {
                scrollRight.style.opacity = 1;
                scrollLeft.style.opacity = 0;
            } 
            if (item.scrollLeft <= 0) {
                scrollRight.style.opacity = 0;
                scrollLeft.style.opacity = 1;
            }
    })
        
    });
}


window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    if (scrollPosition + windowHeight >= documentHeight) {
        document.querySelector('.cta').style.top = 50 + "%";
        document.querySelector('.cta__drop').classList.add('cta__active');
        currentPosition = 10;
    }
    const header = document.querySelector('.header');
    if (scrollPosition > currentPosition && window.innerWidth <= 700) { 
        currentPosition = scrollPosition;
        header.style.position = 'static';
    }
    else if (scrollPosition < currentPosition && window.innerWidth <= 700) {
        header.style.position = 'fixed';
    }
    
})
    
    






