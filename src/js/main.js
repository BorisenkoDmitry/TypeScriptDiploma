document.addEventListener("DOMContentLoaded", function () {
    let slider = document.getElementById('range-play');

    noUiSlider.create(slider, {
        start: 40,
        connect: 'lower',
        animate: true, 
        range: {
            'min': 0,
            'max': 100
        }
    });
    let slider2 = document.getElementById('range-value');

    noUiSlider.create(slider2, {
        start: 40,
        connect: 'lower',
        animate: true, 
        range: {
            'min': 0,
            'max': 100
        }
    });

    function $(el) {
        if (document.querySelectorAll(el).length > 1) {
           return document.querySelectorAll(el);
        } else {
            return document.querySelector(el);
        }
    }

    document.addEventListener("click", function(e) {
        let target = e.target;
        let btn = $(".search__btn-open");
        if(btn.contains(target)) {
            
            $(".header__search").classList.toggle("search--active");
            
        }
        if (!btn.contains(target) && !$(".header__search").contains(target)) {
            $(".header__search").classList.remove("search--active");
            $(".header__search__field").value = "";
        }
    })

    $(".aside__tabs-btn").forEach(el => {
        el.addEventListener("click", function(e) {
            let path = e.currentTarget.getAttribute("data-path");
            document.querySelectorAll(".tabs-content").forEach(el => el.classList.remove("section--active"))
            console.log(document.querySelector(`[data-target=${path}]`))
            document.querySelector(`[data-target=${path}]`).classList.add("section--active");
        })
    })
    
    function tabsMove(element, Class) {
        $(element).forEach(el => {
            el.addEventListener("click", function() {
                $(element).forEach(item => item.classList.remove(Class))
                this.classList.add(Class);
            })
        })
    }
    tabsMove(".aside__btn", "aside__btn-active");
    $(".track__like-btn").forEach( el => {
        el.addEventListener("click", function() {this.classList.toggle("like-btn--active")});
    })
    $(".track__btn-dropdown").forEach(el => {
        el.addEventListener("click", function() {
            let btn = this;
            let dropdown = this.parentElement.querySelector(".track__dropdown");
            $(".track__btn-dropdown").forEach(el => el.classList.remove("btn-dropdown--active") );
            $(".track__dropdown").forEach(el => el.classList.remove("dropdown--active") );
            btn.classList.add("btn-dropdown--active");
            dropdown.classList.add("dropdown--active");
            dropdown.querySelectorAll("button").forEach(item => {
                item.addEventListener("click", function() {
                    dropdown.classList.remove("dropdown--active");
                    btn.classList.remove("btn-dropdown--active")
                });
            })
        })
    })
})