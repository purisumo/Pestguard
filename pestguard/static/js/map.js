const map = L.map("map", {
    maxZoom: 19,
    minZoom: 2,
    maxBounds: [
    [-90, -180], // Southwest coordinates
    [90, 180],   // Northeast coordinates
  ],
});
map.setView([23.9, 20.2], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {

  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var PestIcon = L.Icon.extend({
  options: {
    iconSize: [60, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});
var pest1 = new PestIcon({
    iconUrl: "/static/img/1cutworm.png",
  }),
  pest2 = new PestIcon({
    iconUrl: "/static/img/2flea-beetle.png",
  }),
  pest3 = new PestIcon({
    iconUrl: "/static/img/3lice.png",
  }),
  pest4 = new PestIcon({
    iconUrl: "/static/img/4cotton-bollworm.png",
  }),
  pest5 = new PestIcon({
    iconUrl: "/static/img/5facefly.png",
  }),
  pest6 = new PestIcon({
    iconUrl: "/static/img/6earthworm.png",
  }),
  pest7 = new PestIcon({
    iconUrl: "/static/img/7colorado-potato-beetle.png",
  }),
  pest8 = new PestIcon({
    iconUrl: "/static/img/8snail.png",
  }),
  pest9 = new PestIcon({
    iconUrl: "/static/img/9wireworm.png",
  }),
  pest10 = new PestIcon({
    iconUrl: "/static/img/10gall-midge.png",
  }),
  pest11 = new PestIcon({
    iconUrl: "/static/img/11european-corn-earworm.png",
  }),
  pest12 = new PestIcon({
    iconUrl: "/static/img/12chinch-bug.png",
  }),
  pest13 = new PestIcon({
    iconUrl: "/static/img/13mealy-bug.png",
  }),
  pest14 = new PestIcon({
    iconUrl: "/static/img/14earwig.png",
  }),
  pest15 = new PestIcon({
    iconUrl: "/static/img/15fungus-gnat.png",
  }),
  pest16 = new PestIcon({
    iconUrl: "/static/img/16emerald-ash-borer.png",
  }),
  pest17 = new PestIcon({
    iconUrl: "/static/img/17asian-long-horned-beetle.png",
  }),
  pest18 = new PestIcon({
    iconUrl: "/static/img/18gypsy-moth.png",
  }),
  pest19 = new PestIcon({
    iconUrl: "/static/img/19japanese-beetle.png",
  }),
  pest20 = new PestIcon({
    iconUrl: "/static/img/20tobacco-whitefly.png",
  }),
  pest35 = new PestIcon({
    iconUrl: "/static/img/3lice.png",
  });

L.icon = function (options) {
  return new L.Icon(options);
};

// pest1
L.marker([49.7521, 15.3345], {
  icon: pest1,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cutworm.</div>");
L.marker([35.9258, 63.4377], {
  icon: pest1,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cutworm.</div>");
L.marker([56.7896, -120.643], {
  icon: pest1,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cutworm.</div>");
L.marker([28.9505, 95.3064], {
  icon: pest1,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cutworm.</div>");

// pest2
L.marker([54.272, -107.952], {
  icon: pest2,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Flea beetle .</div>");
L.marker([-9.1563, -52.1082], {
  icon: pest2,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Flea beetle .</div>");
L.marker([23.3965, 94.0402], {
  icon: pest2,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Flea beetle .</div>");

// pest3
L.marker([54.0449, -117.3213], {
  icon: pest3,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Lice</div>");
L.marker([-14.823, -69.324], {
  icon: pest3,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Lice</div>");
L.marker([-5.2404, 38.0841], {
  icon: pest3,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Lice</div>");
L.marker([44.1332, 86.5496], {
  icon: pest3,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Lice</div>");

// pest4
L.marker([49.5047, 12.7579], {
  icon: pest4,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cotton bollworm</div>");
L.marker([24.3846, 113.1537], {
  icon: pest4,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cotton bollworm</div>");
L.marker([3.1186, 43.6926], {
  icon: pest4,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cotton bollworm</div>");
L.marker([-26.718, 139.2318], {
  icon: pest4,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Cotton bollworm</div>");

// pest5
L.marker([49.8606, 11.3592], {
  icon: pest5,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Facefly</div>");
L.marker([54.8117, 58.4912], {
  icon: pest5,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Facefly</div>");
L.marker([21.7206, 79.6014], {
  icon: pest5,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Facefly</div>");
L.marker([33.9169, 47.8369], {
  icon: pest5,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Facefly</div>");

// pest6
L.marker([45.7805, 51.1884], {
  icon: pest6,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earthworm</div>");
L.marker([28.5417, 60.8626], {
  icon: pest6,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earthworm</div>");
L.marker([49.037, -80.1835], {
  icon: pest6,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earthworm</div>");

// pest7
L.marker([70.476, -107.93], {
  icon: pest7,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Colorado potato </div>");
L.marker([29.7099, 11.3773], {
  icon: pest7,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Colorado potato </div>");
L.marker([58.8379, 95.2638], {
  icon: pest7,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Colorado potato </div>");

// pest8
L.marker([-8.0606, -58.1067], {
  icon: pest8,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Snail</div>");
L.marker([38.785, 125.2991], {
  icon: pest8,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Snail</div>");
L.marker([50.5989, 10.8847], {
  icon: pest8,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Snail</div>");

// pest9
L.marker([50.9126, -100.2193], {
  icon: pest9,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Wireworm</div>");
L.marker([-7.3039, -63.61361], {
  icon: pest9,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Wireworm</div>");

// pest10
L.marker([50.6959, -99.7037], {
  icon: pest10,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gall midges </div>");
L.marker([49.8586, 11.5078], {
  icon: pest10,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gall midges </div>");
L.marker([28.0483, 95.1546], {
  icon: pest10,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gall midges </div>");

// pest11
L.marker([49.539, 11.4088], {
  icon: pest11,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>European Corn borer </div>");
L.marker([59.809, -114.06], {
  icon: pest11,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>European Corn borer </div>");

// pest12
L.marker([59.271, -97.515], {
  icon: pest12,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Chinch bug</div>");

// pest13
L.marker([58.197, -121.322], {
  icon: pest13,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Mealy bug </div>");
L.marker([-18.041, -54.003], {
  icon: pest13,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Mealy bug </div>");
L.marker([48.159, 31.707], {
  icon: pest13,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Mealy bug </div>");

// pest14
L.marker([46.853, -104.59], {
  icon: pest14,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earwig</div>");
L.marker([52.5045, 13.7494], {
  icon: pest14,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earwig</div>");
L.marker([58.338, 59.854], {
  icon: pest14,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Earwig</div>");

// pest15
L.marker([50.7312, -86.3196], {
  icon: pest15,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Fungus gnats </div>");
L.marker([52.5045, 13.7494], {
  icon: pest15,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Fungus gnats </div>");
L.marker([58.338, 59.854], {
  icon: pest15,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Fungus gnats </div>");

// pest16
L.marker([49.4092, 109.3085], {
  icon: pest16,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Emerald ash borer</div>");

// pest17
L.marker([51.4899, 113.6234], {
  icon: pest17,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Asian longhorned beetle</div>");
L.marker([57.1248, -116.3885], {
  icon: pest17,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Asian longhorned beetle</div>");

// pest18
L.marker([49.4649, 11.3065], {
  icon: pest18,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gypsy moth</div>");
L.marker([40.397, 110.797], {
  icon: pest18,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gypsy moth</div>");
L.marker([-10.2345, 37.7491], {
  icon: pest18,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Gypsy moth</div>");

// pest19
L.marker([25.0738, 110.414], {
  icon: pest19,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Japanese beetle </div>");
L.marker([59.1108, -95.0371], {
  icon: pest19,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Japanese beetle </div>");

// pest20
L.marker([56.8334, -113.8184], {
  icon: pest20,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Tobacco whitefly </div>");
L.marker([-25.3062, -60.6947], {
  icon: pest20,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Tobacco whitefly </div>");
L.marker([24.6969, 91.3747], {
  icon: pest20,
})
  .addTo(map)
  .bindPopup("<div style='font-size: 16px;'>Tobacco whitefly </div>");
