export interface Developer {
  img: string;
  name: string;
  description: string;
  gitHub: string;
  bg: string;
}

export const selectedDevelopers: Developer[] = [
  {
    img: 'avatar.png',
    name: 's',
    description: 's',
    gitHub: 'https://github.com/Serhii1108',
    bg: 'bg-s.jpg',
  },
  {
    img: 'victar.png',
    name: 'v',
    description: 'v',
    gitHub: 'https://github.com/VVK1978',
    bg: 'bg-v.png',
  },
  {
    img: 'avatar.png',
    name: 'e',
    description: 'e',
    gitHub: 'https://github.com/cheerfulperson',
    bg: 'bg-e.jpg',
  },
].map((dev: Developer) => {
  const assetsPath: string = '../../../../assets/images/';
  return {
    ...dev,
    img: `${assetsPath}${dev.img}`,
    description: `homePage.memberDescription.${dev.description}`,
    name: `footer.names.${dev.name}`,
    bg: `${assetsPath}${dev.bg}`,
  };
});
