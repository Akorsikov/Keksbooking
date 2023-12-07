import {filterForm} from './map.js';
import {getMarkerAdvertisement, closeMarkersAds} from './map.js'
import {NUMBER_ADS} from './data-db.js';

const handleChangeFilterForm = (ads, markersAds) => {

  let markers = markersAds;
  filterForm.addEventListener('change', () => {
    const housingType = filterForm.querySelector('#housing-type').value;
    const housingPrice = filterForm.querySelector('#housing-price').value;
    const housingRooms = filterForm.querySelector('#housing-rooms').value;
    const housingGuests = filterForm.querySelector('#housing-guests').value;
    const checkboxFeatures = filterForm.querySelectorAll('.map__checkbox');
    const checkedFeatures = [];

    const isSuitableAdvertisement = (advertisement) => {
      const housingFeatures = advertisement.offer.features ?? [];
      const getLevelPriceAdvertisement = (price) => {
        switch (true) {
          case price < 10000 :return 'low';
          case price > 50000 : return 'high';
          default : return 'middle';
        }
      }

      const isInappropriateAdString = (offerAd, filter) => {
        return (offerAd !== filter && filter !== 'any');
      }
      const isInappropriateAdNumber = (offerAd, filter) => {
        return (offerAd !== Number(filter) && String(filter) !== 'any');
      }

      if (isInappropriateAdString(advertisement.offer.type, housingType)) return false;
      if (isInappropriateAdString(getLevelPriceAdvertisement(advertisement.offer.price), housingPrice)) return false;
      if (isInappropriateAdNumber(advertisement.offer.rooms, housingRooms)) return false;
      if (isInappropriateAdNumber(advertisement.offer.guests, housingGuests)) return false;

      // if (advertisement.offer.type !== housingType
      //   && housingType !== 'any'
      // ) return false;
      // if (getLevelPriceAdvertisement(advertisement.offer.price) !== housingPrice
      //   && housingPrice !== 'any'
      // ) return false;
      // if (advertisement.offer.rooms !== +housingRooms
      //   && housingRooms !== 'any'
      // ) return false;
      // if (advertisement.offer.guests !== +housingGuests
      //   && housingGuests !== 'any'
      // ) return false;

      let result = true;
      checkboxFeatures.forEach((feature) => {
        if ((feature.checked) && (!housingFeatures.includes(feature.value))) {
          result = false;
        }
      });

      return result;
    }

    closeMarkersAds(markers);
    markers = [];
    ads.
      forEach(advertisement => {
        if (
          markers.length < NUMBER_ADS &&
          isSuitableAdvertisement(advertisement)
        ) {
          markers.push(getMarkerAdvertisement(advertisement));
        }
      });
  });
}

export {handleChangeFilterForm}


// const handleChangeFilterForm = (ads, markersAds) => {

//   let markers = markersAds;
//   filterForm.addEventListener('change', (evt) => {
//     const housingType = filterForm.querySelector('#housing-type').value;
//     const housingPrice = filterForm.querySelector('#housing-price').value;
//     const housingRooms = filterForm.querySelector('#housing-rooms').value;
//     const housingGuests = filterForm.querySelector('#housing-guests').value;
//     const checkboxFeatures = filterForm.querySelectorAll('.map__checkbox');
//     const checkedFeatures = [];

//     const getNumberFilters = () => {
//       let countFilters = 0;
//       if (housingType !== 'any') countFilters++;
//       if (housingPrice !== 'any') countFilters++;
//       if (housingRooms !== 'any') countFilters++;
//       if (housingGuests !== 'any') countFilters++;

//       checkboxFeatures.forEach((feature) => {
//         if (feature.checked) {
//           countFilters++;
//           checkedFeatures.push(feature.value);
//         }
//       });
//       return countFilters;
//     }

//     const getRankAdvertisement = (advertisement) => {
//       const housingFeatures = advertisement.offer.features ?? [];
//       const getLevelPriceAdvertisement = (price) => {
//         switch (true) {
//           case price < 10000 :return 'low';
//           case price > 50000 : return 'high';
//           default : return 'middle';
//         }
//       }

//       let rank = 0;

//       if (advertisement.offer.type === housingType) rank++;
//       if (getLevelPriceAdvertisement(advertisement.offer.price) === housingPrice) rank++;
//       if (advertisement.offer.rooms === +housingRooms) rank++;
//       if (advertisement.offer.guests === +housingGuests) rank++;

//       checkedFeatures.forEach((feature) => {
//         if (housingFeatures.includes(feature)) rank++;
//       });
//       return rank;
//     }

//     const numberFilters = getNumberFilters();
//     closeMarkersAds(markers);
//     markers = [];
//     ads.
//       slice().
//       forEach(advertisement => {
//         if (
//           markers.length < NUMBER_ADS &&
//           getRankAdvertisement(advertisement) === numberFilters
//         ) {
//           markers.push(getMarkerAdvertisement(advertisement));
//         }
//       });
//   });
// }

// export {handleChangeFilterForm}
