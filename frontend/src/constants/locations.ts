export interface Province {
  readonly id: string;
  readonly name: string;
  readonly cities: readonly string[];
}

export const EASTERN_CONGO_PROVINCES: readonly Province[] = [
  {
    id: 'nord_kivu',
    name: 'Nord-Kivu',
    cities: [
      'Goma',
      'Butembo',
      'Beni',
      'Oicha',
      'Lubero',
      'Rutshuru',
      'Nyiragongo',
      'Masisi',
      'Walikale',
      'Kiwanja',
    ],
  },
  {
    id: 'sud_kivu',
    name: 'Sud-Kivu',
    cities: [
      'Bukavu',
      'Uvira',
      'Baraka',
      'Kamituga',
      'Mwenga',
      'Shabunda',
      'Kalehe',
      'Kabare',
      'Walungu',
      'Fizi',
    ],
  },
  {
    id: 'ituri',
    name: 'Ituri',
    cities: [
      'Bunia',
      'Komanda',
      'Mambasa',
      'Irumu',
      'Djugu',
      'Mahagi',
      'Aru',
      'Mongbwalu',
    ],
  },
  {
    id: 'tshopo',
    name: 'Tshopo',
    cities: [
      'Kisangani',
      'Yangambi',
      'Isangi',
      'Opala',
      'Ubundu',
    ],
  },
  {
    id: 'maniema',
    name: 'Maniema',
    cities: [
      'Kindu',
      'Kasongo',
      'Kabambare',
      'Pangi',
      'Lubutu',
    ],
  },
] as const satisfies readonly Province[];
