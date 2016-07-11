import {Component, OnInit, OnDestroy} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';
import {NavComponent} from '../nav/nav.component';
import {PortfolioComponent} from '../portfolio/portfolio.component';
import {ExperienceComponent} from '../experience/experience.component';
import {BioComponent} from '../bio/bio.component';

@Component({
  selector: 'home-1',
  template: require('./home1.component.html'),
  styles: [require('./home1.component.css')],
  directives: [NavComponent, PortfolioComponent, ExperienceComponent, BioComponent]
})

export class Home1Component{
	currentSlide = 1;
	slideNum = 2;
	currentTitle = 1;
	titleNum = 5;
	slideColors = ['rgba(152, 202, 230,0.98)', 'rgba(26, 55, 66, 0.9)', 'rgba(46, 53, 46,0.98)'];
	backgroundColors = ['rgba(105, 178, 220, 0.35)', 'rgba(0,0,0,0.35)', 'rgba(30, 67, 67,0.6)'];
	filterColors = ['rgba(85, 178, 220, 0.35)'];
	fullScreen = true;
	private _animating = false;
	private _slideAnimationInterval: any;
	private _progressBarInterval: any;
	private _progressTitleInterval: any;

	ngOnInit() { this.initialize(true); }
	ngOnDestroy() { this.cleanUp(); }

	initialize(first) {
		if(first){
			window.setTimeout(function(){
				this.revertFullScreenAnimation();
			}.bind(this), 1000)
		} else {
			this._startSlideAnimationInterval();
			this._startProgressBarInterval();
			this._startProgressTitleInterval();
		}
	}

	cleanUp() {
		if(this._slideAnimationInterval){ clearInterval(this._slideAnimationInterval);}
		if(this._progressBarInterval){clearInterval(this._progressBarInterval);}
		if(this._progressTitleInterval){clearInterval(this._progressTitleInterval);}
	}	

	startFullScreenAnimation(){
		if(this._animating){return;}
		if(!this.fullScreen){
			this._animating = true;
			this.cleanUp();
			var animationLayer = $('.js-shape');
			this.fullScreen = true;
			window.setTimeout(function(){this._animationLayerStepTwo(animationLayer)}.bind(this), 0);
			window.setTimeout(function(){this._animationLayerStepThree(animationLayer)}.bind(this), 600);
			window.setTimeout(function(){this._animationLayerStepFour(animationLayer)}.bind(this), 1400);
			window.setTimeout(function(){this._toggleLayer('.scroller-container', 'slide');}.bind(this), 1200);
			window.setTimeout(function(){this._toggleLayer('.scroller-container', 'active');}.bind(this), 1400);
			window.setTimeout(function(){this._attachScrollHandler();this._animating = false;}.bind(this), 2000);
			// window.setTimeout(function(){this.scrollSlideToView()}.bind(this), 2100);
		} else {
			this.revertFullScreenAnimation();
		}
	}
	revertFullScreenAnimation(){
		if(!this.fullScreen || this._animating){return;}
		this._animating = true;
		this._toggleLayer('.scroller-container', 'active');
		window.setTimeout(function(){this._toggleLayer('.scroller-container', 'slide');}.bind(this), 200);
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this._slideColorTransition();this._detachScrollHandler()}.bind(this),200);
		window.setTimeout(function(){this.fullScreen = false;this.initialize(false);this._animating = false;}.bind(this),2000);
		window.setTimeout(function(){this._removeAnimationLayerStepTwo(animationLayer);this._removeAnimationLayerStepOne(animationLayer)}.bind(this), 1700);
		window.setTimeout(function(){this._removeAnimationLayerStepThree(animationLayer);}.bind(this), 1000);
		window.setTimeout(function(){this._removeAnimationLayerStepFour(animationLayer)}.bind(this), 200);	
	}

	startHoverAnimation(){
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this._animationLayerStepOne(animationLayer)}.bind(this), 0);
	}
	endHoverAnimation(){
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this._removeAnimationLayerStepOne(animationLayer)}.bind(this), 0);
	}

	jumpToSlide(num){
		if(this._animating){return;}
		if(!this.fullScreen){
			this.currentSlide = num;
			this.currentTitle = num;
			this._slideColorTransition();
			this.startFullScreenAnimation();
			return;
		}
		this.currentSlide = num;
		this.currentTitle = num;
		this._slideColorTransition();
	}

	scrollSlideToView(){
		var top = $(window).height();
		$('#slide-content').animate({scrollTop: top}, 500, 'easeInOutCubic')
	}

	previousSlide(){
		this.cleanUp();
		this._slideTransitionReverse();
		this._progressTitleTransitionReverse();
		this._slideColorTransition();
	}

	nextSlide(){
		this.cleanUp();
		this._slideTransition();
		this._progressTitleTransition();
		this._slideColorTransition();
	}

	private _attachScrollHandler(){
	    $('#slide-content').on('scroll', this._scrollHandler.bind(this));
	}

	private _detachScrollHandler(){
	    $('#slide-content').off('scroll', this._scrollHandler);
	}

	private _scrollHandler(){
		var scrollTop = $('#slide-content').scrollTop();
		var navbar = $('.navbar-static');
		var scroller = $('.scroller-container');
		var progressTitle = $('.progress-title');
		var nav = $('.home-nav-container');
		if(scrollTop <= 0){
			if(navbar.hasClass('minimized')){navbar.removeClass('minimized')};
			if(!scroller.hasClass('active')){scroller.addClass('active');scroller.addClass('slide')};
			if(nav.hasClass('slide')){nav.removeClass('slide')};
			if(progressTitle.hasClass('minimized')){progressTitle.removeClass('minimized')};
			return;
		}
		if(scrollTop > 0){
			if(!navbar.hasClass('minimized')){navbar.addClass('minimized')};
			if(scroller.hasClass('active')){scroller.removeClass('active');scroller.removeClass('slide')};
			if(!nav.hasClass('slide')){nav.addClass('slide')};
			if(!progressTitle.hasClass('minimized')){progressTitle.addClass('minimized')};
		} 
	}

	private _toggleLayer(layer, className){
		$(layer).toggleClass(className);
	}

	private _animationLayerStepOne(animationLayer){
		animationLayer.addClass('first');
	}
	private _removeAnimationLayerStepOne(animationLayer){
		animationLayer.removeClass('first');	
	}
	private _animationLayerStepTwo(animationLayer){
		animationLayer.addClass('second');
	}
	private _removeAnimationLayerStepTwo(animationLayer){
		animationLayer.removeClass('second');	
	}
	private _animationLayerStepThree(animationLayer){
		animationLayer.addClass('third');
	}
	private _removeAnimationLayerStepThree(animationLayer){
		animationLayer.removeClass('third');	
	}
	private _animationLayerStepFour(animationLayer){
		animationLayer.addClass('fourth');
		$('.slide-image-container').addClass('zoom');
	}
	private _removeAnimationLayerStepFour(animationLayer){
		animationLayer.removeClass('fourth');
		$('.slide-image-container').removeClass('zoom');	
	}

	private _startSlideAnimationInterval(){
		this._slideAnimationInterval = window.setInterval(this._slideAnimation.bind(this), 4900);
	}

	private _slideAnimation(){
		this._slideTransition();
		this._slideColorTransition();
	}

	private _slideTransition(){
		if(this.currentSlide >= this.slideNum){this.currentSlide = 0;return;}
		this.currentSlide += 1;
	}

	private _slideTransitionReverse(){
		this.currentSlide -= 1;
		if(this.currentSlide < 0){this.currentSlide = this.slideNum;}
	}

	private _progressTitleTransition(){
		if(this.currentTitle >= this.titleNum){this.currentTitle = 0;return;}
		this.currentTitle += 1;
	}

	private _progressTitleTransitionReverse(){
		this.currentTitle -= 1;
		if(this.currentTitle < 0){this.currentTitle = this.titleNum;return;}
	}

	private _slideColorTransition(){
		var index = this.currentSlide;
		var color = this.slideColors[index];
		var backgroundColor = this.backgroundColors[index];
		$('#js-home--mask').css('fill', color);
		$('#home-1 .boxInner-viewport').css('background-color', backgroundColor);

	}

	private _timer(t){
		return new Promise(function(resolve, reject) {
		    setTimeout(function() {
		        resolve();
		    }, t);
		});
	}
	private _startProgressBarInterval(){
		this._progressBarAnimation();
		this._progressBarInterval = window.setInterval(this._progressBarAnimation.bind(this), 4900);
	}
	private _progressBarAnimation(){
		window.setTimeout(this._progressBarExpand, 0);
		window.setTimeout(this._progressBarFull, 4100);
		window.setTimeout(this._progressBarClosing, 4300);
		window.setTimeout(this._progressBarReset, 4800);
	}
	private _progressBarExpand(){
		$('#progress-bar').addClass('expanding');
	}
	private _progressBarFull(){
		$('#progress-bar').addClass('full');	
	}
	private _progressBarClosing(){
		$('#progress-bar').addClass('closing');		
	}
	private _progressBarReset(){
		$('#progress-bar').removeClass('expanding full closing');		
	}

	private _startProgressTitleInterval(){
		this._progressTitleInterval = window.setInterval(this._progressTitleAnimation.bind(this), 4900);
	}
	private _progressTitleAnimation(){
		if(this.currentTitle >= this.titleNum){this.currentTitle = 0;return};
		this.currentTitle += 1;
	}
}