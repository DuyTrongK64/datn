import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, h as clsx, i as styled, m as generateUtilityClass, r as useThemeProps } from "./LocalizationProvider-CyOIGrUO.js";
import { $ as useToolbarOwnerState, Et as useMediaQuery, Ht as generateUtilityClasses, I as DEFAULT_DESKTOP_MODE_MEDIA_QUERY, L as arrayIncludes, Q as PickersToolbar, Rt as refType, Tt as resolveComponentProps, X as usePickerTranslations, Y as extractValidationProps, Z as usePickerAdapter, _ as useField, _t as formatMeridiem, at as singleItemFieldValueManager, c as PickerFieldUI, i as useMeridiemMode, l as PickerFieldUIContextProvider, ot as singleItemValueManager, p as ClockIcon, pt as resolveTimeFormat, t as useMobilePicker, tt as usePickerContext, u as useFieldTextFieldProps, v as useDesktopPicker, wt as applyDefaultViewProps, zt as composeClasses } from "./useMobilePicker-CRLhUKKU.js";
import { a as renderTimeViewClock, h as PickersToolbarText, i as renderMultiSectionDigitalClockTimeView, m as PickersToolbarButton, n as resolveTimeViewsResponse, r as renderDigitalClockTimeView, v as validateTime } from "./date-time-utils-B9Tj6ytM.js";
//#region node_modules/@mui/x-date-pickers/managers/useTimeManager.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useTimeManager(parameters = {}) {
	const { ampm } = parameters;
	return import_react.useMemo(() => ({
		valueType: "time",
		validator: validateTime,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToTimeFieldInternalProps,
		internal_useOpenPickerButtonAriaLabel: createUseOpenPickerButtonAriaLabel(ampm)
	}), [ampm]);
}
function createUseOpenPickerButtonAriaLabel(ampm) {
	return function useOpenPickerButtonAriaLabel(value) {
		const adapter = usePickerAdapter();
		const translations = usePickerTranslations();
		return import_react.useMemo(() => {
			const formatKey = ampm ?? adapter.is12HourCycleInCurrentLocale() ? "fullTime12h" : "fullTime24h";
			const formattedValue = adapter.isValid(value) ? adapter.format(value, formatKey) : null;
			return translations.openTimePickerDialogue(formattedValue);
		}, [
			value,
			translations,
			adapter
		]);
	};
}
function useApplyDefaultValuesToTimeFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToTimeValidationProps(internalProps);
	const ampm = import_react.useMemo(() => internalProps.ampm ?? adapter.is12HourCycleInCurrentLocale(), [internalProps.ampm, adapter]);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? (ampm ? adapter.formats.fullTime12h : adapter.formats.fullTime24h) }), [
		internalProps,
		validationProps,
		ampm,
		adapter
	]);
}
function useApplyDefaultValuesToTimeValidationProps(props) {
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false
	}), [props.disablePast, props.disableFuture]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeField/useTimeField.mjs
var useTimeField = (props) => {
	return useField({
		manager: useTimeManager(props),
		props
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeField/TimeField.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var _excluded$2 = ["slots", "slotProps"];
/**
* Demos:
*
* - [TimeField](http://mui.com/x/react-date-pickers/time-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [TimeField API](https://mui.com/x/api/date-pickers/time-field/)
*/
var TimeField = /*#__PURE__*/ import_react.forwardRef(function TimeField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiTimeField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$2);
	const fieldResponse = useTimeField(useFieldTextFieldProps({
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
			defaultOpenPickerIcon: ClockIcon
		})
	});
});
TimeField.displayName = "TimeField";
TimeField.propTypes = {
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
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
//#region node_modules/@mui/x-date-pickers/TimePicker/timePickerToolbarClasses.mjs
function getTimePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiTimePickerToolbar", slot);
}
var timePickerToolbarClasses = generateUtilityClasses("MuiTimePickerToolbar", [
	"root",
	"separator",
	"hourMinuteLabel",
	"hourMinuteLabelLandscape",
	"hourMinuteLabelReverse",
	"ampmSelection",
	"ampmLandscape",
	"ampmLabel"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/TimePicker/TimePickerToolbar.mjs
var _excluded$1 = [
	"ampm",
	"ampmInClock",
	"className",
	"classes"
];
var useUtilityClasses = (classes, ownerState) => {
	const { pickerOrientation, toolbarDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		separator: ["separator"],
		hourMinuteLabel: [
			"hourMinuteLabel",
			pickerOrientation === "landscape" && "hourMinuteLabelLandscape",
			toolbarDirection === "rtl" && "hourMinuteLabelReverse"
		],
		ampmSelection: ["ampmSelection", pickerOrientation === "landscape" && "ampmLandscape"],
		ampmLabel: ["ampmLabel"]
	}, getTimePickerToolbarUtilityClass, classes);
};
var TimePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiTimePickerToolbar",
	slot: "Root"
})({});
var TimePickerToolbarSeparator = styled(PickersToolbarText, {
	name: "MuiTimePickerToolbar",
	slot: "Separator"
})({
	outline: 0,
	margin: "0 4px 0 2px",
	cursor: "default"
});
var TimePickerToolbarHourMinuteLabel = styled("div", {
	name: "MuiTimePickerToolbar",
	slot: "HourMinuteLabel",
	overridesResolver: (props, styles) => [{
		[`&.${timePickerToolbarClasses.hourMinuteLabelLandscape}`]: styles.hourMinuteLabelLandscape,
		[`&.${timePickerToolbarClasses.hourMinuteLabelReverse}`]: styles.hourMinuteLabelReverse
	}, styles.hourMinuteLabel]
})({
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "flex-end",
	variants: [{
		props: { toolbarDirection: "rtl" },
		style: { flexDirection: "row-reverse" }
	}, {
		props: { pickerOrientation: "landscape" },
		style: { marginTop: "auto" }
	}]
});
var TimePickerToolbarAmPmSelection = styled("div", {
	name: "MuiTimePickerToolbar",
	slot: "AmPmSelection",
	overridesResolver: (props, styles) => [
		{ [`.${timePickerToolbarClasses.ampmLabel}`]: styles.ampmLabel },
		{ [`&.${timePickerToolbarClasses.ampmLandscape}`]: styles.ampmLandscape },
		styles.ampmSelection
	]
})({
	display: "flex",
	flexDirection: "column",
	marginRight: "auto",
	marginLeft: 12,
	[`& .${timePickerToolbarClasses.ampmLabel}`]: { fontSize: 17 },
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			margin: "4px 0 auto",
			flexDirection: "row",
			justifyContent: "space-around",
			flexBasis: "100%"
		}
	}]
});
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [TimePickerToolbar API](https://mui.com/x/api/date-pickers/time-picker-toolbar/)
*/
function TimePickerToolbar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimePickerToolbar"
	});
	const { ampm, ampmInClock, className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses(classesProp, ownerState);
	const { value, setValue, disabled, readOnly, view, setView, views } = usePickerContext();
	const showAmPmControl = Boolean(ampm && !ampmInClock && views.includes("hours"));
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(value, ampm, (newValue) => setValue(newValue, {
		changeImportance: "set",
		source: "view"
	}));
	const formatSection = (format) => {
		if (!adapter.isValid(value)) return "--";
		return adapter.format(value, format);
	};
	const separator = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TimePickerToolbarSeparator, {
		tabIndex: -1,
		value: ":",
		variant: "h3",
		selected: false,
		className: classes.separator
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TimePickerToolbarRoot, _extends({
		landscapeDirection: "row",
		toolbarTitle: translations.timePickerToolbarTitle,
		ownerState,
		className: clsx(classes.root, className)
	}, other, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TimePickerToolbarHourMinuteLabel, {
		className: classes.hourMinuteLabel,
		ownerState,
		children: [
			arrayIncludes(views, "hours") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "h3",
				onClick: () => setView("hours"),
				selected: view === "hours",
				value: formatSection(ampm ? "hours12h" : "hours24h")
			}),
			arrayIncludes(views, ["hours", "minutes"]) && separator,
			arrayIncludes(views, "minutes") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "h3",
				onClick: () => setView("minutes"),
				selected: view === "minutes",
				value: formatSection("minutes")
			}),
			arrayIncludes(views, ["minutes", "seconds"]) && separator,
			arrayIncludes(views, "seconds") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				variant: "h3",
				onClick: () => setView("seconds"),
				selected: view === "seconds",
				value: formatSection("seconds")
			})
		]
	}), showAmPmControl && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TimePickerToolbarAmPmSelection, {
		className: classes.ampmSelection,
		ownerState,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
			disableRipple: true,
			variant: "subtitle2",
			selected: meridiemMode === "am",
			typographyClassName: classes.ampmLabel,
			value: formatMeridiem(adapter, "am"),
			onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
			disabled
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
			disableRipple: true,
			variant: "subtitle2",
			selected: meridiemMode === "pm",
			typographyClassName: classes.ampmLabel,
			value: formatMeridiem(adapter, "pm"),
			onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
			disabled
		})]
	})] }));
}
TimePickerToolbar.propTypes = {
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
	toolbarPlaceholder: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/TimePicker/shared.mjs
function useTimePickerDefaultizedProps(props, name) {
	const adapter = usePickerAdapter();
	const themeProps = useThemeProps({
		props,
		name
	});
	const validationProps = useApplyDefaultValuesToTimeValidationProps(themeProps);
	const ampm = themeProps.ampm ?? adapter.is12HourCycleInCurrentLocale();
	return _extends({}, themeProps, validationProps, {
		ampm,
		localeText: import_react.useMemo(() => {
			if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
			return _extends({}, themeProps.localeText, { timePickerToolbarTitle: themeProps.localeText.toolbarTitle });
		}, [themeProps.localeText])
	}, applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: ["hours", "minutes"],
		defaultOpenTo: "hours"
	}), {
		slots: _extends({ toolbar: TimePickerToolbar }, themeProps.slots),
		slotProps: _extends({}, themeProps.slotProps, { toolbar: _extends({
			ampm,
			ampmInClock: themeProps.ampmInClock
		}, themeProps.slotProps?.toolbar) })
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/DesktopTimePicker/DesktopTimePicker.mjs
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
*/
var DesktopTimePicker = /*#__PURE__*/ import_react.forwardRef(function DesktopTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiDesktopTimePicker");
	const { shouldRenderTimeInASingleColumn, views: resolvedViews, timeSteps } = resolveTimeViewsResponse(defaultizedProps);
	const renderTimeView = shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? true;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? resolvedViews.filter((view) => view !== "meridiem") : resolvedViews;
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			ampmInClock,
			timeSteps,
			viewRenderers,
			format: resolveTimeFormat(adapter, defaultizedProps),
			views: shouldRenderTimeInASingleColumn ? ["hours"] : views,
			slots: _extends({ field: TimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: true,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "time",
		validator: validateTime,
		steps: null
	});
	return renderPicker();
});
DesktopTimePicker.displayName = "DesktopTimePicker";
DesktopTimePicker.propTypes = {
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
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
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
		"hours",
		"meridiem",
		"minutes",
		"seconds"
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/MobileTimePicker/MobileTimePicker.mjs
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileTimePicker API](https://mui.com/x/api/date-pickers/mobile-time-picker/)
*/
var MobileTimePicker = /*#__PURE__*/ import_react.forwardRef(function MobileTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiMobileTimePicker");
	const viewRenderers = _extends({
		hours: renderTimeViewClock,
		minutes: renderTimeViewClock,
		seconds: renderTimeViewClock
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? false;
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			ampmInClock,
			viewRenderers,
			format: resolveTimeFormat(adapter, defaultizedProps),
			slots: _extends({ field: TimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: false,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "time",
		validator: validateTime,
		steps: null
	});
	return renderPicker();
});
MobileTimePicker.displayName = "MobileTimePicker";
MobileTimePicker.propTypes = {
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
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
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
		"hours",
		"minutes",
		"seconds"
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
		"hours",
		"minutes",
		"seconds"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/TimePicker/TimePicker.mjs
var _excluded = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [TimePicker API](https://mui.com/x/api/date-pickers/time-picker/)
*/
var TimePicker = /*#__PURE__*/ import_react.forwardRef(function TimePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DesktopTimePicker, _extends({ ref }, other));
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MobileTimePicker, _extends({ ref }, other));
});
TimePicker.displayName = "TimePicker";
TimePicker.propTypes = {
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
	* Locale for components texts.
	* Allows overriding texts coming from `LocalizationProvider` and `theme`.
	*/
	localeText: import_prop_types.default.object,
	/**
	* Maximal selectable time.
	* The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
	*/
	maxTime: import_prop_types.default.object,
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
		"hours",
		"meridiem",
		"minutes",
		"seconds"
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
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
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
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	/**
	* Define custom view renderers for each section.
	* If `null`, the section will only have field editing.
	* If `undefined`, internally defined view will be used.
	*/
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	/**
	* Available views.
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
export { TimePicker, TimePickerToolbar, timePickerToolbarClasses };

//# sourceMappingURL=@mui_x-date-pickers_TimePicker.js.map