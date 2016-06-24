import {Component, OnInit, OnDestroy} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';

@Component({
  selector: 'home-1',
  template: require('./home1.component.html'),
  styles: [require('./home1.component.css')],
})

export class Home1Component{
	currentSlide = 0;
	slideNum = 2;
	currentTitle = 0;
	titleNum = 4;
	slideColors = ['rgba(85, 178, 220, 0.95)', 'rgba(48, 33, 19, 0.95)', 'rgba(101, 171, 123, 0.95)'];
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
		$('#js-home--mask').css('fill', color);
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