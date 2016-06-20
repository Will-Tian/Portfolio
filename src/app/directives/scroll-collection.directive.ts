import { Directive, ElementRef, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {ScrollService} from '../directive-services/scroll.service';

@Directive({ 
	selector: '[scroll-collection]',
})

export class ScrollCollectionDirective implements OnInit, OnDestroy{
    constructor(el: ElementRef, private _scrollService: ScrollService) {
        this._el = el.nativeElement;
    }

	  private _el:HTMLElement;
    private _debounced: any;
    private _activeIndex = 1;
    private _maxIndex = 0;
    private _components = [];
    private _lastScrollPosition = 1;
    private _preventScrollHandler = false;
    private _newComponentSubscription: any;
    private _navScrollSubscription: any;

    ngOnInit() { this.initialize(); }
    ngOnDestroy() { this.cleanUp(); }


    initialize() {
        $(this._el).addClass('viewport-scroll');
        window.setTimeout(this._initializeAnimation.bind(this), 1500);
        this._attachScrollHandler();
        this._attachListeners();
    }

    cleanUp() {
        this._detachScrollHandler();
        this._detachListeners();
    }
    scrollTransitionAnimationToggle (oldIndex, newIndex){
      this.broadcastAnimationEvent(oldIndex);
      window.setTimeout(function(){
        this.broadcastAnimationEvent(newIndex);
      }.bind(this), 1000);
    }
    broadcastScrollEvent(index){
      console.log('broadcast scroll event: ' + index);
      this._scrollService.getScrollEventEmitter().emit({index: index});
    }
    broadcastNewNavComponent(index){
     this._scrollService.getNewNavComponentEventEmitter().emit({index: index});
    }
    broadcastUpdateNavEvent(index){
     this._scrollService.getUpdateNavEventEmitter().emit({index: index});
    }
    broadcastHideNavComponent(boolean){
      this._scrollService.getHideNavEventEmitter().emit(true);
    }
    broadcastShowNavComponent(boolean){
      this._scrollService.getShowNavEventEmitter().emit(true);
    }
    broadcastAnimationEvent(index){
      this._scrollService.getToggleAnimationEventEmitter().emit({index: index});
    }


    private _attachScrollHandler(){
        $(window).scrollTop(1); 
        $(window).on('scroll', this._debounce(this.scrollHandler.bind(this), 500, false));
    }

    private _detachScrollHandler(){
        $(window).off('scroll', this._debounced);
    }

    private _attachListeners(){
        this._newComponentSubscription = this._scrollService.getNewComponentEventEmitter().subscribe(data=> {
            this.newComponentHandler(data)
        })
        this._navScrollSubscription = this._scrollService.getNavScrollEventEmitter().subscribe(data=> {
            this.navScrollHandler(data)
        })
    }

    private _detachListeners(){
        this._newComponentSubscription.unsubscribe();
        this._navScrollSubscription.unsubscribe();
    }

    private _initializeAnimation(){
        $(this._el).addClass('animation');
    }

    private _resetScroll(){
      $(window).scrollTop(1);
      this._preventScrollHandler = true;
    }
    private _debounce(func, wait, immediate) {
      var timeout;
      function debounced() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
      this._debounced = debounced;
      return this._debounced;
    };

    private scrollHandler(){
      $(window).css('overflow', 'scroll')
      if(this._preventScrollHandler){
        this._preventScrollHandler = false;
        return;
      }
      var currentScrollPosition = $(window).scrollTop();
      if(currentScrollPosition > this._lastScrollPosition){
        $(window).css('overflow', 'hidden')
        window.setTimeout(this._resetScroll, 700);  
        if(this._activeIndex === this._maxIndex){
          return
        };
        this.broadcastScrollEvent(this._activeIndex);
        this.scrollTransitionAnimationToggle(this._activeIndex - 1, this._activeIndex);
        this._activeIndex += 1;
      } else if(currentScrollPosition < this._lastScrollPosition){
        $(window).css('overflow', 'hidden')
        window.setTimeout(this._resetScroll, 700);
        if(this._activeIndex === 1){ 
          return
        };
        this._activeIndex -= 1;
        $(window).css('overflow', 'hidden')
        this.broadcastScrollEvent(this._activeIndex);
        this.scrollTransitionAnimationToggle(this._activeIndex + 1, this._activeIndex);
      }
      if(this._activeIndex === 4){
        this.broadcastHideNavComponent(true);
      } else {
        this.broadcastShowNavComponent(true);
      }
    }
    private newComponentHandler(data){
      var component = data.component
      var index = component.data('index');
      this._components[index] = component;
      this._maxIndex += 1;
      console.log('max-index: ' + this._maxIndex);
      this.broadcastNewNavComponent(index);
    }
    private navScrollHandler(data){
      var index = data.index;
      this.scrollTransitionAnimationToggle(this._activeIndex, index);
      this.broadcastUpdateNavEvent(index);
      if(index > this._activeIndex){
        for(var i = this._activeIndex; i < index; i ++ ){
          if($('#scroll-component-' + i).hasClass('active')){
            $('#scroll-component-' + i).removeClass('active');
          }
        }
        this._activeIndex = index;
      } else if (index < this._activeIndex){
        for(var i = this._activeIndex - 1; i >= index; i--){

          if(!$('#scroll-component-' + i).hasClass('active')){
            $('#scroll-component-' + i).addClass('active'); 
          }
        }
        this._activeIndex = index;
      }
      if(this._activeIndex === 4){
        this.broadcastHideNavComponent(true);
      } else {
        this.broadcastShowNavComponent(true);
      }
    }
}