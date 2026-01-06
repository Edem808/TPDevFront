document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector("nav");
    const sticky = navbar.offsetTop;

    window.onscroll = function () {
        if (window.scrollY >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    };
});
