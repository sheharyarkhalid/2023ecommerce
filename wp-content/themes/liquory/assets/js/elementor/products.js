(function($) {
    "use strict";
    $(window).on('elementor/frontend/init', () => {
        elementorFrontend.hooks.addAction('frontend/element_ready/liquory-products.default', ($scope) => {
            let carousel = $('.woocommerce-carousel ul', $scope),
                gallery = $('.gallery_item', $scope);
            if (carousel.length > 0) {
                let data = $('.woocommerce-carousel ', $scope).data('settings');
                let rtl = jQuery('body').hasClass('rtl') ? true : false;
                carousel.slick({
                    rtl: rtl,
                    dots: data.navigation == 'both' || data.navigation == 'dots' ? true : false,
                    arrows: data.navigation == 'both' || data.navigation == 'arrows' ? true : false,
                    infinite: data.infinite ? data.infinite : false,
                    slidesToShow: parseInt(data.items) ? parseInt(data.items) : 4,
                    autoplay: data.autoplay ? data.autoplay : false,
                    autoplaySpeed: parseInt(data.autoplaySpeed) ? parseInt(data.autoplaySpeed) : 8000,
                    slidesToScroll: parseInt(data.slidesToScroll) ? parseInt(data.slidesToScroll) : 1,
                    lazyLoad: 'ondemand',
                    centerMode: data.centerMode,
                    centerPadding: data.centerPadding,
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
                            breakpoint: parseInt(data.breakpoint_tablet) ? parseInt(data.breakpoint_tablet_extra) : 1024,
                            settings: {
                                slidesToShow: parseInt(data.items_tablet) ? parseInt(data.items_tablet_extra) : 3,
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

            if (gallery.length > 0) {
                $('.product-block .gallery_item').on('click', function(e) {
                    let $this = $(this),
                        $parent = $this.closest('.product-block'),
                        $image = $parent.find('.product-image > img'),
                        image = $this.data('image'),
                        scrset = $this.data('scrset');
                    $this.addClass('active');
                    $this.siblings('.active').removeClass('active');

                    $image.attr('src', image);
                    $image.attr('srcset', scrset);
                });

                $('.product-block-list .gallery_item').on('click', function(e) {
                    var image = $(this).data('image');
                    var $product = $(this).closest('li.product');
                    var $image = $product.find('.menu-thumb img');
                    $image.attr('src', image);
                    if ($(this).hasClass('active')) {
                        return;
                    }
                    $(this).parent().find('.active').removeClass('active');
                    $(this).addClass('active');
                });
            }
        });
    });

})(jQuery);