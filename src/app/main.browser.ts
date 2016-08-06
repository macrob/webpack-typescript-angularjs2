import { bootstrap } from '@angular/platform-browser-dynamic';


import { App } from './app';


export function main(): Promise<any> {

	return bootstrap(App)
		.then(x => {
			console.log('Success App');
		})
		// .then(decorateComponentRef)
		.catch(err => {
			console.error(err)
		});

}


document.addEventListener('DOMContentLoaded', () => main());
