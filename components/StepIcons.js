import { STEP_ICONS } from "~/constants/steps";

export default function StepIcons({ step }) {
  return STEP_ICONS.find((item) => item.step === step).icon
}