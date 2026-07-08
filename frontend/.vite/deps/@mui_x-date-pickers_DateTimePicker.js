import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, h as clsx, i as styled, l as useRtl, m as generateUtilityClass, o as useTheme, p as shouldForwardProp, r as useThemeProps, v as require_react_is } from "./LocalizationProvider-CyOIGrUO.js";
import { $ as useToolbarOwnerState, A as createSvgIcon, At as useForkRef_default, B as contains_default, D as useEventCallback_default, Dt as getTransitionStyles, E as ButtonBase, Et as useMediaQuery, H as isLayoutSupported, Ht as generateUtilityClasses, I as DEFAULT_DESKTOP_MODE_MEDIA_QUERY, K as useSlotProps, Mt as useDefaultProps, Nt as memoTheme, O as unsupportedProp_default, Ot as getActiveElement_default, Q as PickersToolbar, Rt as refType, S as useSlot, Tt as resolveComponentProps, W as useReducedMotion, X as usePickerTranslations, Y as extractValidationProps, Z as usePickerAdapter, _ as useField, _t as formatMeridiem, at as singleItemFieldValueManager, b as PickersLayoutRoot, c as PickerFieldUI, ct as EXPORTED_TIME_VIEWS, dt as isInternalTimeView, et as usePickerPrivateContext, f as CalendarIcon, h as TimeIcon, ht as applyDefaultDate, i as useMeridiemMode, j as pickersLayoutClasses, jt as capitalize_default, l as PickerFieldUIContextProvider, m as DateRangeIcon, mt as DATE_VIEWS, ot as singleItemValueManager, q as useDefaultDates, rt as pickersToolbarClasses, t as useMobilePicker, tt as usePickerContext, u as useFieldTextFieldProps, v as useDesktopPicker, wt as applyDefaultViewProps, x as usePickerLayout, xt as isDatePickerView, y as PickersLayoutContentWrapper, z as mergeSx, zt as composeClasses } from "./useMobilePicker-CRLhUKKU.js";
import { _ as ownerWindow_default, b as useEnhancedEffect_default, c as digitalClockClasses, d as useRovingTabIndexRoot, f as RovingTabIndexContext, g as pickersToolbarTextClasses, h as PickersToolbarText, i as renderMultiSectionDigitalClockTimeView, l as getDividerUtilityClass, m as PickersToolbarButton, n as resolveTimeViewsResponse, o as multiSectionDigitalClockSectionClasses, p as useRovingTabIndexContext, r as renderDigitalClockTimeView, s as multiSectionDigitalClockClasses, t as resolveDateTimeFormat, u as useRovingTabIndexItem, v as validateTime, y as ownerDocument_default } from "./date-time-utils-B9Tj6ytM.js";
import { i as validateDate, t as renderDateViewCalendar } from "./dateViewRenderers-BcnUXFC0.js";
//#region node_modules/@mui/utils/debounce/debounce.mjs
function debounce(func, wait = 166) {
	let timeout;
	function debounced(...args) {
		const later = () => {
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}
	debounced.clear = () => {
		clearTimeout(timeout);
	};
	return debounced;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/validation/validateDateTime.mjs
/**
* Validation props used by the Date Time Picker and Date Time Field components.
*/
/**
* Validation props as received by the validateDateTime method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateDateTime method.
*/
var validateDateTime = ({ adapter, value, timezone, props }) => {
	const dateValidationResult = validateDate({
		adapter,
		value,
		timezone,
		props
	});
	if (dateValidationResult !== null) return dateValidationResult;
	return validateTime({
		adapter,
		value,
		timezone,
		props
	});
};
validateDateTime.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/material/utils/debounce.mjs
var debounce_default = debounce;
//#endregion
//#region node_modules/@mui/x-date-pickers/managers/useDateTimeManager.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDateTimeManager() {
	return import_react.useMemo(() => ({
		valueType: "date-time",
		validator: validateDateTime,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateTimeFieldInternalProps,
		internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel
	}), []);
}
function useOpenPickerButtonAriaLabel(value) {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	return import_react.useMemo(() => {
		const formattedValue = adapter.isValid(value) ? adapter.format(value, "fullDate") : null;
		return translations.openDatePickerDialogue(formattedValue);
	}, [
		value,
		translations,
		adapter
	]);
}
function useApplyDefaultValuesToDateTimeFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToDateTimeValidationProps(internalProps);
	const ampm = import_react.useMemo(() => internalProps.ampm ?? adapter.is12HourCycleInCurrentLocale(), [internalProps.ampm, adapter]);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? (ampm ? adapter.formats.keyboardDateTime12h : adapter.formats.keyboardDateTime24h) }), [
		internalProps,
		validationProps,
		ampm,
		adapter
	]);
}
function useApplyDefaultValuesToDateTimeValidationProps(props) {
	const adapter = usePickerAdapter();
	const defaultDates = useDefaultDates();
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false,
		disableIgnoringDatePartForTimeValidation: !!props.minDateTime || !!props.maxDateTime || !!props.disableFuture || !!props.disablePast,
		minDate: applyDefaultDate(adapter, props.minDateTime ?? props.minDate, defaultDates.minDate),
		maxDate: applyDefaultDate(adapter, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
		minTime: props.minDateTime ?? props.minTime,
		maxTime: props.maxDateTime ?? props.maxTime
	}), [
		props.minDateTime,
		props.maxDateTime,
		props.minTime,
		props.maxTime,
		props.minDate,
		props.maxDate,
		props.disableFuture,
		props.disablePast,
		adapter,
		defaultDates
	]);
}
//#endregion
//#region node_modules/@mui/material/Divider/Divider.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses$5 = (ownerState) => {
	const { absolute, children, classes, flexItem, orientation, textAlign, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			absolute && "absolute",
			variant,
			orientation === "vertical" && "vertical",
			flexItem && "flexItem",
			children && "withChildren",
			textAlign === "right" && orientation !== "vertical" && "textAlignRight",
			textAlign === "left" && orientation !== "vertical" && "textAlignLeft"
		],
		wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
	}, getDividerUtilityClass, classes);
};
var DividerRoot = styled("div", {
	name: "MuiDivider",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.absolute && styles.absolute,
			styles[ownerState.variant],
			ownerState.orientation === "vertical" && styles.vertical,
			ownerState.flexItem && styles.flexItem,
			ownerState.children && styles.withChildren,
			ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles.textAlignRight,
			ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles.textAlignLeft
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	flexShrink: 0,
	borderWidth: 0,
	borderStyle: "solid",
	borderColor: (theme.vars || theme).palette.divider,
	borderBottomWidth: "thin",
	variants: [
		{
			props: { absolute: true },
			style: {
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%"
			}
		},
		{
			props: { variant: "inset" },
			style: { marginLeft: 72 }
		},
		{
			props: {
				variant: "middle",
				orientation: "horizontal"
			},
			style: {
				marginLeft: theme.spacing(2),
				marginRight: theme.spacing(2)
			}
		},
		{
			props: {
				variant: "middle",
				orientation: "vertical"
			},
			style: {
				marginTop: theme.spacing(1),
				marginBottom: theme.spacing(1)
			}
		},
		{
			props: { orientation: "vertical" },
			style: {
				height: "100%",
				borderBottomWidth: 0,
				borderRightWidth: "thin"
			}
		},
		{
			props: { flexItem: true },
			style: {
				alignSelf: "stretch",
				height: "auto"
			}
		},
		{
			props: ({ ownerState }) => !!ownerState.children,
			style: {
				display: "flex",
				textAlign: "center",
				border: 0,
				borderTopStyle: "solid",
				borderLeftStyle: "solid",
				"&::before, &::after": {
					content: "\"\"",
					alignSelf: "center"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.children && ownerState.orientation !== "vertical",
			style: { "&::before, &::after": {
				width: "100%",
				borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
				borderTopStyle: "inherit"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.orientation === "vertical" && ownerState.children,
			style: {
				flexDirection: "column",
				"&::before, &::after": {
					height: "100%",
					borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
					borderLeftStyle: "inherit"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "right" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "90%" },
				"&::after": { width: "10%" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "left" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "10%" },
				"&::after": { width: "90%" }
			}
		}
	]
})));
var DividerWrapper = styled("span", {
	name: "MuiDivider",
	slot: "Wrapper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.wrapper, ownerState.orientation === "vertical" && styles.wrapperVertical];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
	paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
	whiteSpace: "nowrap",
	variants: [{
		props: { orientation: "vertical" },
		style: {
			paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
			paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
		}
	}]
})));
var Divider = /*#__PURE__*/ import_react.forwardRef(function Divider(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDivider"
	});
	const { absolute = false, children, className, orientation = "horizontal", component = children || orientation === "vertical" ? "div" : "hr", flexItem = false, role = component !== "hr" ? "separator" : void 0, textAlign = "center", variant = "fullWidth", ...other } = props;
	const ownerState = {
		...props,
		absolute,
		component,
		flexItem,
		orientation,
		role,
		textAlign,
		variant
	};
	const classes = useUtilityClasses$5(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DividerRoot, {
		as: component,
		className: clsx(classes.root, className),
		role,
		ref,
		ownerState,
		"aria-orientation": role === "separator" && (component !== "hr" || orientation === "vertical") ? orientation : void 0,
		...other,
		children: children ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DividerWrapper, {
			className: classes.wrapper,
			ownerState,
			children
		}) : null
	});
});
Divider.propTypes = {
	/**
	* Absolutely position the element.
	* @default false
	*/
	absolute: import_prop_types.default.bool,
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, a vertical divider will have the correct height when used in flex container.
	* (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
	* @default false
	*/
	flexItem: import_prop_types.default.bool,
	/**
	* The component orientation.
	* @default 'horizontal'
	*/
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	/**
	* @ignore
	*/
	role: import_prop_types.default.string,
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
	* The text alignment.
	* @default 'center'
	*/
	textAlign: import_prop_types.default.oneOf([
		"center",
		"left",
		"right"
	]),
	/**
	* The variant to use.
	* @default 'fullWidth'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"fullWidth",
		"inset",
		"middle"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimeField/useDateTimeField.mjs
var useDateTimeField = (props) => {
	return useField({
		manager: useDateTimeManager(),
		props
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimeField/DateTimeField.mjs
var _excluded$3 = ["slots", "slotProps"];
/**
* Demos:
*
* - [DateTimeField](http://mui.com/x/react-date-pickers/date-time-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [DateTimeField API](https://mui.com/x/api/date-pickers/date-time-field/)
*/
var DateTimeField = /*#__PURE__*/ import_react.forwardRef(function DateTimeField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiDateTimeField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$3);
	const fieldResponse = useDateTimeField(useFieldTextFieldProps({
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
DateTimeField.displayName = "DateTimeField";
DateTimeField.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
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
	* Do not ignore date part when validating min/max time.
	* @default false
	*/
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
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
	* Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
	*/
	maxDateTime: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
	*/
	minDateTime: import_prop_types.default.object,
	/**
	* Minimal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	minTime: import_prop_types.default.object,
	/**
	* Step over minutes.
	* @default 1
	*/
	minutesStep: import_prop_types.default.number,
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
//#region node_modules/@mui/material/Tab/tabClasses.mjs
function getTabUtilityClass(slot) {
	return generateUtilityClass("MuiTab", slot);
}
var tabClasses = generateUtilityClasses("MuiTab", [
	"root",
	"labelIcon",
	"textColorInherit",
	"textColorPrimary",
	"textColorSecondary",
	"selected",
	"disabled",
	"fullWidth",
	"wrapped",
	"icon"
]);
//#endregion
//#region node_modules/@mui/material/Tab/Tab.mjs
var useUtilityClasses$4 = (ownerState) => {
	const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = ownerState;
	return composeClasses({
		root: [
			"root",
			icon && label && "labelIcon",
			`textColor${capitalize_default(textColor)}`,
			fullWidth && "fullWidth",
			wrapped && "wrapped",
			selected && "selected",
			disabled && "disabled"
		],
		icon: ["icon"]
	}, getTabUtilityClass, classes);
};
var TabRoot = styled(ButtonBase, {
	name: "MuiTab",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.label && ownerState.icon && styles.labelIcon,
			styles[`textColor${capitalize_default(ownerState.textColor)}`],
			ownerState.fullWidth && styles.fullWidth,
			ownerState.wrapped && styles.wrapped,
			{ [`& .${tabClasses.icon}`]: styles.icon }
		];
	}
})(memoTheme(({ theme }) => ({
	...theme.typography.button,
	maxWidth: 360,
	minWidth: 90,
	position: "relative",
	minHeight: 48,
	flexShrink: 0,
	padding: "12px 16px",
	overflow: "hidden",
	whiteSpace: "normal",
	textAlign: "center",
	lineHeight: 1.25,
	variants: [
		{
			props: ({ ownerState }) => ownerState.label && (ownerState.iconPosition === "top" || ownerState.iconPosition === "bottom"),
			style: { flexDirection: "column" }
		},
		{
			props: ({ ownerState }) => ownerState.label && ownerState.iconPosition !== "top" && ownerState.iconPosition !== "bottom",
			style: { flexDirection: "row" }
		},
		{
			props: ({ ownerState }) => ownerState.icon && ownerState.label,
			style: {
				minHeight: 72,
				paddingTop: 9,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "top",
			style: { [`& > .${tabClasses.icon}`]: { marginBottom: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "bottom",
			style: { [`& > .${tabClasses.icon}`]: { marginTop: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "start",
			style: { [`& > .${tabClasses.icon}`]: { marginRight: theme.spacing(1) } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "end",
			style: { [`& > .${tabClasses.icon}`]: { marginLeft: theme.spacing(1) } }
		},
		{
			props: { textColor: "inherit" },
			style: {
				color: "inherit",
				opacity: .6,
				[`&.${tabClasses.selected}`]: { opacity: 1 },
				[`&.${tabClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity }
			}
		},
		{
			props: { textColor: "primary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.primary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: { textColor: "secondary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.secondary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: {
				flexShrink: 1,
				flexGrow: 1,
				flexBasis: 0,
				maxWidth: "none"
			}
		},
		{
			props: ({ ownerState }) => ownerState.wrapped,
			style: { fontSize: theme.typography.pxToRem(12) }
		}
	]
})));
var Tab = /*#__PURE__*/ import_react.forwardRef(function Tab(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTab"
	});
	const { className, disabled = false, disableFocusRipple = false, fullWidth, icon: iconProp, iconPosition = "top", indicator, label, onChange, onClick, onFocus, selected, selectionFollowsFocus, textColor = "inherit", value, wrapped = false, ...other } = props;
	const rovingContext = useRovingTabIndexContext();
	const rovingItemProps = useRovingTabIndexItem({
		id: value,
		ref,
		disabled,
		selected
	});
	const tabIndex = rovingContext.getItemMap().size === 0 && selected ? 0 : rovingItemProps.tabIndex;
	const ownerState = {
		...props,
		disabled,
		disableFocusRipple,
		selected,
		icon: !!iconProp,
		iconPosition,
		label: !!label,
		fullWidth,
		textColor,
		wrapped
	};
	const classes = useUtilityClasses$4(ownerState);
	const icon = iconProp && label && /*#__PURE__*/ import_react.isValidElement(iconProp) ? /*#__PURE__*/ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) }) : iconProp;
	const handleClick = (event) => {
		if (!selected && onChange) onChange(event, value);
		if (onClick) onClick(event);
	};
	const handleFocus = (event) => {
		if (selectionFollowsFocus && !selected && onChange) onChange(event, value);
		if (onFocus) onFocus(event);
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TabRoot, {
		internalNativeButton: true,
		focusRipple: !disableFocusRipple,
		className: clsx(classes.root, className),
		ref: rovingItemProps.ref,
		role: "tab",
		"aria-selected": selected,
		disabled,
		onClick: handleClick,
		onFocus: handleFocus,
		tabIndex,
		ownerState,
		...other,
		children: [iconPosition === "top" || iconPosition === "start" ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [icon, label] }) : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [label, icon] }), indicator]
	});
});
Tab.propTypes = {
	/**
	* This prop isn't supported.
	* Use the `component` prop if you need to change the children structure.
	*/
	children: unsupportedProp_default,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the  keyboard focus ripple is disabled.
	* @default false
	*/
	disableFocusRipple: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* The icon to display.
	*/
	icon: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.string]),
	/**
	* The position of the icon relative to the label.
	* @default 'top'
	*/
	iconPosition: import_prop_types.default.oneOf([
		"bottom",
		"end",
		"start",
		"top"
	]),
	/**
	* The label element.
	*/
	label: import_prop_types.default.node,
	/**
	* @ignore
	*/
	onChange: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onClick: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onFocus: import_prop_types.default.func,
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
	* You can provide your own value. Otherwise, we fallback to the child position index.
	*/
	value: import_prop_types.default.any,
	/**
	* Tab labels appear in a single row.
	* They can use a second line if needed.
	* @default false
	*/
	wrapped: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/internal/animate.mjs
function easeInOutSin(time) {
	return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {}) {
	const { ease = easeInOutSin, duration = 300 } = options;
	let start = null;
	const from = element[property];
	let cancelled = false;
	const cancel = () => {
		cancelled = true;
	};
	const step = (timestamp) => {
		if (cancelled) {
			cb(/* @__PURE__ */ new Error("Animation cancelled"));
			return;
		}
		if (start === null) start = timestamp;
		const time = Math.min(1, (timestamp - start) / duration);
		element[property] = ease(time) * (to - from) + from;
		if (time >= 1) {
			requestAnimationFrame(() => {
				cb(null);
			});
			return;
		}
		requestAnimationFrame(step);
	};
	if (from === to) {
		cb(/* @__PURE__ */ new Error("Element already at target position"));
		return cancel;
	}
	requestAnimationFrame(step);
	return cancel;
}
//#endregion
//#region node_modules/@mui/material/Tabs/ScrollbarSize.mjs
var styles = {
	width: 99,
	height: 99,
	position: "absolute",
	top: -9999,
	overflow: "scroll",
	pointerEvents: "none"
};
/**
* @ignore - internal component.
* The component originates from https://github.com/STORIS/react-scrollbar-size.
* It has been moved into the core in order to minimize the bundle size.
*/
function ScrollbarSize(props) {
	const { onChange, ...other } = props;
	const scrollbarHeight = import_react.useRef();
	const nodeRef = import_react.useRef(null);
	const setMeasurements = () => {
		scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
	};
	useEnhancedEffect_default(() => {
		const handleResize = debounce_default(() => {
			const prevHeight = scrollbarHeight.current;
			setMeasurements();
			if (prevHeight !== scrollbarHeight.current) onChange(scrollbarHeight.current);
		});
		const containerWindow = ownerWindow_default(nodeRef.current);
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [onChange]);
	import_react.useEffect(() => {
		setMeasurements();
		onChange(scrollbarHeight.current);
	}, [onChange]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		style: styles,
		...other,
		ref: nodeRef
	});
}
ScrollbarSize.propTypes = { onChange: import_prop_types.default.func.isRequired };
//#endregion
//#region node_modules/@mui/material/internal/svg-icons/KeyboardArrowLeft.mjs
/**
* @ignore - internal component.
*/
var KeyboardArrowLeft_default = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }), "KeyboardArrowLeft");
//#endregion
//#region node_modules/@mui/material/internal/svg-icons/KeyboardArrowRight.mjs
/**
* @ignore - internal component.
*/
var KeyboardArrowRight_default = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }), "KeyboardArrowRight");
//#endregion
//#region node_modules/@mui/material/TabScrollButton/tabScrollButtonClasses.mjs
function getTabScrollButtonUtilityClass(slot) {
	return generateUtilityClass("MuiTabScrollButton", slot);
}
var tabScrollButtonClasses = generateUtilityClasses("MuiTabScrollButton", [
	"root",
	"vertical",
	"horizontal",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/material/TabScrollButton/TabScrollButton.mjs
var useUtilityClasses$3 = (ownerState) => {
	const { classes, orientation, disabled } = ownerState;
	return composeClasses({ root: [
		"root",
		orientation,
		disabled && "disabled"
	] }, getTabScrollButtonUtilityClass, classes);
};
var TabScrollButtonRoot = styled(ButtonBase, {
	name: "MuiTabScrollButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
	}
})({
	width: 40,
	flexShrink: 0,
	opacity: .8,
	[`&.${tabScrollButtonClasses.disabled}`]: { opacity: 0 },
	variants: [{
		props: { orientation: "vertical" },
		style: {
			width: "100%",
			height: 40,
			"& svg": { transform: "var(--TabScrollButton-svgRotate)" }
		}
	}]
});
var TabScrollButton = /*#__PURE__*/ import_react.forwardRef(function TabScrollButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabScrollButton"
	});
	const { className, slots = {}, slotProps = {}, direction, orientation, disabled, ...other } = props;
	const { nativeButton, ...buttonBaseProps } = other;
	const isRtl = useRtl();
	const ownerState = {
		isRtl,
		...props
	};
	const classes = useUtilityClasses$3(ownerState);
	const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft_default;
	const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight_default;
	const startButtonIconProps = useSlotProps({
		elementType: StartButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	const endButtonIconProps = useSlotProps({
		elementType: EndButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TabScrollButtonRoot, {
		component: "div",
		className: clsx(classes.root, className),
		ref,
		role: null,
		ownerState,
		tabIndex: null,
		...buttonBaseProps,
		style: {
			...buttonBaseProps.style,
			...orientation === "vertical" && { "--TabScrollButton-svgRotate": `rotate(${isRtl ? -90 : 90}deg)` }
		},
		children: direction === "left" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(StartButtonIcon, { ...startButtonIconProps }) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(EndButtonIcon, { ...endButtonIconProps })
	});
});
TabScrollButton.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The direction the button should indicate.
	*/
	direction: import_prop_types.default.oneOf(["left", "right"]).isRequired,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* The component orientation (layout flow direction).
	*/
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]).isRequired,
	/**
	* The extra props for the slot components.
	* You can override the existing props or add new ones.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		startScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		EndScrollButtonIcon: import_prop_types.default.elementType,
		StartScrollButtonIcon: import_prop_types.default.elementType
	}),
	/**
	* @ignore
	*/
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
	])
};
//#endregion
//#region node_modules/@mui/material/Tabs/tabsClasses.mjs
function getTabsUtilityClass(slot) {
	return generateUtilityClass("MuiTabs", slot);
}
var tabsClasses = generateUtilityClasses("MuiTabs", [
	"root",
	"vertical",
	"list",
	"centered",
	"scroller",
	"fixed",
	"scrollableX",
	"scrollableY",
	"hideScrollbar",
	"scrollButtons",
	"scrollButtonsHideMobile",
	"indicator"
]);
//#endregion
//#region node_modules/@mui/material/Tabs/Tabs.mjs
var import_react_is = require_react_is();
var useUtilityClasses$2 = (ownerState) => {
	const { vertical, fixed, hideScrollbar, scrollableX, scrollableY, centered, scrollButtonsHideMobile, classes } = ownerState;
	return composeClasses({
		root: ["root", vertical && "vertical"],
		scroller: [
			"scroller",
			fixed && "fixed",
			hideScrollbar && "hideScrollbar",
			scrollableX && "scrollableX",
			scrollableY && "scrollableY"
		],
		list: [
			"list",
			vertical && "vertical",
			centered && "centered"
		],
		indicator: ["indicator"],
		scrollButtons: ["scrollButtons", scrollButtonsHideMobile && "scrollButtonsHideMobile"],
		scrollableX: [scrollableX && "scrollableX"],
		hideScrollbar: [hideScrollbar && "hideScrollbar"]
	}, getTabsUtilityClass, classes);
};
var TabsRoot = styled("div", {
	name: "MuiTabs",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons },
			{ [`& .${tabsClasses.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile },
			styles.root,
			ownerState.vertical && styles.vertical
		];
	}
})(memoTheme(({ theme }) => ({
	overflow: "hidden",
	minHeight: 48,
	WebkitOverflowScrolling: "touch",
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.scrollButtonsHideMobile,
		style: { [`& .${tabsClasses.scrollButtons}`]: { [theme.breakpoints.down("sm")]: { display: "none" } } }
	}]
})));
var TabsScroller = styled("div", {
	name: "MuiTabs",
	slot: "Scroller",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.scroller,
			ownerState.fixed && styles.fixed,
			ownerState.hideScrollbar && styles.hideScrollbar,
			ownerState.scrollableX && styles.scrollableX,
			ownerState.scrollableY && styles.scrollableY
		];
	}
})({
	position: "relative",
	display: "inline-block",
	flex: "1 1 auto",
	whiteSpace: "nowrap",
	variants: [
		{
			props: ({ ownerState }) => ownerState.fixed,
			style: {
				overflowX: "hidden",
				width: "100%"
			}
		},
		{
			props: ({ ownerState }) => ownerState.hideScrollbar,
			style: {
				scrollbarWidth: "none",
				"&::-webkit-scrollbar": { display: "none" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableX,
			style: {
				overflowX: "auto",
				overflowY: "hidden"
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableY,
			style: {
				overflowY: "auto",
				overflowX: "hidden"
			}
		}
	]
});
var List = styled("div", {
	name: "MuiTabs",
	slot: "List",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.list, ownerState.centered && styles.centered];
	}
})({
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.centered,
		style: { justifyContent: "center" }
	}]
});
var TabsIndicator = styled("span", {
	name: "MuiTabs",
	slot: "Indicator"
})(memoTheme(({ theme }) => ({
	position: "absolute",
	height: 2,
	bottom: 0,
	width: "100%",
	...getTransitionStyles(theme),
	variants: [
		{
			props: { indicatorColor: "primary" },
			style: { backgroundColor: (theme.vars || theme).palette.primary.main }
		},
		{
			props: { indicatorColor: "secondary" },
			style: { backgroundColor: (theme.vars || theme).palette.secondary.main }
		},
		{
			props: ({ ownerState }) => ownerState.vertical,
			style: {
				height: "100%",
				width: 2,
				right: 0
			}
		}
	]
})));
var TabsScrollbarSize = styled(ScrollbarSize)({
	overflowX: "auto",
	overflowY: "hidden",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": { display: "none" }
});
var defaultIndicatorStyle = {};
var warnedTabValueInvalid = /* @__PURE__ */ new WeakMap();
var warnedOnceTabPresent = false;
var Tabs = /*#__PURE__*/ import_react.forwardRef(function Tabs(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabs"
	});
	const theme = useTheme();
	const isRtl = useRtl();
	const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);
	const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, action, centered = false, children: childrenProp, className, component = "div", allowScrollButtonsMobile = false, indicatorColor = "primary", onChange, orientation = "horizontal", scrollButtons = "auto", selectionFollowsFocus, slots = {}, slotProps = {}, textColor = "primary", value, variant = "standard", visibleScrollbar = false, ...other } = props;
	const scrollable = variant === "scrollable";
	const vertical = orientation === "vertical";
	const scrollStart = vertical ? "scrollTop" : "scrollLeft";
	const start = vertical ? "top" : "left";
	const end = vertical ? "bottom" : "right";
	const clientSize = vertical ? "clientHeight" : "clientWidth";
	const size = vertical ? "height" : "width";
	const ownerState = {
		...props,
		component,
		allowScrollButtonsMobile,
		indicatorColor,
		orientation,
		vertical,
		scrollButtons,
		textColor,
		variant,
		visibleScrollbar,
		fixed: !scrollable,
		hideScrollbar: scrollable && !visibleScrollbar,
		scrollableX: scrollable && !vertical,
		scrollableY: scrollable && vertical,
		centered: centered && !scrollable,
		scrollButtonsHideMobile: !allowScrollButtonsMobile
	};
	const classes = useUtilityClasses$2(ownerState);
	const startScrollButtonIconProps = useSlotProps({
		elementType: slots.startScrollButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		ownerState
	});
	const endScrollButtonIconProps = useSlotProps({
		elementType: slots.endScrollButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		ownerState
	});
	if (centered && scrollable) console.error("MUI: You can not use the `centered={true}` and `variant=\"scrollable\"` properties at the same time on a `Tabs` component.");
	const [mounted, setMounted] = import_react.useState(false);
	const [indicatorStyle, setIndicatorStyle] = import_react.useState(defaultIndicatorStyle);
	const [displayStartScroll, setDisplayStartScroll] = import_react.useState(false);
	const [displayEndScroll, setDisplayEndScroll] = import_react.useState(false);
	const [updateScrollObserver, setUpdateScrollObserver] = import_react.useState(false);
	const selectedValue = value === false ? null : value;
	const [isFocusWithinList, setIsFocusWithinList] = import_react.useState(false);
	const [scrollerStyle, setScrollerStyle] = import_react.useState({
		overflow: "hidden",
		scrollbarWidth: 0
	});
	const valueToIndex = /* @__PURE__ */ new Map();
	const tabsRef = import_react.useRef(null);
	const tabListRef = import_react.useRef(null);
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const getTabsMeta = () => {
		const tabsNode = tabsRef.current;
		let tabsMeta;
		if (tabsNode) {
			const rect = tabsNode.getBoundingClientRect();
			tabsMeta = {
				clientWidth: tabsNode.clientWidth,
				scrollLeft: tabsNode.scrollLeft,
				scrollTop: tabsNode.scrollTop,
				scrollWidth: tabsNode.scrollWidth,
				top: rect.top,
				bottom: rect.bottom,
				left: rect.left,
				right: rect.right
			};
		}
		let tabMeta;
		if (tabsNode && value !== false) {
			const children = tabListRef.current.children;
			if (children.length > 0) {
				const tab = children[valueToIndex.get(value)];
				if (!tab && !warnedTabValueInvalid.has(tabsRef)) {
					warnedTabValueInvalid.set(tabsRef, true);
					console.error([
						`MUI: The \`value\` provided to the Tabs component is invalid.`,
						`None of the Tabs' children match with "${value}".`,
						valueToIndex.keys ? `You can provide one of the following values: ${Array.from(valueToIndex.keys()).join(", ")}.` : null
					].join("\n"));
				}
				tabMeta = tab ? tab.getBoundingClientRect() : null;
				if (isLayoutSupported() && !warnedOnceTabPresent && tabMeta && tabMeta.width === 0 && tabMeta.height === 0 && tabsMeta.clientWidth !== 0) {
					tabsMeta = null;
					console.error([
						"MUI: The `value` provided to the Tabs component is invalid.",
						`The Tab with this \`value\` ("${value}") is not part of the document layout.`,
						"Make sure the tab item is present in the document or that it's not `display: none`."
					].join("\n"));
					warnedOnceTabPresent = true;
				}
			}
		}
		return {
			tabsMeta,
			tabMeta
		};
	};
	const updateIndicatorState = useEventCallback_default(() => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		let startValue = 0;
		let startIndicator;
		if (vertical) {
			startIndicator = "top";
			if (tabMeta && tabsMeta) startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
		} else {
			startIndicator = isRtl ? "right" : "left";
			if (tabMeta && tabsMeta) startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
		}
		const newIndicatorStyle = {
			[startIndicator]: startValue,
			[size]: tabMeta ? tabMeta[size] : 0
		};
		if (typeof indicatorStyle[startIndicator] !== "number" || typeof indicatorStyle[size] !== "number") setIndicatorStyle(newIndicatorStyle);
		else {
			const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
			const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
			if (dStart >= 1 || dSize >= 1) setIndicatorStyle(newIndicatorStyle);
		}
	});
	const scroll = (scrollValue, { animation = true } = {}) => {
		if (animation && !reducedMotion.shouldReduceMotion) animate(scrollStart, tabsRef.current, scrollValue, { duration: theme.transitions.duration.standard });
		else tabsRef.current[scrollStart] = scrollValue;
	};
	const moveTabsScroll = (delta) => {
		let scrollValue = tabsRef.current[scrollStart];
		if (vertical) scrollValue += delta;
		else scrollValue += delta * (isRtl ? -1 : 1);
		scroll(scrollValue);
	};
	const getScrollSize = () => {
		const containerSize = tabsRef.current[clientSize];
		let totalSize = 0;
		const children = Array.from(tabListRef.current.children);
		for (let i = 0; i < children.length; i += 1) {
			const tab = children[i];
			if (totalSize + tab[clientSize] > containerSize) {
				if (i === 0) totalSize = containerSize;
				break;
			}
			totalSize += tab[clientSize];
		}
		return totalSize;
	};
	const handleStartScrollClick = () => {
		moveTabsScroll(-1 * getScrollSize());
	};
	const handleEndScrollClick = () => {
		moveTabsScroll(getScrollSize());
	};
	const [ScrollbarSlot, { onChange: scrollbarOnChange, ...scrollbarSlotProps }] = useSlot("scrollbar", {
		className: clsx(classes.scrollableX, classes.hideScrollbar),
		elementType: TabsScrollbarSize,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState
	});
	const handleScrollbarSizeChange = import_react.useCallback((scrollbarWidth) => {
		scrollbarOnChange?.(scrollbarWidth);
		setScrollerStyle({
			overflow: null,
			scrollbarWidth
		});
	}, [scrollbarOnChange]);
	const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot("scrollButtons", {
		className: classes.scrollButtons,
		elementType: TabScrollButton,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			orientation,
			slots: {
				StartScrollButtonIcon: slots.startScrollButtonIcon,
				EndScrollButtonIcon: slots.endScrollButtonIcon
			},
			slotProps: {
				startScrollButtonIcon: startScrollButtonIconProps,
				endScrollButtonIcon: endScrollButtonIconProps
			}
		}
	});
	const getConditionalElements = () => {
		const conditionalElements = {};
		conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ScrollbarSlot, {
			...scrollbarSlotProps,
			onChange: handleScrollbarSizeChange
		}) : null;
		const showScrollButtons = scrollable && (scrollButtons === "auto" && (displayStartScroll || displayEndScroll) || scrollButtons === true);
		conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "right" : "left",
			onClick: handleStartScrollClick,
			disabled: !displayStartScroll,
			...scrollButtonSlotProps
		}) : null;
		conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "left" : "right",
			onClick: handleEndScrollClick,
			disabled: !displayEndScroll,
			...scrollButtonSlotProps
		}) : null;
		return conditionalElements;
	};
	const scrollSelectedIntoView = useEventCallback_default((animation) => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		if (!tabMeta || !tabsMeta) return;
		if (tabMeta[start] < tabsMeta[start]) scroll(tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]), { animation });
		else if (tabMeta[end] > tabsMeta[end]) scroll(tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]), { animation });
	});
	const updateScrollButtonState = useEventCallback_default(() => {
		if (scrollable && scrollButtons !== false) setUpdateScrollObserver(!updateScrollObserver);
	});
	import_react.useEffect(() => {
		const handleResize = debounce_default(() => {
			if (tabsRef.current) updateIndicatorState();
		});
		let resizeObserver;
		/**
		* @type {MutationCallback}
		*/
		const handleMutation = (records) => {
			records.forEach((record) => {
				record.removedNodes.forEach((item) => {
					resizeObserver?.unobserve(item);
				});
				record.addedNodes.forEach((item) => {
					resizeObserver?.observe(item);
				});
			});
			handleResize();
			updateScrollButtonState();
		};
		const win = ownerWindow_default(tabsRef.current);
		win.addEventListener("resize", handleResize);
		let mutationObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(handleResize);
			Array.from(tabListRef.current.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
		if (typeof MutationObserver !== "undefined") {
			mutationObserver = new MutationObserver(handleMutation);
			mutationObserver.observe(tabListRef.current, { childList: true });
		}
		return () => {
			handleResize.clear();
			win.removeEventListener("resize", handleResize);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
		};
	}, [updateIndicatorState, updateScrollButtonState]);
	/**
	* Toggle visibility of start and end scroll buttons
	* Using IntersectionObserver on first and last Tabs.
	*/
	import_react.useEffect(() => {
		const tabListChildren = Array.from(tabListRef.current.children);
		const length = tabListChildren.length;
		if (typeof IntersectionObserver !== "undefined" && length > 0 && scrollable && scrollButtons !== false) {
			const firstTab = tabListChildren[0];
			const lastTab = tabListChildren[length - 1];
			const observerOptions = {
				root: tabsRef.current,
				threshold: .99
			};
			const handleScrollButtonStart = (entries) => {
				setDisplayStartScroll(!entries[0].isIntersecting);
			};
			const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
			firstObserver.observe(firstTab);
			const handleScrollButtonEnd = (entries) => {
				setDisplayEndScroll(!entries[0].isIntersecting);
			};
			const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
			lastObserver.observe(lastTab);
			return () => {
				firstObserver.disconnect();
				lastObserver.disconnect();
			};
		}
	}, [
		scrollable,
		scrollButtons,
		updateScrollObserver,
		childrenProp?.length
	]);
	import_react.useEffect(() => {
		setMounted(true);
	}, []);
	import_react.useEffect(() => {
		updateIndicatorState();
	});
	import_react.useEffect(() => {
		scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
	}, [scrollSelectedIntoView, indicatorStyle]);
	import_react.useImperativeHandle(action, () => ({
		updateIndicator: updateIndicatorState,
		updateScrollButtons: updateScrollButtonState
	}), [updateIndicatorState, updateScrollButtonState]);
	const [IndicatorSlot, indicatorSlotProps] = useSlot("indicator", {
		className: classes.indicator,
		elementType: TabsIndicator,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: indicatorStyle }
	});
	const indicator = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IndicatorSlot, { ...indicatorSlotProps });
	const rovingContainer = useRovingTabIndexRoot({
		activeItemId: isFocusWithinList ? void 0 : selectedValue,
		orientation,
		isRtl
	});
	const rovingContainerProps = rovingContainer.getContainerProps();
	const children = import_react.Children.toArray(childrenProp).filter(import_react.isValidElement).map((child, index) => {
		const childValue = child.props.value === void 0 ? index : child.props.value;
		if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
		valueToIndex.set(childValue, index);
		return {
			child,
			index,
			childValue
		};
	}).map(({ child, childValue }) => {
		const selected = childValue === value;
		return /*#__PURE__*/ import_react.cloneElement(child, {
			fullWidth: variant === "fullWidth",
			indicator: selected && !mounted && indicator,
			selected,
			selectionFollowsFocus,
			onChange,
			textColor,
			value: childValue
		});
	});
	const conditionalElements = getConditionalElements();
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		className: clsx(classes.root, className),
		elementType: TabsRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		ownerState
	});
	const [ScrollerSlot, scrollerSlotProps] = useSlot("scroller", {
		ref: tabsRef,
		className: classes.scroller,
		elementType: TabsScroller,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: {
			overflow: scrollerStyle.overflow,
			[vertical ? `margin${isRtl ? "Left" : "Right"}` : "marginBottom"]: visibleScrollbar ? void 0 : -scrollerStyle.scrollbarWidth
		} }
	});
	const mergedRef = useForkRef_default(rovingContainerProps.ref, tabListRef);
	const handleKeyDown = (event) => {
		const list = tabListRef.current;
		if (getActiveElement_default(ownerDocument_default(list))?.getAttribute("role") !== "tab") return;
		rovingContainerProps.onKeyDown(event);
	};
	const [ListSlot, listSlotProps] = useSlot("list", {
		ref: mergedRef,
		className: classes.list,
		elementType: List,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onBlur: (event) => {
				if (!contains_default(event.currentTarget, event.relatedTarget)) setIsFocusWithinList(false);
				handlers.onBlur?.(event);
			},
			onKeyDown: (event) => {
				handleKeyDown(event);
				handlers.onKeyDown?.(event);
			},
			onFocus: (event) => {
				setIsFocusWithinList(true);
				rovingContainerProps.onFocus(event);
				handlers.onFocus?.(event);
			}
		})
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			conditionalElements.scrollButtonStart,
			conditionalElements.scrollbarSizeListener,
			/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ScrollerSlot, {
				...scrollerSlotProps,
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListSlot, {
					"aria-label": ariaLabel,
					"aria-labelledby": ariaLabelledBy,
					"aria-orientation": orientation === "vertical" ? "vertical" : null,
					role: "tablist",
					...listSlotProps,
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RovingTabIndexContext.Provider, {
						value: rovingContainer,
						children
					})
				}), mounted && indicator]
			}),
			conditionalElements.scrollButtonEnd
		]
	});
});
Tabs.propTypes = {
	/**
	* Callback fired when the component mounts.
	* This is useful when you want to trigger an action programmatically.
	* It supports two actions: `updateIndicator()` and `updateScrollButtons()`
	*
	* @param {object} actions This object contains all possible actions
	* that can be triggered programmatically.
	*/
	action: refType,
	/**
	* If `true`, the scroll buttons aren't forced hidden on mobile.
	* By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
	* @default false
	*/
	allowScrollButtonsMobile: import_prop_types.default.bool,
	/**
	* The label for the Tabs as a string.
	*/
	"aria-label": import_prop_types.default.string,
	/**
	* An id or list of ids separated by a space that label the Tabs.
	*/
	"aria-labelledby": import_prop_types.default.string,
	/**
	* If `true`, the tabs are centered.
	* This prop is intended for large views.
	* @default false
	*/
	centered: import_prop_types.default.bool,
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* Determines the color of the indicator.
	* @default 'primary'
	*/
	indicatorColor: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary"]), import_prop_types.default.string]),
	/**
	* Callback fired when the value changes.
	*
	* @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
	* @param {any} value We default to the index of the child (number)
	*/
	onChange: import_prop_types.default.func,
	/**
	* The component orientation (layout flow direction).
	* @default 'horizontal'
	*/
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	/**
	* Determine behavior of scroll buttons when tabs are set to scroll:
	*
	* - `auto` will only present them when not all the items are visible.
	* - `true` will always present them.
	* - `false` will never present them.
	*
	* By default the scroll buttons are hidden on mobile.
	* This behavior can be disabled with `allowScrollButtonsMobile`.
	* @default 'auto'
	*/
	scrollButtons: import_prop_types.default.oneOf([
		"auto",
		false,
		true
	]),
	/**
	* If `true` the selected tab changes on focus. Otherwise it only
	* changes on activation.
	*/
	selectionFollowsFocus: import_prop_types.default.bool,
	/**
	* The props used for each slot inside.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		indicator: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		list: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scrollbar: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scrollButtons: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scroller: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		startScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.elementType,
		indicator: import_prop_types.default.elementType,
		list: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		scrollbar: import_prop_types.default.elementType,
		scrollButtons: import_prop_types.default.elementType,
		scroller: import_prop_types.default.elementType,
		startScrollButtonIcon: import_prop_types.default.elementType
	}),
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
	* Determines the color of the `Tab`.
	* @default 'primary'
	*/
	textColor: import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary"
	]),
	/**
	* The value of the currently selected `Tab`.
	* If you don't want any selected `Tab`, you can set this prop to `false`.
	*/
	value: import_prop_types.default.any,
	/**
	* Determines additional display behavior of the tabs:
	*
	*  - `scrollable` will invoke scrolling properties and allow for horizontally
	*  scrolling (or swiping) of the tab bar.
	*  - `fullWidth` will make the tabs grow to use all the available space,
	*  which should be used for small views, like on mobile.
	*  - `standard` will render the default state.
	* @default 'standard'
	*/
	variant: import_prop_types.default.oneOf([
		"fullWidth",
		"scrollable",
		"standard"
	]),
	/**
	* If `true`, the scrollbar is visible. It can be useful when displaying
	* a long vertical list of tabs.
	* @default false
	*/
	visibleScrollbar: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimePicker/dateTimePickerTabsClasses.mjs
function getDateTimePickerTabsUtilityClass(slot) {
	return generateUtilityClass("MuiDateTimePickerTabs", slot);
}
var dateTimePickerTabsClasses = generateUtilityClasses("MuiDateTimePickerTabs", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimePicker/DateTimePickerTabs.mjs
var viewToTab = (view) => {
	if (isDatePickerView(view)) return "date";
	return "time";
};
var tabToView = (tab) => {
	if (tab === "date") return "day";
	return "hours";
};
var useUtilityClasses$1 = (classes) => {
	return composeClasses({ root: ["root"] }, getDateTimePickerTabsUtilityClass, classes);
};
var DateTimePickerTabsRoot = styled(Tabs, {
	name: "MuiDateTimePickerTabs",
	slot: "Root"
})(({ theme }) => ({
	boxShadow: `0 -1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
	"&:last-child": {
		boxShadow: `0 1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
		[`& .${tabsClasses.indicator}`]: {
			bottom: "auto",
			top: 0
		}
	}
}));
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [DateTimePickerTabs API](https://mui.com/x/api/date-pickers/date-time-picker-tabs/)
*/
var DateTimePickerTabs = function DateTimePickerTabs(inProps) {
	const { dateIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DateRangeIcon, {}), timeIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TimeIcon, {}), hidden = typeof window === "undefined" || window.innerHeight < 667, className, classes: classesProp, sx } = useThemeProps({
		props: inProps,
		name: "MuiDateTimePickerTabs"
	});
	const translations = usePickerTranslations();
	const { ownerState } = usePickerPrivateContext();
	const { view, setView } = usePickerContext();
	const classes = useUtilityClasses$1(classesProp);
	const handleChange = (event, value) => {
		setView(tabToView(value));
	};
	if (hidden) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerTabsRoot, {
		ownerState,
		variant: "fullWidth",
		value: viewToTab(view),
		onChange: handleChange,
		className: clsx(className, classes.root),
		sx,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tab, {
			value: "date",
			"aria-label": translations.dateTableLabel,
			icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: dateIcon })
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tab, {
			value: "time",
			"aria-label": translations.timeTableLabel,
			icon: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: timeIcon })
		})]
	});
};
DateTimePickerTabs.displayName = "DateTimePickerTabs";
DateTimePickerTabs.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* Date tab icon.
	* @default DateRange
	*/
	dateIcon: import_prop_types.default.node,
	/**
	* Toggles visibility of the tabs allowing view switching.
	* @default `window.innerHeight < 667` for `DesktopDateTimePicker` and `MobileDateTimePicker`, `displayStaticWrapperAs === 'desktop'` for `StaticDateTimePicker`
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
	/**
	* Time tab icon.
	* @default Time
	*/
	timeIcon: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimePicker/dateTimePickerToolbarClasses.mjs
function getDateTimePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiDateTimePickerToolbar", slot);
}
var dateTimePickerToolbarClasses = generateUtilityClasses("MuiDateTimePickerToolbar", [
	"root",
	"dateContainer",
	"timeContainer",
	"timeDigitsContainer",
	"separator",
	"timeLabelReverse",
	"ampmSelection",
	"ampmLandscape",
	"ampmLabel"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimePicker/DateTimePickerToolbar.mjs
var _excluded$2 = [
	"ampm",
	"ampmInClock",
	"toolbarFormat",
	"toolbarPlaceholder",
	"toolbarTitle",
	"className",
	"classes"
];
var useUtilityClasses = (classes, ownerState) => {
	const { pickerOrientation, toolbarDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		dateContainer: ["dateContainer"],
		timeContainer: ["timeContainer", toolbarDirection === "rtl" && "timeLabelReverse"],
		timeDigitsContainer: ["timeDigitsContainer", toolbarDirection === "rtl" && "timeLabelReverse"],
		separator: ["separator"],
		ampmSelection: ["ampmSelection", pickerOrientation === "landscape" && "ampmLandscape"],
		ampmLabel: ["ampmLabel"]
	}, getDateTimePickerToolbarUtilityClass, classes);
};
var DateTimePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiDateTimePickerToolbar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	justifyContent: "space-around",
	position: "relative",
	variants: [
		{
			props: { toolbarVariant: "desktop" },
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				[`& .${pickersToolbarClasses.content} .${pickersToolbarTextClasses.root}[data-selected]`]: {
					color: (theme.vars || theme).palette.primary.main,
					fontWeight: theme.typography.fontWeightBold
				}
			}
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "landscape"
			},
			style: { borderRight: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "portrait"
			},
			style: {
				paddingLeft: 24,
				paddingRight: 0
			}
		}
	]
}));
var DateTimePickerToolbarDateContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "DateContainer"
})({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start"
});
var DateTimePickerToolbarTimeContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "TimeContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	display: "flex",
	flexDirection: "row",
	variants: [
		{
			props: { toolbarDirection: "rtl" },
			style: { flexDirection: "row-reverse" }
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "portrait"
			},
			style: {
				gap: 9,
				marginRight: 4,
				alignSelf: "flex-end"
			}
		},
		{
			props: ({ pickerOrientation, toolbarVariant }) => pickerOrientation === "landscape" && toolbarVariant !== "desktop",
			style: { flexDirection: "column" }
		},
		{
			props: ({ pickerOrientation, toolbarVariant, toolbarDirection }) => pickerOrientation === "landscape" && toolbarVariant !== "desktop" && toolbarDirection === "rtl",
			style: { flexDirection: "column-reverse" }
		}
	]
});
var DateTimePickerToolbarTimeDigitsContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "TimeDigitsContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	display: "flex",
	variants: [{
		props: { toolbarDirection: "rtl" },
		style: { flexDirection: "row-reverse" }
	}, {
		props: { toolbarVariant: "desktop" },
		style: { gap: 1.5 }
	}]
});
var DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
	name: "MuiDateTimePickerToolbar",
	slot: "Separator",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	margin: "0 4px 0 2px",
	cursor: "default",
	variants: [{
		props: { toolbarVariant: "desktop" },
		style: { margin: 0 }
	}]
});
var DateTimePickerToolbarAmPmSelection = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "AmPmSelection",
	overridesResolver: (props, styles) => [
		{ [`.${dateTimePickerToolbarClasses.ampmLabel}`]: styles.ampmLabel },
		{ [`&.${dateTimePickerToolbarClasses.ampmLandscape}`]: styles.ampmLandscape },
		styles.ampmSelection
	]
})({
	display: "flex",
	flexDirection: "column",
	marginRight: "auto",
	marginLeft: 12,
	[`& .${dateTimePickerToolbarClasses.ampmLabel}`]: { fontSize: 17 },
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			margin: "4px 0 auto",
			flexDirection: "row",
			justifyContent: "space-around",
			width: "100%"
		}
	}]
});
/**
* If `forceDesktopVariant` is set to `true`, the toolbar will always be rendered in the desktop mode.
* If `onViewChange` is defined, the toolbar will call it instead of calling the default handler from `usePickerContext`.
* This is used by the Date Time Range Picker Toolbar.
*/
var DateTimePickerToolbarOverrideContext = /*#__PURE__*/ import_react.createContext(null);
DateTimePickerToolbarOverrideContext.displayName = "DateTimePickerToolbarOverrideContext";
function DateTimePickerToolbar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDateTimePickerToolbar"
	});
	const { ampm, ampmInClock, toolbarFormat, toolbarPlaceholder = "––", toolbarTitle: inToolbarTitle, className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const { value: valueContext, setValue: setValueContext, disabled, readOnly, variant, orientation, view: viewContext, setView: setViewContext, views } = usePickerContext();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses(classesProp, ownerState);
	const adapter = usePickerAdapter();
	const overrides = import_react.useContext(DateTimePickerToolbarOverrideContext);
	const value = overrides ? overrides.value : valueContext;
	const setValue = overrides ? overrides.setValue : setValueContext;
	const view = overrides ? overrides.view : viewContext;
	const setView = overrides ? overrides.setView : setViewContext;
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(value, ampm, (newValue) => setValue(newValue, {
		changeImportance: "set",
		source: "view"
	}));
	const toolbarVariant = overrides?.forceDesktopVariant ? "desktop" : variant;
	const isDesktop = toolbarVariant === "desktop";
	const showAmPmControl = Boolean(ampm && !ampmInClock);
	const toolbarTitle = inToolbarTitle ?? translations.dateTimePickerToolbarTitle;
	const dateText = import_react.useMemo(() => {
		if (!adapter.isValid(value)) return toolbarPlaceholder;
		if (toolbarFormat) return adapter.formatByString(value, toolbarFormat);
		return adapter.format(value, "shortDate");
	}, [
		value,
		toolbarFormat,
		toolbarPlaceholder,
		adapter
	]);
	const formatSection = (format, fallback) => {
		if (!adapter.isValid(value)) return fallback;
		return adapter.format(value, format);
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarRoot, _extends({
		className: clsx(classes.root, className),
		toolbarTitle,
		toolbarVariant
	}, other, {
		ownerState,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarDateContainer, {
			className: classes.dateContainer,
			ownerState,
			children: [views.includes("year") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "subtitle1",
				onClick: () => setView("year"),
				selected: view === "year",
				value: formatSection("year", "–")
			}), views.includes("day") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: isDesktop ? "h5" : "h4",
				onClick: () => setView("day"),
				selected: view === "day",
				value: dateText
			})]
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarTimeContainer, {
			className: classes.timeContainer,
			ownerState,
			toolbarVariant,
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarTimeDigitsContainer, {
					className: classes.timeDigitsContainer,
					ownerState,
					toolbarVariant,
					children: [views.includes("hours") && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
						/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
							variant: isDesktop ? "h5" : "h3",
							width: isDesktop && orientation === "portrait" ? 48 : void 0,
							onClick: () => setView("hours"),
							selected: view === "hours",
							value: formatSection(ampm ? "hours12h" : "hours24h", "--")
						}),
						/*#__PURE__*/ (0, import_jsx_runtime.jsx)(DateTimePickerToolbarSeparator, {
							variant: isDesktop ? "h5" : "h3",
							value: ":",
							className: classes.separator,
							ownerState,
							toolbarVariant
						}),
						/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
							variant: isDesktop ? "h5" : "h3",
							width: isDesktop && orientation === "portrait" ? 48 : void 0,
							onClick: () => setView("minutes"),
							selected: view === "minutes" || !views.includes("minutes") && view === "hours",
							value: formatSection("minutes", "--"),
							disabled: !views.includes("minutes")
						})
					] }), views.includes("seconds") && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(DateTimePickerToolbarSeparator, {
						variant: isDesktop ? "h5" : "h3",
						value: ":",
						className: classes.separator,
						ownerState,
						toolbarVariant
					}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: isDesktop ? "h5" : "h3",
						width: isDesktop && orientation === "portrait" ? 48 : void 0,
						onClick: () => setView("seconds"),
						selected: view === "seconds",
						value: formatSection("seconds", "--")
					})] })]
				}),
				showAmPmControl && !isDesktop && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarAmPmSelection, {
					className: classes.ampmSelection,
					ownerState,
					children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: "subtitle2",
						selected: meridiemMode === "am",
						typographyClassName: classes.ampmLabel,
						value: formatMeridiem(adapter, "am"),
						onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
						disabled
					}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: "subtitle2",
						selected: meridiemMode === "pm",
						typographyClassName: classes.ampmLabel,
						value: formatMeridiem(adapter, "pm"),
						onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
						disabled
					})]
				}),
				ampm && isDesktop && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
					variant: "h5",
					onClick: () => setView("meridiem"),
					selected: view === "meridiem",
					value: value && meridiemMode ? formatMeridiem(adapter, meridiemMode) : "--",
					width: 48
				})
			]
		})]
	}));
}
DateTimePickerToolbar.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
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
	toolbarPlaceholder: import_prop_types.default.node,
	/**
	* If provided, it will be used instead of `dateTimePickerToolbarTitle` from localization.
	*/
	toolbarTitle: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateTimePicker/shared.mjs
function useDateTimePickerDefaultizedProps(props, name) {
	const adapter = usePickerAdapter();
	const themeProps = useThemeProps({
		props,
		name
	});
	const validationProps = useApplyDefaultValuesToDateTimeValidationProps(themeProps);
	const ampm = themeProps.ampm ?? adapter.is12HourCycleInCurrentLocale();
	const localeText = import_react.useMemo(() => {
		if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
		return _extends({}, themeProps.localeText, { dateTimePickerToolbarTitle: themeProps.localeText.toolbarTitle });
	}, [themeProps.localeText]);
	const { openTo, views: defaultViews } = applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: [
			"year",
			"day",
			"hours",
			"minutes"
		],
		defaultOpenTo: "day"
	});
	const { shouldRenderTimeInASingleColumn, thresholdToRenderTimeInASingleColumn, views, timeSteps } = resolveTimeViewsResponse({
		thresholdToRenderTimeInASingleColumn: themeProps.thresholdToRenderTimeInASingleColumn,
		ampm,
		timeSteps: themeProps.timeSteps,
		views: defaultViews
	});
	return _extends({}, themeProps, validationProps, {
		timeSteps,
		openTo,
		shouldRenderTimeInASingleColumn,
		thresholdToRenderTimeInASingleColumn,
		views,
		viewsForFormatting: ampm ? [...defaultViews, "meridiem"] : defaultViews,
		ampm,
		localeText,
		orientation: themeProps.orientation ?? "portrait",
		slots: _extends({
			toolbar: DateTimePickerToolbar,
			tabs: DateTimePickerTabs
		}, themeProps.slots),
		slotProps: _extends({}, themeProps.slotProps, { toolbar: _extends({ ampm }, themeProps.slotProps?.toolbar) })
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/DesktopDateTimePicker/DesktopDateTimePickerLayout.mjs
/**
* @ignore - internal component.
*/
var DesktopDateTimePickerLayout = /*#__PURE__*/ import_react.forwardRef(function DesktopDateTimePickerLayout(props, ref) {
	const { toolbar, tabs, content, actionBar, shortcuts, ownerState } = usePickerLayout(props);
	const { orientation } = usePickerContext();
	const { sx, className, classes } = props;
	const isActionBarVisible = actionBar && (actionBar.props.actions?.length ?? 0) > 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersLayoutRoot, {
		ref,
		className: clsx(pickersLayoutClasses.root, classes?.root, className),
		sx: [{
			[`& .${pickersLayoutClasses.tabs}`]: {
				gridRow: 4,
				gridColumn: "1 / 4"
			},
			[`& .${pickersLayoutClasses.actionBar}`]: { gridRow: 5 }
		}, ...Array.isArray(sx) ? sx : [sx]],
		ownerState,
		children: [
			orientation === "landscape" ? shortcuts : toolbar,
			orientation === "landscape" ? toolbar : shortcuts,
			/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersLayoutContentWrapper, {
				className: clsx(pickersLayoutClasses.contentWrapper, classes?.contentWrapper),
				ownerState,
				sx: { display: "grid" },
				children: [
					content,
					tabs,
					isActionBarVisible && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Divider, { sx: {
						gridRow: 3,
						gridColumn: "1 / 4"
					} })
				]
			}),
			actionBar
		]
	});
});
DesktopDateTimePickerLayout.displayName = "DesktopDateTimePickerLayout";
DesktopDateTimePickerLayout.propTypes = {
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
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
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DesktopDateTimePicker/DesktopDateTimePicker.mjs
var _excluded$1 = [
	"openTo",
	"focusedView",
	"timeViewsCount"
];
var rendererInterceptor = function RendererInterceptor(props) {
	const { viewRenderers, popperView, rendererProps } = props;
	const { openTo, focusedView, timeViewsCount } = rendererProps;
	const finalProps = _extends({}, _objectWithoutPropertiesLoose(rendererProps, _excluded$1), {
		autoFocus: false,
		focusedView: null,
		sx: [{
			[`&.${multiSectionDigitalClockClasses.root}`]: { borderBottom: 0 },
			[`&.${multiSectionDigitalClockClasses.root}, .${multiSectionDigitalClockSectionClasses.root}, &.${digitalClockClasses.root}`]: { maxHeight: 336 }
		}]
	});
	const isTimeViewActive = isInternalTimeView(popperView);
	const dateView = isTimeViewActive ? "day" : popperView;
	const timeView = isTimeViewActive ? popperView : "hours";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [viewRenderers[dateView]?.(_extends({}, rendererProps, {
		view: !isTimeViewActive ? popperView : "day",
		focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
		views: rendererProps.views.filter(isDatePickerView),
		sx: [{ gridColumn: 1 }, ...finalProps.sx]
	})), timeViewsCount > 0 && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Divider, {
		orientation: "vertical",
		sx: { gridColumn: 2 }
	}), viewRenderers[timeView]?.(_extends({}, finalProps, {
		view: isTimeViewActive ? popperView : "hours",
		focusedView: focusedView && isInternalTimeView(focusedView) ? focusedView : null,
		openTo: isInternalTimeView(openTo) ? openTo : "hours",
		views: rendererProps.views.filter(isInternalTimeView),
		sx: [{ gridColumn: 3 }, ...finalProps.sx]
	}))] })] });
};
rendererInterceptor.displayName = "rendererInterceptor";
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopDateTimePicker API](https://mui.com/x/api/date-pickers/desktop-date-time-picker/)
*/
var DesktopDateTimePicker = /*#__PURE__*/ import_react.forwardRef(function DesktopDateTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiDesktopDateTimePicker");
	const renderTimeView = defaultizedProps.shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar,
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? true;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? defaultizedProps.views.filter((view) => view !== "meridiem") : defaultizedProps.views;
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers,
			format: resolveDateTimeFormat(adapter, _extends({}, defaultizedProps, { views: defaultizedProps.viewsForFormatting })),
			views,
			yearsPerRow: defaultizedProps.yearsPerRow ?? 4,
			ampmInClock,
			slots: _extends({
				field: DateTimeField,
				layout: DesktopDateTimePickerLayout
			}, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: true,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar),
				tabs: _extends({ hidden: true }, defaultizedProps.slotProps?.tabs)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date-time",
		validator: validateDateTime,
		rendererInterceptor,
		steps: null
	});
	return renderPicker();
});
DesktopDateTimePicker.displayName = "DesktopDateTimePicker";
DesktopDateTimePicker.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* Display ampm controls under the clock (instead of in the toolbar).
	* @default true on desktop, false on mobile
	*/
	ampmInClock: import_prop_types.default.bool,
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
	* Do not ignore date part when validating min/max time.
	* @default false
	*/
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
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
	* Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
	*/
	maxDateTime: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
	*/
	minDateTime: import_prop_types.default.object,
	/**
	* Minimal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	minTime: import_prop_types.default.object,
	/**
	* Step over minutes.
	* @default 1
	*/
	minutesStep: import_prop_types.default.number,
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
	* If `true`, disabled digital clock items will not be rendered.
	* @default false
	*/
	skipDisabled: import_prop_types.default.bool,
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
	* Amount of time options below or at which the single column time renderer is used.
	* @default 24
	*/
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	/**
	* The time steps between two time unit options.
	* For example, if `timeSteps.minutes = 8`, then the available minute options will be `[0, 8, 16, 24, 32, 40, 48, 56]`.
	* When single column time renderer is used, only `timeSteps.minutes` will be used.
	* @default{ hours: 1, minutes: 5, seconds: 5 }
	*/
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
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
//#region node_modules/@mui/x-date-pickers/MobileDateTimePicker/MobileDateTimePicker.mjs
var STEPS = [{ views: DATE_VIEWS }, { views: EXPORTED_TIME_VIEWS }];
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileDateTimePicker API](https://mui.com/x/api/date-pickers/mobile-date-time-picker/)
*/
var MobileDateTimePicker = /*#__PURE__*/ import_react.forwardRef(function MobileDateTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiMobileDateTimePicker");
	const renderTimeView = defaultizedProps.shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar,
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? false;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? defaultizedProps.views.filter((view) => view !== "meridiem") : defaultizedProps.views;
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers,
			format: resolveDateTimeFormat(adapter, _extends({}, defaultizedProps, { views: defaultizedProps.viewsForFormatting })),
			views,
			ampmInClock,
			slots: _extends({ field: DateTimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: false,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar),
				tabs: _extends({ hidden: false }, defaultizedProps.slotProps?.tabs),
				layout: _extends({}, defaultizedProps.slotProps?.layout, { sx: mergeSx([{
					[`& .${multiSectionDigitalClockClasses.root}`]: { width: 320 },
					[`& .${multiSectionDigitalClockSectionClasses.root}`]: {
						flex: 1,
						maxHeight: 335,
						[`.${multiSectionDigitalClockSectionClasses.item}`]: { width: "auto" }
					},
					[`& .${digitalClockClasses.root}`]: {
						width: 320,
						maxHeight: 336,
						flex: 1,
						[`.${digitalClockClasses.item}`]: { justifyContent: "center" }
					}
				}], defaultizedProps.slotProps?.layout?.sx) })
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date-time",
		validator: validateDateTime,
		steps: STEPS
	});
	return renderPicker();
});
MobileDateTimePicker.displayName = "MobileDateTimePicker";
MobileDateTimePicker.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* Display ampm controls under the clock (instead of in the toolbar).
	* @default true on desktop, false on mobile
	*/
	ampmInClock: import_prop_types.default.bool,
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
	* Do not ignore date part when validating min/max time.
	* @default false
	*/
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
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
	* Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
	*/
	maxDateTime: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
	*/
	minDateTime: import_prop_types.default.object,
	/**
	* Minimal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	minTime: import_prop_types.default.object,
	/**
	* Step over minutes.
	* @default 1
	*/
	minutesStep: import_prop_types.default.number,
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
	* If `true`, disabled digital clock items will not be rendered.
	* @default false
	*/
	skipDisabled: import_prop_types.default.bool,
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
	* Amount of time options below or at which the single column time renderer is used.
	* @default 24
	*/
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	/**
	* The time steps between two time unit options.
	* For example, if `timeSteps.minutes = 8`, then the available minute options will be `[0, 8, 16, 24, 32, 40, 48, 56]`.
	* When single column time renderer is used, only `timeSteps.minutes` will be used.
	* @default{ hours: 1, minutes: 5, seconds: 5 }
	*/
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
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
//#region node_modules/@mui/x-date-pickers/DateTimePicker/DateTimePicker.mjs
var _excluded = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DateTimePicker API](https://mui.com/x/api/date-pickers/date-time-picker/)
*/
var DateTimePicker = /*#__PURE__*/ import_react.forwardRef(function DateTimePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDateTimePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DesktopDateTimePicker, _extends({ ref }, other));
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MobileDateTimePicker, _extends({ ref }, other));
});
DateTimePicker.displayName = "DateTimePicker";
DateTimePicker.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* Display ampm controls under the clock (instead of in the toolbar).
	* @default true on desktop, false on mobile
	*/
	ampmInClock: import_prop_types.default.bool,
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
	* Do not ignore date part when validating min/max time.
	* @default false
	*/
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
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
	* Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
	*/
	maxDateTime: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
	/**
	* Minimal selectable date.
	* @default 1900-01-01
	*/
	minDate: import_prop_types.default.object,
	/**
	* Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
	*/
	minDateTime: import_prop_types.default.object,
	/**
	* Minimal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	minTime: import_prop_types.default.object,
	/**
	* Step over minutes.
	* @default 1
	*/
	minutesStep: import_prop_types.default.number,
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
	* If `true`, disabled digital clock items will not be rendered.
	* @default false
	*/
	skipDisabled: import_prop_types.default.bool,
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
	* Amount of time options below or at which the single column time renderer is used.
	* @default 24
	*/
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	/**
	* The time steps between two time unit options.
	* For example, if `timeSteps.minutes = 8`, then the available minute options will be `[0, 8, 16, 24, 32, 40, 48, 56]`.
	* When single column time renderer is used, only `timeSteps.minutes` will be used.
	* @default{ hours: 1, minutes: 5, seconds: 5 }
	*/
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
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
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
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
export { DateTimePicker, DateTimePickerTabs, DateTimePickerToolbar, dateTimePickerTabsClasses, dateTimePickerToolbarClasses };

//# sourceMappingURL=@mui_x-date-pickers_DateTimePicker.js.map