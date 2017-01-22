import  $ from './helper';

export  default  class Swiper {
    constructor(list) {
        this.options = {
            container: '#swiper',
            slidesContainer: 'div',
            slideClass: 'swiper-slide',
            slideContentClass: 'swiper-slide-content',

            interval: 3000,
            transitionSpeed: 400,
        };

        this.touch = window.ontouchstart !== undefined || (window.DocumentTouch && document instanceof DocumentTouch);

        this.list = list;
        this.num = list.length;
        this.initialize()
    }

    initialize() {
        this.index = 0;

        this.initWidget();
        this.initEventListeners();
        this.loadElements(0);
        this.play();
    }

    //循环
    circle(index) {
        return (this.num + (index % this.num)) % this.num
    }

    createElement(url) {
        let element = this.imagePrototype.cloneNode(false)
        element.draggable = false;
        element.src = url;

        $(element).addClass(this.options.slideContentClass);

        setTimeout(()=> {
            this.container[0].style.height = element.height + 'px';
        }, 100);
        return element
    }

    //加载
    loadElements(index) {
        let limit = Math.min(this.num, 2 * 2 + 1);
        let j = index;
        for (let i = 0; i < limit; i++) {
            j += i * (i % 2 === 0 ? -1 : 1);
            j = this.circle(j);
            this.slides[j].appendChild(this.createElement(this.list[j]))
        }
    }

    //初始化swiper
    initWidget() {

        this.container = $(this.options.container);

        this.slidesContainer = this.container.find(this.options.slidesContainer).first();

        this.positions = [];
        this.positions.length = this.num;

        this.imagePrototype = document.createElement('img');
        this.slidePrototype = document.createElement('div');
        $(this.slidePrototype).addClass(this.options.slideClass);


        this.slides = [];

        this.slideWidth = this.container[0].offsetWidth;

        this.slidesContainer[0].style.width = (this.num * this.slideWidth) + 'px';

        for (let i = 0; i < this.num; i += 1) {
            this.addSlide(i);
            this.positionSlide(i)
        }

        this.move(this.circle(this.index - 1), -this.slideWidth, 0);
        this.move(this.circle(this.index + 1), this.slideWidth, 0)
    }


    addSlide(index) {
        let slide = this.slidePrototype.cloneNode(false);
        this.slidesContainer[0].appendChild(slide);
        this.slides.push(slide);
    }

    positionSlide(index) {

        let slide = this.slides[index];
        slide.style.width = this.slideWidth + 'px';

        slide.style.left = (index * -this.slideWidth) + 'px';
        this.move(
            index, this.index > index
                ? -this.slideWidth
                : (this.index < index ? this.slideWidth : 0),
            0
        )
    }

    move(index, dist, speed) {
        this.translateX(index, dist, speed);
        this.positions[index] = dist
    }

    translateX(index, x, speed) {
        this.translate(index, x, 0, speed)
    }

    translate(index, x, y, speed) {
        let style = this.slides[index].style;
        style['transition-duration'] = speed + 'ms';
        style['transform'] = 'translate(' + x + 'px, ' + y + 'px)'
    }


    initEventListeners() {

        let slidesContainer = this.slidesContainer;

        let proxyListener = (event) => {
            let type = 'transitionend' === event.type ||
            'webkitTransitionEnd' === event.type
                ? 'transitionend'
                : event.type;
            this['on' + type](event)
        };

        if (this.touch) {
            slidesContainer
                .on('touchstart touchmove touchend', proxyListener)
        } else {
            slidesContainer
                .on('mousedown mousemove mouseup', proxyListener)
        }
        slidesContainer.on('transitionend', proxyListener);
        slidesContainer.on('webkitTransitionEnd', proxyListener);
        this.proxyListener = proxyListener
    }


    onmousedown(event) {

        event.preventDefault();
        (event.originalEvent || event).touches = [{
            pageX: event.pageX,
            pageY: event.pageY
        }];
        this.ontouchstart(event)
    }

    onmousemove(event) {
        if (this.touchStart) {
            (event.originalEvent || event).touches = [{
                pageX: event.pageX,
                pageY: event.pageY
            }];
            this.ontouchmove(event)
        }
    }

    onmouseup(event) {
        if (this.touchStart) {
            this.ontouchend(event)
            delete this.touchStart
        }
    }

    onmouseout(event) {
        if (this.touchStart) {
            let target = event.target
            let related = event.relatedTarget
            if (!related || (related !== target && !$.contains(target, related))) {
                this.onmouseup(event)
            }
        }
    }

    ontouchstart(event) {

        let touches = (event.originalEvent || event).touches[0];
        this.touchStart = {
            x: touches.pageX,
            y: touches.pageY,
            time: Date.now()
        };
        this.isScrolling = undefined;
        this.touchDelta = {}
    }

    ontouchmove(event) {

        event.preventDefault();

        let touches = (event.originalEvent || event).touches[0];
        let scale = (event.originalEvent || event).scale;

        if (touches.length > 1 || (scale && scale !== 1)) {
            return
        }

        this.touchDelta = {
            x: touches.pageX - this.touchStart.x,
            y: touches.pageY - this.touchStart.y
        };
        let touchDeltaX = this.touchDelta.x;

        if (this.isScrolling === undefined) {
            this.isScrolling = this.isScrolling || Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y)
        }
        if (!this.isScrolling) {
            window.clearTimeout(this.timeout)

            let indices = [
                this.circle(this.index + 1),
                this.index,
                this.circle(this.index - 1)
            ];

            while (indices.length) {
                let index = indices.pop();
                this.translateX(index, touchDeltaX + this.positions[index], 0)
            }
        }
    }

    ontouchend(event) {

        let index = this.index;
        let speed = this.options.transitionSpeed;
        let slideWidth = this.slideWidth;
        let isShortDuration = Number(Date.now() - this.touchStart.time) < 250;
        let isValidSlide = (isShortDuration && Math.abs(this.touchDelta.x) > 20) || Math.abs(this.touchDelta.x) > slideWidth / 2;


        let direction, indexForward, indexBackward, distanceForward, distanceBackward

        direction = this.touchDelta.x < 0 ? -1 : 1;

        if (!this.isScrolling) {
            if (isValidSlide) {
                indexForward = index + direction;
                indexBackward = index - direction;
                distanceForward = slideWidth * direction;
                distanceBackward = -slideWidth * direction;

                this.move(this.circle(indexForward), distanceForward, 0);
                this.move(this.circle(index - 2 * direction), distanceBackward, 0);
                this.move(index, this.positions[index] + distanceForward, speed)
                this.move(this.circle(indexBackward), this.positions[this.circle(indexBackward)] + distanceForward, speed);
                index = this.circle(indexBackward);
            } else {
                this.move(this.circle(index - 1), -slideWidth, speed);
                this.move(index, 0, speed);
                this.move(this.circle(index + 1), slideWidth, speed);
            }
            this.index = index;
        }
    }


    ontransitionend(event) {
        let slide = this.slides[this.index]
        if (!event || slide === event.target) {
            this.play()
        }
    }

    play() {
        window.clearTimeout(this.timeout);

        this.timeout = setTimeout(()=> {
            this.goto(this.index + 1)
        }, this.options.interval)
    }

    goto(to) {
        window.clearTimeout(this.timeout);
        let index = this.index;
        let speed = this.options.transitionSpeed;

        to = this.circle(to);
        let direction = -this.positions[to] / this.slideWidth;

        if (index === to || this.num === 1) {
            return
        }

        this.move(index, this.slideWidth * direction, speed);
        this.move(to, 0, speed);
        this.move(this.circle(to - direction), -(this.slideWidth * direction), 0);
        this.index = to;
    }
}