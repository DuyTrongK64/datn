import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, h as clsx, i as styled, m as generateUtilityClass, r as useThemeProps } from "./LocalizationProvider-CyOIGrUO.js";
import { $ as useToolbarOwnerState, Ct as resolveDateFormat, Et as useMediaQuery, Ht as generateUtilityClasses, I as DEFAULT_DESKTOP_MODE_MEDIA_QUERY, Q as PickersToolbar, Rt as refType, Tt as resolveComponentProps, X as usePickerTranslations, Y as extractValidationProps, Z as usePickerAdapter, _ as useField, c as PickerFieldUI, f as CalendarIcon, it as Typography, l as PickerFieldUIContextProvider, ot as singleItemValueManager, t as useMobilePicker, tt as usePickerContext, u as useFieldTextFieldProps, v as useDesktopPicker, wt as applyDefaultViewProps, zt as composeClasses } from "./useMobilePicker-CRLhUKKU.js";
import { i as validateDate, n as useApplyDefaultValuesToDateValidationProps, r as useDateManager, t as renderDateViewCalendar } from "./dateViewRenderers-BcnUXFC0.js";
//#region node_modules/@mui/x-date-pickers/DatePicker/datePickerToolbarClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function getDatePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiDatePickerToolbar", slot);
}
var datePickerToolbarClasses = generateUtilityClasses("MuiDatePickerToolbar", ["root", "title"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DatePicker/DatePickerToolbar.mjs
var _excluded$2 = [
	"toolbarFormat",
	"toolbarPlaceholder",
	"className",
	"classes"
];
var useUtilityClasses = (classes) => {
	return composeClasses({
		root: ["root"],
		title: ["title"]
	}, getDatePickerToolbarUtilityClass, classes);
};
var DatePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiDatePickerToolbar",
	slot: "Root"
})({});
var DatePickerToolbarTitle = styled(Typography, {
	name: "MuiDatePickerToolbar",
	slot: "Title"
})({ variants: [{
	props: { pickerOrientation: "landscape" },
	style: { margin: "auto 16px auto auto" }
}] });
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [DatePickerToolbar API](https://mui.com/x/api/date-pickers/date-picker-toolbar/)
*/
var DatePickerToolbar = /*#__PURE__*/ import_react.forwardRef(function DatePickerToolbar(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDatePickerToolbar"
	});
	const { toolbarFormat, toolbarPlaceholder = "––", className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const adapter = usePickerAdapter();
	const { value, views, orientation } = usePickerContext();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses(classesProp);
	const dateText = import_react.useMemo(() => {
		if (!adapter.isValid(value)) return toolbarPlaceholder;
		const formatFromViews = resolveDateFormat(adapter, {
			format: toolbarFormat,
			views
		}, true);
		return adapter.formatByString(value, formatFromViews);
	}, [
		value,
		toolbarFormat,
		toolbarPlaceholder,
		adapter,
		views
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DatePickerToolbarRoot, _extends({
		ref,
		toolbarTitle: translations.datePickerToolbarTitle,
		className: clsx(classes.root, className)
	}, other, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DatePickerToolbarTitle, {
		variant: "h4",
		align: orientation === "landscape" ? "left" : "center",
		ownerState,
		className: classes.title,
		children: dateText
	}) }));
});
DatePickerToolbar.displayName = "DatePickerToolbar";
DatePickerToolbar.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* If `true`, show the toolbar even in desktop mode.
	* @default `true` for Desktop, `false` for Mobile.
	*/
	hidden: import_prop_types.default.bool,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	titleId: import_prop_types.default.string,
	/**
	* Toolbar date format.
	*/
	toolbarFormat: import_prop_types.default.string,
	/**
	* Toolbar value placeholder—it is displayed when the value is empty.
	* @default "––"
	*/
	toolbarPlaceholder: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DatePicker/shared.mjs
function useDatePickerDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), { localeText: import_react.useMemo(() => {
		if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
		return _extends({}, themeProps.localeText, { datePickerToolbarTitle: themeProps.localeText.toolbarTitle });
	}, [themeProps.localeText]) }, applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: ["year", "day"],
		defaultOpenTo: "day"
	}), { slots: _extends({ toolbar: DatePickerToolbar }, themeProps.slots) });
}
//#endregion
//#region node_modules/@mui/x-date-pickers/DateField/useDateField.mjs
var useDateField = (props) => {
	return useField({
		manager: useDateManager(),
		props
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateField/DateField.mjs
var _excluded$1 = ["slots", "slotProps"];
/**
* Demos:
*
* - [DateField](http://mui.com/x/react-date-pickers/date-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [DateField API](https://mui.com/x/api/date-pickers/date-field/)
*/
var DateField = /*#__PURE__*/ import_react.forwardRef(function DateField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiDateField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$1);
	const fieldResponse = useDateField(useFieldTextFieldProps({
		slotProps,
		ref: inRef,
		externalForwardedProps: other
	}));
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerFieldUIContextProvider, {
		slots,
		slotProps,
		inputRef: other.inputRef,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerFieldUI, {
			fieldResponse,
			defaultOpenPickerIcon: CalendarIcon
		})
	});
});
DateField.displayName = "DateField";
DateField.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool,
	/**
	* If `true`, the `input` element is focused during the first mount.
	* @default false
	*/
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	/**
	* If `true`, a clear button will be shown in the field allowing value clearing.
	* @default false
	*/
	clearable: import_prop_types.default.bool,
	/**
	* The position at which the clear button is placed.
	* If the field is not clearable, the button is not rendered.
	* @default 'end'
	*/
	clearButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]),
	component: import_prop_types.default.elementType,
	/**
	* The default value. Use when the component is not controlled.
	*/
	defaultValue: import_prop_types.default.object,
	/**
	* If `true`, the component is disabled.
	* When disabled, the value cannot be changed and no interaction is possible.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, disable values after the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disableFuture: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the `input` will indicate an error.
	* @default false
	*/
	error: import_prop_types.default.bool,
	/**
	* The ref object used to imperatively interact with the field.
	*/
	fieldRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
	/**
	* If `true`, the component is displayed in focused state.
	*/
	focused: import_prop_types.default.bool,
	/**
	* Format of the date when rendered in the input(s).
	*/
	format: import_prop_types.default.string,
	/**
	* Density of the format when rendered in the input.
	* Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
	* @default "dense"
	*/
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	/**
	* If `true`, the input will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* The helper text content.
	*/
	helperText: import_prop_types.default.node,
	/**
	* If `true`, the label is hidden.
	* This is used to increase density for a `FilledInput`.
	* Be sure to add `aria-label` to the `input` element.
	* @default false
	*/
	hiddenLabel: import_prop_types.default.bool,
	/**
	* The id of the `input` element.
	*/
	id: import_prop_types.default.string,
	/**
	* Pass a ref to the `input` element.
	*/
	inputRef: refType,
	/**
	* The label content.
	*/
	label: import_prop_types.default.node,
	/**
	* If `dense` or `normal`, will adjust vertical spacing of this and contained components.
	* @default 'none'
	*/
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	/**
	* Maximal selectable date.
	* @default 2099-12-31
	*/
	maxDate: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	/**
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The new value.
	* @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired when the clear button is clicked.
	*/
	onClear: import_prop_types.default.func,
	onClick: import_prop_types.default.func,
	/**
	* Callback fired when the error associated with the current value changes.
	* When a validation error is detected, the `error` parameter contains a non-null value.
	* This can be used to render an appropriate form error.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @param {TError} error The reason why the current value is not valid.
	* @param {TValue} value The value associated with the error.
	*/
	onError: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onInput: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onMouseDown: import_prop_types.default.func,
	onPaste: import_prop_types.default.func,
	/**
	* Callback fired when the selected sections change.
	* @param {FieldSelectedSections} newValue The new selected sections.
	*/
	onSelectedSectionsChange: import_prop_types.default.func,
	/**
	* The position at which the opening button is placed.
	* If there is no Picker to open, the button is not rendered
	* @default 'end'
	*/
	openPickerButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
	* For example, on time fields it will be used to determine the date to set.
	* @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* If `true`, the label will indicate that the `input` is required.
	* @default false
	*/
	required: import_prop_types.default.bool,
	/**
	* The currently selected sections.
	* This prop accepts four formats:
	* 1. If a number is provided, the section at this index will be selected.
	* 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
	* 3. If `"all"` is provided, all the sections will be selected.
	* 4. If `null` is provided, no section will be selected.
	* If not provided, the selected sections will be handled internally.
	*/
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	/**
	* Disable specific date.
	*
	* Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
	*
	* @param {PickerValidDate} day The date to test.
	* @returns {boolean} If `true` the date will be disabled.
	*/
	shouldDisableDate: import_prop_types.default.func,
	/**
	* Disable specific month.
	* @param {PickerValidDate} month The month to test.
	* @returns {boolean} If `true`, the month will be disabled.
	*/
	shouldDisableMonth: import_prop_types.default.func,
	/**
	* Disable specific year.
	* @param {PickerValidDate} year The year to test.
	* @returns {boolean} If `true`, the year will be disabled.
	*/
	shouldDisableYear: import_prop_types.default.func,
	/**
	* If `true`, the format will respect the leading zeroes (for example on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
	* If `false`, the format will always add leading zeroes (for example on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
	*
	* Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (for example "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
	*
	* Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
	* If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
	*
	* Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
	* This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
	*
	* @default false
	*/
	shouldRespectLeadingZeros: import_prop_types.default.bool,
	/**
	* The size of the component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOf(["medium", "small"]),
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* Start `InputAdornment` for this component.
	*/
	startAdornment: import_prop_types.default.node,
	style: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Choose which timezone to use for the value.
	* Example: "default", "system", "UTC", "America/New_York".
	* If you pass values from other timezones to some props, they will be converted to this timezone before being used.
	* @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
	* @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
	*/
	timezone: import_prop_types.default.string,
	/**
	* The selected value.
	* Used when the component is controlled.
	*/
	value: import_prop_types.default.object,
	/**
	* The variant to use.
	* @default 'outlined'
	*/
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker.mjs
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopDatePicker API](https://mui.com/x/api/date-pickers/desktop-date-picker/)
*/
var DesktopDatePicker = /*#__PURE__*/ import_react.forwardRef(function DesktopDatePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiDesktopDatePicker");
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar
	}, defaultizedProps.viewRenderers);
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			closeOnSelect: defaultizedProps.closeOnSelect ?? true,
			viewRenderers,
			format: resolveDateFormat(adapter, defaultizedProps, false),
			yearsPerRow: defaultizedProps.yearsPerRow ?? 4,
			slots: _extends({ field: DateField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({ hidden: true }, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date",
		validator: validateDate,
		steps: null
	});
	return renderPicker();
});
DesktopDatePicker.displayName = "DesktopDatePicker";
DesktopDatePicker.propTypes = {
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	/**
	* If `true`, the Picker will close after submitting the full date.
	* @default true
	*/
	closeOnSelect: import_prop_types.default.bool,
	/**
	* Formats the day of week displayed in the calendar header.
	* @param {PickerValidDate} date The date of the day of week provided by the adapter.
	* @returns {string} The name to display.
	* @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
	*/
	dayOfWeekFormatter: import_prop_types.default.func,
	/**
	* The default value.
	* Used when the component is not controlled.
	*/
	defaultValue: import_prop_types.default.object,
	/**
	* If `true`, the component is disabled.
	* When disabled, the value cannot be changed and no interaction is possible.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, disable values after the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disableFuture: import_prop_types.default.bool,
	/**
	* If `true`, today's day is not highlighted.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
	/**
	* If `true`, the button to open the Picker will not be rendered (it will only render the field).
	* @deprecated Use the [field component](https://mui.com/x/react-date-pickers/fields/) instead.
	* @default false
	*/
	disableOpenPicker: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* If `true`, the week number will be display in the calendar.
	*/
	displayWeekNumber: import_prop_types.default.bool,
	/**
	* The day view will show as many weeks as needed after the end of the current month to match this value.
	* Put it to 6 to have a fixed number of weeks in Gregorian calendars
	*/
	fixedWeekNumber: import_prop_types.default.number,
	/**
	* Format of the date when rendered in the input(s).
	* Defaults to localized format based on the used `views`.
	*/
	format: import_prop_types.default.string,
	/**
	* Density of the format when rendered in the input.
	* Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
	* @default "dense"
	*/
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	/**
	* Pass a ref to the `input` element.
	*/
	inputRef: refType,
	/**
	* If `true`, keep the picker open when the value is edited from the field.
	* Useful to prevent the popper/dialog from closing while typing in the input.
	* This only affects changes with `source = "field"` and does not alter view interactions.
	* @default false
	*/
	keepOpenDuringFieldFocus: import_prop_types.default.bool,
	/**
	* The label content.
	*/
	label: import_prop_types.default.node,
	/**
	* If `true`, calls `renderLoading` instead of rendering the day calendar.
	* Can be used to preload information and show it in calendar.
	* @default false
	*/
	loading: import_prop_types.default.bool,
	/**
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable date.
	* @default 2099-12-31
	*/
	maxDate: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Months rendered per row.
	* @default 3
	*/
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	/**
	* Name attribute used by the `input` element in the Field.
	*/
	name: import_prop_types.default.string,
	/**
	* Callback fired when the value is accepted.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The value that was just accepted.
	* @param {FieldChangeHandlerContext<TError>} context Context about this acceptance:
	* - `validationError`: validation result of the current value
	* - `source`: source of the acceptance. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the value was accepted via a shortcut selection
	*/
	onAccept: import_prop_types.default.func,
	/**
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The new value.
	* @param {FieldChangeHandlerContext<TError>} context Context about this change:
	* - `validationError`: validation result of the current value
	* - `source`: source of the change. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the change was triggered by a shortcut selection
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be closed.
	* Use in controlled mode (see `open`).
	*/
	onClose: import_prop_types.default.func,
	/**
	* Callback fired when the error associated with the current value changes.
	* When a validation error is detected, the `error` parameter contains a non-null value.
	* This can be used to render an appropriate form error.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @param {TError} error The reason why the current value is not valid.
	* @param {TValue} value The value associated with the error.
	*/
	onError: import_prop_types.default.func,
	/**
	* Callback fired on month change.
	* @param {PickerValidDate} month The new month.
	*/
	onMonthChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be opened.
	* Use in controlled mode (see `open`).
	*/
	onOpen: import_prop_types.default.func,
	/**
	* Callback fired when the selected sections change.
	* @param {FieldSelectedSections} newValue The new selected sections.
	*/
	onSelectedSectionsChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
	/**
	* Callback fired on year change.
	* @param {PickerValidDate} year The new year.
	*/
	onYearChange: import_prop_types.default.func,
	/**
	* Control the popup or dialog open state.
	* @default false
	*/
	open: import_prop_types.default.bool,
	/**
	* The default visible view.
	* Used when the component view is not controlled.
	* Must be a valid option from `views` list.
	*/
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Force rendering in particular orientation.
	*/
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* If `true`, disable heavy animations.
	* @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
	*/
	reduceAnimations: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Component displaying when passed `loading` true.
	* @returns {React.ReactNode} The node to render when loading.
	* @default () => <span>…</span>
	*/
	renderLoading: import_prop_types.default.func,
	/**
	* The currently selected sections.
	* This prop accepts four formats:
	* 1. If a number is provided, the section at this index will be selected.
	* 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
	* 3. If `"all"` is provided, all the sections will be selected.
	* 4. If `null` is provided, no section will be selected.
	* If not provided, the selected sections will be handled internally.
	*/
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	/**
	* Disable specific date.
	*
	* Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
	*
	* @param {PickerValidDate} day The date to test.
	* @returns {boolean} If `true` the date will be disabled.
	*/
	shouldDisableDate: import_prop_types.default.func,
	/**
	* Disable specific month.
	* @param {PickerValidDate} month The month to test.
	* @returns {boolean} If `true`, the month will be disabled.
	*/
	shouldDisableMonth: import_prop_types.default.func,
	/**
	* Disable specific year.
	* @param {PickerValidDate} year The year to test.
	* @returns {boolean} If `true`, the year will be disabled.
	*/
	shouldDisableYear: import_prop_types.default.func,
	/**
	* If `true`, days outside the current month are rendered:
	*
	* - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
	*
	* - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
	*
	* - ignored if `calendars` equals more than `1` on range pickers.
	* @default false
	*/
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Choose which timezone to use for the value.
	* Example: "default", "system", "UTC", "America/New_York".
	* If you pass values from other timezones to some props, they will be converted to this timezone before being used.
	* @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
	* @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
	*/
	timezone: import_prop_types.default.string,
	/**
	* The selected value.
	* Used when the component is controlled.
	*/
	value: import_prop_types.default.object,
	/**
	* The visible view.
	* Used when the component view is controlled.
	* Must be a valid option from `views` list.
	*/
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	/**
	* Years are displayed in ascending (chronological) order by default.
	* If `desc`, years are displayed in descending order.
	* @default 'asc'
	*/
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	/**
	* Years rendered per row.
	* @default 4
	*/
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/MobileDatePicker/MobileDatePicker.mjs
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileDatePicker API](https://mui.com/x/api/date-pickers/mobile-date-picker/)
*/
var MobileDatePicker = /*#__PURE__*/ import_react.forwardRef(function MobileDatePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiMobileDatePicker");
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers: _extends({
				day: renderDateViewCalendar,
				month: renderDateViewCalendar,
				year: renderDateViewCalendar
			}, defaultizedProps.viewRenderers),
			format: resolveDateFormat(adapter, defaultizedProps, false),
			slots: _extends({ field: DateField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({ hidden: false }, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date",
		validator: validateDate,
		steps: null
	});
	return renderPicker();
});
MobileDatePicker.displayName = "MobileDatePicker";
MobileDatePicker.propTypes = {
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	/**
	* If `true`, the Picker will close after submitting the full date.
	* @default false
	*/
	closeOnSelect: import_prop_types.default.bool,
	/**
	* Formats the day of week displayed in the calendar header.
	* @param {PickerValidDate} date The date of the day of week provided by the adapter.
	* @returns {string} The name to display.
	* @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
	*/
	dayOfWeekFormatter: import_prop_types.default.func,
	/**
	* The default value.
	* Used when the component is not controlled.
	*/
	defaultValue: import_prop_types.default.object,
	/**
	* If `true`, the component is disabled.
	* When disabled, the value cannot be changed and no interaction is possible.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, disable values after the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disableFuture: import_prop_types.default.bool,
	/**
	* If `true`, today's day is not highlighted.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
	/**
	* If `true`, the button to open the Picker will not be rendered (it will only render the field).
	* @deprecated Use the [field component](https://mui.com/x/react-date-pickers/fields/) instead.
	* @default false
	*/
	disableOpenPicker: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* If `true`, the week number will be display in the calendar.
	*/
	displayWeekNumber: import_prop_types.default.bool,
	/**
	* The day view will show as many weeks as needed after the end of the current month to match this value.
	* Put it to 6 to have a fixed number of weeks in Gregorian calendars
	*/
	fixedWeekNumber: import_prop_types.default.number,
	/**
	* Format of the date when rendered in the input(s).
	* Defaults to localized format based on the used `views`.
	*/
	format: import_prop_types.default.string,
	/**
	* Density of the format when rendered in the input.
	* Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
	* @default "dense"
	*/
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	/**
	* Pass a ref to the `input` element.
	*/
	inputRef: refType,
	/**
	* If `true`, keep the picker open when the value is edited from the field.
	* Useful to prevent the popper/dialog from closing while typing in the input.
	* This only affects changes with `source = "field"` and does not alter view interactions.
	* @default false
	*/
	keepOpenDuringFieldFocus: import_prop_types.default.bool,
	/**
	* The label content.
	*/
	label: import_prop_types.default.node,
	/**
	* If `true`, calls `renderLoading` instead of rendering the day calendar.
	* Can be used to preload information and show it in calendar.
	* @default false
	*/
	loading: import_prop_types.default.bool,
	/**
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable date.
	* @default 2099-12-31
	*/
	maxDate: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Months rendered per row.
	* @default 3
	*/
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	/**
	* Name attribute used by the `input` element in the Field.
	*/
	name: import_prop_types.default.string,
	/**
	* Callback fired when the value is accepted.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The value that was just accepted.
	* @param {FieldChangeHandlerContext<TError>} context Context about this acceptance:
	* - `validationError`: validation result of the current value
	* - `source`: source of the acceptance. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the value was accepted via a shortcut selection
	*/
	onAccept: import_prop_types.default.func,
	/**
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The new value.
	* @param {FieldChangeHandlerContext<TError>} context Context about this change:
	* - `validationError`: validation result of the current value
	* - `source`: source of the change. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the change was triggered by a shortcut selection
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be closed.
	* Use in controlled mode (see `open`).
	*/
	onClose: import_prop_types.default.func,
	/**
	* Callback fired when the error associated with the current value changes.
	* When a validation error is detected, the `error` parameter contains a non-null value.
	* This can be used to render an appropriate form error.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @param {TError} error The reason why the current value is not valid.
	* @param {TValue} value The value associated with the error.
	*/
	onError: import_prop_types.default.func,
	/**
	* Callback fired on month change.
	* @param {PickerValidDate} month The new month.
	*/
	onMonthChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be opened.
	* Use in controlled mode (see `open`).
	*/
	onOpen: import_prop_types.default.func,
	/**
	* Callback fired when the selected sections change.
	* @param {FieldSelectedSections} newValue The new selected sections.
	*/
	onSelectedSectionsChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
	/**
	* Callback fired on year change.
	* @param {PickerValidDate} year The new year.
	*/
	onYearChange: import_prop_types.default.func,
	/**
	* Control the popup or dialog open state.
	* @default false
	*/
	open: import_prop_types.default.bool,
	/**
	* The default visible view.
	* Used when the component view is not controlled.
	* Must be a valid option from `views` list.
	*/
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Force rendering in particular orientation.
	*/
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* If `true`, disable heavy animations.
	* @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
	*/
	reduceAnimations: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Component displaying when passed `loading` true.
	* @returns {React.ReactNode} The node to render when loading.
	* @default () => <span>…</span>
	*/
	renderLoading: import_prop_types.default.func,
	/**
	* The currently selected sections.
	* This prop accepts four formats:
	* 1. If a number is provided, the section at this index will be selected.
	* 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
	* 3. If `"all"` is provided, all the sections will be selected.
	* 4. If `null` is provided, no section will be selected.
	* If not provided, the selected sections will be handled internally.
	*/
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	/**
	* Disable specific date.
	*
	* Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
	*
	* @param {PickerValidDate} day The date to test.
	* @returns {boolean} If `true` the date will be disabled.
	*/
	shouldDisableDate: import_prop_types.default.func,
	/**
	* Disable specific month.
	* @param {PickerValidDate} month The month to test.
	* @returns {boolean} If `true`, the month will be disabled.
	*/
	shouldDisableMonth: import_prop_types.default.func,
	/**
	* Disable specific year.
	* @param {PickerValidDate} year The year to test.
	* @returns {boolean} If `true`, the year will be disabled.
	*/
	shouldDisableYear: import_prop_types.default.func,
	/**
	* If `true`, days outside the current month are rendered:
	*
	* - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
	*
	* - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
	*
	* - ignored if `calendars` equals more than `1` on range pickers.
	* @default false
	*/
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Choose which timezone to use for the value.
	* Example: "default", "system", "UTC", "America/New_York".
	* If you pass values from other timezones to some props, they will be converted to this timezone before being used.
	* @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
	* @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
	*/
	timezone: import_prop_types.default.string,
	/**
	* The selected value.
	* Used when the component is controlled.
	*/
	value: import_prop_types.default.object,
	/**
	* The visible view.
	* Used when the component view is controlled.
	* Must be a valid option from `views` list.
	*/
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	/**
	* Years are displayed in ascending (chronological) order by default.
	* If `desc`, years are displayed in descending order.
	* @default 'asc'
	*/
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	/**
	* Years rendered per row.
	* @default 3
	*/
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DatePicker/DatePicker.mjs
var _excluded = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DatePicker API](https://mui.com/x/api/date-pickers/date-picker/)
*/
var DatePicker = /*#__PURE__*/ import_react.forwardRef(function DatePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDatePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DesktopDatePicker, _extends({ ref }, other));
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MobileDatePicker, _extends({ ref }, other));
});
DatePicker.displayName = "DatePicker";
DatePicker.propTypes = {
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	/**
	* If `true`, the Picker will close after submitting the full date.
	* @default `true` for desktop, `false` for mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
	*/
	closeOnSelect: import_prop_types.default.bool,
	/**
	* Formats the day of week displayed in the calendar header.
	* @param {PickerValidDate} date The date of the day of week provided by the adapter.
	* @returns {string} The name to display.
	* @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
	*/
	dayOfWeekFormatter: import_prop_types.default.func,
	/**
	* The default value.
	* Used when the component is not controlled.
	*/
	defaultValue: import_prop_types.default.object,
	/**
	* CSS media query when `Mobile` mode will be changed to `Desktop`.
	* @default '@media (pointer: fine)'
	* @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
	*/
	desktopModeMediaQuery: import_prop_types.default.string,
	/**
	* If `true`, the component is disabled.
	* When disabled, the value cannot be changed and no interaction is possible.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, disable values after the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disableFuture: import_prop_types.default.bool,
	/**
	* If `true`, today's day is not highlighted.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
	/**
	* If `true`, the button to open the Picker will not be rendered (it will only render the field).
	* @deprecated Use the [field component](https://mui.com/x/react-date-pickers/fields/) instead.
	* @default false
	*/
	disableOpenPicker: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* If `true`, the week number will be display in the calendar.
	*/
	displayWeekNumber: import_prop_types.default.bool,
	/**
	* The day view will show as many weeks as needed after the end of the current month to match this value.
	* Put it to 6 to have a fixed number of weeks in Gregorian calendars
	*/
	fixedWeekNumber: import_prop_types.default.number,
	/**
	* Format of the date when rendered in the input(s).
	* Defaults to localized format based on the used `views`.
	*/
	format: import_prop_types.default.string,
	/**
	* Density of the format when rendered in the input.
	* Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
	* @default "dense"
	*/
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	/**
	* Pass a ref to the `input` element.
	*/
	inputRef: refType,
	/**
	* If `true`, keep the picker open when the value is edited from the field.
	* Useful to prevent the popper/dialog from closing while typing in the input.
	* This only affects changes with `source = "field"` and does not alter view interactions.
	* @default false
	*/
	keepOpenDuringFieldFocus: import_prop_types.default.bool,
	/**
	* The label content.
	*/
	label: import_prop_types.default.node,
	/**
	* If `true`, calls `renderLoading` instead of rendering the day calendar.
	* Can be used to preload information and show it in calendar.
	* @default false
	*/
	loading: import_prop_types.default.bool,
	/**
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable date.
	* @default 2099-12-31
	*/
	maxDate: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Months rendered per row.
	* @default 3
	*/
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	/**
	* Name attribute used by the `input` element in the Field.
	*/
	name: import_prop_types.default.string,
	/**
	* Callback fired when the value is accepted.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The value that was just accepted.
	* @param {FieldChangeHandlerContext<TError>} context Context about this acceptance:
	* - `validationError`: validation result of the current value
	* - `source`: source of the acceptance. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the value was accepted via a shortcut selection
	*/
	onAccept: import_prop_types.default.func,
	/**
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @param {TValue} value The new value.
	* @param {FieldChangeHandlerContext<TError>} context Context about this change:
	* - `validationError`: validation result of the current value
	* - `source`: source of the change. One of 'field' | 'view' | 'unknown'
	* - `shortcut` (optional): the shortcut metadata if the change was triggered by a shortcut selection
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be closed.
	* Use in controlled mode (see `open`).
	*/
	onClose: import_prop_types.default.func,
	/**
	* Callback fired when the error associated with the current value changes.
	* When a validation error is detected, the `error` parameter contains a non-null value.
	* This can be used to render an appropriate form error.
	* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @param {TError} error The reason why the current value is not valid.
	* @param {TValue} value The value associated with the error.
	*/
	onError: import_prop_types.default.func,
	/**
	* Callback fired on month change.
	* @param {PickerValidDate} month The new month.
	*/
	onMonthChange: import_prop_types.default.func,
	/**
	* Callback fired when the popup requests to be opened.
	* Use in controlled mode (see `open`).
	*/
	onOpen: import_prop_types.default.func,
	/**
	* Callback fired when the selected sections change.
	* @param {FieldSelectedSections} newValue The new selected sections.
	*/
	onSelectedSectionsChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
	/**
	* Callback fired on year change.
	* @param {PickerValidDate} year The new year.
	*/
	onYearChange: import_prop_types.default.func,
	/**
	* Control the popup or dialog open state.
	* @default false
	*/
	open: import_prop_types.default.bool,
	/**
	* The default visible view.
	* Used when the component view is not controlled.
	* Must be a valid option from `views` list.
	*/
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Force rendering in particular orientation.
	*/
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* If `true`, disable heavy animations.
	* @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
	*/
	reduceAnimations: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Component displaying when passed `loading` true.
	* @returns {React.ReactNode} The node to render when loading.
	* @default () => <span>…</span>
	*/
	renderLoading: import_prop_types.default.func,
	/**
	* The currently selected sections.
	* This prop accepts four formats:
	* 1. If a number is provided, the section at this index will be selected.
	* 2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
	* 3. If `"all"` is provided, all the sections will be selected.
	* 4. If `null` is provided, no section will be selected.
	* If not provided, the selected sections will be handled internally.
	*/
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	/**
	* Disable specific date.
	*
	* Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
	*
	* @param {PickerValidDate} day The date to test.
	* @returns {boolean} If `true` the date will be disabled.
	*/
	shouldDisableDate: import_prop_types.default.func,
	/**
	* Disable specific month.
	* @param {PickerValidDate} month The month to test.
	* @returns {boolean} If `true`, the month will be disabled.
	*/
	shouldDisableMonth: import_prop_types.default.func,
	/**
	* Disable specific year.
	* @param {PickerValidDate} year The year to test.
	* @returns {boolean} If `true`, the year will be disabled.
	*/
	shouldDisableYear: import_prop_types.default.func,
	/**
	* If `true`, days outside the current month are rendered:
	*
	* - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
	*
	* - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
	*
	* - ignored if `calendars` equals more than `1` on range pickers.
	* @default false
	*/
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Choose which timezone to use for the value.
	* Example: "default", "system", "UTC", "America/New_York".
	* If you pass values from other timezones to some props, they will be converted to this timezone before being used.
	* @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
	* @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
	*/
	timezone: import_prop_types.default.string,
	/**
	* The selected value.
	* Used when the component is controlled.
	*/
	value: import_prop_types.default.object,
	/**
	* The visible view.
	* Used when the component view is controlled.
	* Must be a valid option from `views` list.
	*/
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	/**
	* Years are displayed in ascending (chronological) order by default.
	* If `desc`, years are displayed in descending order.
	* @default 'asc'
	*/
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	/**
	* Years rendered per row.
	* @default 4 on desktop, 3 on mobile
	*/
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
export { DatePicker, DatePickerToolbar, datePickerToolbarClasses };

//# sourceMappingURL=@mui_x-date-pickers_DatePicker.js.map