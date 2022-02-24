(function ($) {
    "use strict";

    var doha_drama_award = {

        /* ============================================================ */
        /* PRELOADER
        /* ============================================================ */
        preloader: function(){
            $(window).on('load', function() {
                $(".preloader").fadeOut();     
            });
        },

        /* ============================================================ */
        /* Sticky Menu
        /* ============================================================ */
        sticky_menu: function() {
            var fixed_top = $("header");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 100) {
                    fixed_top.addClass("sticky");
                } else {
                    fixed_top.removeClass("sticky");
                }
            });
        },
        /* ============================================================ */
        /*  functions init
        /* ============================================================ */
        func_init: function() {
            //Focus on search input if search button is clicked when text input is empty
            $(".header-controls .search-form button").click(function (e) {
                var searchTextInput = $(".header-controls .search-form input[type='text']");
                if (searchTextInput.val() === "") {
                    e.preventDefault();
                    searchTextInput.focus();
                }        
            });                  
            
            // Horizontal Menu
            $(window).scroll(function(){
                var docHome = $('.hero-section').length;

                if ($(this).scrollTop() > 50) {
                   $('.navigation_horizontal').addClass('colapse');
                }
                else {
                    $('.navigation_horizontal').removeClass('colapse bottom').addClass('top');
                   if (docHome == true) {
                        $('.navigation_horizontal').removeClass('colapse top').addClass('bottom');                        
                   }
                }
            });

            $('.header_nav_toggle').click(function() {
                $('.navigation_horizontal').addClass('top').removeClass('bottom colapse').toggleClass('hidden');
            })
            $(window).scroll(function() {
                var docHome = $('.hero-section').length;
                var scroll = $(window).scrollTop();

                if ( scroll == 0 && docHome==true) {
                    $(".navigation_horizontal").removeClass("hidden");                    
                } else {
                    $(".navigation_horizontal").addClass("hidden");  
                }
            });

            // Video Play on Winner Single Page
            var winnerVideo = $('.winner-video').length;
            if (winnerVideo) {
                var video = document.getElementById("winner-video");
                video.volume = 0.3; // Default Volume
                var circlePlayButton = document.getElementById("circle-play-b");
    
                function togglePlay() {
                    if (video.paused || video.ended) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
    
                circlePlayButton.addEventListener("click", togglePlay);
                video.addEventListener("playing", function () {
                    circlePlayButton.style.opacity = 0;
                });
                video.addEventListener("pause", function () {
                    circlePlayButton.style.opacity = 1;
                });
            }

        },

        verticle_menu_mobile: function () {

            /*Toggle menu*/
            $(".header_nav_toggle").click(function(){                
                if ($(".navigation-vertical").attr("data-state") == "closed") {                
                    toggleVerticalMenu(true);			
                }
                else{			
                    toggleVerticalMenu(false);			
                }	
            });
            function toggleVerticalMenu(toggle)	{
		
                const targetElement = document.querySelector(".navigation-vertical-links");
        
                if (toggle) {
                    $(".navigation-vertical").css("width", "100%");
                    $(".navigation-vertical").css("filter", "brightness(100%)");
                    $(".navigation-vertical").attr("data-state", "open");
        
                    /*if a submenu is active open it without transition effects */
                    var activeSubmenu = $(".navigation-vertical-submenu.active");
                    toggleVerticalMenuSecondLevel(true, activeSubmenu.attr("data-name"), false);
                     
                    $("body").toggleClass("mobile-menu-open", true);
        
                }
                else{
                    $(".navigation-vertical").css("filter", "brightness(0)");
                    $(".navigation-vertical").css("width", "0%");
                    $(".navigation-vertical").attr("data-state", "closed");
        
                    var scrollpos = parseInt($('body').css('top'), 10);
                    $("body").toggleClass("mobile-menu-open", false);
               
                    //also close all second level menus and the accessibility panel
                    toggleVerticalMenuSecondLevel(false, "", false);
                }		
            }
                
            function toggleVerticalMenuSecondLevel(toggle, name, animate){		
                
                if (toggle) {		
                    var secondLevel = $(".navigation-submenus").find(".navigation-submenu[data-name='" + name + "']");	
                    secondLevel.css("left", "0");
                    secondLevel.css("display", "block");
                }
                else{
                    //close every submenu regardless of name
                    if (animate) {
                        $(".navigation-vertical").find(".navigation-submenu").css("left", "-100vw");
                    }			
                    else
                    {
                        $(".navigation-vertical").find(".navigation-submenu")
                          .delay(500)
                          .queue(function (next) { 
                            $(".navigation-vertical").find(".navigation-submenu").css("left", "-100vw");
                            next(); 
                        });
                    }
                }        
            }
        
            $(".nav-submenu-back").click(function(){
                //console.log("close submenu");
                $(this).parent().css("left", "-100vw");		
                return false;
            });
            
        
            $(document).on('click', ".nav-submenu-links a", function (e) {        
                e.stopPropagation();
            });
        
            $(document).on('click', ".navigation-links > ul > li", function (e) {        
                var name = $(this).attr("data-name");        
                toggleVerticalMenuSecondLevel(true, name);
                return false;
            });
        
            $(".navigation-vertical").click(function(e) {	  
              if (e.target !== this)
                return;
              
              toggleVerticalMenu(false);
            });
        },

        /* ============================================================ */
        /* Swiper Slider Init
        /* ============================================================ */
        swiperCarousel: function () {
            var journey_roadmap = new Swiper('.journey-slider', {
                slidesPerView: 1,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next.journey-nev',
                    prevEl: '.swiper-button-prev.journey-nev',
                },
                breakpoints: {   
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 992px
                    992: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 1200px
                    1200: {
                        slidesPerView: 4,
                    },
                }
            });

            var featuredNews = new Swiper('.featured-news', {
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },              
            });
            var WinnerCarousel = new Swiper('.winner-dda-carousel', {
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                breakpoints: {   
                    // when window width is >= 576px
                    576: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 992px
                    992: {
                        slidesPerView: 4,
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },              
            }); 
                 
            var photo_galleryThumbs = new Swiper('.p_gallery_thumbnail', {                
                slidesPerView: 3,
                spaceBetween: 6,
                autoplay: true,
                autoplay: {
                    delay: 5000,
                },
                breakpoints: {   
                    // when window width is >= 576px
                    540: {
                        slidesPerView: 4,
                        spaceBetween: 6,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 6,
                    },
                }              
            });
            var photo_gallery = new Swiper('.p_gallery_content', {
                slidesPerView: 1,
                loop: true,
                autoplay: true,
                autoplay: {
                    delay: 5000,
                },
                thumbs: {
                    swiper: photo_galleryThumbs,
                },
            });                      
            
            var vGalleryThumbs = new Swiper('.v_gallery_thumbnail', {
                spaceBetween: 6,
                slidesPerView: 3,
                breakpoints: {
                    540: {
                        slidesPerView: 4,
                        spaceBetween: 6,
                    },
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 6,
                    },
                }
            });
            var video_Gallery = new Swiper('.v_gallery_content', {
                slidesPerView: 1,
                thumbs: {
                    swiper: vGalleryThumbs,
                },
            });
            var meetConv = new Swiper('.meet-conv', {
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }, 
            });
            var activities = new Swiper('.activities', {
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }, 
            });
            
        },

        /* ============================================================ */
        /* Background Image
        /* ============================================================ */
        background_image: function() {
            $("[data-bg-color], [data-bg-image]").each(function() {
                var $this = $(this);               
    
                if(  $this.attr("data-bg-color") !== undefined ){                        
                    $this.css("background-color", $this.attr("data-bg-color") );
                }
                if( $this.attr("data-bg-image") !== undefined ){
                    $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );    
                    $this.css("background-size", $this.attr("data-bg-size") );
                    $this.css("background-repeat", $this.attr("data-bg-repeat") );
                    $this.css("background-position", $this.attr("data-bg-position") );
                    $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                }
            });
        },

        initializ: function() {
			doha_drama_award.preloader();
			doha_drama_award.sticky_menu();
			doha_drama_award.func_init();
			doha_drama_award.verticle_menu_mobile();
			doha_drama_award.background_image();
			doha_drama_award.swiperCarousel();
		}
    };
    $(function() {
		doha_drama_award.initializ();
	});

})(jQuery);