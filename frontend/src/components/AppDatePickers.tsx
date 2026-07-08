import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type PickerBaseProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
};

function dateValue(value?: string) {
  return value ? dayjs(value) : null;
}

function monthValue(value?: string) {
  return value ? dayjs(`${value}-01`) : null;
}

function dateTimeValue(value?: string) {
  return value ? dayjs(value) : null;
}

function timeValue(value?: string) {
  return value ? dayjs(`2000-01-01T${value}`) : null;
}

function toDateText(value: Dayjs | null) {
  return value?.isValid() ? value.format('YYYY-MM-DD') : '';
}

function toMonthText(value: Dayjs | null) {
  return value?.isValid() ? value.format('YYYY-MM') : '';
}

function toDateTimeText(value: Dayjs | null) {
  return value?.isValid() ? value.format('YYYY-MM-DDTHH:mm') : '';
}

function toTimeText(value: Dayjs | null) {
  return value?.isValid() ? value.format('HH:mm') : '';
}

const textFieldProps = (required?: boolean, helperText?: string) => ({
  fullWidth: true,
  size: 'small' as const,
  required,
  helperText
});

export function AppDatePicker({
  label,
  value,
  onChange,
  required,
  disabled,
  helperText,
  className
}: PickerBaseProps) {
  return (
    <DatePicker
      className={className || 'app-date-picker'}
      label={label}
      value={dateValue(value)}
      format="DD/MM/YYYY"
      disabled={disabled}
      onChange={(nextValue) => onChange(toDateText(nextValue))}
      slotProps={{
        textField: textFieldProps(required, helperText)
      }}
    />
  );
}

export function AppMonthPicker({
  label,
  value,
  onChange,
  required,
  disabled,
  helperText,
  className
}: PickerBaseProps) {
  return (
    <DatePicker
      className={className || 'app-month-picker'}
      label={label}
      value={monthValue(value)}
      views={['year', 'month']}
      openTo="month"
      format="MM/YYYY"
      disabled={disabled}
      onChange={(nextValue) => onChange(toMonthText(nextValue))}
      slotProps={{
        textField: textFieldProps(required, helperText)
      }}
    />
  );
}

export function AppDateTimePicker({
  label,
  value,
  onChange,
  required,
  disabled,
  helperText,
  className
}: PickerBaseProps) {
  return (
    <DateTimePicker
      className={className || 'app-datetime-picker'}
      label={label}
      value={dateTimeValue(value)}
      format="DD/MM/YYYY HH:mm"
      ampm={false}
      disabled={disabled}
      onChange={(nextValue) => onChange(toDateTimeText(nextValue))}
      slotProps={{
        textField: textFieldProps(required, helperText)
      }}
    />
  );
}

export function AppTimePicker({
  label,
  value,
  onChange,
  required,
  disabled,
  helperText,
  className
}: PickerBaseProps) {
  return (
    <TimePicker
      className={className || 'app-time-picker'}
      label={label}
      value={timeValue(value)}
      format="HH:mm"
      ampm={false}
      disabled={disabled}
      onChange={(nextValue) => onChange(toTimeText(nextValue))}
      slotProps={{
        textField: textFieldProps(required, helperText)
      }}
    />
  );
}