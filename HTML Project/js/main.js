
// Variables

    var overlay = {
        element : document.createElement("div"),
        image : document.createElement("img"),
        leftArrow: document.createElement("div"),
        leftChevron: document.createElement("img"),
        rightArrow: document.createElement("div"),
        rightChevron: document.createElement("img"),
        exit: document.createElement("div"),
    }
    overlay.element.setAttribute('id', 'overlay');
    overlay.image.setAttribute('id', 'overlay-image');
    overlay.leftArrow.setAttribute('id', 'leftArrow');
        overlay.leftChevron.setAttribute('src', 'img/left-chevron.png');
        overlay.leftArrow.appendChild(overlay.leftChevron);
    overlay.rightArrow.setAttribute('id', 'rightArrow');
        overlay.rightChevron.setAttribute('src', 'img/right-chevron.png');
        overlay.rightArrow.appendChild(overlay.rightChevron);
    overlay.exit.setAttribute('id', 'exit');

    var documentElements = {
        imageArray: document.getElementsByTagName('img')
    }


// Event Listeners

    // (1) Click on Image

        for (var i =0; i < document.getElementsByTagName("img").length; i ++ ){
            document.getElementsByTagName("img")[i].addEventListener('click', addoverlay, false);
        }

    // (2) Click on overlay

        overlay.element.addEventListener('click', function(){
            console.log('hide overlay')
            overlay.element.style.display = 'none';
            overlay.leftArrow.style.display = 'none';
            overlay.rightArrow.style.display = 'none';
            for(var i = 0; i < documentElements.imageArray.length; i ++) {
            documentElements.imageArray[i].removeAttribute('id');
            }
        })

    // (3) Click on arrows

        overlay.rightChevron.addEventListener('click', goToNext);
        overlay.leftChevron.addEventListener('click', goToPrevious);

// Functions

    // PRELIMINARY: Add Elements for overlay
            overlay.element.appendChild(overlay.image);
            overlay.element.appendChild(overlay.exit);
            document.getElementById('arrows').appendChild(overlay.rightArrow);
            document.getElementById('arrows').appendChild(overlay.leftArrow);
            document.body.appendChild(overlay.element);

    // (1) "addoverlay"

            function addoverlay () {
                overlay.rightArrow.style.display = 'flex';
                overlay.leftArrow.style.display = 'flex';
                for(var i = 0; i < documentElements.imageArray.length; i ++) {
                documentElements.imageArray[i].removeAttribute('id');
                }
                this.setAttribute('id', 'current');
                var imagesrc = this.getAttribute('src');
                console.log(imagesrc);
                document.getElementById('overlay').style.display = 'flex';
                overlay.image.setAttribute('src', imagesrc);
            }
    // (2) "goToNext"

            function goToNext () {
                console.log('goToNext');
                var gallery = [];
                var currentImage = document.getElementById('current');
                for(var i = 0; i < documentElements.imageArray.length; i ++) {
                documentElements.imageArray[i].removeAttribute('id');
                    if (documentElements.imageArray[i].classList.contains('gallery')) {
                        gallery.push.documentElements.imageArray[i];
                    }
                }
                var parentImage = currentImage.parentElement.parentElement; // goes from current image, to <a>, to <li>
                var nextImage = parentImage.nextElementSibling.children[0].children[0]; // goes from parent <li> of CI to (1) next <li>, to (2) <a> child, to (3) <img> children
                nextImage.setAttribute('id', 'current');
                var imagesrc = nextImage.getAttribute('src');
                if (currentImage === gallery[gallery.length]) {
                    var firstImage = gallery[0].getAttribute('src');
                    overlay.image.setAttribute('src', firstImage);
                } else {
                    overlay.image.setAttribute('src', imagesrc);
                }
                debugger;
            }

    // (2) "goToPrevious"

            function goToPrevious () {
                console.log('goToPrevious');
                var currentImage = document.getElementById('current');
                var parent = currentImage.parentElement.parentElement; // goes from current image, to <a>, to <li>
                var previousImage = parent.previousElementSibling.children[0].children[0]; // goes from parent <li> of CI to (1) next <li>, to (2) <a> child, to (3) <img> children
                for(var i = 0; i < documentElements.imageArray.length; i ++) {
                documentElements.imageArray[i].removeAttribute('id');
                }
                previousImage.setAttribute('id', 'current');
                var imagesrc = previousImage.getAttribute('src');
                if (currentImage === gallery[0]) {
                   var lastImage = gallery[gallery.length].getAttribute('src');
                   overlay.image.setAttribute('src', lastImage);
               } else {
                overlay.image.setAttribute('src', imagesrc);
                }
            }
