import { Injectable, EventEmitter} from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()
export class ScrollService {
	private _scrollEvent$: EventEmitter<any> = new EventEmitter();
	private _newNavComponentEvent$: EventEmitter<any> = new EventEmitter();
	private _updateNavEvent$: EventEmitter<any> = new EventEmitter();
	private _hideNavEvent$: EventEmitter<any> = new EventEmitter();
	private _showNavEvent$: EventEmitter<any> = new EventEmitter();
	private _toggleAnimationEvent$: EventEmitter<any> = new EventEmitter();
	private _navScrollEvent$: EventEmitter<any> = new EventEmitter();
	private _newComponentEvent$: EventEmitter<any> = new EventEmitter();
	private _classToggleEvent$: EventEmitter<any> = new EventEmitter();

	getScrollEventEmitter(){
		return this._scrollEvent$;
	}
	getNewNavComponentEventEmitter(){
		return this._newNavComponentEvent$;
	}
	getUpdateNavEventEmitter(){
		return this._updateNavEvent$;
	}
	getHideNavEventEmitter(){
		return this._hideNavEvent$;
	}
	getShowNavEventEmitter(){
		return this._showNavEvent$;
	}
	getToggleAnimationEventEmitter(){
		return this._toggleAnimationEvent$;
	}
	getNavScrollEventEmitter(){
		return this._navScrollEvent$;
	}
	getNewComponentEventEmitter(){
		return this._newComponentEvent$;
	}
	getClassToggleEventEmitter(){
		return this._classToggleEvent$;
	}
}