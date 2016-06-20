import { Directive, ElementRef, OnInit, OnDestroy, EventEmitter, Input} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';

@Directive({ 
	selector: '[scroll-item]',
})

export class ScrollItemDirective implements OnInit, OnDestroy{
	constructor(el: ElementRef, private _scrollService: ScrollService) {
	    this._el = el.nativeElement;
	}
	private _el:HTMLElement;
	private _scrollSubscription: any;
	private _animationSubscription: any;
	private _classToggleSubscription: any;
	private _index: number;

	@Input('scroll-item') index: any;

	ngOnInit() { this.initialize(); }
	ngOnDestroy() { this.cleanUp(); }

	initialize(){
		this._intitializeComponent();
		this._attachListeners();
		this._broadcastEvents();
	}
	private _intitializeComponent(){
		this._index = Number(this.index);
		var el = $(this._el);
		el.addClass('active');
		el.addClass('frame');
		el.attr('data-index', this._index);
		el.attr('id', 'scroll-component-' + this._index);
		el.css('z-index', 100 - this._index);
	}

	private _attachListeners(){
		this._scrollSubscription = this._scrollService.getScrollEventEmitter().subscribe(data=> {
		    this._scrollHandler(data);
		})
		this._animationSubscription = this._scrollService.getToggleAnimationEventEmitter().subscribe(data=> {
		    this._animationHandler(data);
		})
		this._classToggleSubscription = this._scrollService.getClassToggleEventEmitter().subscribe(data=>{
			this._classToggleHandler(data);
		})
	}

	private _scrollHandler(data){
		var index = data.index;
		if(index == this._index){
			console.log('receiving scroll event: ' + index + ' from scroll-item: ' + this._index + ' eventIndex: ' + typeof(index) + ', componentIndex: ' + typeof(this._index));
			$(this._el).toggleClass('active');
		}
	}
	private _animationHandler(data){
		var index =data.index;
		if(index == this._index){
			$(this._el).toggleClass('animation');
		}
	}
	private _classToggleHandler(data){
		var index =data.index;
		var className = data.className;
		if(index == this._index){
			$(this._el).toggleClass(className);
		}
	}
	private _broadcastEvents(){
		this._broadcastNewComponentEvent();
	}
	private _broadcastNewComponentEvent(){
	 this._scrollService.getNewComponentEventEmitter().emit({component: $(this._el)});
	}
	cleanUp() {
	    this._detachListeners();
	}
	private _detachListeners(){
	    this._scrollSubscription.unsubscribe();
	    this._animationSubscription.unsubscribe();
	}

}