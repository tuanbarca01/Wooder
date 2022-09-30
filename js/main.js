// back to top:
document.querySelector('.back-to-top').addEventListener('click', function(e){
        e.preventDefault();
        window.scrollBy({
                top: -document.body.offsetHeight,
                behavior: 'smooth'
        })
})

window.addEventListener('scroll', function(){
        let scrollTop = document.querySelector('html').scrollTop;
        if (scrollTop > 500){
                document.querySelector('.back-to-top').style.display = 'block'
        } else {
                document.querySelector('.back-to-top').style.display = 'none'
        }
})


// scroll doi mau header:
let $slider = document.querySelector('.slider');
let $header = document.querySelector('header');
window.addEventListener('scroll', function() {
        let scrollTop = document.querySelector('html').scrollTop;
        console.log(scrollTop);
        if (scrollTop > $slider.offsetHeight - $header.offsetHeight) {
                $header.style.background = 'black'
        } else {
                $header.style.background = 'transparent'
        }
})

//Video :
document.querySelectorAll('.quality .play--button').forEach((e) =>{
        e.addEventListener('click', function (e) {
                document.querySelector('.popup_video').style.display = 'flex'
        })
    })
document.querySelector('.popup_video .close').addEventListener('click', function () {
        document.querySelector('.popup_video').style.display = 'none'
    })

//Slider
let $sliderItems = document.querySelectorAll('.slider__item');
let $sliderDot = document.querySelectorAll('.slider .dot ul li')
let sliderCurrent = 0;
let sliderNumber = document.querySelector('.slider .number')

document.querySelector('.slider .btnctr--prev').addEventListener('click', function () {
        console.log('prev')
        if(sliderCurrent > 0){
                $sliderItems[sliderCurrent].classList.remove('slider-active')
                $sliderItems[sliderCurrent - 1].classList.add('slider-active')
                sliderCurrent--;
        }
        sliderNumber.innerText = (sliderCurrent + 1).toString().padStart(2, '0')
})

document.querySelector('.slider .btnctr--next').addEventListener('click', function () {
        console.log(sliderCurrent)
        if(sliderCurrent < $sliderItems.length - 1){
                $sliderItems[sliderCurrent].classList.remove('slider-active')
                $sliderItems[sliderCurrent + 1].classList.add('slider-active')
                sliderCurrent++;
        }
        sliderNumber.innerText = (sliderCurrent + 1).toString().padStart(2, '0')
})


// Scroll tới section:
$(window).on('scroll', function (){
        
})




//Photoswipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};


    initPhotoSwipeFromDOM('.gallery__carousel');



//Flickity
$(window).load(function(){
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        freeScroll: true
    });
})

