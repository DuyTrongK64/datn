import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-Br2l1Z8p.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { t as warnOnce } from "./warning-ci_nFDcC.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, _ as capitalize, a as rootShouldForwardProp, b as keyframes, c as unstable_memoTheme, d as getThemeProps$1, f as resolveProps, g as useThemeWithoutDefault, h as clsx, i as styled, l as useRtl, m as generateUtilityClass, n as PickerAdapterContext, o as useTheme, p as shouldForwardProp, r as useThemeProps, s as getOverlayAlpha, t as LocalizationProvider, u as alpha, x as identifier_default, y as css } from "./LocalizationProvider-CyOIGrUO.js";
//#region node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.mjs
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
	const result = {};
	slots.forEach((slot) => {
		result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
	});
	return result;
}
//#endregion
//#region node_modules/@mui/utils/useEnhancedEffect/useEnhancedEffect.mjs
var import_jsx_runtime = require_jsx_runtime();
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
* This is useful for effects that are only needed for client-side rendering but not for SSR.
*
* Before you use this hook, make sure to read https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
* and confirm it doesn't apply to your use-case.
*/
var useEnhancedEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/@mui/system/useMediaQuery/useMediaQuery.mjs
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const [match, setMatch] = import_react.useState(() => {
		if (noSsr && matchMedia) return matchMedia(query).matches;
		if (ssrMatchMedia) return ssrMatchMedia(query).matches;
		return defaultMatches;
	});
	useEnhancedEffect(() => {
		if (!matchMedia) return;
		const queryList = matchMedia(query);
		const updateMatch = () => {
			setMatch(queryList.matches);
		};
		updateMatch();
		queryList.addEventListener("change", updateMatch);
		return () => {
			queryList.removeEventListener("change", updateMatch);
		};
	}, [query, matchMedia]);
	return match;
}
var maybeReactUseSyncExternalStore$1 = { ...import_react }.useSyncExternalStore;
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const getDefaultSnapshot = import_react.useCallback(() => defaultMatches, [defaultMatches]);
	const getServerSnapshot = import_react.useMemo(() => {
		if (noSsr && matchMedia) return () => matchMedia(query).matches;
		if (ssrMatchMedia !== null) {
			const { matches } = ssrMatchMedia(query);
			return () => matches;
		}
		return getDefaultSnapshot;
	}, [
		getDefaultSnapshot,
		query,
		ssrMatchMedia,
		noSsr,
		matchMedia
	]);
	const [getSnapshot, subscribe] = import_react.useMemo(() => {
		if (matchMedia === null) return [getDefaultSnapshot, () => () => {}];
		const mediaQueryList = matchMedia(query);
		return [() => mediaQueryList.matches, (notify) => {
			mediaQueryList.addEventListener("change", notify);
			return () => {
				mediaQueryList.removeEventListener("change", notify);
			};
		}];
	}, [
		getDefaultSnapshot,
		matchMedia,
		query
	]);
	return maybeReactUseSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot);
}
function unstable_createUseMediaQuery(params = {}) {
	const { themeId } = params;
	return function useMediaQuery(queryInput, options = {}) {
		let theme = useThemeWithoutDefault();
		if (theme && themeId) theme = theme[themeId] || theme;
		const fallbackMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined" ? window.matchMedia : null;
		const { defaultMatches = false, matchMedia: customMatchMedia, ssrMatchMedia = null, noSsr = false } = getThemeProps$1({
			name: "MuiUseMediaQuery",
			props: options,
			theme
		});
		const matchMedia = import_react.useMemo(() => {
			if (customMatchMedia !== void 0) return customMatchMedia;
			if (fallbackMatchMedia === null) return null;
			return fallbackMatchMedia.bind(window);
		}, [customMatchMedia, fallbackMatchMedia]);
		if (typeof queryInput === "function" && theme === null) console.error([
			"MUI: The `query` argument provided is invalid.",
			"You are providing a function without a theme in the context.",
			"One of the parent elements needs to use a ThemeProvider."
		].join("\n"));
		let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
		query = query.replace(/^@media( ?)/m, "");
		if (query.includes("print")) console.warn([
			`MUI: You have provided a \`print\` query to the \`useMediaQuery\` hook.`,
			"Using the print media query to modify print styles can lead to unexpected results.",
			"Consider using the `displayPrint` field in the `sx` prop instead.",
			"More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print."
		].join("\n"));
		const match = (maybeReactUseSyncExternalStore$1 !== void 0 ? useMediaQueryNew : useMediaQueryOld)(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
		import_react.useDebugValue({
			query,
			match
		});
		return match;
	};
}
unstable_createUseMediaQuery();
//#endregion
//#region node_modules/@mui/utils/exactProp/exactProp.mjs
var specialProperty = "exact-prop: ​";
function exactProp(propTypes) {
	return {
		...propTypes,
		[specialProperty]: (props) => {
			const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
			if (unsupportedProps.length > 0) return /* @__PURE__ */ new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
			return null;
		}
	};
}
//#endregion
//#region node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.mjs
var PropsContext = /*#__PURE__*/ import_react.createContext(void 0);
function DefaultPropsProvider$1({ value, children }) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PropsContext.Provider, {
		value,
		children
	});
}
DefaultPropsProvider$1.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object
};
function getThemeProps(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name]) return props;
	const config = theme.components[name];
	if (config.defaultProps) return resolveProps(config.defaultProps, props, theme.components.mergeClassNameAndStyle);
	if (!config.styleOverrides && !config.variants) return resolveProps(config, props, theme.components.mergeClassNameAndStyle);
	return props;
}
function useDefaultProps$1({ props, name }) {
	return getThemeProps({
		props,
		name,
		theme: { components: import_react.useContext(PropsContext) }
	});
}
//#endregion
//#region node_modules/@mui/utils/useId/useId.mjs
var globalId = 0;
function useGlobalId(idOverride) {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`mui-${globalId}`);
		}
	}, [defaultId]);
	return id;
}
var maybeReactUseId = { ...import_react }.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}
	return useGlobalId(idOverride);
}
//#endregion
//#region node_modules/@mui/utils/composeClasses/composeClasses.mjs
/**
* Compose classes from multiple sources.
*
* @example
* ```tsx
* const slots = {
*  root: ['root', 'primary'],
*  label: ['label'],
* };
*
* const getUtilityClass = (slot) => `MuiButton-${slot}`;
*
* const classes = {
*   root: 'my-root-class',
* };
*
* const output = composeClasses(slots, getUtilityClass, classes);
* // {
* //   root: 'MuiButton-root MuiButton-primary my-root-class',
* //   label: 'MuiButton-label',
* // }
* ```
*
* @param slots a list of classes for each possible slot
* @param getUtilityClass a function to resolve the class based on the slot name
* @param classes the input classes from props
* @returns the resolved classes for all slots
*/
function composeClasses(slots, getUtilityClass, classes = void 0) {
	const output = {};
	for (const slotName in slots) {
		const slot = slots[slotName];
		let buffer = "";
		let start = true;
		for (let i = 0; i < slot.length; i += 1) {
			const value = slot[i];
			if (value) {
				buffer += (start === true ? "" : " ") + getUtilityClass(value);
				start = false;
				if (classes && classes[value]) buffer += " " + classes[value];
			}
		}
		output[slotName] = buffer;
	}
	return output;
}
//#endregion
//#region node_modules/@mui/utils/isMuiElement/isMuiElement.mjs
function isMuiElement(element, muiNames) {
	return /*#__PURE__*/ import_react.isValidElement(element) && muiNames.indexOf(element.type.muiName ?? element.type?._payload?.value?.muiName) !== -1;
}
//#endregion
//#region node_modules/@mui/utils/chainPropTypes/chainPropTypes.mjs
function chainPropTypes(propType1, propType2) {
	return function validate(...args) {
		return propType1(...args) || propType2(...args);
	};
}
//#endregion
//#region node_modules/@mui/utils/elementTypeAcceptingRef/elementTypeAcceptingRef.mjs
function isClassComponent$1(elementType) {
	const { prototype = {} } = elementType;
	return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
	const propValue = props[propName];
	const safePropName = propFullName || propName;
	if (propValue == null || typeof window === "undefined") return null;
	let warningHint;
	/**
	* Blacklisting instead of whitelisting
	*
	* Blacklisting will miss some components, such as React.Fragment. Those will at least
	* trigger a warning in React.
	* We can't whitelist because there is no safe way to detect React.forwardRef
	* or class components. "Safe" means there's no public API.
	*
	*/
	if (typeof propValue === "function" && !isClassComponent$1(propValue)) warningHint = "Did you accidentally provide a plain function component instead?";
	if (propValue === import_react.Fragment) warningHint = "Did you accidentally provide a React.Fragment instead?";
	if (warningHint !== void 0) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
	return null;
}
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types.default.elementType, elementTypeAcceptingRef);
//#endregion
//#region node_modules/@mui/utils/refType/refType.mjs
var refType = import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]);
//#endregion
//#region node_modules/@mui/utils/isHostComponent/isHostComponent.mjs
/**
* Determines if a given element is a DOM element name (i.e. not a React component).
*/
function isHostComponent(element) {
	return typeof element === "string";
}
//#endregion
//#region node_modules/@mui/utils/useForkRef/useForkRef.mjs
/**
* Merges refs into a single memoized callback ref or `null`.
*
* ```tsx
* const rootRef = React.useRef<Instance>(null);
* const refFork = useForkRef(rootRef, props.ref);
*
* return (
*   <Root {...props} ref={refFork} />
* );
* ```
*
* @param {Array<React.Ref<Instance> | undefined>} refs The ref array.
* @returns {React.RefCallback<Instance> | null} The new ref callback.
*/
function useForkRef(...refs) {
	const cleanupRef = import_react.useRef(void 0);
	const refEffect = import_react.useCallback((instance) => {
		const cleanups = refs.map((ref) => {
			if (ref == null) return null;
			if (typeof ref === "function") {
				const refCallback = ref;
				const refCleanup = refCallback(instance);
				return typeof refCleanup === "function" ? refCleanup : () => {
					refCallback(null);
				};
			}
			ref.current = instance;
			return () => {
				ref.current = null;
			};
		});
		return () => {
			cleanups.forEach((refCleanup) => refCleanup?.());
		};
	}, refs);
	return import_react.useMemo(() => {
		if (refs.every((ref) => ref == null)) return null;
		return (value) => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		};
	}, refs);
}
//#endregion
//#region node_modules/@mui/utils/useEventCallback/useEventCallback.mjs
/**
* Inspired by https://github.com/react/react/issues/14099#issuecomment-440013892
* See RFC in https://github.com/reactjs/rfcs/pull/220
*/
function useEventCallback(fn) {
	const ref = import_react.useRef(fn);
	useEnhancedEffect(() => {
		ref.current = fn;
	});
	return import_react.useRef((...args) => (0, ref.current)(...args)).current;
}
//#endregion
//#region node_modules/@mui/utils/ownerDocument/ownerDocument.mjs
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/@mui/utils/ownerWindow/ownerWindow.mjs
function ownerWindow(node) {
	return ownerDocument(node).defaultView || window;
}
//#endregion
//#region node_modules/@mui/material/FormControl/FormControlContext.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
/**
* @ignore - internal component.
*/
var FormControlContext = /*#__PURE__*/ import_react.createContext(void 0);
FormControlContext.displayName = "FormControlContext";
//#endregion
//#region node_modules/@mui/material/FormControl/useFormControl.mjs
function useFormControl() {
	return import_react.useContext(FormControlContext);
}
function useFormControlState({ props, states }) {
	const muiFormControl = import_react.useContext(FormControlContext);
	const result = {};
	states.forEach((state) => {
		const value = props[state];
		result[state] = value === void 0 && muiFormControl ? muiFormControl[state] : value;
	});
	return [result, muiFormControl];
}
//#endregion
//#region node_modules/@mui/material/utils/memoTheme.mjs
var memoTheme = unstable_memoTheme;
//#endregion
//#region node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.mjs
function DefaultPropsProvider(props) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DefaultPropsProvider$1, { ...props });
}
DefaultPropsProvider.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object.isRequired
};
function useDefaultProps(params) {
	return useDefaultProps$1(params);
}
//#endregion
//#region node_modules/@mui/material/utils/capitalize.mjs
var capitalize_default = capitalize;
//#endregion
//#region node_modules/@mui/material/utils/useForkRef.mjs
var useForkRef_default = useForkRef;
//#endregion
//#region node_modules/@mui/utils/getActiveElement/getActiveElement.mjs
/**
* Gets the actual active element, traversing through shadow roots if necessary.
*
* When an element inside a shadow root has focus, `document.activeElement` returns
* the shadow host element. This function recursively traverses shadow roots to find
* the actual focused element.
*
* @param root - The document or shadow root to start the search from.
* @returns The actual focused element, or null if no element has focus.
*
* @example
* // In a shadow DOM context
* const activeElement = getActiveElement(document);
* // Returns the actual focused element inside the shadow root
*
* @example
* // Starting from a specific document
* const activeElement = getActiveElement(ownerDocument(element));
*/
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
//#endregion
//#region node_modules/@mui/material/utils/getActiveElement.mjs
var getActiveElement_default = activeElement;
//#endregion
//#region node_modules/@mui/material/InputBase/utils.mjs
function hasValue(value) {
	return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
	return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
	return obj.startAdornment;
}
//#endregion
//#region node_modules/@mui/material/styles/reducedMotion.mjs
var defaultStyles = { transition: "none" };
function resolveReducedMotionStyles(reducedMotion, styles) {
	if (reducedMotion === "always") return styles;
	if (reducedMotion === "system") return { "@media (prefers-reduced-motion: reduce)": styles };
	return null;
}
//#endregion
//#region node_modules/@mui/material/transitions/utils.mjs
var reflow = (node) => node.scrollTop;
var EMPTY_STYLE = {};
var DEFAULT_TRANSITION_PROPS = ["all"];
var EMPTY_OPTIONS = {};
function normalizedTransitionCallback(nodeRef, callback) {
	return (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
}
/**
* Return the child style for a transition. Reuse predefined style objects when
* no custom styles are present so memoized children see the same object.
*/
function getTransitionChildStyle(state, inProp, baseStyles, hiddenStyles, styleProp, childStyle) {
	const base = state === "exited" && !inProp ? hiddenStyles : baseStyles[state] || baseStyles.exited;
	return styleProp || childStyle ? {
		...base,
		...styleProp,
		...childStyle
	} : base;
}
function getTransitionProps(props, options) {
	const { timeout, easing, style = EMPTY_STYLE } = props;
	return {
		duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
		easing: style.transitionTimingFunction ?? (typeof easing === "object" ? easing[options.mode] : easing),
		delay: style.transitionDelay
	};
}
/**
* Returns CSS that disables component-owned transitions when reduced motion is active.
* Pass custom styles only when the default `transition: none` reset is not enough.
*/
function getReducedMotionStyles(theme, styles) {
	const resolvedStyles = styles ?? defaultStyles;
	return resolveReducedMotionStyles(theme.motion?.reducedMotion, resolvedStyles);
}
function getTransitionStyles(theme, props = DEFAULT_TRANSITION_PROPS, options = EMPTY_OPTIONS) {
	const transition = theme.transitions?.create?.(props, options);
	const reducedMotionStyles = getReducedMotionStyles(theme);
	if (transition === void 0) return reducedMotionStyles ?? EMPTY_STYLE;
	const transitionStyles = { transition };
	return reducedMotionStyles ? {
		...transitionStyles,
		...reducedMotionStyles
	} : transitionStyles;
}
//#endregion
//#region node_modules/@mui/material/FormHelperText/formHelperTextClasses.mjs
function getFormHelperTextUtilityClasses(slot) {
	return generateUtilityClass("MuiFormHelperText", slot);
}
var formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", [
	"root",
	"error",
	"disabled",
	"sizeSmall",
	"sizeMedium",
	"contained",
	"focused",
	"filled",
	"required"
]);
//#endregion
//#region node_modules/@mui/material/FormLabel/formLabelClasses.mjs
function getFormLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/@mui/material/ListItemButton/listItemButtonClasses.mjs
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", [
	"root",
	"focusVisible",
	"dense",
	"alignItemsFlexStart",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/material/useMediaQuery/index.mjs
var useMediaQuery = unstable_createUseMediaQuery({ themeId: identifier_default });
//#endregion
//#region node_modules/@mui/utils/resolveComponentProps/resolveComponentProps.mjs
/**
* If `componentProps` is a function, calls it with the provided `ownerState`.
* Otherwise, just returns `componentProps`.
*/
function resolveComponentProps(componentProps, ownerState, slotState) {
	if (typeof componentProps === "function") return componentProps(ownerState, slotState);
	return componentProps;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/views.mjs
var areViewsEqual = (views, expectedViews) => {
	if (views.length !== expectedViews.length) return false;
	return expectedViews.every((expectedView) => views.includes(expectedView));
};
var applyDefaultViewProps = ({ openTo, defaultOpenTo, views, defaultViews }) => {
	const viewsWithDefault = views ?? defaultViews;
	let openToWithDefault;
	if (openTo != null) openToWithDefault = openTo;
	else if (viewsWithDefault.includes(defaultOpenTo)) openToWithDefault = defaultOpenTo;
	else if (viewsWithDefault.length > 0) openToWithDefault = viewsWithDefault[0];
	else throw new Error("MUI X Date Pickers: The `views` prop must contain at least one view. The date picker needs at least one view to display. Add a valid view to the views array (e.g., [\"year\", \"month\", \"day\"]).");
	return {
		views: viewsWithDefault,
		openTo: openToWithDefault
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/date-utils.mjs
var mergeDateAndTime = (adapter, dateParam, timeParam) => {
	let mergedDate = dateParam;
	mergedDate = adapter.setHours(mergedDate, adapter.getHours(timeParam));
	mergedDate = adapter.setMinutes(mergedDate, adapter.getMinutes(timeParam));
	mergedDate = adapter.setSeconds(mergedDate, adapter.getSeconds(timeParam));
	mergedDate = adapter.setMilliseconds(mergedDate, adapter.getMilliseconds(timeParam));
	return mergedDate;
};
var findClosestEnabledDate = ({ date, disableFuture, disablePast, maxDate, minDate, isDateDisabled, adapter, timezone }) => {
	const today = mergeDateAndTime(adapter, adapter.date(void 0, timezone), date);
	if (disablePast && adapter.isBefore(minDate, today)) minDate = today;
	if (disableFuture && adapter.isAfter(maxDate, today)) maxDate = today;
	let forward = date;
	let backward = date;
	if (adapter.isBefore(date, minDate)) {
		forward = minDate;
		backward = null;
	}
	if (adapter.isAfter(date, maxDate)) {
		if (backward) backward = maxDate;
		forward = null;
	}
	while (forward || backward) {
		if (forward && adapter.isAfter(forward, maxDate)) forward = null;
		if (backward && adapter.isBefore(backward, minDate)) backward = null;
		if (forward) {
			if (!isDateDisabled(forward)) return forward;
			forward = adapter.addDays(forward, 1);
		}
		if (backward) {
			if (!isDateDisabled(backward)) return backward;
			backward = adapter.addDays(backward, -1);
		}
	}
	return null;
};
var replaceInvalidDateByNull = (adapter, value) => !adapter.isValid(value) ? null : value;
var applyDefaultDate = (adapter, value, defaultValue) => {
	if (value == null || !adapter.isValid(value)) return defaultValue;
	return value;
};
var areDatesEqual = (adapter, a, b) => {
	if (!adapter.isValid(a) && a != null && !adapter.isValid(b) && b != null) return true;
	return adapter.isEqual(a, b);
};
var getMonthsInYear = (adapter, year) => {
	const months = [adapter.startOfYear(year)];
	while (months.length < 12) {
		const prevMonth = months[months.length - 1];
		months.push(adapter.addMonths(prevMonth, 1));
	}
	return months;
};
var getTodayDate = (adapter, timezone, valueType) => valueType === "date" ? adapter.startOfDay(adapter.date(void 0, timezone)) : adapter.date(void 0, timezone);
var formatMeridiem = (adapter, meridiem) => {
	const date = adapter.setHours(adapter.date(), meridiem === "am" ? 2 : 14);
	return adapter.format(date, "meridiem");
};
var DATE_VIEWS = [
	"year",
	"month",
	"day"
];
var isDatePickerView = (view) => DATE_VIEWS.includes(view);
var resolveDateFormat = (adapter, { format, views }, isInToolbar) => {
	if (format != null) return format;
	const formats = adapter.formats;
	if (areViewsEqual(views, ["year"])) return formats.year;
	if (areViewsEqual(views, ["month"])) return formats.month;
	if (areViewsEqual(views, ["day"])) return formats.dayOfMonth;
	if (areViewsEqual(views, ["month", "year"])) return `${formats.month} ${formats.year}`;
	if (areViewsEqual(views, ["day", "month"])) return `${formats.month} ${formats.dayOfMonth}`;
	if (isInToolbar) return /en/.test(adapter.getCurrentLocaleCode()) ? formats.normalDateWithWeekday : formats.normalDate;
	return formats.keyboardDate;
};
var getWeekdays = (adapter, date) => {
	const start = adapter.startOfWeek(date);
	return [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].map((diff) => adapter.addDays(start, diff));
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/time-utils.mjs
var EXPORTED_TIME_VIEWS = [
	"hours",
	"minutes",
	"seconds"
];
var TIME_VIEWS = [
	"hours",
	"minutes",
	"seconds",
	"meridiem"
];
var isTimeView = (view) => EXPORTED_TIME_VIEWS.includes(view);
var isInternalTimeView = (view) => TIME_VIEWS.includes(view);
var getMeridiem = (date, adapter) => {
	if (!date) return null;
	return adapter.getHours(date) >= 12 ? "pm" : "am";
};
var convertValueToMeridiem = (value, meridiem, ampm) => {
	if (ampm) {
		if ((value >= 12 ? "pm" : "am") !== meridiem) return meridiem === "am" ? value - 12 : value + 12;
	}
	return value;
};
var convertToMeridiem = (time, meridiem, ampm, adapter) => {
	const newHoursAmount = convertValueToMeridiem(adapter.getHours(time), meridiem, ampm);
	return adapter.setHours(time, newHoursAmount);
};
var getSecondsInDay = (date, adapter) => {
	return adapter.getHours(date) * 3600 + adapter.getMinutes(date) * 60 + adapter.getSeconds(date);
};
var createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, adapter) => (dateLeft, dateRight) => {
	if (disableIgnoringDatePartForTimeValidation) return adapter.isAfter(dateLeft, dateRight);
	return getSecondsInDay(dateLeft, adapter) > getSecondsInDay(dateRight, adapter);
};
var resolveTimeFormat = (adapter, { format, views, ampm }) => {
	if (format != null) return format;
	const formats = adapter.formats;
	if (areViewsEqual(views, ["hours"])) return ampm ? `${formats.hours12h} ${formats.meridiem}` : formats.hours24h;
	if (areViewsEqual(views, ["minutes"])) return formats.minutes;
	if (areViewsEqual(views, ["seconds"])) return formats.seconds;
	if (areViewsEqual(views, ["minutes", "seconds"])) return `${formats.minutes}:${formats.seconds}`;
	if (areViewsEqual(views, [
		"hours",
		"minutes",
		"seconds"
	])) return ampm ? `${formats.hours12h}:${formats.minutes}:${formats.seconds} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}:${formats.seconds}`;
	return ampm ? `${formats.hours12h}:${formats.minutes} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}`;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/getDefaultReferenceDate.mjs
var SECTION_TYPE_GRANULARITY = {
	year: 1,
	month: 2,
	day: 3,
	hours: 4,
	minutes: 5,
	seconds: 6,
	milliseconds: 7
};
var getSectionTypeGranularity = (sections) => Math.max(...sections.map((section) => SECTION_TYPE_GRANULARITY[section.type] ?? 1));
var roundDate = (adapter, granularity, date) => {
	if (granularity === SECTION_TYPE_GRANULARITY.year) return adapter.startOfYear(date);
	if (granularity === SECTION_TYPE_GRANULARITY.month) return adapter.startOfMonth(date);
	if (granularity === SECTION_TYPE_GRANULARITY.day) return adapter.startOfDay(date);
	let roundedDate = date;
	if (granularity < SECTION_TYPE_GRANULARITY.minutes) roundedDate = adapter.setMinutes(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.seconds) roundedDate = adapter.setSeconds(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.milliseconds) roundedDate = adapter.setMilliseconds(roundedDate, 0);
	return roundedDate;
};
var getDefaultReferenceDate = ({ props, adapter, granularity, timezone, getTodayDate: inGetTodayDate }) => {
	let referenceDate = inGetTodayDate ? inGetTodayDate() : roundDate(adapter, granularity, getTodayDate(adapter, timezone));
	if (props.minDate != null && adapter.isAfterDay(props.minDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.minDate);
	if (props.maxDate != null && adapter.isBeforeDay(props.maxDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.maxDate);
	const isAfter = createIsAfterIgnoreDatePart(props.disableIgnoringDatePartForTimeValidation ?? false, adapter);
	if (props.minTime != null && isAfter(props.minTime, referenceDate)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.minTime : mergeDateAndTime(adapter, referenceDate, props.minTime));
	if (props.maxTime != null && isAfter(referenceDate, props.maxTime)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.maxTime : mergeDateAndTime(adapter, referenceDate, props.maxTime));
	return referenceDate;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useField.utils.mjs
var getDateSectionConfigFromFormatToken = (adapter, formatToken) => {
	const config = adapter.formatTokenMap[formatToken];
	if (config == null) throw new Error(`MUI X: The token "${formatToken}" is not supported by the Date and Time Pickers.
Please try using another token or open an issue on https://github.com/mui/mui-x/issues/new/choose if you think it should be supported.`);
	if (typeof config === "string") return {
		type: config,
		contentType: config === "meridiem" ? "letter" : "digit",
		maxLength: void 0
	};
	return {
		type: config.sectionType,
		contentType: config.contentType,
		maxLength: config.maxLength
	};
};
var getDaysInWeekStr = (adapter, format) => {
	const elements = [];
	const now = adapter.date(void 0, "default");
	const startDate = adapter.startOfWeek(now);
	const endDate = adapter.endOfWeek(now);
	let current = startDate;
	while (adapter.isBefore(current, endDate)) {
		elements.push(current);
		current = adapter.addDays(current, 1);
	}
	return elements.map((weekDay) => adapter.formatByString(weekDay, format));
};
var getLetterEditingOptions = (adapter, timezone, sectionType, format) => {
	switch (sectionType) {
		case "month": return getMonthsInYear(adapter, adapter.date(void 0, timezone)).map((month) => adapter.formatByString(month, format));
		case "weekDay": return getDaysInWeekStr(adapter, format);
		case "meridiem": {
			const now = adapter.date(void 0, timezone);
			return [adapter.startOfDay(now), adapter.endOfDay(now)].map((date) => adapter.formatByString(date, format));
		}
		default: return [];
	}
};
var FORMAT_SECONDS_NO_LEADING_ZEROS = "s";
var NON_LOCALIZED_DIGITS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
var getLocalizedDigits = (adapter) => {
	const today = adapter.date(void 0);
	if (adapter.formatByString(adapter.setSeconds(today, 0), FORMAT_SECONDS_NO_LEADING_ZEROS) === "0") return NON_LOCALIZED_DIGITS;
	return Array.from({ length: 10 }).map((_, index) => adapter.formatByString(adapter.setSeconds(today, index), FORMAT_SECONDS_NO_LEADING_ZEROS));
};
var removeLocalizedDigits = (valueStr, localizedDigits) => {
	if (localizedDigits[0] === "0") return valueStr;
	const digits = [];
	let currentFormattedDigit = "";
	for (let i = 0; i < valueStr.length; i += 1) {
		currentFormattedDigit += valueStr[i];
		const matchingDigitIndex = localizedDigits.indexOf(currentFormattedDigit);
		if (matchingDigitIndex > -1) {
			digits.push(matchingDigitIndex.toString());
			currentFormattedDigit = "";
		}
	}
	return digits.join("");
};
var applyLocalizedDigits = (valueStr, localizedDigits) => {
	if (localizedDigits[0] === "0") return valueStr;
	return valueStr.split("").map((char) => localizedDigits[Number(char)]).join("");
};
var isStringNumber = (valueStr, localizedDigits) => {
	const nonLocalizedValueStr = removeLocalizedDigits(valueStr, localizedDigits);
	return nonLocalizedValueStr !== " " && !Number.isNaN(Number(nonLocalizedValueStr));
};
/**
* Make sure the value of a digit section have the right amount of leading zeros.
* E.g.: `03` => `3`
* Warning: Should only be called with non-localized digits. Call `removeLocalizedDigits` with your value if needed.
*/
var cleanLeadingZeros = (valueStr, size) => {
	return Number(valueStr).toString().padStart(size, "0");
};
var cleanDigitSectionValue = (adapter, value, sectionBoundaries, localizedDigits, section) => {
	if (section.type !== "day" && section.contentType === "digit-with-letter") throw new Error([`MUI X: The token "${section.format}" is a digit format with letter in it.'
             This type of format is only supported for 'day' sections`].join("\n"));
	if (section.type === "day" && section.contentType === "digit-with-letter") {
		const date = adapter.setDate(sectionBoundaries.longestMonth, value);
		return adapter.formatByString(date, section.format);
	}
	let valueStr = value.toString();
	if (section.hasLeadingZerosInInput) valueStr = cleanLeadingZeros(valueStr, section.maxLength);
	return applyLocalizedDigits(valueStr, localizedDigits);
};
var getSectionVisibleValue = (section, target, localizedDigits) => {
	let value = section.value || section.placeholder;
	const hasLeadingZeros = target === "non-input" ? section.hasLeadingZerosInFormat : section.hasLeadingZerosInInput;
	if (target === "non-input" && section.hasLeadingZerosInInput && !section.hasLeadingZerosInFormat) value = Number(removeLocalizedDigits(value, localizedDigits)).toString();
	if (["input-rtl", "input-ltr"].includes(target) && section.contentType === "digit" && !hasLeadingZeros && value.length === 1) value = `${value}\u200e`;
	if (target === "input-rtl") value = `\u2068${value}\u2069`;
	return value;
};
var changeSectionValueFormat = (adapter, valueStr, currentFormat, newFormat) => {
	if (getDateSectionConfigFromFormatToken(adapter, currentFormat).type === "weekDay") throw new Error("changeSectionValueFormat doesn't support week day formats");
	return adapter.formatByString(adapter.parse(valueStr, currentFormat), newFormat);
};
var isFourDigitYearFormat = (adapter, format) => adapter.formatByString(adapter.date(void 0, "system"), format).length === 4;
var doesSectionFormatHaveLeadingZeros = (adapter, contentType, sectionType, format) => {
	if (contentType !== "digit") return false;
	const now = adapter.date(void 0, "default");
	switch (sectionType) {
		case "year":
			if (adapter.lib === "dayjs" && format === "YY") return true;
			return adapter.formatByString(adapter.setYear(now, 1), format).startsWith("0");
		case "month": return adapter.formatByString(adapter.startOfYear(now), format).length > 1;
		case "day": return adapter.formatByString(adapter.startOfMonth(now), format).length > 1;
		case "weekDay": return adapter.formatByString(adapter.startOfWeek(now), format).length > 1;
		case "hours": return adapter.formatByString(adapter.setHours(now, 1), format).length > 1;
		case "minutes": return adapter.formatByString(adapter.setMinutes(now, 1), format).length > 1;
		case "seconds": return adapter.formatByString(adapter.setSeconds(now, 1), format).length > 1;
		default: throw new Error("MUI X:Invalid section type");
	}
};
/**
* Some date libraries like `dayjs` don't support parsing from date with escaped characters.
* To make sure that the parsing works, we are building a format and a date without any separator.
*/
var getDateFromDateSections = (adapter, sections, localizedDigits) => {
	const shouldSkipWeekDays = sections.some((section) => section.type === "day");
	const sectionFormats = [];
	const sectionValues = [];
	for (let i = 0; i < sections.length; i += 1) {
		const section = sections[i];
		if (!(shouldSkipWeekDays && section.type === "weekDay")) {
			sectionFormats.push(section.format);
			sectionValues.push(getSectionVisibleValue(section, "non-input", localizedDigits));
		}
	}
	const formatWithoutSeparator = sectionFormats.join(" ");
	const dateWithoutSeparatorStr = sectionValues.join(" ");
	return adapter.parse(dateWithoutSeparatorStr, formatWithoutSeparator);
};
var createDateStrForHiddenInputFromSections = (sections) => sections.map((section) => {
	return `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`;
}).join("");
var getSectionsBoundaries = (adapter, localizedDigits, timezone) => {
	const today = adapter.date(void 0, timezone);
	const endOfYear = adapter.endOfYear(today);
	const endOfDay = adapter.endOfDay(today);
	const { maxDaysInMonth, longestMonth } = getMonthsInYear(adapter, today).reduce((acc, month) => {
		const daysInMonth = adapter.getDaysInMonth(month);
		if (daysInMonth > acc.maxDaysInMonth) return {
			maxDaysInMonth: daysInMonth,
			longestMonth: month
		};
		return acc;
	}, {
		maxDaysInMonth: 0,
		longestMonth: null
	});
	return {
		year: ({ format }) => ({
			minimum: 0,
			maximum: isFourDigitYearFormat(adapter, format) ? 9999 : 99
		}),
		month: () => ({
			minimum: 1,
			maximum: adapter.getMonth(endOfYear) + 1
		}),
		day: ({ currentDate }) => ({
			minimum: 1,
			maximum: adapter.isValid(currentDate) ? adapter.getDaysInMonth(currentDate) : maxDaysInMonth,
			longestMonth
		}),
		weekDay: ({ format, contentType }) => {
			if (contentType === "digit") {
				const daysInWeek = getDaysInWeekStr(adapter, format).map(Number);
				return {
					minimum: Math.min(...daysInWeek),
					maximum: Math.max(...daysInWeek)
				};
			}
			return {
				minimum: 1,
				maximum: 7
			};
		},
		hours: ({ format }) => {
			const lastHourInDay = adapter.getHours(endOfDay);
			const formattedMidnight = Number(removeLocalizedDigits(adapter.formatByString(adapter.startOfDay(today), format), localizedDigits));
			const formattedEndOfDay = Number(removeLocalizedDigits(adapter.formatByString(adapter.endOfDay(today), format), localizedDigits));
			if (formattedEndOfDay !== lastHourInDay) {
				if (formattedMidnight === 0) return {
					minimum: 0,
					maximum: formattedEndOfDay
				};
				return {
					minimum: 1,
					maximum: formattedMidnight
				};
			}
			if (formattedMidnight > lastHourInDay) return {
				minimum: 1,
				maximum: formattedMidnight
			};
			return {
				minimum: 0,
				maximum: lastHourInDay
			};
		},
		minutes: () => ({
			minimum: 0,
			maximum: adapter.getMinutes(endOfDay)
		}),
		seconds: () => ({
			minimum: 0,
			maximum: adapter.getSeconds(endOfDay)
		}),
		meridiem: () => ({
			minimum: 0,
			maximum: 1
		}),
		empty: () => ({
			minimum: 0,
			maximum: 0
		})
	};
};
var warnedOnceInvalidSection = false;
var validateSections = (sections, valueType) => {
	if (!warnedOnceInvalidSection) {
		const supportedSections = ["empty"];
		if (["date", "date-time"].includes(valueType)) supportedSections.push("weekDay", "day", "month", "year");
		if (["time", "date-time"].includes(valueType)) supportedSections.push("hours", "minutes", "seconds", "meridiem");
		const invalidSection = sections.find((section) => !supportedSections.includes(section.type));
		if (invalidSection) {
			console.warn(`MUI X: The field component you are using is not compatible with the "${invalidSection.type}" date section.`, `The supported date sections are ["${supportedSections.join("\", \"")}"]\`.`);
			warnedOnceInvalidSection = true;
		}
	}
};
var transferDateSectionValue = (adapter, section, dateToTransferFrom, dateToTransferTo) => {
	switch (section.type) {
		case "year": return adapter.setYear(dateToTransferTo, adapter.getYear(dateToTransferFrom));
		case "month": return adapter.setMonth(dateToTransferTo, adapter.getMonth(dateToTransferFrom));
		case "weekDay": {
			let dayInWeekStrOfActiveDate = adapter.formatByString(dateToTransferFrom, section.format);
			if (section.hasLeadingZerosInInput) dayInWeekStrOfActiveDate = cleanLeadingZeros(dayInWeekStrOfActiveDate, section.maxLength);
			const formattedDaysInWeek = getDaysInWeekStr(adapter, section.format);
			const dayInWeekOfActiveDate = formattedDaysInWeek.indexOf(dayInWeekStrOfActiveDate);
			const diff = formattedDaysInWeek.indexOf(section.value) - dayInWeekOfActiveDate;
			return adapter.addDays(dateToTransferFrom, diff);
		}
		case "day": return adapter.setDate(dateToTransferTo, adapter.getDate(dateToTransferFrom));
		case "meridiem": return convertToMeridiem(dateToTransferTo, adapter.getHours(dateToTransferFrom) < 12 ? "am" : "pm", true, adapter);
		case "hours": return adapter.setHours(dateToTransferTo, adapter.getHours(dateToTransferFrom));
		case "minutes": return adapter.setMinutes(dateToTransferTo, adapter.getMinutes(dateToTransferFrom));
		case "seconds": return adapter.setSeconds(dateToTransferTo, adapter.getSeconds(dateToTransferFrom));
		default: return dateToTransferTo;
	}
};
var reliableSectionModificationOrder = {
	year: 1,
	month: 2,
	day: 3,
	weekDay: 4,
	hours: 5,
	minutes: 6,
	seconds: 7,
	meridiem: 8,
	empty: 9
};
var mergeDateIntoReferenceDate = (adapter, dateToTransferFrom, sections, referenceDate, shouldLimitToEditedSections) => [...sections].sort((a, b) => reliableSectionModificationOrder[a.type] - reliableSectionModificationOrder[b.type]).reduce((mergedDate, section) => {
	if (!shouldLimitToEditedSections || section.modified) return transferDateSectionValue(adapter, section, dateToTransferFrom, mergedDate);
	return mergedDate;
}, referenceDate);
var getSectionOrder = (sections) => {
	const neighbors = {};
	sections.forEach((_, index) => {
		neighbors[index] = {
			leftIndex: index === 0 ? null : index - 1,
			rightIndex: index === sections.length - 1 ? null : index + 1
		};
	});
	return {
		neighbors,
		startIndex: 0,
		endIndex: sections.length - 1
	};
};
var parseSelectedSections = (selectedSections, sections) => {
	if (selectedSections == null) return null;
	if (selectedSections === "all") return "all";
	if (typeof selectedSections === "string") {
		const index = sections.findIndex((section) => section.type === selectedSections);
		return index === -1 ? null : index;
	}
	return selectedSections;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/valueManagers.mjs
var _excluded$18 = ["value", "referenceDate"];
var singleItemValueManager = {
	emptyValue: null,
	getTodayValue: getTodayDate,
	getInitialReferenceValue: (_ref) => {
		let { value, referenceDate } = _ref, params = _objectWithoutPropertiesLoose(_ref, _excluded$18);
		if (params.adapter.isValid(value)) return value;
		if (referenceDate != null) return referenceDate;
		return getDefaultReferenceDate(params);
	},
	cleanValue: replaceInvalidDateByNull,
	areValuesEqual: areDatesEqual,
	isSameError: (a, b) => a === b,
	hasError: (error) => error != null,
	defaultErrorState: null,
	getTimezone: (adapter, value) => adapter.isValid(value) ? adapter.getTimezone(value) : null,
	setTimezone: (adapter, timezone, value) => value == null ? null : adapter.setTimezone(value, timezone)
};
var singleItemFieldValueManager = {
	updateReferenceValue: (adapter, value, prevReferenceValue) => adapter.isValid(value) ? value : prevReferenceValue,
	getSectionsFromValue: (date, getSectionsFromDate) => getSectionsFromDate(date),
	getHiddenInputValueFromSections: createDateStrForHiddenInputFromSections,
	parseValueStr: (valueStr, referenceValue, parseDate) => parseDate(valueStr.trim(), referenceValue),
	getDateFromSection: (value) => value,
	getDateSectionsFromValue: (sections) => sections,
	updateDateInValue: (value, activeSection, activeDate) => activeDate,
	clearDateSections: (sections) => sections.map((section) => _extends({}, section, { value: "" }))
};
//#endregion
//#region node_modules/@mui/material/utils/createSimplePaletteValueFilter.mjs
/**
* Type guard to check if the object has a "main" property of type string.
*
* @param obj - the object to check
* @returns boolean
*/
function hasCorrectMainProperty(obj) {
	return typeof obj.main === "string";
}
/**
* Checks if the object conforms to the SimplePaletteColorOptions type.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param obj - The object to check
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns boolean
*/
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
	if (!hasCorrectMainProperty(obj)) return false;
	for (const value of additionalPropertiesToCheck) if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") return false;
	return true;
}
/**
* Creates a filter function used to filter simple palette color options.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns ([, value]: [any, PaletteColorOptions]) => boolean
*/
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
	return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
//#endregion
//#region node_modules/@mui/material/Typography/typographyClasses.mjs
function getTypographyUtilityClass(slot) {
	return generateUtilityClass("MuiTypography", slot);
}
generateUtilityClasses("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom"
]);
//#endregion
//#region node_modules/@mui/material/Typography/Typography.mjs
var useUtilityClasses$32 = (ownerState) => {
	const { align, gutterBottom, noWrap, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		ownerState.align !== "inherit" && `align${capitalize_default(align)}`,
		gutterBottom && "gutterBottom",
		noWrap && "noWrap"
	] }, getTypographyUtilityClass, classes);
};
var TypographyRoot = styled("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.variant && styles[ownerState.variant],
			ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`],
			ownerState.noWrap && styles.noWrap,
			ownerState.gutterBottom && styles.gutterBottom
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	variants: [
		{
			props: { variant: "inherit" },
			style: {
				font: "inherit",
				lineHeight: "inherit",
				letterSpacing: "inherit"
			}
		},
		...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
			props: { variant },
			style: value
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		})),
		...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === "string").map(([color]) => ({
			props: { color: `text${capitalize_default(color)}` },
			style: { color: (theme.vars || theme).palette.text[color] }
		})),
		{
			props: ({ ownerState }) => ownerState.align !== "inherit",
			style: { textAlign: "var(--Typography-textAlign)" }
		},
		{
			props: ({ ownerState }) => ownerState.noWrap,
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}
		},
		{
			props: ({ ownerState }) => ownerState.gutterBottom,
			style: { marginBottom: "0.35em" }
		}
	]
})));
var defaultVariantMapping = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
};
var Typography = /*#__PURE__*/ import_react.forwardRef(function Typography(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTypography"
	});
	const { color, align = "inherit", className, component, gutterBottom = false, noWrap = false, variant = "body1", variantMapping = defaultVariantMapping, ...other } = props;
	const ownerState = {
		...props,
		align,
		color,
		className,
		component,
		gutterBottom,
		noWrap,
		variant,
		variantMapping
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TypographyRoot, {
		as: component || variantMapping[variant] || defaultVariantMapping[variant] || "span",
		ref,
		className: clsx(useUtilityClasses$32(ownerState).root, className),
		...other,
		ownerState,
		style: {
			...align !== "inherit" && { "--Typography-textAlign": align },
			...other.style
		}
	});
});
Typography.propTypes = {
	/**
	* Set the text-align on the component.
	* @default 'inherit'
	*/
	align: import_prop_types.default.oneOf([
		"center",
		"inherit",
		"justify",
		"left",
		"right"
	]),
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning",
		"textPrimary",
		"textSecondary",
		"textDisabled"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the text will have a bottom margin.
	* @default false
	*/
	gutterBottom: import_prop_types.default.bool,
	/**
	* If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
	*
	* Note that text overflow can only happen with block or inline-block level elements
	* (the element needs to have a width in order to overflow).
	* @default false
	*/
	noWrap: import_prop_types.default.bool,
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
	]),
	/**
	* Applies the theme typography styles.
	* @default 'body1'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"body1",
		"body2",
		"button",
		"caption",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"inherit",
		"overline",
		"subtitle1",
		"subtitle2"
	]), import_prop_types.default.string]),
	/**
	* The component maps the variant prop to a range of different HTML element types.
	* For instance, subtitle1 to `<h6>`.
	* If you wish to change that mapping, you can provide your own.
	* Alternatively, you can use the `component` prop.
	* @default {
	*   h1: 'h1',
	*   h2: 'h2',
	*   h3: 'h3',
	*   h4: 'h4',
	*   h5: 'h5',
	*   h6: 'h6',
	*   subtitle1: 'h6',
	*   subtitle2: 'h6',
	*   body1: 'p',
	*   body2: 'p',
	*   inherit: 'p',
	* }
	*/
	variantMapping: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/pickersToolbarClasses.mjs
function getPickersToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiPickersToolbar", slot);
}
var pickersToolbarClasses = generateUtilityClasses("MuiPickersToolbar", [
	"root",
	"title",
	"content"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/useIsValidValue.mjs
var IsValidValueContext = /*#__PURE__*/ import_react.createContext(() => true);
IsValidValueContext.displayName = "IsValidValueContext";
function useIsValidValue() {
	return import_react.useContext(IsValidValueContext);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useNullableFieldPrivateContext.mjs
var PickerFieldPrivateContext = /*#__PURE__*/ import_react.createContext(null);
PickerFieldPrivateContext.displayName = "PickerFieldPrivateContext";
function useNullableFieldPrivateContext() {
	return import_react.useContext(PickerFieldPrivateContext);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerContext.mjs
var PickerContext = /*#__PURE__*/ import_react.createContext(null);
PickerContext.displayName = "PickerContext";
var usePickerContext = () => {
	const value = import_react.useContext(PickerContext);
	if (value == null) throw new Error("MUI X: The `usePickerContext` hook can only be called inside the context of a Picker component");
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerProvider.mjs
var PickerActionsContext = /*#__PURE__*/ import_react.createContext(null);
PickerActionsContext.displayName = "PickerActionsContext";
var PickerPrivateContext = /*#__PURE__*/ import_react.createContext({
	ownerState: {
		isPickerDisabled: false,
		isPickerReadOnly: false,
		isPickerValueEmpty: false,
		isPickerOpen: false,
		pickerVariant: "desktop",
		pickerOrientation: "portrait"
	},
	rootRefObject: { current: null },
	labelId: void 0,
	dismissViews: () => {},
	hasUIView: true,
	getCurrentViewMode: () => "UI",
	triggerElement: null,
	viewContainerRole: null,
	defaultActionBarActions: [],
	onPopperExited: void 0
});
PickerPrivateContext.displayName = "PickerPrivateContext";
function PickerProvider(props) {
	const { contextValue, actionsContextValue, privateContextValue, fieldPrivateContextValue, isValidContextValue, localeText, children } = props;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerContext.Provider, {
		value: contextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerActionsContext.Provider, {
			value: actionsContextValue,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerPrivateContext.Provider, {
				value: privateContextValue,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerFieldPrivateContext.Provider, {
					value: fieldPrivateContextValue,
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IsValidValueContext.Provider, {
						value: isValidContextValue,
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LocalizationProvider, {
							localeText,
							children
						})
					})
				})
			})
		})
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePickerPrivateContext.mjs
/**
* Returns the private context passed by the Picker wrapping the current component.
*/
var usePickerPrivateContext = () => import_react.useContext(PickerPrivateContext);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useToolbarOwnerState.mjs
function useToolbarOwnerState() {
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const isRtl = useRtl();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, { toolbarDirection: isRtl ? "rtl" : "ltr" }), [pickerOwnerState, isRtl]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersToolbar.mjs
var _excluded$17 = [
	"children",
	"className",
	"classes",
	"toolbarTitle",
	"hidden",
	"titleId",
	"classes",
	"landscapeDirection"
];
var useUtilityClasses$31 = (classes) => {
	return composeClasses({
		root: ["root"],
		title: ["title"],
		content: ["content"]
	}, getPickersToolbarUtilityClass, classes);
};
var PickersToolbarRoot = styled("div", {
	name: "MuiPickersToolbar",
	slot: "Root"
})(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	padding: theme.spacing(2, 3),
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			height: "auto",
			maxWidth: 160,
			padding: 16,
			justifyContent: "flex-start",
			flexWrap: "wrap"
		}
	}]
}));
var PickersToolbarContent = styled("div", {
	name: "MuiPickersToolbar",
	slot: "Content",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "landscapeDirection"
})({
	display: "flex",
	flexWrap: "wrap",
	width: "100%",
	flex: 1,
	justifyContent: "space-between",
	alignItems: "center",
	flexDirection: "row",
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			justifyContent: "flex-start",
			alignItems: "flex-start",
			flexDirection: "column"
		}
	}, {
		props: {
			pickerOrientation: "landscape",
			landscapeDirection: "row"
		},
		style: { flexDirection: "row" }
	}]
});
var PickersToolbar = /*#__PURE__*/ import_react.forwardRef(function PickersToolbar(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbar"
	});
	const { children, className, classes: classesProp, toolbarTitle, hidden, titleId, landscapeDirection } = props, other = _objectWithoutPropertiesLoose(props, _excluded$17);
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses$31(classesProp);
	if (hidden) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersToolbarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Typography, {
		variant: "overline",
		id: titleId,
		className: classes.title,
		sx: { color: "text.secondary" },
		children: toolbarTitle
	}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersToolbarContent, {
		className: classes.content,
		ownerState,
		landscapeDirection,
		children
	})] }));
});
PickersToolbar.displayName = "PickersToolbar";
//#endregion
//#region node_modules/@mui/x-date-pickers/locales/utils/getPickersLocalization.mjs
var getPickersLocalization = (pickersTranslations) => {
	return { components: { MuiLocalizationProvider: { defaultProps: { localeText: _extends({}, pickersTranslations) } } } };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/locales/enUS.mjs
var enUSPickers = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	openPreviousView: "Open previous view",
	openNextView: "Open next view",
	calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "year view is open, switch to calendar view" : "calendar view is open, switch to year view",
	start: "Start",
	end: "End",
	startDate: "Start date",
	startTime: "Start time",
	endDate: "End date",
	endTime: "End time",
	cancelButtonLabel: "Cancel",
	clearButtonLabel: "Clear",
	okButtonLabel: "OK",
	todayButtonLabel: "Today",
	nextStepButtonLabel: "Next",
	datePickerToolbarTitle: "Select date",
	dateTimePickerToolbarTitle: "Select date & time",
	timePickerToolbarTitle: "Select time",
	dateRangePickerToolbarTitle: "Select date range",
	timeRangePickerToolbarTitle: "Select time range",
	clockLabelText: (view, formattedTime) => `Select ${view}. ${!formattedTime ? "No time selected" : `Selected time is ${formattedTime}`}`,
	hoursClockNumberText: (hours) => `${hours} hours`,
	minutesClockNumberText: (minutes) => `${minutes} minutes`,
	secondsClockNumberText: (seconds) => `${seconds} seconds`,
	selectViewText: (view) => `Select ${view}`,
	calendarWeekNumberHeaderLabel: "Week number",
	calendarWeekNumberHeaderText: "#",
	calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
	calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
	openDatePickerDialogue: (formattedDate) => formattedDate ? `Choose date, selected date is ${formattedDate}` : "Choose date",
	openTimePickerDialogue: (formattedTime) => formattedTime ? `Choose time, selected time is ${formattedTime}` : "Choose time",
	openRangePickerDialogue: (formattedRange) => formattedRange ? `Choose range, selected range is ${formattedRange}` : "Choose range",
	fieldClearLabel: "Clear",
	timeTableLabel: "pick time",
	dateTableLabel: "pick date",
	fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
	fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
	fieldDayPlaceholder: () => "DD",
	fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
	fieldHoursPlaceholder: () => "hh",
	fieldMinutesPlaceholder: () => "mm",
	fieldSecondsPlaceholder: () => "ss",
	fieldMeridiemPlaceholder: () => "aa",
	year: "Year",
	month: "Month",
	day: "Day",
	weekDay: "Week day",
	hours: "Hours",
	minutes: "Minutes",
	seconds: "Seconds",
	meridiem: "Meridiem",
	empty: "Empty"
};
var DEFAULT_LOCALE = enUSPickers;
getPickersLocalization(enUSPickers);
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerAdapter.mjs
var useLocalizationContext = () => {
	const localization = import_react.useContext(PickerAdapterContext);
	if (localization === null) throw new Error(`MUI X: Can not find the date and time pickers localization context.
It looks like you forgot to wrap your component in LocalizationProvider.
This can also happen if you are bundling multiple versions of the \`@mui/x-date-pickers\` package`);
	if (localization.adapter === null) throw new Error(`MUI X: Can not find the date and time pickers adapter from its localization context.
It looks like you forgot to pass a \`dateAdapter\` to your LocalizationProvider.`);
	const localeText = import_react.useMemo(() => _extends({}, DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
	return import_react.useMemo(() => _extends({}, localization, { localeText }), [localization, localeText]);
};
var usePickerAdapter = () => useLocalizationContext().adapter;
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerTranslations.mjs
var usePickerTranslations = () => useLocalizationContext().localeText;
//#endregion
//#region node_modules/@mui/x-date-pickers/validation/extractValidationProps.mjs
var DATE_VALIDATION_PROP_NAMES = [
	"disablePast",
	"disableFuture",
	"minDate",
	"maxDate",
	"shouldDisableDate",
	"shouldDisableMonth",
	"shouldDisableYear"
];
var TIME_VALIDATION_PROP_NAMES = [
	"disablePast",
	"disableFuture",
	"minTime",
	"maxTime",
	"shouldDisableTime",
	"minutesStep",
	"ampm",
	"disableIgnoringDatePartForTimeValidation"
];
var DATE_TIME_VALIDATION_PROP_NAMES = ["minDateTime", "maxDateTime"];
var VALIDATION_PROP_NAMES = [
	...DATE_VALIDATION_PROP_NAMES,
	...TIME_VALIDATION_PROP_NAMES,
	...DATE_TIME_VALIDATION_PROP_NAMES
];
/**
* Extract the validation props for the props received by a component.
* Limit the risk of forgetting some of them and reduce the bundle size.
*/
var extractValidationProps = (props) => VALIDATION_PROP_NAMES.reduce((extractedProps, propName) => {
	if (props.hasOwnProperty(propName)) extractedProps[propName] = props[propName];
	return extractedProps;
}, {});
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/useSplitFieldProps.mjs
var SHARED_FIELD_INTERNAL_PROP_NAMES = [
	"value",
	"defaultValue",
	"referenceDate",
	"format",
	"formatDensity",
	"onChange",
	"timezone",
	"onError",
	"shouldRespectLeadingZeros",
	"selectedSections",
	"onSelectedSectionsChange",
	"fieldRef",
	"startFieldRef",
	"endFieldRef",
	"disabled",
	"readOnly",
	"dateSeparator",
	"autoFocus",
	"focused"
];
/**
* Split the props received by the field component into:
* - `internalProps` which are used by the various hooks called by the field component.
* - `forwardedProps` which are passed to the underlying component.
* Note that some forwarded props might be used by the hooks as well.
* For instance, hooks like `useDateField` need props like `onKeyDown` to merge the default event handler and the one provided by the application.
* @template TProps, TValueType
* @param {TProps} props The props received by the field component.
* @param {TValueType} valueType The type of the field value ('date', 'time', or 'date-time').
*/
var useSplitFieldProps = (props, valueType) => {
	return import_react.useMemo(() => {
		const forwardedProps = _extends({}, props);
		const internalProps = {};
		const extractProp = (propName) => {
			if (forwardedProps.hasOwnProperty(propName)) {
				internalProps[propName] = forwardedProps[propName];
				delete forwardedProps[propName];
			}
		};
		SHARED_FIELD_INTERNAL_PROP_NAMES.forEach(extractProp);
		if (valueType === "date") DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
		else if (valueType === "time") TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
		else if (valueType === "date-time") {
			DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
			TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
			DATE_TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
		}
		return {
			forwardedProps,
			internalProps
		};
	}, [props, valueType]);
};
/**
* Extract the internal props from the props received by the field component.
* This makes sure that the internal props not defined in the props are not present in the result.
*/
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/buildSectionsFromFormat.mjs
var expandFormat = ({ adapter, format }) => {
	let formatExpansionOverflow = 10;
	let prevFormat = format;
	let nextFormat = adapter.expandFormat(format);
	while (nextFormat !== prevFormat) {
		prevFormat = nextFormat;
		nextFormat = adapter.expandFormat(prevFormat);
		formatExpansionOverflow -= 1;
		if (formatExpansionOverflow < 0) throw new Error("MUI X: The format expansion seems to be in an infinite loop. Please open an issue with the format passed to the component.");
	}
	return nextFormat;
};
var getEscapedPartsFromFormat = ({ adapter, expandedFormat }) => {
	const escapedParts = [];
	const { start: startChar, end: endChar } = adapter.escapedCharacters;
	const regExp = new RegExp(`(\\${startChar}[^\\${endChar}]*\\${endChar})+`, "g");
	let match = null;
	while (match = regExp.exec(expandedFormat)) escapedParts.push({
		start: match.index,
		end: regExp.lastIndex - 1
	});
	return escapedParts;
};
var getSectionPlaceholder = (adapter, localeText, sectionConfig, sectionFormat) => {
	switch (sectionConfig.type) {
		case "year": return localeText.fieldYearPlaceholder({
			digitAmount: adapter.formatByString(adapter.date(void 0, "default"), sectionFormat).length,
			format: sectionFormat
		});
		case "month": return localeText.fieldMonthPlaceholder({
			contentType: sectionConfig.contentType,
			format: sectionFormat
		});
		case "day": return localeText.fieldDayPlaceholder({ format: sectionFormat });
		case "weekDay": return localeText.fieldWeekDayPlaceholder({
			contentType: sectionConfig.contentType,
			format: sectionFormat
		});
		case "hours": return localeText.fieldHoursPlaceholder({ format: sectionFormat });
		case "minutes": return localeText.fieldMinutesPlaceholder({ format: sectionFormat });
		case "seconds": return localeText.fieldSecondsPlaceholder({ format: sectionFormat });
		case "meridiem": return localeText.fieldMeridiemPlaceholder({ format: sectionFormat });
		default: return sectionFormat;
	}
};
var createSection = ({ adapter, date, shouldRespectLeadingZeros, localeText, localizedDigits, now, token, startSeparator }) => {
	if (token === "") throw new Error("MUI X: Should not call `commitToken` with an empty token");
	const sectionConfig = getDateSectionConfigFromFormatToken(adapter, token);
	const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(adapter, sectionConfig.contentType, sectionConfig.type, token);
	const hasLeadingZerosInInput = shouldRespectLeadingZeros ? hasLeadingZerosInFormat : sectionConfig.contentType === "digit";
	const isValidDate = adapter.isValid(date);
	let sectionValue = isValidDate ? adapter.formatByString(date, token) : "";
	let maxLength = null;
	if (hasLeadingZerosInInput) if (hasLeadingZerosInFormat) maxLength = sectionValue === "" ? adapter.formatByString(now, token).length : sectionValue.length;
	else {
		if (sectionConfig.maxLength == null) throw new Error(`MUI X: The token ${token} should have a 'maxLength' property on it's adapter`);
		maxLength = sectionConfig.maxLength;
		if (isValidDate) sectionValue = applyLocalizedDigits(cleanLeadingZeros(removeLocalizedDigits(sectionValue, localizedDigits), maxLength), localizedDigits);
	}
	return _extends({}, sectionConfig, {
		format: token,
		maxLength,
		value: sectionValue,
		placeholder: getSectionPlaceholder(adapter, localeText, sectionConfig, token),
		hasLeadingZerosInFormat,
		hasLeadingZerosInInput,
		startSeparator,
		endSeparator: "",
		modified: false
	});
};
var buildSections = (parameters) => {
	const { adapter, expandedFormat, escapedParts } = parameters;
	const now = adapter.date(void 0);
	const sections = [];
	let startSeparator = "";
	const validTokens = Object.keys(adapter.formatTokenMap).sort((a, b) => b.length - a.length);
	const regExpFirstWordInFormat = /^([a-zA-Z]+)/;
	const regExpWordOnlyComposedOfTokens = new RegExp(`^(${validTokens.join("|")})*$`);
	const regExpFirstTokenInWord = new RegExp(`^(${validTokens.join("|")})`);
	const getEscapedPartOfCurrentChar = (i) => escapedParts.find((escapeIndex) => escapeIndex.start <= i && escapeIndex.end >= i);
	let i = 0;
	while (i < expandedFormat.length) {
		const escapedPartOfCurrentChar = getEscapedPartOfCurrentChar(i);
		const isEscapedChar = escapedPartOfCurrentChar != null;
		const firstWordInFormat = regExpFirstWordInFormat.exec(expandedFormat.slice(i))?.[1];
		if (!isEscapedChar && firstWordInFormat != null && regExpWordOnlyComposedOfTokens.test(firstWordInFormat)) {
			let word = firstWordInFormat;
			while (word.length > 0) {
				const firstWord = regExpFirstTokenInWord.exec(word)[1];
				word = word.slice(firstWord.length);
				sections.push(createSection(_extends({}, parameters, {
					now,
					token: firstWord,
					startSeparator
				})));
				startSeparator = "";
			}
			i += firstWordInFormat.length;
		} else {
			const char = expandedFormat[i];
			if (!(isEscapedChar && escapedPartOfCurrentChar?.start === i || escapedPartOfCurrentChar?.end === i)) if (sections.length === 0) startSeparator += char;
			else {
				sections[sections.length - 1].endSeparator += char;
				sections[sections.length - 1].isEndFormatSeparator = true;
			}
			i += 1;
		}
	}
	if (sections.length === 0 && startSeparator.length > 0) sections.push({
		type: "empty",
		contentType: "letter",
		maxLength: null,
		format: "",
		value: "",
		placeholder: "",
		hasLeadingZerosInFormat: false,
		hasLeadingZerosInInput: false,
		startSeparator,
		endSeparator: "",
		modified: false
	});
	return sections;
};
var postProcessSections = ({ isRtl, formatDensity, sections }) => {
	return sections.map((section) => {
		const cleanSeparator = (separator) => {
			let cleanedSeparator = separator;
			if (isRtl && cleanedSeparator !== null && cleanedSeparator.includes(" ")) cleanedSeparator = `\u2069${cleanedSeparator}\u2066`;
			if (formatDensity === "spacious" && [
				"/",
				".",
				"-"
			].includes(cleanedSeparator)) cleanedSeparator = ` ${cleanedSeparator} `;
			return cleanedSeparator;
		};
		section.startSeparator = cleanSeparator(section.startSeparator);
		section.endSeparator = cleanSeparator(section.endSeparator);
		return section;
	});
};
var buildSectionsFromFormat = (parameters) => {
	let expandedFormat = expandFormat(parameters);
	if (parameters.isRtl) expandedFormat = expandedFormat.split(" ").reverse().join(" ");
	const escapedParts = getEscapedPartsFromFormat(_extends({}, parameters, { expandedFormat }));
	return postProcessSections(_extends({}, parameters, { sections: buildSections(_extends({}, parameters, {
		expandedFormat,
		escapedParts
	})) }));
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useNullablePickerContext.mjs
/**
* Returns the context passed by the Picker wrapping the current component.
* If the context is not found, returns `null`.
*/
var useNullablePickerContext = () => import_react.useContext(PickerContext);
//#endregion
//#region node_modules/@mui/x-date-pickers/hooks/usePickerActionsContext.mjs
/**
* Returns a subset of the context passed by the Picker wrapping the current component.
* It only contains the actions and never causes a re-render of the component using it.
*/
var usePickerActionsContext = () => {
	const value = import_react.useContext(PickerActionsContext);
	if (value == null) throw new Error(`MUI X: The \`usePickerActionsContext\` can only be called in fields that are used as a slot of a Picker component`);
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/validation/useValidation.mjs
/**
* Utility hook to check if a given value is valid based on the provided validation props.
* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
* @param {UseValidationOptions<TValue, TError, TValidationProps>} options The options to configure the hook.
* @param {TValue} options.value The value to validate.
* @param {PickersTimezone} options.timezone The timezone to use for the validation.
* @param {Validator<TValue, TError, TValidationProps>} options.validator The validator function to use.
* @param {TValidationProps} options.props The validation props, they differ depending on the component.
* @param {(error: TError, value: TValue) => void} options.onError Callback fired when the error associated with the current value changes.
*/
function useValidation(options) {
	const { props, validator, value, timezone, onError } = options;
	const adapter = usePickerAdapter();
	const previousValidationErrorRef = import_react.useRef(validator.valueManager.defaultErrorState);
	const validationError = validator({
		adapter,
		value,
		timezone,
		props
	});
	const hasValidationError = validator.valueManager.hasError(validationError);
	import_react.useEffect(() => {
		if (onError && !validator.valueManager.isSameError(validationError, previousValidationErrorRef.current)) onError(validationError, value);
		previousValidationErrorRef.current = validationError;
	}, [
		validator,
		onError,
		validationError,
		value
	]);
	return {
		validationError,
		hasValidationError,
		getValidationErrorForNewValue: useEventCallback((newValue) => {
			return validator({
				adapter,
				value: newValue,
				timezone,
				props
			});
		})
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useUtils.mjs
var useDefaultDates = () => useLocalizationContext().defaultDates;
var useNow = (timezone) => {
	const adapter = usePickerAdapter();
	const now = import_react.useRef(void 0);
	if (now.current === void 0) now.current = adapter.date(void 0, timezone);
	return now.current;
};
//#endregion
//#region node_modules/@mui/utils/appendOwnerState/appendOwnerState.mjs
/**
* Type of the ownerState based on the type of an element it applies to.
* This resolves to the provided OwnerState for React components and `undefined` for host components.
* Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
*/
/**
* Appends the ownerState object to the props, merging with the existing one if necessary.
*
* @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node or undefined, `ownerState` is not applied.
* @param otherProps Props of the element.
* @param ownerState
*/
function appendOwnerState(elementType, otherProps, ownerState) {
	if (elementType === void 0 || isHostComponent(elementType)) return otherProps;
	return {
		...otherProps,
		ownerState: {
			...otherProps.ownerState,
			...ownerState
		}
	};
}
//#endregion
//#region node_modules/@mui/utils/isEventHandler/isEventHandler.mjs
function isEventHandler(key, value) {
	const thirdCharCode = key.charCodeAt(2);
	return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
//#endregion
//#region node_modules/@mui/utils/extractEventHandlers/extractEventHandlers.mjs
/**
* Extracts event handlers from a given object.
* A prop is considered an event handler if it is a function and its name starts with `on`.
*
* @param object An object to extract event handlers from.
*/
function extractEventHandlers(object) {
	if (object === void 0) return {};
	const result = {};
	for (const prop of Object.keys(object)) if (isEventHandler(prop, object[prop])) result[prop] = object[prop];
	return result;
}
//#endregion
//#region node_modules/@mui/utils/omitEventHandlers/omitEventHandlers.mjs
/**
* Removes event handlers from the given object.
* A field is considered an event handler if it is a function with a name beginning with `on`.
*
* @param object Object to remove event handlers from.
* @returns Object with event handlers removed.
*/
function omitEventHandlers(object) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
//#endregion
//#region node_modules/@mui/utils/mergeSlotProps/mergeSlotProps.mjs
/**
* Merges the slot component internal props (usually coming from a hook)
* with the externally provided ones.
*
* The merge order is (the latter overrides the former):
* 1. The internal props (specified as a getter function to work with get*Props hook result)
* 2. Additional props (specified internally on a Base UI component)
* 3. External props specified on the owner component. These should only be used on a root slot.
* 4. External props specified in the `slotProps.*` prop.
* 5. The `className` prop - combined from all the above.
* @param parameters
* @returns
*/
function mergeSlotProps$1(parameters) {
	const { getSlotProps, additionalProps, externalSlotProps, externalForwardedProps, className } = parameters;
	if (!getSlotProps) {
		const joinedClasses = clsx(additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
		const mergedStyle = {
			...additionalProps?.style,
			...externalForwardedProps?.style,
			...externalSlotProps?.style
		};
		const props = {
			...additionalProps,
			...externalForwardedProps,
			...externalSlotProps
		};
		if (joinedClasses.length > 0) props.className = joinedClasses;
		if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
		return {
			props,
			internalRef: void 0
		};
	}
	const eventHandlers = extractEventHandlers({
		...externalForwardedProps,
		...externalSlotProps
	});
	const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
	const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
	const internalSlotProps = getSlotProps(eventHandlers);
	const joinedClasses = clsx(internalSlotProps?.className, additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
	const mergedStyle = {
		...internalSlotProps?.style,
		...additionalProps?.style,
		...externalForwardedProps?.style,
		...externalSlotProps?.style
	};
	const props = {
		...internalSlotProps,
		...additionalProps,
		...otherPropsWithoutEventHandlers,
		...componentsPropsWithoutEventHandlers
	};
	if (joinedClasses.length > 0) props.className = joinedClasses;
	if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
	return {
		props,
		internalRef: internalSlotProps.ref
	};
}
//#endregion
//#region node_modules/@mui/utils/useSlotProps/useSlotProps.mjs
/**
* @ignore - do not document.
* Builds the props to be passed into the slot of an unstyled component.
* It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
* If the slot component is not a host component, it also merges in the `ownerState`.
*
* @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
*/
function useSlotProps(parameters) {
	const { elementType, externalSlotProps, ownerState, skipResolvingSlotProps = false, ...other } = parameters;
	const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
	const { props: mergedProps, internalRef } = mergeSlotProps$1({
		...other,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
	return appendOwnerState(elementType, {
		...mergedProps,
		ref
	}, ownerState);
}
//#endregion
//#region node_modules/@mui/utils/elementAcceptingRef/elementAcceptingRef.mjs
function isClassComponent(elementType) {
	const { prototype = {} } = elementType;
	return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
	const element = props[propName];
	const safePropName = propFullName || propName;
	if (element == null || typeof window === "undefined") return null;
	let warningHint;
	const elementType = element.type;
	/**
	* Blacklisting instead of whitelisting
	*
	* Blacklisting will miss some components, such as React.Fragment. Those will at least
	* trigger a warning in React.
	* We can't whitelist because there is no safe way to detect React.forwardRef
	* or class components. "Safe" means there's no public API.
	*
	*/
	if (typeof elementType === "function" && !isClassComponent(elementType)) warningHint = "Did you accidentally use a plain function component for an element instead?";
	if (warningHint !== void 0) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
	return null;
}
var elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);
//#endregion
//#region node_modules/@mui/utils/getReactElementRef/getReactElementRef.mjs
/**
* Returns the ref of a React element handling differences between React 19 and older versions.
* It will throw runtime error if the element is not a valid React element.
*
* @param element React.ReactElement
* @returns React.Ref<any> | null
*/
function getReactElementRef(element) {
	if (parseInt("19.2.7", 10) >= 19) return element?.props?.ref || null;
	return element?.ref || null;
}
//#endregion
//#region node_modules/@mui/utils/useLazyRef/useLazyRef.mjs
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useLazyRef(sortColumns, columns)
*/
function useLazyRef(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region node_modules/@mui/utils/useValueAsRef/useValueAsRef.mjs
/**
* Copied from `@base-ui/utils/useValueAsRef`.
*
* Stores the latest value in a stable ref. The ref updates after React commits,
* so effects and delayed callbacks can read the current value without depending
* on it and rerunning.
*/
function useValueAsRef(value) {
	const latest = useLazyRef(() => createValueRef(value)).current;
	latest.next = value;
	useEnhancedEffect(latest.effect);
	return latest;
}
function createValueRef(value) {
	const latest = {
		current: value,
		next: value,
		effect: () => {
			latest.current = latest.next;
		}
	};
	return latest;
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroupContext.js
var TransitionGroupContext_default = import_react.createContext(null);
//#endregion
//#region node_modules/@mui/material/internal/Transition.mjs
function resolveTimeouts(timeout) {
	if (timeout == null) return {
		appear: void 0,
		enter: void 0,
		exit: void 0
	};
	if (typeof timeout === "number") return {
		appear: timeout,
		enter: timeout,
		exit: timeout
	};
	const enter = timeout.enter;
	const exit = timeout.exit;
	return {
		appear: timeout.appear !== void 0 ? timeout.appear : enter,
		enter,
		exit
	};
}
/**
* Resolves the authored completion timeout for the current transition phase.
* Auto durations are read by the caller at scheduling time so Grow/Collapse
* can pass the latest measured value without storing it in React state.
*/
function getCompletionTimeout(params) {
	if (params.autoTimeout != null) return params.autoTimeout;
	const resolved = resolveTimeouts(params.timeout);
	if (params.currentStatus === "entering") return params.isAppearing ? resolved.appear ?? resolved.enter ?? null : resolved.enter ?? null;
	return resolved.exit ?? null;
}
function Transition(props) {
	const { in: inProp = false, appear = false, enter = true, exit = true, mountOnEnter = false, unmountOnExit = false, timeout, addEndListener, reduceMotion = false, getAutoTimeout, nodeRef, onEnter, onEntering, onEntered, onExit, onExiting, onExited, children, ...childProps } = props;
	const parentGroup = import_react.useContext(TransitionGroupContext_default);
	const shouldEnterOnMount = parentGroup && !parentGroup.isMounting ? enter : appear;
	const [status, setStatus] = import_react.useState(() => {
		if (inProp) return shouldEnterOnMount ? "exited" : "entered";
		if (mountOnEnter || unmountOnExit) return "unmounted";
		return "exited";
	});
	const statusRef = import_react.useRef(status);
	statusRef.current = status;
	if (inProp && status === "unmounted") {
		statusRef.current = "exited";
		setStatus("exited");
	}
	const shouldAppearOnMountRef = import_react.useRef(inProp && shouldEnterOnMount);
	const mountedRef = import_react.useRef(false);
	const nextCallbackRef = import_react.useRef(null);
	const lastFiredStatusRef = import_react.useRef(status);
	const isAppearingRef = import_react.useRef(false);
	const transitionReduceMotionRef = import_react.useRef(reduceMotion);
	const propsRef = useValueAsRef({
		timeout,
		addEndListener,
		reduceMotion,
		getAutoTimeout,
		onEnter,
		onEntering,
		onEntered,
		onExit,
		onExiting,
		onExited,
		enter,
		exit,
		mountOnEnter,
		unmountOnExit,
		nodeRef,
		parentGroup
	});
	const cancelPendingCallback = import_react.useCallback(() => {
		if (nextCallbackRef.current !== null) {
			nextCallbackRef.current.cancel();
			nextCallbackRef.current = null;
		}
	}, []);
	const makeCallback = import_react.useCallback((handler) => {
		let active = true;
		const wrapped = () => {
			if (active) {
				active = false;
				nextCallbackRef.current = null;
				handler();
			}
		};
		wrapped.cancel = () => {
			active = false;
		};
		nextCallbackRef.current = wrapped;
		return wrapped;
	}, []);
	const scheduleTransitionEnd = import_react.useCallback((nextStatus, currentStatus) => {
		let timeoutId;
		const clearTimer = () => {
			if (timeoutId !== void 0) {
				clearTimeout(timeoutId);
				timeoutId = void 0;
			}
		};
		const done = makeCallback(() => {
			clearTimer();
			statusRef.current = nextStatus;
			setStatus(nextStatus);
		});
		const cancelDone = done.cancel;
		done.cancel = () => {
			clearTimer();
			cancelDone();
		};
		const node = propsRef.current.nodeRef.current;
		const listener = propsRef.current.addEndListener;
		const hasAutoTimeout = propsRef.current.getAutoTimeout !== void 0;
		const autoTimeout = propsRef.current.getAutoTimeout?.();
		const authoredTimeout = getCompletionTimeout({
			currentStatus,
			isAppearing: isAppearingRef.current,
			timeout: propsRef.current.timeout,
			autoTimeout
		});
		const transitionReduceMotion = transitionReduceMotionRef.current;
		const fallbackTimeout = authoredTimeout ?? (transitionReduceMotion && hasAutoTimeout ? 0 : null);
		const scheduleTimer = (value) => {
			timeoutId = setTimeout(done, value);
		};
		if (!node) {
			console.warn([
				"MUI: The transition child does not expose a DOM element.",
				"Make sure the child accepts a ref and forwards it to the underlying DOM element.",
				"The transition animation cannot be observed without a DOM element and will be skipped."
			].join("\n"));
			scheduleTimer(0);
			return;
		}
		if (listener) {
			if (fallbackTimeout != null) scheduleTimer(transitionReduceMotion ? 0 : fallbackTimeout);
			if (listener.length >= 2) listener(node, done);
			else listener(done);
			return;
		}
		scheduleTimer(transitionReduceMotion ? 0 : authoredTimeout ?? 0);
	}, [makeCallback, propsRef]);
	const performEnter = import_react.useCallback((mounting) => {
		const current = propsRef.current;
		const isAppearing = current.parentGroup ? current.parentGroup.isMounting : mounting;
		isAppearingRef.current = isAppearing;
		if (!mounting && !current.enter) {
			statusRef.current = "entered";
			setStatus("entered");
			return;
		}
		transitionReduceMotionRef.current = current.reduceMotion;
		current.onEnter?.(isAppearing);
		statusRef.current = "entering";
		setStatus("entering");
	}, [propsRef]);
	const performExit = import_react.useCallback(() => {
		const current = propsRef.current;
		if (!current.exit) {
			statusRef.current = "exited";
			setStatus("exited");
			return;
		}
		transitionReduceMotionRef.current = current.reduceMotion;
		current.onExit?.();
		statusRef.current = "exiting";
		setStatus("exiting");
	}, [propsRef]);
	const updateStatus = import_react.useCallback((mounting, nextStatus) => {
		cancelPendingCallback();
		if (nextStatus === "entering") {
			const current = propsRef.current;
			if (current.mountOnEnter || current.unmountOnExit) {
				const node = current.nodeRef.current;
				if (node) reflow(node);
			}
			performEnter(mounting);
		} else performExit();
	}, [
		cancelPendingCallback,
		performEnter,
		performExit,
		propsRef
	]);
	useEnhancedEffect(() => {
		mountedRef.current = true;
		if (shouldAppearOnMountRef.current) {
			shouldAppearOnMountRef.current = false;
			updateStatus(true, "entering");
		}
		return () => {
			mountedRef.current = false;
			cancelPendingCallback();
		};
	}, [cancelPendingCallback, updateStatus]);
	useEnhancedEffect(() => {
		if (!mountedRef.current) return;
		const current = statusRef.current;
		if (inProp) {
			if (current !== "entering" && current !== "entered") updateStatus(false, "entering");
		} else if (current === "entering" || current === "entered") updateStatus(false, "exiting");
		else if (current === "exited" && unmountOnExit) {
			statusRef.current = "unmounted";
			setStatus("unmounted");
		}
	}, [
		inProp,
		status,
		unmountOnExit,
		updateStatus
	]);
	useEnhancedEffect(() => {
		if (status === "unmounted" || lastFiredStatusRef.current === "unmounted") {
			lastFiredStatusRef.current = status;
			return;
		}
		if (lastFiredStatusRef.current === status) return;
		lastFiredStatusRef.current = status;
		const current = propsRef.current;
		if (status === "entering") {
			current.onEntering?.(isAppearingRef.current);
			scheduleTransitionEnd("entered", "entering");
		} else if (status === "exiting") {
			current.onExiting?.();
			scheduleTransitionEnd("exited", "exiting");
		} else if (status === "entered") current.onEntered?.(isAppearingRef.current);
		else if (status === "exited") current.onExited?.();
	}, [
		propsRef,
		scheduleTransitionEnd,
		status
	]);
	if (status === "unmounted") return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TransitionGroupContext_default.Provider, {
		value: null,
		children: children(status, childProps)
	});
}
Transition.propTypes = {
	/**
	* @ignore
	*/
	addEndListener: import_prop_types.default.func,
	/**
	* @ignore
	*/
	appear: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	children: import_prop_types.default.func.isRequired,
	/**
	* @ignore
	*/
	enter: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	exit: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	getAutoTimeout: import_prop_types.default.func,
	/**
	* @ignore
	*/
	in: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	mountOnEnter: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	nodeRef: import_prop_types.default.shape({ current: (props, propName) => {
		if (props[propName] == null) return null;
		if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) return /* @__PURE__ */ new Error(`Expected prop '${propName}' to be of type Element`);
		return null;
	} }).isRequired,
	/**
	* @ignore
	*/
	onEnter: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntered: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntering: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExit: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExited: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExiting: import_prop_types.default.func,
	/**
	* @ignore
	*/
	reduceMotion: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	timeout: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})]),
	/**
	* @ignore
	*/
	unmountOnExit: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/transitions/useReducedMotion.mjs
var MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
var REDUCED_MOTION_DURATION = 0;
var REDUCED_MOTION_DELAY = "0ms";
var NOOP$1 = () => {};
var getDefaultSnapshot = () => false;
var getReducedMotionSnapshot = () => true;
var subscribeNoop = () => NOOP$1;
/**
* Subscribes to the OS reduced-motion media query only when the theme mode needs it.
* React 17 reads the media query after mount, matching useMediaQuery's fallback path.
*/
function useReducedMotionMediaQueryOld(enabled) {
	const [queryState, setQueryState] = import_react.useState(() => ({
		enabled,
		matches: enabled ? null : false
	}));
	let matches = queryState.matches;
	if (queryState.enabled !== enabled) {
		matches = null;
		if (!enabled) matches = false;
	}
	useEnhancedEffect(() => {
		const setResolvedMatches = (nextMatches) => {
			setQueryState((previousState) => {
				if (previousState.enabled === enabled && previousState.matches === nextMatches) return previousState;
				return {
					enabled,
					matches: nextMatches
				};
			});
		};
		if (!enabled) {
			if (queryState.enabled) setResolvedMatches(false);
			return;
		}
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
			setResolvedMatches(false);
			return;
		}
		const mediaQueryList = window.matchMedia(MEDIA_QUERY);
		const update = () => {
			setResolvedMatches(mediaQueryList.matches);
		};
		update();
		mediaQueryList.addEventListener("change", update);
		return () => {
			mediaQueryList.removeEventListener("change", update);
		};
	}, [enabled, queryState.enabled]);
	return matches;
}
var maybeReactUseSyncExternalStore = { ...import_react }.useSyncExternalStore;
/**
* React 18+ can read the media query during client renders, so newly mounted
* transitions do not start from the SSR-safe reduced-motion default.
*/
function useReducedMotionMediaQueryNew(enabled) {
	const getServerSnapshot = enabled ? getReducedMotionSnapshot : getDefaultSnapshot;
	const [getSnapshot, subscribe] = import_react.useMemo(() => {
		if (!enabled || typeof window === "undefined" || typeof window.matchMedia !== "function") return [getDefaultSnapshot, subscribeNoop];
		const mediaQueryList = window.matchMedia(MEDIA_QUERY);
		return [() => mediaQueryList.matches, (notify) => {
			mediaQueryList.addEventListener("change", notify);
			return () => {
				mediaQueryList.removeEventListener("change", notify);
			};
		}];
	}, [enabled]);
	return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
var useReducedMotionMediaQuery = maybeReactUseSyncExternalStore !== void 0 ? useReducedMotionMediaQueryNew : useReducedMotionMediaQueryOld;
/**
* Resolves whether a Material UI transition should reduce motion and provides
* adjusted CSS transition timing for MUI-owned duration/delay values.
*/
function useReducedMotion(mode, disablePrefersReducedMotion) {
	const prefersReducedMotion = useReducedMotionMediaQuery(!disablePrefersReducedMotion && mode === "system");
	const shouldReduceMotion = !disablePrefersReducedMotion && (mode === "always" || mode === "system" && prefersReducedMotion !== false);
	return import_react.useMemo(() => ({
		shouldReduceMotion,
		getTransitionTiming(timing) {
			if (!shouldReduceMotion) return timing;
			return {
				duration: REDUCED_MOTION_DURATION,
				delay: REDUCED_MOTION_DELAY
			};
		}
	}), [shouldReduceMotion]);
}
//#endregion
//#region node_modules/@mui/material/Grow/Grow.mjs
function getScale(value) {
	return `scale(${value}, ${value ** 2})`;
}
var styles$1 = {
	entering: {
		opacity: 1,
		transform: getScale(1)
	},
	entered: {
		opacity: 1,
		transform: "none"
	},
	exiting: {
		opacity: 0,
		transform: getScale(.75)
	},
	exited: {
		opacity: 0,
		transform: getScale(.75)
	}
};
var hiddenStyles$1 = {
	opacity: 0,
	transform: getScale(.75),
	visibility: "hidden"
};
/**
* The Grow transition is used by the [Tooltip](/material-ui/react-tooltip/) and
* [Popover](/material-ui/react-popover/) components.
*/
var Grow = /*#__PURE__*/ import_react.forwardRef(function Grow(props, ref) {
	const { addEndListener, appear = true, children, disablePrefersReducedMotion = false, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = "auto", ...other } = props;
	const autoTimeout = import_react.useRef(null);
	const theme = useTheme();
	const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);
	const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
		if (!reducedMotion.shouldReduceMotion) reflow(node);
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		let duration;
		if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
			duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
			autoTimeout.current = duration;
		} else {
			duration = transitionDuration;
			autoTimeout.current = null;
		}
		const transitionTiming = reducedMotion.getTransitionTiming({
			duration,
			delay
		});
		node.style.transition = [theme.transitions.create("opacity", {
			duration: transitionTiming.duration,
			delay: transitionTiming.delay
		}), theme.transitions.create("transform", {
			duration: typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * .666,
			delay: transitionTiming.delay,
			easing: transitionTimingFunction
		})].join(",");
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);
	const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Transition, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: normalizedTransitionCallback(nodeRef, (node) => {
			const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
				style,
				timeout,
				easing
			}, { mode: "exit" });
			let duration;
			if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
				duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
				autoTimeout.current = duration;
			} else {
				duration = transitionDuration;
				autoTimeout.current = null;
			}
			const transitionTiming = reducedMotion.getTransitionTiming({
				duration,
				delay
			});
			node.style.transition = [theme.transitions.create("opacity", {
				duration: transitionTiming.duration,
				delay: transitionTiming.delay
			}), theme.transitions.create("transform", {
				duration: typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * .666,
				delay: transitionTiming.delay || (typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * .333),
				easing: transitionTimingFunction
			})].join(",");
			node.style.opacity = 0;
			node.style.transform = getScale(.75);
			if (onExit) onExit(node);
		}),
		onExited: normalizedTransitionCallback(nodeRef, (node) => {
			node.style.transition = "";
			if (onExited) onExited(node);
		}),
		onExiting: handleExiting,
		addEndListener: addEndListener ? (next) => {
			addEndListener(nodeRef.current, next);
		} : void 0,
		getAutoTimeout: timeout === "auto" ? () => autoTimeout.current : void 0,
		reduceMotion: reducedMotion.shouldReduceMotion,
		timeout: timeout === "auto" ? null : timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			const childStyle = getTransitionChildStyle(state, inProp, styles$1, hiddenStyles$1, style, children.props.style);
			return /*#__PURE__*/ import_react.cloneElement(children, {
				style: childStyle,
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
Grow.propTypes = {
	/**
	* Add a custom transition end trigger.
	* Use it when you need custom logic to decide when the transition has ended.
	* Note: Timeouts are still used as a fallback if provided.
	*
	* @param {HTMLElement} node The transitioning DOM node.
	* @param {Function} done Call this when the transition has finished.
	*/
	addEndListener: import_prop_types.default.func,
	/**
	* Perform the enter transition when it first mounts if `in` is also `true`.
	* Set this to `false` to disable this behavior.
	* @default true
	*/
	appear: import_prop_types.default.bool,
	/**
	* A single child content element.
	*/
	children: elementAcceptingRef.isRequired,
	/**
	* If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
	* @default false
	*/
	disablePrefersReducedMotion: import_prop_types.default.bool,
	/**
	* The transition timing function.
	* You may specify a single easing or a object containing enter and exit values.
	*/
	easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string
	}), import_prop_types.default.string]),
	/**
	* If `true`, the component will transition in.
	*/
	in: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onEnter: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntered: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntering: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExit: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExited: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExiting: import_prop_types.default.func,
	/**
	* @ignore
	*/
	style: import_prop_types.default.object,
	/**
	* The duration for the transition, in milliseconds.
	* You may specify a single timeout for all transitions, or individually with an object.
	*
	* Set to 'auto' to automatically calculate transition time based on height.
	* @default 'auto'
	*/
	timeout: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.number,
		import_prop_types.default.shape({
			appear: import_prop_types.default.number,
			enter: import_prop_types.default.number,
			exit: import_prop_types.default.number
		})
	])
};
if (Grow) Grow.muiSupportAuto = true;
//#endregion
//#region node_modules/@mui/material/Fade/Fade.mjs
var styles = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 }
};
var hiddenStyles = {
	opacity: 0,
	visibility: "hidden"
};
/**
* The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
*/
var Fade = /*#__PURE__*/ import_react.forwardRef(function Fade(props, ref) {
	const theme = useTheme();
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, disablePrefersReducedMotion = false, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = defaultTimeout, ...other } = props;
	const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);
	const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
		if (!reducedMotion.shouldReduceMotion) reflow(node);
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		const transitionTiming = reducedMotion.getTransitionTiming({
			duration: transitionProps.duration,
			delay: transitionProps.delay
		});
		node.style.transition = theme.transitions.create("opacity", {
			duration: transitionTiming.duration,
			easing: transitionProps.easing,
			delay: transitionTiming.delay
		});
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);
	const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Transition, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: normalizedTransitionCallback(nodeRef, (node) => {
			const transitionProps = getTransitionProps({
				style,
				timeout,
				easing
			}, { mode: "exit" });
			const transitionTiming = reducedMotion.getTransitionTiming({
				duration: transitionProps.duration,
				delay: transitionProps.delay
			});
			node.style.transition = theme.transitions.create("opacity", {
				duration: transitionTiming.duration,
				easing: transitionProps.easing,
				delay: transitionTiming.delay
			});
			if (onExit) onExit(node);
		}),
		onExited: normalizedTransitionCallback(nodeRef, (node) => {
			node.style.transition = "";
			if (onExited) onExited(node);
		}),
		onExiting: handleExiting,
		addEndListener: addEndListener ? (next) => {
			addEndListener(nodeRef.current, next);
		} : void 0,
		reduceMotion: reducedMotion.shouldReduceMotion,
		timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			const childStyle = getTransitionChildStyle(state, inProp, styles, hiddenStyles, style, children.props.style);
			return /*#__PURE__*/ import_react.cloneElement(children, {
				style: childStyle,
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
Fade.propTypes = {
	/**
	* Add a custom transition end trigger.
	* Use it when you need custom logic to decide when the transition has ended.
	* Note: Timeouts are still used as a fallback if provided.
	*
	* @param {HTMLElement} node The transitioning DOM node.
	* @param {Function} done Call this when the transition has finished.
	*/
	addEndListener: import_prop_types.default.func,
	/**
	* Perform the enter transition when it first mounts if `in` is also `true`.
	* Set this to `false` to disable this behavior.
	* @default true
	*/
	appear: import_prop_types.default.bool,
	/**
	* A single child content element.
	*/
	children: elementAcceptingRef.isRequired,
	/**
	* If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
	* @default false
	*/
	disablePrefersReducedMotion: import_prop_types.default.bool,
	/**
	* The transition timing function.
	* You may specify a single easing or a object containing enter and exit values.
	*/
	easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string
	}), import_prop_types.default.string]),
	/**
	* If `true`, the component will transition in.
	*/
	in: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onEnter: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntered: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onEntering: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExit: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExited: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onExiting: import_prop_types.default.func,
	/**
	* @ignore
	*/
	style: import_prop_types.default.object,
	/**
	* The duration for the transition, in milliseconds.
	* You may specify a single timeout for all transitions, or individually with an object.
	* @default {
	*   enter: theme.transitions.duration.enteringScreen,
	*   exit: theme.transitions.duration.leavingScreen,
	* }
	*/
	timeout: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})])
};
//#endregion
//#region node_modules/@mui/utils/integerPropType/integerPropType.mjs
function getTypeByValue(value) {
	const valueType = typeof value;
	switch (valueType) {
		case "number":
			if (Number.isNaN(value)) return "NaN";
			if (!Number.isFinite(value)) return "Infinity";
			if (value !== Math.floor(value)) return "float";
			return "number";
		case "object":
			if (value === null) return "null";
			return value.constructor.name;
		default: return valueType;
	}
}
function requiredInteger(props, propName, componentName, location) {
	const propValue = props[propName];
	if (propValue == null || !Number.isInteger(propValue)) {
		const propType = getTypeByValue(propValue);
		return /* @__PURE__ */ new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
	}
	return null;
}
function validator(props, propName, componentName, location) {
	if (props[propName] === void 0) return null;
	return requiredInteger(props, propName, componentName, location);
}
function validatorNoop() {
	return null;
}
validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
var integerPropType = validator;
//#endregion
//#region node_modules/@mui/material/Paper/paperClasses.mjs
function getPaperUtilityClass(slot) {
	return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", [
	"root",
	"rounded",
	"outlined",
	"elevation",
	"elevation0",
	"elevation1",
	"elevation2",
	"elevation3",
	"elevation4",
	"elevation5",
	"elevation6",
	"elevation7",
	"elevation8",
	"elevation9",
	"elevation10",
	"elevation11",
	"elevation12",
	"elevation13",
	"elevation14",
	"elevation15",
	"elevation16",
	"elevation17",
	"elevation18",
	"elevation19",
	"elevation20",
	"elevation21",
	"elevation22",
	"elevation23",
	"elevation24"
]);
//#endregion
//#region node_modules/@mui/material/Paper/Paper.mjs
var useUtilityClasses$30 = (ownerState) => {
	const { square, elevation, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		!square && "rounded",
		variant === "elevation" && `elevation${elevation}`
	] }, getPaperUtilityClass, classes);
};
var PaperRoot = styled("div", {
	name: "MuiPaper",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			!ownerState.square && styles.rounded,
			ownerState.variant === "elevation" && styles[`elevation${ownerState.elevation}`]
		];
	}
})(memoTheme(({ theme }) => ({
	backgroundColor: (theme.vars || theme).palette.background.paper,
	color: (theme.vars || theme).palette.text.primary,
	...getTransitionStyles(theme, "box-shadow"),
	variants: [
		{
			props: ({ ownerState }) => !ownerState.square,
			style: { borderRadius: theme.shape.borderRadius }
		},
		{
			props: { variant: "outlined" },
			style: { border: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: { variant: "elevation" },
			style: {
				boxShadow: "var(--Paper-shadow)",
				backgroundImage: "var(--Paper-overlay)"
			}
		}
	]
})));
var Paper = /*#__PURE__*/ import_react.forwardRef(function Paper(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPaper"
	});
	const theme = useTheme();
	const { className, component = "div", elevation = 1, square = false, variant = "elevation", ...other } = props;
	const ownerState = {
		...props,
		component,
		elevation,
		square,
		variant
	};
	const classes = useUtilityClasses$30(ownerState);
	if (theme.shadows[elevation] === void 0) console.error([`MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join("\n"));
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PaperRoot, {
		as: component,
		ownerState,
		className: clsx(classes.root, className),
		ref,
		...other,
		style: {
			...variant === "elevation" && {
				"--Paper-shadow": (theme.vars || theme).shadows[elevation],
				...theme.vars && { "--Paper-overlay": theme.vars.overlays?.[elevation] },
				...!theme.vars && theme.palette.mode === "dark" && { "--Paper-overlay": `linear-gradient(${alpha("#fff", getOverlayAlpha(elevation))}, ${alpha("#fff", getOverlayAlpha(elevation))})` }
			},
			...other.style
		}
	});
});
Paper.propTypes = {
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
	* Shadow depth, corresponds to `dp` in the spec.
	* It accepts values between 0 and 24 inclusive.
	* @default 1
	*/
	elevation: chainPropTypes(integerPropType, (props) => {
		const { elevation, variant } = props;
		if (elevation > 0 && variant === "outlined") return /* @__PURE__ */ new Error(`MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
		return null;
	}),
	/**
	* If `true`, rounded corners are disabled.
	* @default false
	*/
	square: import_prop_types.default.bool,
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
	]),
	/**
	* The variant to use.
	* @default 'elevation'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["elevation", "outlined"]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/utils/HTMLElementType/HTMLElementType.mjs
function HTMLElementType(props, propName, componentName, location, propFullName) {
	const propValue = props[propName];
	const safePropName = propFullName || propName;
	if (propValue == null) return null;
	if (propValue && propValue.nodeType !== 1) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
	return null;
}
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [
	"top",
	bottom,
	right,
	left
];
var start = "start";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function(acc, placement) {
	return acc.concat([placement + "-" + start, placement + "-end"]);
}, []);
var placements = /*#__PURE__*/ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
	return acc.concat([
		placement,
		placement + "-" + start,
		placement + "-end"
	]);
}, []);
var modifierPhases = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
	return element ? (element.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
	if (node == null) return window;
	if (node.toString() !== "[object Window]") {
		var ownerDocument = node.ownerDocument;
		return ownerDocument ? ownerDocument.defaultView || window : window;
	}
	return node;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
	return node instanceof getWindow(node).Element || node instanceof Element;
}
function isHTMLElement$1(node) {
	return node instanceof getWindow(node).HTMLElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
	if (typeof ShadowRoot === "undefined") return false;
	return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
	var state = _ref.state;
	Object.keys(state.elements).forEach(function(name) {
		var style = state.styles[name] || {};
		var attributes = state.attributes[name] || {};
		var element = state.elements[name];
		if (!isHTMLElement$1(element) || !getNodeName(element)) return;
		Object.assign(element.style, style);
		Object.keys(attributes).forEach(function(name) {
			var value = attributes[name];
			if (value === false) element.removeAttribute(name);
			else element.setAttribute(name, value === true ? "" : value);
		});
	});
}
function effect$2(_ref2) {
	var state = _ref2.state;
	var initialStyles = {
		popper: {
			position: state.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(state.elements.popper.style, initialStyles.popper);
	state.styles = initialStyles;
	if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
	return function() {
		Object.keys(state.elements).forEach(function(name) {
			var element = state.elements[name];
			var attributes = state.attributes[name] || {};
			var style = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]).reduce(function(style, property) {
				style[property] = "";
				return style;
			}, {});
			if (!isHTMLElement$1(element) || !getNodeName(element)) return;
			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(attribute) {
				element.removeAttribute(attribute);
			});
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: true,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
	return placement.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round$1 = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
	var uaData = navigator.userAgentData;
	if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map(function(item) {
		return item.brand + "/" + item.version;
	}).join(" ");
	return navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	var clientRect = element.getBoundingClientRect();
	var scaleX = 1;
	var scaleY = 1;
	if (includeScale && isHTMLElement$1(element)) {
		scaleX = element.offsetWidth > 0 ? round$1(clientRect.width) / element.offsetWidth || 1 : 1;
		scaleY = element.offsetHeight > 0 ? round$1(clientRect.height) / element.offsetHeight || 1 : 1;
	}
	var visualViewport = (isElement(element) ? getWindow(element) : window).visualViewport;
	var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	var width = clientRect.width / scaleX;
	var height = clientRect.height / scaleY;
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
	var clientRect = getBoundingClientRect(element);
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
	if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width,
		height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains$1(parent, child) {
	var rootNode = child.getRootNode && child.getRootNode();
	if (parent.contains(child)) return true;
	else if (rootNode && isShadowRoot(rootNode)) {
		var next = child;
		do {
			if (next && parent.isSameNode(next)) return true;
			next = next.parentNode || next.host;
		} while (next);
	}
	return false;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
	return getWindow(element).getComputedStyle(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(element)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
	return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
	if (getNodeName(element) === "html") return element;
	return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
	if (!isHTMLElement$1(element) || getComputedStyle(element).position === "fixed") return null;
	return element.offsetParent;
}
function getContainingBlock(element) {
	var isFirefox = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement$1(element)) {
		if (getComputedStyle(element).position === "fixed") return null;
	}
	var currentNode = getParentNode(element);
	if (isShadowRoot(currentNode)) currentNode = currentNode.host;
	while (isHTMLElement$1(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
		var css = getComputedStyle(currentNode);
		if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
		else currentNode = currentNode.parentNode;
	}
	return null;
}
function getOffsetParent(element) {
	var window = getWindow(element);
	var offsetParent = getTrueOffsetParent(element);
	while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
	if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) return window;
	return offsetParent || getContainingBlock(element) || window;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
	return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function within(min$2, value, max$2) {
	return max(min$2, min(value, max$2));
}
function withinMaxClamp(min, value, max) {
	var v = within(min, value, max);
	return v > max ? max : v;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
	return Object.assign({}, getFreshSideObject(), paddingObject);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
	return keys.reduce(function(hashMap, key) {
		hashMap[key] = value;
		return hashMap;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject(padding, state) {
	padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, { placement: state.placement })) : padding;
	return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
	var _state$modifiersData$;
	var state = _ref.state, name = _ref.name, options = _ref.options;
	var arrowElement = state.elements.arrow;
	var popperOffsets = state.modifiersData.popperOffsets;
	var basePlacement = getBasePlacement(state.placement);
	var axis = getMainAxisFromPlacement(basePlacement);
	var len = ["left", "right"].indexOf(basePlacement) >= 0 ? "height" : "width";
	if (!arrowElement || !popperOffsets) return;
	var paddingObject = toPaddingObject(options.padding, state);
	var arrowRect = getLayoutRect(arrowElement);
	var minProp = axis === "y" ? "top" : left;
	var maxProp = axis === "y" ? bottom : right;
	var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	var arrowOffsetParent = getOffsetParent(arrowElement);
	var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	var centerToReference = endDiff / 2 - startDiff / 2;
	var min = paddingObject[minProp];
	var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	var offset = within(min, center, max);
	var axisProp = axis;
	state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
	var state = _ref2.state;
	var _options$element = _ref2.options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
	if (arrowElement == null) return;
	if (typeof arrowElement === "string") {
		arrowElement = state.elements.popper.querySelector(arrowElement);
		if (!arrowElement) return;
	}
	if (!contains$1(state.elements.popper, arrowElement)) return;
	state.elements.arrow = arrowElement;
}
var arrow_default = {
	name: "arrow",
	enabled: true,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
	return placement.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
	var x = _ref.x, y = _ref.y;
	var dpr = win.devicePixelRatio || 1;
	return {
		x: round$1(x * dpr) / dpr || 0,
		y: round$1(y * dpr) / dpr || 0
	};
}
function mapToStyles(_ref2) {
	var _Object$assign2;
	var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
	var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
	var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
		x,
		y
	}) : {
		x,
		y
	};
	x = _ref3.x;
	y = _ref3.y;
	var hasX = offsets.hasOwnProperty("x");
	var hasY = offsets.hasOwnProperty("y");
	var sideX = left;
	var sideY = "top";
	var win = window;
	if (adaptive) {
		var offsetParent = getOffsetParent(popper);
		var heightProp = "clientHeight";
		var widthProp = "clientWidth";
		if (offsetParent === getWindow(popper)) {
			offsetParent = getDocumentElement(popper);
			if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
				heightProp = "scrollHeight";
				widthProp = "scrollWidth";
			}
		}
		offsetParent = offsetParent;
		if (placement === "top" || (placement === "left" || placement === "right") && variation === "end") {
			sideY = bottom;
			var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
			y -= offsetY - popperRect.height;
			y *= gpuAcceleration ? 1 : -1;
		}
		if (placement === "left" || (placement === "top" || placement === "bottom") && variation === "end") {
			sideX = right;
			var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
			x -= offsetX - popperRect.width;
			x *= gpuAcceleration ? 1 : -1;
		}
	}
	var commonStyles = Object.assign({ position }, adaptive && unsetSides);
	var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
		x,
		y
	}, getWindow(popper)) : {
		x,
		y
	};
	x = _ref4.x;
	y = _ref4.y;
	if (gpuAcceleration) {
		var _Object$assign;
		return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	}
	return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
	var state = _ref5.state, options = _ref5.options;
	var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	var commonStyles = {
		placement: getBasePlacement(state.placement),
		variation: getVariation(state.placement),
		popper: state.elements.popper,
		popperRect: state.rects.popper,
		gpuAcceleration,
		isFixed: state.options.strategy === "fixed"
	};
	if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.popperOffsets,
		position: state.options.strategy,
		adaptive,
		roundOffsets
	})));
	if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.arrow,
		position: "absolute",
		adaptive: false,
		roundOffsets
	})));
	state.attributes.popper = Object.assign({}, state.attributes.popper, { "data-popper-placement": state.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: true,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = { passive: true };
function effect(_ref) {
	var state = _ref.state, instance = _ref.instance, options = _ref.options;
	var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
	var window = getWindow(state.elements.popper);
	var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	if (scroll) scrollParents.forEach(function(scrollParent) {
		scrollParent.addEventListener("scroll", instance.update, passive);
	});
	if (resize) window.addEventListener("resize", instance.update, passive);
	return function() {
		if (scroll) scrollParents.forEach(function(scrollParent) {
			scrollParent.removeEventListener("scroll", instance.update, passive);
		});
		if (resize) window.removeEventListener("resize", instance.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: true,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, function(matched) {
		return hash$1[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(placement) {
	return placement.replace(/start|end/g, function(matched) {
		return hash[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
	var win = getWindow(node);
	return {
		scrollLeft: win.pageXOffset,
		scrollTop: win.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
	return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
	var win = getWindow(element);
	var html = getDocumentElement(element);
	var visualViewport = win.visualViewport;
	var width = html.clientWidth;
	var height = html.clientHeight;
	var x = 0;
	var y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		var layoutViewport = isLayoutViewport();
		if (layoutViewport || !layoutViewport && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x: x + getWindowScrollBarX(element),
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
	var _element$ownerDocumen;
	var html = getDocumentElement(element);
	var winScroll = getWindowScroll(element);
	var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	var y = -winScroll.scrollTop;
	if (getComputedStyle(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	return {
		width,
		height,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
	var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
	if ([
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
	if (isHTMLElement$1(node) && isScrollParent(node)) return node;
	return getScrollParent(getParentNode(node));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
	var _element$ownerDocumen;
	if (list === void 0) list = [];
	var scrollParent = getScrollParent(element);
	var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	var win = getWindow(scrollParent);
	var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	var updatedList = list.concat(target);
	return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
	return Object.assign({}, rect, {
		left: rect.x,
		top: rect.y,
		right: rect.x + rect.width,
		bottom: rect.y + rect.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
	var rect = getBoundingClientRect(element, false, strategy === "fixed");
	rect.top = rect.top + element.clientTop;
	rect.left = rect.left + element.clientLeft;
	rect.bottom = rect.top + element.clientHeight;
	rect.right = rect.left + element.clientWidth;
	rect.width = element.clientWidth;
	rect.height = element.clientHeight;
	rect.x = rect.left;
	rect.y = rect.top;
	return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
	return clippingParent === "viewport" ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
	var clippingParents = listScrollParents(getParentNode(element));
	var clipperElement = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0 && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	if (!isElement(clipperElement)) return [];
	return clippingParents.filter(function(clippingParent) {
		return isElement(clippingParent) && contains$1(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
	});
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
	var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
	var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	var firstClippingParent = clippingParents[0];
	var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
		var rect = getClientRectFromMixedType(element, clippingParent, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromMixedType(element, firstClippingParent, strategy));
	clippingRect.width = clippingRect.right - clippingRect.left;
	clippingRect.height = clippingRect.bottom - clippingRect.top;
	clippingRect.x = clippingRect.left;
	clippingRect.y = clippingRect.top;
	return clippingRect;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
	var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
	var basePlacement = placement ? getBasePlacement(placement) : null;
	var variation = placement ? getVariation(placement) : null;
	var commonX = reference.x + reference.width / 2 - element.width / 2;
	var commonY = reference.y + reference.height / 2 - element.height / 2;
	var offsets;
	switch (basePlacement) {
		case "top":
			offsets = {
				x: commonX,
				y: reference.y - element.height
			};
			break;
		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY
			};
			break;
		default: offsets = {
			x: reference.x,
			y: reference.y
		};
	}
	var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	if (mainAxis != null) {
		var len = mainAxis === "y" ? "height" : "width";
		switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;
			case "end":
				offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
				break;
			default:
		}
	}
	return offsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
	if (options === void 0) options = {};
	var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
	var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
	var altContext = elementContext === "popper" ? reference : popper;
	var popperRect = state.rects.popper;
	var element = state.elements[altBoundary ? altContext : elementContext];
	var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	var referenceClientRect = getBoundingClientRect(state.elements.reference);
	var popperOffsets = computeOffsets({
		reference: referenceClientRect,
		element: popperRect,
		strategy: "absolute",
		placement
	});
	var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	var elementClientRect = elementContext === "popper" ? popperClientRect : referenceClientRect;
	var overflowOffsets = {
		top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
		bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
		left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
		right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	};
	var offsetData = state.modifiersData.offset;
	if (elementContext === "popper" && offsetData) {
		var offset = offsetData[placement];
		Object.keys(overflowOffsets).forEach(function(key) {
			var multiply = ["right", "bottom"].indexOf(key) >= 0 ? 1 : -1;
			var axis = ["top", "bottom"].indexOf(key) >= 0 ? "y" : "x";
			overflowOffsets[key] += offset[axis] * multiply;
		});
	}
	return overflowOffsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
	if (options === void 0) options = {};
	var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	var variation = getVariation(placement);
	var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
		return getVariation(placement) === variation;
	}) : basePlacements;
	var allowedPlacements = placements$1.filter(function(placement) {
		return allowedAutoPlacements.indexOf(placement) >= 0;
	});
	if (allowedPlacements.length === 0) allowedPlacements = placements$1;
	var overflows = allowedPlacements.reduce(function(acc, placement) {
		acc[placement] = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			padding
		})[getBasePlacement(placement)];
		return acc;
	}, {});
	return Object.keys(overflows).sort(function(a, b) {
		return overflows[a] - overflows[b];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
	if (getBasePlacement(placement) === "auto") return [];
	var oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeVariationPlacement(placement),
		oppositePlacement,
		getOppositeVariationPlacement(oppositePlacement)
	];
}
function flip(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	if (state.modifiersData[name]._skip) return;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
	var preferredPlacement = state.options.placement;
	var isBasePlacement = getBasePlacement(preferredPlacement) === preferredPlacement;
	var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
		return acc.concat(getBasePlacement(placement) === "auto" ? computeAutoPlacement(state, {
			placement,
			boundary,
			rootBoundary,
			padding,
			flipVariations,
			allowedAutoPlacements
		}) : placement);
	}, []);
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var checksMap = /* @__PURE__ */ new Map();
	var makeFallbackChecks = true;
	var firstFittingPlacement = placements[0];
	for (var i = 0; i < placements.length; i++) {
		var placement = placements[i];
		var _basePlacement = getBasePlacement(placement);
		var isStartVariation = getVariation(placement) === start;
		var isVertical = ["top", bottom].indexOf(_basePlacement) >= 0;
		var len = isVertical ? "width" : "height";
		var overflow = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			altBoundary,
			padding
		});
		var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : "top";
		if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
		var altVariationSide = getOppositePlacement(mainVariationSide);
		var checks = [];
		if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
		if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
		if (checks.every(function(check) {
			return check;
		})) {
			firstFittingPlacement = placement;
			makeFallbackChecks = false;
			break;
		}
		checksMap.set(placement, checks);
	}
	if (makeFallbackChecks) {
		var numberOfChecks = flipVariations ? 3 : 1;
		var _loop = function _loop(_i) {
			var fittingPlacement = placements.find(function(placement) {
				var checks = checksMap.get(placement);
				if (checks) return checks.slice(0, _i).every(function(check) {
					return check;
				});
			});
			if (fittingPlacement) {
				firstFittingPlacement = fittingPlacement;
				return "break";
			}
		};
		for (var _i = numberOfChecks; _i > 0; _i--) if (_loop(_i) === "break") break;
	}
	if (state.placement !== firstFittingPlacement) {
		state.modifiersData[name]._skip = true;
		state.placement = firstFittingPlacement;
		state.reset = true;
	}
}
var flip_default = {
	name: "flip",
	enabled: true,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: false }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
	if (preventedOffsets === void 0) preventedOffsets = {
		x: 0,
		y: 0
	};
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x
	};
}
function isAnySideFullyClipped(overflow) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(side) {
		return overflow[side] >= 0;
	});
}
function hide(_ref) {
	var state = _ref.state, name = _ref.name;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var preventedOffsets = state.modifiersData.preventOverflow;
	var referenceOverflow = detectOverflow(state, { elementContext: "reference" });
	var popperAltOverflow = detectOverflow(state, { altBoundary: true });
	var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped
	};
	state.attributes.popper = Object.assign({}, state.attributes.popper, {
		"data-popper-reference-hidden": isReferenceHidden,
		"data-popper-escaped": hasPopperEscaped
	});
}
var hide_default = {
	name: "hide",
	enabled: true,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset) {
	var basePlacement = getBasePlacement(placement);
	var invertDistance = ["left", "top"].indexOf(basePlacement) >= 0 ? -1 : 1;
	var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, { placement })) : offset, skidding = _ref[0], distance = _ref[1];
	skidding = skidding || 0;
	distance = (distance || 0) * invertDistance;
	return ["left", "right"].indexOf(basePlacement) >= 0 ? {
		x: distance,
		y: skidding
	} : {
		x: skidding,
		y: distance
	};
}
function offset(_ref2) {
	var state = _ref2.state, options = _ref2.options, name = _ref2.name;
	var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	var data = placements.reduce(function(acc, placement) {
		acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
		return acc;
	}, {});
	var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
	if (state.modifiersData.popperOffsets != null) {
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}
	state.modifiersData[name] = data;
}
var offset_default = {
	name: "offset",
	enabled: true,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
	var state = _ref.state, name = _ref.name;
	state.modifiersData[name] = computeOffsets({
		reference: state.rects.reference,
		element: state.rects.popper,
		strategy: "absolute",
		placement: state.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: true,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
	return axis === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	var overflow = detectOverflow(state, {
		boundary,
		rootBoundary,
		padding,
		altBoundary
	});
	var basePlacement = getBasePlacement(state.placement);
	var variation = getVariation(state.placement);
	var isBasePlacement = !variation;
	var mainAxis = getMainAxisFromPlacement(basePlacement);
	var altAxis = getAltAxis(mainAxis);
	var popperOffsets = state.modifiersData.popperOffsets;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, { placement: state.placement })) : tetherOffset;
	var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
		mainAxis: tetherOffsetValue,
		altAxis: tetherOffsetValue
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, tetherOffsetValue);
	var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	var data = {
		x: 0,
		y: 0
	};
	if (!popperOffsets) return;
	if (checkMainAxis) {
		var _offsetModifierState$;
		var mainSide = mainAxis === "y" ? "top" : left;
		var altSide = mainAxis === "y" ? bottom : right;
		var len = mainAxis === "y" ? "height" : "width";
		var offset = popperOffsets[mainAxis];
		var min$1 = offset + overflow[mainSide];
		var max$1 = offset - overflow[altSide];
		var additive = tether ? -popperRect[len] / 2 : 0;
		var minLen = variation === "start" ? referenceRect[len] : popperRect[len];
		var maxLen = variation === "start" ? -popperRect[len] : -referenceRect[len];
		var arrowElement = state.elements.arrow;
		var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
			width: 0,
			height: 0
		};
		var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
		var arrowPaddingMin = arrowPaddingObject[mainSide];
		var arrowPaddingMax = arrowPaddingObject[altSide];
		var arrowLen = within(0, referenceRect[len], arrowRect[len]);
		var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
		var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
		var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
		var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
		var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
		var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
		var tetherMax = offset + maxOffset - offsetModifierValue;
		var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
		popperOffsets[mainAxis] = preventedOffset;
		data[mainAxis] = preventedOffset - offset;
	}
	if (checkAltAxis) {
		var _offsetModifierState$2;
		var _mainSide = mainAxis === "x" ? "top" : left;
		var _altSide = mainAxis === "x" ? bottom : right;
		var _offset = popperOffsets[altAxis];
		var _len = altAxis === "y" ? "height" : "width";
		var _min = _offset + overflow[_mainSide];
		var _max = _offset - overflow[_altSide];
		var isOriginSide = ["top", left].indexOf(basePlacement) !== -1;
		var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
		var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
		var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
		var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
		popperOffsets[altAxis] = _preventedOffset;
		data[altAxis] = _preventedOffset - _offset;
	}
	state.modifiersData[name] = data;
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: true,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
	return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
	if (node === getWindow(node) || !isHTMLElement$1(node)) return getWindowScroll(node);
	else return getHTMLElementScroll(node);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
	var rect = element.getBoundingClientRect();
	var scaleX = round$1(rect.width) / element.offsetWidth || 1;
	var scaleY = round$1(rect.height) / element.offsetHeight || 1;
	return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	if (isFixed === void 0) isFixed = false;
	var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	var documentElement = getDocumentElement(offsetParent);
	var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	var scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	var offsets = {
		x: 0,
		y: 0
	};
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement$1(offsetParent)) {
			offsets = getBoundingClientRect(offsetParent, true);
			offsets.x += offsetParent.clientLeft;
			offsets.y += offsetParent.clientTop;
		} else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
	}
	return {
		x: rect.left + scroll.scrollLeft - offsets.x,
		y: rect.top + scroll.scrollTop - offsets.y,
		width: rect.width,
		height: rect.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
	var map = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var result = [];
	modifiers.forEach(function(modifier) {
		map.set(modifier.name, modifier);
	});
	function sort(modifier) {
		visited.add(modifier.name);
		[].concat(modifier.requires || [], modifier.requiresIfExists || []).forEach(function(dep) {
			if (!visited.has(dep)) {
				var depModifier = map.get(dep);
				if (depModifier) sort(depModifier);
			}
		});
		result.push(modifier);
	}
	modifiers.forEach(function(modifier) {
		if (!visited.has(modifier.name)) sort(modifier);
	});
	return result;
}
function orderModifiers(modifiers) {
	var orderedModifiers = order(modifiers);
	return modifierPhases.reduce(function(acc, phase) {
		return acc.concat(orderedModifiers.filter(function(modifier) {
			return modifier.phase === phase;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
	var pending;
	return function() {
		if (!pending) pending = new Promise(function(resolve) {
			Promise.resolve().then(function() {
				pending = void 0;
				resolve(fn());
			});
		});
		return pending;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
	var merged = modifiers.reduce(function(merged, current) {
		var existing = merged[current.name];
		merged[current.name] = existing ? Object.assign({}, existing, current, {
			options: Object.assign({}, existing.options, current.options),
			data: Object.assign({}, existing.data, current.data)
		}) : current;
		return merged;
	}, {});
	return Object.keys(merged).map(function(key) {
		return merged[key];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return !args.some(function(element) {
		return !(element && typeof element.getBoundingClientRect === "function");
	});
}
function popperGenerator(generatorOptions) {
	if (generatorOptions === void 0) generatorOptions = {};
	var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	return function createPopper(reference, popper, options) {
		if (options === void 0) options = defaultOptions;
		var state = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
			modifiersData: {},
			elements: {
				reference,
				popper
			},
			attributes: {},
			styles: {}
		};
		var effectCleanupFns = [];
		var isDestroyed = false;
		var instance = {
			state,
			setOptions: function setOptions(setOptionsAction) {
				var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
				cleanupModifierEffects();
				state.options = Object.assign({}, defaultOptions, state.options, options);
				state.scrollParents = {
					reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
					popper: listScrollParents(popper)
				};
				var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
				state.orderedModifiers = orderedModifiers.filter(function(m) {
					return m.enabled;
				});
				runModifierEffects();
				return instance.update();
			},
			forceUpdate: function forceUpdate() {
				if (isDestroyed) return;
				var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
				if (!areValidElements(reference, popper)) return;
				state.rects = {
					reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
					popper: getLayoutRect(popper)
				};
				state.reset = false;
				state.placement = state.options.placement;
				state.orderedModifiers.forEach(function(modifier) {
					return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
				});
				for (var index = 0; index < state.orderedModifiers.length; index++) {
					if (state.reset === true) {
						state.reset = false;
						index = -1;
						continue;
					}
					var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
					if (typeof fn === "function") state = fn({
						state,
						options: _options,
						name,
						instance
					}) || state;
				}
			},
			update: debounce(function() {
				return new Promise(function(resolve) {
					instance.forceUpdate();
					resolve(state);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects();
				isDestroyed = true;
			}
		};
		if (!areValidElements(reference, popper)) return instance;
		instance.setOptions(options).then(function(state) {
			if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
		});
		function runModifierEffects() {
			state.orderedModifiers.forEach(function(_ref) {
				var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
				if (typeof effect === "function") {
					var cleanupFn = effect({
						state,
						name,
						instance,
						options
					});
					effectCleanupFns.push(cleanupFn || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			effectCleanupFns.forEach(function(fn) {
				return fn();
			});
			effectCleanupFns = [];
		}
		return instance;
	};
}
var createPopper = /*#__PURE__*/ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] });
//#endregion
//#region node_modules/@mui/material/utils/isLayoutSupported.mjs
function isLayoutSupported() {
	return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || false);
}
//#endregion
//#region node_modules/@mui/utils/setRef/setRef.mjs
/**
* TODO v5: consider making it private
*
* passes {value} to {ref}
*
* WARNING: Be sure to only call this inside a callback that is passed as a ref.
* Otherwise, make sure to cleanup the previous {ref} if it changes. See
* https://github.com/mui/material-ui/issues/13539
*
* Useful if you want to expose the ref of an inner component to the public API
* while still using it inside the component.
* @param ref A ref callback or ref object. If anything falsy, this is a no-op.
*/
function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
}
//#endregion
//#region node_modules/@mui/material/Portal/Portal.mjs
function getContainer$1(container) {
	return typeof container === "function" ? container() : container;
}
/**
* Portals provide a first-class way to render children into a DOM node
* that exists outside the DOM hierarchy of the parent component.
*
* Demos:
*
* - [Portal](https://mui.com/material-ui/react-portal/)
*
* API:
*
* - [Portal API](https://mui.com/material-ui/api/portal/)
*/
var Portal = /*#__PURE__*/ import_react.forwardRef(function Portal(props, forwardedRef) {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = import_react.useState(null);
	const handleRef = useForkRef(/*#__PURE__*/ import_react.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
	useEnhancedEffect(() => {
		if (!disablePortal) setMountNode(getContainer$1(container) || document.body);
	}, [container, disablePortal]);
	useEnhancedEffect(() => {
		if (mountNode && !disablePortal) {
			setRef(forwardedRef, mountNode);
			return () => {
				setRef(forwardedRef, null);
			};
		}
	}, [
		forwardedRef,
		mountNode,
		disablePortal
	]);
	if (disablePortal) {
		if (/*#__PURE__*/ import_react.isValidElement(children)) {
			const newProps = { ref: handleRef };
			return /*#__PURE__*/ import_react.cloneElement(children, newProps);
		}
		return children;
	}
	return mountNode ? /*#__PURE__*/ import_react_dom.createPortal(children, mountNode) : mountNode;
});
Portal.propTypes = {
	/**
	* The children to render into the `container`.
	*/
	children: import_prop_types.default.node,
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool
};
Portal["propTypes"] = exactProp(Portal.propTypes);
//#endregion
//#region node_modules/@mui/material/Popper/popperClasses.mjs
function getPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPopper", slot);
}
generateUtilityClasses("MuiPopper", ["root"]);
//#endregion
//#region node_modules/@mui/material/Popper/BasePopper.mjs
function flipPlacement(placement, direction) {
	if (direction === "ltr") return placement;
	switch (placement) {
		case "bottom-end": return "bottom-start";
		case "bottom-start": return "bottom-end";
		case "top-end": return "top-start";
		case "top-start": return "top-end";
		default: return placement;
	}
}
function resolveAnchorEl(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
	return element.nodeType !== void 0;
}
function isVirtualElement(element) {
	return !isHTMLElement(element);
}
var useUtilityClasses$29 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getPopperUtilityClass, classes);
};
var defaultPopperOptions = {};
var PopperTooltip = /*#__PURE__*/ import_react.forwardRef(function PopperTooltip(props, forwardedRef) {
	const { anchorEl, children, direction, disablePortal, modifiers, open, placement: initialPlacement, popperOptions, popperRef: popperRefProp, slotProps = {}, slots = {}, TransitionProps, ownerState: ownerStateProp, ...other } = props;
	const tooltipRef = import_react.useRef(null);
	const ownRef = useForkRef(tooltipRef, forwardedRef);
	const popperRef = import_react.useRef(null);
	const handlePopperRef = useForkRef(popperRef, popperRefProp);
	const handlePopperRefRef = import_react.useRef(handlePopperRef);
	useEnhancedEffect(() => {
		handlePopperRefRef.current = handlePopperRef;
	}, [handlePopperRef]);
	import_react.useImperativeHandle(popperRefProp, () => popperRef.current, []);
	const rtlPlacement = flipPlacement(initialPlacement, direction);
	/**
	* placement initialized from prop but can change during lifetime if modifiers.flip.
	* modifiers.flip is essentially a flip for controlled/uncontrolled behavior
	*/
	const [placement, setPlacement] = import_react.useState(rtlPlacement);
	const resolvedAnchorElement = import_react.useMemo(() => resolveAnchorEl(anchorEl), [anchorEl]);
	import_react.useEffect(() => {
		if (popperRef.current) popperRef.current.forceUpdate();
	});
	useEnhancedEffect(() => {
		if (!resolvedAnchorElement || !open) return;
		const handlePopperUpdate = (data) => {
			setPlacement(data.placement);
		};
		if (resolvedAnchorElement && isHTMLElement(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
			const box = resolvedAnchorElement.getBoundingClientRect();
			if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) console.warn([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"The anchor element should be part of the document layout.",
				"Make sure the element is present in the document or that it's not display none."
			].join("\n"));
		}
		let popperModifiers = [
			{
				name: "preventOverflow",
				options: { altBoundary: disablePortal }
			},
			{
				name: "flip",
				options: { altBoundary: disablePortal }
			},
			{
				name: "onUpdate",
				enabled: true,
				phase: "afterWrite",
				fn: ({ state }) => {
					handlePopperUpdate(state);
				}
			}
		];
		if (modifiers != null) popperModifiers = popperModifiers.concat(modifiers);
		if (popperOptions && popperOptions.modifiers != null) popperModifiers = popperModifiers.concat(popperOptions.modifiers);
		const popper = createPopper(resolvedAnchorElement, tooltipRef.current, {
			placement: rtlPlacement,
			...popperOptions,
			modifiers: popperModifiers
		});
		handlePopperRefRef.current(popper);
		const popperElement = tooltipRef.current;
		return () => {
			if (popperElement) {
				const { style } = popperElement;
				const position = style.position;
				const top = style.top;
				const left = style.left;
				const transform = style.transform;
				popper.destroy();
				style.position = position;
				style.top = top;
				style.left = left;
				style.transform = transform;
			} else popper.destroy();
			handlePopperRefRef.current(null);
		};
	}, [
		resolvedAnchorElement,
		disablePortal,
		modifiers,
		open,
		popperOptions,
		rtlPlacement
	]);
	const childProps = { placement };
	if (TransitionProps !== null) childProps.TransitionProps = TransitionProps;
	const classes = useUtilityClasses$29(props);
	const Root = slots.root ?? "div";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Root, {
		...useSlotProps({
			elementType: Root,
			externalSlotProps: slotProps.root,
			externalForwardedProps: other,
			additionalProps: {
				role: "tooltip",
				ref: ownRef
			},
			ownerState: props,
			className: classes.root
		}),
		children: typeof children === "function" ? children(childProps) : children
	});
});
/**
* @ignore - internal component.
*/
var Popper$1 = /*#__PURE__*/ import_react.forwardRef(function Popper(props, forwardedRef) {
	const { anchorEl, children, container: containerProp, direction = "ltr", disablePortal = false, keepMounted = false, modifiers, open, placement = "bottom", popperOptions = defaultPopperOptions, popperRef, style, transition = false, slotProps = {}, slots = {}, ...other } = props;
	const [exited, setExited] = import_react.useState(true);
	const handleEnter = () => {
		setExited(false);
	};
	const handleExited = () => {
		setExited(true);
	};
	if (!keepMounted && !open && (!transition || exited)) return null;
	let container;
	if (containerProp) container = containerProp;
	else if (anchorEl) {
		const resolvedAnchorEl = resolveAnchorEl(anchorEl);
		container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
	}
	const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
	const transitionProps = transition ? {
		in: open,
		onEnter: handleEnter,
		onExited: handleExited
	} : void 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Portal, {
		disablePortal,
		container,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopperTooltip, {
			anchorEl,
			direction,
			disablePortal,
			modifiers,
			ref: forwardedRef,
			open: transition ? !exited : open,
			placement,
			popperOptions,
			popperRef,
			slotProps,
			slots,
			...other,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				display,
				...style
			},
			TransitionProps: transitionProps,
			children
		})
	});
});
Popper$1.propTypes = {
	/**
	* An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
	* or a function that returns either.
	* It's used to set the position of the popper.
	* The return value will passed as the reference object of the Popper instance.
	*/
	anchorEl: chainPropTypes(import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]), (props) => {
		if (props.open) {
			const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
			if (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
				const box = resolvedAnchorEl.getBoundingClientRect();
				if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) return new Error([
					"MUI: The `anchorEl` prop provided to the component is invalid.",
					"The anchor element should be part of the document layout.",
					"Make sure the element is present in the document or that it's not display none."
				].join("\n"));
			} else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) return new Error([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"It should be an HTML element instance or a virtualElement ",
				"(https://popper.js.org/docs/v2/virtual-elements/)."
			].join("\n"));
		}
		return null;
	}),
	/**
	* Popper render function or node.
	*/
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* Direction of the text.
	* @default 'ltr'
	*/
	direction: import_prop_types.default.oneOf(["ltr", "rtl"]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool,
	/**
	* Always keep the children in the DOM.
	* This prop can be useful in SEO situation or
	* when you want to maximize the responsiveness of the Popper.
	* @default false
	*/
	keepMounted: import_prop_types.default.bool,
	/**
	* Popper.js is based on a "plugin-like" architecture,
	* most of its features are fully encapsulated "modifiers".
	*
	* A modifier is a function that is called each time Popper.js needs to
	* compute the position of the popper.
	* For this reason, modifiers should be very performant to avoid bottlenecks.
	* To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
	*/
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* Popper placement.
	* @default 'bottom'
	*/
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	/**
	* Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
	* @default {}
	*/
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	/**
	* A ref that points to the used popper instance.
	*/
	popperRef: refType,
	/**
	* The props used for each slot inside the Popper.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	/**
	* The components used for each slot inside the Popper.
	* Either a string to use a HTML element or a component.
	* @default {}
	*/
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
	/**
	* Help supporting a react-transition-group/Transition component.
	* @default false
	*/
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/Popper/Popper.mjs
var PopperRoot = styled(Popper$1, {
	name: "MuiPopper",
	slot: "Root"
})({});
/**
*
* Demos:
*
* - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
* - [Menu](https://mui.com/material-ui/react-menu/)
* - [Popper](https://mui.com/material-ui/react-popper/)
*
* API:
*
* - [Popper API](https://mui.com/material-ui/api/popper/)
*/
var Popper = /*#__PURE__*/ import_react.forwardRef(function Popper(inProps, ref) {
	const isRtl = useRtl();
	const { anchorEl, component, container, disablePortal, keepMounted, modifiers, open, placement, popperOptions, popperRef, transition, slots, slotProps, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiPopper"
	});
	const otherProps = {
		anchorEl,
		container,
		disablePortal,
		keepMounted,
		modifiers,
		open,
		placement,
		popperOptions,
		popperRef,
		transition,
		...other
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopperRoot, {
		as: component,
		direction: isRtl ? "rtl" : "ltr",
		slots,
		slotProps,
		...otherProps,
		ref
	});
});
Popper.propTypes = {
	/**
	* An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
	* or a function that returns either.
	* It's used to set the position of the popper.
	* The return value will passed as the reference object of the Popper instance.
	*/
	anchorEl: import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]),
	/**
	* Popper render function or node.
	*/
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool,
	/**
	* Always keep the children in the DOM.
	* This prop can be useful in SEO situation or
	* when you want to maximize the responsiveness of the Popper.
	* @default false
	*/
	keepMounted: import_prop_types.default.bool,
	/**
	* Popper.js is based on a "plugin-like" architecture,
	* most of its features are fully encapsulated "modifiers".
	*
	* A modifier is a function that is called each time Popper.js needs to
	* compute the position of the popper.
	* For this reason, modifiers should be very performant to avoid bottlenecks.
	* To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
	*/
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* Popper placement.
	* @default 'bottom'
	*/
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	/**
	* Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
	* @default {}
	*/
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	/**
	* A ref that points to the used popper instance.
	*/
	popperRef: refType,
	/**
	* The props used for each slot inside the Popper.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	/**
	* The components used for each slot inside the Popper.
	* Either a string to use a HTML element or a component.
	* @default {}
	*/
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
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
	* Help supporting a react-transition-group/Transition component.
	* @default false
	*/
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/utils/contains/contains.mjs
/**
* Copied from @base-ui/utils
*
* Shadow DOM-aware containment check.
*
* Native `parent.contains(child)` returns `false` when the child is inside a
* shadow root that is a descendant of the parent. This function handles that
* case by traversing up through shadow root hosts.
*
* @param parent - The potential ancestor element.
* @param child - The potential descendant element.
* @returns Whether `parent` contains `child`, even across shadow root boundaries.
*/
function contains(parent, child) {
	if (!parent || !child) return false;
	if (parent.contains(child)) return true;
	const rootNode = child.getRootNode?.();
	if (rootNode && rootNode instanceof ShadowRoot) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode ?? next.host ?? null;
		}
	}
	return false;
}
//#endregion
//#region node_modules/@mui/material/utils/contains.mjs
var contains_default = contains;
//#endregion
//#region node_modules/@mui/material/utils/focusable.mjs
var FOCUSABLE_ATTRIBUTE = "data-mui-focusable";
/**
* Returns the element marked as the initial focus target inside a focus trap.
* The root element takes precedence over marked descendants so components can
* opt into focusing their own root surface directly.
*/
function getFocusTarget(rootElement) {
	if (!rootElement) return null;
	return rootElement.hasAttribute("data-mui-focusable") ? rootElement : rootElement.querySelector(`[${FOCUSABLE_ATTRIBUTE}]`);
}
//#endregion
//#region node_modules/@mui/material/Unstable_TrapFocus/FocusTrap.mjs
var candidatesSelector = [
	"input",
	"select",
	"textarea",
	"a[href]",
	"button",
	"[tabindex]",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function getTabIndex(node) {
	const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
	if (!Number.isNaN(tabindexAttr)) return tabindexAttr;
	if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) return 0;
	return node.tabIndex;
}
function isNonTabbableRadio(node) {
	if (node.tagName !== "INPUT" || node.type !== "radio") return false;
	if (!node.name) return false;
	const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
	let roving = getRadio(`[name="${node.name}"]:checked`);
	if (!roving) roving = getRadio(`[name="${node.name}"]`);
	return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
	if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) return false;
	return true;
}
function defaultGetTabbable(root) {
	const regularTabNodes = [];
	const orderedTabNodes = [];
	Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
		const nodeTabIndex = getTabIndex(node);
		if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) return;
		if (nodeTabIndex === 0) regularTabNodes.push(node);
		else orderedTabNodes.push({
			documentOrder: i,
			tabIndex: nodeTabIndex,
			node
		});
	});
	return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
	return true;
}
/**
* @ignore - internal component.
*/
function FocusTrap(props) {
	const { children, disableAutoFocus = false, disableEnforceFocus = false, disableRestoreFocus = false, getTabbable = defaultGetTabbable, isEnabled = defaultIsEnabled, open } = props;
	const ignoreNextEnforceFocus = import_react.useRef(false);
	const sentinelStart = import_react.useRef(null);
	const sentinelEnd = import_react.useRef(null);
	const nodeToRestore = import_react.useRef(null);
	const reactFocusEventTarget = import_react.useRef(null);
	const activated = import_react.useRef(false);
	const rootRef = import_react.useRef(null);
	const handleRef = useForkRef(getReactElementRef(children), rootRef);
	const lastKeydown = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		activated.current = !disableAutoFocus;
	}, [disableAutoFocus, open]);
	import_react.useEffect(() => {
		ignoreNextEnforceFocus.current = false;
		if (!open || !rootRef.current) return;
		const activeElement = getActiveElement_default(ownerDocument(rootRef.current));
		const focusTarget = getFocusTarget(rootRef.current) ?? rootRef.current;
		if (!contains_default(rootRef.current, activeElement)) {
			if (!focusTarget.hasAttribute("tabIndex")) {
				console.error(["MUI: The modal content node does not accept focus.", "For the benefit of assistive technologies, the tabIndex of the node is being set to \"-1\"."].join("\n"));
				focusTarget.setAttribute("tabIndex", "-1");
			}
			if (activated.current) focusTarget.focus();
		}
		return () => {
			if (!disableRestoreFocus && nodeToRestore.current) {
				ignoreNextEnforceFocus.current = true;
				nodeToRestore.current.focus();
				nodeToRestore.current = null;
			}
		};
	}, [open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const doc = ownerDocument(rootRef.current);
		const loopFocus = (nativeEvent) => {
			lastKeydown.current = nativeEvent;
			if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") return;
			const rootElement = rootRef.current;
			const activeElement = getActiveElement_default(doc);
			if (rootElement === null) return;
			const focusTarget = getFocusTarget(rootElement);
			if (activeElement === rootElement || activeElement === focusTarget) {
				const tabbable = getTabbable(rootElement);
				if (tabbable.length === 0) return;
				nativeEvent.preventDefault();
				if (nativeEvent.shiftKey) tabbable[tabbable.length - 1].focus();
				else tabbable[0].focus();
				return;
			}
			if (contains_default(rootElement, activeElement)) {
				const tabbable = getTabbable(rootElement);
				const currentIndex = tabbable.indexOf(activeElement);
				if (currentIndex === -1) return;
				if (!tabbable.some((node) => getTabIndex(node) > 0)) return;
				nativeEvent.preventDefault();
				let nextIndex = 0;
				if (nativeEvent.shiftKey) nextIndex = currentIndex <= 0 ? tabbable.length - 1 : currentIndex - 1;
				else nextIndex = currentIndex === tabbable.length - 1 ? 0 : currentIndex + 1;
				tabbable[nextIndex].focus();
			}
		};
		const contain = () => {
			const rootElement = rootRef.current;
			if (rootElement === null) return;
			const activeEl = getActiveElement_default(doc);
			if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
				ignoreNextEnforceFocus.current = false;
				return;
			}
			if (contains_default(rootElement, activeEl)) return;
			if (disableEnforceFocus && activeEl !== sentinelStart.current && activeEl !== sentinelEnd.current) return;
			if (activeEl !== reactFocusEventTarget.current) reactFocusEventTarget.current = null;
			else if (reactFocusEventTarget.current !== null) return;
			if (!activated.current) return;
			let tabbable = [];
			if (activeEl === sentinelStart.current || activeEl === sentinelEnd.current) tabbable = getTabbable(rootRef.current);
			if (tabbable.length > 0) {
				const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
				const focusNext = tabbable[0];
				const focusPrevious = tabbable[tabbable.length - 1];
				if (typeof focusNext !== "string" && typeof focusPrevious !== "string") if (isShiftTab) focusPrevious.focus();
				else focusNext.focus();
			} else rootElement.focus();
		};
		doc.addEventListener("focusin", contain);
		doc.addEventListener("keydown", loopFocus, true);
		const interval = setInterval(() => {
			const activeEl = getActiveElement_default(doc);
			if (activeEl && activeEl.tagName === "BODY") contain();
		}, 50);
		return () => {
			clearInterval(interval);
			doc.removeEventListener("focusin", contain);
			doc.removeEventListener("keydown", loopFocus, true);
		};
	}, [
		disableAutoFocus,
		disableEnforceFocus,
		disableRestoreFocus,
		isEnabled,
		open,
		getTabbable
	]);
	const onFocus = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
		reactFocusEventTarget.current = event.target;
		const childrenPropsHandler = children.props.onFocus;
		if (childrenPropsHandler) childrenPropsHandler(event);
	};
	const handleFocusSentinel = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelStart,
			"data-testid": "sentinelStart"
		}),
		/*#__PURE__*/ import_react.cloneElement(children, {
			ref: handleRef,
			onFocus
		}),
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelEnd,
			"data-testid": "sentinelEnd"
		})
	] });
}
FocusTrap.propTypes = {
	/**
	* A single child content element.
	*/
	children: elementAcceptingRef,
	/**
	* If `true`, the focus trap will not automatically shift focus to itself when it opens, and
	* replace it to the last focused element when it closes.
	* This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
	*
	* Generally this should never be set to `true` as it makes the focus trap less
	* accessible to assistive technologies, like screen readers.
	* @default false
	*/
	disableAutoFocus: import_prop_types.default.bool,
	/**
	* If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
	*
	* Generally this should never be set to `true` as it makes the focus trap less
	* accessible to assistive technologies, like screen readers.
	* @default false
	*/
	disableEnforceFocus: import_prop_types.default.bool,
	/**
	* If `true`, the focus trap will not restore focus to previously focused element once
	* focus trap is hidden or unmounted.
	* @default false
	*/
	disableRestoreFocus: import_prop_types.default.bool,
	/**
	* Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
	* For instance, you can provide the "tabbable" npm dependency.
	* @param {HTMLElement} root
	*/
	getTabbable: import_prop_types.default.func,
	/**
	* This prop extends the `open` prop.
	* It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
	* This prop should be memoized.
	* It can be used to support multiple focus trap mounted at the same time.
	* @default function defaultIsEnabled(): boolean {
	*   return true;
	* }
	*/
	isEnabled: import_prop_types.default.func,
	/**
	* If `true`, focus is locked.
	*/
	open: import_prop_types.default.bool.isRequired
};
FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/isElementInteractive.mjs
/**
* Taken from https://github.com/matijs/is-interactive-element/
*/
var isInputHidden = (input) => input.type === "hidden";
function isElementInteractive(element) {
	const { nodeName } = element;
	if ([
		"BUTTON",
		"DETAILS",
		"EMBED",
		"IFRAME",
		"KEYGEN",
		"LABEL",
		"SELECT",
		"TEXTAREA"
	].includes(nodeName)) return true;
	if (nodeName === "A" && element.hasAttribute("href")) return true;
	if (element instanceof HTMLInputElement && !isInputHidden(element)) return true;
	if (["AUDIO", "VIDEO"].includes(nodeName) && element.hasAttribute("controls")) return true;
	if (["IMG", "OBJECT"].includes(nodeName) && element.hasAttribute("usemap")) return true;
	if (element.hasAttribute("tabindex") && element.tabIndex > -1) return true;
	return false;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerPopper/pickerPopperClasses.mjs
function getPickerPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPickerPopper", slot);
}
generateUtilityClasses("MuiPickerPopper", ["root", "paper"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/utils.mjs
function arrayIncludes(array, itemOrItems) {
	if (Array.isArray(itemOrItems)) return itemOrItems.every((item) => array.indexOf(item) !== -1);
	return array.indexOf(itemOrItems) !== -1;
}
var executeInTheNextEventLoopTick = (fn) => {
	setTimeout(fn, 0);
};
var getActiveElementInternal = (root = document) => {
	const activeEl = root.activeElement;
	if (!activeEl) return null;
	if (activeEl.shadowRoot) return getActiveElementInternal(activeEl.shadowRoot);
	return activeEl;
};
/**
* Gets the currently active element within a given node's document.
* This function traverses shadow DOM if necessary.
* @param node - The node from which to get the active element.
* @returns The currently active element, or null if none is found.
*/
var getActiveElement = (node) => {
	return getActiveElementInternal(ownerDocument(node));
};
/**
* Gets the index of the focused list item in a given ul list element.
*
* @param {HTMLUListElement} listElement - The list element to search within.
* @returns {number} The index of the focused list item, or -1 if none is focused.
*/
var getFocusedListItemIndex = (listElement) => {
	return Array.from(listElement.children).indexOf(getActiveElement(listElement));
};
var DEFAULT_DESKTOP_MODE_MEDIA_QUERY = "@media (pointer: fine)";
/**
* Picks any `data-*` and `aria-*` properties from `props` so they can be
* forwarded to the root DOM element rendered by the Picker. Other props stay
* owned by the Picker and are handled explicitly elsewhere.
*/
function extractRootForwardedProps(props) {
	const forwardedProps = {};
	for (const key of Object.keys(props)) if (key.startsWith("data-") || key.startsWith("aria-")) forwardedProps[key] = props[key];
	return forwardedProps;
}
function mergeSx(...sxProps) {
	return sxProps.reduce((acc, sxProp) => {
		if (Array.isArray(sxProp)) acc.push(...sxProp);
		else if (sxProp != null) acc.push(sxProp);
		return acc;
	}, []);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerPopper/PickerPopper.mjs
var _excluded$16 = [
	"PaperComponent",
	"ownerState",
	"children",
	"paperSlotProps",
	"paperClasses",
	"onPaperClick",
	"onPaperTouchStart"
];
var useUtilityClasses$28 = (classes) => {
	return composeClasses({
		root: ["root"],
		paper: ["paper"]
	}, getPickerPopperUtilityClass, classes);
};
var PickerPopperRoot = styled(Popper, {
	name: "MuiPickerPopper",
	slot: "Root"
})(({ theme }) => ({ zIndex: theme.zIndex.modal }));
var PickerPopperPaper = styled(Paper, {
	name: "MuiPickerPopper",
	slot: "Paper"
})({
	outline: 0,
	transformOrigin: "top center",
	variants: [{
		props: ({ popperPlacement }) => new Set([
			"top",
			"top-start",
			"top-end"
		]).has(popperPlacement),
		style: { transformOrigin: "bottom center" }
	}]
});
function clickedRootScrollbar(event, doc) {
	return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
* Based on @mui/material/ClickAwayListener without the customization.
* We can probably strip away even more since children won't be portaled.
* @param {boolean} active Only listen to clicks when the popper is opened.
* @param {(event: MouseEvent | TouchEvent) => void} onClickAway The callback to call when clicking outside the popper.
* @returns {Array} The ref and event handler to listen to the outside clicks.
*/
function useClickAwayListener(active, onClickAway) {
	const movedRef = import_react.useRef(false);
	const syntheticEventRef = import_react.useRef(false);
	const nodeRef = import_react.useRef(null);
	const activatedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (!active) return;
		function armClickAwayListener() {
			activatedRef.current = true;
		}
		document.addEventListener("mousedown", armClickAwayListener, true);
		document.addEventListener("touchstart", armClickAwayListener, true);
		return () => {
			document.removeEventListener("mousedown", armClickAwayListener, true);
			document.removeEventListener("touchstart", armClickAwayListener, true);
			activatedRef.current = false;
		};
	}, [active]);
	const handleClickAway = useEventCallback((event) => {
		if (!activatedRef.current) {
			syntheticEventRef.current = false;
			return;
		}
		const insideReactTree = syntheticEventRef.current;
		syntheticEventRef.current = false;
		const doc = ownerDocument(nodeRef.current);
		if (!nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) return;
		if (movedRef.current) {
			movedRef.current = false;
			return;
		}
		let insideDOM;
		if (event.composedPath) insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
		else insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
		if (!insideDOM && !insideReactTree) onClickAway(event);
	});
	const handleSynthetic = (event) => {
		if (!event.defaultMuiPrevented) syntheticEventRef.current = true;
	};
	import_react.useEffect(() => {
		if (active) {
			const doc = ownerDocument(nodeRef.current);
			const handleTouchMove = () => {
				movedRef.current = true;
			};
			doc.addEventListener("touchstart", handleClickAway);
			doc.addEventListener("touchmove", handleTouchMove);
			return () => {
				doc.removeEventListener("touchstart", handleClickAway);
				doc.removeEventListener("touchmove", handleTouchMove);
			};
		}
	}, [active, handleClickAway]);
	import_react.useEffect(() => {
		if (active) {
			const doc = ownerDocument(nodeRef.current);
			doc.addEventListener("click", handleClickAway);
			return () => {
				doc.removeEventListener("click", handleClickAway);
				syntheticEventRef.current = false;
			};
		}
	}, [active, handleClickAway]);
	return [
		nodeRef,
		handleSynthetic,
		handleSynthetic
	];
}
var PickerPopperPaperWrapper = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { PaperComponent, ownerState, children, paperSlotProps, paperClasses, onPaperClick, onPaperTouchStart } = props, other = _objectWithoutPropertiesLoose(props, _excluded$16);
	const paperProps = useSlotProps({
		elementType: PaperComponent,
		externalSlotProps: paperSlotProps,
		additionalProps: {
			tabIndex: -1,
			elevation: 8,
			ref
		},
		className: paperClasses,
		ownerState
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PaperComponent, _extends({}, other, paperProps, {
		onClick: (event) => {
			onPaperClick(event);
			paperProps.onClick?.(event);
		},
		onTouchStart: (event) => {
			onPaperTouchStart(event);
			paperProps.onTouchStart?.(event);
		},
		ownerState,
		children
	}));
});
PickerPopperPaperWrapper.displayName = "PickerPopperPaperWrapper";
var isEventTargetInteractive = (eventTarget) => {
	const element = eventTarget instanceof HTMLElement ? eventTarget : null;
	if (!element) return false;
	return isElementInteractive(element);
};
function PickerPopper(inProps) {
	const { children, placement = "bottom-start", slots, slotProps, classes: classesProp } = useThemeProps({
		props: inProps,
		name: "MuiPickerPopper"
	});
	const { open, popupRef, reduceAnimations, keepOpenDuringFieldFocus } = usePickerContext();
	const { ownerState: pickerOwnerState, rootRefObject } = usePickerPrivateContext();
	const { dismissViews, getCurrentViewMode, onPopperExited, triggerElement, viewContainerRole } = usePickerPrivateContext();
	import_react.useEffect(() => {
		function handleKeyDown(nativeEvent) {
			if (open && nativeEvent.key === "Escape") dismissViews();
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [dismissViews, open]);
	const lastFocusedElementRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (viewContainerRole === "tooltip" || getCurrentViewMode() === "field") return;
		if (open) lastFocusedElementRef.current = getActiveElement(rootRefObject.current);
		else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) setTimeout(() => {
			if (lastFocusedElementRef.current instanceof HTMLElement) lastFocusedElementRef.current.focus();
		});
	}, [
		open,
		viewContainerRole,
		getCurrentViewMode,
		rootRefObject
	]);
	const classes = useUtilityClasses$28(classesProp);
	const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, useEventCallback((event) => {
		if (keepOpenDuringFieldFocus && triggerElement && event && "target" in event && triggerElement.contains(event.target)) return;
		if (viewContainerRole === "tooltip") executeInTheNextEventLoopTick(() => {
			if (rootRefObject.current?.contains(getActiveElement(rootRefObject.current)) || popupRef.current?.contains(getActiveElement(popupRef.current))) return;
			dismissViews();
		});
		else {
			if (event.composedPath().some(isEventTargetInteractive)) lastFocusedElementRef.current = null;
			dismissViews();
		}
	}));
	const handlePaperRef = useForkRef(useForkRef(import_react.useRef(null), popupRef), clickAwayRef);
	const handleKeyDown = (event) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			dismissViews();
		}
	};
	const Transition = slots?.desktopTransition ?? reduceAnimations ? Fade : Grow;
	const FocusTrap$1 = slots?.desktopTrapFocus ?? FocusTrap;
	const Paper = slots?.desktopPaper ?? PickerPopperPaper;
	const Popper = slots?.popper ?? PickerPopperRoot;
	const popperProps = useSlotProps({
		elementType: Popper,
		externalSlotProps: slotProps?.popper,
		additionalProps: {
			transition: true,
			role: viewContainerRole == null ? void 0 : viewContainerRole,
			open,
			placement,
			anchorEl: triggerElement,
			onKeyDown: handleKeyDown
		},
		className: classes.root,
		ownerState: pickerOwnerState
	});
	const ownerState = import_react.useMemo(() => _extends({}, pickerOwnerState, { popperPlacement: popperProps.placement }), [pickerOwnerState, popperProps.placement]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Popper, _extends({}, popperProps, { children: ({ TransitionProps }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusTrap$1, _extends({
		open,
		disableAutoFocus: true,
		disableRestoreFocus: true,
		disableEnforceFocus: viewContainerRole === "tooltip"
	}, slotProps?.desktopTrapFocus, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Transition, _extends({}, TransitionProps, slotProps?.desktopTransition, {
		onExited: (event) => {
			onPopperExited?.();
			slotProps?.desktopTransition?.onExited?.(event);
			TransitionProps?.onExited?.();
		},
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerPopperPaperWrapper, {
			PaperComponent: Paper,
			ownerState,
			ref: handlePaperRef,
			onPaperClick,
			onPaperTouchStart,
			paperClasses: classes.paper,
			paperSlotProps: slotProps?.desktopPaper,
			children
		})
	})) })) }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useReduceAnimations.mjs
var PREFERS_REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
var mobileVersionMatches = typeof navigator !== "undefined" && navigator.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
var androidVersion = mobileVersionMatches && mobileVersionMatches[1] ? parseInt(mobileVersionMatches[1], 10) : null;
var iOSVersion = mobileVersionMatches && mobileVersionMatches[2] ? parseInt(mobileVersionMatches[2], 10) : null;
var slowAnimationDevices = androidVersion && androidVersion < 10 || iOSVersion && iOSVersion < 13 || false;
function useReduceAnimations(customReduceAnimations) {
	const prefersReduced = useMediaQuery(PREFERS_REDUCED_MOTION, { defaultMatches: false });
	if (customReduceAnimations != null) return customReduceAnimations;
	return prefersReduced || slowAnimationDevices;
}
//#endregion
//#region node_modules/@mui/utils/useControlled/useControlled.mjs
function useControlled(props) {
	const { controlled, default: defaultProp, name, state = "value" } = props;
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	const value = isControlled ? controlled : valueState;
	{
		import_react.useEffect(() => {
			if (isControlled !== (controlled !== void 0)) console.error([
				`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`,
				"Elements should not switch from uncontrolled to controlled (or vice versa).",
				`Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`,
				"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
				"More info: https://fb.me/react-controlled-components"
			].join("\n"));
		}, [
			state,
			name,
			controlled
		]);
		const { current: defaultValue } = import_react.useRef(defaultProp);
		import_react.useEffect(() => {
			if (!isControlled && JSON.stringify(defaultProp) !== JSON.stringify(defaultValue)) console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
		}, [JSON.stringify(defaultProp)]);
	}
	return [value, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/utils/createStepNavigation.mjs
var DEFAULT_STEP_NAVIGATION = {
	hasNextStep: false,
	hasSeveralSteps: false,
	goToNextStep: () => {},
	areViewsInSameStep: () => true
};
/**
* Create an object that determines whether there is a next step and allows to go to the next step.
* @param {CreateStepNavigationParameters<TStep>} parameters The parameters of the createStepNavigation function
* @returns {CreateStepNavigationReturnValue} The return value of the createStepNavigation function
*/
function createStepNavigation(parameters) {
	const { steps, isViewMatchingStep, onStepChange } = parameters;
	return (parametersBis) => {
		if (steps == null) return DEFAULT_STEP_NAVIGATION;
		const currentStepIndex = steps.findIndex((step) => isViewMatchingStep(parametersBis.view, step));
		const nextStep = currentStepIndex === -1 || currentStepIndex === steps.length - 1 ? null : steps[currentStepIndex + 1];
		return {
			hasNextStep: nextStep != null,
			hasSeveralSteps: steps.length > 1,
			goToNextStep: () => {
				if (nextStep == null) return;
				onStepChange(_extends({}, parametersBis, { step: nextStep }));
			},
			areViewsInSameStep: (viewA, viewB) => {
				return steps.find((step) => isViewMatchingStep(viewA, step)) === steps.find((step) => isViewMatchingStep(viewB, step));
			}
		};
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useViews.mjs
var warnedOnceNotValidView = false;
function useViews({ onChange, onViewChange, openTo, view: inView, views, autoFocus, focusedView: inFocusedView, onFocusedViewChange, getStepNavigation }) {
	if (!warnedOnceNotValidView) {
		if (inView != null && !views.includes(inView)) {
			console.warn(`MUI X: \`view="${inView}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
		if (inView == null && openTo != null && !views.includes(openTo)) {
			console.warn(`MUI X: \`openTo="${openTo}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
	}
	const previousOpenTo = import_react.useRef(openTo);
	const previousViews = import_react.useRef(views);
	const defaultView = import_react.useRef(views.includes(openTo) ? openTo : views[0]);
	const [view, setView] = useControlled({
		name: "useViews",
		state: "view",
		controlled: inView,
		default: defaultView.current
	});
	const [focusedView, setFocusedView] = useControlled({
		name: "useViews",
		state: "focusedView",
		controlled: inFocusedView,
		default: import_react.useRef(autoFocus ? view : null).current
	});
	const stepNavigation = getStepNavigation ? getStepNavigation({
		setView,
		view,
		defaultView: defaultView.current,
		views
	}) : DEFAULT_STEP_NAVIGATION;
	import_react.useEffect(() => {
		if (previousOpenTo.current && previousOpenTo.current !== openTo || previousViews.current && previousViews.current.some((previousView) => !views.includes(previousView))) {
			setView(views.includes(openTo) ? openTo : views[0]);
			previousViews.current = views;
			previousOpenTo.current = openTo;
		}
	}, [
		openTo,
		setView,
		view,
		views
	]);
	const viewIndex = views.indexOf(view);
	const previousView = views[viewIndex - 1] ?? null;
	const nextView = views[viewIndex + 1] ?? null;
	const handleFocusedViewChange = useEventCallback((viewToFocus, hasFocus) => {
		if (hasFocus) setFocusedView(viewToFocus);
		else setFocusedView((prevFocusedView) => viewToFocus === prevFocusedView ? null : prevFocusedView);
		onFocusedViewChange?.(viewToFocus, hasFocus);
	});
	const handleChangeView = useEventCallback((newView) => {
		handleFocusedViewChange(newView, true);
		if (newView === view) return;
		setView(newView);
		if (onViewChange) onViewChange(newView);
	});
	const goToNextView = useEventCallback(() => {
		if (nextView) handleChangeView(nextView);
	});
	const setValueAndGoToNextView = useEventCallback((value, currentViewSelectionState, selectedView) => {
		const isSelectionFinishedOnCurrentView = currentViewSelectionState === "finish";
		const hasMoreViews = selectedView ? views.indexOf(selectedView) < views.length - 1 : Boolean(nextView);
		onChange(value, isSelectionFinishedOnCurrentView && hasMoreViews ? "partial" : currentViewSelectionState, selectedView);
		let currentView = null;
		if (selectedView != null && selectedView !== view) currentView = selectedView;
		else if (isSelectionFinishedOnCurrentView) currentView = view;
		if (currentView == null) return;
		const viewToNavigateTo = views[views.indexOf(currentView) + 1];
		if (viewToNavigateTo == null || !stepNavigation.areViewsInSameStep(currentView, viewToNavigateTo)) return;
		handleChangeView(viewToNavigateTo);
	});
	return _extends({}, stepNavigation, {
		view,
		setView: handleChangeView,
		focusedView,
		setFocusedView: handleFocusedViewChange,
		nextView,
		previousView,
		defaultView: views.includes(openTo) ? openTo : views[0],
		goToNextView,
		setValueAndGoToNextView
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePicker/hooks/useOrientation.mjs
function getOrientation() {
	if (typeof window === "undefined") return "portrait";
	if (window.screen && window.screen.orientation && window.screen.orientation.angle) return Math.abs(window.screen.orientation.angle) === 90 ? "landscape" : "portrait";
	if (window.orientation) return Math.abs(Number(window.orientation)) === 90 ? "landscape" : "portrait";
	return "portrait";
}
function useOrientation(views, customOrientation) {
	const [orientation, setOrientation] = import_react.useState(getOrientation);
	useEnhancedEffect(() => {
		const eventHandler = () => {
			setOrientation(getOrientation());
		};
		window.addEventListener("orientationchange", eventHandler);
		return () => {
			window.removeEventListener("orientationchange", eventHandler);
		};
	}, []);
	if (arrayIncludes(views, [
		"hours",
		"minutes",
		"seconds"
	])) return "portrait";
	return customOrientation ?? orientation;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useControlledValue.mjs
/**
* Hooks controlling the value while making sure that:
* - The value returned by `onChange` always have the timezone of `props.value` or `props.defaultValue` if defined
* - The value rendered is always the one from `props.timezone` if defined
*/
var useControlledValue = ({ name, timezone: timezoneProp, value: valueProp, defaultValue, referenceDate, onChange: onChangeProp, valueManager }) => {
	const adapter = usePickerAdapter();
	const [valueWithInputTimezone, setValue] = useControlled({
		name,
		state: "value",
		controlled: valueProp,
		default: defaultValue ?? valueManager.emptyValue
	});
	const inputTimezone = import_react.useMemo(() => valueManager.getTimezone(adapter, valueWithInputTimezone), [
		adapter,
		valueManager,
		valueWithInputTimezone
	]);
	const setInputTimezone = useEventCallback((newValue) => {
		if (inputTimezone == null) return newValue;
		return valueManager.setTimezone(adapter, inputTimezone, newValue);
	});
	const timezoneToRender = import_react.useMemo(() => {
		if (timezoneProp) return timezoneProp;
		if (inputTimezone) return inputTimezone;
		if (referenceDate) return adapter.getTimezone(Array.isArray(referenceDate) ? referenceDate[0] : referenceDate);
		return "default";
	}, [
		timezoneProp,
		inputTimezone,
		referenceDate,
		adapter
	]);
	return {
		value: import_react.useMemo(() => valueManager.setTimezone(adapter, timezoneToRender, valueWithInputTimezone), [
			valueManager,
			adapter,
			timezoneToRender,
			valueWithInputTimezone
		]),
		handleValueChange: useEventCallback((newValue, ...otherParams) => {
			const newValueWithInputTimezone = setInputTimezone(newValue);
			setValue(newValueWithInputTimezone);
			onChangeProp?.(newValueWithInputTimezone, ...otherParams);
		}),
		timezone: timezoneToRender
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePicker/hooks/useValueAndOpenStates.mjs
function useValueAndOpenStates(parameters) {
	const { props, valueManager, validator } = parameters;
	const { value: valueProp, defaultValue: defaultValueProp, onChange, referenceDate, timezone: timezoneProp, onAccept, closeOnSelect, open: openProp, onOpen, onClose } = props;
	const { current: defaultValue } = import_react.useRef(defaultValueProp);
	const { current: isValueControlled } = import_react.useRef(valueProp !== void 0);
	const { current: isOpenControlled } = import_react.useRef(openProp !== void 0);
	const adapter = usePickerAdapter();
	if (props.renderInput != null) warnOnce([
		"MUI X: The `renderInput` prop has been removed in version 6.0 of the Date and Time Pickers.",
		"You can replace it with the `textField` component slot in most cases.",
		"For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5)."
	]);
	import_react.useEffect(() => {
		if (isValueControlled !== (valueProp !== void 0)) console.error([
			`MUI X: A component is changing the ${isValueControlled ? "" : "un"}controlled value of a Picker to be ${isValueControlled ? "un" : ""}controlled.`,
			"Elements should not switch from uncontrolled to controlled (or vice versa).",
			"Decide between using a controlled or uncontrolled valuefor the lifetime of the component.",
			"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
			"More info: https://fb.me/react-controlled-components"
		].join("\n"));
	}, [valueProp]);
	import_react.useEffect(() => {
		if (!isValueControlled && defaultValue !== defaultValueProp) console.error(["MUI X: A component is changing the defaultValue of an uncontrolled Picker after being initialized. To suppress this warning opt to use a controlled value."].join("\n"));
	}, [JSON.stringify(defaultValue)]);
	const { timezone, value, handleValueChange } = useControlledValue({
		name: "a picker component",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate,
		onChange,
		valueManager
	});
	const [state, setState] = import_react.useState(() => ({
		open: false,
		lastExternalValue: value,
		clockShallowValue: void 0,
		lastCommittedValue: value,
		hasBeenModifiedSinceMount: false
	}));
	const { getValidationErrorForNewValue } = useValidation({
		props,
		validator,
		timezone,
		value,
		onError: props.onError
	});
	const setOpen = useEventCallback((action) => {
		const newOpen = typeof action === "function" ? action(state.open) : action;
		if (!isOpenControlled) setState((prevState) => _extends({}, prevState, { open: newOpen }));
		if (newOpen && onOpen) onOpen();
		if (!newOpen) onClose?.();
	});
	const setValue = useEventCallback((newValue, options) => {
		const { changeImportance = "accept", skipPublicationIfPristine = false, validationError, shortcut, source, shouldClose = changeImportance === "accept" } = options ?? {};
		let shouldFireOnChange;
		let shouldFireOnAccept;
		if (!skipPublicationIfPristine && !isValueControlled && !state.hasBeenModifiedSinceMount) {
			shouldFireOnChange = true;
			shouldFireOnAccept = changeImportance === "accept";
		} else {
			shouldFireOnChange = !valueManager.areValuesEqual(adapter, newValue, value);
			shouldFireOnAccept = changeImportance === "accept" && !valueManager.areValuesEqual(adapter, newValue, state.lastCommittedValue);
		}
		setState((prevState) => _extends({}, prevState, {
			clockShallowValue: shouldFireOnChange ? void 0 : prevState.clockShallowValue,
			lastCommittedValue: shouldFireOnAccept ? newValue : prevState.lastCommittedValue,
			hasBeenModifiedSinceMount: true
		}));
		let cachedContext = null;
		const getContext = () => {
			if (!cachedContext) {
				let inferredSource;
				if (source) inferredSource = source;
				else if (shortcut) inferredSource = "view";
				else inferredSource = "unknown";
				cachedContext = {
					validationError: validationError == null ? getValidationErrorForNewValue(newValue) : validationError,
					source: inferredSource
				};
				if (shortcut) cachedContext.shortcut = shortcut;
			}
			return cachedContext;
		};
		if (shouldFireOnChange) handleValueChange(newValue, getContext());
		if (shouldFireOnAccept && onAccept) onAccept(newValue, getContext());
		if (shouldClose) setOpen(false);
	});
	if (value !== state.lastExternalValue) setState((prevState) => _extends({}, prevState, {
		lastExternalValue: value,
		clockShallowValue: void 0,
		hasBeenModifiedSinceMount: true
	}));
	const setValueFromView = useEventCallback((newValue, selectionState = "partial") => {
		if (selectionState === "shallow") {
			setState((prev) => _extends({}, prev, {
				clockShallowValue: newValue,
				hasBeenModifiedSinceMount: true
			}));
			return;
		}
		setValue(newValue, {
			changeImportance: selectionState === "finish" && closeOnSelect ? "accept" : "set",
			source: "view"
		});
	});
	import_react.useEffect(() => {
		if (isOpenControlled) {
			if (openProp === void 0) throw new Error("MUI X: You must not mix controlling and uncontrolled mode for `open` prop");
			setState((prevState) => _extends({}, prevState, { open: openProp }));
		}
	}, [isOpenControlled, openProp]);
	return {
		timezone,
		state,
		setValue,
		setValueFromView,
		setOpen,
		value,
		viewValue: import_react.useMemo(() => valueManager.cleanValue(adapter, state.clockShallowValue === void 0 ? value : state.clockShallowValue), [
			adapter,
			valueManager,
			state.clockShallowValue,
			value
		])
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePicker/usePicker.mjs
var _excluded$15 = ["className", "sx"];
var usePicker = ({ ref, props, valueManager, valueType, variant, validator, onPopperExited, autoFocusView, rendererInterceptor: RendererInterceptor, localeText, viewContainerRole, getStepNavigation }) => {
	const { views, view: viewProp, openTo, onViewChange, viewRenderers, reduceAnimations: reduceAnimationsProp, orientation: orientationProp, disableOpenPicker, closeOnSelect, disabled, readOnly, formatDensity, selectedSections, onSelectedSectionsChange, format, label, autoFocus, name, keepOpenDuringFieldFocus } = props;
	const { className, sx } = props, propsToForwardToView = _objectWithoutPropertiesLoose(props, _excluded$15);
	/**
	* TODO: Improve how we generate the aria-label and aria-labelledby attributes.
	*/
	const labelId = useId();
	const adapter = usePickerAdapter();
	const reduceAnimations = useReduceAnimations(reduceAnimationsProp);
	const orientation = useOrientation(views, orientationProp);
	const { current: initialView } = import_react.useRef(openTo ?? null);
	/**
	* Refs
	*/
	const [triggerElement, triggerRef] = import_react.useState(null);
	const popupRef = import_react.useRef(null);
	const internalFieldRef = import_react.useRef(null);
	const rootRefObject = import_react.useRef(null);
	const rootRef = useForkRef(ref, rootRefObject);
	const { timezone, state, setOpen, setValue, setValueFromView, value, viewValue } = useValueAndOpenStates({
		props,
		valueManager,
		validator
	});
	const { view, setView, defaultView, focusedView, setFocusedView, setValueAndGoToNextView, goToNextStep, hasNextStep, hasSeveralSteps } = useViews({
		view: viewProp,
		views,
		openTo,
		onChange: setValueFromView,
		onViewChange,
		autoFocus: autoFocusView,
		getStepNavigation
	});
	const clearValue = useEventCallback(() => {
		if (value === null && internalFieldRef.current?.clearValue) internalFieldRef.current.clearValue();
		setValue(valueManager.emptyValue, { source: "view" });
	});
	const setValueToToday = useEventCallback(() => setValue(valueManager.getTodayValue(adapter, timezone, valueType), { source: "view" }));
	const acceptValueChanges = useEventCallback(() => setValue(value, { source: "view" }));
	const cancelValueChanges = useEventCallback(() => setValue(state.lastCommittedValue, {
		skipPublicationIfPristine: true,
		source: "view"
	}));
	const dismissViews = useEventCallback(() => {
		setValue(value, {
			skipPublicationIfPristine: true,
			source: "view"
		});
	});
	const { hasUIView, viewModeLookup, timeViewsCount } = import_react.useMemo(() => views.reduce((acc, viewForReduce) => {
		const viewMode = viewRenderers[viewForReduce] == null ? "field" : "UI";
		acc.viewModeLookup[viewForReduce] = viewMode;
		if (viewMode === "UI") {
			acc.hasUIView = true;
			if (isTimeView(viewForReduce)) acc.timeViewsCount += 1;
		}
		return acc;
	}, {
		hasUIView: false,
		viewModeLookup: {},
		timeViewsCount: 0
	}), [viewRenderers, views]);
	const currentViewMode = viewModeLookup[view];
	const getCurrentViewMode = useEventCallback(() => currentViewMode);
	const [popperView, setPopperView] = import_react.useState(currentViewMode === "UI" ? view : null);
	if (popperView !== view && viewModeLookup[view] === "UI") setPopperView(view);
	useEnhancedEffect(() => {
		if (currentViewMode === "field" && state.open) {
			setOpen(false);
			setTimeout(() => {
				internalFieldRef?.current?.setSelectedSections(view);
				internalFieldRef?.current?.focusField(view);
			});
		}
	}, [view]);
	useEnhancedEffect(() => {
		if (!state.open) return;
		let newView = view;
		if (currentViewMode === "field" && popperView != null) newView = popperView;
		if (newView !== defaultView && viewModeLookup[newView] === "UI" && viewModeLookup[defaultView] === "UI") newView = defaultView;
		if (newView !== view) setView(newView);
		setFocusedView(newView, true);
	}, [state.open]);
	const ownerState = import_react.useMemo(() => ({
		isPickerValueEmpty: valueManager.areValuesEqual(adapter, value, valueManager.emptyValue),
		isPickerOpen: state.open,
		isPickerDisabled: props.disabled ?? false,
		isPickerReadOnly: props.readOnly ?? false,
		pickerOrientation: orientation,
		pickerVariant: variant
	}), [
		adapter,
		valueManager,
		value,
		state.open,
		orientation,
		variant,
		props.disabled,
		props.readOnly
	]);
	const triggerStatus = import_react.useMemo(() => {
		if (disableOpenPicker || !hasUIView) return "hidden";
		if (disabled || readOnly) return "disabled";
		return "enabled";
	}, [
		disableOpenPicker,
		hasUIView,
		disabled,
		readOnly
	]);
	const wrappedGoToNextStep = useEventCallback(goToNextStep);
	const defaultActionBarActions = import_react.useMemo(() => {
		if (closeOnSelect && !hasSeveralSteps) return [];
		return ["cancel", "nextOrAccept"];
	}, [closeOnSelect, hasSeveralSteps]);
	const actionsContextValue = import_react.useMemo(() => ({
		setValue,
		setOpen,
		clearValue,
		setValueToToday,
		acceptValueChanges,
		cancelValueChanges,
		setView,
		goToNextStep: wrappedGoToNextStep
	}), [
		setValue,
		setOpen,
		clearValue,
		setValueToToday,
		acceptValueChanges,
		cancelValueChanges,
		setView,
		wrappedGoToNextStep
	]);
	const contextValue = import_react.useMemo(() => _extends({}, actionsContextValue, {
		value,
		timezone,
		open: state.open,
		views,
		view: popperView,
		initialView,
		disabled: disabled ?? false,
		readOnly: readOnly ?? false,
		autoFocus: autoFocus ?? false,
		variant,
		orientation,
		popupRef,
		reduceAnimations,
		triggerRef,
		triggerStatus,
		keepOpenDuringFieldFocus: Boolean(keepOpenDuringFieldFocus),
		hasNextStep,
		fieldFormat: format ?? "",
		name,
		label,
		rootSx: sx,
		rootRef,
		rootClassName: className
	}), [
		actionsContextValue,
		value,
		rootRef,
		variant,
		orientation,
		reduceAnimations,
		disabled,
		readOnly,
		format,
		className,
		name,
		label,
		sx,
		triggerStatus,
		keepOpenDuringFieldFocus,
		hasNextStep,
		timezone,
		state.open,
		popperView,
		views,
		initialView,
		autoFocus
	]);
	const privateContextValue = import_react.useMemo(() => ({
		dismissViews,
		ownerState,
		hasUIView,
		getCurrentViewMode,
		rootRefObject,
		labelId,
		triggerElement,
		viewContainerRole,
		defaultActionBarActions,
		onPopperExited
	}), [
		dismissViews,
		ownerState,
		hasUIView,
		getCurrentViewMode,
		labelId,
		triggerElement,
		viewContainerRole,
		defaultActionBarActions,
		onPopperExited
	]);
	const fieldPrivateContextValue = import_react.useMemo(() => ({
		formatDensity,
		selectedSections,
		onSelectedSectionsChange,
		internalFieldRef
	}), [
		formatDensity,
		selectedSections,
		onSelectedSectionsChange,
		internalFieldRef
	]);
	const isValidContextValue = (testedValue) => {
		const error = validator({
			adapter,
			value: testedValue,
			timezone,
			props
		});
		return !valueManager.hasError(error);
	};
	const renderCurrentView = () => {
		if (popperView == null) return null;
		const renderer = viewRenderers[popperView];
		if (renderer == null) return null;
		const rendererProps = _extends({}, propsToForwardToView, {
			views,
			timezone,
			value: viewValue,
			onChange: setValueAndGoToNextView,
			view: popperView,
			onViewChange: setView,
			showViewSwitcher: timeViewsCount > 1,
			timeViewsCount
		}, viewContainerRole === "tooltip" ? {
			focusedView: null,
			onFocusedViewChange: () => {}
		} : {
			focusedView,
			onFocusedViewChange: setFocusedView
		});
		if (RendererInterceptor) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RendererInterceptor, {
			viewRenderers,
			popperView,
			rendererProps
		});
		return renderer(rendererProps);
	};
	return {
		providerProps: {
			localeText,
			contextValue,
			privateContextValue,
			actionsContextValue,
			fieldPrivateContextValue,
			isValidContextValue
		},
		renderCurrentView,
		ownerState
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersLayout/pickersLayoutClasses.mjs
function getPickersLayoutUtilityClass(slot) {
	return generateUtilityClass("MuiPickersLayout", slot);
}
var pickersLayoutClasses = generateUtilityClasses("MuiPickersLayout", [
	"root",
	"landscape",
	"contentWrapper",
	"toolbar",
	"actionBar",
	"tabs",
	"shortcuts"
]);
//#endregion
//#region node_modules/@mui/utils/createChainedFunction/createChainedFunction.mjs
/**
* Safe chained function.
*
* Will only create a new function if needed,
* otherwise will pass back existing functions or null.
*/
function createChainedFunction(...funcs) {
	return funcs.reduce((acc, func) => {
		if (func == null) return acc;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			func.apply(this, args);
		};
	}, () => {});
}
//#endregion
//#region node_modules/@mui/material/SvgIcon/svgIconClasses.mjs
function getSvgIconUtilityClass(slot) {
	return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", [
	"root",
	"colorPrimary",
	"colorSecondary",
	"colorAction",
	"colorError",
	"colorDisabled",
	"fontSizeInherit",
	"fontSizeSmall",
	"fontSizeMedium",
	"fontSizeLarge"
]);
//#endregion
//#region node_modules/@mui/material/SvgIcon/SvgIcon.mjs
var useUtilityClasses$27 = (ownerState) => {
	const { color, fontSize, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		color !== "inherit" && `color${capitalize_default(color)}`,
		`fontSize${capitalize_default(fontSize)}`
	] }, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled("svg", {
	name: "MuiSvgIcon",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`],
			styles[`fontSize${capitalize_default(ownerState.fontSize)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	userSelect: "none",
	width: "1em",
	height: "1em",
	display: "inline-block",
	flexShrink: 0,
	...getTransitionStyles(theme, "fill", { duration: (theme.vars ?? theme).transitions?.duration?.shorter }),
	variants: [
		{
			props: (props) => !props.hasSvgAsChild,
			style: { fill: "currentColor" }
		},
		{
			props: { fontSize: "inherit" },
			style: { fontSize: "inherit" }
		},
		{
			props: { fontSize: "small" },
			style: { fontSize: theme.typography?.pxToRem?.(20) || "1.25rem" }
		},
		{
			props: { fontSize: "medium" },
			style: { fontSize: theme.typography?.pxToRem?.(24) || "1.5rem" }
		},
		{
			props: { fontSize: "large" },
			style: { fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem" }
		},
		...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars ?? theme).palette?.[color]?.main }
		})),
		{
			props: { color: "action" },
			style: { color: (theme.vars ?? theme).palette?.action?.active }
		},
		{
			props: { color: "disabled" },
			style: { color: (theme.vars ?? theme).palette?.action?.disabled }
		},
		{
			props: { color: "inherit" },
			style: { color: void 0 }
		}
	]
})));
var SvgIcon = /*#__PURE__*/ import_react.forwardRef(function SvgIcon(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSvgIcon"
	});
	const { children, className, color = "inherit", component = "svg", fontSize = "medium", htmlColor, inheritViewBox = false, titleAccess, viewBox = "0 0 24 24", ...other } = props;
	const hasSvgAsChild = /*#__PURE__*/ import_react.isValidElement(children) && children.type === "svg";
	const ownerState = {
		...props,
		color,
		component,
		fontSize,
		instanceFontSize: inProps.fontSize,
		inheritViewBox,
		viewBox,
		hasSvgAsChild
	};
	const more = {};
	if (!inheritViewBox) more.viewBox = viewBox;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SvgIconRoot, {
		as: component,
		className: clsx(useUtilityClasses$27(ownerState).root, className),
		focusable: "false",
		color: htmlColor,
		"aria-hidden": titleAccess ? void 0 : true,
		role: titleAccess ? "img" : void 0,
		ref,
		...more,
		...other,
		...hasSvgAsChild && children.props,
		ownerState,
		children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("title", { children: titleAccess }) : null]
	});
});
SvgIcon.propTypes = {
	/**
	* Node passed into the SVG element.
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* You can use the `htmlColor` prop to apply a color attribute to the SVG element.
	* @default 'inherit'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"action",
		"disabled",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	* @default 'medium'
	*/
	fontSize: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"large",
		"medium",
		"small"
	]), import_prop_types.default.string]),
	/**
	* Applies a color attribute to the SVG element.
	*/
	htmlColor: import_prop_types.default.string,
	/**
	* If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
	* prop will be ignored.
	* Useful when you want to reference a custom `component` and have `SvgIcon` pass that
	* `component`'s viewBox to the root node.
	* @default false
	*/
	inheritViewBox: import_prop_types.default.bool,
	/**
	* The shape-rendering attribute. The behavior of the different options is described on the
	* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
	* If you are having issues with blurry icons you should investigate this prop.
	*/
	shapeRendering: import_prop_types.default.string,
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
	* Provides a human-readable title for the element that contains it.
	* https://www.w3.org/TR/SVG-access/#Equivalent
	*/
	titleAccess: import_prop_types.default.string,
	/**
	* Allows you to redefine what the coordinates without units mean inside an SVG element.
	* For example, if the SVG element is 500 (width) by 200 (height),
	* and you pass viewBox="0 0 50 20",
	* this means that the coordinates inside the SVG will go from the top left corner (0,0)
	* to bottom right (50,20) and each unit will be worth 10px.
	* @default '0 0 24 24'
	*/
	viewBox: import_prop_types.default.string
};
SvgIcon.muiName = "SvgIcon";
//#endregion
//#region node_modules/@mui/material/SvgIcon/createSvgIcon.mjs
/**
* Private module reserved for @mui packages.
*/
function createSvgIcon(path, displayName) {
	function Component(props, ref) {
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SvgIcon, {
			"data-testid": `${displayName}Icon`,
			ref,
			...props,
			children: path
		});
	}
	Component.displayName = `${displayName}Icon`;
	Component.muiName = SvgIcon.muiName;
	return /*#__PURE__*/ import_react.memo(/*#__PURE__*/ import_react.forwardRef(Component));
}
//#endregion
//#region node_modules/@mui/material/utils/isMuiElement.mjs
var isMuiElement_default = isMuiElement;
//#endregion
//#region node_modules/@mui/material/utils/useId.mjs
var useId_default = useId;
//#endregion
//#region node_modules/@mui/utils/unsupportedProp/unsupportedProp.mjs
function unsupportedProp(props, propName, componentName, location, propFullName) {
	const propFullNameSafe = propFullName || propName;
	if (typeof props[propName] !== "undefined") return /* @__PURE__ */ new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
	return null;
}
//#endregion
//#region node_modules/@mui/material/utils/unsupportedProp.mjs
var unsupportedProp_default = unsupportedProp;
//#endregion
//#region node_modules/@mui/material/utils/useEventCallback.mjs
var useEventCallback_default = useEventCallback;
//#endregion
//#region node_modules/@mui/utils/isFocusVisible/isFocusVisible.mjs
/**
* Returns a boolean indicating if the event's target has :focus-visible
*/
function isFocusVisible(element) {
	try {
		return element.matches(":focus-visible");
	} catch (error) {
		if (!window.navigator.userAgent.includes("jsdom")) console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join("\n"));
	}
	return false;
}
//#endregion
//#region node_modules/@mui/material/utils/useFocusableWhenDisabled.mjs
function useFocusableWhenDisabled(parameters) {
	const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
	const isFocusableComposite = composite && focusableWhenDisabled !== false;
	const isNonFocusableComposite = composite && focusableWhenDisabled === false;
	return import_react.useMemo(() => {
		const additionalProps = { onKeyDown(event) {
			if (disabled && focusableWhenDisabled && event.key !== "Tab") event.preventDefault();
		} };
		if (!composite) {
			additionalProps.tabIndex = tabIndexProp;
			if (!isNativeButton && disabled) additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
		}
		if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) additionalProps["aria-disabled"] = disabled;
		if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) additionalProps.disabled = disabled;
		return additionalProps;
	}, [
		composite,
		disabled,
		focusableWhenDisabled,
		isFocusableComposite,
		isNonFocusableComposite,
		isNativeButton,
		tabIndexProp
	]);
}
//#endregion
//#region node_modules/@mui/material/ButtonBase/useButtonBase.mjs
var EMPTY$1 = {};
function useButtonBase(parameters) {
	const { nativeButton, nativeButtonProp, internalNativeButton = nativeButton, allowInferredHostMismatch = false, disabled, type, hasFormAction = false, tabIndex = 0, focusableWhenDisabled: focusableWhenDisabledParam, stopEventPropagation = false, onBeforeKeyDown, onBeforeKeyUp } = parameters;
	const rootRef = import_react.useRef(null);
	const focusableWhenDisabled = focusableWhenDisabledParam === true;
	const focusableWhenDisabledProps = useFocusableWhenDisabled({
		focusableWhenDisabled,
		disabled,
		isNativeButton: nativeButton,
		tabIndex
	});
	import_react.useEffect(() => {
		const root = rootRef.current;
		if (root == null) return;
		const isButtonTag = root.tagName === "BUTTON";
		if (nativeButtonProp !== void 0) {
			if (nativeButtonProp && !isButtonTag) console.error("MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`.");
			if (!nativeButtonProp && isButtonTag) console.error("MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.");
			return;
		}
		if (allowInferredHostMismatch) return;
		if (internalNativeButton && !isButtonTag) console.error("MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element.");
		if (!internalNativeButton && isButtonTag) console.error("MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element.");
	}, [
		allowInferredHostMismatch,
		internalNativeButton,
		nativeButtonProp
	]);
	const hasNativeKeyboardActivation = import_react.useCallback(() => {
		const root = rootRef.current;
		if (root == null) return nativeButton;
		if (root.tagName === "BUTTON") return true;
		return Boolean(root.tagName === "A" && root.href);
	}, [nativeButton]);
	const buttonProps = import_react.useMemo(() => {
		const resolvedButtonProps = focusableWhenDisabled ? {} : { tabIndex: disabled ? -1 : tabIndex };
		if (nativeButton) {
			resolvedButtonProps.type = type === void 0 && !hasFormAction ? "button" : type;
			if (!focusableWhenDisabled) resolvedButtonProps.disabled = disabled;
		} else {
			resolvedButtonProps.role = "button";
			if (!focusableWhenDisabled && disabled) resolvedButtonProps["aria-disabled"] = disabled;
		}
		if (focusableWhenDisabled) return {
			...resolvedButtonProps,
			...focusableWhenDisabledProps
		};
		return resolvedButtonProps;
	}, [
		disabled,
		focusableWhenDisabled,
		focusableWhenDisabledProps,
		hasFormAction,
		nativeButton,
		tabIndex,
		type
	]);
	return {
		getButtonProps: import_react.useCallback((externalProps = EMPTY$1) => {
			const { onClick: externalOnClick, onKeyDown: externalOnKeyDown, onKeyUp: externalOnKeyUp, ...otherExternalProps } = externalProps;
			const handleClick = (event) => {
				if (stopEventPropagation) event.stopPropagation();
				if (disabled) {
					event.preventDefault();
					return;
				}
				externalOnClick?.(event);
			};
			const handleKeyDown = (event) => {
				if (focusableWhenDisabled) focusableWhenDisabledProps.onKeyDown(event);
				if (disabled) return;
				onBeforeKeyDown?.(event);
				externalOnKeyDown?.(event);
				if (event.target !== event.currentTarget || hasNativeKeyboardActivation()) return;
				if (event.key === " ") {
					event.preventDefault();
					return;
				}
				if (event.key === "Enter") {
					event.preventDefault();
					event.currentTarget.click();
				}
			};
			const handleKeyUp = (event) => {
				if (disabled) return;
				onBeforeKeyUp?.(event);
				externalOnKeyUp?.(event);
				if (event.target === event.currentTarget && !hasNativeKeyboardActivation() && event.key === " " && !event.defaultPrevented) event.currentTarget.click();
			};
			return {
				...buttonProps,
				...otherExternalProps,
				onClick: handleClick,
				onKeyDown: handleKeyDown,
				onKeyUp: handleKeyUp
			};
		}, [
			buttonProps,
			disabled,
			focusableWhenDisabled,
			focusableWhenDisabledProps,
			hasNativeKeyboardActivation,
			onBeforeKeyDown,
			onBeforeKeyUp,
			stopEventPropagation
		]),
		rootRef
	};
}
//#endregion
//#region node_modules/@mui/material/useLazyRipple/useLazyRipple.mjs
/**
* Lazy initialization container for the Ripple instance. This improves
* performance by delaying mounting the ripple until it's needed.
*/
var LazyRipple = class LazyRipple {
	/** React ref to the ripple instance */
	/** If the ripple component should be mounted */
	/** Promise that resolves when the ripple component is mounted */
	/** If the ripple component has been mounted */
	/** React state hook setter */
	static create() {
		return new LazyRipple();
	}
	static use() {
		const ripple = useLazyRef(LazyRipple.create).current;
		const [shouldMount, setShouldMount] = import_react.useState(false);
		ripple.shouldMount = shouldMount;
		ripple.setShouldMount = setShouldMount;
		import_react.useEffect(ripple.mountEffect, [shouldMount]);
		return ripple;
	}
	constructor() {
		this.ref = { current: null };
		this.mounted = null;
		this.didMount = false;
		this.shouldMount = false;
		this.setShouldMount = null;
	}
	mount() {
		if (!this.mounted) {
			this.mounted = createControlledPromise();
			this.shouldMount = true;
			this.setShouldMount(this.shouldMount);
		}
		return this.mounted;
	}
	mountEffect = () => {
		if (this.shouldMount && !this.didMount) {
			if (this.ref.current !== null) {
				this.didMount = true;
				this.mounted.resolve();
			}
		}
	};
	start(...args) {
		this.mount().then(() => this.ref.current?.start(...args));
	}
	stop(...args) {
		this.mount().then(() => this.ref.current?.stop(...args));
	}
	pulsate(...args) {
		this.mount().then(() => this.ref.current?.pulsate(...args));
	}
};
function useLazyRipple() {
	return LazyRipple.use();
}
function createControlledPromise() {
	let resolve;
	let reject;
	const p = new Promise((resolveFn, rejectFn) => {
		resolve = resolveFn;
		reject = rejectFn;
	});
	p.resolve = resolve;
	p.reject = reject;
	return p;
}
//#endregion
//#region node_modules/@mui/utils/useOnMount/useOnMount.mjs
var EMPTY = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY);
}
//#endregion
//#region node_modules/@mui/utils/useTimeout/useTimeout.mjs
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = null;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = null;
			fn();
		}, delay);
	}
	clear = () => {
		if (this.currentId !== null) {
			clearTimeout(this.currentId);
			this.currentId = null;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
function useTimeout() {
	const timeout = useLazyRef(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/@mui/material/ButtonBase/Ripple.mjs
/**
* @ignore - internal component.
*/
function Ripple(props) {
	const { className, classes, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
	const [leaving, setLeaving] = import_react.useState(false);
	const exitTimer = useTimeout();
	const exitTimerStartedRef = import_react.useRef(false);
	const onExitedRef = import_react.useRef(onExited);
	onExitedRef.current = onExited;
	const hasExitedCallback = onExited != null;
	const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
	const rippleStyles = {
		width: rippleSize,
		height: rippleSize,
		top: -(rippleSize / 2) + rippleY,
		left: -(rippleSize / 2) + rippleX
	};
	const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
	if (!inProp && !leaving) setLeaving(true);
	import_react.useEffect(() => {
		if (!inProp && hasExitedCallback) {
			if (!exitTimerStartedRef.current) {
				exitTimerStartedRef.current = true;
				exitTimer.start(timeout, () => {
					exitTimerStartedRef.current = false;
					onExitedRef.current?.();
				});
			}
		} else {
			exitTimerStartedRef.current = false;
			exitTimer.clear();
		}
	}, [
		exitTimer,
		hasExitedCallback,
		inProp,
		timeout
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		className: rippleClassName,
		style: rippleStyles,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { className: childClassName })
	});
}
Ripple.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object.isRequired,
	className: import_prop_types.default.string,
	/**
	* @ignore - controlled by TouchRipple
	*/
	in: import_prop_types.default.bool,
	/**
	* @ignore - controlled by TouchRipple
	*/
	onExited: import_prop_types.default.func,
	/**
	* If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
	*/
	pulsate: import_prop_types.default.bool,
	/**
	* Diameter of the ripple.
	*/
	rippleSize: import_prop_types.default.number,
	/**
	* Horizontal position of the ripple center.
	*/
	rippleX: import_prop_types.default.number,
	/**
	* Vertical position of the ripple center.
	*/
	rippleY: import_prop_types.default.number,
	/**
	* Exit delay.
	*/
	timeout: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/material/ButtonBase/touchRippleClasses.mjs
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]);
//#endregion
//#region node_modules/@mui/material/ButtonBase/TouchRipple.mjs
var DURATION = 550;
var EMPTY_OBJ = {};
var EMPTY_ARRAY = [];
var NOOP = () => {};
/**
* Keep the same DOM order TouchRipple had when it used react-transition-group:
* exiting ripples stay in place, and new ripples are inserted before the final
* group of ripples that are waiting for their exit animation to finish.
*
* @param {number[]} prevOrder The previous DOM order, including ripples that may be exiting.
* @param {number[]} nextActiveKeys The ripples that should still be treated as active.
* @returns {number[]} The next DOM order, preserving the position of exiting ripples where possible.
*/
function mergeRippleOrder(prevOrder, nextActiveKeys) {
	const nextKeySet = new Set(nextActiveKeys);
	const nextKeysPending = /* @__PURE__ */ new Map();
	let pendingKeys = [];
	for (const prevKey of prevOrder) if (nextKeySet.has(prevKey)) {
		if (pendingKeys.length > 0) {
			nextKeysPending.set(prevKey, pendingKeys);
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	const nextOrder = [];
	for (const nextKey of nextActiveKeys) {
		const pendingBefore = nextKeysPending.get(nextKey);
		if (pendingBefore) nextOrder.push(...pendingBefore);
		nextOrder.push(nextKey);
	}
	nextOrder.push(...pendingKeys);
	return nextOrder;
}
/**
* Calculate where the ripple should start and how large it must be to cover the host element.
*
* @param {object} params
* @param {object} params.event The mouse or touch event that started the ripple.
* @param {HTMLElement | null} params.element The host element used for measurements. Tests pass `null`.
* @param {boolean} params.center If `true`, start the ripple from the center of the host element.
* @returns {{ rippleX: number, rippleY: number, rippleSize: number }} The ripple position and size.
*/
function computeRippleState({ event, element, center }) {
	const rect = element ? element.getBoundingClientRect() : {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
	let rippleX;
	let rippleY;
	if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
		rippleX = Math.round(rect.width / 2);
		rippleY = Math.round(rect.height / 2);
	} else {
		const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
		rippleX = Math.round(clientX - rect.left);
		rippleY = Math.round(clientY - rect.top);
	}
	let rippleSize;
	if (center) {
		rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
		if (rippleSize % 2 === 0) rippleSize += 1;
	} else {
		const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
		const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
		rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
	}
	return {
		rippleX,
		rippleY,
		rippleSize
	};
}
var enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
function getAnimationStyles(theme) {
	if (theme.motion.reducedMotion === "always") return null;
	const styles = css`
    &.${touchRippleClasses.rippleVisible} {
      animation-name: ${enterKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    &.${touchRippleClasses.ripplePulsate} {
      animation-duration: ${theme.transitions.duration.shorter}ms;
    }

    & .${touchRippleClasses.childLeaving} {
      animation-name: ${exitKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    & .${touchRippleClasses.childPulsate} {
      animation-name: ${pulsateKeyframe};
      animation-duration: 2500ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;
	if (theme.motion.reducedMotion === "system") return css`
      @media (prefers-reduced-motion: no-preference) {
        ${styles}
      }
    `;
	return styles;
}
var TouchRippleRoot = styled("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
});
var TouchRippleRipple = styled(Ripple, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({ theme }) => getAnimationStyles(theme)}
`;
/**
* @ignore - internal component.
*/
var TouchRipple = /*#__PURE__*/ import_react.forwardRef(function TouchRipple(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTouchRipple"
	});
	const reducedMotion = useReducedMotion(useTheme().motion.reducedMotion, false);
	const { center: centerProp = false, classes = EMPTY_OBJ, className, ...other } = props;
	const [rippleState, setRippleState] = import_react.useState({
		items: EMPTY_ARRAY,
		order: EMPTY_ARRAY
	});
	const ripples = rippleState.items;
	const nextKey = import_react.useRef(0);
	const rippleCallback = import_react.useRef(null);
	const mountedRef = import_react.useRef(false);
	useOnMount(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	});
	import_react.useEffect(() => {
		if (rippleCallback.current) {
			rippleCallback.current();
			rippleCallback.current = null;
		}
	}, [ripples]);
	const ignoringMouseDown = import_react.useRef(false);
	const startTimer = useTimeout();
	const startTimerCommit = import_react.useRef(null);
	const container = import_react.useRef(null);
	const handleExited = useEventCallback_default((key) => {
		if (!mountedRef.current) return;
		setRippleState((prevState) => {
			const nextItems = prevState.items.filter((ripple) => ripple.key !== key);
			return {
				items: nextItems,
				order: mergeRippleOrder(prevState.order.filter((rippleKey) => rippleKey !== key), nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key))
			};
		});
	});
	const startCommit = useEventCallback_default((params) => {
		const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
		const key = nextKey.current;
		nextKey.current += 1;
		setRippleState((prevState) => {
			const nextItems = [...prevState.items, {
				key,
				pulsate,
				rippleX,
				rippleY,
				rippleSize,
				exiting: false
			}];
			return {
				items: nextItems,
				order: mergeRippleOrder(prevState.order, nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key))
			};
		});
		rippleCallback.current = cb;
	});
	const start = useEventCallback_default((event = EMPTY_OBJ, options = EMPTY_OBJ, cb = NOOP) => {
		const { pulsate = false, center = centerProp || options.pulsate, fakeElement = false } = options;
		if (event?.type === "mousedown" && ignoringMouseDown.current) {
			ignoringMouseDown.current = false;
			return;
		}
		if (event?.type === "touchstart") ignoringMouseDown.current = true;
		const { rippleX, rippleY, rippleSize } = computeRippleState({
			event,
			element: fakeElement ? null : container.current,
			center
		});
		if (event?.touches) {
			if (startTimerCommit.current === null) {
				startTimerCommit.current = () => {
					startCommit({
						pulsate,
						rippleX,
						rippleY,
						rippleSize,
						cb
					});
				};
				startTimer.start(80, () => {
					if (startTimerCommit.current) {
						startTimerCommit.current();
						startTimerCommit.current = null;
					}
				});
			}
		} else startCommit({
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			cb
		});
	});
	const pulsate = useEventCallback_default(() => {
		start(EMPTY_OBJ, { pulsate: true });
	});
	const stop = useEventCallback_default((event, cb) => {
		startTimer.clear();
		if (event?.type === "touchend" && startTimerCommit.current) {
			startTimerCommit.current();
			startTimerCommit.current = null;
			startTimer.start(0, () => {
				stop(event, cb);
			});
			return;
		}
		startTimerCommit.current = null;
		setRippleState((prevState) => {
			const firstActiveIndex = prevState.items.findIndex((ripple) => !ripple.exiting);
			if (firstActiveIndex === -1) return prevState;
			const nextItems = prevState.items.slice();
			nextItems[firstActiveIndex] = {
				...nextItems[firstActiveIndex],
				exiting: true
			};
			return {
				items: nextItems,
				order: mergeRippleOrder(prevState.order, nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key))
			};
		});
		rippleCallback.current = cb;
	});
	import_react.useImperativeHandle(ref, () => ({
		pulsate,
		start,
		stop
	}), [
		pulsate,
		start,
		stop
	]);
	const rippleByKey = new Map(ripples.map((ripple) => [ripple.key, ripple]));
	const orderedRipples = rippleState.order.map((rippleKey) => rippleByKey.get(rippleKey)).filter(Boolean);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TouchRippleRoot, {
		className: clsx(touchRippleClasses.root, classes.root, className),
		ref: container,
		...other,
		children: orderedRipples.map((ripple) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TouchRippleRipple, {
			classes: {
				ripple: clsx(classes.ripple, touchRippleClasses.ripple),
				rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
				ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
				child: clsx(classes.child, touchRippleClasses.child),
				childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
				childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
			},
			timeout: reducedMotion.shouldReduceMotion ? 0 : DURATION,
			pulsate: ripple.pulsate,
			rippleX: ripple.rippleX,
			rippleY: ripple.rippleY,
			rippleSize: ripple.rippleSize,
			in: !ripple.exiting,
			onExited: () => handleExited(ripple.key)
		}, ripple.key))
	});
});
TouchRipple.propTypes = {
	/**
	* If `true`, the ripple starts at the center of the component
	* rather than at the point of interaction.
	*/
	center: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/ButtonBase/buttonBaseClasses.mjs
function getButtonBaseUtilityClass(slot) {
	return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/ButtonBase/ButtonBase.mjs
var useUtilityClasses$26 = (ownerState) => {
	const { disabled, focusVisible, focusVisibleClassName, suppressFocusVisible, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		disabled && "disabled",
		focusVisible && !suppressFocusVisible && "focusVisible"
	] }, getButtonBaseUtilityClass, classes);
	if (focusVisible && !suppressFocusVisible && focusVisibleClassName) composedClasses.root += ` ${focusVisibleClassName}`;
	return composedClasses;
};
var ButtonBaseRoot = styled("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${buttonBaseClasses.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
});
/**
* `ButtonBase` contains as few styles as possible.
* It aims to be a simple building block for creating a button.
* It contains a load of style reset and some focus/ripple logic.
*/
var ButtonBase = /*#__PURE__*/ import_react.forwardRef(function ButtonBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiButtonBase"
	});
	const { action, centerRipple = false, children, className, component = "button", disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, focusVisibleClassName, focusableWhenDisabled, suppressFocusVisible = false, internalNativeButton: internalNativeButtonProp, LinkComponent = "a", nativeButton: nativeButtonProp, onBlur, onClick: onClickProp, onContextMenu, onDragLeave, onFocus, onFocusVisible, onKeyDown: onKeyDownProp, onKeyUp: onKeyUpProp, onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, tabIndex = 0, TouchRippleProps, touchRippleRef, type, ...other } = props;
	const isLink = Boolean(other.href || other.to);
	const hasFormAction = Boolean(other.formAction);
	let ComponentProp = component;
	if (ComponentProp === "button" && isLink) ComponentProp = LinkComponent;
	const internalNativeButton = typeof ComponentProp === "string" ? ComponentProp === "button" : internalNativeButtonProp ?? false;
	const nativeButton = nativeButtonProp ?? internalNativeButton;
	const ripple = useLazyRipple();
	const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	if ((disabled || suppressFocusVisible) && focusVisible) setFocusVisible(false);
	const handleBeforeKeyDown = useEventCallback_default((event) => {
		if (focusRipple && !event.repeat && focusVisible && event.key === " ") ripple.stop(event, () => {
			ripple.start(event);
		});
	});
	const handleBeforeKeyUp = useEventCallback_default((event) => {
		if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) ripple.stop(event, () => {
			ripple.pulsate(event);
		});
	});
	const { getButtonProps, rootRef: buttonRef } = useButtonBase({
		nativeButton,
		nativeButtonProp,
		internalNativeButton,
		allowInferredHostMismatch: isLink || typeof ComponentProp === "string",
		disabled,
		type,
		hasFormAction,
		tabIndex,
		onBeforeKeyDown: handleBeforeKeyDown,
		onBeforeKeyUp: handleBeforeKeyUp
	});
	const { onClick, onKeyDown, onKeyUp, ...buttonProps } = getButtonProps({
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		onKeyUp: onKeyUpProp
	});
	import_react.useImperativeHandle(action, () => ({ focusVisible: () => {
		setFocusVisible(true);
		buttonRef.current.focus();
	} }), [buttonRef]);
	const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
	import_react.useEffect(() => {
		if (focusVisible && focusRipple && !disableRipple) ripple.pulsate();
	}, [
		disableRipple,
		focusRipple,
		focusVisible,
		ripple
	]);
	const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
	const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
	const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
	const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
	const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
		if (focusVisible) event.preventDefault();
		if (onMouseLeave) onMouseLeave(event);
	}, disableTouchRipple);
	const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
	const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
	const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
	const handleBlur = useRippleHandler(ripple, "stop", (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	}, false);
	const handleFocus = useEventCallback_default((event) => {
		if (!buttonRef.current) buttonRef.current = event.currentTarget;
		if (!suppressFocusVisible && isFocusVisible(event.target)) {
			setFocusVisible(true);
			if (onFocusVisible) onFocusVisible(event);
		}
		if (onFocus) onFocus(event);
	});
	const linkProps = {};
	if (isLink) {
		linkProps.tabIndex = disabled ? -1 : tabIndex;
		if (disabled) linkProps["aria-disabled"] = disabled;
		linkProps.type = type;
	}
	const handleRef = useForkRef_default(ref, buttonRef);
	const ownerState = {
		...props,
		centerRipple,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		suppressFocusVisible,
		tabIndex,
		focusVisible
	};
	const classes = useUtilityClasses$26(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ButtonBaseRoot, {
		as: ComponentProp,
		className: clsx(classes.root, className),
		ownerState,
		onBlur: handleBlur,
		onClick,
		onContextMenu: handleContextMenu,
		onFocus: handleFocus,
		onKeyDown,
		onKeyUp,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onDragLeave: handleDragLeave,
		onTouchEnd: handleTouchEnd,
		onTouchMove: handleTouchMove,
		onTouchStart: handleTouchStart,
		ref: handleRef,
		...isLink ? linkProps : buttonProps,
		...other,
		children: [children, enableTouchRipple ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TouchRipple, {
			ref: handleRippleRef,
			center: centerRipple,
			...TouchRippleProps
		}) : null]
	});
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
	return useEventCallback_default((event) => {
		if (eventCallback) eventCallback(event);
		if (!skipRippleAction) ripple[rippleAction](event);
		return true;
	});
}
ButtonBase.propTypes = {
	/**
	* A ref for imperative actions.
	* It currently only supports `focusVisible()` action.
	*/
	action: refType,
	/**
	* If `true`, the ripples are centered.
	* They won't start at the cursor interaction position.
	* @default false
	*/
	centerRipple: import_prop_types.default.bool,
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
	component: elementTypeAcceptingRef_default,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* If `true`, the touch ripple effect is disabled.
	* @default false
	*/
	disableTouchRipple: import_prop_types.default.bool,
	/**
	* If `true`, the base button will have a keyboard focus ripple.
	* @default false
	*/
	focusRipple: import_prop_types.default.bool,
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
	formAction: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
	/**
	* @ignore
	*/
	href: import_prop_types.default.any,
	/**
	* The component used to render a link when the `href` prop is provided.
	* @default 'a'
	*/
	LinkComponent: import_prop_types.default.elementType,
	/**
	* Whether the custom component is expected to render a native `<button>` element
	* when passing a React component to the `component` or `slots` prop.
	*/
	nativeButton: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onBlur: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onClick: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onContextMenu: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onDragLeave: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onFocus: import_prop_types.default.func,
	/**
	* Callback fired when the component is focused with a keyboard.
	* We trigger a `onFocus` callback too.
	*/
	onFocusVisible: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyDown: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyUp: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseDown: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseLeave: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseUp: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchEnd: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchMove: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchStart: import_prop_types.default.func,
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
	tabIndex: import_prop_types.default.number,
	/**
	* Props applied to the `TouchRipple` element.
	*/
	TouchRippleProps: import_prop_types.default.object,
	/**
	* A ref that points to the `TouchRipple` element.
	*/
	touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		pulsate: import_prop_types.default.func.isRequired,
		start: import_prop_types.default.func.isRequired,
		stop: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
	* attribute applied to `button` and `a` elements.
	* Ignored when rendering non-native buttons.
	* @default 'button'
	*/
	type: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/CircularProgress/circularProgressClasses.mjs
function getCircularProgressUtilityClass(slot) {
	return generateUtilityClass("MuiCircularProgress", slot);
}
generateUtilityClasses("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDisableShrink"
]);
//#endregion
//#region node_modules/@mui/material/CircularProgress/CircularProgress.mjs
var SIZE = 44;
var warnedMinMaxWithoutVariant = false;
var warnedInvalidMinMaxValue = false;
var circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses$25 = (ownerState) => {
	const { classes, variant, color, disableShrink } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			`color${capitalize_default(color)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: ["circle", disableShrink && "circleDisableShrink"]
	}, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => {
	const reducedMotionAnimationStyles = getReducedMotionStyles(theme, { animation: "none" });
	return {
		display: "inline-block",
		variants: [
			{
				props: { variant: "determinate" },
				style: { ...getTransitionStyles(theme, "transform") }
			},
			{
				props: { variant: "indeterminate" },
				style: rotateAnimation || { animation: `${circularRotateKeyframe} 1.4s linear infinite` }
			},
			...reducedMotionAnimationStyles ? [{
				props: { variant: "indeterminate" },
				style: reducedMotionAnimationStyles
			}] : [],
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: { color: (theme.vars || theme).palette[color].main }
			}))
		]
	};
}));
var CircularProgressSVG = styled("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" });
var CircularProgressCircle = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.circle, ownerState.disableShrink && styles.circleDisableShrink];
	}
})(memoTheme(({ theme }) => {
	const reducedMotionAnimationStyles = getReducedMotionStyles(theme, { animation: "none" });
	return {
		stroke: "currentColor",
		variants: [
			{
				props: { variant: "determinate" },
				style: { ...getTransitionStyles(theme, "stroke-dashoffset") }
			},
			{
				props: { variant: "indeterminate" },
				style: {
					strokeDasharray: "80px, 200px",
					strokeDashoffset: 0
				}
			},
			{
				props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
				style: dashAnimation || { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` }
			},
			...reducedMotionAnimationStyles ? [{
				props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
				style: reducedMotionAnimationStyles
			}] : []
		]
	};
}));
var CircularProgressTrack = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
/**
* ## ARIA
*
* If the progress bar is describing the loading progress of a particular region of a page,
* you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
* attribute to `true` on that region until it has finished loading.
*/
var CircularProgress = /*#__PURE__*/ import_react.forwardRef(function CircularProgress(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCircularProgress"
	});
	const { className, color = "primary", disableShrink = false, enableTrackSlot = false, min: minProp, max: maxProp, size = 40, style, thickness = 3.6, value = props.min ?? 0, variant = "indeterminate", ...other } = props;
	if (!warnedMinMaxWithoutVariant && variant === "indeterminate" && (minProp !== void 0 || maxProp !== void 0)) {
		console.warn(`MUI: You have provided the \`min\` or \`max\` props with an 'indeterminate' variant. These props will have no effect.`);
		warnedMinMaxWithoutVariant = true;
	}
	const min = minProp ?? 0;
	const max = maxProp ?? 100;
	const ownerState = {
		...props,
		color,
		disableShrink,
		size,
		thickness,
		value,
		variant,
		enableTrackSlot
	};
	const classes = useUtilityClasses$25(ownerState);
	const circleStyle = {};
	const rootStyle = {};
	const rootProps = {};
	if (variant === "determinate") {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		if (!warnedInvalidMinMaxValue && (value < min || value > max || min >= max)) {
			console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`);
			warnedInvalidMinMaxValue = true;
		}
		const range = max - min;
		circleStyle.strokeDasharray = circumference.toFixed(3);
		circleStyle.strokeDashoffset = range > 0 ? `${((max - value) / range * circumference).toFixed(3)}px` : `${circumference.toFixed(3)}px`;
		rootStyle.transform = "rotate(-90deg)";
		rootProps["aria-valuenow"] = value;
		rootProps["aria-valuemin"] = min;
		rootProps["aria-valuemax"] = max;
	}
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CircularProgressRoot, {
		className: clsx(classes.root, className),
		style: {
			width: size,
			height: size,
			...rootStyle,
			...style
		},
		ownerState,
		ref,
		role: "progressbar",
		...rootProps,
		...other,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(CircularProgressSVG, {
			className: classes.svg,
			ownerState,
			viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
			children: [enableTrackSlot ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CircularProgressTrack, {
				className: classes.track,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness,
				"aria-hidden": "true"
			}) : null, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CircularProgressCircle, {
				className: classes.circle,
				style: circleStyle,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness
			})]
		})
	});
});
CircularProgress.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the shrink animation is disabled.
	* This only works if variant is `indeterminate`.
	* @default false
	*/
	disableShrink: chainPropTypes(import_prop_types.default.bool, (props) => {
		if (props.disableShrink && props.variant && props.variant !== "indeterminate") return /* @__PURE__ */ new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.");
		return null;
	}),
	/**
	* If `true`, a track circle slot is mounted to show a subtle background for the progress.
	* The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
	* @default false
	*/
	enableTrackSlot: import_prop_types.default.bool,
	/**
	* The maximum value for the progress indicator for the determinate variant.
	* @default 100
	*/
	max: import_prop_types.default.number,
	/**
	* The minimum value for the progress indicator for the determinate variant.
	* @default 0
	*/
	min: import_prop_types.default.number,
	/**
	* The size of the component.
	* If using a number, the pixel unit is assumed.
	* If using a string, you need to provide the CSS unit, for example '3rem'.
	* @default 40
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
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
	]),
	/**
	* The thickness of the circle.
	* @default 3.6
	*/
	thickness: import_prop_types.default.number,
	/**
	* The value of the progress indicator for the determinate variant.
	* Value between `min` and `max`.
	* @default props.min ?? 0
	*/
	value: import_prop_types.default.number,
	/**
	* The variant to use.
	* Use indeterminate when there is no progress value.
	* @default 'indeterminate'
	*/
	variant: import_prop_types.default.oneOf(["determinate", "indeterminate"])
};
//#endregion
//#region node_modules/@mui/material/Button/buttonClasses.mjs
function getButtonUtilityClass(slot) {
	return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", [
	"root",
	"text",
	"outlined",
	"contained",
	"disableElevation",
	"focusVisible",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorError",
	"colorInfo",
	"colorWarning",
	"sizeMedium",
	"sizeSmall",
	"sizeLarge",
	"fullWidth",
	"startIcon",
	"endIcon",
	"icon",
	"loading",
	"loadingWrapper",
	"loadingIconPlaceholder",
	"loadingIndicator",
	"loadingPositionCenter",
	"loadingPositionStart",
	"loadingPositionEnd"
]);
//#endregion
//#region node_modules/@mui/material/ButtonGroup/ButtonGroupContext.mjs
/**
* @ignore - internal component.
*/
var ButtonGroupContext = /*#__PURE__*/ import_react.createContext({});
ButtonGroupContext.displayName = "ButtonGroupContext";
//#endregion
//#region node_modules/@mui/material/ButtonGroup/ButtonGroupButtonContext.mjs
/**
* @ignore - internal component.
*/
var ButtonGroupButtonContext = /*#__PURE__*/ import_react.createContext(void 0);
ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
//#endregion
//#region node_modules/@mui/material/Button/Button.mjs
var useUtilityClasses$24 = (ownerState) => {
	const { color, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			loading && "loading",
			variant,
			`size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			disableElevation && "disableElevation",
			fullWidth && "fullWidth",
			loading && `loadingPosition${capitalize_default(loadingPosition)}`
		],
		startIcon: ["icon", "startIcon"],
		endIcon: ["icon", "endIcon"],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var commonIconStyles = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
];
var ButtonRoot = styled(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles.colorInherit,
			ownerState.disableElevation && styles.disableElevation,
			ownerState.fullWidth && styles.fullWidth,
			ownerState.loading && styles.loading
		];
	}
})(memoTheme(({ theme }) => {
	const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
	const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
	return {
		...theme.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (theme.vars || theme).shape.borderRadius,
		...getTransitionStyles(theme, [
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: theme.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${buttonClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
		variants: [
			{
				props: { variant: "contained" },
				style: {
					color: `var(--variant-containedColor)`,
					backgroundColor: `var(--variant-containedBg)`,
					boxShadow: (theme.vars || theme).shadows[2],
					"&:hover": {
						boxShadow: (theme.vars || theme).shadows[4],
						"@media (hover: none)": { boxShadow: (theme.vars || theme).shadows[2] }
					},
					"&:active": { boxShadow: (theme.vars || theme).shadows[8] },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
					[`&.${buttonClasses.disabled}`]: {
						color: (theme.vars || theme).palette.action.disabled,
						boxShadow: (theme.vars || theme).shadows[0],
						backgroundColor: (theme.vars || theme).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: `var(--variant-outlinedBorder, currentColor)`,
					backgroundColor: `var(--variant-outlinedBg)`,
					color: `var(--variant-outlinedColor)`,
					[`&.${buttonClasses.disabled}`]: { border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: `var(--variant-textColor)`,
					backgroundColor: `var(--variant-textBg)`
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: {
					"--variant-textColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color].main, .5),
					"--variant-containedColor": (theme.vars || theme).palette[color].contrastText,
					"--variant-containedBg": (theme.vars || theme).palette[color].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (theme.vars || theme).palette[color].dark,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (theme.vars || theme).palette[color].main,
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: true },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${buttonClasses.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: true },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					...getTransitionStyles(theme, [
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: theme.transitions.duration.short }),
					[`&.${buttonClasses.loading}`]: { color: "transparent" }
				}
			}
		]
	};
}));
var ButtonStartIcon = styled("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.startIcon, ownerState.loading && styles.startIconLoadingStart];
	}
})(({ theme }) => ({
	display: "inherit",
	alignItems: "center",
	marginRight: 8,
	marginLeft: -4,
	"&::before": {
		content: "\"\\200b\"",
		width: 0,
		overflow: "hidden"
	},
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: true
			},
			style: {
				...getTransitionStyles(theme, ["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: true,
				fullWidth: true
			},
			style: { marginRight: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonEndIcon = styled("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.endIcon, ownerState.loading && styles.endIconLoadingEnd];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: true
			},
			style: {
				...getTransitionStyles(theme, ["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: true,
				fullWidth: true
			},
			style: { marginLeft: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonLoadingIndicator = styled("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: true },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (theme.vars || theme).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: true
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: true
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
}));
var ButtonLoadingIconPlaceholder = styled("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
});
var Button = /*#__PURE__*/ import_react.forwardRef(function Button(inProps, ref) {
	const contextProps = import_react.useContext(ButtonGroupContext);
	const buttonGroupButtonContextPositionClassName = import_react.useContext(ButtonGroupButtonContext);
	const props = useDefaultProps({
		props: resolveProps(contextProps, inProps),
		name: "MuiButton"
	});
	const { children, color = "primary", component = "button", className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, loadingPosition = "center", size = "medium", startIcon: startIconProp, type, variant = "text", ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		disableElevation,
		disableFocusRipple,
		fullWidth,
		loading,
		loadingIndicator,
		loadingPosition,
		size,
		type,
		variant
	};
	const classes = useUtilityClasses$24(ownerState);
	const startIcon = (startIconProp || loading && loadingPosition === "start") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ButtonStartIcon, {
		className: classes.startIcon,
		ownerState,
		children: startIconProp || /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const endIcon = (endIconProp || loading && loadingPosition === "end") && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ButtonEndIcon, {
		className: classes.endIcon,
		ownerState,
		children: endIconProp || /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const positionClassName = buttonGroupButtonContextPositionClassName || "";
	const loader = typeof loading === "boolean" ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		className: classes.loadingWrapper,
		style: { display: "contents" },
		children: loading && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ButtonLoadingIndicator, {
			className: classes.loadingIndicator,
			ownerState,
			children: loadingIndicator
		})
	}) : null;
	const { root, ...forwardedClasses } = classes;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ButtonRoot, {
		ownerState,
		className: clsx(contextProps.className, classes.root, className, positionClassName),
		component,
		disabled: disabled || loading,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
		ref,
		internalNativeButton: true,
		type,
		id: loading ? loadingId : idProp,
		...other,
		classes: forwardedClasses,
		children: [
			startIcon,
			loadingPosition !== "end" && loader,
			children,
			loadingPosition === "end" && loader,
			endIcon
		]
	});
});
Button.propTypes = {
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, no elevation is used.
	* @default false
	*/
	disableElevation: import_prop_types.default.bool,
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
	* Element placed after the children.
	*/
	endIcon: import_prop_types.default.node,
	/**
	* @ignore
	*/
	focusVisibleClassName: import_prop_types.default.string,
	/**
	* If `true`, the button will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* The URL to link to when the button is clicked.
	* If defined, an `a` element will be used as the root node.
	*/
	href: import_prop_types.default.string,
	/**
	* @ignore
	*/
	id: import_prop_types.default.string,
	/**
	* If `true`, the loading indicator is visible and the button is disabled.
	* If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
	* @default null
	*/
	loading: import_prop_types.default.bool,
	/**
	* Element placed before the children if the button is in loading state.
	* The node should contain an element with `role="progressbar"` with an accessible name.
	* By default, it renders a `CircularProgress` that is labeled by the button itself.
	* @default <CircularProgress color="inherit" size={16} />
	*/
	loadingIndicator: import_prop_types.default.node,
	/**
	* The loading indicator can be positioned on the start, end, or the center of the button.
	* @default 'center'
	*/
	loadingPosition: import_prop_types.default.oneOf([
		"center",
		"end",
		"start"
	]),
	/**
	* The size of the component.
	* `small` is equivalent to the dense button styling.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	/**
	* Element placed before the children.
	*/
	startIcon: import_prop_types.default.node,
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
	* @ignore
	*/
	type: import_prop_types.default.string,
	/**
	* The variant to use.
	* @default 'text'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"contained",
		"outlined",
		"text"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/DialogActions/dialogActionsClasses.mjs
function getDialogActionsUtilityClass(slot) {
	return generateUtilityClass("MuiDialogActions", slot);
}
generateUtilityClasses("MuiDialogActions", ["root", "spacing"]);
//#endregion
//#region node_modules/@mui/material/DialogActions/DialogActions.mjs
var useUtilityClasses$23 = (ownerState) => {
	const { classes, disableSpacing } = ownerState;
	return composeClasses({ root: ["root", !disableSpacing && "spacing"] }, getDialogActionsUtilityClass, classes);
};
var DialogActionsRoot = styled("div", {
	name: "MuiDialogActions",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.disableSpacing && styles.spacing];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 8,
	justifyContent: "flex-end",
	flex: "0 0 auto",
	variants: [{
		props: ({ ownerState }) => !ownerState.disableSpacing,
		style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } }
	}]
});
var DialogActions = /*#__PURE__*/ import_react.forwardRef(function DialogActions(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogActions"
	});
	const { className, disableSpacing = false, ...other } = props;
	const ownerState = {
		...props,
		disableSpacing
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogActionsRoot, {
		className: clsx(useUtilityClasses$23(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
DialogActions.propTypes = {
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
	* If `true`, the actions do not have additional margin.
	* @default false
	*/
	disableSpacing: import_prop_types.default.bool,
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
//#region node_modules/@mui/x-date-pickers/PickersActionBar/PickersActionBar.mjs
var _excluded$14 = ["actions"];
var PickersActionBarRoot = styled(DialogActions, {
	name: "MuiPickersLayout",
	slot: "ActionBar"
})({});
/**
* Demos:
*
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
* - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
*
* API:
*
* - [PickersActionBar API](https://mui.com/x/api/date-pickers/pickers-action-bar/)
*/
function PickersActionBarComponent(props) {
	const { actions } = props, other = _objectWithoutPropertiesLoose(props, _excluded$14);
	const translations = usePickerTranslations();
	const { clearValue, setValueToToday, acceptValueChanges, cancelValueChanges, goToNextStep, hasNextStep } = usePickerContext();
	if (actions == null || actions.length === 0) return null;
	const buttons = actions?.map((actionType) => {
		switch (actionType) {
			case "clear": return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
				onClick: clearValue,
				children: translations.clearButtonLabel
			}, actionType);
			case "cancel": return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
				onClick: cancelValueChanges,
				children: translations.cancelButtonLabel
			}, actionType);
			case "accept": return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
				onClick: acceptValueChanges,
				children: translations.okButtonLabel
			}, actionType);
			case "today": return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
				onClick: setValueToToday,
				children: translations.todayButtonLabel
			}, actionType);
			case "next": return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
				onClick: goToNextStep,
				children: translations.nextStepButtonLabel
			}, actionType);
			case "nextOrAccept":
				if (hasNextStep) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
					onClick: goToNextStep,
					children: translations.nextStepButtonLabel
				}, actionType);
				return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Button, {
					onClick: acceptValueChanges,
					children: translations.okButtonLabel
				}, actionType);
			default: return null;
		}
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersActionBarRoot, _extends({}, other, { children: buttons }));
}
PickersActionBarComponent.propTypes = {
	/**
	* Ordered array of actions to display.
	* If empty, does not display that action bar.
	* @default
	* - `[]` for Pickers with one selection step which `closeOnSelect`.
	* - `['cancel', 'nextOrAccept']` for all other Pickers.
	*/
	actions: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"accept",
		"cancel",
		"clear",
		"next",
		"nextOrAccept",
		"today"
	]).isRequired),
	/**
	* If `true`, the actions do not have additional margin.
	* @default false
	*/
	disableSpacing: import_prop_types.default.bool,
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
var PickersActionBar = /*#__PURE__*/ import_react.memo(PickersActionBarComponent);
PickersActionBar.displayName = "PickersActionBar";
//#endregion
//#region node_modules/@mui/material/List/ListContext.mjs
/**
* @ignore - internal component.
*/
var ListContext = /*#__PURE__*/ import_react.createContext({});
ListContext.displayName = "ListContext";
//#endregion
//#region node_modules/@mui/material/List/listClasses.mjs
function getListUtilityClass(slot) {
	return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", [
	"root",
	"padding",
	"dense",
	"subheader"
]);
//#endregion
//#region node_modules/@mui/material/List/List.mjs
var useUtilityClasses$22 = (ownerState) => {
	const { classes, disablePadding, dense, subheader } = ownerState;
	return composeClasses({ root: [
		"root",
		!disablePadding && "padding",
		dense && "dense",
		subheader && "subheader"
	] }, getListUtilityClass, classes);
};
var ListRoot = styled("ul", {
	name: "MuiList",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disablePadding && styles.padding,
			ownerState.dense && styles.dense,
			ownerState.subheader && styles.subheader
		];
	}
})({
	listStyle: "none",
	margin: 0,
	padding: 0,
	position: "relative",
	variants: [{
		props: ({ ownerState }) => !ownerState.disablePadding,
		style: {
			paddingTop: 8,
			paddingBottom: 8
		}
	}, {
		props: ({ ownerState }) => ownerState.subheader,
		style: {
			paddingTop: 0,
			isolation: "isolate"
		}
	}]
});
var List = /*#__PURE__*/ import_react.forwardRef(function List(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiList"
	});
	const { children, className, component = "ul", dense = false, disablePadding = false, subheader, ...other } = props;
	const context = import_react.useMemo(() => ({ dense }), [dense]);
	const ownerState = {
		...props,
		component,
		dense,
		disablePadding
	};
	const classes = useUtilityClasses$22(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: context,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ListRoot, {
			as: component,
			className: clsx(classes.root, className),
			ref,
			ownerState,
			...other,
			children: [subheader, children]
		})
	});
});
List.propTypes = {
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
	* If `true`, compact vertical padding designed for keyboard and mouse input is used for
	* the list and list items.
	* The prop is available to descendant components as the `dense` context.
	* @default false
	*/
	dense: import_prop_types.default.bool,
	/**
	* If `true`, vertical padding is removed from the list.
	* @default false
	*/
	disablePadding: import_prop_types.default.bool,
	/**
	* The content of the subheader, normally `ListSubheader`.
	*/
	subheader: import_prop_types.default.node,
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
//#region node_modules/@mui/material/utils/useSlot.mjs
/**
* An internal function to create a Material UI slot.
*
* This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
* while Base UI does not need to support leaf component customization.
*
* @param {string} name: name of the slot
* @param {object} parameters
* @returns {[Slot, slotProps]} The slot's React component and the slot's props
*
* Note: the returned slot's props
* - will never contain `component` prop.
* - might contain `as` prop.
*/
function useSlot(name, parameters) {
	const { className, elementType: initialElementType, ownerState, externalForwardedProps, internalForwardedProps, shouldForwardComponentProp = false, ...useSlotPropsParams } = parameters;
	const { component: rootComponent, slots = { [name]: void 0 }, slotProps = { [name]: void 0 }, ...other } = externalForwardedProps;
	const elementType = slots[name] || initialElementType;
	const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
	const { props: { component: slotComponent, ...mergedProps }, internalRef } = mergeSlotProps$1({
		className,
		...useSlotPropsParams,
		externalForwardedProps: name === "root" ? other : void 0,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
	const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
	return [elementType, appendOwnerState(elementType, {
		...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
		...name !== "root" && !slots[name] && internalForwardedProps,
		...mergedProps,
		...LeafComponent && !shouldForwardComponentProp && { as: LeafComponent },
		...LeafComponent && shouldForwardComponentProp && { component: LeafComponent },
		ref
	}, ownerState)];
}
//#endregion
//#region node_modules/@mui/material/ListItem/listItemClasses.mjs
function getListItemUtilityClass(slot) {
	return generateUtilityClass("MuiListItem", slot);
}
generateUtilityClasses("MuiListItem", [
	"root",
	"dense",
	"alignItemsFlexStart",
	"divider",
	"gutters",
	"padding",
	"secondaryAction"
]);
//#endregion
//#region node_modules/@mui/material/ListItemSecondaryAction/listItemSecondaryActionClasses.mjs
function getListItemSecondaryActionClassesUtilityClass(slot) {
	return generateUtilityClass("MuiListItemSecondaryAction", slot);
}
generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);
//#endregion
//#region node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.mjs
var useUtilityClasses$21 = (ownerState) => {
	const { disableGutters, classes } = ownerState;
	return composeClasses({ root: ["root", disableGutters && "disableGutters"] }, getListItemSecondaryActionClassesUtilityClass, classes);
};
var ListItemSecondaryActionRoot = styled("div", {
	name: "MuiListItemSecondaryAction",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.disableGutters && styles.disableGutters];
	}
})({
	position: "absolute",
	right: 16,
	top: "50%",
	transform: "translateY(-50%)",
	variants: [{
		props: ({ ownerState }) => ownerState.disableGutters,
		style: { right: 0 }
	}]
});
/**
* Must be used as the last child of ListItem to function properly.
*/
var ListItemSecondaryAction = /*#__PURE__*/ import_react.forwardRef(function ListItemSecondaryAction(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemSecondaryAction"
	});
	const { className, component, ...other } = props;
	const context = import_react.useContext(ListContext);
	const ownerState = {
		...props,
		disableGutters: context.disableGutters
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListItemSecondaryActionRoot, {
		as: component,
		className: clsx(useUtilityClasses$21(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
ListItemSecondaryAction.propTypes = {
	/**
	* The content of the component, normally an `IconButton` or selection control.
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
ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
//#endregion
//#region node_modules/@mui/material/ListItem/ListItem.mjs
var overridesResolver$1 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters,
		!ownerState.disablePadding && styles.padding
	];
};
var useUtilityClasses$20 = (ownerState) => {
	const { alignItems, classes, dense, disableGutters, disablePadding, divider } = ownerState;
	return composeClasses({
		root: [
			"root",
			dense && "dense",
			!disableGutters && "gutters",
			!disablePadding && "padding",
			divider && "divider",
			alignItems === "flex-start" && "alignItemsFlexStart"
		],
		secondaryAction: ["secondaryAction"]
	}, getListItemUtilityClass, classes);
};
var ListItemRoot = styled("div", {
	name: "MuiListItem",
	slot: "Root",
	overridesResolver: overridesResolver$1
})(memoTheme(({ theme }) => ({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	width: "100%",
	boxSizing: "border-box",
	textAlign: "left",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disablePadding,
			style: {
				paddingTop: 8,
				paddingBottom: 8
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && ownerState.dense,
			style: {
				paddingTop: 4,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
			style: { paddingRight: 48 }
		},
		{
			props: ({ ownerState }) => !!ownerState.secondaryAction,
			style: { [`& > .${listItemButtonClasses.root}`]: { paddingRight: 48 } }
		},
		{
			props: { alignItems: "flex-start" },
			style: { alignItems: "flex-start" }
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => ownerState.button,
			style: {
				...getTransitionStyles(theme, "background-color", { duration: theme.transitions.duration.shortest }),
				"&:hover": {
					textDecoration: "none",
					backgroundColor: (theme.vars || theme).palette.action.hover,
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		}
	]
})));
var StyledListItemSecondaryAction = styled(ListItemSecondaryAction, {
	name: "MuiListItem",
	slot: "secondaryAction"
})({});
var ListItem = /*#__PURE__*/ import_react.forwardRef(function ListItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItem"
	});
	const { alignItems = "center", children: childrenProp, className, component: componentProp = "li", dense = false, disableGutters = false, disablePadding = false, divider = false, secondaryAction, slotProps = {}, slots = {}, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		alignItems,
		disableGutters
	}), [
		alignItems,
		context.dense,
		dense,
		disableGutters
	]);
	const ownerState = {
		...props,
		alignItems,
		dense: childContext.dense,
		disableGutters,
		disablePadding,
		divider,
		secondaryAction
	};
	const classes = useUtilityClasses$20(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: ListItemRoot,
		externalForwardedProps: {
			component: componentProp,
			...externalForwardedProps,
			...other
		},
		ownerState,
		className: clsx(classes.root, className)
	});
	const [SecondaryActionSlot, secondaryActionSlotProps] = useSlot("secondaryAction", {
		elementType: StyledListItemSecondaryAction,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: classes.secondaryAction
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(RootSlot, {
			...rootSlotProps,
			children: [childrenProp, secondaryAction && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SecondaryActionSlot, {
				...secondaryActionSlotProps,
				children: secondaryAction
			})]
		})
	});
});
ListItem.propTypes = {
	/**
	* Defines the `align-items` style property.
	* @default 'center'
	*/
	alignItems: import_prop_types.default.oneOf(["center", "flex-start"]),
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
	* The prop defaults to the value inherited from the parent List component.
	* @default false
	*/
	dense: import_prop_types.default.bool,
	/**
	* If `true`, the left and right padding is removed.
	* @default false
	*/
	disableGutters: import_prop_types.default.bool,
	/**
	* If `true`, all padding is removed.
	* @default false
	*/
	disablePadding: import_prop_types.default.bool,
	/**
	* If `true`, a 1px light border is added to the bottom of the list item.
	* @default false
	*/
	divider: import_prop_types.default.bool,
	/**
	* The element to display at the end of ListItem.
	*/
	secondaryAction: import_prop_types.default.node,
	/**
	* The extra props for the slot components.
	* You can override the existing props or add new ones.
	*
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		secondaryAction: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	*
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		root: import_prop_types.default.elementType,
		secondaryAction: import_prop_types.default.elementType
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
	])
};
//#endregion
//#region node_modules/@mui/material/internal/svg-icons/Cancel.mjs
/**
* @ignore - internal component.
*/
var Cancel_default = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }), "Cancel");
//#endregion
//#region node_modules/@mui/material/Chip/chipClasses.mjs
function getChipUtilityClass(slot) {
	return generateUtilityClass("MuiChip", slot);
}
var chipClasses = generateUtilityClasses("MuiChip", [
	"root",
	"sizeSmall",
	"sizeMedium",
	"colorDefault",
	"colorError",
	"colorInfo",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorWarning",
	"disabled",
	"clickable",
	"deletable",
	"outlined",
	"filled",
	"avatar",
	"icon",
	"label",
	"deleteIcon",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/Chip/Chip.mjs
var useUtilityClasses$19 = (ownerState) => {
	const { classes, disabled, size, color, onDelete, clickable, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			disabled && "disabled",
			`size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			clickable && "clickable",
			onDelete && "deletable"
		],
		label: ["label"],
		avatar: ["avatar"],
		icon: ["icon"],
		deleteIcon: ["deleteIcon"]
	}, getChipUtilityClass, classes);
};
var ChipRoot = styled("div", {
	name: "MuiChip",
	slot: "Root",
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "focusableWhenDisabled" && prop !== "skipFocusWhenDisabled",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		const { color, clickable, onDelete, size, variant } = ownerState;
		return [
			{ [`& .${chipClasses.avatar}`]: styles.avatar },
			{ [`& .${chipClasses.icon}`]: styles.icon },
			{ [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
			styles.root,
			styles[`size${capitalize_default(size)}`],
			styles[`color${capitalize_default(color)}`],
			clickable && styles.clickable,
			onDelete && styles.deletable,
			styles[variant]
		];
	}
})(memoTheme(({ theme }) => {
	const textColor = theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300];
	return {
		maxWidth: "100%",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.pxToRem(13),
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		lineHeight: 1.5,
		color: (theme.vars || theme).palette.text.primary,
		backgroundColor: (theme.vars || theme).palette.action.selected,
		borderRadius: 32 / 2,
		whiteSpace: "nowrap",
		...getTransitionStyles(theme, ["background-color", "box-shadow"]),
		cursor: "unset",
		outline: 0,
		textDecoration: "none",
		border: 0,
		padding: 0,
		verticalAlign: "middle",
		boxSizing: "border-box",
		[`&.${chipClasses.disabled}`]: {
			opacity: (theme.vars || theme).palette.action.disabledOpacity,
			pointerEvents: "none"
		},
		[`& .${chipClasses.avatar}`]: {
			marginLeft: 5,
			marginRight: -6,
			width: 24,
			height: 24,
			color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
			fontSize: theme.typography.pxToRem(12)
		},
		[`& .${chipClasses.icon}`]: {
			marginLeft: 5,
			marginRight: -6
		},
		[`& .${chipClasses.deleteIcon}`]: {
			WebkitTapHighlightColor: "transparent",
			color: theme.alpha((theme.vars || theme).palette.text.primary, .26),
			fontSize: 22,
			cursor: "pointer",
			margin: "0 5px 0 -6px",
			"&:hover": { color: theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		variants: [
			{
				props: { color: "primary" },
				style: { [`& .${chipClasses.avatar}`]: {
					color: (theme.vars || theme).palette.primary.contrastText,
					backgroundColor: (theme.vars || theme).palette.primary.dark
				} }
			},
			{
				props: { color: "secondary" },
				style: { [`& .${chipClasses.avatar}`]: {
					color: (theme.vars || theme).palette.secondary.contrastText,
					backgroundColor: (theme.vars || theme).palette.secondary.dark
				} }
			},
			{
				props: { size: "small" },
				style: {
					height: 24,
					[`& .${chipClasses.avatar}`]: {
						marginLeft: 4,
						marginRight: -4,
						width: 18,
						height: 18,
						fontSize: theme.typography.pxToRem(10)
					},
					[`& .${chipClasses.icon}`]: {
						fontSize: 18,
						marginLeft: 4,
						marginRight: -4
					},
					[`& .${chipClasses.deleteIcon}`]: {
						fontSize: 16,
						marginRight: 4,
						marginLeft: -4
					}
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => {
				return {
					props: { color },
					style: {
						backgroundColor: (theme.vars || theme).palette[color].main,
						color: (theme.vars || theme).palette[color].contrastText,
						[`& .${chipClasses.deleteIcon}`]: {
							color: theme.alpha((theme.vars || theme).palette[color].contrastText, .7),
							"&:hover, &:active": { color: (theme.vars || theme).palette[color].contrastText }
						}
					}
				};
			}),
			{
				props: (props) => props.iconColor === props.color,
				style: { [`& .${chipClasses.icon}`]: { color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor } }
			},
			{
				props: (props) => props.iconColor === props.color && props.color !== "default",
				style: { [`& .${chipClasses.icon}`]: { color: "inherit" } }
			},
			{
				props: { onDelete: true },
				style: { [`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) } }
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => {
				return {
					props: {
						color,
						onDelete: true
					},
					style: { [`&.${chipClasses.focusVisible}`]: { background: (theme.vars || theme).palette[color].dark } }
				};
			}),
			{
				props: { clickable: true },
				style: {
					userSelect: "none",
					WebkitTapHighlightColor: "transparent",
					cursor: "pointer",
					"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) },
					"&:active": { boxShadow: (theme.vars || theme).shadows[1] }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
				props: {
					color,
					clickable: true
				},
				style: { [`&:hover, &.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette[color].dark } }
			})),
			{
				props: { variant: "outlined" },
				style: {
					backgroundColor: "transparent",
					border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700]}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: (theme.vars || theme).palette.action.hover },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
					[`& .${chipClasses.avatar}`]: { marginLeft: 4 },
					[`& .${chipClasses.icon}`]: { marginLeft: 4 },
					[`& .${chipClasses.deleteIcon}`]: { marginRight: 5 }
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					[`& .${chipClasses.avatar}`]: { marginLeft: 2 },
					[`& .${chipClasses.icon}`]: { marginLeft: 2 },
					[`& .${chipClasses.deleteIcon}`]: { marginRight: 3 }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					variant: "outlined",
					color
				},
				style: {
					color: (theme.vars || theme).palette[color].main,
					border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, .7)}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.focusOpacity) },
					[`& .${chipClasses.deleteIcon}`]: {
						color: theme.alpha((theme.vars || theme).palette[color].main, .7),
						"&:hover, &:active": { color: (theme.vars || theme).palette[color].main }
					}
				}
			}))
		]
	};
}));
var ChipLabel = styled("span", {
	name: "MuiChip",
	slot: "Label"
})({
	overflow: "hidden",
	textOverflow: "ellipsis",
	paddingLeft: 12,
	paddingRight: 12,
	whiteSpace: "nowrap",
	variants: [
		{
			props: { variant: "outlined" },
			style: {
				paddingLeft: 11,
				paddingRight: 11
			}
		},
		{
			props: { size: "small" },
			style: {
				paddingLeft: 8,
				paddingRight: 8
			}
		},
		{
			props: {
				size: "small",
				variant: "outlined"
			},
			style: {
				paddingLeft: 7,
				paddingRight: 7
			}
		}
	]
});
function isDeleteKeyboardEvent(keyboardEvent) {
	return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
/**
* Chips represent complex entities in small blocks, such as a contact.
*/
var Chip = /*#__PURE__*/ import_react.forwardRef(function Chip(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiChip"
	});
	const { avatar: avatarProp, className, clickable: clickableProp, color = "default", component: ComponentProp, deleteIcon: deleteIconProp, disabled = false, icon: iconProp, label, onClick, onDelete, onKeyDown, onKeyUp, size = "medium", variant = "filled", tabIndex, skipFocusWhenDisabled = false, slots = {}, slotProps = {}, ...other } = props;
	const { nativeButton, ...buttonBaseProps } = other;
	const handleRef = useForkRef_default(import_react.useRef(null), ref);
	const handleDeleteIconClick = (event) => {
		event.stopPropagation();
		onDelete(event);
	};
	const handleKeyDown = (event) => {
		if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) event.preventDefault();
		if (onKeyDown) onKeyDown(event);
	};
	const handleKeyUp = (event) => {
		if (event.currentTarget === event.target) {
			if (onDelete && isDeleteKeyboardEvent(event)) onDelete(event);
		}
		if (onKeyUp) onKeyUp(event);
	};
	const clickable = clickableProp !== false && onClick ? true : clickableProp;
	const component = clickable || onDelete ? ButtonBase : ComponentProp || "div";
	const ownerState = {
		...props,
		component,
		disabled,
		size,
		color,
		iconColor: /*#__PURE__*/ import_react.isValidElement(iconProp) ? iconProp.props.color || color : color,
		onDelete: !!onDelete,
		clickable,
		variant
	};
	const classes = useUtilityClasses$19(ownerState);
	const moreProps = component === ButtonBase ? {
		component: ComponentProp || "div",
		internalNativeButton: false,
		focusVisibleClassName: classes.focusVisible,
		...onDelete && { disableRipple: true },
		...nativeButton !== void 0 && { nativeButton }
	} : {};
	let deleteIcon = null;
	if (onDelete) deleteIcon = deleteIconProp && /*#__PURE__*/ import_react.isValidElement(deleteIconProp) ? /*#__PURE__*/ import_react.cloneElement(deleteIconProp, {
		className: clsx(deleteIconProp.props.className, classes.deleteIcon),
		onClick: handleDeleteIconClick
	}) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Cancel_default, {
		className: classes.deleteIcon,
		onClick: handleDeleteIconClick
	});
	let avatar = null;
	if (avatarProp && /*#__PURE__*/ import_react.isValidElement(avatarProp)) avatar = /*#__PURE__*/ import_react.cloneElement(avatarProp, { className: clsx(classes.avatar, avatarProp.props.className) });
	let icon = null;
	if (iconProp && /*#__PURE__*/ import_react.isValidElement(iconProp)) icon = /*#__PURE__*/ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) });
	if (avatar && icon) console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: ChipRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...buttonBaseProps
		},
		ownerState,
		shouldForwardComponentProp: true,
		ref: handleRef,
		className: clsx(classes.root, className),
		additionalProps: {
			disabled: clickable && disabled ? true : void 0,
			tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
			...moreProps
		},
		getSlotProps: (handlers) => ({
			...handlers,
			onClick: (event) => {
				handlers.onClick?.(event);
				onClick?.(event);
			},
			onKeyDown: (event) => {
				handlers.onKeyDown?.(event);
				handleKeyDown(event);
			},
			onKeyUp: (event) => {
				handlers.onKeyUp?.(event);
				handleKeyUp(event);
			}
		})
	});
	const [LabelSlot, labelProps] = useSlot("label", {
		elementType: ChipLabel,
		externalForwardedProps,
		ownerState,
		className: classes.label
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(RootSlot, {
		as: component,
		...rootProps,
		children: [
			avatar || icon,
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(LabelSlot, {
				...labelProps,
				children: label
			}),
			deleteIcon
		]
	});
});
Chip.propTypes = {
	/**
	* The Avatar element to display.
	*/
	avatar: import_prop_types.default.element,
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
	* If `true`, the chip will appear clickable, and will raise when pressed,
	* even if the onClick prop is not defined.
	* If `false`, the chip will not appear clickable, even if onClick prop is defined.
	* This can be used, for example,
	* along with the component prop to indicate an anchor Chip is clickable.
	* Note: this controls the UI and does not affect the onClick event.
	*/
	clickable: import_prop_types.default.bool,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'default'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"default",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* Override the default delete icon element. Shown only if `onDelete` is set.
	*/
	deleteIcon: import_prop_types.default.element,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* Icon element.
	*/
	icon: import_prop_types.default.element,
	/**
	* The content of the component.
	*/
	label: import_prop_types.default.node,
	/**
	* If `true`, the component is expected to resolve to a native `<button>` element.
	* When omitted, custom components inherit the default button semantics of the current wrapper.
	* Set to `true` when a custom component resolves to a native `<button>`, or `false`
	* when it resolves to a non-button host.
	*/
	nativeButton: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onClick: import_prop_types.default.func,
	/**
	* Callback fired when the delete icon is clicked.
	* If set, the delete icon will be shown.
	*/
	onDelete: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyDown: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyUp: import_prop_types.default.func,
	/**
	* The size of the component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	/**
	* If `true`, allows the disabled chip to escape focus.
	* If `false`, allows the disabled chip to receive focus.
	* @default false
	*/
	skipFocusWhenDisabled: import_prop_types.default.bool,
	/**
	* The props used for each slot inside.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		label: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		label: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
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
	* @ignore
	*/
	tabIndex: import_prop_types.default.number,
	/**
	* The variant to use.
	* @default 'filled'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined"]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersShortcuts/PickersShortcuts.mjs
var _excluded$13 = ["items", "changeImportance"], _excluded2$5 = ["getValue"];
var PickersShortcutsRoot = styled(List, {
	name: "MuiPickersLayout",
	slot: "Shortcuts"
})({});
/**
* Demos:
*
* - [Shortcuts](https://mui.com/x/react-date-pickers/shortcuts/)
*
* API:
*
* - [PickersShortcuts API](https://mui.com/x/api/date-pickers/pickers-shortcuts/)
*/
function PickersShortcuts(props) {
	const { items, changeImportance = "accept" } = props, other = _objectWithoutPropertiesLoose(props, _excluded$13);
	const { setValue } = usePickerActionsContext();
	const isValidValue = useIsValidValue();
	if (items == null || items.length === 0) return null;
	const resolvedItems = items.map((_ref) => {
		let { getValue } = _ref, item = _objectWithoutPropertiesLoose(_ref, _excluded2$5);
		const newValue = getValue({ isValid: isValidValue });
		return _extends({}, item, {
			label: item.label,
			onClick: () => {
				setValue(newValue, {
					changeImportance,
					shortcut: item,
					source: "view"
				});
			},
			disabled: !isValidValue(newValue)
		});
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersShortcutsRoot, _extends({
		dense: true,
		sx: [{
			maxHeight: 336,
			maxWidth: 200,
			overflow: "auto"
		}, ...Array.isArray(other.sx) ? other.sx : [other.sx]]
	}, other, { children: resolvedItems.map((item) => {
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListItem, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Chip, _extends({}, item)) }, item.id ?? item.label);
	}) }));
}
PickersShortcuts.propTypes = {
	/**
	* Importance of the change when picking a shortcut:
	* - "accept": fires `onChange`, fires `onAccept` and closes the Picker.
	* - "set": fires `onChange` but do not fire `onAccept` and does not close the Picker.
	* @default "accept"
	*/
	changeImportance: import_prop_types.default.oneOf(["accept", "set"]),
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	/**
	* If `true`, compact vertical padding designed for keyboard and mouse input is used for
	* the list and list items.
	* The prop is available to descendant components as the `dense` context.
	* @default false
	*/
	dense: import_prop_types.default.bool,
	/**
	* If `true`, vertical padding is removed from the list.
	* @default false
	*/
	disablePadding: import_prop_types.default.bool,
	/**
	* Ordered array of shortcuts to display.
	* If empty, does not display the shortcuts.
	* @default []
	*/
	items: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		getValue: import_prop_types.default.func.isRequired,
		id: import_prop_types.default.string,
		label: import_prop_types.default.string.isRequired
	})),
	style: import_prop_types.default.object,
	/**
	* The content of the subheader, normally `ListSubheader`.
	*/
	subheader: import_prop_types.default.node,
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
//#region node_modules/@mui/x-date-pickers/PickersLayout/usePickerLayout.mjs
var _excluded$12 = ["ownerState"];
function toolbarHasView(toolbarProps) {
	return toolbarProps.view !== null;
}
var useUtilityClasses$18 = (classes, ownerState) => {
	const { pickerOrientation } = ownerState;
	return composeClasses({
		root: ["root", pickerOrientation === "landscape" && "landscape"],
		contentWrapper: ["contentWrapper"],
		toolbar: ["toolbar"],
		actionBar: ["actionBar"],
		tabs: ["tabs"],
		landscape: ["landscape"],
		shortcuts: ["shortcuts"]
	}, getPickersLayoutUtilityClass, classes);
};
var usePickerLayout = (props) => {
	const { ownerState: pickerOwnerState, defaultActionBarActions } = usePickerPrivateContext();
	const { view } = usePickerContext();
	const isRtl = useRtl();
	const { children, slots, slotProps, classes: classesProp } = props;
	const ownerState = import_react.useMemo(() => _extends({}, pickerOwnerState, {
		layoutDirection: isRtl ? "rtl" : "ltr",
		hasShortcuts: false
	}), [pickerOwnerState, isRtl]);
	const classes = useUtilityClasses$18(classesProp, ownerState);
	const ActionBar = slots?.actionBar ?? PickersActionBar;
	const actionBar = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ActionBar, _extends({}, _objectWithoutPropertiesLoose(useSlotProps({
		elementType: ActionBar,
		externalSlotProps: slotProps?.actionBar,
		additionalProps: { actions: defaultActionBarActions },
		className: classes.actionBar,
		ownerState
	}), _excluded$12)));
	const Toolbar = slots?.toolbar;
	const toolbarProps = useSlotProps({
		elementType: Toolbar,
		externalSlotProps: slotProps?.toolbar,
		className: classes.toolbar,
		ownerState
	});
	const toolbar = toolbarHasView(toolbarProps) && !!Toolbar ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Toolbar, _extends({}, toolbarProps)) : null;
	const content = children;
	const Tabs = slots?.tabs;
	const tabs = view && Tabs ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tabs, _extends({ className: classes.tabs }, slotProps?.tabs)) : null;
	const Shortcuts = slots?.shortcuts ?? PickersShortcuts;
	const shortcutsProps = useSlotProps({
		elementType: Shortcuts,
		externalSlotProps: slotProps?.shortcuts,
		className: classes.shortcuts,
		ownerState
	});
	const hasShortcuts = Array.isArray(shortcutsProps?.items) && shortcutsProps.items.length > 0;
	return {
		toolbar,
		content,
		tabs,
		actionBar,
		shortcuts: view && !!Shortcuts ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Shortcuts, _extends({}, shortcutsProps)) : null,
		ownerState: _extends({}, ownerState, { hasShortcuts })
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersLayout/PickersLayout.mjs
var _excluded$11 = [
	"sx",
	"className",
	"classes",
	"children",
	"slots",
	"slotProps"
];
var useUtilityClasses$17 = (classes, ownerState) => {
	const { pickerOrientation } = ownerState;
	return composeClasses({
		root: ["root", pickerOrientation === "landscape" && "landscape"],
		contentWrapper: ["contentWrapper"]
	}, getPickersLayoutUtilityClass, classes);
};
var PickersLayoutRoot = styled("div", {
	name: "MuiPickersLayout",
	slot: "Root"
})({
	display: "grid",
	gridAutoColumns: "max-content auto max-content",
	gridAutoRows: "max-content auto max-content",
	[`& .${pickersLayoutClasses.actionBar}`]: {
		gridColumn: "1 / 4",
		gridRow: 3
	},
	variants: [
		{
			props: {
				pickerOrientation: "landscape",
				hasShortcuts: false
			},
			style: { [`& .${pickersLayoutClasses.toolbar}`]: {
				gridColumn: 1,
				gridRow: "1 / 3"
			} }
		},
		{
			props: {
				pickerOrientation: "landscape",
				hasShortcuts: true
			},
			style: {
				[`& .${pickersLayoutClasses.toolbar}`]: {
					gridColumn: "2 / 4",
					gridRow: 1,
					maxWidth: "max-content"
				},
				[`& .${pickersLayoutClasses.shortcuts}`]: {
					gridColumn: 1,
					gridRow: 2
				}
			}
		},
		{
			props: { pickerOrientation: "portrait" },
			style: {
				[`& .${pickersLayoutClasses.toolbar}`]: {
					gridColumn: "2 / 4",
					gridRow: 1
				},
				[`& .${pickersLayoutClasses.shortcuts}`]: {
					gridColumn: 1,
					gridRow: "2 / 3"
				}
			}
		},
		{
			props: {
				hasShortcuts: true,
				layoutDirection: "rtl"
			},
			style: { [`& .${pickersLayoutClasses.shortcuts}`]: { gridColumn: 4 } }
		}
	]
});
var PickersLayoutContentWrapper = styled("div", {
	name: "MuiPickersLayout",
	slot: "ContentWrapper"
})({
	gridColumn: "2 / 4",
	gridRow: 2,
	display: "flex",
	flexDirection: "column"
});
/**
* Demos:
*
* - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
*
* API:
*
* - [PickersLayout API](https://mui.com/x/api/date-pickers/pickers-layout/)
*/
var PickersLayout = /*#__PURE__*/ import_react.forwardRef(function PickersLayout(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersLayout"
	});
	const { toolbar, content, tabs, actionBar, shortcuts, ownerState } = usePickerLayout(props);
	const { orientation, variant } = usePickerContext();
	const { sx, className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$11);
	const classes = useUtilityClasses$17(classesProp, ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersLayoutRoot, _extends({
		ref,
		sx,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [
		orientation === "landscape" ? shortcuts : toolbar,
		orientation === "landscape" ? toolbar : shortcuts,
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersLayoutContentWrapper, {
			className: classes.contentWrapper,
			ownerState,
			children: variant === "desktop" ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [content, tabs] }) : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [tabs, content] })
		}),
		actionBar
	] }));
});
PickersLayout.displayName = "PickersLayout";
PickersLayout.propTypes = {
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
//#region node_modules/@mui/x-date-pickers/internals/utils/createNonRangePickerStepNavigation.mjs
function createNonRangePickerStepNavigation(parameters) {
	const { steps } = parameters;
	return createStepNavigation({
		steps,
		isViewMatchingStep: (view, step) => {
			return step.views == null || step.views.includes(view);
		},
		onStepChange: ({ step, defaultView, setView, view, views }) => {
			const targetView = step.views == null ? defaultView : step.views.find((viewBis) => views.includes(viewBis));
			if (targetView !== view) setView(targetView);
		}
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useDesktopPicker/useDesktopPicker.mjs
/**
* Hook managing all the single-date desktop pickers:
* - DesktopDatePicker
* - DesktopDateTimePicker
* - DesktopTimePicker
*/
var _excluded$10 = ["props", "steps"], _excluded2$4 = ["ownerState"];
var useDesktopPicker = (_ref) => {
	let { props, steps } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded$10);
	const { slots, slotProps: innerSlotProps, label, inputRef, localeText } = props;
	const { providerProps, renderCurrentView, ownerState } = usePicker(_extends({}, pickerParams, {
		props,
		localeText,
		autoFocusView: true,
		viewContainerRole: "dialog",
		variant: "desktop",
		getStepNavigation: createNonRangePickerStepNavigation({ steps })
	}));
	const labelId = providerProps.privateContextValue.labelId;
	const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
	const Field = slots.field;
	const fieldProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Field,
		externalSlotProps: innerSlotProps?.field,
		externalForwardedProps: extractRootForwardedProps(props),
		additionalProps: _extends({}, isToolbarHidden && { id: labelId }),
		ownerState
	}), _excluded2$4);
	const Layout = slots.layout ?? PickersLayout;
	let labelledById = labelId;
	if (isToolbarHidden) if (label) labelledById = `${labelId}-label`;
	else labelledById = void 0;
	const slotProps = _extends({}, innerSlotProps, {
		toolbar: _extends({}, innerSlotProps?.toolbar, { titleId: labelId }),
		popper: _extends({ "aria-labelledby": labelledById }, innerSlotProps?.popper)
	});
	const renderPicker = () => /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickerProvider, _extends({}, providerProps, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Field, _extends({}, fieldProps, {
		slots: _extends({}, slots, fieldProps.slots),
		slotProps: _extends({}, slotProps, fieldProps.slotProps),
		inputRef
	})), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerPopper, {
		slots,
		slotProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Layout, _extends({}, slotProps?.layout, {
			slots,
			slotProps,
			children: renderCurrentView()
		}))
	})] }));
	renderPicker.displayName = "renderPicker";
	return { renderPicker };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldCharacterEditing.mjs
var isQueryResponseWithoutValue = (response) => response.saveQuery != null;
/**
* Update the active section value when the user pressed a key that is not a navigation key (arrow key for example).
* This hook has two main editing behaviors
*
* 1. The numeric editing when the user presses a digit
* 2. The letter editing when the user presses another key
*/
var useFieldCharacterEditing = ({ stateResponse: { localizedDigits, sectionsValueBoundaries, state, timezone, setCharacterQuery, setTempAndroidValueStr, updateSectionValue } }) => {
	const adapter = usePickerAdapter();
	const applyQuery = ({ keyPressed, sectionIndex }, getFirstSectionValueMatchingWithQuery, isValidQueryValue) => {
		const cleanKeyPressed = keyPressed.toLowerCase();
		const activeSection = state.sections[sectionIndex];
		if (state.characterQuery != null && (!isValidQueryValue || isValidQueryValue(state.characterQuery.value)) && state.characterQuery.sectionIndex === sectionIndex) {
			const concatenatedQueryValue = `${state.characterQuery.value}${cleanKeyPressed}`;
			const queryResponse = getFirstSectionValueMatchingWithQuery(concatenatedQueryValue, activeSection);
			if (!isQueryResponseWithoutValue(queryResponse)) {
				setCharacterQuery({
					sectionIndex,
					value: concatenatedQueryValue,
					sectionType: activeSection.type
				});
				return queryResponse;
			}
		}
		const queryResponse = getFirstSectionValueMatchingWithQuery(cleanKeyPressed, activeSection);
		if (isQueryResponseWithoutValue(queryResponse) && !queryResponse.saveQuery) {
			setCharacterQuery(null);
			return null;
		}
		setCharacterQuery({
			sectionIndex,
			value: cleanKeyPressed,
			sectionType: activeSection.type
		});
		if (isQueryResponseWithoutValue(queryResponse)) return null;
		return queryResponse;
	};
	const applyLetterEditing = (params) => {
		const findMatchingOptions = (format, options, queryValue) => {
			const matchingValues = options.filter((option) => option.toLowerCase().startsWith(queryValue));
			if (matchingValues.length === 0) return { saveQuery: false };
			return {
				sectionValue: matchingValues[0],
				shouldGoToNextSection: matchingValues.length === 1
			};
		};
		const testQueryOnFormatAndFallbackFormat = (queryValue, activeSection, fallbackFormat, formatFallbackValue) => {
			const getOptions = (format) => getLetterEditingOptions(adapter, timezone, activeSection.type, format);
			if (activeSection.contentType === "letter") return findMatchingOptions(activeSection.format, getOptions(activeSection.format), queryValue);
			if (fallbackFormat && formatFallbackValue != null && getDateSectionConfigFromFormatToken(adapter, fallbackFormat).contentType === "letter") {
				const fallbackOptions = getOptions(fallbackFormat);
				const response = findMatchingOptions(fallbackFormat, fallbackOptions, queryValue);
				if (isQueryResponseWithoutValue(response)) return { saveQuery: false };
				return _extends({}, response, { sectionValue: formatFallbackValue(response.sectionValue, fallbackOptions) });
			}
			return { saveQuery: false };
		};
		const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
			switch (activeSection.type) {
				case "month": {
					const formatFallbackValue = (fallbackValue) => changeSectionValueFormat(adapter, fallbackValue, adapter.formats.month, activeSection.format);
					return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, adapter.formats.month, formatFallbackValue);
				}
				case "weekDay": {
					const formatFallbackValue = (fallbackValue, fallbackOptions) => fallbackOptions.indexOf(fallbackValue).toString();
					return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, adapter.formats.weekday, formatFallbackValue);
				}
				case "meridiem": return testQueryOnFormatAndFallbackFormat(queryValue, activeSection);
				default: return { saveQuery: false };
			}
		};
		return applyQuery(params, getFirstSectionValueMatchingWithQuery);
	};
	const applyNumericEditing = (params) => {
		const getNewSectionValue = ({ queryValue, skipIfBelowMinimum, section }) => {
			const cleanQueryValue = removeLocalizedDigits(queryValue, localizedDigits);
			const queryValueNumber = Number(cleanQueryValue);
			const sectionBoundaries = sectionsValueBoundaries[section.type]({
				currentDate: null,
				format: section.format,
				contentType: section.contentType
			});
			if (queryValueNumber > sectionBoundaries.maximum) return { saveQuery: false };
			if (skipIfBelowMinimum && queryValueNumber < sectionBoundaries.minimum) return { saveQuery: true };
			const shouldGoToNextSection = queryValueNumber * 10 > sectionBoundaries.maximum || cleanQueryValue.length === sectionBoundaries.maximum.toString().length;
			return {
				sectionValue: cleanDigitSectionValue(adapter, queryValueNumber, sectionBoundaries, localizedDigits, section),
				shouldGoToNextSection
			};
		};
		const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
			if (activeSection.contentType === "digit" || activeSection.contentType === "digit-with-letter") return getNewSectionValue({
				queryValue,
				skipIfBelowMinimum: false,
				section: activeSection
			});
			if (activeSection.type === "month") {
				const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(adapter, "digit", "month", "MM");
				const response = getNewSectionValue({
					queryValue,
					skipIfBelowMinimum: true,
					section: {
						type: activeSection.type,
						format: "MM",
						hasLeadingZerosInFormat,
						hasLeadingZerosInInput: true,
						contentType: "digit",
						maxLength: 2
					}
				});
				if (isQueryResponseWithoutValue(response)) return response;
				return _extends({}, response, { sectionValue: changeSectionValueFormat(adapter, response.sectionValue, "MM", activeSection.format) });
			}
			if (activeSection.type === "weekDay") {
				const response = getNewSectionValue({
					queryValue,
					skipIfBelowMinimum: true,
					section: activeSection
				});
				if (isQueryResponseWithoutValue(response)) return response;
				const formattedValue = getDaysInWeekStr(adapter, activeSection.format)[Number(response.sectionValue) - 1];
				return _extends({}, response, { sectionValue: formattedValue });
			}
			return { saveQuery: false };
		};
		return applyQuery(params, getFirstSectionValueMatchingWithQuery, (queryValue) => isStringNumber(queryValue, localizedDigits));
	};
	return useEventCallback((params) => {
		const section = state.sections[params.sectionIndex];
		const response = isStringNumber(params.keyPressed, localizedDigits) ? applyNumericEditing(_extends({}, params, { keyPressed: applyLocalizedDigits(params.keyPressed, localizedDigits) })) : applyLetterEditing(params);
		if (response == null) {
			setTempAndroidValueStr(null);
			return;
		}
		updateSectionValue({
			section,
			newSectionValue: response.sectionValue,
			shouldGoToNextSection: response.shouldGoToNextSection
		});
	});
};
/**
* The letter editing and the numeric editing each define a `CharacterEditingApplier`.
* This function decides what the new section value should be and if the focus should switch to the next section.
*
* If it returns `null`, then the section value is not updated and the focus does not move.
*/
/**
* Function called by `applyQuery` which decides:
* - what is the new section value ?
* - should the query used to get this value be stored for the next key press ?
*
* If it returns `{ sectionValue: string; shouldGoToNextSection: boolean }`,
* Then we store the query and update the section with the new value.
*
* If it returns `{ saveQuery: true` },
* Then we store the query and don't update the section.
*
* If it returns `{ saveQuery: false },
* Then we do nothing.
*/
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldState.mjs
var QUERY_LIFE_DURATION_MS = 5e3;
var useFieldState = (parameters) => {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const isRtl = useRtl();
	const { manager: { validator, valueType, internal_valueManager: valueManager, internal_fieldValueManager: fieldValueManager }, internalPropsWithDefaults, internalPropsWithDefaults: { value: valueProp, defaultValue, referenceDate: referenceDateProp, onChange, format, formatDensity = "dense", selectedSections: selectedSectionsProp, onSelectedSectionsChange, shouldRespectLeadingZeros = false, timezone: timezoneProp }, forwardedProps: { error: errorProp } } = parameters;
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "a field component",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager
	});
	const valueRef = import_react.useRef(value);
	import_react.useEffect(() => {
		valueRef.current = value;
	}, [value]);
	const { hasValidationError } = useValidation({
		props: internalPropsWithDefaults,
		validator,
		timezone,
		value,
		onError: internalPropsWithDefaults.onError
	});
	const localizedDigits = import_react.useMemo(() => getLocalizedDigits(adapter), [adapter]);
	const sectionsValueBoundaries = import_react.useMemo(() => getSectionsBoundaries(adapter, localizedDigits, timezone), [
		adapter,
		localizedDigits,
		timezone
	]);
	const getSectionsFromValue = import_react.useCallback((valueToAnalyze) => fieldValueManager.getSectionsFromValue(valueToAnalyze, (date) => buildSectionsFromFormat({
		adapter,
		localeText: translations,
		localizedDigits,
		format,
		date,
		formatDensity,
		shouldRespectLeadingZeros,
		isRtl
	})), [
		fieldValueManager,
		format,
		translations,
		localizedDigits,
		isRtl,
		shouldRespectLeadingZeros,
		adapter,
		formatDensity
	]);
	const [state, setState] = import_react.useState(() => {
		const sections = getSectionsFromValue(value);
		validateSections(sections, valueType);
		const stateWithoutReferenceDate = {
			sections,
			lastExternalValue: value,
			lastSectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			tempValueStrAndroid: null,
			characterQuery: null
		};
		const granularity = getSectionTypeGranularity(sections);
		return _extends({}, stateWithoutReferenceDate, { referenceValue: valueManager.getInitialReferenceValue({
			referenceDate: referenceDateProp,
			value,
			adapter,
			props: internalPropsWithDefaults,
			granularity,
			timezone
		}) });
	});
	const [selectedSections, innerSetSelectedSections] = useControlled({
		controlled: selectedSectionsProp,
		default: null,
		name: "useField",
		state: "selectedSections"
	});
	const setSelectedSections = (newSelectedSections) => {
		innerSetSelectedSections(newSelectedSections);
		onSelectedSectionsChange?.(newSelectedSections);
	};
	const parsedSelectedSections = import_react.useMemo(() => parseSelectedSections(selectedSections, state.sections), [selectedSections, state.sections]);
	const activeSectionIndex = parsedSelectedSections === "all" ? 0 : parsedSelectedSections;
	const sectionOrder = import_react.useMemo(() => getSectionOrder(state.sections), [state.sections]);
	const areAllSectionsEmpty = import_react.useMemo(() => state.sections.every((section) => section.value === ""), [state.sections]);
	const hasPartiallyFilledSectionsOnBlur = import_react.useMemo(() => {
		if (activeSectionIndex != null) return false;
		const filledSections = state.sections.filter((s) => s.value !== "");
		return filledSections.length > 0 && state.sections.length - filledSections.length > 0;
	}, [state.sections, activeSectionIndex]);
	const error = import_react.useMemo(() => {
		if (errorProp !== void 0) return errorProp;
		return hasValidationError || hasPartiallyFilledSectionsOnBlur;
	}, [
		hasValidationError,
		hasPartiallyFilledSectionsOnBlur,
		errorProp
	]);
	const publishValue = (newValue) => {
		handleValueChange(newValue, { validationError: validator({
			adapter,
			value: newValue,
			timezone,
			props: internalPropsWithDefaults
		}) });
	};
	const setSectionValue = (sectionIndex, newSectionValue) => {
		const newSections = [...state.sections];
		newSections[sectionIndex] = _extends({}, newSections[sectionIndex], {
			value: newSectionValue,
			modified: true
		});
		return newSections;
	};
	const sectionToUpdateOnNextInvalidDateRef = import_react.useRef(null);
	const updateSectionValueOnNextInvalidDateTimeout = useTimeout();
	const setSectionUpdateToApplyOnNextInvalidDate = (newSectionValue) => {
		if (activeSectionIndex == null) return;
		sectionToUpdateOnNextInvalidDateRef.current = {
			sectionIndex: activeSectionIndex,
			value: newSectionValue
		};
		updateSectionValueOnNextInvalidDateTimeout.start(0, () => {
			sectionToUpdateOnNextInvalidDateRef.current = null;
		});
	};
	const clearValue = () => {
		if (valueManager.areValuesEqual(adapter, value, valueManager.emptyValue)) setState((prevState) => _extends({}, prevState, {
			sections: prevState.sections.map((section) => _extends({}, section, { value: "" })),
			tempValueStrAndroid: null,
			characterQuery: null
		}));
		else {
			setState((prevState) => _extends({}, prevState, { characterQuery: null }));
			publishValue(valueManager.emptyValue);
		}
	};
	const clearActiveSection = () => {
		if (activeSectionIndex == null) return;
		const activeSection = state.sections[activeSectionIndex];
		if (activeSection.value === "") return;
		setSectionUpdateToApplyOnNextInvalidDate("");
		if (fieldValueManager.getDateFromSection(value, activeSection) === null) setState((prevState) => _extends({}, prevState, {
			sections: setSectionValue(activeSectionIndex, ""),
			tempValueStrAndroid: null,
			characterQuery: null
		}));
		else {
			setState((prevState) => _extends({}, prevState, { characterQuery: null }));
			publishValue(fieldValueManager.updateDateInValue(value, activeSection, null));
		}
	};
	const updateValueFromValueStr = (valueStr) => {
		const parseDateStr = (dateStr, referenceDate) => {
			const date = adapter.parse(dateStr, format);
			if (!adapter.isValid(date)) return null;
			return mergeDateIntoReferenceDate(adapter, date, buildSectionsFromFormat({
				adapter,
				localeText: translations,
				localizedDigits,
				format,
				date,
				formatDensity,
				shouldRespectLeadingZeros,
				isRtl
			}), referenceDate, false);
		};
		publishValue(fieldValueManager.parseValueStr(valueStr, state.referenceValue, parseDateStr));
	};
	const cleanActiveDateSectionsIfValueNullTimeout = useTimeout();
	const updateSectionValue = ({ section, newSectionValue, shouldGoToNextSection }) => {
		updateSectionValueOnNextInvalidDateTimeout.clear();
		cleanActiveDateSectionsIfValueNullTimeout.clear();
		const activeDate = fieldValueManager.getDateFromSection(value, section);
		/**
		* Decide which section should be focused
		*/
		if (shouldGoToNextSection && activeSectionIndex < state.sections.length - 1) setSelectedSections(activeSectionIndex + 1);
		/**
		* Try to build a valid date from the new section value
		*/
		const newSections = setSectionValue(activeSectionIndex, newSectionValue);
		const newActiveDateSections = fieldValueManager.getDateSectionsFromValue(newSections, section);
		const newActiveDate = getDateFromDateSections(adapter, newActiveDateSections, localizedDigits);
		/**
		* If the new date is valid,
		* Then we merge the value of the modified sections into the reference date.
		* This makes sure that we don't lose some information of the initial date (like the time on a date field).
		*/
		if (adapter.isValid(newActiveDate)) {
			const mergedDate = mergeDateIntoReferenceDate(adapter, newActiveDate, newActiveDateSections, fieldValueManager.getDateFromSection(state.referenceValue, section), true);
			if (activeDate == null) cleanActiveDateSectionsIfValueNullTimeout.start(0, () => {
				if (valueRef.current === value) setState((prevState) => _extends({}, prevState, {
					sections: fieldValueManager.clearDateSections(state.sections, section),
					tempValueStrAndroid: null
				}));
			});
			return publishValue(fieldValueManager.updateDateInValue(value, section, mergedDate));
		}
		/**
		* If all the sections are filled but the date is invalid and the previous date is valid or null,
		* Then we publish an invalid date.
		*/
		if (newActiveDateSections.every((sectionBis) => sectionBis.value !== "") && (activeDate == null || adapter.isValid(activeDate))) {
			setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
			return publishValue(fieldValueManager.updateDateInValue(value, section, newActiveDate));
		}
		/**
		* If the previous date is not null,
		* Then we publish the date as `newActiveDate to prevent error state oscillation`.
		* @link: https://github.com/mui/mui-x/issues/17967
		*/
		if (activeDate != null) {
			setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
			publishValue(fieldValueManager.updateDateInValue(value, section, newActiveDate));
		}
		/**
		* If the previous date is already null,
		* Then we don't publish the date and we update the sections.
		*/
		return setState((prevState) => _extends({}, prevState, {
			sections: newSections,
			tempValueStrAndroid: null
		}));
	};
	const setTempAndroidValueStr = (tempValueStrAndroid) => setState((prevState) => _extends({}, prevState, { tempValueStrAndroid }));
	const setCharacterQuery = useEventCallback((newCharacterQuery) => {
		setState((prevState) => _extends({}, prevState, { characterQuery: newCharacterQuery }));
	});
	if (value !== state.lastExternalValue) {
		const isActiveDateInvalid = sectionToUpdateOnNextInvalidDateRef.current != null && !adapter.isValid(fieldValueManager.getDateFromSection(value, state.sections[sectionToUpdateOnNextInvalidDateRef.current.sectionIndex]));
		let sections;
		if (isActiveDateInvalid) sections = setSectionValue(sectionToUpdateOnNextInvalidDateRef.current.sectionIndex, sectionToUpdateOnNextInvalidDateRef.current.value);
		else sections = getSectionsFromValue(value);
		setState((prevState) => _extends({}, prevState, {
			lastExternalValue: value,
			sections,
			sectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			referenceValue: isActiveDateInvalid ? prevState.referenceValue : fieldValueManager.updateReferenceValue(adapter, value, prevState.referenceValue),
			tempValueStrAndroid: null
		}));
	}
	if (isRtl !== state.lastSectionsDependencies.isRtl || format !== state.lastSectionsDependencies.format || adapter.locale !== state.lastSectionsDependencies.locale) {
		const sections = getSectionsFromValue(value);
		validateSections(sections, valueType);
		setState((prevState) => _extends({}, prevState, {
			lastSectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			sections,
			tempValueStrAndroid: null,
			characterQuery: null
		}));
	}
	if (state.characterQuery != null && !error && activeSectionIndex == null) setCharacterQuery(null);
	if (state.characterQuery != null && state.sections[state.characterQuery.sectionIndex]?.type !== state.characterQuery.sectionType) setCharacterQuery(null);
	import_react.useEffect(() => {
		if (sectionToUpdateOnNextInvalidDateRef.current != null) sectionToUpdateOnNextInvalidDateRef.current = null;
	});
	const cleanCharacterQueryTimeout = useTimeout();
	import_react.useEffect(() => {
		if (state.characterQuery != null) cleanCharacterQueryTimeout.start(QUERY_LIFE_DURATION_MS, () => setCharacterQuery(null));
		return () => {};
	}, [
		state.characterQuery,
		setCharacterQuery,
		cleanCharacterQueryTimeout
	]);
	import_react.useEffect(() => {
		if (state.tempValueStrAndroid != null && activeSectionIndex != null) clearActiveSection();
	}, [state.sections]);
	return {
		activeSectionIndex,
		areAllSectionsEmpty,
		error,
		localizedDigits,
		parsedSelectedSections,
		sectionOrder,
		sectionsValueBoundaries,
		state,
		timezone,
		value,
		clearValue,
		clearActiveSection,
		setCharacterQuery,
		setSelectedSections,
		setTempAndroidValueStr,
		updateSectionValue,
		updateValueFromValueStr,
		getSectionsFromValue
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldInternalPropsWithDefaults.mjs
/**
* Applies the default values to the field internal props.
* This is a temporary hook that will be removed during a follow up when `useField` will receive the internal props without the defaults.
* It is only here to allow the migration to be done in smaller steps.
*/
function useFieldInternalPropsWithDefaults(parameters) {
	const { manager: { internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToFieldInternalProps }, internalProps, skipContextFieldRefAssignment } = parameters;
	const pickerContext = useNullablePickerContext();
	const fieldPrivateContext = useNullableFieldPrivateContext();
	const handleFieldRef = useForkRef(internalProps.fieldRef, skipContextFieldRefAssignment ? null : fieldPrivateContext?.internalFieldRef, skipContextFieldRefAssignment ? null : fieldPrivateContext?.fieldRef);
	const setValue = pickerContext?.setValue;
	const handleChangeFromPicker = import_react.useCallback((newValue, ctx) => {
		return setValue?.(newValue, {
			validationError: ctx.validationError,
			shouldClose: false
		});
	}, [setValue]);
	return useApplyDefaultValuesToFieldInternalProps(import_react.useMemo(() => {
		if (fieldPrivateContext != null && pickerContext != null) return _extends({
			value: pickerContext.value,
			onChange: handleChangeFromPicker,
			timezone: pickerContext.timezone,
			disabled: pickerContext.disabled,
			readOnly: pickerContext.readOnly,
			autoFocus: pickerContext.autoFocus && !pickerContext.open,
			focused: pickerContext.open ? true : void 0,
			format: pickerContext.fieldFormat,
			formatDensity: fieldPrivateContext.formatDensity,
			selectedSections: fieldPrivateContext.selectedSections,
			onSelectedSectionsChange: fieldPrivateContext.onSelectedSectionsChange,
			fieldRef: handleFieldRef
		}, internalProps);
		return internalProps;
	}, [
		pickerContext,
		fieldPrivateContext,
		internalProps,
		handleChangeFromPicker,
		handleFieldRef
	]));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/syncSelectionToDOM.mjs
function syncSelectionToDOM(parameters) {
	const { focused, domGetters, stateResponse: { parsedSelectedSections, state } } = parameters;
	if (!domGetters.isReady()) return;
	const selection = ownerDocument(domGetters.getRoot()).getSelection();
	if (!selection) return;
	if (parsedSelectedSections == null) {
		if (selection.rangeCount > 0 && selection.getRangeAt(0).startContainer instanceof Node && domGetters.getRoot().contains(selection.getRangeAt(0).startContainer)) selection.removeAllRanges();
		if (focused) domGetters.getRoot().blur();
		return;
	}
	if (!domGetters.getRoot().contains(getActiveElement(domGetters.getRoot()))) return;
	const range = new window.Range();
	let target;
	if (parsedSelectedSections === "all") target = domGetters.getRoot();
	else if (state.sections[parsedSelectedSections].type === "empty") target = domGetters.getSectionContainer(parsedSelectedSections);
	else target = domGetters.getSectionContent(parsedSelectedSections);
	range.selectNodeContents(target);
	target.focus();
	selection.removeAllRanges();
	selection.addRange(range);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldRootProps.mjs
/**
* Generate the props to pass to the root element of the field.
* @param {UseFieldRootPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldRootPropsReturnValue} The props to forward to the root element of the field.
*/
function useFieldRootProps(parameters) {
	const { manager: { internal_fieldValueManager: fieldValueManager }, focused, setFocused, domGetters, stateResponse, applyCharacterEditing, internalPropsWithDefaults, stateResponse: { parsedSelectedSections, sectionsValueBoundaries, sectionOrder, state, value, activeSectionIndex, localizedDigits, timezone, clearValue, clearActiveSection, setCharacterQuery, setSelectedSections, updateValueFromValueStr, updateSectionValue }, internalPropsWithDefaults: { disabled = false, readOnly = false, minutesStep } } = parameters;
	const adapter = usePickerAdapter();
	const handleKeyDown = useEventCallback((event) => {
		if (disabled) return;
		switch (true) {
			case (event.ctrlKey || event.metaKey) && (event.key?.toUpperCase() === "A" || String.fromCharCode(event.keyCode) === "A") && !event.shiftKey && !event.altKey:
				event.preventDefault();
				setSelectedSections("all");
				break;
			case event.key === "ArrowRight":
				event.preventDefault();
				if (parsedSelectedSections == null) setSelectedSections(sectionOrder.startIndex);
				else if (parsedSelectedSections === "all") setSelectedSections(sectionOrder.endIndex);
				else {
					const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].rightIndex;
					if (nextSectionIndex !== null) setSelectedSections(nextSectionIndex);
				}
				break;
			case event.key === "ArrowLeft":
				event.preventDefault();
				if (parsedSelectedSections == null) setSelectedSections(sectionOrder.endIndex);
				else if (parsedSelectedSections === "all") setSelectedSections(sectionOrder.startIndex);
				else {
					const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].leftIndex;
					if (nextSectionIndex !== null) setSelectedSections(nextSectionIndex);
				}
				break;
			case event.key === "Delete":
				event.preventDefault();
				if (readOnly) break;
				if (parsedSelectedSections == null || parsedSelectedSections === "all") clearValue();
				else clearActiveSection();
				break;
			case [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End",
				"PageUp",
				"PageDown"
			].includes(event.key): {
				event.preventDefault();
				if (readOnly || activeSectionIndex == null) break;
				if (parsedSelectedSections === "all") setSelectedSections(activeSectionIndex);
				const activeSection = state.sections[activeSectionIndex];
				updateSectionValue({
					section: activeSection,
					newSectionValue: adjustSectionValue(adapter, timezone, activeSection, event.key, sectionsValueBoundaries, localizedDigits, fieldValueManager.getDateFromSection(value, activeSection), { minutesStep }),
					shouldGoToNextSection: false
				});
				break;
			}
		}
	});
	const containerClickTimeout = useTimeout();
	const handleClick = useEventCallback(() => {
		if (disabled || !domGetters.isReady()) return;
		if (parsedSelectedSections === "all") {
			setFocused(true);
			containerClickTimeout.start(0, () => {
				const selection = document.getSelection();
				if (!selection || selection.rangeCount === 0) {
					setSelectedSections(sectionOrder.startIndex);
					return;
				}
				const cursorPosition = selection.getRangeAt(0).startOffset;
				if (cursorPosition === 0) {
					setSelectedSections(sectionOrder.startIndex);
					return;
				}
				let sectionIndex = 0;
				let cursorOnStartOfSection = 0;
				while (cursorOnStartOfSection < cursorPosition && sectionIndex < state.sections.length) {
					const section = state.sections[sectionIndex];
					sectionIndex += 1;
					cursorOnStartOfSection += `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`.length;
				}
				setSelectedSections(sectionIndex - 1);
			});
			return;
		}
		if (!focused) {
			setFocused(true);
			if (parsedSelectedSections == null) setSelectedSections(sectionOrder.startIndex);
		}
	});
	const handleMouseDown = useEventCallback((event) => {
		if (disabled || !domGetters.isReady() || parsedSelectedSections === "all") return;
		if (event.button !== 0) return;
		const target = event.target;
		const sectionListRoot = domGetters.getRoot();
		if (!sectionListRoot.contains(target)) return;
		const sectionElement = target.closest("[data-sectionindex]");
		const parsedIndex = sectionElement ? Number(sectionElement.dataset.sectionindex) : findClosestSectionIndexToPoint(sectionListRoot, event.clientX);
		if (parsedIndex == null || !Number.isInteger(parsedIndex)) return;
		event.preventDefault();
		setFocused(true);
		setSelectedSections(parsedIndex);
	});
	const handleInput = useEventCallback((event) => {
		if (!domGetters.isReady() || parsedSelectedSections !== "all") return;
		const keyPressed = event.target.textContent ?? "";
		domGetters.getRoot().innerHTML = state.sections.map((section) => `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`).join("");
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
		if (keyPressed.length === 0 || keyPressed.charCodeAt(0) === 10) {
			clearValue();
			setSelectedSections("all");
		} else if (keyPressed.length > 1) updateValueFromValueStr(keyPressed);
		else {
			if (parsedSelectedSections === "all") setSelectedSections(0);
			applyCharacterEditing({
				keyPressed,
				sectionIndex: 0
			});
		}
	});
	const handlePaste = useEventCallback((event) => {
		if (readOnly || parsedSelectedSections !== "all") {
			event.preventDefault();
			return;
		}
		const pastedValue = event.clipboardData.getData("text");
		event.preventDefault();
		setCharacterQuery(null);
		updateValueFromValueStr(pastedValue);
	});
	const handleFocus = useEventCallback(() => {
		if (focused || disabled || !domGetters.isReady()) return;
		const activeElement = getActiveElement(domGetters.getRoot());
		setFocused(true);
		if (!(domGetters.getSectionIndexFromDOMElement(activeElement) != null)) setSelectedSections(sectionOrder.startIndex);
	});
	return {
		onKeyDown: handleKeyDown,
		onBlur: useEventCallback(() => {
			setTimeout(() => {
				if (!domGetters.isReady()) return;
				const activeElement = getActiveElement(domGetters.getRoot());
				if (!domGetters.getRoot().contains(activeElement)) {
					setFocused(false);
					setSelectedSections(null);
				}
			});
		}),
		onFocus: handleFocus,
		onClick: handleClick,
		onMouseDown: handleMouseDown,
		onPaste: handlePaste,
		onInput: handleInput,
		contentEditable: parsedSelectedSections === "all",
		tabIndex: internalPropsWithDefaults.disabled || parsedSelectedSections === 0 ? -1 : 0
	};
}
/**
* Returns the index of the section whose horizontal center is closest to `clientX`.
* Returns `null` if the field renders no `[role="spinbutton"]` descendants
* (defensive — every section content span sets `role="spinbutton"` in practice).
*/
function findClosestSectionIndexToPoint(root, clientX) {
	const sections = root.querySelectorAll("[role=\"spinbutton\"]");
	if (sections.length === 0) return null;
	let closestIndex = 0;
	let closestDistance = Infinity;
	for (let i = 0; i < sections.length; i += 1) {
		const rect = sections[i].getBoundingClientRect();
		const center = (rect.left + rect.right) / 2;
		const distance = Math.abs(clientX - center);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = i;
		}
	}
	return closestIndex;
}
function getDeltaFromKeyCode(keyCode) {
	switch (keyCode) {
		case "ArrowUp": return 1;
		case "ArrowDown": return -1;
		case "PageUp": return 5;
		case "PageDown": return -5;
		default: return 0;
	}
}
function adjustSectionValue(adapter, timezone, section, keyCode, sectionsValueBoundaries, localizedDigits, activeDate, stepsAttributes) {
	const delta = getDeltaFromKeyCode(keyCode);
	const isStart = keyCode === "Home";
	const isEnd = keyCode === "End";
	const shouldSetAbsolute = section.value === "" || isStart || isEnd;
	const adjustDigitSection = () => {
		const sectionBoundaries = sectionsValueBoundaries[section.type]({
			currentDate: activeDate,
			format: section.format,
			contentType: section.contentType
		});
		const getCleanValue = (value) => cleanDigitSectionValue(adapter, value, sectionBoundaries, localizedDigits, section);
		const step = section.type === "minutes" && stepsAttributes?.minutesStep ? stepsAttributes.minutesStep : 1;
		let newSectionValueNumber;
		if (shouldSetAbsolute) {
			if (section.type === "year" && !isEnd && !isStart) return adapter.formatByString(adapter.date(void 0, timezone), section.format);
			if (delta > 0 || isStart) newSectionValueNumber = sectionBoundaries.minimum;
			else newSectionValueNumber = sectionBoundaries.maximum;
		} else newSectionValueNumber = parseInt(removeLocalizedDigits(section.value, localizedDigits), 10) + delta * step;
		if (newSectionValueNumber % step !== 0) {
			if (delta < 0 || isStart) newSectionValueNumber += step - (step + newSectionValueNumber) % step;
			if (delta > 0 || isEnd) newSectionValueNumber -= newSectionValueNumber % step;
		}
		if (newSectionValueNumber > sectionBoundaries.maximum) return getCleanValue(sectionBoundaries.minimum + (newSectionValueNumber - sectionBoundaries.maximum - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
		if (newSectionValueNumber < sectionBoundaries.minimum) return getCleanValue(sectionBoundaries.maximum - (sectionBoundaries.minimum - newSectionValueNumber - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
		return getCleanValue(newSectionValueNumber);
	};
	const adjustLetterSection = () => {
		const options = getLetterEditingOptions(adapter, timezone, section.type, section.format);
		if (options.length === 0) return section.value;
		if (shouldSetAbsolute) {
			if (delta > 0 || isStart) return options[0];
			return options[options.length - 1];
		}
		return options[((options.indexOf(section.value) + delta) % options.length + options.length) % options.length];
	};
	if (section.contentType === "digit" || section.contentType === "digit-with-letter") return adjustDigitSection();
	return adjustLetterSection();
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldHiddenInputProps.mjs
/**
* Generate the props to pass to the hidden input element of the field.
* @param {UseFieldHiddenInputPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldHiddenInputPropsReturnValue} The props to forward to the hidden input element of the field.
*/
function useFieldHiddenInputProps(parameters) {
	const { manager: { internal_fieldValueManager: fieldValueManager }, stateResponse: { areAllSectionsEmpty, state, updateValueFromValueStr } } = parameters;
	const handleChange = useEventCallback((event) => {
		updateValueFromValueStr(event.target.value);
	});
	return {
		value: import_react.useMemo(() => areAllSectionsEmpty ? "" : fieldValueManager.getHiddenInputValueFromSections(state.sections), [
			areAllSectionsEmpty,
			state.sections,
			fieldValueManager
		]),
		onChange: handleChange
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldSectionContainerProps.mjs
/**
* Generate the props to pass to the container element of each section of the field.
* @param {UseFieldSectionContainerPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldSectionContainerPropsReturnValue} The props to forward to the container element of each section of the field.
*/
function useFieldSectionContainerProps(parameters) {
	const { stateResponse: { parsedSelectedSections, setSelectedSections }, internalPropsWithDefaults: { disabled = false } } = parameters;
	const handleClick = useEventCallback((event) => {
		if (disabled || event.isDefaultPrevented()) return;
		const sectionIndex = Number(event.currentTarget.dataset.sectionindex);
		if (!Number.isInteger(sectionIndex)) return;
		if (parsedSelectedSections === sectionIndex) return;
		setSelectedSections(sectionIndex);
	});
	return import_react.useCallback((sectionIndex) => ({
		"data-sectionindex": sectionIndex,
		onClick: handleClick
	}), [handleClick]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useFieldSectionContentProps.mjs
/**
* Generate the props to pass to the content element of each section of the field.
* @param {UseFieldSectionContentPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldSectionContentPropsReturnValue} The props to forward to the content element of each section of the field.
*/
function useFieldSectionContentProps(parameters) {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const { focused, domGetters, stateResponse, applyCharacterEditing, manager: { internal_fieldValueManager: fieldValueManager }, stateResponse: { parsedSelectedSections, sectionsValueBoundaries, state, value, localizedDigits, clearActiveSection, setCharacterQuery, setSelectedSections, updateSectionValue, updateValueFromValueStr }, internalPropsWithDefaults: { disabled = false, readOnly = false } } = parameters;
	const isContainerEditable = parsedSelectedSections === "all";
	const isEditable = !isContainerEditable && !disabled && !readOnly;
	/**
	* If a section content has been updated with a value we don't want to keep,
	* Then we need to imperatively revert it (we can't let React do it because the value did not change in his internal representation).
	*/
	const revertDOMSectionChange = useEventCallback((sectionIndex) => {
		if (!domGetters.isReady()) return;
		const section = state.sections[sectionIndex];
		domGetters.getSectionContent(sectionIndex).innerHTML = section.value || section.placeholder;
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
	});
	const handleInput = useEventCallback((event) => {
		if (!domGetters.isReady()) return;
		const target = event.target;
		const keyPressed = target.textContent ?? "";
		const sectionIndex = domGetters.getSectionIndexFromDOMElement(target);
		const section = state.sections[sectionIndex];
		if (readOnly) {
			revertDOMSectionChange(sectionIndex);
			return;
		}
		if (keyPressed.length === 0) {
			if (section.value === "") {
				revertDOMSectionChange(sectionIndex);
				return;
			}
			const inputType = event.nativeEvent.inputType;
			if (inputType === "insertParagraph" || inputType === "insertLineBreak") {
				revertDOMSectionChange(sectionIndex);
				return;
			}
			revertDOMSectionChange(sectionIndex);
			clearActiveSection();
			return;
		}
		applyCharacterEditing({
			keyPressed,
			sectionIndex
		});
		revertDOMSectionChange(sectionIndex);
	});
	const handleMouseUp = useEventCallback((event) => {
		event.preventDefault();
	});
	const handlePaste = useEventCallback((event) => {
		event.preventDefault();
		if (readOnly || disabled || typeof parsedSelectedSections !== "number") return;
		const activeSection = state.sections[parsedSelectedSections];
		const pastedValue = event.clipboardData.getData("text");
		const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
		const digitsOnly = /^[0-9]+$/.test(pastedValue);
		const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
		if (activeSection.contentType === "letter" && lettersOnly || activeSection.contentType === "digit" && digitsOnly || activeSection.contentType === "digit-with-letter" && digitsAndLetterOnly) {
			setCharacterQuery(null);
			updateSectionValue({
				section: activeSection,
				newSectionValue: pastedValue,
				shouldGoToNextSection: true
			});
		} else if (!lettersOnly && !digitsOnly) {
			setCharacterQuery(null);
			updateValueFromValueStr(pastedValue);
		}
	});
	const handleDragOver = useEventCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "none";
	});
	const createFocusHandler = import_react.useCallback((sectionIndex) => () => {
		if (disabled) return;
		setSelectedSections(sectionIndex);
	}, [disabled, setSelectedSections]);
	return import_react.useCallback((section, sectionIndex) => {
		const sectionBoundaries = sectionsValueBoundaries[section.type]({
			currentDate: fieldValueManager.getDateFromSection(value, section),
			contentType: section.contentType,
			format: section.format
		});
		return {
			onInput: handleInput,
			onPaste: handlePaste,
			onMouseUp: handleMouseUp,
			onDragOver: handleDragOver,
			onFocus: createFocusHandler(sectionIndex),
			"aria-readonly": readOnly,
			"aria-valuenow": getSectionValueNow(section, adapter, localizedDigits),
			"aria-valuemin": sectionBoundaries.minimum,
			"aria-valuemax": sectionBoundaries.maximum,
			"aria-valuetext": section.value ? getSectionValueText(section, adapter, localizedDigits) : translations.empty,
			"aria-label": translations[section.type],
			"aria-disabled": disabled,
			tabIndex: !isEditable || isContainerEditable || sectionIndex > 0 ? -1 : 0,
			contentEditable: !isContainerEditable && !disabled && !readOnly,
			role: "spinbutton",
			"data-range-position": section.dateName || void 0,
			spellCheck: isEditable ? false : void 0,
			autoCapitalize: isEditable ? "none" : void 0,
			autoCorrect: isEditable ? "off" : void 0,
			children: section.value || section.placeholder,
			inputMode: section.contentType === "letter" ? "text" : "numeric"
		};
	}, [
		sectionsValueBoundaries,
		isContainerEditable,
		disabled,
		readOnly,
		isEditable,
		translations,
		adapter,
		localizedDigits,
		handleInput,
		handlePaste,
		handleMouseUp,
		handleDragOver,
		createFocusHandler,
		fieldValueManager,
		value
	]);
}
function getSectionValueText(section, adapter, localizedDigits) {
	if (!section.value) return;
	switch (section.type) {
		case "month": {
			if (section.contentType === "digit") {
				const dateWithMonth = adapter.setMonth(adapter.date(), Number(removeLocalizedDigits(section.value, localizedDigits)) - 1);
				return adapter.isValid(dateWithMonth) ? adapter.format(dateWithMonth, "month") : "";
			}
			const parsedDate = adapter.parse(section.value, section.format);
			return parsedDate && adapter.isValid(parsedDate) ? adapter.format(parsedDate, "month") : void 0;
		}
		case "day":
			if (section.contentType === "digit") {
				const dateWithDay = adapter.setDate(adapter.startOfYear(adapter.date()), Number(removeLocalizedDigits(section.value, localizedDigits)));
				return adapter.isValid(dateWithDay) ? adapter.format(dateWithDay, "dayOfMonth") : "";
			}
			return section.value;
		case "weekDay": return;
		default: return;
	}
}
function getSectionValueNow(section, adapter, localizedDigits) {
	if (!section.value) return;
	const nonLocalizedValue = removeLocalizedDigits(section.value, localizedDigits);
	switch (section.type) {
		case "weekDay":
			if (section.contentType === "letter") return;
			return Number(nonLocalizedValue);
		case "meridiem": {
			const parsedDate = adapter.parse(`01:00 ${section.value}`, `${adapter.formats.hours12h}:${adapter.formats.minutes} ${section.format}`);
			if (parsedDate) return adapter.getHours(parsedDate) >= 12 ? 1 : 0;
			return;
		}
		case "day": return section.contentType === "digit-with-letter" ? parseInt(nonLocalizedValue, 10) : Number(nonLocalizedValue);
		case "month": {
			if (section.contentType === "digit") return Number(nonLocalizedValue);
			const parsedDate = adapter.parse(section.value, section.format);
			return parsedDate ? adapter.getMonth(parsedDate) + 1 : void 0;
		}
		default: return section.contentType !== "letter" ? Number(nonLocalizedValue) : void 0;
	}
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useField/useField.mjs
var useField = (parameters) => {
	const { props, manager, skipContextFieldRefAssignment, manager: { valueType, internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel } } = parameters;
	const { internalProps, forwardedProps } = useSplitFieldProps(props, valueType);
	if (forwardedProps.enableAccessibleFieldDOMStructure != null) warnOnce([
		"MUI X: The `enableAccessibleFieldDOMStructure` prop has been removed.",
		"The accessible DOM structure is now the default and only option.",
		"You can safely remove the prop from your code.",
		"For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v8/)."
	]);
	const internalPropsWithDefaults = useFieldInternalPropsWithDefaults({
		manager,
		internalProps,
		skipContextFieldRefAssignment
	});
	const { sectionListRef: sectionListRefProp, onBlur, onClick, onMouseDown, onFocus, onInput, onPaste, onKeyDown, onClear, clearable } = forwardedProps;
	const { disabled = false, readOnly = false, autoFocus = false, focused: focusedProp, fieldRef } = internalPropsWithDefaults;
	const sectionListRef = import_react.useRef(null);
	const handleSectionListRef = useForkRef(sectionListRefProp, sectionListRef);
	const domGetters = import_react.useMemo(() => ({
		isReady: () => sectionListRef.current != null,
		getRoot: () => sectionListRef.current.getRoot(),
		getSectionContainer: (sectionIndex) => sectionListRef.current.getSectionContainer(sectionIndex),
		getSectionContent: (sectionIndex) => sectionListRef.current.getSectionContent(sectionIndex),
		getSectionIndexFromDOMElement: (element) => sectionListRef.current.getSectionIndexFromDOMElement(element)
	}), [sectionListRef]);
	const stateResponse = useFieldState({
		manager,
		internalPropsWithDefaults,
		forwardedProps
	});
	const { areAllSectionsEmpty, error, parsedSelectedSections, sectionOrder, state, value, clearValue, setSelectedSections } = stateResponse;
	const applyCharacterEditing = useFieldCharacterEditing({ stateResponse });
	const openPickerAriaLabel = useOpenPickerButtonAriaLabel(value);
	const [focused, setFocused] = import_react.useState(false);
	function focusField(newSelectedSections = 0) {
		if (disabled || !sectionListRef.current || getActiveSectionIndex(sectionListRef) != null) return;
		const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
		setFocused(true);
		sectionListRef.current.getSectionContent(newParsedSelectedSections).focus();
	}
	const rootProps = useFieldRootProps({
		manager,
		internalPropsWithDefaults,
		stateResponse,
		applyCharacterEditing,
		focused,
		setFocused,
		domGetters
	});
	const hiddenInputProps = useFieldHiddenInputProps({
		manager,
		stateResponse
	});
	const createSectionContainerProps = useFieldSectionContainerProps({
		stateResponse,
		internalPropsWithDefaults
	});
	const createSectionContentProps = useFieldSectionContentProps({
		manager,
		stateResponse,
		applyCharacterEditing,
		internalPropsWithDefaults,
		domGetters,
		focused
	});
	const handleRootKeyDown = useEventCallback((event) => {
		onKeyDown?.(event);
		rootProps.onKeyDown(event);
	});
	const handleRootBlur = useEventCallback((event) => {
		rootProps.onBlur(event);
		const next = event.relatedTarget;
		if (domGetters.isReady() && next instanceof Node && domGetters.getRoot().contains(next)) return;
		onBlur?.(event);
	});
	const handleRootFocus = useEventCallback((event) => {
		rootProps.onFocus(event);
		const previous = event.relatedTarget;
		if (domGetters.isReady() && previous instanceof Node && domGetters.getRoot().contains(previous)) return;
		onFocus?.(event);
	});
	const handleRootClick = useEventCallback((event) => {
		if (event.isDefaultPrevented()) return;
		onClick?.(event);
		rootProps.onClick(event);
	});
	const handleRootMouseDown = useEventCallback((event) => {
		if (event.isDefaultPrevented()) return;
		onMouseDown?.(event);
		rootProps.onMouseDown(event);
	});
	const handleRootPaste = useEventCallback((event) => {
		onPaste?.(event);
		rootProps.onPaste(event);
	});
	const handleRootInput = useEventCallback((event) => {
		onInput?.(event);
		rootProps.onInput(event);
	});
	const handleClear = useEventCallback((event, ...args) => {
		event.preventDefault();
		onClear?.(event, ...args);
		clearValue();
		if (!isFieldFocused(sectionListRef)) focusField(0);
		else setSelectedSections(sectionOrder.startIndex);
	});
	const elements = import_react.useMemo(() => {
		return state.sections.map((section, sectionIndex) => {
			const content = createSectionContentProps(section, sectionIndex);
			return {
				container: createSectionContainerProps(sectionIndex),
				content,
				before: { children: section.startSeparator },
				after: {
					children: section.endSeparator,
					"data-range-position": section.isEndFormatSeparator ? content["data-range-position"] : void 0
				}
			};
		});
	}, [
		state.sections,
		createSectionContainerProps,
		createSectionContentProps
	]);
	import_react.useEffect(() => {
		if (sectionListRef.current == null) throw new Error(`MUI X: The \`sectionListRef\` prop has not been initialized by \`PickersSectionList\`
You probably tried to pass a component to the \`textField\` slot that contains an \`<input />\` element instead of a \`PickersSectionList\`.

Learn more about the field accessible DOM structure on the MUI documentation: https://mui.com/x/react-date-pickers/fields/#fields-to-edit-a-single-element`);
		if (autoFocus && !disabled) sectionListRef.current.getSectionContent(sectionOrder.startIndex).focus();
	}, []);
	useEnhancedEffect(() => {
		if (!focused || !sectionListRef.current) return;
		if (parsedSelectedSections === "all") sectionListRef.current.getRoot().focus();
		else if (typeof parsedSelectedSections === "number") {
			const domElement = sectionListRef.current.getSectionContent(parsedSelectedSections);
			if (domElement) domElement.focus();
		}
	}, [parsedSelectedSections, focused]);
	useEnhancedEffect(() => {
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
	});
	import_react.useImperativeHandle(fieldRef, () => ({
		getSections: () => state.sections,
		getActiveSectionIndex: () => getActiveSectionIndex(sectionListRef),
		setSelectedSections: (newSelectedSections) => {
			if (disabled || !sectionListRef.current) return;
			const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
			setFocused((newParsedSelectedSections === "all" ? 0 : newParsedSelectedSections) !== null);
			setSelectedSections(newSelectedSections);
		},
		focusField,
		isFieldFocused: () => isFieldFocused(sectionListRef),
		clearValue
	}));
	return _extends({}, forwardedProps, rootProps, {
		onBlur: handleRootBlur,
		onClick: handleRootClick,
		onMouseDown: handleRootMouseDown,
		onFocus: handleRootFocus,
		onInput: handleRootInput,
		onPaste: handleRootPaste,
		onKeyDown: handleRootKeyDown,
		onClear: handleClear
	}, hiddenInputProps, {
		error,
		clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled),
		focused: focusedProp ?? focused,
		sectionListRef: handleSectionListRef,
		elements,
		areAllSectionsEmpty,
		disabled,
		readOnly,
		autoFocus,
		openPickerAriaLabel
	});
};
function getActiveSectionIndex(sectionListRef) {
	const activeElement = getActiveElement(sectionListRef.current?.getRoot());
	if (!activeElement || !sectionListRef.current || !sectionListRef.current.getRoot().contains(activeElement)) return null;
	return sectionListRef.current.getSectionIndexFromDOMElement(activeElement);
}
function isFieldFocused(sectionListRef) {
	const activeElement = getActiveElement(sectionListRef.current?.getRoot());
	return !!sectionListRef.current && sectionListRef.current.getRoot().contains(activeElement);
}
//#endregion
//#region node_modules/@mui/material/IconButton/iconButtonClasses.mjs
function getIconButtonUtilityClass(slot) {
	return generateUtilityClass("MuiIconButton", slot);
}
var iconButtonClasses = generateUtilityClasses("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]);
//#endregion
//#region node_modules/@mui/material/IconButton/IconButton.mjs
var useUtilityClasses$16 = (ownerState) => {
	const { classes, disabled, color, edge, size, loading } = ownerState;
	return composeClasses({
		root: [
			"root",
			loading && "loading",
			disabled && "disabled",
			color !== "default" && `color${capitalize_default(color)}`,
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getIconButtonUtilityClass, classes);
};
var IconButtonRoot = styled(ButtonBase, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.loading && styles.loading,
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`],
			ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`],
			styles[`size${capitalize_default(ownerState.size)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: theme.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (theme.vars || theme).palette.action.active,
	...getTransitionStyles(theme, "background-color", { duration: theme.transitions.duration.shortest }),
	variants: [
		{
			props: (props) => !props.disableRipple,
			style: {
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), memoTheme(({ theme }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: {
				color: (theme.vars || theme).palette[color].main,
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
			}
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: theme.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: theme.typography.pxToRem(28)
			}
		}
	],
	[`&.${iconButtonClasses.disabled}`]: {
		backgroundColor: "transparent",
		color: (theme.vars || theme).palette.action.disabled
	},
	[`&.${iconButtonClasses.loading}`]: { color: "transparent" }
})));
var IconButtonLoadingIndicator = styled("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (theme.vars || theme).palette.action.disabled,
	variants: [{
		props: { loading: true },
		style: { display: "flex" }
	}]
}));
/**
* Refer to the [Icons](/material-ui/icons/) section of the documentation
* regarding the available icon options.
*/
var IconButton = /*#__PURE__*/ import_react.forwardRef(function IconButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiIconButton"
	});
	const { edge = false, children, className, color = "default", disabled = false, disableFocusRipple = false, size = "medium", id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		edge,
		color,
		disabled,
		disableFocusRipple,
		loading,
		loadingIndicator,
		size
	};
	const classes = useUtilityClasses$16(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(IconButtonRoot, {
		id: loading ? loadingId : idProp,
		className: clsx(classes.root, className),
		centerRipple: true,
		internalNativeButton: true,
		focusRipple: !disableFocusRipple,
		disabled: disabled || loading,
		ref,
		...other,
		ownerState,
		children: [typeof loading === "boolean" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className: classes.loadingWrapper,
			style: { display: "contents" },
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IconButtonLoadingIndicator, {
				className: classes.loadingIndicator,
				ownerState,
				children: loading && loadingIndicator
			})
		}), children]
	});
});
IconButton.propTypes = {
	/**
	* The icon to display.
	*/
	children: chainPropTypes(import_prop_types.default.node, (props) => {
		if (import_react.Children.toArray(props.children).some((child) => /*#__PURE__*/ import_react.isValidElement(child) && child.props.onClick)) return new Error([
			"MUI: You are providing an onClick event listener to a child of a button element.",
			"Prefer applying it to the IconButton directly.",
			"This guarantees that the whole <button> will be responsive to click events."
		].join("\n"));
		return null;
	}),
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'default'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"default",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
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
	* If given, uses a negative margin to counteract the padding on one
	* side (this is often helpful for aligning the left or right
	* side of the icon with content above or below, without ruining the border
	* size and shape).
	* @default false
	*/
	edge: import_prop_types.default.oneOf([
		"end",
		"start",
		false
	]),
	/**
	* @ignore
	*/
	id: import_prop_types.default.string,
	/**
	* If `true`, the loading indicator is visible and the button is disabled.
	* If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
	* @default null
	*/
	loading: import_prop_types.default.bool,
	/**
	* Element placed before the children if the button is in loading state.
	* The node should contain an element with `role="progressbar"` with an accessible name.
	* By default, it renders a `CircularProgress` that is labeled by the button itself.
	* @default <CircularProgress color="inherit" size={16} />
	*/
	loadingIndicator: import_prop_types.default.node,
	/**
	* The size of the component.
	* `small` is equivalent to the dense button styling.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
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
//#region node_modules/@mui/material/InputAdornment/inputAdornmentClasses.mjs
function getInputAdornmentUtilityClass(slot) {
	return generateUtilityClass("MuiInputAdornment", slot);
}
var inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", [
	"root",
	"filled",
	"standard",
	"outlined",
	"positionStart",
	"positionEnd",
	"disablePointerEvents",
	"hiddenLabel",
	"sizeSmall"
]);
//#endregion
//#region node_modules/@mui/material/InputAdornment/InputAdornment.mjs
var _span$1;
var overridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		styles[`position${capitalize_default(ownerState.position)}`],
		ownerState.disablePointerEvents === true && styles.disablePointerEvents,
		styles[ownerState.variant]
	];
};
var useUtilityClasses$15 = (ownerState) => {
	const { classes, disablePointerEvents, hiddenLabel, position, size, variant } = ownerState;
	return composeClasses({ root: [
		"root",
		disablePointerEvents && "disablePointerEvents",
		position && `position${capitalize_default(position)}`,
		variant,
		hiddenLabel && "hiddenLabel",
		size && `size${capitalize_default(size)}`
	] }, getInputAdornmentUtilityClass, classes);
};
var InputAdornmentRoot = styled("div", {
	name: "MuiInputAdornment",
	slot: "Root",
	overridesResolver
})(memoTheme(({ theme }) => ({
	display: "flex",
	maxHeight: "2em",
	alignItems: "center",
	whiteSpace: "nowrap",
	color: (theme.vars || theme).palette.action.active,
	variants: [
		{
			props: { variant: "filled" },
			style: { [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: { marginTop: 16 } }
		},
		{
			props: { position: "start" },
			style: { marginRight: 8 }
		},
		{
			props: { position: "end" },
			style: { marginLeft: 8 }
		},
		{
			props: { disablePointerEvents: true },
			style: { pointerEvents: "none" }
		}
	]
})));
var InputAdornment = /*#__PURE__*/ import_react.forwardRef(function InputAdornment(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputAdornment"
	});
	const { children, className, component = "div", disablePointerEvents = false, disableTypography = false, position, variant: variantProp, ...other } = props;
	const muiFormControl = useFormControl() || {};
	let variant = variantProp;
	if (variantProp && muiFormControl.variant) {
		if (variantProp === muiFormControl.variant) console.error("MUI: The `InputAdornment` variant infers the variant prop you do not have to provide one.");
	}
	if (muiFormControl && !variant) variant = muiFormControl.variant;
	const ownerState = {
		...props,
		hiddenLabel: muiFormControl.hiddenLabel,
		size: muiFormControl.size,
		disablePointerEvents,
		position,
		variant
	};
	const classes = useUtilityClasses$15(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: null,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputAdornmentRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children: typeof children === "string" && !disableTypography ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Typography, {
				color: "textSecondary",
				children
			}) : /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [position === "start" ? _span$1 || (_span$1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : null, children] })
		})
	});
});
InputAdornment.propTypes = {
	/**
	* The content of the component, normally an `IconButton` or string.
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
	* Disable pointer events on the root.
	* This allows for the content of the adornment to focus the `input` on click.
	* @default false
	*/
	disablePointerEvents: import_prop_types.default.bool,
	/**
	* If children is a string then disable wrapping in a Typography component.
	* @default false
	*/
	disableTypography: import_prop_types.default.bool,
	/**
	* The position this adornment should appear relative to the `Input`.
	*/
	position: import_prop_types.default.oneOf(["end", "start"]).isRequired,
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
	* The variant to use.
	* Note: If you are using the `TextField` component or the `FormControl` component
	* you do not have to set this manually.
	*/
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useFieldOwnerState.mjs
function useFieldOwnerState(parameters) {
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const isRtl = useRtl();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, {
		isFieldDisabled: parameters.disabled ?? false,
		isFieldReadOnly: parameters.readOnly ?? false,
		isFieldRequired: parameters.required ?? false,
		fieldDirection: isRtl ? "rtl" : "ltr"
	}), [
		pickerOwnerState,
		parameters.disabled,
		parameters.readOnly,
		parameters.required,
		isRtl
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/icons/index.mjs
/**
* @ignore - internal component.
*/
var ArrowDropDownIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
/**
* @ignore - internal component.
*/
var ArrowLeftIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }), "ArrowLeft");
/**
* @ignore - internal component.
*/
var ArrowRightIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }), "ArrowRight");
/**
* @ignore - internal component.
*/
var CalendarIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" }), "Calendar");
/**
* @ignore - internal component.
*/
var ClockIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Clock");
/**
* @ignore - internal component.
*/
var DateRangeIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" }), "DateRange");
/**
* @ignore - internal component.
*/
var TimeIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Time");
/**
* @ignore - internal component.
*/
var ClearIcon = createSvgIcon(/*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Clear");
//#endregion
//#region node_modules/@mui/material/FormLabel/FormLabel.mjs
var useUtilityClasses$14 = (ownerState) => {
	const { classes, color, focused, disabled, error, filled, required } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color)}`,
			disabled && "disabled",
			error && "error",
			filled && "filled",
			focused && "focused",
			required && "required"
		],
		asterisk: ["asterisk", error && "error"]
	}, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled("label", {
	name: "MuiFormLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.color === "secondary" && styles.colorSecondary,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.body1,
	lineHeight: "1.4375em",
	padding: 0,
	position: "relative",
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
		props: { color },
		style: { [`&.${formLabelClasses.focused}`]: { color: (theme.vars || theme).palette[color].main } }
	})), {
		props: {},
		style: {
			[`&.${formLabelClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
			[`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main }
		}
	}]
})));
var AsteriskComponent = styled("span", {
	name: "MuiFormLabel",
	slot: "Asterisk"
})(memoTheme(({ theme }) => ({ [`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main } })));
var FormLabel = /*#__PURE__*/ import_react.forwardRef(function FormLabel(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormLabel"
	});
	const { children, className, color, component = "label", disabled, error, filled, focused, required, ...other } = props;
	const [fcs] = useFormControlState({
		props,
		states: [
			"color",
			"required",
			"focused",
			"disabled",
			"error",
			"filled"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		component,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	const classes = useUtilityClasses$14(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(FormLabelRoot, {
		as: component,
		ownerState,
		className: clsx(classes.root, className),
		ref,
		...other,
		children: [children, fcs.required && /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})]
	});
});
FormLabel.propTypes = {
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the label should be displayed in a disabled state.
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the label is displayed in an error state.
	*/
	error: import_prop_types.default.bool,
	/**
	* If `true`, the label should use filled classes key.
	*/
	filled: import_prop_types.default.bool,
	/**
	* If `true`, the input of this label is focused (used by `FormGroup` components).
	*/
	focused: import_prop_types.default.bool,
	/**
	* If `true`, the label will indicate that the `input` is required.
	*/
	required: import_prop_types.default.bool,
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
//#region node_modules/@mui/material/InputLabel/inputLabelClasses.mjs
function getInputLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", [
	"root",
	"focused",
	"disabled",
	"error",
	"required",
	"asterisk",
	"formControl",
	"sizeSmall",
	"shrink",
	"animated",
	"standard",
	"filled",
	"outlined"
]);
//#endregion
//#region node_modules/@mui/material/InputLabel/InputLabel.mjs
var useUtilityClasses$13 = (ownerState) => {
	const { classes, formControl, size, shrink, disableAnimation, variant, required } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			formControl && "formControl",
			!disableAnimation && "animated",
			shrink && "shrink",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			variant
		],
		asterisk: [required && "asterisk"]
	}, getInputLabelUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputLabelRoot = styled(FormLabel, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiInputLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${formLabelClasses.asterisk}`]: styles.asterisk },
			styles.root,
			ownerState.formControl && styles.formControl,
			ownerState.size === "small" && styles.sizeSmall,
			ownerState.shrink && styles.shrink,
			!ownerState.disableAnimation && styles.animated,
			ownerState.focused && styles.focused,
			styles[ownerState.variant]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "block",
	transformOrigin: "top left",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%",
	variants: [
		{
			props: ({ ownerState }) => ownerState.formControl,
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				transform: "translate(0, 20px) scale(1)"
			}
		},
		{
			props: { size: "small" },
			style: { transform: "translate(0, 17px) scale(1)" }
		},
		{
			props: ({ ownerState }) => ownerState.shrink,
			style: {
				transform: "translate(0, -1.5px) scale(0.75)",
				transformOrigin: "top left",
				maxWidth: "133%"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disableAnimation,
			style: { ...getTransitionStyles(theme, [
				"color",
				"transform",
				"max-width"
			], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeOut
			}) }
		},
		{
			props: { variant: "filled" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(12px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "filled",
				size: "small"
			},
			style: { transform: "translate(12px, 13px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "filled" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				transform: "translate(12px, 7px) scale(0.75)",
				maxWidth: "calc(133% - 24px)"
			}
		},
		{
			props: ({ variant, ownerState, size }) => variant === "filled" && ownerState.shrink && size === "small",
			style: { transform: "translate(12px, 4px) scale(0.75)" }
		},
		{
			props: { variant: "outlined" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(14px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "outlined",
				size: "small"
			},
			style: { transform: "translate(14px, 9px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "outlined" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				maxWidth: "calc(133% - 32px)",
				transform: "translate(14px, -9px) scale(0.75)"
			}
		}
	]
})));
var InputLabel = /*#__PURE__*/ import_react.forwardRef(function InputLabel(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiInputLabel",
		props: inProps
	});
	const { disableAnimation = false, margin, shrink: shrinkProp, variant, className, ...other } = props;
	const [fcs, muiFormControl] = useFormControlState({
		props,
		states: [
			"size",
			"variant",
			"required",
			"focused"
		]
	});
	let shrink = shrinkProp;
	if (typeof shrink === "undefined" && muiFormControl) shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
	const ownerState = {
		...props,
		disableAnimation,
		formControl: muiFormControl,
		shrink,
		size: fcs.size,
		variant: fcs.variant,
		required: fcs.required,
		focused: fcs.focused
	};
	const classes = useUtilityClasses$13(ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputLabelRoot, {
		"data-shrink": shrink,
		ref,
		className: clsx(classes.root, className),
		...other,
		ownerState,
		classes
	});
});
InputLabel.propTypes = {
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the transition animation is disabled.
	* @default false
	*/
	disableAnimation: import_prop_types.default.bool,
	/**
	* If `true`, the component is disabled.
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the label is displayed in an error state.
	*/
	error: import_prop_types.default.bool,
	/**
	* If `true`, the `input` of this label is focused.
	*/
	focused: import_prop_types.default.bool,
	/**
	* If `dense`, will adjust vertical spacing. This is normally obtained via context from
	* FormControl.
	*/
	margin: import_prop_types.default.oneOf(["dense"]),
	/**
	* if `true`, the label will indicate that the `input` is required.
	*/
	required: import_prop_types.default.bool,
	/**
	* If `true`, the label is shrunk.
	*/
	shrink: import_prop_types.default.bool,
	/**
	* The size of the component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
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
	* The variant to use.
	*/
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/material/FormHelperText/FormHelperText.mjs
var _span;
var useUtilityClasses$12 = (ownerState) => {
	const { classes, contained, size, disabled, error, filled, focused, required } = ownerState;
	return composeClasses({ root: [
		"root",
		disabled && "disabled",
		error && "error",
		size && `size${capitalize_default(size)}`,
		contained && "contained",
		focused && "focused",
		filled && "filled",
		required && "required"
	] }, getFormHelperTextUtilityClasses, classes);
};
var FormHelperTextRoot = styled("p", {
	name: "MuiFormHelperText",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.size && styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.contained && styles.contained,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.caption,
	textAlign: "left",
	marginTop: 3,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0,
	[`&.${formHelperTextClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
	[`&.${formHelperTextClasses.error}`]: { color: (theme.vars || theme).palette.error.main },
	variants: [{
		props: { size: "small" },
		style: { marginTop: 4 }
	}, {
		props: ({ ownerState }) => ownerState.contained,
		style: {
			marginLeft: 14,
			marginRight: 14
		}
	}]
})));
var FormHelperText = /*#__PURE__*/ import_react.forwardRef(function FormHelperText(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormHelperText"
	});
	const { children, className, component = "p", disabled, error, filled, focused, margin, required, variant, ...other } = props;
	const [fcs] = useFormControlState({
		props,
		states: [
			"variant",
			"size",
			"disabled",
			"error",
			"filled",
			"focused",
			"required"
		]
	});
	const ownerState = {
		...props,
		component,
		contained: fcs.variant === "filled" || fcs.variant === "outlined",
		variant: fcs.variant,
		size: fcs.size,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	delete ownerState.ownerState;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FormHelperTextRoot, {
		as: component,
		className: clsx(useUtilityClasses$12(ownerState).root, className),
		ref,
		...other,
		ownerState,
		children: children === " " ? _span || (_span = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className: "notranslate",
			"aria-hidden": true,
			children: "​"
		})) : children
	});
});
FormHelperText.propTypes = {
	/**
	* The content of the component.
	*
	* If `' '` is provided, the component reserves one line height for displaying a future message.
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
	* If `true`, the helper text should be displayed in a disabled state.
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, helper text should be displayed in an error state.
	*/
	error: import_prop_types.default.bool,
	/**
	* If `true`, the helper text should use filled classes key.
	*/
	filled: import_prop_types.default.bool,
	/**
	* If `true`, the helper text should use focused classes key.
	*/
	focused: import_prop_types.default.bool,
	/**
	* If `dense`, will adjust vertical spacing. This is normally obtained via context from
	* FormControl.
	*/
	margin: import_prop_types.default.oneOf(["dense"]),
	/**
	* If `true`, the helper text should use required classes key.
	*/
	required: import_prop_types.default.bool,
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
	* The variant to use.
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/FormControl/formControlClasses.mjs
function getFormControlUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", [
	"root",
	"marginNone",
	"marginNormal",
	"marginDense",
	"fullWidth",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/material/FormControl/FormControl.mjs
var useUtilityClasses$11 = (ownerState) => {
	const { classes, margin, fullWidth } = ownerState;
	return composeClasses({ root: [
		"root",
		margin !== "none" && `margin${capitalize_default(margin)}`,
		fullWidth && "fullWidth"
	] }, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled("div", {
	name: "MuiFormControl",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`margin${capitalize_default(ownerState.margin)}`],
			ownerState.fullWidth && styles.fullWidth
		];
	}
})({
	display: "inline-flex",
	flexDirection: "column",
	position: "relative",
	minWidth: 0,
	padding: 0,
	margin: 0,
	border: 0,
	verticalAlign: "top",
	variants: [
		{
			props: { margin: "normal" },
			style: {
				marginTop: 16,
				marginBottom: 8
			}
		},
		{
			props: { margin: "dense" },
			style: {
				marginTop: 8,
				marginBottom: 4
			}
		},
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		}
	]
});
/**
* Provides context such as filled/focused/error/required for form inputs.
* Relying on the context provides high flexibility and ensures that the state always stays
* consistent across the children of the `FormControl`.
* This context is used by the following components:
*
*  - FormLabel
*  - FormHelperText
*  - Input
*  - InputLabel
*
* You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
*
* ```jsx
* <FormControl>
*   <InputLabel htmlFor="my-input">Email address</InputLabel>
*   <Input id="my-input" aria-describedby="my-helper-text" />
*   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
* </FormControl>
* ```
*
* ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
* For instance, only one input can be focused at the same time, the state shouldn't be shared.
*/
var FormControl = /*#__PURE__*/ import_react.forwardRef(function FormControl(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControl"
	});
	const { children, className, color = "primary", component = "div", disabled = false, error = false, focused: visuallyFocused, fullWidth = false, hiddenLabel = false, margin = "none", required = false, size = "medium", variant = "outlined", ...other } = props;
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		error,
		fullWidth,
		hiddenLabel,
		margin,
		required,
		size,
		variant
	};
	const classes = useUtilityClasses$11(ownerState);
	const [adornedStart, setAdornedStart] = import_react.useState(() => {
		let initialAdornedStart = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			const input = isMuiElement_default(child, ["Select"]) ? child.props.input : child;
			if (input && isAdornedStart(input.props)) initialAdornedStart = true;
		});
		return initialAdornedStart;
	});
	const [filled, setFilled] = import_react.useState(() => {
		let initialFilled = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) initialFilled = true;
		});
		return initialFilled;
	});
	const [focusedState, setFocused] = import_react.useState(false);
	if (disabled && focusedState) setFocused(false);
	const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
	let registerEffect;
	const registeredInput = import_react.useRef(false);
	registerEffect = () => {
		if (registeredInput.current) console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join("\n"));
		registeredInput.current = true;
		return () => {
			registeredInput.current = false;
		};
	};
	const onFilled = import_react.useCallback(() => {
		setFilled(true);
	}, []);
	const onEmpty = import_react.useCallback(() => {
		setFilled(false);
	}, []);
	const childContext = import_react.useMemo(() => {
		return {
			adornedStart,
			setAdornedStart,
			color,
			disabled,
			error,
			filled,
			focused,
			fullWidth,
			hiddenLabel,
			size,
			onBlur: () => {
				setFocused(false);
			},
			onFocus: () => {
				setFocused(true);
			},
			onEmpty,
			onFilled,
			registerEffect,
			required,
			variant
		};
	}, [
		adornedStart,
		color,
		disabled,
		error,
		filled,
		focused,
		fullWidth,
		hiddenLabel,
		registerEffect,
		onEmpty,
		onFilled,
		required,
		size,
		variant
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: childContext,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FormControlRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children
		})
	});
});
FormControl.propTypes = {
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
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the label, input and helper text should be displayed in a disabled state.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the label is displayed in an error state.
	* @default false
	*/
	error: import_prop_types.default.bool,
	/**
	* If `true`, the component is displayed in focused state.
	*/
	focused: import_prop_types.default.bool,
	/**
	* If `true`, the component will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* If `true`, the label is hidden.
	* This is used to increase density for a `FilledInput`.
	* Be sure to add `aria-label` to the `input` element.
	* @default false
	*/
	hiddenLabel: import_prop_types.default.bool,
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
	* If `true`, the label will indicate that the `input` is required.
	* @default false
	*/
	required: import_prop_types.default.bool,
	/**
	* The size of the component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
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
//#region node_modules/@mui/x-date-pickers/PickersTextField/pickersTextFieldClasses.mjs
function getPickersTextFieldUtilityClass(slot) {
	return generateUtilityClass("MuiPickersTextField", slot);
}
generateUtilityClasses("MuiPickersTextField", [
	"root",
	"focused",
	"disabled",
	"error",
	"required"
]);
//#endregion
//#region node_modules/@mui/utils/visuallyHidden/visuallyHidden.mjs
var visuallyHidden = {
	border: 0,
	clip: "rect(0 0 0 0)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	whiteSpace: "nowrap",
	width: "1px"
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersInputBase/pickersInputBaseClasses.mjs
function getPickersInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiPickersInputBase", slot);
}
var pickersInputBaseClasses = generateUtilityClasses("MuiPickersInputBase", [
	"root",
	"focused",
	"disabled",
	"error",
	"notchedOutline",
	"sectionContent",
	"sectionBefore",
	"sectionAfter",
	"adornedStart",
	"adornedEnd",
	"input",
	"inputSizeSmall",
	"activeBar"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersSectionList/pickersSectionListClasses.mjs
function getPickersSectionListUtilityClass(slot) {
	return generateUtilityClass("MuiPickersSectionList", slot);
}
var pickersSectionListClasses = generateUtilityClasses("MuiPickersSectionList", [
	"root",
	"section",
	"sectionContent"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersSectionList/PickersSectionList.mjs
var _excluded$9 = [
	"slots",
	"slotProps",
	"elements",
	"sectionListRef",
	"classes"
];
var PickersSectionListRoot = styled("div", {
	name: "MuiPickersSectionList",
	slot: "Root"
})({
	direction: "ltr /*! @noflip */",
	outline: "none"
});
var PickersSectionListSection = styled("span", {
	name: "MuiPickersSectionList",
	slot: "Section"
})({});
var PickersSectionListSectionSeparator = styled("span", {
	name: "MuiPickersSectionList",
	slot: "SectionSeparator"
})({ whiteSpace: "pre" });
var PickersSectionListSectionContent = styled("span", {
	name: "MuiPickersSectionList",
	slot: "SectionContent"
})({ outline: "none" });
var useUtilityClasses$10 = (classes) => {
	return composeClasses({
		root: ["root"],
		section: ["section"],
		sectionContent: ["sectionContent"]
	}, getPickersSectionListUtilityClass, classes);
};
function PickersSection(props) {
	const { slots, slotProps, element, classes } = props;
	const { ownerState } = usePickerPrivateContext();
	const Section = slots?.section ?? PickersSectionListSection;
	const sectionProps = useSlotProps({
		elementType: Section,
		externalSlotProps: slotProps?.section,
		externalForwardedProps: element.container,
		className: classes.section,
		ownerState
	});
	const SectionContent = slots?.sectionContent ?? PickersSectionListSectionContent;
	const sectionContentProps = useSlotProps({
		elementType: SectionContent,
		externalSlotProps: slotProps?.sectionContent,
		externalForwardedProps: element.content,
		additionalProps: { suppressContentEditableWarning: true },
		className: classes.sectionContent,
		ownerState
	});
	const SectionSeparator = slots?.sectionSeparator ?? PickersSectionListSectionSeparator;
	const sectionSeparatorBeforeProps = useSlotProps({
		elementType: SectionSeparator,
		externalSlotProps: slotProps?.sectionSeparator,
		externalForwardedProps: element.before,
		ownerState: _extends({}, ownerState, { separatorPosition: "before" })
	});
	const sectionSeparatorAfterProps = useSlotProps({
		elementType: SectionSeparator,
		externalSlotProps: slotProps?.sectionSeparator,
		externalForwardedProps: element.after,
		ownerState: _extends({}, ownerState, { separatorPosition: "after" })
	});
	const sectionContentRef = import_react.useRef(null);
	const handleSectionContentRef = useForkRef(sectionContentProps.ref, sectionContentRef);
	const handleContentBlur = (event) => {
		const next = event.relatedTarget;
		const root = event.currentTarget.closest(`.${pickersSectionListClasses.root}`);
		if (root && next instanceof Node && root.contains(next)) {
			event.stopPropagation();
			return;
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Section, _extends({}, sectionProps, { children: [
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(SectionSeparator, _extends({}, sectionSeparatorBeforeProps)),
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(SectionContent, _extends({}, sectionContentProps, {
			ref: handleSectionContentRef,
			onBlur: handleContentBlur
		})),
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(SectionSeparator, _extends({}, sectionSeparatorAfterProps))
	] }));
}
PickersSection.propTypes = {
	classes: import_prop_types.default.object.isRequired,
	element: import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	}).isRequired,
	/**
	* The props used for each component slot.
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	*/
	slots: import_prop_types.default.object
};
/**
* Demos:
*
* - [Custom field](https://mui.com/x/react-date-pickers/custom-field/)
*
* API:
*
* - [PickersSectionList API](https://mui.com/x/api/date-pickers/pickers-section-list/)
*/
var PickersSectionList = /*#__PURE__*/ import_react.forwardRef(function PickersSectionList(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersSectionList"
	});
	const { slots, slotProps, elements, sectionListRef, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
	const classes = useUtilityClasses$10(classesProp);
	const { ownerState } = usePickerPrivateContext();
	const rootRef = import_react.useRef(null);
	const handleRootRef = useForkRef(ref, rootRef);
	const getRoot = (methodName) => {
		if (!rootRef.current) throw new Error(`MUI X: Cannot call sectionListRef.${methodName} before the mount of the component.`);
		return rootRef.current;
	};
	import_react.useImperativeHandle(sectionListRef, () => ({
		getRoot() {
			return getRoot("getRoot");
		},
		getSectionContainer(index) {
			return getRoot("getSectionContainer").querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"]`);
		},
		getSectionContent(index) {
			return getRoot("getSectionContent").querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"] .${pickersSectionListClasses.sectionContent}`);
		},
		getSectionIndexFromDOMElement(element) {
			const root = getRoot("getSectionIndexFromDOMElement");
			if (element == null || !root.contains(element)) return null;
			let sectionContainer = null;
			if (element.classList.contains(pickersSectionListClasses.section)) sectionContainer = element;
			else if (element.classList.contains(pickersSectionListClasses.sectionContent)) sectionContainer = element.parentElement;
			if (sectionContainer == null) return null;
			return Number(sectionContainer.dataset.sectionindex);
		}
	}));
	const Root = slots?.root ?? PickersSectionListRoot;
	const rootProps = useSlotProps({
		elementType: Root,
		externalSlotProps: slotProps?.root,
		externalForwardedProps: other,
		additionalProps: {
			ref: handleRootRef,
			suppressContentEditableWarning: true
		},
		className: classes.root,
		ownerState
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Root, _extends({}, rootProps, { children: rootProps.contentEditable ? elements.map(({ content, before, after }) => `${before.children}${content.children}${after.children}`).join("") : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: elements.map((element, elementIndex) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersSection, {
		slots,
		slotProps,
		element,
		classes
	}, elementIndex)) }) }));
});
PickersSectionList.displayName = "PickersSectionList";
PickersSectionList.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The props used for each component slot.
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	*/
	slots: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/usePickerTextFieldOwnerState.mjs
var PickerTextFieldOwnerStateContext = /*#__PURE__*/ import_react.createContext(null);
PickerTextFieldOwnerStateContext.displayName = "PickerTextFieldOwnerStateContext";
var usePickerTextFieldOwnerState = () => {
	const value = import_react.useContext(PickerTextFieldOwnerStateContext);
	if (value == null) throw new Error(`MUI X: The \`usePickerTextFieldOwnerState\` can only be called in components that are used inside a PickerTextField component`);
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersInputBase/PickersInputBase.mjs
var _excluded$8 = [
	"elements",
	"areAllSectionsEmpty",
	"defaultValue",
	"label",
	"value",
	"onChange",
	"id",
	"autoFocus",
	"endAdornment",
	"startAdornment",
	"renderSuffix",
	"slots",
	"slotProps",
	"contentEditable",
	"tabIndex",
	"onInput",
	"onPaste",
	"onKeyDown",
	"fullWidth",
	"name",
	"readOnly",
	"inputRef",
	"sectionListRef",
	"onFocus",
	"onBlur",
	"classes",
	"ownerState"
], _excluded2$3 = ["ref"];
function mergePickersInputBaseSectionContentSlotProps(consumerSlotProps, baseClassName) {
	return (ownerState) => {
		const resolved = resolveComponentProps(consumerSlotProps, ownerState) ?? {};
		return _extends({}, resolved, { className: clsx(baseClassName, resolved.className) });
	};
}
var round = (value) => Math.round(value * 1e5) / 1e5;
var PickersInputBaseRoot = styled("div", {
	name: "MuiPickersInputBase",
	slot: "Root"
})(({ theme }) => _extends({}, theme.typography.body1, {
	color: (theme.vars || theme).palette.text.primary,
	cursor: "text",
	padding: 0,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	boxSizing: "border-box",
	letterSpacing: `${round(.15 / 16)}em`,
	[`&.${pickersInputBaseClasses.disabled}`]: {
		color: (theme.vars || theme).palette.action.disabled,
		cursor: "default"
	},
	variants: [{
		props: { isInputInFullWidth: true },
		style: { width: "100%" }
	}]
}));
var PickersInputBaseSectionsContainer = styled(PickersSectionListRoot, {
	name: "MuiPickersInputBase",
	slot: "SectionsContainer"
})(({ theme }) => ({
	padding: "4px 0 5px",
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit",
	lineHeight: "1.4375em",
	flexGrow: 1,
	outline: "none",
	display: "flex",
	flexWrap: "nowrap",
	overflow: "hidden",
	letterSpacing: "inherit",
	width: "182px",
	variants: [
		{
			props: { fieldDirection: "rtl" },
			style: { justifyContent: "end" }
		},
		{
			props: { inputSize: "small" },
			style: { paddingTop: 1 }
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true
			},
			style: {
				color: "currentColor",
				opacity: 0
			}
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true,
				inputHasLabel: false
			},
			style: theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: theme.palette.mode === "light" ? .42 : .5 }
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true,
				inputHasLabel: true,
				isLabelShrunk: true
			},
			style: theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: theme.palette.mode === "light" ? .42 : .5 }
		}
	]
}));
var PickersInputBaseSection = styled(PickersSectionListSection, {
	name: "MuiPickersInputBase",
	slot: "Section"
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit",
	letterSpacing: "inherit",
	lineHeight: "1.4375em",
	display: "inline-block",
	whiteSpace: "nowrap"
}));
var PickersInputBaseSectionContent = styled(PickersSectionListSectionContent, {
	name: "MuiPickersInputBase",
	slot: "SectionContent",
	overridesResolver: (props, styles) => styles.content
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	lineHeight: "1.4375em",
	letterSpacing: "inherit",
	width: "fit-content",
	outline: "none",
	"@supports (-webkit-app-region: drag)": { [`.${pickersInputBaseClasses.root}:not(:focus-within) &`]: {
		WebkitUserModify: "read-only",
		userSelect: "none"
	} }
}));
var PickersInputBaseSectionSeparator = styled(PickersSectionListSectionSeparator, {
	name: "MuiPickersInputBase",
	slot: "Separator"
})(() => ({
	whiteSpace: "pre",
	letterSpacing: "inherit"
}));
var PickersInputBaseInput = styled("input", {
	name: "MuiPickersInputBase",
	slot: "Input",
	overridesResolver: (props, styles) => styles.hiddenInput
})(_extends({}, visuallyHidden));
var PickersInputBaseActiveBar = styled("div", {
	name: "MuiPickersInputBase",
	slot: "ActiveBar"
})(({ theme, ownerState }) => ({
	display: "none",
	position: "absolute",
	height: 2,
	bottom: 2,
	borderTopLeftRadius: 2,
	borderTopRightRadius: 2,
	transition: theme.transitions.create(["width", "left"], { duration: theme.transitions.duration.shortest }),
	backgroundColor: (theme.vars || theme).palette.primary.main,
	"[data-active-range-position=\"start\"] &, [data-active-range-position=\"end\"] &": { display: "block" },
	"[data-active-range-position=\"start\"] &": { left: ownerState.sectionOffsets[0] },
	"[data-active-range-position=\"end\"] &": { left: ownerState.sectionOffsets[1] }
}));
var useUtilityClasses$9 = (classes, ownerState) => {
	const { isFieldFocused, isFieldDisabled, isFieldReadOnly, hasFieldError, inputSize, isInputInFullWidth, inputColor, hasStartAdornment, hasEndAdornment } = ownerState;
	return composeClasses({
		root: [
			"root",
			isFieldFocused && !isFieldDisabled && "focused",
			isFieldDisabled && "disabled",
			isFieldReadOnly && "readOnly",
			hasFieldError && "error",
			isInputInFullWidth && "fullWidth",
			`color${capitalize(inputColor)}`,
			inputSize === "small" && "inputSizeSmall",
			hasStartAdornment && "adornedStart",
			hasEndAdornment && "adornedEnd"
		],
		notchedOutline: ["notchedOutline"],
		input: ["input"],
		sectionsContainer: ["sectionsContainer"],
		sectionContent: ["sectionContent"],
		sectionBefore: ["sectionBefore"],
		sectionAfter: ["sectionAfter"],
		activeBar: ["activeBar"]
	}, getPickersInputBaseUtilityClass, classes);
};
function resolveSectionElementWidth(sectionElement, rootRef, index, dateRangePosition) {
	if (sectionElement.content.id) {
		const activeSectionElements = rootRef.current?.querySelectorAll(`[data-sectionindex="${index}"] [data-range-position="${dateRangePosition}"]`);
		if (activeSectionElements) return Array.from(activeSectionElements).reduce((currentActiveBarWidth, element) => {
			return currentActiveBarWidth + element.offsetWidth;
		}, 0);
	}
	return 0;
}
function resolveSectionWidthAndOffsets(elements, rootRef) {
	let activeBarWidth = 0;
	if (rootRef.current?.getAttribute("data-active-range-position") === "end") for (let i = elements.length - 1; i >= elements.length / 2; i -= 1) activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "end");
	else for (let i = 0; i < elements.length / 2; i += 1) activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "start");
	return {
		activeBarWidth,
		sectionOffsets: [rootRef.current?.querySelector(`[data-sectionindex="0"]`)?.offsetLeft || 0, rootRef.current?.querySelector(`[data-sectionindex="${elements.length / 2}"]`)?.offsetLeft || 0]
	};
}
/**
* @ignore - internal component.
*/
var PickersInputBase = /*#__PURE__*/ import_react.forwardRef(function PickersInputBase(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersInputBase"
	});
	const { elements, areAllSectionsEmpty, value, onChange, id, endAdornment, startAdornment, renderSuffix, slots, slotProps, contentEditable, tabIndex, onInput, onPaste, onKeyDown, name, readOnly, inputRef, sectionListRef, onFocus, onBlur, classes: classesProp, ownerState: ownerStateProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
	const ownerStateContext = usePickerTextFieldOwnerState();
	const rootRef = import_react.useRef(null);
	const activeBarRef = import_react.useRef(null);
	const sectionOffsetsRef = import_react.useRef([]);
	const handleRootRef = useForkRef(ref, rootRef);
	const muiFormControl = useFormControl();
	if (!muiFormControl) throw new Error("MUI X: PickersInputBase should always be used inside a PickersTextField component");
	const ownerState = ownerStateProp ?? ownerStateContext;
	const handleInputFocus = (event) => {
		muiFormControl.onFocus?.(event);
		onFocus?.(event);
	};
	const handleHiddenInputFocus = (event) => {
		handleInputFocus(event);
	};
	const handleKeyDown = (event) => {
		onKeyDown?.(event);
		if (event.key === "Enter" && !event.defaultMuiPrevented) {
			if (rootRef.current?.dataset.multiInput) return;
			const closestForm = rootRef.current?.closest("form");
			const submitTrigger = closestForm?.querySelector("[type=\"submit\"]");
			if (!closestForm || !submitTrigger) return;
			event.preventDefault();
			closestForm.requestSubmit(submitTrigger);
		}
	};
	const handleInputBlur = (event) => {
		muiFormControl.onBlur?.(event);
		onBlur?.(event);
	};
	import_react.useEffect(() => {
		if (muiFormControl) muiFormControl.setAdornedStart(Boolean(startAdornment));
	}, [muiFormControl, startAdornment]);
	import_react.useEffect(() => {
		if (!muiFormControl) return;
		if (areAllSectionsEmpty) muiFormControl.onEmpty();
		else muiFormControl.onFilled();
	}, [muiFormControl, areAllSectionsEmpty]);
	const classes = useUtilityClasses$9(classesProp, ownerState);
	const InputRoot = slots?.root || PickersInputBaseRoot;
	const inputRootProps = useSlotProps({
		elementType: InputRoot,
		externalSlotProps: slotProps?.root,
		externalForwardedProps: other,
		additionalProps: {
			"aria-invalid": muiFormControl.error,
			ref: handleRootRef
		},
		className: classes.root,
		ownerState
	});
	const InputSectionsContainer = slots?.input || PickersInputBaseSectionsContainer;
	const HtmlInputComponent = slots?.htmlInput || PickersInputBaseInput;
	const _ref = useSlotProps({
		elementType: HtmlInputComponent,
		externalSlotProps: slotProps?.htmlInput,
		ownerState
	}), { ref: resolvedHtmlInputRef } = _ref, htmlInputProps = _objectWithoutPropertiesLoose(_ref, _excluded2$3);
	const handleInputRef = useForkRef(resolvedHtmlInputRef, inputRef);
	const isSingleInputRange = elements.some((element) => element.content["data-range-position"] !== void 0);
	import_react.useEffect(() => {
		if (!isSingleInputRange || !ownerState.isPickerOpen) return;
		const { activeBarWidth, sectionOffsets } = resolveSectionWidthAndOffsets(elements, rootRef);
		sectionOffsetsRef.current = [sectionOffsets[0], sectionOffsets[1]];
		if (activeBarRef.current) activeBarRef.current.style.width = `${activeBarWidth}px`;
	}, [
		elements,
		isSingleInputRange,
		ownerState.isPickerOpen
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(InputRoot, _extends({}, inputRootProps, { children: [
		startAdornment,
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersSectionList, {
			sectionListRef,
			elements,
			contentEditable,
			tabIndex,
			className: classes.sectionsContainer,
			onFocus: handleInputFocus,
			onBlur: handleInputBlur,
			onInput,
			onPaste,
			onKeyDown: handleKeyDown,
			slots: {
				root: InputSectionsContainer,
				section: PickersInputBaseSection,
				sectionContent: PickersInputBaseSectionContent,
				sectionSeparator: PickersInputBaseSectionSeparator
			},
			slotProps: {
				root: _extends({}, slotProps?.input, { ownerState }),
				sectionContent: mergePickersInputBaseSectionContentSlotProps(slotProps?.sectionContent, pickersInputBaseClasses.sectionContent),
				sectionSeparator: ({ separatorPosition }) => ({ className: separatorPosition === "before" ? pickersInputBaseClasses.sectionBefore : pickersInputBaseClasses.sectionAfter })
			}
		}),
		endAdornment,
		renderSuffix ? renderSuffix(_extends({}, muiFormControl)) : null,
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(HtmlInputComponent, _extends({
			name,
			className: classes.input,
			value,
			onChange,
			id,
			"aria-hidden": "true",
			tabIndex: -1,
			readOnly,
			required: muiFormControl.required,
			disabled: muiFormControl.disabled,
			onFocus: handleHiddenInputFocus
		}, htmlInputProps, { ref: handleInputRef })),
		isSingleInputRange && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersInputBaseActiveBar, {
			className: classes.activeBar,
			ref: activeBarRef,
			ownerState: { sectionOffsets: sectionOffsetsRef.current }
		})
	] }));
});
PickersInputBase.displayName = "PickersInputBase";
PickersInputBase.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the input will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
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
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	/**
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onMouseDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* The components used for each slot inside.
	*
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* Start `InputAdornment` for this component.
	*/
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersOutlinedInput/pickersOutlinedInputClasses.mjs
function getPickersOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersOutlinedInput", slot);
}
var pickersOutlinedInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersOutlinedInput", [
	"root",
	"notchedOutline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersOutlinedInput/Outline.mjs
var _excluded$7 = [
	"children",
	"className",
	"label",
	"notched",
	"shrink"
];
var OutlineRoot = styled("fieldset", {
	name: "MuiPickersOutlinedInput",
	slot: "NotchedOutline"
})(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		textAlign: "left",
		position: "absolute",
		bottom: 0,
		right: 0,
		top: -5,
		left: 0,
		margin: 0,
		padding: "0 8px",
		pointerEvents: "none",
		borderRadius: "inherit",
		borderStyle: "solid",
		borderWidth: 1,
		overflow: "hidden",
		minWidth: "0%",
		borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor
	};
});
var OutlineLabel = styled("span", {
	slot: "internal",
	shouldForwardProp: void 0
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit"
}));
var OutlineLegend = styled("legend", {
	slot: "internal",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "notched"
})(({ theme }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: { inputHasLabel: false },
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: theme.transitions.create("width", {
					duration: 150,
					easing: theme.transitions.easing.easeOut
				})
			}
		},
		{
			props: { inputHasLabel: true },
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: theme.transitions.create("max-width", {
					duration: 50,
					easing: theme.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: {
				inputHasLabel: true,
				notched: true
			},
			style: {
				maxWidth: "100%",
				transition: theme.transitions.create("max-width", {
					duration: 100,
					easing: theme.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
}));
/**
* @ignore - internal component.
*/
function Outline(props) {
	const { className, label, notched } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
	const ownerState = usePickerTextFieldOwnerState();
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OutlineRoot, _extends({
		"aria-hidden": true,
		className
	}, other, {
		ownerState,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OutlineLegend, {
			ownerState,
			notched,
			children: label ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OutlineLabel, { children: label }) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OutlineLabel, {
				className: "notranslate",
				children: "​"
			})
		})
	}));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersOutlinedInput/PickersOutlinedInput.mjs
var _excluded$6 = [
	"label",
	"autoFocus",
	"ownerState",
	"classes",
	"notched",
	"slots",
	"slotProps"
];
var PickersOutlinedInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersOutlinedInput",
	slot: "Root"
})(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		padding: "0 14px",
		borderRadius: (theme.vars || theme).shape.borderRadius,
		[`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor } },
		[`&.${pickersOutlinedInputClasses.focused} .${pickersOutlinedInputClasses.notchedOutline}`]: {
			borderStyle: "solid",
			borderWidth: 2
		},
		[`&.${pickersOutlinedInputClasses.error} .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.error.main },
		[`&.${pickersOutlinedInputClasses.disabled}`]: { [`& .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.action.disabled } },
		variants: Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key]?.main ?? false).map((color) => ({
			props: { inputColor: color },
			style: { [`&.${pickersOutlinedInputClasses.focused}:not(.${pickersOutlinedInputClasses.error}) .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette[color].main } }
		}))
	};
});
var PickersOutlinedInputSectionsContainer = styled(PickersInputBaseSectionsContainer, {
	name: "MuiPickersOutlinedInput",
	slot: "SectionsContainer"
})({
	padding: "16.5px 0",
	variants: [{
		props: { inputSize: "small" },
		style: { padding: "8.5px 0" }
	}]
});
var useUtilityClasses$8 = (classes) => {
	return _extends({}, classes, composeClasses({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, getPickersOutlinedInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersOutlinedInput = /*#__PURE__*/ import_react.forwardRef(function PickersOutlinedInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersOutlinedInput"
	});
	const { label, classes: classesProp, notched, slots: inSlots, slotProps: inSlotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
	const muiFormControl = useFormControl();
	const classes = useUtilityClasses$8(classesProp);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({}, other, {
		slots: _extends({
			root: PickersOutlinedInputRoot,
			input: PickersOutlinedInputSectionsContainer
		}, inSlots),
		slotProps: inSlotProps,
		renderSuffix: (state) => {
			const isNotched = typeof notched !== "undefined" ? notched : Boolean(state.adornedStart || state.focused || state.filled);
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Outline, {
				shrink: isNotched,
				notched: isNotched,
				className: classes.notchedOutline,
				label: label != null && label !== "" && muiFormControl?.required ? /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
					label,
					" ",
					"*"
				] }) : label
			});
		},
		label,
		classes,
		ref
	}));
});
PickersOutlinedInput.displayName = "PickersOutlinedInput";
PickersOutlinedInput.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the input will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
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
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	/**
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	notched: import_prop_types.default.bool,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onMouseDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* The components used for each slot inside.
	*
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* Start `InputAdornment` for this component.
	*/
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersOutlinedInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersFilledInput/pickersFilledInputClasses.mjs
function getPickersFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersFilledInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersFilledInput", [
	"root",
	"underline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersFilledInput/PickersFilledInput.mjs
var _excluded$5 = [
	"label",
	"autoFocus",
	"disableUnderline",
	"hiddenLabel",
	"classes",
	"slots",
	"slotProps"
];
var PickersFilledInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersFilledInput",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({ theme }) => {
	const light = theme.palette.mode === "light";
	const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
	const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
	const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
		borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
		borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create("background-color", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
			"@media (hover: none)": { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor }
		},
		[`&.${pickersFilledInputClasses.focused}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor },
		[`&.${pickersFilledInputClasses.disabled}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground },
		variants: [
			...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => ({
				props: {
					inputColor: color,
					disableUnderline: false
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}` } }
			})),
			{
				props: { disableUnderline: false },
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${pickersFilledInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${pickersFilledInputClasses.error}`]: { "&:before, &:after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline) : bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${pickersFilledInputClasses.disabled}, .${pickersFilledInputClasses.error}):before`]: { borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}` },
					[`&.${pickersFilledInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			{
				props: { hasStartAdornment: true },
				style: { paddingLeft: 12 }
			},
			{
				props: { hasEndAdornment: true },
				style: { paddingRight: 12 }
			}
		]
	};
});
var PickersFilledSectionsContainer = styled(PickersInputBaseSectionsContainer, {
	name: "MuiPickersFilledInput",
	slot: "sectionsContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "hiddenLabel"
})({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	variants: [
		{
			props: { inputSize: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: { hasStartAdornment: true },
			style: { paddingLeft: 0 }
		},
		{
			props: { hasEndAdornment: true },
			style: { paddingRight: 0 }
		},
		{
			props: { hiddenLabel: true },
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: {
				hiddenLabel: true,
				inputSize: "small"
			},
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		}
	]
});
var useUtilityClasses$7 = (classes, ownerState) => {
	const { inputHasUnderline } = ownerState;
	return _extends({}, classes, composeClasses({
		root: ["root", inputHasUnderline && "underline"],
		input: ["input"]
	}, getPickersFilledInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersFilledInput = /*#__PURE__*/ import_react.forwardRef(function PickersFilledInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersFilledInput"
	});
	const { label, disableUnderline = false, hiddenLabel = false, classes: classesProp, slots: inSlots, slotProps: inSlotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const ownerState = _extends({}, usePickerTextFieldOwnerState(), { inputHasUnderline: !disableUnderline });
	const classes = useUtilityClasses$7(classesProp, ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({}, other, {
		slots: _extends({
			root: PickersFilledInputRoot,
			input: PickersFilledSectionsContainer
		}, inSlots),
		slotProps: _extends({}, inSlotProps, {
			root: _extends({ disableUnderline }, inSlotProps?.root),
			input: _extends({ hiddenLabel }, inSlotProps?.input)
		}),
		label,
		classes,
		ref,
		ownerState
	}));
});
PickersFilledInput.displayName = "PickersFilledInput";
PickersFilledInput.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	disableUnderline: import_prop_types.default.bool,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the input will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
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
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	/**
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onMouseDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* The components used for each slot inside.
	*
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* Start `InputAdornment` for this component.
	*/
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersFilledInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersInput/pickersInputClasses.mjs
function getPickersInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersInput", [
	"root",
	"underline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersInput/PickersInput.mjs
var _excluded$4 = [
	"label",
	"autoFocus",
	"disableUnderline",
	"ownerState",
	"classes",
	"slots",
	"slotProps"
];
var PickersInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersInput",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({ theme }) => {
	let bottomLineColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	if (theme.vars) bottomLineColor = theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline);
	return {
		"label + &": { marginTop: 16 },
		variants: [...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => ({
			props: {
				inputColor: color,
				inputHasUnderline: true
			},
			style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}` } }
		})), {
			props: { inputHasUnderline: true },
			style: {
				"&::after": {
					background: "red",
					left: 0,
					bottom: 0,
					content: "\"\"",
					position: "absolute",
					right: 0,
					transform: "scaleX(0)",
					transition: theme.transitions.create("transform", {
						duration: theme.transitions.duration.shorter,
						easing: theme.transitions.easing.easeOut
					}),
					pointerEvents: "none"
				},
				[`&.${pickersInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
				[`&.${pickersInputClasses.error}`]: { "&:before, &:after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
				"&::before": {
					borderBottom: `1px solid ${bottomLineColor}`,
					left: 0,
					bottom: 0,
					content: "\"\\00a0\"",
					position: "absolute",
					right: 0,
					transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
					pointerEvents: "none"
				},
				[`&:hover:not(.${pickersInputClasses.disabled}, .${pickersInputClasses.error}):before`]: {
					borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
					"@media (hover: none)": { borderBottom: `1px solid ${bottomLineColor}` }
				},
				[`&.${pickersInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
			}
		}]
	};
});
var useUtilityClasses$6 = (classes, ownerState) => {
	const { inputHasUnderline } = ownerState;
	return _extends({}, classes, composeClasses({
		root: ["root", !inputHasUnderline && "underline"],
		input: ["input"]
	}, getPickersInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersInput = /*#__PURE__*/ import_react.forwardRef(function PickersInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersInput"
	});
	const { label, disableUnderline = false, classes: classesProp, slots: inSlots, slotProps: inSlotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
	const ownerState = _extends({}, usePickerTextFieldOwnerState(), { inputHasUnderline: !disableUnderline });
	const classes = useUtilityClasses$6(classesProp, ownerState);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({}, other, {
		slots: _extends({ root: PickersInputRoot }, inSlots),
		slotProps: _extends({}, inSlotProps, { root: _extends({ disableUnderline }, inSlotProps?.root) }),
		ownerState,
		label,
		classes,
		ref
	}));
});
PickersInput.displayName = "PickersInput";
PickersInput.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	/**
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	disableUnderline: import_prop_types.default.bool,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the input will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
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
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	/**
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onMouseDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* The components used for each slot inside.
	*
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* Start `InputAdornment` for this component.
	*/
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersTextField/PickersTextField.mjs
var _excluded$3 = [
	"onFocus",
	"onBlur",
	"className",
	"classes",
	"color",
	"disabled",
	"error",
	"variant",
	"required",
	"hiddenLabel",
	"inputRef",
	"sectionListRef",
	"elements",
	"areAllSectionsEmpty",
	"onClick",
	"onMouseDown",
	"onKeyDown",
	"onKeyUp",
	"onPaste",
	"onInput",
	"endAdornment",
	"startAdornment",
	"tabIndex",
	"contentEditable",
	"focused",
	"value",
	"onChange",
	"fullWidth",
	"id",
	"name",
	"helperText",
	"label",
	"slots",
	"slotProps",
	"data-active-range-position"
];
var VARIANT_COMPONENT = {
	standard: PickersInput,
	filled: PickersFilledInput,
	outlined: PickersOutlinedInput
};
var PickersTextFieldRoot = styled(FormControl, {
	name: "MuiPickersTextField",
	slot: "Root"
})({ maxWidth: "100%" });
var useUtilityClasses$5 = (classes, ownerState) => {
	const { isFieldFocused, isFieldDisabled, isFieldRequired } = ownerState;
	return composeClasses({ root: [
		"root",
		isFieldFocused && !isFieldDisabled && "focused",
		isFieldDisabled && "disabled",
		isFieldRequired && "required"
	] }, getPickersTextFieldUtilityClass, classes);
};
var PickersTextField = /*#__PURE__*/ import_react.forwardRef(function PickersTextField(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersTextField"
	});
	{
		const legacyProps = inProps;
		if (legacyProps.InputProps || legacyProps.inputProps || legacyProps.InputLabelProps || legacyProps.FormHelperTextProps) warnOnce([
			"MUI X: `PickersTextField` no longer supports the `InputProps`, `inputProps`, `InputLabelProps` and `FormHelperTextProps` props.",
			"They are silently dropped, which can hide configuration bugs in JavaScript codebases that do not benefit from TypeScript checks.",
			"Use `slotProps.input`, `slotProps.htmlInput`, `slotProps.inputLabel` and `slotProps.formHelperText` instead.",
			"You can run the `migrate-text-field-props` codemod to migrate automatically."
		]);
	}
	const { onFocus, onBlur, className, classes: classesProp, color = "primary", disabled = false, error = false, variant = "outlined", required = false, hiddenLabel = false, inputRef, sectionListRef, elements, areAllSectionsEmpty, onClick, onMouseDown, onKeyDown, onKeyUp, onPaste, onInput, endAdornment, startAdornment, tabIndex, contentEditable, focused, value, onChange, fullWidth, id: idProp, name, helperText, label, slots, slotProps, "data-active-range-position": dataActiveRangePosition } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	const handleRootRef = useForkRef(ref, import_react.useRef(null));
	const id = useId(idProp);
	const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
	const inputLabelId = label && id ? `${id}-label` : void 0;
	const inputSlotProps = slotProps?.input;
	const inputLabelSlotProps = slotProps?.inputLabel;
	const fieldOwnerState = useFieldOwnerState({
		disabled: props.disabled,
		required: props.required,
		readOnly: inputSlotProps?.readOnly
	});
	const ownerState = import_react.useMemo(() => _extends({}, fieldOwnerState, {
		isFieldValueEmpty: areAllSectionsEmpty,
		isFieldFocused: focused ?? false,
		hasFieldError: error ?? false,
		inputSize: props.size ?? "medium",
		inputColor: color ?? "primary",
		isInputInFullWidth: fullWidth ?? false,
		hasStartAdornment: Boolean(startAdornment ?? inputSlotProps?.startAdornment),
		hasEndAdornment: Boolean(endAdornment ?? inputSlotProps?.endAdornment),
		inputHasLabel: !!label,
		isLabelShrunk: Boolean(inputLabelSlotProps?.shrink)
	}), [
		fieldOwnerState,
		areAllSectionsEmpty,
		focused,
		error,
		props.size,
		color,
		fullWidth,
		startAdornment,
		endAdornment,
		inputSlotProps?.startAdornment,
		inputSlotProps?.endAdornment,
		label,
		inputLabelSlotProps?.shrink
	]);
	const classes = useUtilityClasses$5(classesProp, ownerState);
	const PickersInputComponent = slots?.input ?? VARIANT_COMPONENT[variant];
	const RootComponent = slots?.root ?? PickersTextFieldRoot;
	const InputLabelComponent = slots?.inputLabel ?? InputLabel;
	const FormHelperTextComponent = slots?.formHelperText ?? FormHelperText;
	const inputAdditionalProps = {};
	if (variant === "outlined") {
		if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") inputAdditionalProps.notched = inputLabelSlotProps.shrink;
		inputAdditionalProps.label = label;
	} else if (variant === "filled") inputAdditionalProps.hiddenLabel = hiddenLabel;
	const rootSlotProps = useSlotProps({
		elementType: RootComponent,
		externalSlotProps: slotProps?.root,
		externalForwardedProps: _extends({}, other, { className }),
		additionalProps: {
			ref: handleRootRef,
			focused,
			disabled,
			variant,
			error,
			color,
			fullWidth,
			required
		},
		className: classes.root,
		ownerState
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerTextFieldOwnerStateContext.Provider, {
		value: ownerState,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(RootComponent, _extends({}, rootSlotProps, { children: [
			label != null && label !== "" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputLabelComponent, _extends({
				htmlFor: id,
				id: inputLabelId
			}, inputLabelSlotProps, { children: label })),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersInputComponent, _extends({
				elements,
				areAllSectionsEmpty,
				onClick,
				onMouseDown,
				onKeyDown,
				onKeyUp,
				onInput,
				onPaste,
				onFocus,
				onBlur,
				endAdornment,
				startAdornment,
				tabIndex,
				contentEditable,
				value,
				onChange,
				id,
				fullWidth,
				inputRef,
				sectionListRef,
				label,
				name,
				role: "group",
				"aria-labelledby": inputLabelId,
				"aria-describedby": helperTextId,
				"aria-live": helperTextId ? "polite" : void 0,
				"data-active-range-position": dataActiveRangePosition
			}, inputAdditionalProps, inputSlotProps, {
				slots: _extends({}, inputSlotProps?.slots, slots?.htmlInput !== void 0 && { htmlInput: slots.htmlInput }),
				slotProps: _extends({}, inputSlotProps?.slotProps, slotProps?.htmlInput !== void 0 && { htmlInput: slotProps.htmlInput })
			})),
			helperText && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FormHelperTextComponent, _extends({ id: helperTextId }, slotProps?.formHelperText, { children: helperText }))
		] }))
	});
});
PickersTextField.displayName = "PickersTextField";
PickersTextField.propTypes = {
	/**
	* Is `true` if the current values equals the empty value.
	* For a single item value, it means that `value === null`
	* For a range value, it means that `value === [null, null]`
	*/
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
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
	* If true, the whole element is editable.
	* Useful when all the sections are selected.
	*/
	contentEditable: import_prop_types.default.bool.isRequired,
	disabled: import_prop_types.default.bool.isRequired,
	/**
	* The elements to render.
	* Each element contains the prop to edit a section of the value.
	*/
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	/**
	* End `InputAdornment` for this component.
	*/
	endAdornment: import_prop_types.default.node,
	/**
	* If `true`, the `input` will indicate an error.
	* @default false
	*/
	error: import_prop_types.default.bool.isRequired,
	/**
	* If `true`, the component is displayed in focused state.
	*/
	focused: import_prop_types.default.bool,
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
	* Name attribute of the `input` element.
	*/
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func.isRequired,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onFocus: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onMouseDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	readOnly: import_prop_types.default.bool,
	/**
	* If `true`, the label will indicate that the `input` is required.
	* @default false
	*/
	required: import_prop_types.default.bool,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
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
	* The components used for each slot inside.
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
	value: import_prop_types.default.string.isRequired,
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
//#region node_modules/@mui/x-date-pickers/internals/components/PickerFieldUI.mjs
var _excluded$2 = [
	"readOnly",
	"onClear",
	"clearable",
	"clearButtonPosition",
	"openPickerButtonPosition",
	"openPickerAriaLabel",
	"InputProps",
	"inputProps",
	"InputLabelProps",
	"FormHelperTextProps"
], _excluded2$2 = ["ownerState"], _excluded3$1 = ["ownerState"], _excluded4 = ["ownerState"], _excluded5 = ["ownerState"], _excluded6 = [
	"InputProps",
	"inputProps",
	"InputLabelProps",
	"FormHelperTextProps"
];
var cleanFieldResponse = (fieldResponse) => {
	const _ref = fieldResponse, { readOnly, onClear, clearable, clearButtonPosition, openPickerButtonPosition, openPickerAriaLabel, InputProps: legacyInputProps, inputProps: legacyHtmlInputProps, InputLabelProps: legacyInputLabelProps, FormHelperTextProps: legacyFormHelperTextProps } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$2);
	if (legacyInputProps || legacyHtmlInputProps || legacyInputLabelProps || legacyFormHelperTextProps) warnOnce([
		"MUI X: The `InputProps`, `inputProps`, `InputLabelProps` and `FormHelperTextProps` props are no longer supported on Picker / Field components.",
		"They have been silently dropped because they would otherwise be forwarded as unknown attributes on the underlying form control.",
		"Use the `slotProps` shape instead (`slotProps.input`, `slotProps.htmlInput`, `slotProps.inputLabel`, `slotProps.formHelperText`).",
		"See https://mui.com/x/migration/migration-pickers-v8/#textfield-props for migration details."
	]);
	return {
		clearable,
		onClear,
		clearButtonPosition,
		openPickerButtonPosition,
		openPickerAriaLabel,
		textFieldProps: _extends({}, other, { slotProps: _extends({}, other?.slotProps, { input: _extends({}, other?.slotProps?.input, { readOnly }) }) })
	};
};
var PickerFieldUIContext = /*#__PURE__*/ import_react.createContext({
	slots: {},
	slotProps: {},
	inputRef: void 0
});
PickerFieldUIContext.displayName = "PickerFieldUIContext";
function PickerFieldUI(props) {
	const { fieldResponse, defaultOpenPickerIcon } = props;
	const translations = usePickerTranslations();
	const pickerContext = useNullablePickerContext();
	const pickerFieldUIContext = import_react.useContext(PickerFieldUIContext);
	const { textFieldProps, onClear, clearable, openPickerAriaLabel, clearButtonPosition: clearButtonPositionProp = "end", openPickerButtonPosition: openPickerButtonPositionProp = "end" } = cleanFieldResponse(fieldResponse);
	const ownerState = useFieldOwnerState(textFieldProps);
	const handleClickOpeningButton = useEventCallback((event) => {
		event.preventDefault();
		pickerContext?.setOpen(true);
	});
	const triggerStatus = pickerContext ? pickerContext.triggerStatus : "hidden";
	const clearButtonPosition = clearable ? clearButtonPositionProp : null;
	const openPickerButtonPosition = triggerStatus !== "hidden" ? openPickerButtonPositionProp : null;
	const TextField = pickerFieldUIContext.slots.textField ?? PickersTextField;
	const InputAdornment$1 = pickerFieldUIContext.slots.inputAdornment ?? InputAdornment;
	const startInputAdornmentProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: InputAdornment$1,
		externalSlotProps: pickerFieldUIContext.slotProps.inputAdornment,
		additionalProps: { position: "start" },
		ownerState: _extends({}, ownerState, { position: "start" })
	}), _excluded2$2);
	const endInputAdornmentProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: InputAdornment$1,
		externalSlotProps: pickerFieldUIContext.slotProps.inputAdornment,
		additionalProps: { position: "end" },
		ownerState: _extends({}, ownerState, { position: "end" })
	}), _excluded3$1);
	const OpenPickerButton = pickerFieldUIContext.slots.openPickerButton ?? IconButton;
	const openPickerButtonProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: OpenPickerButton,
		externalSlotProps: pickerFieldUIContext.slotProps.openPickerButton,
		additionalProps: {
			disabled: triggerStatus === "disabled",
			onClick: handleClickOpeningButton,
			"aria-label": openPickerAriaLabel,
			"data-mui-picker-open-button": "true",
			edge: textFieldProps.variant !== "standard" ? openPickerButtonPosition : false
		},
		ownerState
	}), _excluded4);
	const OpenPickerIcon = pickerFieldUIContext.slots.openPickerIcon ?? defaultOpenPickerIcon;
	const openPickerIconProps = useSlotProps({
		elementType: OpenPickerIcon,
		externalSlotProps: pickerFieldUIContext.slotProps.openPickerIcon,
		ownerState
	});
	const ClearButton = pickerFieldUIContext.slots.clearButton ?? IconButton;
	const clearButtonProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: ClearButton,
		externalSlotProps: pickerFieldUIContext.slotProps.clearButton,
		className: "clearButton",
		additionalProps: {
			title: translations.fieldClearLabel,
			tabIndex: -1,
			onClick: onClear,
			disabled: fieldResponse.disabled || fieldResponse.readOnly,
			edge: textFieldProps.variant !== "standard" && clearButtonPosition !== openPickerButtonPosition ? clearButtonPosition : false
		},
		ownerState
	}), _excluded5);
	const ClearIcon$1 = pickerFieldUIContext.slots.clearIcon ?? ClearIcon;
	const clearIconProps = useSlotProps({
		elementType: ClearIcon$1,
		externalSlotProps: pickerFieldUIContext.slotProps.clearIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	textFieldProps.ref = useForkRef(textFieldProps.ref, pickerContext?.rootRef);
	const externalInputSlotProps = textFieldProps.slotProps?.input;
	const additionalInputSlotProps = {};
	const forkedInputRef = useForkRef(externalInputSlotProps?.ref, pickerContext?.triggerRef);
	if (pickerContext) additionalInputSlotProps.ref = forkedInputRef;
	if (!externalInputSlotProps?.startAdornment && (clearButtonPosition === "start" || openPickerButtonPosition === "start")) additionalInputSlotProps.startAdornment = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(InputAdornment$1, _extends({}, startInputAdornmentProps, { children: [openPickerButtonPosition === "start" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps)) })), clearButtonPosition === "start" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearButton, _extends({}, clearButtonProps, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearIcon$1, _extends({}, clearIconProps)) }))] }));
	if (!externalInputSlotProps?.endAdornment && (clearButtonPosition === "end" || openPickerButtonPosition === "end")) additionalInputSlotProps.endAdornment = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(InputAdornment$1, _extends({}, endInputAdornmentProps, { children: [clearButtonPosition === "end" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearButton, _extends({}, clearButtonProps, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearIcon$1, _extends({}, clearIconProps)) })), openPickerButtonPosition === "end" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps)) }))] }));
	if (!additionalInputSlotProps.endAdornment && !additionalInputSlotProps.startAdornment && pickerFieldUIContext.slots.inputAdornment) additionalInputSlotProps.endAdornment = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputAdornment$1, _extends({}, endInputAdornmentProps));
	if (clearButtonPosition != null) textFieldProps.sx = [{
		"& .clearButton": { opacity: 1 },
		"@media (pointer: fine)": {
			"& .clearButton": { opacity: 0 },
			"&:hover, &:focus-within": { ".clearButton": { opacity: 1 } }
		}
	}, ...Array.isArray(textFieldProps.sx) ? textFieldProps.sx : [textFieldProps.sx]];
	textFieldProps.slotProps = _extends({}, textFieldProps.slotProps, { input: _extends({}, externalInputSlotProps, additionalInputSlotProps) });
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextField, _extends({}, textFieldProps));
}
function mergeSlotProps(slotPropsA, slotPropsB) {
	if (!slotPropsA) return slotPropsB;
	if (!slotPropsB) return slotPropsA;
	return (ownerState) => {
		return _extends({}, resolveComponentProps(slotPropsB, ownerState), resolveComponentProps(slotPropsA, ownerState));
	};
}
/**
* The `textField` slot props cannot be handled inside `PickerFieldUI` because it would be a breaking change to not pass the enriched props to `useField`.
* TODO v10: Remove the `textField` slot and clean this logic up.
*/
function useFieldTextFieldProps(parameters) {
	const { ref, externalForwardedProps, slotProps } = parameters;
	const pickerFieldUIContext = import_react.useContext(PickerFieldUIContext);
	const pickerContext = useNullablePickerContext();
	const ownerState = useFieldOwnerState(externalForwardedProps);
	const _ref2 = externalForwardedProps ?? {}, { InputProps: legacyInputProps, inputProps: legacyHtmlInputProps, InputLabelProps: legacyInputLabelProps, FormHelperTextProps: legacyFormHelperTextProps } = _ref2, sanitizedExternalForwardedProps = _objectWithoutPropertiesLoose(_ref2, _excluded6);
	if (legacyInputProps || legacyHtmlInputProps || legacyInputLabelProps || legacyFormHelperTextProps) warnOnce([
		"MUI X: Field components no longer accept the `InputProps`, `inputProps`, `InputLabelProps` and `FormHelperTextProps` props.",
		"They have been dropped to avoid leaking unknown attributes onto the underlying form control.",
		"Use the nested `slotProps.textField.slotProps.{input,htmlInput,inputLabel,formHelperText}` shape instead."
	]);
	const textFieldProps = useSlotProps({
		elementType: PickersTextField,
		externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.textField, slotProps?.textField),
		externalForwardedProps: sanitizedExternalForwardedProps,
		additionalProps: {
			ref,
			sx: pickerContext?.rootSx,
			label: pickerContext?.label,
			name: pickerContext?.name,
			className: pickerContext?.rootClassName,
			inputRef: pickerFieldUIContext.inputRef
		},
		ownerState
	});
	if (pickerContext && pickerContext.keepOpenDuringFieldFocus && pickerContext.triggerStatus === "enabled" && !pickerContext.open && !pickerContext.readOnly && !pickerContext.disabled) {
		const prevOnFocus = textFieldProps.onFocus;
		const prevOnMouseDown = textFieldProps.onMouseDown;
		const isFromOpenButton = (event) => {
			const path = (event.nativeEvent ?? event)?.composedPath?.();
			if (Array.isArray(path)) {
				for (const el of path) if (el && el.getAttribute && el.getAttribute("data-mui-picker-open-button") === "true") return true;
			}
			const target = event.target;
			if (target && target.closest) return Boolean(target.closest("[data-mui-picker-open-button=\"true\"]"));
			return false;
		};
		textFieldProps.onFocus = (event) => {
			prevOnFocus?.(event);
			if (!event.isDefaultPrevented() && !isFromOpenButton(event)) pickerContext.setOpen(true);
		};
		textFieldProps.onMouseDown = (event) => {
			prevOnMouseDown?.(event);
			if (!event.isDefaultPrevented() && !isFromOpenButton(event)) pickerContext.setOpen(true);
		};
	}
	return textFieldProps;
}
function PickerFieldUIContextProvider(props) {
	const { slots = {}, slotProps = {}, inputRef, children } = props;
	const contextValue = import_react.useMemo(() => ({
		inputRef,
		slots: {
			openPickerButton: slots.openPickerButton,
			openPickerIcon: slots.openPickerIcon,
			textField: slots.textField,
			inputAdornment: slots.inputAdornment,
			clearIcon: slots.clearIcon,
			clearButton: slots.clearButton
		},
		slotProps: {
			openPickerButton: slotProps.openPickerButton,
			openPickerIcon: slotProps.openPickerIcon,
			textField: slotProps.textField,
			inputAdornment: slotProps.inputAdornment,
			clearIcon: slotProps.clearIcon,
			clearButton: slotProps.clearButton
		}
	}), [
		inputRef,
		slots.openPickerButton,
		slots.openPickerIcon,
		slots.textField,
		slots.inputAdornment,
		slots.clearIcon,
		slots.clearButton,
		slotProps.openPickerButton,
		slotProps.openPickerIcon,
		slotProps.textField,
		slotProps.inputAdornment,
		slotProps.clearIcon,
		slotProps.clearButton
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerFieldUIContext.Provider, {
		value: contextValue,
		children
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersArrowSwitcher/pickersArrowSwitcherClasses.mjs
function getPickersArrowSwitcherUtilityClass(slot) {
	return generateUtilityClass("MuiPickersArrowSwitcher", slot);
}
generateUtilityClasses("MuiPickersArrowSwitcher", [
	"root",
	"spacer",
	"button",
	"previousIconButton",
	"nextIconButton",
	"leftArrowIcon",
	"rightArrowIcon"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersArrowSwitcher/PickersArrowSwitcher.mjs
var _excluded$1 = [
	"children",
	"className",
	"slots",
	"slotProps",
	"isNextDisabled",
	"isNextHidden",
	"onGoToNext",
	"nextLabel",
	"isPreviousDisabled",
	"isPreviousHidden",
	"onGoToPrevious",
	"previousLabel",
	"labelId",
	"classes"
], _excluded2$1 = ["ownerState"], _excluded3 = ["ownerState"];
var PickersArrowSwitcherRoot = styled("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Root"
})({ display: "flex" });
var PickersArrowSwitcherSpacer = styled("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Spacer"
})(({ theme }) => ({ width: theme.spacing(3) }));
var PickersArrowSwitcherButton = styled(IconButton, {
	name: "MuiPickersArrowSwitcher",
	slot: "Button"
})({ variants: [{
	props: { isButtonHidden: true },
	style: { visibility: "hidden" }
}] });
var useUtilityClasses$4 = (classes) => {
	return composeClasses({
		root: ["root"],
		spacer: ["spacer"],
		button: ["button"],
		previousIconButton: ["previousIconButton"],
		nextIconButton: ["nextIconButton"],
		leftArrowIcon: ["leftArrowIcon"],
		rightArrowIcon: ["rightArrowIcon"]
	}, getPickersArrowSwitcherUtilityClass, classes);
};
var PickersArrowSwitcher = /*#__PURE__*/ import_react.forwardRef(function PickersArrowSwitcher(inProps, ref) {
	const isRtl = useRtl();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersArrowSwitcher"
	});
	const { children, className, slots, slotProps, isNextDisabled, isNextHidden, onGoToNext, nextLabel, isPreviousDisabled, isPreviousHidden, onGoToPrevious, previousLabel, labelId, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$4(classesProp);
	const nextProps = {
		isDisabled: isNextDisabled,
		isHidden: isNextHidden,
		goTo: onGoToNext,
		label: nextLabel
	};
	const previousProps = {
		isDisabled: isPreviousDisabled,
		isHidden: isPreviousHidden,
		goTo: onGoToPrevious,
		label: previousLabel
	};
	const PreviousIconButton = slots?.previousIconButton ?? PickersArrowSwitcherButton;
	const previousIconButtonProps = useSlotProps({
		elementType: PreviousIconButton,
		externalSlotProps: slotProps?.previousIconButton,
		additionalProps: {
			size: "medium",
			title: previousProps.label,
			"aria-label": previousProps.label,
			disabled: previousProps.isDisabled,
			edge: "end",
			onClick: previousProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: previousProps.isHidden ?? false }),
		className: clsx(classes.button, classes.previousIconButton)
	});
	const NextIconButton = slots?.nextIconButton ?? PickersArrowSwitcherButton;
	const nextIconButtonProps = useSlotProps({
		elementType: NextIconButton,
		externalSlotProps: slotProps?.nextIconButton,
		additionalProps: {
			size: "medium",
			title: nextProps.label,
			"aria-label": nextProps.label,
			disabled: nextProps.isDisabled,
			edge: "start",
			onClick: nextProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: nextProps.isHidden ?? false }),
		className: clsx(classes.button, classes.nextIconButton)
	});
	const LeftArrowIcon = slots?.leftArrowIcon ?? ArrowLeftIcon;
	const leftArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: LeftArrowIcon,
		externalSlotProps: slotProps?.leftArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.leftArrowIcon
	}), _excluded2$1);
	const RightArrowIcon = slots?.rightArrowIcon ?? ArrowRightIcon;
	const rightArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: RightArrowIcon,
		externalSlotProps: slotProps?.rightArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.rightArrowIcon
	}), _excluded3);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersArrowSwitcherRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PreviousIconButton, _extends({}, previousIconButtonProps, { children: isRtl ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) })),
		children ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Typography, {
			variant: "subtitle1",
			component: "span",
			id: labelId,
			children
		}) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersArrowSwitcherSpacer, {
			className: classes.spacer,
			ownerState
		}),
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(NextIconButton, _extends({}, nextIconButtonProps, { children: isRtl ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) }))
	] }));
});
PickersArrowSwitcher.displayName = "PickersArrowSwitcher";
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/date-helpers-hooks.mjs
function useNextMonthDisabled(month, { disableFuture, maxDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		return !adapter.isAfter(lastEnabledMonth, month);
	}, [
		disableFuture,
		maxDate,
		month,
		adapter,
		timezone
	]);
}
function usePreviousMonthDisabled(month, { disablePast, minDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		return !adapter.isBefore(firstEnabledMonth, adapter.startOfMonth(month));
	}, [
		disablePast,
		minDate,
		month,
		adapter,
		timezone
	]);
}
function useMeridiemMode(date, ampm, onChange, selectionState) {
	const adapter = usePickerAdapter();
	const cleanDate = import_react.useMemo(() => !adapter.isValid(date) ? null : date, [adapter, date]);
	return {
		meridiemMode: getMeridiem(cleanDate, adapter),
		handleMeridiemChange: import_react.useCallback((mode) => {
			onChange(cleanDate == null ? null : convertToMeridiem(cleanDate, mode, Boolean(ampm), adapter), selectionState ?? "partial");
		}, [
			ampm,
			cleanDate,
			onChange,
			selectionState,
			adapter
		])
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickerViewRoot/PickerViewRoot.mjs
var PickerViewRoot = styled("div", {
	slot: "internal",
	shouldForwardProp: void 0
})({
	overflow: "hidden",
	width: 320,
	maxHeight: 336,
	display: "flex",
	flexDirection: "column",
	margin: "0 auto"
});
//#endregion
//#region node_modules/@mui/material/DialogContent/dialogContentClasses.mjs
function getDialogContentUtilityClass(slot) {
	return generateUtilityClass("MuiDialogContent", slot);
}
generateUtilityClasses("MuiDialogContent", ["root", "dividers"]);
//#endregion
//#region node_modules/@mui/material/DialogTitle/dialogTitleClasses.mjs
var dialogTitleClasses = generateUtilityClasses("MuiDialogTitle", ["root"]);
//#endregion
//#region node_modules/@mui/material/DialogContent/DialogContent.mjs
var useUtilityClasses$3 = (ownerState) => {
	const { classes, dividers } = ownerState;
	return composeClasses({ root: ["root", dividers && "dividers"] }, getDialogContentUtilityClass, classes);
};
var DialogContentRoot = styled("div", {
	name: "MuiDialogContent",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.dividers && styles.dividers];
	}
})(memoTheme(({ theme }) => ({
	flex: "1 1 auto",
	WebkitOverflowScrolling: "touch",
	overflowY: "auto",
	padding: "20px 24px",
	variants: [{
		props: ({ ownerState }) => ownerState.dividers,
		style: {
			padding: "16px 24px",
			borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
			borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
		}
	}, {
		props: ({ ownerState }) => !ownerState.dividers,
		style: { [`.${dialogTitleClasses.root} + &`]: { paddingTop: 0 } }
	}]
})));
var DialogContent = /*#__PURE__*/ import_react.forwardRef(function DialogContent(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogContent"
	});
	const { className, dividers = false, ...other } = props;
	const ownerState = {
		...props,
		dividers
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogContentRoot, {
		className: clsx(useUtilityClasses$3(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
DialogContent.propTypes = {
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
	* Display the top and bottom dividers.
	* @default false
	*/
	dividers: import_prop_types.default.bool,
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
//#region node_modules/@mui/utils/getScrollbarSize/getScrollbarSize.mjs
function getScrollbarSize(win = window) {
	const documentWidth = win.document.documentElement.clientWidth;
	return win.innerWidth - documentWidth;
}
//#endregion
//#region node_modules/@mui/material/Modal/ModalManager.mjs
function isOverflowing(container) {
	const doc = ownerDocument(container);
	if (doc.body === container) return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
	return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
	if (hide) element.setAttribute("aria-hidden", "true");
	else element.removeAttribute("aria-hidden");
}
function getPaddingRight(element) {
	return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
	const isForbiddenTagName = [
		"TEMPLATE",
		"SCRIPT",
		"STYLE",
		"LINK",
		"MAP",
		"META",
		"NOSCRIPT",
		"PICTURE",
		"COL",
		"COLGROUP",
		"PARAM",
		"SLOT",
		"SOURCE",
		"TRACK"
	].includes(element.tagName);
	const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
	return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
	const blacklist = [
		mountElement,
		currentElement,
		...elementsToExclude
	];
	[].forEach.call(container.children, (element) => {
		const isNotExcludedElement = !blacklist.includes(element);
		const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
		if (isNotExcludedElement && isNotForbiddenElement) ariaHidden(element, hide);
	});
}
function findIndexOf(items, callback) {
	let idx = -1;
	items.some((item, index) => {
		if (callback(item)) {
			idx = index;
			return true;
		}
		return false;
	});
	return idx;
}
function handleContainer(containerInfo, props) {
	const restoreStyle = [];
	const container = containerInfo.container;
	if (!props.disableScrollLock) {
		if (isOverflowing(container)) {
			const scrollbarSize = getScrollbarSize(ownerWindow(container));
			restoreStyle.push({
				value: container.style.paddingRight,
				property: "padding-right",
				el: container
			});
			container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
			const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
			[].forEach.call(fixedElements, (element) => {
				restoreStyle.push({
					value: element.style.paddingRight,
					property: "padding-right",
					el: element
				});
				element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
			});
		}
		let scrollContainer;
		if (container.parentNode instanceof DocumentFragment) scrollContainer = ownerDocument(container).body;
		else {
			const parent = container.parentElement;
			const containerWindow = ownerWindow(container);
			scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
		}
		restoreStyle.push({
			value: scrollContainer.style.overflow,
			property: "overflow",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowX,
			property: "overflow-x",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowY,
			property: "overflow-y",
			el: scrollContainer
		});
		scrollContainer.style.overflow = "hidden";
	}
	const restore = () => {
		restoreStyle.forEach(({ value, el, property }) => {
			if (value) el.style.setProperty(property, value);
			else el.style.removeProperty(property);
		});
	};
	return restore;
}
function getHiddenSiblings(container) {
	const hiddenSiblings = [];
	[].forEach.call(container.children, (element) => {
		if (element.getAttribute("aria-hidden") === "true") hiddenSiblings.push(element);
	});
	return hiddenSiblings;
}
/**
* @ignore - do not document.
*
* Proper state management for containers and the modals in those containers.
* Simplified, but inspired by react-overlay's ModalManager class.
* Used by the Modal to ensure proper styling of containers.
*/
var ModalManager = class {
	constructor() {
		this.modals = [];
		this.containers = [];
	}
	add(modal, container) {
		let modalIndex = this.modals.indexOf(modal);
		if (modalIndex !== -1) return modalIndex;
		modalIndex = this.modals.length;
		this.modals.push(modal);
		if (modal.modalRef) ariaHidden(modal.modalRef, false);
		const hiddenSiblings = getHiddenSiblings(container);
		ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
		const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
		if (containerIndex !== -1) {
			this.containers[containerIndex].modals.push(modal);
			return modalIndex;
		}
		this.containers.push({
			modals: [modal],
			container,
			restore: null,
			hiddenSiblings
		});
		return modalIndex;
	}
	mount(modal, props) {
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		if (!containerInfo.restore) containerInfo.restore = handleContainer(containerInfo, props);
	}
	remove(modal, ariaHiddenState = true) {
		const modalIndex = this.modals.indexOf(modal);
		if (modalIndex === -1) return modalIndex;
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
		this.modals.splice(modalIndex, 1);
		if (containerInfo.modals.length === 0) {
			if (containerInfo.restore) containerInfo.restore();
			if (modal.modalRef) ariaHidden(modal.modalRef, ariaHiddenState);
			ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
			this.containers.splice(containerIndex, 1);
		} else {
			const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
			if (nextTop.modalRef) ariaHidden(nextTop.modalRef, false);
		}
		return modalIndex;
	}
	isTopModal(modal) {
		return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
	}
};
//#endregion
//#region node_modules/@mui/material/Backdrop/backdropClasses.mjs
function getBackdropUtilityClass(slot) {
	return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
//#endregion
//#region node_modules/@mui/material/Backdrop/Backdrop.mjs
var useUtilityClasses$2 = (ownerState) => {
	const { classes, invisible } = ownerState;
	return composeClasses({ root: ["root", invisible && "invisible"] }, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled("div", {
	name: "MuiBackdrop",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.invisible && styles.invisible];
	}
})({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	WebkitTapHighlightColor: "transparent",
	variants: [{
		props: { invisible: true },
		style: { backgroundColor: "transparent" }
	}]
});
var Backdrop = /*#__PURE__*/ import_react.forwardRef(function Backdrop(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiBackdrop"
	});
	const { children, className, component = "div", invisible = false, open, slotProps = {}, slots = {}, transitionDuration, ...other } = props;
	const ownerState = {
		...props,
		component,
		invisible
	};
	const classes = useUtilityClasses$2(ownerState);
	const externalForwardedProps = {
		component,
		slots,
		slotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: BackdropRoot,
		externalForwardedProps,
		className: clsx(classes.root, className),
		ownerState
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		in: open,
		timeout: transitionDuration,
		...other,
		...transitionProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RootSlot, {
			...rootProps,
			ref,
			children
		})
	});
});
Backdrop.propTypes = {
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
	* If `true`, the backdrop is invisible.
	* It can be used when rendering a popover or a custom select component.
	* @default false
	*/
	invisible: import_prop_types.default.bool,
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* The props used for each slot inside.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
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
	* The duration for the transition, in milliseconds.
	* You may specify a single timeout for all transitions, or individually with an object.
	*/
	transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})])
};
//#endregion
//#region node_modules/@mui/material/Modal/useModal.mjs
function getContainer(container) {
	return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
	return children ? children.props.hasOwnProperty("in") : false;
}
var noop = () => {};
var manager = new ModalManager();
function useModal(parameters) {
	const { container, disableScrollLock = false, closeAfterTransition = false, onTransitionEnter, onTransitionExited, children, onClose, open, rootRef } = parameters;
	const modal = import_react.useRef({});
	const mountNodeRef = import_react.useRef(null);
	const modalRef = import_react.useRef(null);
	const handleRef = useForkRef(modalRef, rootRef);
	const [exited, setExited] = import_react.useState(!open);
	const hasTransition = getHasTransition(children);
	let ariaHiddenProp = true;
	if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) ariaHiddenProp = false;
	const getDoc = () => ownerDocument(mountNodeRef.current);
	const getModal = () => {
		modal.current.modalRef = modalRef.current;
		modal.current.mount = mountNodeRef.current;
		return modal.current;
	};
	const handleMounted = () => {
		manager.mount(getModal(), { disableScrollLock });
		if (modalRef.current) modalRef.current.scrollTop = 0;
	};
	const handleOpen = useEventCallback(() => {
		const resolvedContainer = getContainer(container) || getDoc().body;
		manager.add(getModal(), resolvedContainer);
		if (modalRef.current) handleMounted();
	});
	const isTopModal = () => manager.isTopModal(getModal());
	const handlePortalRef = useEventCallback((node) => {
		mountNodeRef.current = node;
		if (!node) return;
		if (open && isTopModal()) handleMounted();
		else if (modalRef.current) ariaHidden(modalRef.current, ariaHiddenProp);
	});
	const handleClose = import_react.useCallback(() => {
		manager.remove(getModal(), ariaHiddenProp);
	}, [ariaHiddenProp]);
	import_react.useEffect(() => {
		return () => {
			handleClose();
		};
	}, [handleClose]);
	import_react.useEffect(() => {
		if (open) handleOpen();
		else if (!hasTransition || !closeAfterTransition) handleClose();
	}, [
		open,
		handleClose,
		hasTransition,
		closeAfterTransition,
		handleOpen
	]);
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);
		if (event.key !== "Escape" || event.which === 229 || !isTopModal()) return;
		event.stopPropagation();
		if (onClose) onClose(event, "escapeKeyDown");
	};
	const createHandleBackdropClick = (otherHandlers) => (event) => {
		otherHandlers.onClick?.(event);
		if (event.target !== event.currentTarget) return;
		if (onClose) onClose(event, "backdropClick");
	};
	const getRootProps = (otherHandlers = {}) => {
		const propsEventHandlers = extractEventHandlers(parameters);
		delete propsEventHandlers.onTransitionEnter;
		delete propsEventHandlers.onTransitionExited;
		const externalEventHandlers = {
			...propsEventHandlers,
			...otherHandlers
		};
		return {
			role: "presentation",
			...externalEventHandlers,
			onKeyDown: createHandleKeyDown(externalEventHandlers),
			ref: handleRef
		};
	};
	const getBackdropProps = (otherHandlers = {}) => {
		const externalEventHandlers = otherHandlers;
		return {
			"aria-hidden": true,
			...externalEventHandlers,
			onClick: createHandleBackdropClick(externalEventHandlers),
			open
		};
	};
	const getTransitionProps = () => {
		const handleEnter = () => {
			setExited(false);
			if (onTransitionEnter) onTransitionEnter();
		};
		const handleExited = () => {
			setExited(true);
			if (onTransitionExited) onTransitionExited();
			if (closeAfterTransition) handleClose();
		};
		return {
			onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
			onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop)
		};
	};
	return {
		getRootProps,
		getBackdropProps,
		getTransitionProps,
		rootRef: handleRef,
		portalRef: handlePortalRef,
		isTopModal,
		exited,
		hasTransition
	};
}
//#endregion
//#region node_modules/@mui/material/Modal/modalClasses.mjs
function getModalUtilityClass(slot) {
	return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", [
	"root",
	"hidden",
	"backdrop"
]);
//#endregion
//#region node_modules/@mui/material/Modal/Modal.mjs
var useUtilityClasses$1 = (ownerState) => {
	const { open, exited, classes } = ownerState;
	return composeClasses({
		root: ["root", !open && exited && "hidden"],
		backdrop: ["backdrop"]
	}, getModalUtilityClass, classes);
};
var ModalRoot = styled("div", {
	name: "MuiModal",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
	}
})(memoTheme(({ theme }) => ({
	position: "fixed",
	zIndex: (theme.vars || theme).zIndex.modal,
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	variants: [{
		props: ({ ownerState }) => !ownerState.open && ownerState.exited,
		style: { visibility: "hidden" }
	}]
})));
var ModalBackdrop = styled(Backdrop, {
	name: "MuiModal",
	slot: "Backdrop"
})({ zIndex: -1 });
/**
* Modal is a lower-level construct that is leveraged by the following components:
*
* - [Dialog](/material-ui/api/dialog/)
* - [Drawer](/material-ui/api/drawer/)
* - [Menu](/material-ui/api/menu/)
* - [Popover](/material-ui/api/popover/)
*
* If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
* rather than directly using Modal.
*
* This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
*/
var Modal = /*#__PURE__*/ import_react.forwardRef(function Modal(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiModal",
		props: inProps
	});
	const { classes: classesProp, className, closeAfterTransition = false, children, container, component, disableAutoFocus = false, disableEnforceFocus = false, disablePortal = false, disableRestoreFocus = false, disableScrollLock = false, hideBackdrop = false, keepMounted = false, onClose, onTransitionEnter, onTransitionExited, open, slotProps = {}, slots = {}, theme, ...other } = props;
	const propsWithDefaults = {
		...props,
		closeAfterTransition,
		disableAutoFocus,
		disableEnforceFocus,
		disablePortal,
		disableRestoreFocus,
		disableScrollLock,
		hideBackdrop,
		keepMounted
	};
	const { getRootProps, getBackdropProps, getTransitionProps, portalRef, isTopModal, exited, hasTransition } = useModal({
		...propsWithDefaults,
		rootRef: ref
	});
	const ownerState = {
		...propsWithDefaults,
		exited
	};
	const classes = useUtilityClasses$1(ownerState);
	const childProps = {};
	if (children.props.tabIndex === void 0) childProps.tabIndex = "-1";
	if (hasTransition) {
		const { onEnter, onExited } = getTransitionProps();
		childProps.onEnter = onEnter;
		childProps.onExited = onExited;
	}
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		ref,
		elementType: ModalRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		getSlotProps: getRootProps,
		ownerState,
		className: clsx(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
	});
	const [BackdropSlot, backdropProps] = useSlot("backdrop", {
		elementType: ModalBackdrop,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		getSlotProps: (otherHandlers) => {
			return getBackdropProps({
				...otherHandlers,
				onClick: (event) => {
					if (otherHandlers?.onClick) otherHandlers.onClick(event);
				}
			});
		},
		className: classes?.backdrop,
		ownerState
	});
	if (!keepMounted && !open && (!hasTransition || exited)) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Portal, {
		ref: portalRef,
		container,
		disablePortal,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(RootSlot, {
			...rootProps,
			children: [!hideBackdrop ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(BackdropSlot, { ...backdropProps }) : null, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusTrap, {
				disableEnforceFocus,
				disableAutoFocus,
				disableRestoreFocus,
				isEnabled: isTopModal,
				open,
				children: /*#__PURE__*/ import_react.cloneElement(children, childProps)
			})]
		})
	});
});
Modal.propTypes = {
	/**
	* A single child content element.
	*/
	children: elementAcceptingRef.isRequired,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* When set to true the Modal waits until a nested Transition is completed before closing.
	* @default false
	*/
	closeAfterTransition: import_prop_types.default.bool,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* If `true`, the modal will not automatically shift focus to itself when it opens, and
	* replace it to the last focused element when it closes.
	* This also works correctly with any modal children that have the `disableAutoFocus` prop.
	*
	* Generally this should never be set to `true` as it makes the modal less
	* accessible to assistive technologies, like screen readers.
	* @default false
	*/
	disableAutoFocus: import_prop_types.default.bool,
	/**
	* If `true`, the modal will not prevent focus from leaving the modal while open.
	*
	* Generally this should never be set to `true` as it makes the modal less
	* accessible to assistive technologies, like screen readers.
	* @default false
	*/
	disableEnforceFocus: import_prop_types.default.bool,
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool,
	/**
	* If `true`, the modal will not restore focus to previously focused element once
	* modal is hidden or unmounted.
	* @default false
	*/
	disableRestoreFocus: import_prop_types.default.bool,
	/**
	* Disable the scroll lock behavior.
	* @default false
	*/
	disableScrollLock: import_prop_types.default.bool,
	/**
	* If `true`, the backdrop is not rendered.
	* @default false
	*/
	hideBackdrop: import_prop_types.default.bool,
	/**
	* Always keep the children in the DOM.
	* This prop can be useful in SEO situation or
	* when you want to maximize the responsiveness of the Modal.
	* @default false
	*/
	keepMounted: import_prop_types.default.bool,
	/**
	* Callback fired when the component requests to be closed.
	* The `reason` parameter can optionally be used to control the response to `onClose`.
	*
	* @param {object} event The event source of the callback.
	* @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
	*/
	onClose: import_prop_types.default.func,
	/**
	* A function called when a transition enters.
	*/
	onTransitionEnter: import_prop_types.default.func,
	/**
	* A function called when a transition has exited.
	*/
	onTransitionExited: import_prop_types.default.func,
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* The props used for each slot inside the Modal.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside the Modal.
	* Either a string to use a HTML element or a component.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
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
	])
};
//#endregion
//#region node_modules/@mui/material/Dialog/dialogClasses.mjs
function getDialogUtilityClass(slot) {
	return generateUtilityClass("MuiDialog", slot);
}
var dialogClasses = generateUtilityClasses("MuiDialog", [
	"root",
	"backdrop",
	"scrollPaper",
	"scrollBody",
	"container",
	"paper",
	"paperWidthFalse",
	"paperWidthXs",
	"paperWidthSm",
	"paperWidthMd",
	"paperWidthLg",
	"paperWidthXl",
	"paperFullWidth",
	"paperFullScreen"
]);
//#endregion
//#region node_modules/@mui/material/Dialog/DialogContext.mjs
var DialogContext = /*#__PURE__*/ import_react.createContext({});
DialogContext.displayName = "DialogContext";
//#endregion
//#region node_modules/@mui/material/Dialog/Dialog.mjs
var DialogBackdrop = styled(Backdrop, {
	name: "MuiDialog",
	slot: "Backdrop"
})({ zIndex: -1 });
var useUtilityClasses = (ownerState) => {
	const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;
	return composeClasses({
		root: ["root"],
		backdrop: ["backdrop"],
		container: ["container", `scroll${capitalize_default(scroll)}`],
		paper: [
			"paper",
			`paperWidth${capitalize_default(String(maxWidth))}`,
			fullWidth && "paperFullWidth",
			fullScreen && "paperFullScreen"
		]
	}, getDialogUtilityClass, classes);
};
var DialogRoot = styled(Modal, {
	name: "MuiDialog",
	slot: "Root"
})({ "@media print": { position: "absolute !important" } });
var DialogContainer = styled("div", {
	name: "MuiDialog",
	slot: "Container",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.container, styles[`scroll${capitalize_default(ownerState.scroll)}`]];
	}
})({
	height: "100%",
	"@media print": { height: "auto" },
	outline: 0,
	variants: [{
		props: { scroll: "paper" },
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}
	}, {
		props: { scroll: "body" },
		style: {
			overflowY: "auto",
			overflowX: "hidden",
			textAlign: "center",
			"&::after": {
				content: "\"\"",
				display: "inline-block",
				verticalAlign: "middle",
				height: "100%",
				width: "0"
			}
		}
	}]
});
var DialogPaper = styled(Paper, {
	name: "MuiDialog",
	slot: "Paper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.paper,
			styles[`paperWidth${capitalize_default(String(ownerState.maxWidth))}`],
			ownerState.fullWidth && styles.paperFullWidth,
			ownerState.fullScreen && styles.paperFullScreen
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 32,
	position: "relative",
	overflowY: "auto",
	outline: 0,
	"@media print": {
		overflowY: "visible",
		boxShadow: "none"
	},
	variants: [
		{
			props: { scroll: "paper" },
			style: {
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100% - 64px)"
			}
		},
		{
			props: { scroll: "body" },
			style: {
				display: "inline-block",
				verticalAlign: "middle",
				textAlign: "initial"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.maxWidth,
			style: { maxWidth: "calc(100% - 64px)" }
		},
		{
			props: { maxWidth: "xs" },
			style: { maxWidth: theme.breakpoints.unit === "px" ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)` }
		},
		{
			props: {
				maxWidth: "xs",
				scroll: "body"
			},
			style: { [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 64)]: { maxWidth: "calc(100% - 64px)" } }
		},
		...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
			props: { maxWidth },
			style: { maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}` }
		})),
		...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
			props: {
				maxWidth,
				scroll: "body"
			},
			style: { [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 64)]: { maxWidth: "calc(100% - 64px)" } }
		})),
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "calc(100% - 64px)" }
		},
		{
			props: ({ ownerState }) => ownerState.fullScreen,
			style: {
				margin: 0,
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "none",
				borderRadius: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.fullScreen && ownerState.scroll === "body",
			style: {
				margin: 0,
				maxWidth: "100%"
			}
		}
	]
})));
/**
* Dialogs are overlaid modal paper based components with a backdrop.
*/
var Dialog = /*#__PURE__*/ import_react.forwardRef(function Dialog(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialog"
	});
	const theme = useTheme();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { "aria-describedby": ariaDescribedby, "aria-labelledby": ariaLabelledbyProp, "aria-modal": ariaModal = true, children, className, fullScreen = false, fullWidth = false, maxWidth = "sm", onClick, onClose, open, PaperComponent = Paper, role = "dialog", scroll = "paper", slots = {}, slotProps = {}, transitionDuration = defaultTransitionDuration, ...other } = props;
	const ownerState = {
		...props,
		fullScreen,
		fullWidth,
		maxWidth,
		scroll
	};
	const classes = useUtilityClasses(ownerState);
	const backdropClick = import_react.useRef();
	const handleMouseDown = (event) => {
		backdropClick.current = event.target === event.currentTarget;
	};
	const handleBackdropClick = (event) => {
		if (onClick) onClick(event);
		if (!backdropClick.current) return;
		backdropClick.current = null;
		if (onClose) onClose(event, "backdropClick");
	};
	const ariaLabelledby = useId(ariaLabelledbyProp);
	const dialogContextValue = import_react.useMemo(() => {
		return { titleId: ariaLabelledby };
	}, [ariaLabelledby]);
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		elementType: DialogRoot,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.root, className),
		ref
	});
	const [BackdropSlot, backdropSlotProps] = useSlot("backdrop", {
		elementType: DialogBackdrop,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: classes.backdrop
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		elementType: DialogPaper,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: classes.paper,
		additionalProps: {
			elevation: 24,
			role,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
			"aria-modal": ariaModal,
			tabIndex: -1,
			[FOCUSABLE_ATTRIBUTE]: ""
		}
	});
	const [ContainerSlot, containerSlotProps] = useSlot("container", {
		elementType: DialogContainer,
		externalForwardedProps,
		ownerState,
		className: classes.container
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			appear: true,
			in: open,
			timeout: transitionDuration,
			role: "presentation"
		}
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RootSlot, {
		closeAfterTransition: true,
		slots: { backdrop: BackdropSlot },
		slotProps: { backdrop: {
			transitionDuration,
			...backdropSlotProps
		} },
		onClose,
		open,
		onClick: handleBackdropClick,
		...rootSlotProps,
		...other,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ContainerSlot, {
				onMouseDown: handleMouseDown,
				...containerSlotProps,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PaperSlot, {
					as: PaperComponent,
					...paperSlotProps,
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogContext.Provider, {
						value: dialogContextValue,
						children
					})
				})
			})
		})
	});
});
Dialog.propTypes = {
	/**
	* The id(s) of the element(s) that describe the dialog.
	*/
	"aria-describedby": import_prop_types.default.string,
	/**
	* The id(s) of the element(s) that label the dialog.
	*/
	"aria-labelledby": import_prop_types.default.string,
	/**
	* Informs assistive technologies that the element is modal.
	* It's added on the element with role="dialog".
	* @default true
	*/
	"aria-modal": import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["false", "true"]), import_prop_types.default.bool]),
	/**
	* Dialog children, usually the included sub-components.
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
	* If `true`, the dialog is full-screen.
	* @default false
	*/
	fullScreen: import_prop_types.default.bool,
	/**
	* If `true`, the dialog stretches to `maxWidth`.
	*
	* Notice that the dialog width grow is limited by the default margin.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* Determine the max-width of the dialog.
	* The dialog width grows with the size of the screen.
	* Set to `false` to disable `maxWidth`.
	* @default 'sm'
	*/
	maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		false
	]), import_prop_types.default.string]),
	/**
	* @ignore
	*/
	onClick: import_prop_types.default.func,
	/**
	* Callback fired when the component requests to be closed.
	*
	* @param {object} event The event source of the callback.
	* @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
	*/
	onClose: import_prop_types.default.func,
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* The component used to render the body of the dialog.
	* @default Paper
	*/
	PaperComponent: import_prop_types.default.elementType,
	/**
	* The ARIA role for the dialog element.
	* The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
	* See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
	* @default 'dialog'
	*/
	role: import_prop_types.default.oneOf(["alertdialog", "dialog"]),
	/**
	* Determine the container for scrolling the dialog.
	* @default 'paper'
	*/
	scroll: import_prop_types.default.oneOf(["body", "paper"]),
	/**
	* The props used for each slot inside.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		container: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		paper: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	/**
	* The components used for each slot inside.
	* @default {}
	*/
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		container: import_prop_types.default.elementType,
		paper: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
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
	* The duration for the transition, in milliseconds.
	* You may specify a single timeout for all transitions, or individually with an object.
	* @default {
	*   enter: theme.transitions.duration.enteringScreen,
	*   exit: theme.transitions.duration.leavingScreen,
	* }
	*/
	transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/components/PickersModalDialog.mjs
var PickersModalDialogRoot = styled(Dialog, { slot: "internal" })({
	[`& .${dialogClasses.container}`]: { outline: 0 },
	[`& .${dialogClasses.paper}`]: {
		outline: 0,
		minWidth: 320
	}
});
var PickersModalDialogContent = styled(DialogContent, { slot: "internal" })({ "&:first-of-type": { padding: 0 } });
function PickersModalDialog(props) {
	const { children, slots, slotProps } = props;
	const { open } = usePickerContext();
	const { dismissViews, onPopperExited } = usePickerPrivateContext();
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(slots?.dialog ?? PickersModalDialogRoot, _extends({
		open,
		onClose: () => {
			dismissViews();
			onPopperExited?.();
		}
	}, slotProps?.dialog, {
		PaperComponent: slots?.mobilePaper,
		slots: _extends({ transition: slots?.mobileTransition ?? Fade }, slotProps?.dialog?.slots),
		slotProps: _extends({
			transition: slotProps?.mobileTransition,
			paper: slotProps?.mobilePaper
		}, slotProps?.dialog?.slotProps),
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersModalDialogContent, { children })
	}));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/useMobilePicker/useMobilePicker.mjs
/**
* Hook managing all the single-date mobile pickers:
* - MobileDatePicker
* - MobileDateTimePicker
* - MobileTimePicker
*/
var _excluded = ["props", "steps"], _excluded2 = ["ownerState"];
var useMobilePicker = (_ref) => {
	let { props, steps } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded);
	const { slots, slotProps: innerSlotProps, label, inputRef, localeText } = props;
	const { providerProps, renderCurrentView, ownerState } = usePicker(_extends({}, pickerParams, {
		props,
		localeText,
		autoFocusView: true,
		viewContainerRole: "dialog",
		variant: "mobile",
		getStepNavigation: createNonRangePickerStepNavigation({ steps })
	}));
	const labelId = providerProps.privateContextValue.labelId;
	const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
	const Field = slots.field;
	const fieldProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Field,
		externalSlotProps: innerSlotProps?.field,
		externalForwardedProps: extractRootForwardedProps(props),
		additionalProps: _extends({}, isToolbarHidden && { id: labelId }),
		ownerState
	}), _excluded2);
	const Layout = slots.layout ?? PickersLayout;
	let labelledById = labelId;
	if (isToolbarHidden) if (label) labelledById = `${labelId}-label`;
	else labelledById = void 0;
	const slotProps = _extends({}, innerSlotProps, {
		toolbar: _extends({}, innerSlotProps?.toolbar, { titleId: labelId }),
		mobilePaper: _extends({ "aria-labelledby": labelledById }, innerSlotProps?.mobilePaper)
	});
	const renderPicker = () => /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickerProvider, _extends({}, providerProps, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Field, _extends({}, fieldProps, {
		slots: _extends({}, slots, fieldProps.slots),
		slotProps: _extends({}, slotProps, fieldProps.slotProps),
		inputRef
	})), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersModalDialog, {
		slots,
		slotProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Layout, _extends({}, slotProps?.layout, {
			slots,
			slotProps,
			children: renderCurrentView()
		}))
	})] }));
	renderPicker.displayName = "renderPicker";
	return { renderPicker };
};
//#endregion
export { useToolbarOwnerState as $, createSvgIcon as A, useForkRef_default as At, contains_default as B, useId as Bt, List as C, resolveDateFormat as Ct, useEventCallback_default as D, getTransitionStyles as Dt, ButtonBase as E, useMediaQuery as Et, useReduceAnimations as F, ownerDocument as Ft, TransitionGroupContext_default as G, isLayoutSupported as H, generateUtilityClasses as Ht, DEFAULT_DESKTOP_MODE_MEDIA_QUERY as I, useEventCallback as It, useNow as J, useSlotProps as K, arrayIncludes as L, useForkRef as Lt, useControlledValue as M, useDefaultProps as Mt, useViews as N, memoTheme as Nt, unsupportedProp_default as O, getActiveElement_default as Ot, useControlled as P, ownerWindow as Pt, PickersToolbar as Q, getFocusedListItemIndex as R, refType as Rt, useSlot as S, mergeDateAndTime as St, Button as T, resolveComponentProps as Tt, Fade as U, setRef as V, useEnhancedEffect as Vt, useReducedMotion as W, usePickerTranslations as X, extractValidationProps as Y, usePickerAdapter as Z, useField as _, formatMeridiem as _t, useNextMonthDisabled as a, singleItemFieldValueManager as at, PickersLayoutRoot as b, getWeekdays as bt, PickerFieldUI as c, EXPORTED_TIME_VIEWS as ct, ArrowDropDownIcon as d, isInternalTimeView as dt, usePickerPrivateContext as et, CalendarIcon as f, isTimeView as ft, IconButton as g, findClosestEnabledDate as gt, TimeIcon as h, applyDefaultDate as ht, useMeridiemMode as i, Typography as it, pickersLayoutClasses as j, capitalize_default as jt, useId_default as k, activeElement as kt, PickerFieldUIContextProvider as l, convertValueToMeridiem as lt, DateRangeIcon as m, DATE_VIEWS as mt, getScrollbarSize as n, getPickersToolbarUtilityClass as nt, usePreviousMonthDisabled as o, singleItemValueManager as ot, ClockIcon as p, resolveTimeFormat as pt, useDefaultDates as q, PickerViewRoot as r, pickersToolbarClasses as rt, PickersArrowSwitcher as s, SECTION_TYPE_GRANULARITY as st, useMobilePicker as t, usePickerContext as tt, useFieldTextFieldProps as u, createIsAfterIgnoreDatePart as ut, useDesktopPicker as v, getMonthsInYear as vt, ListContext as w, applyDefaultViewProps as wt, usePickerLayout as x, isDatePickerView as xt, PickersLayoutContentWrapper as y, getTodayDate as yt, mergeSx as z, composeClasses as zt };

//# sourceMappingURL=useMobilePicker-CRLhUKKU.js.map