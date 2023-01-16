(function($) {
    'use strict';

    function login_dropdown() {
        $('.site-header-account').mouseenter(function() {
            $('.account-dropdown', this).append($('.account-wrap'));
        });
    }

    function handleWindow() {
        var body = document.querySelector('body');

        if (window.innerWidth > body.clientWidth + 5) {
            body.classList.add('has-scrollbar');
            body.setAttribute('style', '--scroll-bar: ' + (window.innerWidth - body.clientWidth) + 'px');
        } else {
            body.classList.remove('has-scrollbar');
        }
    }

    function minHeight() {
        var $body = $('body'),
            bodyHeight = $(window).outerHeight(),
            headerHeight = $('header.header-1').outerHeight(),
            footerHeight = $('footer.site-footer').outerHeight(),
            $adminBar = $('#wpadminbar');

        if ($adminBar.length > 0) {
            headerHeight += $adminBar.height();
        }

        if ($body.find('header.header-1').length) {

            $('.site-content').css({
                'min-height': bodyHeight - headerHeight - footerHeight - 90
            });
        }
    }

    function setPositionLvN($item) {
        var sub = $item.children('.sub-menu'),
            offset = $item.offset(),
            width = $item.outerWidth(),
            screen_width = $(window).width(),
            sub_width = sub.outerWidth();
        var align_delta = offset.left + width + sub_width - screen_width;
        if (align_delta > 0) {
            if ($item.parents('.menu-item-has-children').length) {
                sub.css({
                    left: 'auto',
                    right: '100%'
                });
            } else {
                sub.css({
                    left: 'auto',
                    right: '0'
                });
            }
        } else {
            sub.css({
                left: '',
                right: ''
            });
        }
    }

    function initSubmenuHover() {
        $('.site-header .primary-navigation .menu-item-has-children').hover(function(event) {
            var $item = $(event.currentTarget);
            setPositionLvN($item);
        });
    }

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 200) {
            jQuery('.scrollup').fadeIn().addClass('activate');
        } else {
            jQuery('.scrollup').fadeOut().removeClass('activate');
        }
    });
    jQuery('.scrollup').on('click', function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    function liquory_carousel() {
        let carousel_wrap = $('.liquory-theme-carousel'),
            carousel = carousel_wrap.find('ul');

        if (carousel.length > 0) {
            let data = carousel_wrap.data('settings'),
                rtl = $('body').hasClass('rtl') ? true : false;
            carousel.slick({
                rtl: rtl,
                dots: data.navigation == 'both' || data.navigation == 'dots' ? true : false,
                arrows: data.navigation == 'both' || data.navigation == 'arrows' ? true : false,
                infinite: parseInt(data.loop) ? parseInt(data.loop) : false,
                slidesToShow: parseInt(data.items) ? parseInt(data.items) : 4,
                autoplay: data.autoplay ? data.autoplay : false,
                autoplaySpeed: parseInt(data.autoplaySpeed) ? parseInt(data.autoplaySpeed) : 8000,
                slidesToScroll: parseInt(data.slidesToScroll) ? parseInt(data.slidesToScroll) : 1,
                lazyLoad: 'ondemand',
                responsive: [{
                        breakpoint: parseInt(data.breakpoint_laptop) ? parseInt(data.breakpoint_laptop) : 1366,
                        settings: {
                            slidesToShow: parseInt(data.items_laptop) ? parseInt(data.items_laptop) : 4,
                        }
                    },
                    {
                        breakpoint: parseInt(data.breakpoint_tablet_extra) ? parseInt(data.breakpoint_tablet_extra) : 1200,
                        settings: {
                            slidesToShow: parseInt(data.items_tablet_extra) ? parseInt(data.items_tablet_extra) : 3,
                        }
                    },
                    {
                        breakpoint: parseInt(data.breakpoint_tablet) ? parseInt(data.breakpoint_tablet_extra) : 1024,
                        settings: {
                            slidesToShow: parseInt(data.items_tablet) ? parseInt(data.items_tablet_extra) : 3,
                        }
                    },
                    {
                        breakpoint: parseInt(data.breakpoint_mobile_extra) ? parseInt(data.breakpoint_mobile_extra) : 880,
                        settings: {
                            slidesToShow: parseInt(data.items_mobile_extra) ? parseInt(data.items_mobile_extra) : 2,
                        }
                    },
                    {
                        breakpoint: parseInt(data.breakpoint_mobile) ? parseInt(data.breakpoint_mobile) : 767,
                        settings: {
                            slidesToShow: parseInt(data.items_mobile) ? parseInt(data.items_mobile) : 1,
                        }
                    },
                    {
                        breakpoint: 425,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            }).on('setPosition', function(event, slick) {
                slick.$slides.css('height', slick.$slideTrack.height() + 'px');
                carousel.find(".slick-slide").css('height', slick.$slideTrack.height() + 'px');
                carousel.find(".product-block").css('height', slick.$slideTrack.height() + 'px');
            });

        }
    }

    initSubmenuHover();
    minHeight();
    handleWindow();
    login_dropdown();
    liquory_carousel();
})(jQuery);

function liquory_slick_carousel_init($class, $data) {
    // For Carousel Slider
    let data = $data,
        rtl = jQuery('body').hasClass('rtl') ? true : false;
    $class.slick({
        rtl: rtl,
        dots: data.navigation == 'both' || data.navigation == 'dots' ? true : false,
        arrows: data.navigation == 'both' || data.navigation == 'arrows' ? true : false,
        infinite: data.infinite ? data.infinite : false,
        slidesToShow: parseInt(data.items) ? parseInt(data.items) : 4,
        autoplay: data.autoplay ? data.autoplay : false,
        autoplaySpeed: parseInt(data.autoplaySpeed) ? parseInt(data.autoplaySpeed) : 8000,
        slidesToScroll: parseInt(data.slidesToScroll) ? parseInt(data.slidesToScroll) : 1,
        lazyLoad: 'ondemand',
        centerMode: data.centerMode ? data.centerMode : false,
        variableWidth: data.variableWidth ? data.variableWidth : false,
        centerPadding: data.centerPadding ? data.centerPadding : '50px',
        responsive: [{
                breakpoint: parseInt(data.breakpoint_laptop) ? parseInt(data.breakpoint_laptop) : 1366,
                settings: {
                    slidesToShow: parseInt(data.items_laptop) ? parseInt(data.items_laptop) : 4,
                    centerPadding: data.centerPadding_laptop ? data.centerPadding_laptop : '0px',
                }
            },
            {
                breakpoint: parseInt(data.breakpoint_tablet_extra) ? parseInt(data.breakpoint_tablet_extra) : 1200,
                settings: {
                    slidesToShow: parseInt(data.items_tablet_extra) ? parseInt(data.items_tablet_extra) : 3,
                    centerPadding: data.centerPadding_extra ? data.centerPadding_extra : '0px',
                }
            },
            {
                breakpoint: parseInt(data.breakpoint_tablet) ? parseInt(data.breakpoint_tablet) : 1024,
                settings: {
                    slidesToShow: parseInt(data.items_tablet) ? parseInt(data.items_tablet) : 3,
                    centerPadding: data.centerPadding_tablet ? data.centerPadding_tablet : '0px',
                }
            },
            {
                breakpoint: parseInt(data.breakpoint_mobile_extra) ? parseInt(data.breakpoint_mobile_extra) : 880,
                settings: {
                    slidesToShow: parseInt(data.items_mobile_extra) ? parseInt(data.items_mobile_extra) : 2,
                    centerPadding: data.centerPadding_mobile_extra ? data.centerPadding_mobile_extra : '0px',
                }
            },
            {
                breakpoint: parseInt(data.breakpoint_mobile) ? parseInt(data.breakpoint_mobile) : 767,
                settings: {
                    slidesToShow: parseInt(data.items_mobile) ? parseInt(data.items_mobile) : 1,
                    centerPadding: data.centerPadding_mobile ? data.centerPadding_mobile : '0px',
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });
}