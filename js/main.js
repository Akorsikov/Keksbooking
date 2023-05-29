import {getArrayRandomAds} from './data.js';
import {getAdCard} from './ad-card.js';

const mapCanvas = document.querySelector('#map-canvas');

const ads = getArrayRandomAds();
const advertisement = getAdCard(ads[0]);
mapCanvas.appendChild(advertisement);

