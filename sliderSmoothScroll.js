let sliderScroll = null;
let intervalScrooling = null;
let scrollIncrement = 50;
let isToScroll = false;
let sliderWidthLimitMin = 0;
let sliderWidthLimitMax = 0;
const hoverStyleLeft = "slider-scroll-hover-left";
const hoverStyleRight = "slider-scroll-hover-right";

window.addEventListener("load", () => {
    sliderScroll = document.querySelector("#slider-scroll");
    getSliderLimits();
});

window.addEventListener("resize", () => {
    getSliderLimits();
});

function verifyIfIsMobile() {
    return (window.innerWidth < 760);
}

function getSliderLimits(){
    const sliderWidth = sliderScroll.offsetWidth;
    sliderWidthLimitMin = sliderWidth * 5 / 100;
    sliderWidthLimitMax = sliderWidth * 95 / 100;
}

function handleMouseLeaveSlider(event) {
    window.clearInterval(intervalScrooling);
    intervalScrooling = null;
    removeSliderHoverStyle();
}

function smoothScroll(){
    if(isToScroll){
        sliderScroll.scrollBy(scrollIncrement, 0); 
    }
}

function removeSliderHoverStyle(){
    sliderScroll.classList.remove(hoverStyleLeft, hoverStyleRight);
}

function handleMouseMoveSlider(event){
    if (!event || verifyIfIsMobile()){
        return;
    }    
    const mouseX = event.clientX; 
    if (intervalScrooling == null){
        intervalScrooling = window.setInterval(() => { smoothScroll(); }, 100);
    }
    if (mouseX <= sliderWidthLimitMin && !(mouseX > sliderWidthLimitMin)){
        /* LEFT SIDE */        
        isToScroll = true;
        sliderScroll.classList.add(hoverStyleLeft);
        scrollIncrement = -Math.abs(scrollIncrement);
    }else if(mouseX >= sliderWidthLimitMax && !(mouseX < sliderWidthLimitMax)){
        /* RIGHT SIDE */
        isToScroll = true;
        sliderScroll.classList.add(hoverStyleRight);
        scrollIncrement = Math.abs(scrollIncrement);
    }else{
        isToScroll = false;
        window.clearInterval(intervalScrooling);
        removeSliderHoverStyle();
        intervalScrooling = null;
    }
}
