export default function formatSelectOption(options, valueKey = 'name', labelKey = 'name') {
  return options.map((item) => ({ value: item[valueKey], label: item[labelKey] }));
}
