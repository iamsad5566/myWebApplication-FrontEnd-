export default function controller() {
        window.addEventListener('DOMContentLoaded', () => {
        let scrollPos = 0;
        const mainNav = document.getElementById('mainNav');
        const headerHeight = mainNav.clientHeight;
        window.addEventListener('scroll', function() {
            const currentTop = document.body.getBoundingClientRect().top * -1;
            if ( currentTop < scrollPos) {

                // Scrolling Up
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.remove('bg-dark');
                    mainNav.classList.add('is-visible', 'bg-light');
                } else {
                    mainNav.classList.remove('is-visible', 'is-fixed');
                    mainNav.classList.add("bg-dark")
                }
            } else {
                
                // Scrolling Down
                mainNav.classList.remove(['is-visible']);
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }
            scrollPos = currentTop;
        });
    })
}