// Create Stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = Math.random() * 3 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 1.5 + 's';
      starsContainer.appendChild(star);
    }
  }
  createStars();
  
  // Scroll Animation
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Category Filter
  const categoryButtons = document.querySelectorAll('.categories button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
  
      const category = button.getAttribute('data-category');
  
      portfolioItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Hover Video Preview
  document.querySelectorAll('.preview').forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    video.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(video);
    });
  });
  
  // Modal Funtion
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalDescription = document.getElementById('videoDescription');
  const closeBtn = document.querySelector('.close');
  
  function openModal(videoElem) {
    const sourceElem = videoElem.querySelector('source');
    if (sourceElem) {
      modalVideo.src = sourceElem.src;
    }
    modalVideo.muted = false;
    const description = videoElem.parentElement.getAttribute('data-description') || '';
    modalDescription.innerText = description;
    modal.style.display = 'block';
  }

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
      modalVideo.pause();
      modalVideo.currentTime = 0;
      modalVideo.src = "";
    }
  });