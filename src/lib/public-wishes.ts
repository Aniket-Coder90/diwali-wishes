export type PublicWish = {
  id: string;
  name: string;
  recipient: string;
  relationship: string;
  wish: string;
  animation: 'fireworks' | 'lanterns';
  bgImageId: 'diya-arrangement' | 'colorful-rangoli' | 'floating-lanterns' | 'diwali-sweets';
};

export const publicWishes: PublicWish[] = [
  {
    id: '1',
    name: 'Priya',
    recipient: 'Amit',
    relationship: 'Friend',
    wish: 'May the divine light of Diwali spread into your life and bring peace, prosperity, happiness, and good health. Wishing you a very Happy Diwali!',
    animation: 'fireworks',
    bgImageId: 'diya-arrangement',
  },
  {
    id: '2',
    name: 'Rohan',
    recipient: 'Family',
    relationship: 'Family',
    wish: 'This Diwali, may you be blessed with good fortune as long as Ganesha’s trunk, wealth and prosperity as big as his stomach, and happiness as sweet as his laddoos. Happy Diwali!',
    animation: 'lanterns',
    bgImageId: 'colorful-rangoli',
  },
  {
    id: '3',
    name: 'Sonia',
    recipient: 'Vikram',
    relationship: 'Colleague',
    wish: 'May the festival of lights fill your life with the glow of happiness and the sparkle of joy. Wishing you and your family a very prosperous Diwali.',
    animation: 'fireworks',
    bgImageId: 'floating-lanterns',
  },
   {
    id: '4',
    name: 'Anjali',
    recipient: 'Grandparents',
    relationship: 'Family',
    wish: 'Just like the colors of rangoli, I hope this Diwali brings new smiles, new opportunities, and new dreams. May you have a blessed and beautiful Diwali.',
    animation: 'lanterns',
    bgImageId: 'diwali-sweets',
  }
];
