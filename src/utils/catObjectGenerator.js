// replaces fake_favourite_cats.json but keepin the json file

// cat names using names from people i know
const FRIENDS_NAMES = [
  'Darth Kater',
  'Little Lara Lumpkins',
  'Nancy Noodle Noggin',
  'Miss Hairy Scary Mary',
  'Sir Andrew Big Boo',
  'Gregg McMuffins',
  'Jeffistopheles',
  'Clare de Lunacy',
  'Razza Ma Shazza',
  'Miss Marsha Mossypants',
  'Pitty Pat',
  'Boyce Rejoice',
  'Kenough',
  'Biggus Dickus',
  'Ellen Emmo Pee',
  'Josh the Untrustworthy',
  'Royal Britannia Bibble Beans',
  'Jess the Mess',
  'Princess Meowy Antoinette'
];

// Oh my god, stop me.
const SILLY_NAMES = [
  'Mewpocalypse Yarn Killer',
  'Mochi',
  'Betty Supersticious',
  'Tuxedo Burrito Camino',
  'Whiskerella',
  'Sir Pounce',
  'Mittens',
  'Cinnamon',
  'Pickles',
  'Nugget',
  'Pepper',
  'Shadow',
  'Pumpkin',
  'Tuna',
  'Socks',
  'Pancake',
  'Miso',
  'Sprinkles',
  'Tofu',
  'Oreo',
  'Snickers',
  'Cleo',
  'Loki',
  'Nala',
  'Smudge',
  'Pip',
  'Churro',
  'Muffin',
  'Sassy',
  'Fig',
  'Pumpkin Spice',
  'Crumb',
  'Cat Benatar',
  'Goose',
  'Maple',
  'Tiggy',
  'Bluebell',
  'Poppy',
  'AdmiralTurbo Meowington',
  'Copurrrnicus',
  'Edger Allen Paw',
  'Ella Oreo Whiskers Hurst',
  'Fernsbane The Inquisitive',
  'Mingus Pookiebutts',
  'Tika Meowsala',
  'Captain Sushi',
  'Neville Furbottom',
  'Macaroni Bob',
  'Aaron Purr',
  'Albert Buthead Meepstein',
  'Babe Catipillar Orengo',
  'Baby Boo Boo',
  'Babybat',
  'Babycat Purrmachine',
  'Berkeley Sox',
  'Bootsy Clawsby',
  'Calise Sheba Lighting Girl Ray',
  'Chalupa Batman Mcarthur',
  'DJ Mittens',
  'Downstairs Cat',
  'Dwight D. Eisenmeower',
  'Eleanor Scribbles',
  'Emperor Maximillian Pusspuss',
  'Esther Sniffles',
  'Farrah Pawcett',
  'Chalupa Batman',
  'Furious The Destroyer',
  'General Puss Swain',
  'Gracie Mcflufferkitty',
  'Mouthjaw Scratcher Lightningbolt',
  'Edward Scissor Paws',
  'Pizzeria Meow Meow',
  'Fluff-Ball Sir Meows-A-Lot',
  'Poomba Gul Shaker',
  'Purrfessor Minerva',
  'Purrlock Holmes',
  'Rexalot Udon Of Rexnroll',
  'Rosie Purrez',
  'Sir Purrs A Lot Theadorable',
  'Spartacus Hamster',
  'Thorin Oakenshield Kitty Under The Meowntain',
  'Truely Scrumptious',
  'Ugabaluga',
  'Vash The Stampede',
  'Wigglebutt',
  'Winston Pudgehill',
  'Yoyo Meow',
  'Old Deuteronomy',
  'Zha Zha Gapurr',
  'Skimbleshanks',
  'Bustopher Jones',
];

const LIKES = [
  'sunbeams',
  'treats',
  'head pats',
  'catnip',
  'window watching',
  'laser chase',
  'soft blankets',
  'belly rubs',
  'kneading',
  'cardboard boxes',
  'bird videos',
  'naps',
  'warm laundry',
  'snuggling',
  'attention',
  'purring',
  'hiding in boxes',
  'zoomies',
  'string toys',
  'stealing socks',
  'midnight snacks',
  'warm laps',
  'keyboards',
  'swatting at the tv',
  'looking at squirrels and plotting their deaths'
];

const DISLIKES = [
  'vacuum cleaners',
  'dogs',
  'baths',
  'rain',
  'loud noises',
  'being ignored',
  'closed doors',
  'vet visits',
  'sharing food',
  'cold floors',
  'early mornings',
  'empty food bowls',
  'being picked up',
  'yappy dogs',
  'other cats',
  'cucumbers',
  'empty food bowls',
  'cat carriers',
  'loud talkers',
  'toddlers',
  'teens',
  'smelly sneakers',
  'not being acknowledged'

];

// Utility to pick random elements
const getRandomItems = (arr, min, max) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count);
};

export  function generateKittehs(count) {
  // shuffle so it's never the same
  const shuffledNames = [...FRIENDS_NAMES, ...SILLY_NAMES].sort(
    () => Math.random() - 0.5
  );
  const names = shuffledNames.slice(0, count);

  return names.map((name, i) => ({
    id: i + 1,
    name,
    likes: getRandomItems(LIKES, 2, 4),
    dislikes: getRandomItems(DISLIKES, 1, 3),
  }));
}

//https://www.petinsurance.com/healthzone/pet-names/themed-pet-names/top-50-wackiest-cat-names-of-2018/
//https://www.embracepetinsurance.com/waterbowl/article/funny-cat-names-funny-silly-crazy-clever-cat-names?srsltid=AfmBOorbrf8l9NMA-VcIrUhlmrNm2FPX9wwxiCn3s_N9LVOOBrHM03qC
// https://www.petinsurance.com/healthzone/pet-names/themed-pet-names/top-50-wackiest-cat-names-of-2020/
