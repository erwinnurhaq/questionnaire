import { Schema } from 'rsuite';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';
import BarChartIcon from '@rsuite/icons/BarChart';
import PageIcon from '@rsuite/icons/Page';
import TextImageIcon from '@rsuite/icons/TextImage';

export const STORAGE_KEY = 'questionnaire_ed';

const iconSize = { fontSize: '1.2rem' };
export const STEPS = [
  { id: 1, step: 0, name: 'Introduction', icon: <OperatePeopleIcon style={iconSize} /> },
  { id: 2, step: 1, name: 'Biodata', icon: <CharacterAuthorizeIcon style={iconSize} /> },
  { id: 3, step: 2, name: 'Professional Engagement', icon: <PageIcon style={iconSize} /> },
  { id: 4, step: 3, name: 'Digital Resources', icon: <PageIcon style={iconSize} /> },
  { id: 5, step: 4, name: 'Teaching and Learning', icon: <PageIcon style={iconSize} /> },
  { id: 6, step: 5, name: 'Assessment', icon: <PageIcon style={iconSize} /> },
  { id: 7, step: 6, name: 'Empowering Learners', icon: <PageIcon style={iconSize} /> },
  { id: 8, step: 7, name: `Facilitating Learners' Digital Competence`, icon: <PageIcon style={iconSize} /> },
  { id: 9, step: 8, name: `Additional Info`, icon: <TextImageIcon style={iconSize} /> },
  { id: 10, step: 9, name: `Result`, icon: <BarChartIcon style={iconSize} /> },
];

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

const { StringType } = Schema.Types;
export const MODEL_BIODATA = Schema.Model({
  nama: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  tingkat_sekolah: StringType().isRequired('This field is required.'),
  mata_pelajaran: StringType().isRequired('This field is required.'),
  pengalaman_mengajar: StringType().isRequired('This field is required.'),
  pengalaman_digital: StringType().isRequired('This field is required.'),
});