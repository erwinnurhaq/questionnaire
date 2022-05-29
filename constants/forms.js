import { Schema } from 'rsuite';

const { StringType } = Schema.Types;

export const TINGKAT_SEKOLAH = [
  { id: 1, name: 'SD' },
  { id: 2, name: 'SMP' },
  { id: 3, name: 'SMA' },
  { id: 4, name: 'SMK' },
];

export const PENGALAMAN_MENGAJAR = [
  { id: 1, name: 'Dibawah 5 tahun' },
  { id: 2, name: 'Antara 5 sampai 10 tahun' },
  { id: 3, name: 'Antara 10 sampai 15 tahun' },
  { id: 4, name: 'Antara 15 sampai 20 tahun' },
  { id: 5, name: 'Diatas 20 tahun' },
];

export const PENGALAMAN_DIGITAL = [
  { id: 1, name: 'Dibawah 5 tahun' },
  { id: 2, name: 'Antara 5 sampai 10 tahun' },
  { id: 3, name: 'Antara 10 sampai 15 tahun' },
  { id: 4, name: 'Antara 15 sampai 20 tahun' },
  { id: 5, name: 'Diatas 20 tahun' },
];

export const MAPEL = [
  { id: 1, name: 'Matematika dan Sains' },
  { id: 2, name: 'Bahasa dan Seni' },
  { id: 3, name: 'Ilmu Sosial dan Agama' },
  { id: 4, name: 'Vokasi dan Olahraga' },
  { id: 5, name: 'Pendidikan Dini' },
  { id: 6, name: 'Pendidikan Dasar' },
];

export const GRADES = [
  { id: 1, name: 'Pemula', min: 0, max: 31 },
  { id: 2, name: 'Eksplorasi', min: 32, max: 62 },
  { id: 3, name: 'Integrator', min: 63, max: 93 },
  { id: 4, name: 'Ahli', min: 94, max: 124 },
  { id: 5, name: 'Pemimpin', min: 125, max: 155 },
  { id: 6, name: 'Pelopor', min: 156, max: 186 },
];

export const MODEL_BIODATA = Schema.Model({
  nama: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  tingkat_sekolah: StringType().isRequired('This field is required.'),
  nomor_telepon: StringType().isRequired('This field is required.'),
  mata_pelajaran: StringType().isRequired('This field is required.'),
  pengalaman_mengajar: StringType().isRequired('This field is required.'),
  pengalaman_digital: StringType().isRequired('This field is required.'),
});
