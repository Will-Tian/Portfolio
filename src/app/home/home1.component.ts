import {Component, OnInit, OnDestroy} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'home-1',
  template: require('./home1.component.html'),
  styles: [require('./home1.component.css')],
  directives: [NavComponent]
})

export class Home1Component{
	currentSlide = 0;
	slideNum = 2;
	currentTitle = 0;
	titleNum = 5;
	slideColors = ['rgba(85, 178, 220, 0.95)', 'rgba(48, 33, 19, 0.95)', 'rgba(101, 171, 123, 0.95)'];
	backgroundColors = ['rgba(46, 32, 18, 1)', 'rgba(72, 48, 24, 1)', 'rgba(28, 39, 44, 1)'];
	fullScreen = false;
	private _slideAnimationInterval: any;
	private _progressBarInterval: any;
	private _progressTitleInterval: any;

	ngOnInit() { this.initialize(); }
	ngOnDestroy() { this.cleanUp(); }

	initialize() {
		this._startSlideAnimationInterval();
		this._startProgressBarInterval();
		this._startProgressTitleInterval();
	}

	cleanUp() {
		if(this._slideAnimationInterval){ clearInterval(this._slideAnimationInterval);}
		if(this._progressBarInterval){clearInterval(this._progressBarInterval);}
		if(this._progressTitleInterval){clearInterval(this._progressTitleInterval);}
	}	

	startFullScreenAnimation(){
		this.cleanUp();
		var animationLayer = $('.js-shape');
		this.fullScreen = true;
		window.setTimeout(function(){this._animationLayerStepTwo(animationLayer)}.bind(this), 0);
		window.setTimeout(function(){this._animationLayerStepThree(animationLayer)}.bind(this), 650);
		window.setTimeout(function(){this._animationLayerStepFour(animationLayer)}.bind(this), 1400);
	}
	revertFullScreenAnimation(){
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this.currentTitle = 0;this.currentSlide = 0;this._slideColorTransition();}.bind(this),0);
		window.setTimeout(function(){this.fullScreen = false;this.initialize();}.bind(this),1950);
		window.setTimeout(function(){this._removeAnimationLayerStepOne(animationLayer)}.bind(this), 1300);
		window.setTimeout(function(){this._removeAnimationLayerStepThree(animationLayer);this._removeAnimationLayerStepTwo(animationLayer)}.bind(this), 650);
		window.setTimeout(function(){this._removeAnimationLayerStepFour(animationLayer)}.bind(this), 0);	
	}

	startHoverAnimation(){
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this._animationLayerStepOne(animationLayer)}.bind(this), 0);
	}
	endHoverAnimation(){
		var animationLayer = $('.js-shape');
		window.setTimeout(function(){this._removeAnimationLayerStepOne(animationLayer)}.bind(this), 0);
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
	}
	private _removeAnimationLayerStepFour(animationLayer){
		animationLayer.removeClass('fourth');	
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