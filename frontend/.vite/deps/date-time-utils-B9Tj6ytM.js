import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, a as rootShouldForwardProp, h as clsx, i as styled, l as useRtl, m as generateUtilityClass, r as useThemeProps } from "./LocalizationProvider-CyOIGrUO.js";
import { At as useForkRef_default, B as contains_default, Bt as useId, C as List, Ct as resolveDateFormat, D as useEventCallback_default, E as ButtonBase, Ft as ownerDocument, Ht as generateUtilityClasses, It as useEventCallback, J as useNow, K as useSlotProps, Lt as useForkRef, M as useControlledValue, Mt as useDefaultProps, N as useViews, Nt as memoTheme, Ot as getActiveElement_default, Pt as ownerWindow, R as getFocusedListItemIndex, T as Button, V as setRef, Vt as useEnhancedEffect, X as usePickerTranslations, Z as usePickerAdapter, _t as formatMeridiem, dt as isInternalTimeView, et as usePickerPrivateContext, ft as isTimeView, g as IconButton, i as useMeridiemMode, it as Typography, k as useId_default, kt as activeElement, lt as convertValueToMeridiem, n as getScrollbarSize, nt as getPickersToolbarUtilityClass, ot as singleItemValueManager, pt as resolveTimeFormat, r as PickerViewRoot, s as PickersArrowSwitcher, st as SECTION_TYPE_GRANULARITY, ut as createIsAfterIgnoreDatePart, w as ListContext, xt as isDatePickerView, yt as getTodayDate, zt as composeClasses } from "./useMobilePicker-CRLhUKKU.js";
//#region node_modules/@mui/material/utils/useEnhancedEffect.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var useEnhancedEffect_default = useEnhancedEffect;
//#endregion
//#region node_modules/@mui/material/utils/ownerDocument.mjs
var ownerDocument_default = ownerDocument;
//#endregion
//#region node_modules/@mui/material/MenuItem/menuItemClasses.mjs
function getMenuItemUtilityClass(slot) {
	return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", [
	"root",
	"focusVisible",
	"dense",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/validation/validateTime.mjs
/**
* Validation props used by the Time Picker, Time Field and Clock components.
*/
/**
* Validation props as received by the validateTime method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateTime method.
*/
var validateTime = ({ adapter, value, timezone, props }) => {
	if (value === null) return null;
	const { minTime, maxTime, minutesStep, shouldDisableTime, disableIgnoringDatePartForTimeValidation = false, disablePast, disableFuture } = props;
	const now = adapter.date(void 0, timezone);
	const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
	switch (true) {
		case !adapter.isValid(value): return "invalidDate";
		case Boolean(minTime && isAfter(minTime, value)): return "minTime";
		case Boolean(maxTime && isAfter(value, maxTime)): return "maxTime";
		case Boolean(disableFuture && adapter.isAfter(value, now)): return "disableFuture";
		case Boolean(disablePast && adapter.isBefore(value, now)): return "disablePast";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "hours")): return "shouldDisableTime-hours";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "minutes")): return "shouldDisableTime-minutes";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "seconds")): return "shouldDisableTime-seconds";
		case Boolean(minutesStep && adapter.getMinutes(value) % minutesStep !== 0): return "minutesStep";
		default: return null;
	}
};
validateTime.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/material/utils/ownerWindow.mjs
var ownerWindow_default = ownerWindow;
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/pickersToolbarTextClasses.mjs
function getPickersToolbarTextUtilityClass(slot) {
	return generateUtilityClass("MuiPickersToolbarText", slot);
}
var pickersToolbarTextClasses = generateUtilityClasses("MuiPickersToolbarText", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersToolbarText.mjs
var _excluded$8 = [
	"className",
	"classes",
	"selected",
	"value"
];
var useUtilityClasses$9 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersToolbarTextUtilityClass, classes);
};
var PickersToolbarTextRoot = styled(Typography, {
	name: "MuiPickersToolbarText",
	slot: "Root"
})(({ theme }) => ({
	transition: theme.transitions.create("color"),
	color: (theme.vars || theme).palette.text.secondary,
	[`&[data-selected]`]: { color: (theme.vars || theme).palette.text.primary }
}));
var PickersToolbarText = /*#__PURE__*/ import_react.forwardRef(function PickersToolbarText(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbarText"
	});
	const { className, classes: classesProp, selected, value } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarTextRoot, _extends({
		ref,
		className: clsx(useUtilityClasses$9(classesProp).root, className),
		component: "span",
		ownerState: props
	}, selected && { "data-selected": true }, other, { children: value }));
});
PickersToolbarText.displayName = "PickersToolbarText";
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersToolbarButton.mjs
var _excluded$7 = [
	"align",
	"className",
	"classes",
	"selected",
	"typographyClassName",
	"value",
	"variant",
	"width"
];
var useUtilityClasses$8 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersToolbarUtilityClass, classes);
};
var PickersToolbarButtonRoot = styled(Button, {
	name: "MuiPickersToolbarButton",
	slot: "Root"
})({
	padding: 0,
	minWidth: 16,
	textTransform: "none"
});
var PickersToolbarButton = /*#__PURE__*/ import_react.forwardRef(function PickersToolbarButton(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbarButton"
	});
	const { align, className, classes: classesProp, selected, typographyClassName, value, variant, width } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarButtonRoot, _extends({
		variant: "text",
		ref,
		className: clsx(useUtilityClasses$8(classesProp).root, className),
		ownerState: props
	}, width ? { sx: { width } } : {}, other, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarText, {
		align,
		className: typographyClassName,
		variant,
		value,
		selected
	}) }));
});
PickersToolbarButton.displayName = "PickersToolbarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/timeClockClasses.mjs
function getTimeClockUtilityClass(slot) {
	return generateUtilityClass("MuiTimeClock", slot);
}
generateUtilityClasses("MuiTimeClock", ["root", "arrowSwitcher"]);
var clockCenter = {
	x: 220 / 2,
	y: 220 / 2
};
var baseClockPoint = {
	x: clockCenter.x,
	y: 0
};
var cx = baseClockPoint.x - clockCenter.x;
var cy = baseClockPoint.y - clockCenter.y;
var rad2deg = (rad) => rad * (180 / Math.PI);
var getAngleValue = (step, offsetX, offsetY) => {
	const x = offsetX - clockCenter.x;
	const y = offsetY - clockCenter.y;
	let deg = rad2deg(Math.atan2(cx, cy) - Math.atan2(x, y));
	deg = Math.round(deg / step) * step;
	deg %= 360;
	const value = Math.floor(deg / step) || 0;
	const delta = x ** 2 + y ** 2;
	return {
		value,
		distance: Math.sqrt(delta)
	};
};
var getMinutes = (offsetX, offsetY, step = 1) => {
	let { value } = getAngleValue(step * 6, offsetX, offsetY);
	value = value * step % 60;
	return value;
};
var getHours = (offsetX, offsetY, ampm) => {
	const { value, distance } = getAngleValue(30, offsetX, offsetY);
	let hour = value || 12;
	if (!ampm) {
		if (distance < 220 / 2 - 36) {
			hour += 12;
			hour %= 24;
		}
	} else hour %= 12;
	return hour;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/clockPointerClasses.mjs
function getClockPointerUtilityClass(slot) {
	return generateUtilityClass("MuiClockPointer", slot);
}
generateUtilityClasses("MuiClockPointer", ["root", "thumb"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/ClockPointer.mjs
var _excluded$6 = [
	"className",
	"classes",
	"isBetweenTwoClockValues",
	"isInner",
	"type",
	"viewValue"
];
var useUtilityClasses$7 = (classes) => {
	return composeClasses({
		root: ["root"],
		thumb: ["thumb"]
	}, getClockPointerUtilityClass, classes);
};
var ClockPointerRoot = styled("div", {
	name: "MuiClockPointer",
	slot: "Root"
})(({ theme }) => ({
	width: 2,
	backgroundColor: (theme.vars || theme).palette.primary.main,
	position: "absolute",
	left: "calc(50% - 1px)",
	bottom: "50%",
	transformOrigin: "center bottom 0px",
	variants: [{
		props: { isClockPointerAnimated: true },
		style: { transition: theme.transitions.create(["transform", "height"]) }
	}]
}));
var ClockPointerThumb = styled("div", {
	name: "MuiClockPointer",
	slot: "Thumb"
})(({ theme }) => ({
	width: 4,
	height: 4,
	backgroundColor: (theme.vars || theme).palette.primary.contrastText,
	borderRadius: "50%",
	position: "absolute",
	top: -21,
	left: `calc(50% - ${36 / 2}px)`,
	border: `${32 / 2}px solid ${(theme.vars || theme).palette.primary.main}`,
	boxSizing: "content-box",
	variants: [{
		props: { isClockPointerBetweenTwoValues: false },
		style: { backgroundColor: (theme.vars || theme).palette.primary.main }
	}]
}));
/**
* @ignore - internal component.
*/
function ClockPointer(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiClockPointer"
	});
	const { className, classes: classesProp, isBetweenTwoClockValues, isInner, type, viewValue } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
	const previousType = import_react.useRef(type);
	import_react.useEffect(() => {
		previousType.current = type;
	}, [type]);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockPointerAnimated: previousType.current !== type,
		isClockPointerBetweenTwoValues: isBetweenTwoClockValues
	});
	const classes = useUtilityClasses$7(classesProp);
	const getAngleStyle = () => {
		let angle = 360 / (type === "hours" ? 12 : 60) * viewValue;
		if (type === "hours" && viewValue > 12) angle -= 360;
		return {
			height: Math.round((isInner ? .26 : .4) * 220),
			transform: `rotateZ(${angle}deg)`
		};
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockPointerRoot, _extends({
		style: getAngleStyle(),
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockPointerThumb, {
		ownerState,
		className: classes.thumb
	}) }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/clockClasses.mjs
function getClockUtilityClass(slot) {
	return generateUtilityClass("MuiClock", slot);
}
generateUtilityClasses("MuiClock", [
	"root",
	"clock",
	"wrapper",
	"squareMask",
	"pin",
	"amButton",
	"pmButton",
	"meridiemText",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/Clock.mjs
var useUtilityClasses$6 = (classes, ownerState) => {
	return composeClasses({
		root: ["root"],
		clock: ["clock"],
		wrapper: ["wrapper"],
		squareMask: ["squareMask"],
		pin: ["pin"],
		amButton: ["amButton", ownerState.clockMeridiemMode === "am" && "selected"],
		pmButton: ["pmButton", ownerState.clockMeridiemMode === "pm" && "selected"],
		meridiemText: ["meridiemText"]
	}, getClockUtilityClass, classes);
};
var ClockRoot = styled("div", {
	name: "MuiClock",
	slot: "Root"
})(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: theme.spacing(2)
}));
var ClockClock = styled("div", {
	name: "MuiClock",
	slot: "Clock"
})({
	backgroundColor: "rgba(0,0,0,.07)",
	borderRadius: "50%",
	height: 220,
	width: 220,
	flexShrink: 0,
	position: "relative",
	pointerEvents: "none"
});
var ClockWrapper = styled("div", {
	name: "MuiClock",
	slot: "Wrapper"
})({ "&:focus": { outline: "none" } });
var ClockSquareMask = styled("div", {
	name: "MuiClock",
	slot: "SquareMask"
})({
	width: "100%",
	height: "100%",
	position: "absolute",
	pointerEvents: "auto",
	outline: 0,
	touchAction: "none",
	userSelect: "none",
	variants: [{
		props: { isClockDisabled: false },
		style: {
			"@media (pointer: fine)": {
				cursor: "pointer",
				borderRadius: "50%"
			},
			"&:active": { cursor: "move" }
		}
	}]
});
var ClockPin = styled("div", {
	name: "MuiClock",
	slot: "Pin"
})(({ theme }) => ({
	width: 6,
	height: 6,
	borderRadius: "50%",
	backgroundColor: (theme.vars || theme).palette.primary.main,
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)"
}));
var meridiemButtonCommonStyles = (theme, clockMeridiemMode) => ({
	zIndex: 1,
	bottom: 8,
	paddingLeft: 4,
	paddingRight: 4,
	width: 36,
	variants: [{
		props: { clockMeridiemMode },
		style: {
			backgroundColor: (theme.vars || theme).palette.primary.main,
			color: (theme.vars || theme).palette.primary.contrastText,
			"&:hover": { backgroundColor: (theme.vars || theme).palette.primary.light }
		}
	}]
});
var ClockAmButton = styled(IconButton, {
	name: "MuiClock",
	slot: "AmButton"
})(({ theme }) => _extends({}, meridiemButtonCommonStyles(theme, "am"), {
	position: "absolute",
	left: 8
}));
var ClockPmButton = styled(IconButton, {
	name: "MuiClock",
	slot: "PmButton"
})(({ theme }) => _extends({}, meridiemButtonCommonStyles(theme, "pm"), {
	position: "absolute",
	right: 8
}));
var ClockMeridiemText = styled(Typography, {
	name: "MuiClock",
	slot: "MeridiemText"
})({
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
});
/**
* @ignore - internal component.
*/
function Clock(inProps) {
	const { ampm, ampmInClock, autoFocus, children, value, handleMeridiemChange, isTimeDisabled, meridiemMode, minutesStep = 1, onChange, selectedId, type, viewValue, viewRange: [minViewValue, maxViewValue], disabled = false, readOnly, className, classes: classesProp } = useThemeProps({
		props: inProps,
		name: "MuiClock"
	});
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockDisabled: disabled,
		clockMeridiemMode: meridiemMode
	});
	const isMoving = import_react.useRef(false);
	const activePointerIdRef = import_react.useRef(null);
	const squareMaskRef = import_react.useRef(null);
	const removeDragListenersRef = import_react.useRef(void 0);
	const classes = useUtilityClasses$6(classesProp, ownerState);
	const isSelectedTimeDisabled = isTimeDisabled(viewValue, type);
	const isPointerInner = !ampm && type === "hours" && (viewValue < 1 || viewValue > 12);
	const handleValueChange = (newValue, isFinish) => {
		if (disabled || readOnly) return;
		if (isTimeDisabled(newValue, type)) return;
		onChange(newValue, isFinish);
	};
	const setTime = (event, isFinish) => {
		const mask = squareMaskRef.current;
		if (!mask) return;
		const rect = mask.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		handleValueChange(type === "seconds" || type === "minutes" ? getMinutes(offsetX, offsetY, minutesStep) : getHours(offsetX, offsetY, Boolean(ampm)), isFinish);
	};
	const stopTracking = () => {
		isMoving.current = false;
		activePointerIdRef.current = null;
		removeDragListenersRef.current?.();
	};
	const handleDocumentPointerMove = useEventCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		event.preventDefault();
		setTime(event, "shallow");
	});
	const handleDocumentPointerUp = useEventCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		stopTracking();
		setTime(event, "finish");
	});
	const handleDocumentPointerCancel = useEventCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		stopTracking();
	});
	const handlePointerDown = (event) => {
		if (event.button > 0 || event.isPrimary === false || disabled || readOnly) return;
		stopTracking();
		isMoving.current = true;
		activePointerIdRef.current = event.pointerId;
		const doc = ownerDocument(squareMaskRef.current);
		doc.addEventListener("pointermove", handleDocumentPointerMove);
		doc.addEventListener("pointerup", handleDocumentPointerUp);
		doc.addEventListener("pointercancel", handleDocumentPointerCancel);
		removeDragListenersRef.current = () => {
			doc.removeEventListener("pointermove", handleDocumentPointerMove);
			doc.removeEventListener("pointerup", handleDocumentPointerUp);
			doc.removeEventListener("pointercancel", handleDocumentPointerCancel);
			removeDragListenersRef.current = void 0;
		};
		setTime(event.nativeEvent, "shallow");
	};
	const isPointerBetweenTwoClockValues = type === "hours" ? false : viewValue % 5 !== 0;
	const keyboardControlStep = type === "minutes" ? minutesStep : 1;
	const listboxRef = import_react.useRef(null);
	useEnhancedEffect(() => {
		if (autoFocus) listboxRef.current.focus();
	}, [autoFocus]);
	import_react.useEffect(() => () => removeDragListenersRef.current?.(), []);
	const clampValue = (newValue) => Math.max(minViewValue, Math.min(maxViewValue, newValue));
	const circleValue = (newValue) => (newValue + (maxViewValue + 1)) % (maxViewValue + 1);
	const handleKeyDown = (event) => {
		if (isMoving.current) return;
		switch (event.key) {
			case "Home":
				handleValueChange(minViewValue, "partial");
				event.preventDefault();
				break;
			case "End":
				handleValueChange(maxViewValue, "partial");
				event.preventDefault();
				break;
			case "ArrowUp":
				handleValueChange(circleValue(viewValue + keyboardControlStep), "partial");
				event.preventDefault();
				break;
			case "ArrowDown":
				handleValueChange(circleValue(viewValue - keyboardControlStep), "partial");
				event.preventDefault();
				break;
			case "PageUp":
				handleValueChange(clampValue(viewValue + 5), "partial");
				event.preventDefault();
				break;
			case "PageDown":
				handleValueChange(clampValue(viewValue - 5), "partial");
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleValueChange(viewValue, "finish");
				event.preventDefault();
				break;
			default:
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ClockRoot, {
		className: clsx(classes.root, className),
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ClockClock, {
			className: classes.clock,
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockSquareMask, {
					ref: squareMaskRef,
					onPointerDown: handlePointerDown,
					ownerState,
					className: classes.squareMask
				}),
				!isSelectedTimeDisabled && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockPin, { className: classes.pin }), value != null && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockPointer, {
					type,
					viewValue,
					isInner: isPointerInner,
					isBetweenTwoClockValues: isPointerBetweenTwoClockValues
				})] }),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockWrapper, {
					"aria-activedescendant": selectedId,
					"aria-label": translations.clockLabelText(type, value == null ? null : adapter.format(value, ampm ? "fullTime12h" : "fullTime24h")),
					ref: listboxRef,
					role: "listbox",
					onKeyDown: handleKeyDown,
					tabIndex: 0,
					className: classes.wrapper,
					children
				})
			]
		}), ampm && ampmInClock && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockAmButton, {
			onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
			disabled: disabled || meridiemMode === null,
			ownerState,
			className: classes.amButton,
			title: formatMeridiem(adapter, "am"),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockMeridiemText, {
				variant: "caption",
				className: classes.meridiemText,
				children: formatMeridiem(adapter, "am")
			})
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockPmButton, {
			disabled: disabled || meridiemMode === null,
			onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
			ownerState,
			className: classes.pmButton,
			title: formatMeridiem(adapter, "pm"),
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockMeridiemText, {
				variant: "caption",
				className: classes.meridiemText,
				children: formatMeridiem(adapter, "pm")
			})
		})] })]
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/clockNumberClasses.mjs
function getClockNumberUtilityClass(slot) {
	return generateUtilityClass("MuiClockNumber", slot);
}
var clockNumberClasses = generateUtilityClasses("MuiClockNumber", [
	"root",
	"selected",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/ClockNumber.mjs
var _excluded$5 = [
	"className",
	"classes",
	"disabled",
	"index",
	"inner",
	"label",
	"selected"
];
var useUtilityClasses$5 = (classes, ownerState) => {
	return composeClasses({ root: [
		"root",
		ownerState.isClockNumberSelected && "selected",
		ownerState.isClockNumberDisabled && "disabled"
	] }, getClockNumberUtilityClass, classes);
};
var ClockNumberRoot = styled("span", {
	name: "MuiClockNumber",
	slot: "Root",
	overridesResolver: (_, styles) => [
		styles.root,
		{ [`&.${clockNumberClasses.disabled}`]: styles.disabled },
		{ [`&.${clockNumberClasses.selected}`]: styles.selected }
	]
})(({ theme }) => ({
	height: 36,
	width: 36,
	position: "absolute",
	left: `calc((100% - 36px) / 2)`,
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",
	color: (theme.vars || theme).palette.text.primary,
	fontFamily: theme.typography.fontFamily,
	"&:focused": { backgroundColor: (theme.vars || theme).palette.background.paper },
	[`&.${clockNumberClasses.selected}`]: { color: (theme.vars || theme).palette.primary.contrastText },
	[`&.${clockNumberClasses.disabled}`]: {
		pointerEvents: "none",
		color: (theme.vars || theme).palette.text.disabled
	},
	variants: [{
		props: { isClockNumberInInnerRing: true },
		style: _extends({}, theme.typography.body2, { color: (theme.vars || theme).palette.text.secondary })
	}]
}));
/**
* @ignore - internal component.
*/
function ClockNumber(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiClockNumber"
	});
	const { className, classes: classesProp, disabled, index, inner, label, selected } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockNumberInInnerRing: inner,
		isClockNumberSelected: selected,
		isClockNumberDisabled: disabled
	});
	const classes = useUtilityClasses$5(classesProp, ownerState);
	const angle = index % 12 / 12 * Math.PI * 2 - Math.PI / 2;
	const length = 182 / 2 * (inner ? .65 : 1);
	const x = Math.round(Math.cos(angle) * length);
	const y = Math.round(Math.sin(angle) * length);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockNumberRoot, _extends({
		className: clsx(classes.root, className),
		"aria-disabled": disabled ? true : void 0,
		"aria-selected": selected ? true : void 0,
		role: "option",
		style: { transform: `translate(${x}px, ${y + 184 / 2}px` },
		ownerState
	}, other, { children: label }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/ClockNumbers.mjs
/**
* @ignore - internal component.
*/
var getHourNumbers = ({ ampm, value, getClockNumberText, isDisabled, selectedId, adapter }) => {
	const currentHours = value ? adapter.getHours(value) : null;
	const hourNumbers = [];
	const startHour = ampm ? 1 : 0;
	const endHour = ampm ? 12 : 23;
	const isSelected = (hour) => {
		if (currentHours === null) return false;
		if (ampm) {
			if (hour === 12) return currentHours === 12 || currentHours === 0;
			return currentHours === hour || currentHours - 12 === hour;
		}
		return currentHours === hour;
	};
	for (let hour = startHour; hour <= endHour; hour += 1) {
		let label = hour.toString();
		if (hour === 0) label = "00";
		const inner = !ampm && (hour === 0 || hour > 12);
		label = adapter.formatNumber(label);
		const selected = isSelected(hour);
		hourNumbers.push(/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockNumber, {
			id: selected ? selectedId : void 0,
			index: hour,
			inner,
			selected,
			disabled: isDisabled(hour),
			label,
			"aria-label": getClockNumberText(label)
		}, hour));
	}
	return hourNumbers;
};
var getMinutesNumbers = ({ adapter, value, isDisabled, getClockNumberText, selectedId }) => {
	const f = adapter.formatNumber;
	return [
		[5, f("05")],
		[10, f("10")],
		[15, f("15")],
		[20, f("20")],
		[25, f("25")],
		[30, f("30")],
		[35, f("35")],
		[40, f("40")],
		[45, f("45")],
		[50, f("50")],
		[55, f("55")],
		[0, f("00")]
	].map(([numberValue, label], index) => {
		const selected = numberValue === value;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockNumber, {
			label,
			id: selected ? selectedId : void 0,
			index: index + 1,
			inner: false,
			disabled: isDisabled(numberValue),
			selected,
			"aria-label": getClockNumberText(label)
		}, numberValue);
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useClockReferenceDate.mjs
var useClockReferenceDate = ({ value, referenceDate: referenceDateProp, adapter, props, timezone }) => {
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.day,
		timezone,
		getTodayDate: () => getTodayDate(adapter, timezone, "date")
	}), [referenceDateProp, timezone]);
	return value ?? referenceDate;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/TimeClock/TimeClock.mjs
var _excluded$4 = [
	"ampm",
	"ampmInClock",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"showViewSwitcher",
	"onChange",
	"view",
	"views",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"timezone"
];
var useUtilityClasses$4 = (classes) => {
	return composeClasses({
		root: ["root"],
		arrowSwitcher: ["arrowSwitcher"]
	}, getTimeClockUtilityClass, classes);
};
var TimeClockRoot = styled(PickerViewRoot, {
	name: "MuiTimeClock",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	position: "relative"
});
var TimeClockArrowSwitcher = styled(PickersArrowSwitcher, {
	name: "MuiTimeClock",
	slot: "ArrowSwitcher"
})({
	position: "absolute",
	right: 12,
	top: 15
});
var TIME_CLOCK_DEFAULT_VIEWS = ["hours", "minutes"];
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [TimeClock](https://mui.com/x/react-date-pickers/time-clock/)
*
* API:
*
* - [TimeClock API](https://mui.com/x/api/date-pickers/time-clock/)
*/
var TimeClock = /*#__PURE__*/ import_react.forwardRef(function TimeClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimeClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), ampmInClock = false, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, showViewSwitcher, onChange, view: inView, views = TIME_CLOCK_DEFAULT_VIEWS, openTo, onViewChange, focusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "TimeClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const selectedId = useId();
	const { ownerState } = usePickerPrivateContext();
	const { view, setView, previousView, nextView, setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: handleValueChange,
		focusedView,
		onFocusedViewChange
	});
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(valueOrReferenceDate, ampm, setValueAndGoToNextView);
	const isTimeDisabled = import_react.useCallback((rawValue, viewType) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const shouldCheckPastEnd = viewType === "hours" || viewType === "minutes" && views.includes("seconds");
		const containsValidTime = ({ start, end }) => {
			if (minTime && isAfter(minTime, end)) return false;
			if (maxTime && isAfter(start, maxTime)) return false;
			if (disableFuture && isAfter(start, now)) return false;
			if (disablePast && isAfter(now, shouldCheckPastEnd ? end : start)) return false;
			return true;
		};
		const isValidValue = (timeValue, step = 1) => {
			if (timeValue % step !== 0) return false;
			if (shouldDisableTime) switch (viewType) {
				case "hours": return !shouldDisableTime(adapter.setHours(valueOrReferenceDate, timeValue), "hours");
				case "minutes": return !shouldDisableTime(adapter.setMinutes(valueOrReferenceDate, timeValue), "minutes");
				case "seconds": return !shouldDisableTime(adapter.setSeconds(valueOrReferenceDate, timeValue), "seconds");
				default: return false;
			}
			return true;
		};
		switch (viewType) {
			case "hours": {
				const valueWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
				const dateWithNewHours = adapter.setHours(valueOrReferenceDate, valueWithMeridiem);
				if (adapter.getHours(dateWithNewHours) !== valueWithMeridiem) return true;
				return !containsValidTime({
					start: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 0), 0),
					end: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 59), 59)
				}) || !isValidValue(valueWithMeridiem);
			}
			case "minutes": {
				const dateWithNewMinutes = adapter.setMinutes(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: adapter.setSeconds(dateWithNewMinutes, 0),
					end: adapter.setSeconds(dateWithNewMinutes, 59)
				}) || !isValidValue(rawValue, minutesStep);
			}
			case "seconds": {
				const dateWithNewSeconds = adapter.setSeconds(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: dateWithNewSeconds,
					end: dateWithNewSeconds
				}) || !isValidValue(rawValue);
			}
			default: throw new Error("not supported");
		}
	}, [
		ampm,
		valueOrReferenceDate,
		disableIgnoringDatePartForTimeValidation,
		maxTime,
		meridiemMode,
		minTime,
		minutesStep,
		shouldDisableTime,
		adapter,
		disableFuture,
		disablePast,
		now,
		views
	]);
	const viewProps = import_react.useMemo(() => {
		switch (view) {
			case "hours": {
				const handleHoursChange = (hourValue, isFinish) => {
					const valueWithMeridiem = convertValueToMeridiem(hourValue, meridiemMode, ampm);
					setValueAndGoToNextView(adapter.setHours(valueOrReferenceDate, valueWithMeridiem), isFinish, "hours");
				};
				const viewValue = adapter.getHours(valueOrReferenceDate);
				let viewRange;
				if (ampm) if (viewValue > 12) viewRange = [12, 23];
				else viewRange = [0, 11];
				else viewRange = [0, 23];
				return {
					onChange: handleHoursChange,
					viewValue,
					children: getHourNumbers({
						value,
						adapter,
						ampm,
						onChange: handleHoursChange,
						getClockNumberText: translations.hoursClockNumberText,
						isDisabled: (hourValue) => disabled || isTimeDisabled(hourValue, "hours"),
						selectedId
					}),
					viewRange
				};
			}
			case "minutes": {
				const minutesValue = adapter.getMinutes(valueOrReferenceDate);
				const handleMinutesChange = (minuteValue, isFinish) => {
					setValueAndGoToNextView(adapter.setMinutes(valueOrReferenceDate, minuteValue), isFinish, "minutes");
				};
				return {
					viewValue: minutesValue,
					onChange: handleMinutesChange,
					children: getMinutesNumbers({
						adapter,
						value: minutesValue,
						onChange: handleMinutesChange,
						getClockNumberText: translations.minutesClockNumberText,
						isDisabled: (minuteValue) => disabled || isTimeDisabled(minuteValue, "minutes"),
						selectedId
					}),
					viewRange: [0, 59]
				};
			}
			case "seconds": {
				const secondsValue = adapter.getSeconds(valueOrReferenceDate);
				const handleSecondsChange = (secondValue, isFinish) => {
					setValueAndGoToNextView(adapter.setSeconds(valueOrReferenceDate, secondValue), isFinish, "seconds");
				};
				return {
					viewValue: secondsValue,
					onChange: handleSecondsChange,
					children: getMinutesNumbers({
						adapter,
						value: secondsValue,
						onChange: handleSecondsChange,
						getClockNumberText: translations.secondsClockNumberText,
						isDisabled: (secondValue) => disabled || isTimeDisabled(secondValue, "seconds"),
						selectedId
					}),
					viewRange: [0, 59]
				};
			}
			default: throw new Error("MUI X: You must provide the type for ClockView");
		}
	}, [
		view,
		adapter,
		value,
		ampm,
		translations.hoursClockNumberText,
		translations.minutesClockNumberText,
		translations.secondsClockNumberText,
		meridiemMode,
		setValueAndGoToNextView,
		valueOrReferenceDate,
		isTimeDisabled,
		selectedId,
		disabled
	]);
	const classes = useUtilityClasses$4(classesProp);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TimeClockRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Clock, _extends({
		autoFocus: autoFocus ?? !!focusedView,
		ampmInClock: ampmInClock && views.includes("hours"),
		value,
		type: view,
		ampm,
		minutesStep,
		isTimeDisabled,
		meridiemMode,
		handleMeridiemChange,
		selectedId,
		disabled,
		readOnly
	}, viewProps)), showViewSwitcher && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TimeClockArrowSwitcher, {
		className: classes.arrowSwitcher,
		slots,
		slotProps,
		onGoToPrevious: () => setView(previousView),
		isPreviousDisabled: !previousView,
		previousLabel: translations.openPreviousView,
		onGoToNext: () => setView(nextView),
		isNextDisabled: !nextView,
		nextLabel: translations.openNextView,
		ownerState
	})] }));
});
TimeClock.displayName = "TimeClock";
TimeClock.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* Display ampm controls under the clock (instead of in the toolbar).
	* @default false
	*/
	ampmInClock: import_prop_types.default.bool,
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* The default selected value.
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
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* Controlled focused view.
	*/
	focusedView: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
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
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TView The view type. Will be one of date or time views.
	* @param {TValue} value The new value.
	* @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
	* @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired on focused view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view to focus or not.
	* @param {boolean} hasFocus `true` if the view should be focused.
	*/
	onFocusedViewChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
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
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid time using the validation props, except callbacks such as `shouldDisableTime`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Disable specific time.
	* @param {PickerValidDate} value The value to check.
	* @param {TimeView} view The clock type of the timeValue.
	* @returns {boolean} If `true` the time will be disabled.
	*/
	shouldDisableTime: import_prop_types.default.func,
	showViewSwitcher: import_prop_types.default.bool,
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
	* Available views.
	* @default ['hours', 'minutes']
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/material/utils/focusWithVisible.mjs
/**
* If `focusSource` is present, attempt to pass `focusVisible` through `focus()` options.
* Fall back to a plain focus call when the browser does not support it.
*/
function focusWithVisible(element, focusSource) {
	if (focusSource == null) {
		element.focus();
		return;
	}
	try {
		element.focus({ focusVisible: focusSource === "keyboard" });
	} catch (error) {
		element.focus();
	}
}
//#endregion
//#region node_modules/@mui/utils/useRovingTabIndex/RovingTabIndexContext.mjs
var RovingTabIndexContext = /*#__PURE__*/ import_react.createContext(void 0);
RovingTabIndexContext.displayName = "RovingTabIndexContext";
function useRovingTabIndexContext() {
	const context = import_react.useContext(RovingTabIndexContext);
	if (context === void 0) throw new Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");
	return context;
}
//#endregion
//#region node_modules/@mui/utils/fastObjectShallowCompare/fastObjectShallowCompare.mjs
var is = Object.is;
/**
* Fast shallow compare for plain objects.
* Returns `true` when both objects have the same own enumerable keys and each value is equal
* according to `Object.is()`.
*/
function fastObjectShallowCompare(a, b) {
	if (a === b) return true;
	if (!(a instanceof Object) || !(b instanceof Object)) return false;
	let aLength = 0;
	let bLength = 0;
	for (const key in a) {
		aLength += 1;
		if (!is(a[key], b[key])) return false;
		if (!(key in b)) return false;
	}
	for (const _ in b) bLength += 1;
	return aLength === bLength;
}
//#endregion
//#region node_modules/@mui/utils/useRovingTabIndex/useRovingTabIndex.mjs
var SUPPORTED_KEYS = [
	"ArrowRight",
	"ArrowLeft",
	"ArrowUp",
	"ArrowDown",
	"Home",
	"End"
];
/**
* Provides roving tab index behavior for a composite container and its focusable children.
* This is useful for implementing keyboard navigation in components like menus, tabs, and lists.
* The hook manages the focus state of child elements and provides props to be spread on both the container and the items.
* The container will handle keyboard events to move focus between items based on the specified orientation and wrapping behavior.
*/
function useRovingTabIndexRoot(params) {
	const { activeItemId: activeItemIdProp, getDefaultActiveItemId, orientation, isRtl = false, isItemFocusable: itemFilter = isItemFocusable, wrap = true } = params;
	const [activeItemIdState, setActiveItemIdState] = import_react.useState(activeItemIdProp);
	const [previousActiveItemIdProp, setPreviousActiveItemIdProp] = import_react.useState(activeItemIdProp);
	let activeItemIdCandidate = activeItemIdState;
	if (activeItemIdProp !== previousActiveItemIdProp) {
		setPreviousActiveItemIdProp(activeItemIdProp);
		if (activeItemIdProp !== void 0 && activeItemIdProp !== activeItemIdState) {
			activeItemIdCandidate = activeItemIdProp;
			setActiveItemIdState(activeItemIdProp);
		}
	}
	const containerRef = import_react.useRef(null);
	const itemMapRef = import_react.useRef(/* @__PURE__ */ new Map());
	const [mapTick, setMapTick] = import_react.useState(0);
	const orderedItems = import_react.useMemo(() => {
		return getOrderedItems(itemMapRef.current);
	}, [mapTick]);
	const resolvedActiveItemId = resolveActiveItemId(activeItemIdCandidate, orderedItems, itemFilter, getDefaultActiveItemId);
	const activeItemIdRef = import_react.useRef(resolvedActiveItemId);
	activeItemIdRef.current = resolvedActiveItemId;
	const getActiveItem = import_react.useCallback(() => {
		const snapshot = getOrderedItems(itemMapRef.current);
		return getItemById(snapshot, resolveActiveItemId(activeItemIdRef.current, snapshot, itemFilter, getDefaultActiveItemId));
	}, [getDefaultActiveItemId, itemFilter]);
	const getItemMap = import_react.useCallback(() => {
		return itemMapRef.current;
	}, []);
	const registerItem = useEventCallback((item) => {
		if (fastObjectShallowCompare(itemMapRef.current.get(item.id) ?? null, item)) return;
		itemMapRef.current.set(item.id, item);
		setMapTick((value) => value + 1);
	});
	const unregisterItem = useEventCallback((itemId) => {
		if (itemMapRef.current.delete(itemId)) setMapTick((value) => value + 1);
	});
	const setActiveItemId = useEventCallback((itemId) => {
		setActiveItemIdState(itemId);
	});
	const isItemActive = import_react.useCallback((itemId) => {
		return activeItemIdRef.current === itemId;
	}, []);
	const focusItem = import_react.useCallback((currentIndex, direction, wrap, isItemFocusableOverride) => {
		const nextItem = getNextActiveItem(getNavigableItemsSnapshot(itemMapRef.current), currentIndex, direction, wrap, isItemFocusableOverride ?? itemFilter);
		if (!nextItem) return null;
		nextItem.element?.focus();
		setActiveItemIdState(nextItem.id);
		return nextItem;
	}, [itemFilter]);
	const getContainerProps = import_react.useCallback((ref) => {
		const onFocus = (event) => {
			const snapshot = getNavigableItemsSnapshot(itemMapRef.current);
			const focusedIndex = findItemIndexByElement(snapshot, event.target);
			if (focusedIndex !== -1) setActiveItemIdState(snapshot[focusedIndex].id);
		};
		const onKeyDown = (event) => {
			if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
			if (!SUPPORTED_KEYS.includes(event.key)) return;
			let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
			let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
			if (orientation === "horizontal" && isRtl) {
				previousItemKey = "ArrowRight";
				nextItemKey = "ArrowLeft";
			}
			const snapshot = getNavigableItemsSnapshot(itemMapRef.current);
			const currentFocus = activeElement(ownerDocument(containerRef.current));
			const isFocusOnContainer = currentFocus === containerRef.current;
			let currentIndex = getCurrentActiveItemIndex(snapshot, currentFocus, activeItemIdRef.current);
			let direction = "next";
			switch (event.key) {
				case previousItemKey:
					direction = "previous";
					event.preventDefault();
					if (isFocusOnContainer) currentIndex = snapshot.length;
					break;
				case nextItemKey:
					event.preventDefault();
					if (isFocusOnContainer) currentIndex = -1;
					break;
				case "Home":
					event.preventDefault();
					currentIndex = -1;
					break;
				case "End":
					event.preventDefault();
					direction = "previous";
					currentIndex = snapshot.length;
					break;
				default: return;
			}
			focusItem(currentIndex, direction, wrap);
		};
		return {
			onFocus,
			onKeyDown,
			ref: handleRefs(ref, (elementNode) => {
				containerRef.current = elementNode;
			})
		};
	}, [
		focusItem,
		isRtl,
		orientation,
		wrap
	]);
	const focusNext = import_react.useCallback((isItemFocusableOverride) => {
		const snapshot = getNavigableItemsSnapshot(itemMapRef.current);
		const currentFocus = activeElement(ownerDocument(containerRef.current));
		return focusItem(currentFocus === containerRef.current ? -1 : getCurrentActiveItemIndex(snapshot, currentFocus, activeItemIdRef.current), "next", true, isItemFocusableOverride)?.id ?? null;
	}, [focusItem]);
	return import_react.useMemo(() => ({
		activeItemId: resolvedActiveItemId,
		focusNext,
		getActiveItem,
		getContainerProps,
		getItemMap,
		isItemActive,
		registerItem,
		setActiveItemId,
		unregisterItem
	}), [
		resolvedActiveItemId,
		focusNext,
		getActiveItem,
		getContainerProps,
		getItemMap,
		isItemActive,
		registerItem,
		setActiveItemId,
		unregisterItem
	]);
}
function useRovingTabIndexItem(params) {
	const { activeItemId, registerItem, unregisterItem } = useRovingTabIndexContext();
	const elementRef = import_react.useRef(null);
	const item = import_react.useMemo(() => ({
		disabled: params.disabled ?? false,
		element: null,
		focusableWhenDisabled: params.focusableWhenDisabled ?? false,
		id: params.id,
		selected: params.selected ?? false,
		textValue: params.textValue
	}), [
		params.disabled,
		params.focusableWhenDisabled,
		params.id,
		params.selected,
		params.textValue
	]);
	const latestItemRef = import_react.useRef(item);
	latestItemRef.current = item;
	const handleElementRef = import_react.useCallback((element) => {
		elementRef.current = element;
		if (element == null) {
			queueMicrotask(() => {
				if (elementRef.current == null) unregisterItem(params.id);
			});
			return;
		}
		registerItem({
			...latestItemRef.current,
			element
		});
	}, [
		params.id,
		registerItem,
		unregisterItem
	]);
	const mergedRef = useForkRef(params.ref, handleElementRef);
	useEnhancedEffect(() => {
		if (!elementRef.current) return;
		registerItem({
			...item,
			element: elementRef.current
		});
	}, [item, registerItem]);
	useEnhancedEffect(() => {
		const itemId = params.id;
		return () => {
			unregisterItem(itemId);
		};
	}, [params.id, unregisterItem]);
	return {
		ref: mergedRef,
		tabIndex: activeItemId === params.id ? 0 : -1
	};
}
/**
* Resolves which item id should own the roving tab stop for the current render.
*
* This is the top-level decision point for "who gets `tabIndex=0` right now?".
* For example:
* - `Tabs` sometimes passes `selectedValue` as `activeItemId` so the selected tab becomes
*   the tab stop when focus enters the list from outside.
* - `MenuList` leaves `activeItemId` undefined and relies on the default-item logic below
*   so that menu-specific rules decide which menu item should initially own the tab stop.
*
* @param activeItemId The item id supplied through the root hook's `activeItemId` option.
*   `undefined` means "the caller did not ask for a specific item, use the default-item
*   logic instead". `null` means "there is intentionally no preferred item, so also fall
*   back to the default-item logic".
* @param items The ordered registered items currently in the roving set.
* @param isFocusable A predicate that decides whether an item may receive roving focus.
* @param getDefaultActiveItemId Optional caller-provided function that picks the preferred
*   default item when `activeItemId` is not driving the tab stop directly.
* @returns The id of the item that should own `tabIndex=0`, or `null` if no item is focusable.
*/
function resolveActiveItemId(activeItemId, items, isFocusable, getDefaultActiveItemId) {
	if (activeItemId != null) return resolveRequestedItemId(activeItemId, items, isFocusable);
	return resolveDefaultItemId(items, isFocusable, getDefaultActiveItemId);
}
/**
* Resolves the item id supplied through the root hook's `activeItemId` option.
*
* This path is used when a component such as `Tabs` or `MenuList` wants roving focus to
* follow a specific logical item. For example, `Tabs` can pass the selected tab's value as
* `activeItemId` so that the selected tab owns `tabIndex=0` when focus enters the list.
*
* @param requestedItemId The item id passed to the root hook's `activeItemId` option.
* @param items The ordered registered items currently in the roving set.
* @param isFocusable A predicate that decides whether an item may receive roving focus.
* @returns The same id when it still points to a focusable item. If that id no longer exists,
*   returns the first focusable item. If the id still exists but the item is not focusable,
*   returns the next focusable item after it without wrapping.
*/
function resolveRequestedItemId(requestedItemId, items, isFocusable) {
	const requestedItemIndex = findItemIndexById(items, requestedItemId);
	if (requestedItemIndex === -1) return getFirstFocusableItemId(items, isFocusable);
	if (isFocusable(items[requestedItemIndex])) return items[requestedItemIndex].id;
	return getNextActiveItem(items, requestedItemIndex, "next", false, isFocusable)?.id ?? null;
}
/**
* Resolves the default active item when the caller is not driving roving focus with
* `activeItemId`.
*
* This path is used on the initial render and whenever the caller leaves the choice of tab
* stop to the hook. `getDefaultActiveItemId` lets a component prefer a specific logical item
* before falling back to the first focusable item.
*
* For example:
* - `MenuList` uses this path all the time. When `variant="selectedMenu"`, it prefers the
*   selected menu item; otherwise it prefers the first focusable menu item.
* - `Tabs` uses this path while focus is already inside the tab list, because at that point
*   the current roving position should be driven by actual focus movement rather than by the
*   selected tab value.
*
* @param items The ordered registered items currently in the roving set.
* @param isFocusable A predicate that decides whether an item may receive roving focus.
* @param getDefaultActiveItemId Optional caller-provided function that chooses which item
*   should own the tab stop before the generic "first focusable item" fallback runs.
* @returns The default item id when it points to a focusable item, otherwise the first
*   focusable item in the snapshot, or `null` when none are focusable.
*/
function resolveDefaultItemId(items, isFocusable, getDefaultActiveItemId) {
	const defaultItemId = getDefaultActiveItemId?.(items);
	if (defaultItemId != null) {
		const defaultItem = getItemById(items, defaultItemId);
		if (defaultItem && isFocusable(defaultItem)) return defaultItem.id;
	}
	return getFirstFocusableItemId(items, isFocusable);
}
/**
* Finds the best starting index for keyboard navigation.
*
* This is used immediately before keyboard navigation and `focusNext()` navigation. It prefers
* the item that currently holds DOM focus, but if focus is on the container or outside the item
* set it falls back to the last known active item id.
*
* @param items The navigable item snapshot used for the current keyboard interaction.
* @param currentFocus The element that currently has DOM focus, if any.
* @param fallbackActiveItemId The last known active item id when focus is not on an item.
* @returns The focused item's index when focus is currently on an item. Otherwise, the index
*   of the fallback active item id, or `-1` when no matching item exists.
*/
function getCurrentActiveItemIndex(items, currentFocus, fallbackActiveItemId) {
	if (currentFocus) {
		const focusedIndex = findItemIndexByElement(items, currentFocus);
		if (focusedIndex !== -1) return focusedIndex;
	}
	return findItemIndexById(items, fallbackActiveItemId);
}
/**
* Walks the item snapshot to find the next focusable item in the requested direction.
*
* This is the shared navigation primitive used by keyboard handling and imperative helpers
* such as `focusNext()`. It starts from the supplied index, advances through the snapshot in
* the requested direction, and skips over items that fail the `isFocusable` predicate.
*
* @param items The ordered navigable item snapshot.
* @param currentIndex The index to start from. Use `-1` to start before the first item or
*   `items.length` to start after the last item.
* @param direction The direction to move through the snapshot.
* @param wrap Whether navigation should wrap around at the ends of the list.
* @param isFocusable A predicate that decides whether an item may receive roving focus.
* @returns The next focusable item record, or `null` when no focusable item can be reached.
*/
function getNextActiveItem(items, currentIndex, direction, wrap, isFocusable) {
	const lastIndex = items.length - 1;
	if (lastIndex === -1) return null;
	let wrappedOnce = false;
	let nextIndex = getNextIndex(currentIndex, lastIndex, direction, wrap);
	const startIndex = nextIndex;
	while (nextIndex !== -1) {
		if (nextIndex === startIndex) {
			if (wrappedOnce) return null;
			wrappedOnce = true;
		}
		const nextItem = items[nextIndex];
		if (!nextItem || !isFocusable(nextItem)) nextIndex = getNextIndex(nextIndex, lastIndex, direction, wrap);
		else return nextItem;
	}
	return null;
}
function getFirstFocusableItemId(items, isFocusable) {
	return items.find((item) => isFocusable(item))?.id ?? null;
}
function getItemById(items, itemId) {
	return itemId == null ? null : items.find((item) => item.id === itemId) ?? null;
}
function findItemIndexById(items, itemId) {
	return itemId == null ? -1 : items.findIndex((item) => item.id === itemId);
}
function findItemIndexByElement(items, element) {
	if (!element) return -1;
	return items.findIndex((item) => item.element === element || item.element?.contains(element));
}
function getOrderedItems(itemMap) {
	const items = Array.from(itemMap.values());
	if (items.every((item) => item.element == null)) return items;
	const connectedItems = items.filter(isConnectedItem).sort((itemA, itemB) => sortByDocumentPosition(itemA.element, itemB.element));
	const disconnectedItems = items.filter((item) => !isConnectedItem(item));
	return [...connectedItems, ...disconnectedItems];
}
function getNavigableItemsSnapshot(itemMap) {
	return getOrderedItems(itemMap).filter(isConnectedItem);
}
function getNextIndex(currentIndex, lastIndex, direction, wrap = true) {
	if (direction === "next") {
		if (currentIndex === lastIndex) return wrap ? 0 : -1;
		return currentIndex + 1;
	}
	if (currentIndex === 0) return wrap ? lastIndex : -1;
	return currentIndex - 1;
}
function isItemFocusable(item) {
	if (!item.element) return false;
	if (item.focusableWhenDisabled) return true;
	return !item.disabled && !item.element.hasAttribute("disabled") && item.element.getAttribute("aria-disabled") !== "true" && item.element.hasAttribute("tabindex");
}
function isConnectedItem(item) {
	return item.element != null && item.element.isConnected;
}
function sortByDocumentPosition(a, b) {
	if (a === b) return 0;
	const position = a.compareDocumentPosition(b);
	if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) return -1;
	if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) return 1;
	return 0;
}
function handleRefs(...refs) {
	return (node) => {
		refs.forEach((ref) => {
			setRef(ref ?? null, node);
		});
	};
}
//#endregion
//#region node_modules/@mui/material/Divider/dividerClasses.mjs
function getDividerUtilityClass(slot) {
	return generateUtilityClass("MuiDivider", slot);
}
var dividerClasses = generateUtilityClasses("MuiDivider", [
	"root",
	"absolute",
	"fullWidth",
	"inset",
	"middle",
	"flexItem",
	"vertical",
	"withChildren",
	"textAlignRight",
	"textAlignLeft",
	"wrapper",
	"wrapperVertical"
]);
//#endregion
//#region node_modules/@mui/material/ListItemIcon/listItemIconClasses.mjs
var listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
//#endregion
//#region node_modules/@mui/material/ListItemText/listItemTextClasses.mjs
var listItemTextClasses = generateUtilityClasses("MuiListItemText", [
	"root",
	"multiline",
	"dense",
	"inset",
	"primary",
	"secondary"
]);
//#endregion
//#region node_modules/@mui/material/MenuList/MenuListContext.mjs
/**
* @ignore - internal component.
*/
var MenuListContext = /*#__PURE__*/ import_react.createContext(void 0);
MenuListContext.displayName = "MenuListContext";
function useMenuListContext() {
	const context = import_react.useContext(MenuListContext);
	if (context === void 0) throw new Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");
	return context;
}
//#endregion
//#region node_modules/@mui/material/Select/utils/SelectFocusSourceContext.mjs
var SelectFocusSourceContext = /*#__PURE__*/ import_react.createContext(null);
SelectFocusSourceContext.displayName = "SelectFocusSourceContext";
function useSelectFocusSource() {
	return import_react.useContext(SelectFocusSourceContext);
}
SelectFocusSourceContext.Provider;
//#endregion
//#region node_modules/@mui/material/MenuItem/MenuItem.mjs
var overridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters
	];
};
var useUtilityClasses$3 = (ownerState) => {
	const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		dense && "dense",
		disabled && "disabled",
		!disableGutters && "gutters",
		divider && "divider",
		selected && "selected"
	] }, getMenuItemUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var MenuItemRoot = styled(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiMenuItem",
	slot: "Root",
	overridesResolver
})(memoTheme(({ theme }) => ({
	...theme.typography.body1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	minHeight: 48,
	paddingTop: 6,
	paddingBottom: 6,
	boxSizing: "border-box",
	whiteSpace: "nowrap",
	"&:hover": {
		textDecoration: "none",
		backgroundColor: (theme.vars || theme).palette.action.hover,
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	[`&.${menuItemClasses.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) }
	},
	[`&.${menuItemClasses.selected}:hover`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
		"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity) }
	},
	[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
	[`&.${menuItemClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity },
	[`& + .${dividerClasses.root}`]: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	[`& + .${dividerClasses.inset}`]: { marginLeft: 52 },
	[`& .${listItemTextClasses.root}`]: {
		marginTop: 0,
		marginBottom: 0
	},
	[`& .${listItemTextClasses.inset}`]: { paddingLeft: 36 },
	[`& .${listItemIconClasses.root}`]: { minWidth: 36 },
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.dense,
			style: { [theme.breakpoints.up("sm")]: { minHeight: "auto" } }
		},
		{
			props: ({ ownerState }) => ownerState.dense,
			style: {
				minHeight: 32,
				paddingTop: 4,
				paddingBottom: 4,
				...theme.typography.body2,
				[`& .${listItemIconClasses.root} svg`]: { fontSize: "1.25rem" }
			}
		}
	]
})));
var MenuItem = /*#__PURE__*/ import_react.forwardRef(function MenuItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenuItem"
	});
	const { autoFocus: shouldAutoFocusOnMount = false, component = "li", dense = false, divider = false, disableGutters = false, focusVisibleClassName, role = "menuitem", tabIndex: tabIndexProp, className, ...other } = props;
	const focusSource = useSelectFocusSource();
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		disableGutters
	}), [
		context.dense,
		dense,
		disableGutters
	]);
	const menuListContext = useMenuListContext();
	const rovingItemId = useId_default();
	const suppressFocusVisible = menuListContext.suppressInitialFocusVisible;
	const itemsFocusableWhenDisabled = menuListContext.itemsFocusableWhenDisabled;
	const menuItemRef = import_react.useRef(null);
	useEnhancedEffect_default(() => {
		if (shouldAutoFocusOnMount) if (menuItemRef.current) focusWithVisible(menuItemRef.current, focusSource);
		else console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered.");
	}, [shouldAutoFocusOnMount]);
	const ownerState = {
		...props,
		dense: childContext.dense,
		divider,
		disableGutters
	};
	const classes = useUtilityClasses$3(props);
	const { root, ...forwardedClasses } = classes;
	const rovingItemProps = useRovingTabIndexItem({
		id: rovingItemId,
		ref,
		disabled: props.disabled,
		focusableWhenDisabled: itemsFocusableWhenDisabled,
		selected: props.selected
	});
	const handleRef = useForkRef_default(menuItemRef, rovingItemProps.ref);
	let tabIndex;
	if (tabIndexProp !== void 0) tabIndex = tabIndexProp;
	else if (menuListContext.variant === "selectedMenu") tabIndex = rovingItemProps.tabIndex;
	else if (!props.disabled || itemsFocusableWhenDisabled) tabIndex = -1;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MenuItemRoot, {
			ref: handleRef,
			role,
			tabIndex,
			component,
			internalNativeButton: false,
			focusableWhenDisabled: itemsFocusableWhenDisabled,
			suppressFocusVisible,
			focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
			className: clsx(classes.root, className),
			...other,
			ownerState,
			classes: forwardedClasses
		})
	});
});
MenuItem.propTypes = {
	/**
	* If `true`, the list item is focused during the first mount.
	* Focus will also be triggered if the value changes from false to true.
	* @default false
	*/
	autoFocus: import_prop_types.default.bool,
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
	* If `true`, compact vertical padding designed for keyboard and mouse input is used.
	* The prop defaults to the value inherited from the parent Menu component.
	* @default false
	*/
	dense: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the left and right padding is removed.
	* @default false
	*/
	disableGutters: import_prop_types.default.bool,
	/**
	* If `true`, a 1px light border is added to the bottom of the menu item.
	* @default false
	*/
	divider: import_prop_types.default.bool,
	/**
	* This prop can help identify which element has keyboard focus.
	* The class name will be applied when the element gains the focus through keyboard interaction.
	* It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
	* The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
	* A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
	* if needed.
	*/
	focusVisibleClassName: import_prop_types.default.string,
	/**
	* @ignore
	*/
	role: import_prop_types.default.string,
	/**
	* If `true`, the component is selected.
	* @default false
	*/
	selected: import_prop_types.default.bool,
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
	* @default 0
	*/
	tabIndex: import_prop_types.default.number
};
//#endregion
//#region node_modules/@mui/material/utils/getScrollbarSize.mjs
var getScrollbarSize_default = getScrollbarSize;
//#endregion
//#region node_modules/@mui/material/MenuList/MenuList.mjs
function getItemText(itemOrElement) {
	const element = itemOrElement?.element ?? itemOrElement;
	if (!element) return "";
	if (itemOrElement?.textValue !== void 0) return itemOrElement.textValue;
	let text = element.innerText;
	if (text === void 0) text = element.textContent;
	return text ?? "";
}
function textCriteriaMatches(itemOrElement, textCriteria) {
	if (textCriteria === void 0) return true;
	let text = getItemText(itemOrElement);
	text = text.trim().toLowerCase();
	if (text.length === 0) return false;
	if (textCriteria.repeating) return text[0] === textCriteria.keys[0];
	return text.startsWith(textCriteria.keys.join(""));
}
function isItemFocusableWithTextCriteria(item, criteria) {
	if (!textCriteriaMatches(item, criteria)) return false;
	return isItemFocusable(item);
}
function focusInitialItem(element, focusSource) {
	focusWithVisible(element, focusSource);
}
/**
* A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
* It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
* use it separately you need to move focus into the component manually. Once
* the focus is placed inside the component it is fully keyboard accessible.
*/
var MenuList = /*#__PURE__*/ import_react.forwardRef(function MenuList(props, ref) {
	const { actions, autoFocus: autoFocusList = false, autoFocusItem: autoFocusActiveItem = false, children, className, disabledItemsFocusable = false, disableListWrap = false, onKeyDown, variant = "selectedMenu", ...other } = props;
	const listRef = import_react.useRef(null);
	const hasFocusedInitialTargetRef = import_react.useRef(false);
	const [suppressInitialFocusVisible, setSuppressInitialFocusVisible] = import_react.useState(false);
	const focusSource = useSelectFocusSource();
	const textCriteriaRef = import_react.useRef({
		keys: [],
		repeating: true,
		previousKeyMatched: true,
		lastTime: null
	});
	const rovingContainer = useRovingTabIndexRoot({
		activeItemId: void 0,
		getDefaultActiveItemId: import_react.useCallback((items) => {
			if (variant === "selectedMenu") return items.find((item) => item.selected && isItemFocusable(item))?.id ?? items.find((item) => isItemFocusable(item))?.id ?? null;
			return items.find((item) => isItemFocusable(item))?.id ?? null;
		}, [variant]),
		orientation: "vertical",
		wrap: !disableListWrap
	});
	const { activeItemId, focusNext, getActiveItem, getContainerProps, getItemMap } = rovingContainer;
	const focusInitialTarget = useEventCallback_default((force = false) => {
		if (!listRef.current || !force && hasFocusedInitialTargetRef.current) return null;
		if (autoFocusActiveItem) {
			const activeItem = getActiveItem();
			if (activeItem?.element) {
				const hasSelectedItem = Array.from(getItemMap().values()).some((item) => item.selected);
				setSuppressInitialFocusVisible(variant === "menu" && hasSelectedItem && !activeItem.selected && focusSource == null);
				focusInitialItem(activeItem.element, focusSource);
				hasFocusedInitialTargetRef.current = true;
				return activeItem.element;
			}
			if (!autoFocusList) return null;
			setSuppressInitialFocusVisible(false);
			listRef.current.focus();
			return listRef.current;
		}
		if (!autoFocusList) {
			setSuppressInitialFocusVisible(false);
			return null;
		}
		setSuppressInitialFocusVisible(false);
		listRef.current.focus();
		hasFocusedInitialTargetRef.current = true;
		return listRef.current;
	});
	useEnhancedEffect_default(() => {
		if (!autoFocusList && !autoFocusActiveItem) {
			hasFocusedInitialTargetRef.current = false;
			setSuppressInitialFocusVisible(false);
			return;
		}
		focusInitialTarget();
	}, [
		activeItemId,
		autoFocusActiveItem,
		autoFocusList,
		focusInitialTarget
	]);
	import_react.useImperativeHandle(actions, () => ({
		adjustStyleForScrollbar: (containerElement, { direction }) => {
			const noExplicitWidth = !listRef.current.style.width;
			if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
				const scrollbarSize = `${getScrollbarSize_default(ownerWindow_default(containerElement))}px`;
				listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
				listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
			}
			return listRef.current;
		},
		focusInitialTarget: () => {
			if (!listRef.current) return null;
			const currentFocus = getActiveElement_default(ownerDocument_default(listRef.current));
			if (currentFocus && contains_default(listRef.current, currentFocus)) return currentFocus;
			return focusInitialTarget(true);
		}
	}), [focusInitialTarget]);
	const rovingContainerProps = getContainerProps();
	const handleRef = useForkRef_default(listRef, rovingContainerProps.ref, ref);
	const menuListContextValue = import_react.useMemo(() => ({
		itemsFocusableWhenDisabled: disabledItemsFocusable,
		suppressInitialFocusVisible,
		variant
	}), [
		disabledItemsFocusable,
		suppressInitialFocusVisible,
		variant
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(List, {
		role: "menu",
		ref: handleRef,
		className,
		onKeyDown: useEventCallback_default((event) => {
			if (suppressInitialFocusVisible) setSuppressInitialFocusVisible(false);
			if ((event.ctrlKey || event.metaKey || event.altKey) && onKeyDown) {
				onKeyDown(event);
				return;
			}
			rovingContainerProps.onKeyDown(event);
			if (event.key.length === 1) {
				const criteria = textCriteriaRef.current;
				const lowerKey = event.key.toLowerCase();
				const currTime = performance.now();
				if (criteria.keys.length > 0) {
					if (currTime - criteria.lastTime > 500) {
						criteria.keys = [];
						criteria.repeating = true;
						criteria.previousKeyMatched = true;
					} else if (criteria.repeating && lowerKey !== criteria.keys[0]) criteria.repeating = false;
				}
				criteria.lastTime = currTime;
				criteria.keys.push(lowerKey);
				const currentFocus = getActiveElement_default(ownerDocument_default(listRef.current));
				const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
				if (criteria.previousKeyMatched && (keepFocusOnCurrent || focusNext((item) => isItemFocusableWithTextCriteria(item, criteria)) != null)) event.preventDefault();
				else criteria.previousKeyMatched = false;
			}
			if (onKeyDown) onKeyDown(event);
		}),
		onFocus: rovingContainerProps.onFocus,
		tabIndex: -1,
		...other,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MenuListContext.Provider, {
			value: menuListContextValue,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RovingTabIndexContext.Provider, {
				value: rovingContainer,
				children
			})
		})
	});
});
MenuList.propTypes = {
	/**
	* If `true`, will focus the `[role="menu"]` container and move into tab order.
	* @default false
	*/
	autoFocus: import_prop_types.default.bool,
	/**
	* If `true`, will focus the first menuitem if `variant="menu"` or selected item
	* if `variant="selectedMenu"`.
	* @default false
	*/
	autoFocusItem: import_prop_types.default.bool,
	/**
	* MenuList contents, normally `MenuItem`s.
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* If `true`, will allow focus on disabled items.
	* @default false
	*/
	disabledItemsFocusable: import_prop_types.default.bool,
	/**
	* If `true`, the menu items will not wrap focus.
	* @default false
	*/
	disableListWrap: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onKeyDown: import_prop_types.default.func,
	/**
	* The variant to use. Use `menu` to prevent selected items from impacting the initial focus
	* and the vertical alignment relative to the anchor element.
	* @default 'selectedMenu'
	*/
	variant: import_prop_types.default.oneOf(["menu", "selectedMenu"])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DigitalClock/digitalClockClasses.mjs
function getDigitalClockUtilityClass(slot) {
	return generateUtilityClass("MuiDigitalClock", slot);
}
var digitalClockClasses = generateUtilityClasses("MuiDigitalClock", [
	"root",
	"list",
	"item"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DigitalClock/DigitalClock.mjs
var _excluded$3 = [
	"ampm",
	"timeStep",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"onChange",
	"view",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"views",
	"skipDisabled",
	"timezone"
];
var useUtilityClasses$2 = (classes) => {
	return composeClasses({
		root: ["root"],
		list: ["list"],
		item: ["item"]
	}, getDigitalClockUtilityClass, classes);
};
var DigitalClockRoot = styled(PickerViewRoot, {
	name: "MuiDigitalClock",
	slot: "Root"
})({
	overflowY: "auto",
	width: "100%",
	scrollbarWidth: "thin",
	"@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "auto" },
	maxHeight: 232,
	variants: [{
		props: { hasDigitalClockAlreadyBeenRendered: true },
		style: { "@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "smooth" } }
	}]
});
var DigitalClockList = styled(MenuList, {
	name: "MuiDigitalClock",
	slot: "List"
})({ padding: 0 });
var DigitalClockItem = styled(MenuItem, {
	name: "MuiDigitalClock",
	slot: "Item",
	shouldForwardProp: (prop) => prop !== "itemValue" && prop !== "formattedValue"
})(({ theme }) => ({
	padding: "8px 16px",
	margin: "2px 4px",
	"&:first-of-type": { marginTop: 4 },
	"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.hoverOpacity) },
	"&.Mui-selected": {
		backgroundColor: (theme.vars || theme).palette.primary.main,
		color: (theme.vars || theme).palette.primary.contrastText,
		"&:focus-visible, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	},
	"&.Mui-focusVisible": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.focusOpacity) }
}));
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [DigitalClock](https://mui.com/x/react-date-pickers/digital-clock/)
*
* API:
*
* - [DigitalClock API](https://mui.com/x/api/date-pickers/digital-clock/)
*/
var DigitalClock = /*#__PURE__*/ import_react.forwardRef(function DigitalClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const containerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, containerRef);
	const listRef = import_react.useRef(null);
	const lastActiveRef = import_react.useRef(null);
	const props = useThemeProps({
		props: inProps,
		name: "MuiDigitalClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), timeStep = 30, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, onChange, view: inView, openTo, onViewChange, focusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, views = ["hours"], skipDisabled = false, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	const { value, handleValueChange: handleRawValueChange, timezone } = useControlledValue({
		name: "DigitalClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { hasDigitalClockAlreadyBeenRendered: !!containerRef.current });
	const classes = useUtilityClasses$2(classesProp);
	const ClockItem = slots?.digitalClockItem ?? DigitalClockItem;
	const clockItemProps = useSlotProps({
		elementType: ClockItem,
		externalSlotProps: slotProps?.digitalClockItem,
		ownerState,
		className: classes.item
	});
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const { setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: useEventCallback((newValue) => handleRawValueChange(newValue, "finish", "hours")),
		focusedView,
		onFocusedViewChange
	});
	const handleItemSelect = useEventCallback((newValue) => {
		setValueAndGoToNextView(newValue, "finish");
	});
	useEnhancedEffect(() => {
		if (containerRef.current === null) return;
		const activeItem = containerRef.current.querySelector("[role=\"listbox\"] [role=\"option\"][tabindex=\"0\"], [role=\"listbox\"] [role=\"option\"][aria-selected=\"true\"]");
		if (!activeItem) return;
		const offsetTop = activeItem.offsetTop;
		if ((autoFocus || !!focusedView) && activeItem !== lastActiveRef.current) {
			lastActiveRef.current = activeItem;
			activeItem.focus();
		}
		containerRef.current.scrollTop = offsetTop - 4;
	});
	const isTimeDisabled = import_react.useCallback((valueToCheck) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const containsValidTime = () => {
			if (minTime && isAfter(minTime, valueToCheck)) return false;
			if (maxTime && isAfter(valueToCheck, maxTime)) return false;
			if (disableFuture && isAfter(valueToCheck, now)) return false;
			if (disablePast && isAfter(now, valueToCheck)) return false;
			return true;
		};
		const isValidValue = () => {
			if (adapter.getMinutes(valueToCheck) % minutesStep !== 0) return false;
			if (shouldDisableTime) return !shouldDisableTime(valueToCheck, "hours");
			return true;
		};
		return !containsValidTime() || !isValidValue();
	}, [
		disableIgnoringDatePartForTimeValidation,
		adapter,
		minTime,
		maxTime,
		disableFuture,
		now,
		disablePast,
		minutesStep,
		shouldDisableTime
	]);
	const timeOptions = import_react.useMemo(() => {
		const result = [];
		let nextTimeStepOption = adapter.startOfDay(valueOrReferenceDate);
		while (adapter.isSameDay(valueOrReferenceDate, nextTimeStepOption)) {
			result.push(nextTimeStepOption);
			nextTimeStepOption = adapter.addMinutes(nextTimeStepOption, timeStep);
		}
		return result;
	}, [
		valueOrReferenceDate,
		timeStep,
		adapter
	]);
	const focusedOptionIndex = timeOptions.findIndex((option) => adapter.isEqual(option, valueOrReferenceDate));
	const handleKeyDown = (event) => {
		switch (event.key) {
			case "PageUp": {
				const newIndex = getFocusedListItemIndex(listRef.current) - 5;
				const childToFocus = listRef.current.children[Math.max(0, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			case "PageDown": {
				const newIndex = getFocusedListItemIndex(listRef.current) + 5;
				const children = listRef.current.children;
				const childToFocus = children[Math.min(children.length - 1, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			default:
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DigitalClockRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DigitalClockList, {
		ref: listRef,
		role: "listbox",
		"aria-label": translations.timePickerToolbarTitle,
		className: classes.list,
		onKeyDown: handleKeyDown,
		children: timeOptions.map((option, index) => {
			const optionDisabled = isTimeDisabled(option);
			if (skipDisabled && optionDisabled) return null;
			const isSelected = adapter.isEqual(option, value);
			const formattedValue = adapter.format(option, ampm ? "fullTime12h" : "fullTime24h");
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClockItem, _extends({
				onClick: () => !readOnly && handleItemSelect(option),
				selected: isSelected,
				disabled: disabled || optionDisabled,
				disableRipple: readOnly,
				role: "option",
				"aria-disabled": readOnly,
				"aria-selected": isSelected,
				tabIndex: focusedOptionIndex === index || focusedOptionIndex === -1 && index === 0 ? 0 : -1,
				itemValue: option,
				formattedValue
			}, clockItemProps, { children: formattedValue }), `${option.valueOf()}-${formattedValue}`);
		})
	}) }));
});
DigitalClock.displayName = "DigitalClock";
DigitalClock.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* The default selected value.
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
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* Controlled focused view.
	*/
	focusedView: import_prop_types.default.oneOf(["hours"]),
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
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TView The view type. Will be one of date or time views.
	* @param {TValue} value The new value.
	* @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
	* @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired on focused view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view to focus or not.
	* @param {boolean} hasFocus `true` if the view should be focused.
	*/
	onFocusedViewChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
	/**
	* The default visible view.
	* Used when the component view is not controlled.
	* Must be a valid option from `views` list.
	*/
	openTo: import_prop_types.default.oneOf(["hours"]),
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid time using the validation props, except callbacks such as `shouldDisableTime`.
	*/
	referenceDate: import_prop_types.default.object,
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
	* Overrideable component slots.
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
	* The time steps between two time options.
	* For example, if `timeStep = 45`, then the available time options will be `[00:00, 00:45, 01:30, 02:15, 03:00, etc.]`.
	* @default 30
	*/
	timeStep: import_prop_types.default.number,
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
	view: import_prop_types.default.oneOf(["hours"]),
	/**
	* Available views.
	* @default ['hours']
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["hours"]))
};
//#endregion
//#region node_modules/@mui/x-date-pickers/MultiSectionDigitalClock/multiSectionDigitalClockClasses.mjs
function getMultiSectionDigitalClockUtilityClass(slot) {
	return generateUtilityClass("MuiMultiSectionDigitalClock", slot);
}
var multiSectionDigitalClockClasses = generateUtilityClasses("MuiMultiSectionDigitalClock", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/MultiSectionDigitalClock/multiSectionDigitalClockSectionClasses.mjs
function getMultiSectionDigitalClockSectionUtilityClass(slot) {
	return generateUtilityClass("MuiMultiSectionDigitalClockSection", slot);
}
var multiSectionDigitalClockSectionClasses = generateUtilityClasses("MuiMultiSectionDigitalClockSection", ["root", "item"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/MultiSectionDigitalClock/MultiSectionDigitalClockSection.mjs
var _excluded$2 = [
	"autoFocus",
	"onChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"items",
	"active",
	"slots",
	"slotProps",
	"skipDisabled"
];
var useUtilityClasses$1 = (classes) => {
	return composeClasses({
		root: ["root"],
		item: ["item"]
	}, getMultiSectionDigitalClockSectionUtilityClass, classes);
};
var MultiSectionDigitalClockSectionRoot = styled(MenuList, {
	name: "MuiMultiSectionDigitalClockSection",
	slot: "Root"
})(({ theme }) => ({
	maxHeight: 232,
	width: 56,
	padding: 0,
	overflow: "hidden",
	scrollbarWidth: "thin",
	"@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "auto" },
	"@media (pointer: fine)": { "&:hover": { overflowY: "auto" } },
	"@media (pointer: none), (pointer: coarse)": { overflowY: "auto" },
	"&:not(:first-of-type)": { borderLeft: `1px solid ${(theme.vars || theme).palette.divider}` },
	variants: [{
		props: { hasDigitalClockAlreadyBeenRendered: true },
		style: { "@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "smooth" } }
	}]
}));
var MultiSectionDigitalClockSectionItem = styled(MenuItem, {
	name: "MuiMultiSectionDigitalClockSection",
	slot: "Item"
})(({ theme }) => ({
	padding: 8,
	margin: "2px 4px",
	width: 48,
	justifyContent: "center",
	"&:first-of-type": { marginTop: 4 },
	"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.hoverOpacity) },
	"&.Mui-selected": {
		backgroundColor: (theme.vars || theme).palette.primary.main,
		color: (theme.vars || theme).palette.primary.contrastText,
		"&:focus-visible, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	},
	"&.Mui-focusVisible": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.focusOpacity) }
}));
/**
* @ignore - internal component.
*/
var MultiSectionDigitalClockSection = /*#__PURE__*/ import_react.forwardRef(function MultiSectionDigitalClockSection(inProps, ref) {
	const containerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, containerRef);
	const previousActive = import_react.useRef(null);
	const shouldRefocusOnNextRender = import_react.useRef(false);
	const props = useThemeProps({
		props: inProps,
		name: "MuiMultiSectionDigitalClockSection"
	});
	const { autoFocus, onChange, className, classes: classesProp, disabled, readOnly, items, active, slots, slotProps, skipDisabled } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { hasDigitalClockAlreadyBeenRendered: !!containerRef.current });
	const classes = useUtilityClasses$1(classesProp);
	const DigitalClockSectionItem = slots?.digitalClockSectionItem ?? MultiSectionDigitalClockSectionItem;
	useEnhancedEffect(() => {
		if (containerRef.current === null) return;
		const activeItem = containerRef.current.querySelector("[role=\"option\"][tabindex=\"0\"], [role=\"option\"][aria-selected=\"true\"]");
		if (!activeItem) return;
		const activeElement = document.activeElement;
		const isSameItemAsPrevious = previousActive.current === activeItem;
		const isFocusInsideSection = !!activeElement && containerRef.current.contains(activeElement);
		const shouldRefocusSameItem = isSameItemAsPrevious && shouldRefocusOnNextRender.current;
		if (active && autoFocus && (!isSameItemAsPrevious || shouldRefocusSameItem) && (previousActive.current == null || shouldRefocusOnNextRender.current || isFocusInsideSection)) {
			previousActive.current = activeItem;
			shouldRefocusOnNextRender.current = false;
			activeItem.focus();
		}
		if (isSameItemAsPrevious) return;
		const offsetTop = activeItem.offsetTop;
		const itemHeight = activeItem.offsetHeight;
		const containerHeight = containerRef.current.clientHeight;
		const scrollableHeight = containerRef.current.scrollHeight;
		const centeredPosition = offsetTop - containerHeight / 2 + itemHeight / 2;
		const maxScrollTop = scrollableHeight - containerHeight;
		const scrollPosition = Math.min(centeredPosition, maxScrollTop);
		containerRef.current.scrollTop = Math.max(0, scrollPosition);
	});
	const handleBlur = useEventCallback((event) => {
		const relatedTarget = event.relatedTarget;
		const blurParent = relatedTarget?.parentElement;
		const relatedTargetRole = relatedTarget?.getAttribute("role");
		shouldRefocusOnNextRender.current = blurParent?.nodeName === "UL" && blurParent !== containerRef.current || relatedTargetRole === "gridcell";
		if (previousActive.current && blurParent?.nodeName === "UL" && blurParent !== containerRef.current) previousActive.current = null;
	});
	import_react.useEffect(() => {
		if (!active) previousActive.current = null;
	}, [active]);
	const focusedOptionIndex = items.findIndex((item) => item.isFocused(item.value));
	const handleKeyDown = useEventCallback((event) => {
		switch (event.key) {
			case "Tab":
				shouldRefocusOnNextRender.current = true;
				break;
			case "PageUp": {
				const newIndex = getFocusedListItemIndex(containerRef.current) - 5;
				const childToFocus = containerRef.current.children[Math.max(0, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			case "PageDown": {
				const newIndex = getFocusedListItemIndex(containerRef.current) + 5;
				const children = containerRef.current.children;
				const childToFocus = children[Math.min(children.length - 1, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			default: break;
		}
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockSectionRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState,
		role: "listbox",
		onKeyDown: handleKeyDown,
		onBlur: handleBlur
	}, other, { children: items.map((option, index) => {
		const isItemDisabled = option.isDisabled?.(option.value);
		const isDisabled = disabled || isItemDisabled;
		if (skipDisabled && isDisabled) return null;
		const isSelected = option.isSelected(option.value);
		const tabIndex = focusedOptionIndex === index || focusedOptionIndex === -1 && index === 0 ? 0 : -1;
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DigitalClockSectionItem, _extends({
			onClick: () => !readOnly && onChange(option.value),
			selected: isSelected,
			disabled: isDisabled,
			disableRipple: readOnly,
			role: "option",
			"aria-disabled": readOnly || isDisabled || void 0,
			"aria-label": option.ariaLabel,
			"aria-selected": isSelected,
			tabIndex,
			className: classes.item
		}, slotProps?.digitalClockSectionItem, { children: option.label }), option.label);
	}) }));
});
MultiSectionDigitalClockSection.displayName = "MultiSectionDigitalClockSection";
//#endregion
//#region node_modules/@mui/x-date-pickers/MultiSectionDigitalClock/MultiSectionDigitalClock.utils.mjs
var getHourSectionOptions = ({ now, value, adapter, ampm, isDisabled, resolveAriaLabel, timeStep, valueOrReferenceDate }) => {
	const currentHours = value ? adapter.getHours(value) : null;
	const result = [];
	const isSelected = (hour, overriddenCurrentHours) => {
		const resolvedCurrentHours = overriddenCurrentHours ?? currentHours;
		if (resolvedCurrentHours === null) return false;
		if (ampm) {
			if (hour === 12) return resolvedCurrentHours === 12 || resolvedCurrentHours === 0;
			return resolvedCurrentHours === hour || resolvedCurrentHours - 12 === hour;
		}
		return resolvedCurrentHours === hour;
	};
	const isFocused = (hour) => {
		return isSelected(hour, adapter.getHours(valueOrReferenceDate));
	};
	const labelReferenceDate = adapter.setDate(adapter.setMonth(adapter.startOfDay(now), 0), 15);
	const endHour = ampm ? 11 : 23;
	for (let hour = 0; hour <= endHour; hour += timeStep) {
		let label = adapter.format(adapter.setHours(labelReferenceDate, hour), ampm ? "hours12h" : "hours24h");
		const ariaLabel = resolveAriaLabel(parseInt(label, 10).toString());
		label = adapter.formatNumber(label);
		result.push({
			value: hour,
			label,
			isSelected,
			isDisabled,
			isFocused,
			ariaLabel
		});
	}
	return result;
};
var getTimeSectionOptions = ({ value, adapter, isDisabled, timeStep, resolveLabel, resolveAriaLabel, hasValue = true }) => {
	const isSelected = (timeValue) => {
		if (value === null) return false;
		return hasValue && value === timeValue;
	};
	const isFocused = (timeValue) => {
		return value === timeValue;
	};
	return [...Array.from({ length: Math.ceil(60 / timeStep) }, (_, index) => {
		const timeValue = timeStep * index;
		return {
			value: timeValue,
			label: adapter.formatNumber(resolveLabel(timeValue)),
			isDisabled,
			isSelected,
			isFocused,
			ariaLabel: resolveAriaLabel(timeValue.toString())
		};
	})];
};
//#endregion
//#region node_modules/@mui/x-date-pickers/MultiSectionDigitalClock/MultiSectionDigitalClock.mjs
var _excluded$1 = [
	"ampm",
	"timeSteps",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"onChange",
	"view",
	"views",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"skipDisabled",
	"timezone"
];
var useUtilityClasses = (classes) => {
	return composeClasses({ root: ["root"] }, getMultiSectionDigitalClockUtilityClass, classes);
};
var MultiSectionDigitalClockRoot = styled(PickerViewRoot, {
	name: "MuiMultiSectionDigitalClock",
	slot: "Root"
})(({ theme }) => ({
	flexDirection: "row",
	width: "100%",
	borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
}));
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [DigitalClock](https://mui.com/x/react-date-pickers/digital-clock/)
*
* API:
*
* - [MultiSectionDigitalClock API](https://mui.com/x/api/date-pickers/multi-section-digital-clock/)
*/
var MultiSectionDigitalClock = /*#__PURE__*/ import_react.forwardRef(function MultiSectionDigitalClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const isRtl = useRtl();
	const props = useThemeProps({
		props: inProps,
		name: "MuiMultiSectionDigitalClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), timeSteps: inTimeSteps, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, onChange, view: inView, views: inViews = ["hours", "minutes"], openTo, onViewChange, focusedView: inFocusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, skipDisabled = false, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const { value, handleValueChange: handleRawValueChange, timezone } = useControlledValue({
		name: "MultiSectionDigitalClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const timeSteps = import_react.useMemo(() => _extends({
		hours: 1,
		minutes: 5,
		seconds: 5
	}, inTimeSteps), [inTimeSteps]);
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const handleValueChange = useEventCallback((newValue, selectionState, selectedView) => handleRawValueChange(newValue, selectionState, selectedView));
	const views = import_react.useMemo(() => {
		if (!ampm || !inViews.includes("hours")) return inViews;
		return inViews.includes("meridiem") ? inViews : [...inViews, "meridiem"];
	}, [ampm, inViews]);
	const { view, setValueAndGoToNextView, focusedView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: handleValueChange,
		focusedView: inFocusedView,
		onFocusedViewChange
	});
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(valueOrReferenceDate, ampm, useEventCallback((newValue) => {
		setValueAndGoToNextView(newValue, "finish", "meridiem");
	}), "finish");
	const isTimeDisabled = import_react.useCallback((rawValue, viewType) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const shouldCheckPastEnd = viewType === "hours" || viewType === "minutes" && views.includes("seconds");
		const containsValidTime = ({ start, end }) => {
			if (minTime && isAfter(minTime, end)) return false;
			if (maxTime && isAfter(start, maxTime)) return false;
			if (disableFuture && isAfter(start, now)) return false;
			if (disablePast && isAfter(now, shouldCheckPastEnd ? end : start)) return false;
			return true;
		};
		const isValidValue = (timeValue, step = 1) => {
			if (timeValue % step !== 0) return false;
			if (shouldDisableTime) switch (viewType) {
				case "hours": return !shouldDisableTime(adapter.setHours(valueOrReferenceDate, timeValue), "hours");
				case "minutes": return !shouldDisableTime(adapter.setMinutes(valueOrReferenceDate, timeValue), "minutes");
				case "seconds": return !shouldDisableTime(adapter.setSeconds(valueOrReferenceDate, timeValue), "seconds");
				default: return false;
			}
			return true;
		};
		switch (viewType) {
			case "hours": {
				const valueWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
				const dateWithNewHours = adapter.setHours(valueOrReferenceDate, valueWithMeridiem);
				if (adapter.getHours(dateWithNewHours) !== valueWithMeridiem) return true;
				return !containsValidTime({
					start: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 0), 0),
					end: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 59), 59)
				}) || !isValidValue(valueWithMeridiem);
			}
			case "minutes": {
				const dateWithNewMinutes = adapter.setMinutes(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: adapter.setSeconds(dateWithNewMinutes, 0),
					end: adapter.setSeconds(dateWithNewMinutes, 59)
				}) || !isValidValue(rawValue, minutesStep);
			}
			case "seconds": {
				const dateWithNewSeconds = adapter.setSeconds(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: dateWithNewSeconds,
					end: dateWithNewSeconds
				}) || !isValidValue(rawValue);
			}
			default: throw new Error("not supported");
		}
	}, [
		ampm,
		valueOrReferenceDate,
		disableIgnoringDatePartForTimeValidation,
		maxTime,
		meridiemMode,
		minTime,
		minutesStep,
		shouldDisableTime,
		adapter,
		disableFuture,
		disablePast,
		now,
		views
	]);
	const buildViewProps = import_react.useCallback((viewToBuild) => {
		switch (viewToBuild) {
			case "hours": return {
				onChange: (hours) => {
					const valueWithMeridiem = convertValueToMeridiem(hours, meridiemMode, ampm);
					setValueAndGoToNextView(adapter.setHours(valueOrReferenceDate, valueWithMeridiem), "finish", "hours");
				},
				items: getHourSectionOptions({
					now,
					value,
					ampm,
					adapter,
					isDisabled: (hours) => isTimeDisabled(hours, "hours"),
					timeStep: timeSteps.hours,
					resolveAriaLabel: translations.hoursClockNumberText,
					valueOrReferenceDate
				})
			};
			case "minutes": return {
				onChange: (minutes) => {
					setValueAndGoToNextView(adapter.setMinutes(valueOrReferenceDate, minutes), "finish", "minutes");
				},
				items: getTimeSectionOptions({
					value: adapter.getMinutes(valueOrReferenceDate),
					adapter,
					isDisabled: (minutes) => isTimeDisabled(minutes, "minutes"),
					resolveLabel: (minutes) => adapter.format(adapter.setMinutes(now, minutes), "minutes"),
					timeStep: timeSteps.minutes,
					hasValue: !!value,
					resolveAriaLabel: translations.minutesClockNumberText
				})
			};
			case "seconds": return {
				onChange: (seconds) => {
					setValueAndGoToNextView(adapter.setSeconds(valueOrReferenceDate, seconds), "finish", "seconds");
				},
				items: getTimeSectionOptions({
					value: adapter.getSeconds(valueOrReferenceDate),
					adapter,
					isDisabled: (seconds) => isTimeDisabled(seconds, "seconds"),
					resolveLabel: (seconds) => adapter.format(adapter.setSeconds(now, seconds), "seconds"),
					timeStep: timeSteps.seconds,
					hasValue: !!value,
					resolveAriaLabel: translations.secondsClockNumberText
				})
			};
			case "meridiem": {
				const amLabel = formatMeridiem(adapter, "am");
				const pmLabel = formatMeridiem(adapter, "pm");
				return {
					onChange: handleMeridiemChange,
					items: [{
						value: "am",
						label: amLabel,
						isSelected: () => !!value && meridiemMode === "am",
						isFocused: () => !!valueOrReferenceDate && meridiemMode === "am",
						ariaLabel: amLabel
					}, {
						value: "pm",
						label: pmLabel,
						isSelected: () => !!value && meridiemMode === "pm",
						isFocused: () => !!valueOrReferenceDate && meridiemMode === "pm",
						ariaLabel: pmLabel
					}]
				};
			}
			default: throw new Error(`MUI X Date Pickers: Unknown view "${viewToBuild}" found in MultiSectionDigitalClock. This view is not supported by the component. Use valid view values: "hours", "minutes", "seconds", or "meridiem".`);
		}
	}, [
		now,
		value,
		ampm,
		adapter,
		timeSteps.hours,
		timeSteps.minutes,
		timeSteps.seconds,
		translations.hoursClockNumberText,
		translations.minutesClockNumberText,
		translations.secondsClockNumberText,
		meridiemMode,
		setValueAndGoToNextView,
		valueOrReferenceDate,
		isTimeDisabled,
		handleMeridiemChange
	]);
	const viewsToRender = import_react.useMemo(() => {
		if (!isRtl) return views;
		const digitViews = views.filter((v) => v !== "meridiem");
		digitViews.reverse();
		if (views.includes("meridiem")) digitViews.push("meridiem");
		return digitViews;
	}, [isRtl, views]);
	const viewTimeOptions = import_react.useMemo(() => {
		return views.reduce((result, currentView) => {
			return _extends({}, result, { [currentView]: buildViewProps(currentView) });
		}, {});
	}, [views, buildViewProps]);
	const { ownerState } = usePickerPrivateContext();
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockRoot, _extends({
		ref,
		className: clsx(useUtilityClasses(classesProp).root, className),
		ownerState,
		role: "group"
	}, other, { children: viewsToRender.map((timeView) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockSection, {
		items: viewTimeOptions[timeView].items,
		onChange: viewTimeOptions[timeView].onChange,
		active: view === timeView,
		autoFocus: autoFocus || focusedView === timeView,
		disabled,
		readOnly,
		slots,
		slotProps,
		skipDisabled,
		"aria-label": translations.selectViewText(timeView)
	}, timeView)) }));
});
MultiSectionDigitalClock.displayName = "MultiSectionDigitalClock";
MultiSectionDigitalClock.propTypes = {
	/**
	* 12h/24h view for hour selection clock.
	* @default adapter.is12HourCycleInCurrentLocale()
	*/
	ampm: import_prop_types.default.bool,
	/**
	* If `true`, the main element is focused during the first mount.
	* This main element is:
	* - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
	* - the `input` element if there is a field rendered.
	*/
	autoFocus: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* The default selected value.
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
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	/**
	* Controlled focused view.
	*/
	focusedView: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
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
	* Callback fired when the value changes.
	* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
	* @template TView The view type. Will be one of date or time views.
	* @param {TValue} value The new value.
	* @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
	* @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired on focused view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view to focus or not.
	* @param {boolean} hasFocus `true` if the view should be focused.
	*/
	onFocusedViewChange: import_prop_types.default.func,
	/**
	* Callback fired on view change.
	* @template TView Type of the view. It will vary based on the Picker type and the `views` it uses.
	* @param {TView} view The new view.
	*/
	onViewChange: import_prop_types.default.func,
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
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid time using the validation props, except callbacks such as `shouldDisableTime`.
	*/
	referenceDate: import_prop_types.default.object,
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
	* Overrideable component slots.
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
	* The time steps between two time unit options.
	* For example, if `timeSteps.minutes = 8`, then the available minute options will be `[0, 8, 16, 24, 32, 40, 48, 56]`.
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
	* Available views.
	* @default ['hours', 'minutes']
	*/
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/timeViewRenderers/timeViewRenderers.mjs
var renderTimeViewClock = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, ampmInClock, slots, slotProps, readOnly, disabled, sx, autoFocus, showViewSwitcher, disableIgnoringDatePartForTimeValidation, timezone }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TimeClock, {
	view,
	onViewChange,
	focusedView: focusedView && isTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	ampmInClock,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	showViewSwitcher,
	disableIgnoringDatePartForTimeValidation,
	timezone
});
renderTimeViewClock.displayName = "renderTimeViewClock";
var renderDigitalClockTimeView = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DigitalClock, {
	view,
	onViewChange,
	focusedView: focusedView && isTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	disableIgnoringDatePartForTimeValidation,
	timeStep: timeSteps?.minutes,
	skipDisabled,
	timezone
});
renderDigitalClockTimeView.displayName = "renderDigitalClockTimeView";
var renderMultiSectionDigitalClockTimeView = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClock, {
	view,
	onViewChange,
	focusedView: focusedView && isInternalTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	disableIgnoringDatePartForTimeValidation,
	timeSteps,
	skipDisabled,
	timezone
});
renderMultiSectionDigitalClockTimeView.displayName = "renderMultiSectionDigitalClockTimeView";
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/date-time-utils.mjs
var _excluded = ["views", "format"];
var resolveDateTimeFormat = (adapter, _ref, ignoreDateResolving) => {
	let { views, format } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded);
	if (format) return format;
	const dateViews = [];
	const timeViews = [];
	views.forEach((view) => {
		if (isTimeView(view)) timeViews.push(view);
		else if (isDatePickerView(view)) dateViews.push(view);
	});
	if (timeViews.length === 0) return resolveDateFormat(adapter, _extends({ views: dateViews }, other), false);
	if (dateViews.length === 0) return resolveTimeFormat(adapter, _extends({ views: timeViews }, other));
	const timeFormat = resolveTimeFormat(adapter, _extends({ views: timeViews }, other));
	return `${ignoreDateResolving ? adapter.formats.keyboardDate : resolveDateFormat(adapter, _extends({ views: dateViews }, other), false)} ${timeFormat}`;
};
var resolveViews = (ampm, views, shouldUseSingleColumn) => {
	if (shouldUseSingleColumn) return views.filter((view) => !isInternalTimeView(view) || view === "hours");
	return ampm ? [...views, "meridiem"] : views;
};
var resolveShouldRenderTimeInASingleColumn = (timeSteps, threshold) => 1440 / ((timeSteps.hours ?? 1) * (timeSteps.minutes ?? 5)) <= threshold;
function resolveTimeViewsResponse({ thresholdToRenderTimeInASingleColumn: inThreshold, ampm, timeSteps: inTimeSteps, views }) {
	const thresholdToRenderTimeInASingleColumn = inThreshold ?? 24;
	const timeSteps = _extends({
		hours: 1,
		minutes: 5,
		seconds: 5
	}, inTimeSteps);
	const shouldRenderTimeInASingleColumn = resolveShouldRenderTimeInASingleColumn(timeSteps, thresholdToRenderTimeInASingleColumn);
	return {
		thresholdToRenderTimeInASingleColumn,
		timeSteps,
		shouldRenderTimeInASingleColumn,
		views: resolveViews(ampm, views, shouldRenderTimeInASingleColumn)
	};
}
//#endregion
export { ownerWindow_default as _, renderTimeViewClock as a, useEnhancedEffect_default as b, digitalClockClasses as c, useRovingTabIndexRoot as d, RovingTabIndexContext as f, pickersToolbarTextClasses as g, PickersToolbarText as h, renderMultiSectionDigitalClockTimeView as i, getDividerUtilityClass as l, PickersToolbarButton as m, resolveTimeViewsResponse as n, multiSectionDigitalClockSectionClasses as o, useRovingTabIndexContext as p, renderDigitalClockTimeView as r, multiSectionDigitalClockClasses as s, resolveDateTimeFormat as t, useRovingTabIndexItem as u, validateTime as v, ownerDocument_default as y };

//# sourceMappingURL=date-time-utils-B9Tj6ytM.js.map