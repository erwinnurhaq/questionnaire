import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';
import BarChartIcon from '@rsuite/icons/BarChart';
import PageIcon from '@rsuite/icons/Page';
import TextImageIcon from '@rsuite/icons/TextImage';

const iconSize = { fontSize: '1.2rem' };

export const STEPS = [
  { step: 0, name: 'Pengantar', path: '/' },
  { step: 1, name: 'Biodata', path: '/biodata' },
  { step: 2, name: 'Professional Engagement', path: '/proficiencies/1' },
  { step: 3, name: 'Digital Resources', path: '/proficiencies/2' },
  { step: 4, name: 'Teaching and Learning', path: '/proficiencies/3' },
  { step: 5, name: 'Assessment', path: '/proficiencies/4' },
  { step: 6, name: 'Empowering Learners', path: '/proficiencies/5' },
  { step: 7, name: `Facilitating Learners' Digital Competences`, path: '/proficiencies/6' },
  { step: 8, name: `Additional Questions`, path: '/additional' },
  { step: 9, name: `Result`, path: '/result' },
];

export const STEP_ICONS = [
  { step: 0, icon: <OperatePeopleIcon style={iconSize} /> },
  { step: 1, icon: <CharacterAuthorizeIcon style={iconSize} /> },
  { step: 2, icon: <PageIcon style={iconSize} /> },
  { step: 3, icon: <PageIcon style={iconSize} /> },
  { step: 4, icon: <PageIcon style={iconSize} /> },
  { step: 5, icon: <PageIcon style={iconSize} /> },
  { step: 6, icon: <PageIcon style={iconSize} /> },
  { step: 7, icon: <PageIcon style={iconSize} /> },
  { step: 8, icon: <TextImageIcon style={iconSize} /> },
  { step: 9, icon: <BarChartIcon style={iconSize} /> },
];