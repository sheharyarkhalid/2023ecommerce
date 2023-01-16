(function($) {
    "use strict";
    $.liquoryageCheck = function(options) {
        const settings = $.extend({
            minAge: 18,
            redirectTo: "",
            redirectOnFail: "",
            title: "Age Verification",
            description: "You must be of legal drinking age to buy our products. Age will be verified upon delivery through ID.",
            copy: "You must be [age] years old to enter.",
            btnYes: "YES",
            btnNo: "NO",
            successTitle: "Success!",
            successText: "You are now being redirected back to the site...",
            successMessage: "show",
            failTitle: "Sorry",
            failText: "You are not old enough to view this site...",
            failMessage: "show",
            cookieDays: 30,
            adminDebug: "",
            beforeContent: "",
            afterContent: "",
        }, options);

        const _this = {
            age: "",
            errors: [],
            setValues() {
                const month = $(".liquory-av .month").val();
                const day = $(".liquory-av .day").val();
                _this.month = month;
                _this.day = day.replace(/^0+/, ""); // remove leading zero
                _this.year = $(".liquory-av .year").val();
            },
            validate() {
                _this.errors = [];
                if (/^([0-9]|[12]\d|3[0-1])$/.test(_this.day) === false) {
                    _this.errors.push("Day is invalid or empty");
                }
                if (/^(19|20)\d{2}$/.test(_this.year) === false) {
                    _this.errors.push("Year is invalid or empty");
                }
                _this.clearErrors();
                _this.displayErrors();
                return _this.errors.length < 1;
            },
            clearErrors() {
                $(".errors").html("");
            },
            displayErrors() {
                let html = "<ul>";
                for (let i = 0; i < _this.errors.length; i++) {
                    html += `<li><span>x</span>${_this.errors[i]}</li>`;
                }
                html += "</ul>";
                setTimeout(() => {
                    $(".liquory-av .errors").html(html);
                }, 200);
            },
            reCenter(b) {
                b.css("top", `${Math.max(0, (($(window).height() - (b.outerHeight() + 150)) / 2))}px`);
                b.css("left", `${Math.max(0, (($(window).width() - b.outerWidth()) / 2))}px`);
            },
            buildHtml() {
                const copy = settings.copy;
                let html = "";
                let style = "";
                if (settings.bgImage !== "") {
                    style = "background-image: url(" + settings.bgImage + ")";
                }
                html += "<div class=\"liquory-av-overlay\"></div>";
                html += "<div class=\"liquory-av\" style=\"" + style + " \">";

                if (settings.beforeContent !== "") {
                    html += settings.beforeContent;
                }
                if (settings.imgLogo !== "") {
                    html += "<img src=\"" + settings.imgLogo + "\" alt=\"" + settings.title + "\" />";
                }
                if (settings.title !== "") {
                    html += `<h2>${settings.title}</h2>`;
                }
                if (settings.description !== "") {
                    html += `<p class="liquory-av-description">${settings.description}</p>`;
                }
                html += `<p class="liquory-av-copy">${copy.replace("[age]", `<strong>${settings.minAge}</strong>`)}`; +
                `</p>`;
                html += `<p><button class="yes">${settings.btnYes}</button><button class="no">${settings.btnNo}</button></p>`;
                if (settings.afterContent !== "") {
                    html += settings.afterContent;
                }
                html += "</div></div>";
                $("body").append(html);

                $(".liquory-av-overlay").animate({
                    opacity: 1,
                }, 500, () => {
                    _this.reCenter($(".liquory-av"));
                    $(".liquory-av").css({
                        opacity: 1,
                    });
                });

                $(".liquory-av .day, .liquory-av .year").focus(function() {
                    $(this).removeAttr("placeholder");
                });
            },
            setAge() {
                _this.age = "";
                _this.age = Math.abs(Date.now() - 1970);
            },
            setSessionStorage(key, val) {
                try {
                    sessionStorage.setItem(key, val);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            handleSuccess() {
                const successMsg = `<h2>${settings.successTitle}</h2><p>${settings.successText}</p>`;
                if (settings.messageTime != 0) {
                    $(".liquory-av").html(successMsg);
                }
                setTimeout(() => {
                    $(".liquory-av").animate({
                        top: "-350px",
                    }, settings.successTime, () => {
                        $(".liquory-av-overlay").animate({
                            opacity: "0",
                        }, settings.messageTime, () => {
                            if (settings.redirectTo !== "") {
                                window.location.replace(settings.redirectTo);
                            } else {
                                $(".liquory-av-overlay, .liquory-av").remove();
                            }
                        });
                    });
                }, settings.messageTime);
            },
            handleUnderAge() {
                const underAgeMsg = `<h2>${settings.failTitle}</h2><p>${settings.failText}</p>`;
                $(".liquory-av").html(underAgeMsg);
                if (settings.redirectOnFail !== "") {
                    setTimeout(() => {
                        window.location.replace(settings.redirectOnFail);
                    }, settings.messageTime);
                }
            },
        }; // end _this

        // Check for cookie and reture false if it's set.
        var cookiereader = readCookie("age-verification");
        if (cookiereader) {
            if (settings.adminDebug !== "") {
                eraseCookie("age-verification");
            } else {
                return false;
            }
        }

        // Create pop up.
        _this.buildHtml();

        // Successful "YES" button click.
        $(".liquory-av button.yes").on("click", () => {
            createCookie("age-verification", "true", settings.cookieDays);
            _this.handleSuccess();
        });

        // Successful "NO" button click.
        $(".liquory-av button.no").on("click", () => {
            _this.handleUnderAge();
        });

        $(window).resize(() => {
            _this.reCenter($(".liquory-av"));
            setTimeout(() => {
                _this.reCenter($(".liquory-av"));
            }, 500);
        });
    };
}(jQuery));