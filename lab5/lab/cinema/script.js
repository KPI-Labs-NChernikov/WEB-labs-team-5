'use strict';

let $posters = $(".poster");
let $postersSlider = $('.posters');
let currentPosterNumber = 0;
let posterLock = false;

function getPrevPosterNumber() {
    return currentPosterNumber < 1 ? $posters.length - 1 : currentPosterNumber - 1;
}

function getNextPosterNumber() {
    return currentPosterNumber > $posters.length - 2 ? 0 : currentPosterNumber + 1;
}

function scrollPosterRight() {
    if (posterLock)
        return;
    posterLock = true;
    let animationSpeed = 1000;  
    if (currentPosterNumber == $posters.length - 1)  
    {
        let $clone = $posters.eq(0).clone();
        $clone.appendTo($postersSlider);
        $clone.addClass('active');
        $postersSlider.animate({'margin-left': '-=100vw'}, animationSpeed, function() {
            $postersSlider.css({'margin-left': '0'});
            $posters.eq(currentPosterNumber).removeClass('active');
            $posters.eq(getNextPosterNumber()).addClass('active');
            $clone.removeClass('active');
            $clone.remove();
            currentPosterNumber = getNextPosterNumber();
            posterLock = false;
        });
    }
    else {
        $posters.eq(getNextPosterNumber()).addClass('active');
        $postersSlider.animate({'margin-left': '-=100vw'}, animationSpeed, function() {
            $postersSlider.css({'margin-left': '0'});
            $posters.eq(currentPosterNumber).removeClass('active');
            currentPosterNumber = getNextPosterNumber();
            posterLock = false;
        });
    }
}

function scrollPosterLeft() {
    if (posterLock)
        return;
    posterLock = true;
    let animationSpeed = 1000; 
    if (currentPosterNumber == 0)   
    {
        let $clone = $posters.eq($posters.length - 1).clone();
        $clone.prependTo($postersSlider);
        $clone.addClass('active');
        $postersSlider.css({'margin-left': '-=100vw'});
        $postersSlider.animate({'margin-left': '+=100vw'}, animationSpeed, function() {
            $postersSlider.css({'margin-left': '0'});
            $posters.eq(currentPosterNumber).removeClass('active');
            $posters.eq(getPrevPosterNumber()).addClass('active');
            $clone.removeClass('active');
            $clone.remove();
            currentPosterNumber = getPrevPosterNumber();
            posterLock = false;
        });
    }
    else
    {
        $posters.eq(getPrevPosterNumber()).addClass('active');
        $postersSlider.css({'margin-left': '-=100vw'});
        $postersSlider.animate({'margin-left': '+=100vw'}, animationSpeed, function() {
            $postersSlider.css({'margin-left': '0'});
            $posters.eq(currentPosterNumber).removeClass('active');
            currentPosterNumber = getPrevPosterNumber();
            posterLock = false;
        });
    }
}

function changePosterOnInterval() {
    const delay = 20000;
    let timerId = setInterval(function() {
        scrollPosterRight();
    }, delay);
}

let lastSegmentsNumber;

let $newMoviesSlider = $('#carousel-1');
let $newMovies = $('#carousel-1 .filmBlock');
let currentNewMovieNumber = 0;
let newMovieLock = false;

let $shortsSlider = $('#carousel-2');
let $shorts = $('#carousel-2 .filmBlock');
let currentShortNumber = 0;
let shortLock = false;

var isPhone = window.matchMedia("(max-width: 650px)");
var isTablet = window.matchMedia("(max-width: 1200px)");
var isNotUltrawide = window.matchMedia("(max-width: 1400px)");

function getCarouselSegmentsNumber() {
    let number = 6;
    if (isPhone.matches)
        number = 1;
    else if (isTablet.matches)
        number = 3;
    else if (isNotUltrawide.matches)
        number = 5;
    return number;
}

function changeCarousels() {
    if (lastSegmentsNumber != getCarouselSegmentsNumber())
    {
        $('#triangleRight2').removeClass('disabled');
        $('#triangleRight3').removeClass('disabled');
        lastSegmentsNumber = getCarouselSegmentsNumber();
        currentNewMovieNumber = 0;
        currentShortNumber = 0;
        $('#triangleLeft2').addClass('disabled');
        $('#triangleLeft3').addClass('disabled');
        if ($newMovies.length == getCarouselSegmentsNumber())
            $('#triangleRight2').addClass('disabled');
        if ($shorts.length == getCarouselSegmentsNumber())
            $('#triangleRight3').addClass('disabled');
        $newMoviesSlider.css({'margin-left' : '0'});
        $shortsSlider.css({'margin-left' : '0'});
    }
}

function getPrevCarouselNumber(current, length) {
    return current < 1 ? length - 1 : current - 1;
}

function scrollNewMoviesRight() {
    if (newMovieLock)
        return;
    else if (currentNewMovieNumber + getCarouselSegmentsNumber() > $newMovies.length - 1)
        return;
    newMovieLock = true;
    if (currentNewMovieNumber == 0)
        $('#triangleLeft2').removeClass('disabled');
    else if (currentNewMovieNumber + getCarouselSegmentsNumber() == $newMovies.length - 1)
        $('#triangleRight2').addClass('disabled');
    let animationSpeed = 1000;  
    $newMoviesSlider.animate({'margin-left': '-=' + ($newMovies.eq(currentNewMovieNumber).width() + 4) + 'px'}, animationSpeed, function() {
        currentNewMovieNumber++;
        newMovieLock = false;
    });
}

function scrollNewMoviesLeft() {
    if (newMovieLock)
        return;
    else if (currentNewMovieNumber < 1)
        return;
    newMovieLock = true;
    if (currentNewMovieNumber + getCarouselSegmentsNumber() == $newMovies.length)
        $('#triangleRight2').removeClass('disabled');
    else if (currentNewMovieNumber == 1)
        $('#triangleLeft2').addClass('disabled');
    let animationSpeed = 1000;  
    $newMoviesSlider.animate({'margin-left': '+=' + ($newMovies.eq(currentNewMovieNumber).width() + 4) + 'px'}, animationSpeed, function() {
        currentNewMovieNumber--;
        newMovieLock = false;
    });
}

function scrollShortsRight() {
    if (shortLock)
        return;
    else if (currentShortNumber + getCarouselSegmentsNumber() > $shorts.length - 1)
        return;
    shortLock = true;
    if (currentShortNumber == 0)
        $('#triangleLeft3').removeClass('disabled');
    else if (currentShortNumber + getCarouselSegmentsNumber() == $shorts.length - 1)
        $('#triangleRight3').addClass('disabled');
    let animationSpeed = 1000;  
    $shortsSlider.animate({'margin-left': '-=' + ($shorts.eq(currentShortNumber).width() + 4) + 'px'}, animationSpeed, function() {
        currentShortNumber++;
        shortLock = false;
    });
}

function scrollShortsLeft() {
    if (shortLock)
        return;
    else if (currentShortNumber < 1)
        return;
    shortLock = true;
    if (currentShortNumber + getCarouselSegmentsNumber() == $shorts.length)
        $('#triangleRight3').removeClass('disabled');
    else if (currentShortNumber == 1)
        $('#triangleLeft3').addClass('disabled');
    let animationSpeed = 1000;  
    $shortsSlider.animate({'margin-left': '+=' + ($shorts.eq(currentShortNumber).width() + 4) + 'px'}, animationSpeed, function() {
        currentShortNumber--;
        shortLock = false;
    });
}

$(function() {
    changePosterOnInterval();
    window.addEventListener('resize', changeCarousels);
    window.addEventListener("orientationchange", changeCarousels);
    changeCarousels();
});