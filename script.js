/* 
  =========================================
  SOCIETY FURNITURE - Interactive Logic
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {

  /* 
    =========================================
    1. STICKY HEADER & SCROLL TRANSITIONS
    =========================================
  */
  const header = document.getElementById('mainHeader');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Trigger immediately in case page is loaded scrolled down


  /* 
    =========================================
    2. MOBILE DRAWER NAVIGATION MENU
    =========================================
  */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is active on mobile
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  mobileToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });


  /* 
    =========================================
    3. SMOOTH SCROLLING & ACTIVE SECTION LINK
    =========================================
  */
  const sections = document.querySelectorAll('section, footer');
  
  const handleActiveNavOnScroll = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === 'mainFooter' && href === '#contact')) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', handleActiveNavOnScroll);
  
  // Scroll down hero indicator click helper
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  /* 
    =========================================
    4. CATEGORY DETAILS DATABASE & MODALS
    =========================================
  */
  const categoriesDb = {
    living: {
      category: "Living Room",
      title: "Luxury Living Room Suite",
      subheading: "Bespoke Walnut Furniture & Custom Sofas",
      image: "images/hero.png",
      description: "Step into a world of sophisticated comfort. Our premium living room furniture features structural solid hardwoods beautifully paired with high-end fabrications. Direct workshop styling helps us deliver tailored sofas and tables that match your aesthetic preferences at local Lucknow honest rates.",
      features: [
        { icon: "couch", title: "Custom Sizing & Fabric", desc: "Configured precisely to fit your seating layout with 100+ designer shade options." },
        { icon: "shield-halved", title: "40 Density+ Foams", desc: "Equipped with high-resiliency foams that maintain elasticity and support for years." },
        { icon: "tree", title: "Treated Walnut & Teak", desc: "Built with seasoned solid woods resistant to wrapping, cracking, and local pests." },
        { icon: "sparkles", title: "Matte/Gloss Polish", desc: "Finished with premium lacquer coats that accent wood grains beautifully." }
      ]
    },
    bedroom: {
      category: "Bedroom Furniture",
      title: "Premium Sleep Sanctuaries",
      subheading: "Solid Hardwood Beds & Built-in Wardrobes",
      image: "images/bedroom.png",
      description: "Your bedroom should be an oasis of calm. Our premium bed collections provide robust, silent construction with spacious storage and matching nightstands. Each bedhead is meticulously upholstered with plush fabrics, adding high-end showroom styling to your personal space.",
      features: [
        { icon: "bed", title: "Hydraulic Smart Storage", desc: "Effortless gas-lift mechanisms opening massive under-bed dust-proof compartments." },
        { icon: "ribbon", title: "Tufted Headboards", desc: "Designer cushioned headboards with custom stitch lines and gold metal side panels." },
        { icon: "door-closed", title: "Modular Wardrobes", desc: "Smooth-sliding wardrobe cabinets with soft-close tracks and internal drawer styling." },
        { icon: "clock", title: "Lifetime Frame Warranty", desc: "Guaranteed structural durability on our heavy hardwood foundations." }
      ]
    },
    dining: {
      category: "Dining Sets",
      title: "Elegantly Crafted Dining Suites",
      subheading: "Marble & Walnut Tops with Comfortable Upholstery",
      image: "images/dining.png",
      description: "Host memorable dinner gatherings in style. Society Furniture dining table sets blend sleek architecture with daily toughness. Offering custom luxury layouts with solid marble or rich wood finishes, matched with comfortable dining chairs.",
      features: [
        { icon: "square", title: "Italian Marble Tops", desc: "Beautiful white composite or solid wood table options that resist heat and stains." },
        { icon: "chair", title: "Ergonomic Upholstered Seating", desc: "Contoured back support and deep cushion padding for prolonged family conversations." },
        { icon: "gem", title: "Metallic Gold Accent Legs", desc: "Luxurious brushed gold and brass frames supporting premium table designs." },
        { icon: "users-line", title: "4, 6 & 8-Seater Layouts", desc: "Perfect dimensions configured exactly for your dining hall room limits." }
      ]
    },
    office: {
      category: "Office Furniture",
      title: "Workspace Excellence Setups",
      subheading: "Executive Walnut Desks & Supportive Seating",
      image: "images/hero.png",
      description: "Elevate your focus with our modern office items. Perfect for home study rooms or corporate directors, our workspace solutions focus on structured layout design and high durability. Featuring heavy wood detailing, custom document shelves, and premium ergonomics.",
      features: [
        { icon: "folder-open", title: "Smart Wire Management", desc: "Built-in cable ports, power box chambers, and concealed desktop wiring ducts." },
        { icon: "user-tie", title: "Executive Ergonomic Chairs", desc: "Pneumatic height adjustment, heavy-duty gas lifts, and breathable lumbar support." },
        { icon: "cubes", title: "Lockable Shelving Units", desc: "Soft-glide lockable filing storage, sideboards, and display cabinets." },
        { icon: "ruler-combined", title: "Space Optimization", desc: "L-shaped or straight executive configurations designed for corner settings." }
      ]
    },
    kitchen: {
      category: "Modular Kitchens",
      title: "Modern Modular Kitchen Layouts",
      subheading: "Waterproof Cabinets & High-Gloss Finishes",
      image: "images/kitchen.png",
      description: "The modern home revolves around the kitchen. We design state-of-the-art modular kitchens that excel under Indian cooking habits. Built with 100% Boiling Water Proof (BWP) marine plywood to prevent moisture damage, outfitted with luxury silent drawers.",
      features: [
        { icon: "droplet-slash", title: "100% BWP Marine Plywood", desc: "Water-proof core cabinets that resist moisture, steam, and high temperatures." },
        { icon: "rotate", title: "Blum/Hettich Tandem Slides", desc: "Smooth, silent soft-close channels with massive load-carrying capacities." },
        { icon: "wand-magic", title: "Acrylic & Walnut Shutters", desc: "Stain-resistant finishes, anti-scratch panels, and elegant profile handles." },
        { icon: "kitchen-set", title: "Turnkey Appliance Bins", desc: "Concealed chimney, built-in microwave ovens, dishwashers, and dry rack baskets." }
      ]
    },
    projects: {
      category: "Interior Projects",
      title: "Turnkey Interior Design Projects",
      subheading: "Lucknow's Finest Full Home Makeover Solutions",
      image: "images/about.png",
      description: "Experience absolute peace of mind. Our luxury interior design project service covers everything from 3D designs to final structural handovers. We assign dedicated designers to manage your false ceiling, wall styling, custom lighting, electrical work, and bespoke woodwork under one comprehensive contract.",
      features: [
        { icon: "compass-drafting", title: "Comprehensive 3D Visuals", desc: "Review complete high-fidelity room walkthrough renders before wood crafting starts." },
        { icon: "lightbulb", title: "Ceiling & Lighting Design", desc: "Custom gypsum ceiling designs, ambient LEDs, and modern pendant layout configurations." },
        { icon: "paintbrush", title: "Turnkey Coordination", desc: "Concealed wiring, custom paint, wallpapering, paneling, and curated fabrics." },
        { icon: "user-gear", title: "On-site Supervision", desc: "Rigorous quality inspections and daily progress updates by our expert supervisors." }
      ]
    }
  };

  const modalOverlay = document.getElementById('categoryModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseSecondaryBtn = document.getElementById('modalCloseSecondaryBtn');
  const categoryLinks = document.querySelectorAll('.category-link');
  
  const modalHeroImage = document.getElementById('modalHeroImage');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalHeading = document.getElementById('modalHeading');
  const modalSubHeading = document.getElementById('modalSubHeading');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeaturesGrid = document.getElementById('modalFeaturesGrid');
  const modalEnquireBtn = document.getElementById('modalEnquireBtn');

  const openCategoryModal = (catKey) => {
    const data = categoriesDb[catKey];
    if (!data) return;

    // Populate data
    modalHeroImage.src = data.image;
    modalHeroImage.alt = data.title;
    modalCategoryTag.textContent = data.category;
    modalHeading.textContent = data.title;
    modalSubHeading.textContent = data.subheading;
    modalDescription.textContent = data.description;
    
    // Auto populate Enquiry CTA parameter
    modalEnquireBtn.href = `#contact`;
    
    // Clear & Populate features grid
    modalFeaturesGrid.innerHTML = '';
    data.features.forEach(feat => {
      const item = document.createElement('div');
      item.className = 'modal-feature-item';
      item.innerHTML = `
        <div class="modal-feature-icon">
          <i class="fa-solid fa-${feat.icon}"></i>
        </div>
        <div class="modal-feature-text">
          <h5 class="modal-feature-title">${feat.title}</h5>
          <p class="modal-feature-desc">${feat.desc}</p>
        </div>
      `;
      modalFeaturesGrid.appendChild(item);
    });

    // Open Modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCategoryModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Bind clicks to "View Collection" triggers
  categoryLinks.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const catKey = e.currentTarget.getAttribute('data-category');
      openCategoryModal(catKey);
    });
  });

  modalCloseBtn.addEventListener('click', closeCategoryModal);
  modalCloseSecondaryBtn.addEventListener('click', closeCategoryModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCategoryModal();
  });
  
  // Modal Enquire Btn should close the modal to let user view contact section
  modalEnquireBtn.addEventListener('click', () => {
    closeCategoryModal();
    // Pre-populate service selector on contact form based on what category modal is open!
    const activeCategoryTag = modalCategoryTag.textContent;
    const formServiceSelector = document.getElementById('form-service');
    if (formServiceSelector) {
      for (let i = 0; i < formServiceSelector.options.length; i++) {
        if (formServiceSelector.options[i].text.toLowerCase().includes(activeCategoryTag.toLowerCase().substring(0, 5))) {
          formServiceSelector.selectedIndex = i;
          break;
        }
      }
    }
  });


  /* 
    =========================================
    5. SHOWCASE GALLERY FILTER LOGIC
    =========================================
  */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all btns
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          // Smooth fade-in
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* 
    =========================================
    6. GALLERY FULLSCREEN LIGHTBOX
    =========================================
  */
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxActiveImage = document.getElementById('lightboxActiveImage');
  const lightboxActiveCaption = document.getElementById('lightboxActiveCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title').textContent;
      const category = item.querySelector('.gallery-item-category').textContent;

      lightboxActiveImage.src = img.src;
      lightboxActiveImage.alt = title;
      lightboxActiveCaption.textContent = `${category} — ${title}`;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrapper')) {
      closeLightbox();
    }
  });


  /* 
    =========================================
    7. TESTIMONIALS SLIDER (CAROUSEL)
    =========================================
  */
  const slider = document.getElementById('testimonialsSlider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonialPrevBtn');
  const nextBtn = document.getElementById('testimonialNextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  let currentSlideIndex = 0;
  let autoplayInterval;

  // Create dot indicators
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });
  };

  const goToSlide = (index) => {
    currentSlideIndex = index;
    updateSliderPosition();
    resetAutoplay();
  };

  const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSliderPosition();
  };

  const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  // Pause autoplay on card hover
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    card.addEventListener('mouseleave', startAutoplay);
  });

  startAutoplay();
  updateSliderPosition();


  /* 
    =========================================
    8. BEAUTIFUL TOAST NOTIFICATION SYSTEM
    =========================================
  */
  const toastBox = document.getElementById('toastBox');

  const showToast = (title, message, iconType = 'circle-check') => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fa-solid fa-${iconType}"></i>
      </div>
      <div class="toast-content">
        <span class="toast-title">${title}</span>
        <span class="toast-msg">${message}</span>
      </div>
    `;
    
    toastBox.appendChild(toast);
    
    // Animate slide-in
    setTimeout(() => toast.classList.add('active'), 50);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  };


  /* 
    =========================================
    9. ENQUIRY FORM REAL-TIME VALIDATION
    =========================================
  */
  const form = document.getElementById('enquiryForm');
  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('formSubmitBtn');

  // Input validation utility functions
  const validateField = (input, validatorFunc) => {
    const group = input.parentElement;
    const isValid = validatorFunc(input.value.trim());
    
    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }
    return isValid;
  };

  // Validators
  const nameValidator = (val) => val.length >= 2;
  const phoneValidator = (val) => {
    const sanitized = val.replace(/\D/g, ''); // strip non-digits
    return sanitized.length === 10;
  };
  const messageValidator = (val) => val.length >= 10;

  // Real-time listener checks
  nameInput.addEventListener('blur', () => validateField(nameInput, nameValidator));
  nameInput.addEventListener('input', () => {
    if (nameInput.parentElement.classList.contains('invalid')) {
      validateField(nameInput, nameValidator);
    }
  });

  phoneInput.addEventListener('blur', () => validateField(phoneInput, phoneValidator));
  phoneInput.addEventListener('input', () => {
    if (phoneInput.parentElement.classList.contains('invalid')) {
      validateField(phoneInput, phoneValidator);
    }
  });

  messageInput.addEventListener('blur', () => validateField(messageInput, messageValidator));
  messageInput.addEventListener('input', () => {
    if (messageInput.parentElement.classList.contains('invalid')) {
      validateField(messageInput, messageValidator);
    }
  });

  // Handle Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameValidator);
    const isPhoneValid = validateField(phoneInput, phoneValidator);
    const isMsgValid = validateField(messageInput, messageValidator);

    if (isNameValid && isPhoneValid && isMsgValid) {
      // Form is fully validated!
      const originalBtnHtml = submitBtn.innerHTML;
      
      // Loading visual state change
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting estimate request...';
      submitBtn.style.opacity = '0.7';

      const userName = nameInput.value.trim();
      const userPhone = phoneInput.value.trim();
      const chosenService = document.getElementById('form-service').value;

      // Simulate network request delay (1.2 seconds)
      setTimeout(() => {
        // Clear inputs
        form.reset();
        
        // Remove active invalid states
        document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));

        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.style.opacity = '';

        // Trigger gorgeous victory Toast!
        showToast(
          "Enquiry Sent Successfully!",
          `Thank you ${userName}. Our designer will call you on ${userPhone} regarding ${chosenService} shortly!`,
          "circle-check"
        );
        
        console.log("Mock Enquiry Sent:", { name: userName, phone: userPhone, service: chosenService });
      }, 1200);

    } else {
      // Trigger error warning toast
      showToast(
        "Validation Error",
        "Please fix the red-highlighted errors on the contact form first.",
        "circle-exclamation"
      );
    }
  });


  /* 
    =========================================
    10. GOOGLE MAPS DEFERRED LAZY LOADER
    =========================================
  */
  const loadMapBtn = document.getElementById('loadMapBtn');
  const mapPlaceholder = document.getElementById('mapCardPlaceholder');
  const liveMapContainer = document.getElementById('liveMapContainer');

  const loadLiveGoogleMap = () => {
    // Beautiful Lucknow location map centered on Picnic Spot Road, Rahim Nagar showroom coords
    const addressUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.627685084931!2d80.95764377593674!3d26.883582461329243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a2fca7389%3A0xc3c5f49df42490ab!2sSociety%20Furniture!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
    
    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.src = addressUrl;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.allowFullscreen = "";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = "Society Furniture Showroom Location Lucknow Map";
    
    // Fade out placeholder card and append map
    mapPlaceholder.style.opacity = '0';
    setTimeout(() => {
      mapPlaceholder.style.display = 'none';
      liveMapContainer.appendChild(iframe);
      showToast("Showroom Map Loaded", "Standard live route navigation to Rahim Nagar active.", "map");
    }, 500);
  };

  if (loadMapBtn) {
    loadMapBtn.addEventListener('click', loadLiveGoogleMap);
  }


  /* 
    =========================================
    11. INTERSECTION OBSERVER SCROLL REVEAL
    =========================================
  */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed to maintain clean state
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // use viewport
    threshold: 0.1, // trigger when 10% visible
    rootMargin: "0px 0px -50px 0px" // trigger slightly before entering viewport fully
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });

});
