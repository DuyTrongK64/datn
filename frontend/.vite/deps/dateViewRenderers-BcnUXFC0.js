import { r as __toESM } from "./chunk-B-1-B7_t.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-Br2l1Z8p.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D51v3ApR.js";
import { t as _extends } from "./extends-DrH2PCIy.js";
import { C as _objectWithoutPropertiesLoose, S as require_prop_types, h as clsx, i as styled, l as useRtl, m as generateUtilityClass, o as useTheme, p as shouldForwardProp, r as useThemeProps } from "./LocalizationProvider-CyOIGrUO.js";
import { Bt as useId, E as ButtonBase, F as useReduceAnimations, G as TransitionGroupContext_default, Ht as generateUtilityClasses, It as useEventCallback, J as useNow, K as useSlotProps, Lt as useForkRef, M as useControlledValue, N as useViews, P as useControlled, St as mergeDateAndTime, U as Fade, Vt as useEnhancedEffect, X as usePickerTranslations, Z as usePickerAdapter, a as useNextMonthDisabled, at as singleItemFieldValueManager, bt as getWeekdays, d as ArrowDropDownIcon, et as usePickerPrivateContext, g as IconButton, gt as findClosestEnabledDate, ht as applyDefaultDate, it as Typography, o as usePreviousMonthDisabled, ot as singleItemValueManager, q as useDefaultDates, r as PickerViewRoot, s as PickersArrowSwitcher, st as SECTION_TYPE_GRANULARITY, vt as getMonthsInYear, xt as isDatePickerView, zt as composeClasses } from "./useMobilePicker-CRLhUKKU.js";
//#region node_modules/@mui/x-date-pickers/validation/validateDate.mjs
/**
* Validation props used by the Date Picker, Date Field and Date Calendar components.
*/
/**
* Validation props as received by the validateDate method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateDate method.
*/
var validateDate = ({ props, value, timezone, adapter }) => {
	if (value === null) return null;
	const { shouldDisableDate, shouldDisableMonth, shouldDisableYear, disablePast, disableFuture, minDate, maxDate } = props;
	const now = adapter.date(void 0, timezone);
	switch (true) {
		case !adapter.isValid(value): return "invalidDate";
		case Boolean(shouldDisableDate && shouldDisableDate(value)): return "shouldDisableDate";
		case Boolean(shouldDisableMonth && shouldDisableMonth(value)): return "shouldDisableMonth";
		case Boolean(shouldDisableYear && shouldDisableYear(value)): return "shouldDisableYear";
		case Boolean(disableFuture && adapter.isAfterDay(value, now)): return "disableFuture";
		case Boolean(disablePast && adapter.isBeforeDay(value, now)): return "disablePast";
		case Boolean(minDate && adapter.isBeforeDay(value, minDate)): return "minDate";
		case Boolean(maxDate && adapter.isAfterDay(value, maxDate)): return "maxDate";
		default: return null;
	}
};
validateDate.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/x-date-pickers/managers/useDateManager.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_jsx_runtime = require_jsx_runtime();
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDateManager() {
	return import_react.useMemo(() => ({
		valueType: "date",
		validator: validateDate,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateFieldInternalProps,
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
function useApplyDefaultValuesToDateFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToDateValidationProps(internalProps);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? adapter.formats.keyboardDate }), [
		internalProps,
		validationProps,
		adapter
	]);
}
function useApplyDefaultValuesToDateValidationProps(props) {
	const adapter = usePickerAdapter();
	const defaultDates = useDefaultDates();
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false,
		minDate: applyDefaultDate(adapter, props.minDate, defaultDates.minDate),
		maxDate: applyDefaultDate(adapter, props.maxDate, defaultDates.maxDate)
	}), [
		props.minDate,
		props.maxDate,
		props.disableFuture,
		props.disablePast,
		adapter,
		defaultDates
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/useIsDateDisabled.mjs
var useIsDateDisabled = ({ shouldDisableDate, shouldDisableMonth, shouldDisableYear, minDate, maxDate, disableFuture, disablePast, timezone }) => {
	const adapter = usePickerAdapter();
	return import_react.useCallback((day) => validateDate({
		adapter,
		value: day,
		timezone,
		props: {
			shouldDisableDate,
			shouldDisableMonth,
			shouldDisableYear,
			minDate,
			maxDate,
			disableFuture,
			disablePast
		}
	}) !== null, [
		adapter,
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	]);
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/useCalendarState.mjs
var createCalendarStateReducer = (reduceAnimations, adapter) => (state, action) => {
	switch (action.type) {
		case "setVisibleDate": return _extends({}, state, {
			slideDirection: action.direction,
			currentMonth: action.month,
			isMonthSwitchingAnimating: !adapter.isSameMonth(action.month, state.currentMonth) && !reduceAnimations && !action.skipAnimation,
			focusedDay: action.focusedDay
		});
		case "changeMonthTimezone": {
			const newTimezone = action.newTimezone;
			if (adapter.getTimezone(state.currentMonth) === newTimezone) return state;
			let newCurrentMonth = adapter.setTimezone(state.currentMonth, newTimezone);
			if (adapter.getMonth(newCurrentMonth) !== adapter.getMonth(state.currentMonth)) newCurrentMonth = adapter.setMonth(newCurrentMonth, adapter.getMonth(state.currentMonth));
			return _extends({}, state, { currentMonth: newCurrentMonth });
		}
		case "finishMonthSwitchingAnimation": return _extends({}, state, { isMonthSwitchingAnimating: false });
		default: throw new Error("missing support");
	}
};
var useCalendarState = (params) => {
	const { value, referenceDate: referenceDateProp, disableFuture, disablePast, maxDate, minDate, onMonthChange, onYearChange, reduceAnimations, shouldDisableDate, timezone, getCurrentMonthFromVisibleDate } = params;
	const adapter = usePickerAdapter();
	const reducerFn = import_react.useRef(createCalendarStateReducer(Boolean(reduceAnimations), adapter)).current;
	const referenceDate = import_react.useMemo(() => {
		return singleItemValueManager.getInitialReferenceValue({
			value,
			adapter,
			timezone,
			props: params,
			referenceDate: referenceDateProp,
			granularity: SECTION_TYPE_GRANULARITY.day
		});
	}, [referenceDateProp, timezone]);
	const [calendarState, dispatch] = import_react.useReducer(reducerFn, {
		isMonthSwitchingAnimating: false,
		focusedDay: referenceDate,
		currentMonth: adapter.setDate(referenceDate, 1),
		slideDirection: "left"
	});
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	});
	import_react.useEffect(() => {
		dispatch({
			type: "changeMonthTimezone",
			newTimezone: adapter.getTimezone(referenceDate)
		});
	}, [referenceDate, adapter]);
	return {
		referenceDate,
		calendarState,
		setVisibleDate: useEventCallback(({ target, reason }) => {
			if (reason === "cell-interaction" && calendarState.focusedDay != null && adapter.isSameDay(target, calendarState.focusedDay)) return;
			const skipAnimation = reason === "cell-interaction";
			let month;
			let focusedDay;
			if (reason === "cell-interaction") {
				month = getCurrentMonthFromVisibleDate(target, calendarState.currentMonth);
				focusedDay = target;
			} else {
				month = adapter.isSameMonth(target, calendarState.currentMonth) ? calendarState.currentMonth : adapter.startOfMonth(target);
				focusedDay = target;
				if (isDateDisabled(focusedDay)) {
					const startOfMonth = adapter.startOfMonth(target);
					const endOfMonth = adapter.endOfMonth(target);
					focusedDay = findClosestEnabledDate({
						adapter,
						date: focusedDay,
						minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
						maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
						disablePast,
						disableFuture,
						isDateDisabled,
						timezone
					});
				}
			}
			const hasChangedMonth = !adapter.isSameMonth(calendarState.currentMonth, month);
			const hasChangedYear = !adapter.isSameYear(calendarState.currentMonth, month);
			if (hasChangedMonth) onMonthChange?.(month);
			if (hasChangedYear) onYearChange?.(adapter.startOfYear(month));
			dispatch({
				type: "setVisibleDate",
				month,
				direction: adapter.isAfterDay(month, calendarState.currentMonth) ? "left" : "right",
				focusedDay: calendarState.focusedDay != null && focusedDay != null && adapter.isSameDay(focusedDay, calendarState.focusedDay) ? calendarState.focusedDay : focusedDay,
				skipAnimation
			});
		}),
		isDateDisabled,
		onMonthSwitchingAnimationEnd: import_react.useCallback(() => {
			dispatch({ type: "finishMonthSwitchingAnimation" });
		}, [])
	};
};
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, _setPrototypeOf(t, e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
	t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
/**
* Checks if a given element has a CSS class.
* 
* @param element the element
* @param className the CSS class name
*/
function hasClass(element, className) {
	if (element.classList) return !!className && element.classList.contains(className);
	return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
/**
* Adds a CSS class to a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function addClass(element, className) {
	if (element.classList) element.classList.add(className);
	else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
	else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
/**
* Removes a CSS class from a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function removeClass$1(element, className) {
	if (element.classList) element.classList.remove(className);
	else if (typeof element.className === "string") element.className = replaceClassName(element.className, className);
	else element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
}
//#endregion
//#region node_modules/react-transition-group/esm/config.js
var config_default = { disabled: false };
//#endregion
//#region node_modules/react-transition-group/esm/utils/PropTypes.js
var timeoutsShape = import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
	enter: import_prop_types.default.number,
	exit: import_prop_types.default.number,
	appear: import_prop_types.default.number
}).isRequired]);
var classNamesShape = import_prop_types.default.oneOfType([
	import_prop_types.default.string,
	import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string,
		active: import_prop_types.default.string
	}),
	import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		enterDone: import_prop_types.default.string,
		enterActive: import_prop_types.default.string,
		exit: import_prop_types.default.string,
		exitDone: import_prop_types.default.string,
		exitActive: import_prop_types.default.string
	})
]);
//#endregion
//#region node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
	return node.scrollTop;
};
//#endregion
//#region node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
/**
* The Transition component lets you describe a transition from one component
* state to another _over time_ with a simple declarative API. Most commonly
* it's used to animate the mounting and unmounting of a component, but can also
* be used to describe in-place transition states as well.
*
* ---
*
* **Note**: `Transition` is a platform-agnostic base component. If you're using
* transitions in CSS, you'll probably want to use
* [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
* instead. It inherits all the features of `Transition`, but contains
* additional features necessary to play nice with CSS transitions (hence the
* name of the component).
*
* ---
*
* By default the `Transition` component does not alter the behavior of the
* component it renders, it only tracks "enter" and "exit" states for the
* components. It's up to you to give meaning and effect to those states. For
* example we can add styles to a component when it enters or exits:
*
* ```jsx
* import { Transition } from 'react-transition-group';
*
* const duration = 300;
*
* const defaultStyle = {
*   transition: `opacity ${duration}ms ease-in-out`,
*   opacity: 0,
* }
*
* const transitionStyles = {
*   entering: { opacity: 1 },
*   entered:  { opacity: 1 },
*   exiting:  { opacity: 0 },
*   exited:  { opacity: 0 },
* };
*
* const Fade = ({ in: inProp }) => (
*   <Transition in={inProp} timeout={duration}>
*     {state => (
*       <div style={{
*         ...defaultStyle,
*         ...transitionStyles[state]
*       }}>
*         I'm a fade Transition!
*       </div>
*     )}
*   </Transition>
* );
* ```
*
* There are 4 main states a Transition can be in:
*  - `'entering'`
*  - `'entered'`
*  - `'exiting'`
*  - `'exited'`
*
* Transition state is toggled via the `in` prop. When `true` the component
* begins the "Enter" stage. During this stage, the component will shift from
* its current transition state, to `'entering'` for the duration of the
* transition and then to the `'entered'` stage once it's complete. Let's take
* the following example (we'll use the
* [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <Transition in={inProp} timeout={500}>
*         {state => (
*           // ...
*         )}
*       </Transition>
*       <button onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the button is clicked the component will shift to the `'entering'` state
* and stay there for 500ms (the value of `timeout`) before it finally switches
* to `'entered'`.
*
* When `in` is `false` the same thing happens except the state moves from
* `'exiting'` to `'exited'`.
*/
var Transition = /*#__PURE__*/ function(_React$Component) {
	_inheritsLoose(Transition, _React$Component);
	function Transition(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		var parentGroup = context;
		var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
		var initialStatus;
		_this.appearStatus = null;
		if (props.in) if (appear) {
			initialStatus = EXITED;
			_this.appearStatus = ENTERING;
		} else initialStatus = ENTERED;
		else if (props.unmountOnExit || props.mountOnEnter) initialStatus = UNMOUNTED;
		else initialStatus = EXITED;
		_this.state = { status: initialStatus };
		_this.nextCallback = null;
		return _this;
	}
	Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
		if (_ref.in && prevState.status === "unmounted") return { status: EXITED };
		return null;
	};
	var _proto = Transition.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	};
	_proto.componentDidUpdate = function componentDidUpdate(prevProps) {
		var nextStatus = null;
		if (prevProps !== this.props) {
			var status = this.state.status;
			if (this.props.in) {
				if (status !== "entering" && status !== "entered") nextStatus = ENTERING;
			} else if (status === "entering" || status === "entered") nextStatus = EXITING;
		}
		this.updateStatus(false, nextStatus);
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.cancelNextCallback();
	};
	_proto.getTimeouts = function getTimeouts() {
		var timeout = this.props.timeout;
		var exit = enter = appear = timeout, enter, appear;
		if (timeout != null && typeof timeout !== "number") {
			exit = timeout.exit;
			enter = timeout.enter;
			appear = timeout.appear !== void 0 ? timeout.appear : enter;
		}
		return {
			exit,
			enter,
			appear
		};
	};
	_proto.updateStatus = function updateStatus(mounting, nextStatus) {
		if (mounting === void 0) mounting = false;
		if (nextStatus !== null) {
			this.cancelNextCallback();
			if (nextStatus === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
					if (node) forceReflow(node);
				}
				this.performEnter(mounting);
			} else this.performExit();
		} else if (this.props.unmountOnExit && this.state.status === "exited") this.setState({ status: UNMOUNTED });
	};
	_proto.performEnter = function performEnter(mounting) {
		var _this2 = this;
		var enter = this.props.enter;
		var appearing = this.context ? this.context.isMounting : mounting;
		var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
		var timeouts = this.getTimeouts();
		var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		if (!mounting && !enter || config_default.disabled) {
			this.safeSetState({ status: ENTERED }, function() {
				_this2.props.onEntered(maybeNode);
			});
			return;
		}
		this.props.onEnter(maybeNode, maybeAppearing);
		this.safeSetState({ status: ENTERING }, function() {
			_this2.props.onEntering(maybeNode, maybeAppearing);
			_this2.onTransitionEnd(enterTimeout, function() {
				_this2.safeSetState({ status: ENTERED }, function() {
					_this2.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	};
	_proto.performExit = function performExit() {
		var _this3 = this;
		var exit = this.props.exit;
		var timeouts = this.getTimeouts();
		var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
		if (!exit || config_default.disabled) {
			this.safeSetState({ status: EXITED }, function() {
				_this3.props.onExited(maybeNode);
			});
			return;
		}
		this.props.onExit(maybeNode);
		this.safeSetState({ status: EXITING }, function() {
			_this3.props.onExiting(maybeNode);
			_this3.onTransitionEnd(timeouts.exit, function() {
				_this3.safeSetState({ status: EXITED }, function() {
					_this3.props.onExited(maybeNode);
				});
			});
		});
	};
	_proto.cancelNextCallback = function cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	};
	_proto.safeSetState = function safeSetState(nextState, callback) {
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	};
	_proto.setNextCallback = function setNextCallback(callback) {
		var _this4 = this;
		var active = true;
		this.nextCallback = function(event) {
			if (active) {
				active = false;
				_this4.nextCallback = null;
				callback(event);
			}
		};
		this.nextCallback.cancel = function() {
			active = false;
		};
		return this.nextCallback;
	};
	_proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
		var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
		if (!node || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}
		if (timeout != null) setTimeout(this.nextCallback, timeout);
	};
	_proto.render = function render() {
		var status = this.state.status;
		if (status === "unmounted") return null;
		var _this$props = this.props, children = _this$props.children;
		_this$props.in;
		_this$props.mountOnEnter;
		_this$props.unmountOnExit;
		_this$props.appear;
		_this$props.enter;
		_this$props.exit;
		_this$props.timeout;
		_this$props.addEndListener;
		_this$props.onEnter;
		_this$props.onEntering;
		_this$props.onEntered;
		_this$props.onExit;
		_this$props.onExiting;
		_this$props.onExited;
		_this$props.nodeRef;
		var childProps = _objectWithoutPropertiesLoose(_this$props, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /*#__PURE__*/ import_react.createElement(TransitionGroupContext_default.Provider, { value: null }, typeof children === "function" ? children(status, childProps) : import_react.cloneElement(import_react.Children.only(children), childProps));
	};
	return Transition;
}(import_react.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = {
	/**
	* A React reference to DOM element that need to transition:
	* https://stackoverflow.com/a/51127130/4671932
	*
	*   - When `nodeRef` prop is used, `node` is not passed to callback functions
	*      (e.g. `onEnter`) because user already has direct access to the node.
	*   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
	*     `nodeRef` need to be provided to `Transition` with changed `key` prop
	*     (see
	*     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
	*/
	nodeRef: import_prop_types.default.shape({ current: typeof Element === "undefined" ? import_prop_types.default.any : function(propValue, key, componentName, location, propFullName, secret) {
		var value = propValue[key];
		return import_prop_types.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
	} }),
	/**
	* A `function` child can be used instead of a React element. This function is
	* called with the current transition status (`'entering'`, `'entered'`,
	* `'exiting'`, `'exited'`), which can be used to apply context
	* specific props to a component.
	*
	* ```jsx
	* <Transition in={this.state.in} timeout={150}>
	*   {state => (
	*     <MyComponent className={`fade fade-${state}`} />
	*   )}
	* </Transition>
	* ```
	*/
	children: import_prop_types.default.oneOfType([import_prop_types.default.func.isRequired, import_prop_types.default.element.isRequired]).isRequired,
	/**
	* Show the component; triggers the enter or exit states
	*/
	in: import_prop_types.default.bool,
	/**
	* By default the child component is mounted immediately along with
	* the parent `Transition` component. If you want to "lazy mount" the component on the
	* first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	* mounted, even on "exited", unless you also specify `unmountOnExit`.
	*/
	mountOnEnter: import_prop_types.default.bool,
	/**
	* By default the child component stays mounted after it reaches the `'exited'` state.
	* Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	*/
	unmountOnExit: import_prop_types.default.bool,
	/**
	* By default the child component does not perform the enter transition when
	* it first mounts, regardless of the value of `in`. If you want this
	* behavior, set both `appear` and `in` to `true`.
	*
	* > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
	* > only adds an additional enter transition. However, in the
	* > `<CSSTransition>` component that first enter transition does result in
	* > additional `.appear-*` classes, that way you can choose to style it
	* > differently.
	*/
	appear: import_prop_types.default.bool,
	/**
	* Enable or disable enter transitions.
	*/
	enter: import_prop_types.default.bool,
	/**
	* Enable or disable exit transitions.
	*/
	exit: import_prop_types.default.bool,
	/**
	* The duration of the transition, in milliseconds.
	* Required unless `addEndListener` is provided.
	*
	* You may specify a single timeout for all transitions:
	*
	* ```jsx
	* timeout={500}
	* ```
	*
	* or individually:
	*
	* ```jsx
	* timeout={{
	*  appear: 500,
	*  enter: 300,
	*  exit: 500,
	* }}
	* ```
	*
	* - `appear` defaults to the value of `enter`
	* - `enter` defaults to `0`
	* - `exit` defaults to `0`
	*
	* @type {number | { enter?: number, exit?: number, appear?: number }}
	*/
	timeout: function timeout(props) {
		var pt = timeoutsShape;
		if (!props.addEndListener) pt = pt.isRequired;
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		return pt.apply(void 0, [props].concat(args));
	},
	/**
	* Add a custom transition end trigger. Called with the transitioning
	* DOM node and a `done` callback. Allows for more fine grained transition end
	* logic. Timeouts are still used as a fallback if provided.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* ```jsx
	* addEndListener={(node, done) => {
	*   // use the css transitionend event to mark the finish of a transition
	*   node.addEventListener('transitionend', done, false);
	* }}
	* ```
	*/
	addEndListener: import_prop_types.default.func,
	/**
	* Callback fired before the "entering" status is applied. An extra parameter
	* `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool) -> void
	*/
	onEnter: import_prop_types.default.func,
	/**
	* Callback fired after the "entering" status is applied. An extra parameter
	* `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool)
	*/
	onEntering: import_prop_types.default.func,
	/**
	* Callback fired after the "entered" status is applied. An extra parameter
	* `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool) -> void
	*/
	onEntered: import_prop_types.default.func,
	/**
	* Callback fired before the "exiting" status is applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement) -> void
	*/
	onExit: import_prop_types.default.func,
	/**
	* Callback fired after the "exiting" status is applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement) -> void
	*/
	onExiting: import_prop_types.default.func,
	/**
	* Callback fired after the "exited" status is applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed
	*
	* @type Function(node: HtmlElement) -> void
	*/
	onExited: import_prop_types.default.func
};
function noop$1() {}
Transition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,
	onEnter: noop$1,
	onEntering: noop$1,
	onEntered: noop$1,
	onExit: noop$1,
	onExiting: noop$1,
	onExited: noop$1
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
//#endregion
//#region node_modules/react-transition-group/esm/CSSTransition.js
var _addClass = function addClass$1(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return addClass(node, c);
	});
};
var removeClass = function removeClass(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return removeClass$1(node, c);
	});
};
/**
* A transition component inspired by the excellent
* [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
* use it if you're using CSS transitions or animations. It's built upon the
* [`Transition`](https://reactcommunity.org/react-transition-group/transition)
* component, so it inherits all of its props.
*
* `CSSTransition` applies a pair of class names during the `appear`, `enter`,
* and `exit` states of the transition. The first class is applied and then a
* second `*-active` class in order to activate the CSS transition. After the
* transition, matching `*-done` class names are applied to persist the
* transition state.
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <CSSTransition in={inProp} timeout={200} classNames="my-node">
*         <div>
*           {"I'll receive my-node-* classes"}
*         </div>
*       </CSSTransition>
*       <button type="button" onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the `in` prop is set to `true`, the child component will first receive
* the class `example-enter`, then the `example-enter-active` will be added in
* the next tick. `CSSTransition` [forces a
* reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
* between before adding the `example-enter-active`. This is an important trick
* because it allows us to transition between `example-enter` and
* `example-enter-active` even though they were added immediately one after
* another. Most notably, this is what makes it possible for us to animate
* _appearance_.
*
* ```css
* .my-node-enter {
*   opacity: 0;
* }
* .my-node-enter-active {
*   opacity: 1;
*   transition: opacity 200ms;
* }
* .my-node-exit {
*   opacity: 1;
* }
* .my-node-exit-active {
*   opacity: 0;
*   transition: opacity 200ms;
* }
* ```
*
* `*-active` classes represent which styles you want to animate **to**, so it's
* important to add `transition` declaration only to them, otherwise transitions
* might not behave as intended! This might not be obvious when the transitions
* are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
* the example above (minus `transition`), but it becomes apparent in more
* complex transitions.
*
* **Note**: If you're using the
* [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
* prop, make sure to define styles for `.appear-*` classes as well.
*/
var CSSTransition = /*#__PURE__*/ function(_React$Component) {
	_inheritsLoose(CSSTransition, _React$Component);
	function CSSTransition() {
		var _this;
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
		_this.appliedClasses = {
			appear: {},
			enter: {},
			exit: {}
		};
		_this.onEnter = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
			_this.removeClasses(node, "exit");
			_this.addClass(node, appearing ? "appear" : "enter", "base");
			if (_this.props.onEnter) _this.props.onEnter(maybeNode, maybeAppearing);
		};
		_this.onEntering = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0];
			var type = _this$resolveArgument2[1] ? "appear" : "enter";
			_this.addClass(node, type, "active");
			if (_this.props.onEntering) _this.props.onEntering(maybeNode, maybeAppearing);
		};
		_this.onEntered = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0];
			var type = _this$resolveArgument3[1] ? "appear" : "enter";
			_this.removeClasses(node, type);
			_this.addClass(node, type, "done");
			if (_this.props.onEntered) _this.props.onEntered(maybeNode, maybeAppearing);
		};
		_this.onExit = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "appear");
			_this.removeClasses(node, "enter");
			_this.addClass(node, "exit", "base");
			if (_this.props.onExit) _this.props.onExit(maybeNode);
		};
		_this.onExiting = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.addClass(node, "exit", "active");
			if (_this.props.onExiting) _this.props.onExiting(maybeNode);
		};
		_this.onExited = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "exit");
			_this.addClass(node, "exit", "done");
			if (_this.props.onExited) _this.props.onExited(maybeNode);
		};
		_this.resolveArguments = function(maybeNode, maybeAppearing) {
			return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
		};
		_this.getClassNames = function(type) {
			var classNames = _this.props.classNames;
			var isStringClassNames = typeof classNames === "string";
			var prefix = isStringClassNames && classNames ? classNames + "-" : "";
			var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
			return {
				baseClassName,
				activeClassName: isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"],
				doneClassName: isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"]
			};
		};
		return _this;
	}
	var _proto = CSSTransition.prototype;
	_proto.addClass = function addClass(node, type, phase) {
		var className = this.getClassNames(type)[phase + "ClassName"];
		var doneClassName = this.getClassNames("enter").doneClassName;
		if (type === "appear" && phase === "done" && doneClassName) className += " " + doneClassName;
		if (phase === "active") {
			if (node) forceReflow(node);
		}
		if (className) {
			this.appliedClasses[type][phase] = className;
			_addClass(node, className);
		}
	};
	_proto.removeClasses = function removeClasses(node, type) {
		var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
		this.appliedClasses[type] = {};
		if (baseClassName) removeClass(node, baseClassName);
		if (activeClassName) removeClass(node, activeClassName);
		if (doneClassName) removeClass(node, doneClassName);
	};
	_proto.render = function render() {
		var _this$props = this.props;
		_this$props.classNames;
		var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
		return /*#__PURE__*/ import_react.createElement(Transition, _extends({}, props, {
			onEnter: this.onEnter,
			onEntered: this.onEntered,
			onEntering: this.onEntering,
			onExit: this.onExit,
			onExiting: this.onExiting,
			onExited: this.onExited
		}));
	};
	return CSSTransition;
}(import_react.Component);
CSSTransition.defaultProps = { classNames: "" };
CSSTransition.propTypes = _extends({}, Transition.propTypes, {
	/**
	* The animation classNames applied to the component as it appears, enters,
	* exits or has finished the transition. A single name can be provided, which
	* will be suffixed for each stage, e.g. `classNames="fade"` applies:
	*
	* - `fade-appear`, `fade-appear-active`, `fade-appear-done`
	* - `fade-enter`, `fade-enter-active`, `fade-enter-done`
	* - `fade-exit`, `fade-exit-active`, `fade-exit-done`
	*
	* A few details to note about how these classes are applied:
	*
	* 1. They are _joined_ with the ones that are already defined on the child
	*    component, so if you want to add some base styles, you can use
	*    `className` without worrying that it will be overridden.
	*
	* 2. If the transition component mounts with `in={false}`, no classes are
	*    applied yet. You might be expecting `*-exit-done`, but if you think
	*    about it, a component cannot finish exiting if it hasn't entered yet.
	*
	* 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
	*    allows you to define different behavior for when appearing is done and
	*    when regular entering is done, using selectors like
	*    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
	*    an epic entrance animation when element first appears in the DOM using
	*    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
	*    simply use `fade-enter-done` for defining both cases.
	*
	* Each individual classNames can also be specified independently like:
	*
	* ```js
	* classNames={{
	*  appear: 'my-appear',
	*  appearActive: 'my-active-appear',
	*  appearDone: 'my-done-appear',
	*  enter: 'my-enter',
	*  enterActive: 'my-active-enter',
	*  enterDone: 'my-done-enter',
	*  exit: 'my-exit',
	*  exitActive: 'my-active-exit',
	*  exitDone: 'my-done-exit',
	* }}
	* ```
	*
	* If you want to set these classes using CSS Modules:
	*
	* ```js
	* import styles from './styles.css';
	* ```
	*
	* you might want to use camelCase in your CSS file, that way could simply
	* spread them instead of listing them one by one:
	*
	* ```js
	* classNames={{ ...styles }}
	* ```
	*
	* @type {string | {
	*  appear?: string,
	*  appearActive?: string,
	*  appearDone?: string,
	*  enter?: string,
	*  enterActive?: string,
	*  enterDone?: string,
	*  exit?: string,
	*  exitActive?: string,
	*  exitDone?: string,
	* }}
	*/
	classNames: classNamesShape,
	/**
	* A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
	* applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool)
	*/
	onEnter: import_prop_types.default.func,
	/**
	* A `<Transition>` callback fired immediately after the 'enter-active' or
	* 'appear-active' class is applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool)
	*/
	onEntering: import_prop_types.default.func,
	/**
	* A `<Transition>` callback fired immediately after the 'enter' or
	* 'appear' classes are **removed** and the `done` class is added to the DOM node.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed.
	*
	* @type Function(node: HtmlElement, isAppearing: bool)
	*/
	onEntered: import_prop_types.default.func,
	/**
	* A `<Transition>` callback fired immediately after the 'exit' class is
	* applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed
	*
	* @type Function(node: HtmlElement)
	*/
	onExit: import_prop_types.default.func,
	/**
	* A `<Transition>` callback fired immediately after the 'exit-active' is applied.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed
	*
	* @type Function(node: HtmlElement)
	*/
	onExiting: import_prop_types.default.func,
	/**
	* A `<Transition>` callback fired immediately after the 'exit' classes
	* are **removed** and the `exit-done` class is added to the DOM node.
	*
	* **Note**: when `nodeRef` prop is passed, `node` is not passed
	*
	* @type Function(node: HtmlElement)
	*/
	onExited: import_prop_types.default.func
});
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/react-transition-group/esm/utils/ChildMapping.js
/**
* Given `this.props.children`, return an object mapping key to child.
*
* @param {*} children `this.props.children`
* @return {object} Mapping of key to child
*/
function getChildMapping(children, mapFn) {
	var mapper = function mapper(child) {
		return mapFn && (0, import_react.isValidElement)(child) ? mapFn(child) : child;
	};
	var result = Object.create(null);
	if (children) import_react.Children.map(children, function(c) {
		return c;
	}).forEach(function(child) {
		result[child.key] = mapper(child);
	});
	return result;
}
/**
* When you're adding or removing children some may be added or removed in the
* same render pass. We want to show *both* since we want to simultaneously
* animate elements in and out. This function takes a previous set of keys
* and a new set of keys and merges them with its best guess of the correct
* ordering. In the future we may expose some of the utilities in
* ReactMultiChild to make this easy, but for now React itself does not
* directly have this concept of the union of prevChildren and nextChildren
* so we implement it here.
*
* @param {object} prev prev children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @param {object} next next children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @return {object} a key set that contains all keys in `prev` and all keys
* in `next` in a reasonable order.
*/
function mergeChildMappings(prev, next) {
	prev = prev || {};
	next = next || {};
	function getValueForKey(key) {
		return key in next ? next[key] : prev[key];
	}
	var nextKeysPending = Object.create(null);
	var pendingKeys = [];
	for (var prevKey in prev) if (prevKey in next) {
		if (pendingKeys.length) {
			nextKeysPending[prevKey] = pendingKeys;
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	var i;
	var childMapping = {};
	for (var nextKey in next) {
		if (nextKeysPending[nextKey]) for (i = 0; i < nextKeysPending[nextKey].length; i++) {
			var pendingNextKey = nextKeysPending[nextKey][i];
			childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}
	for (i = 0; i < pendingKeys.length; i++) childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	return childMapping;
}
function getProp(child, prop, props) {
	return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
	return getChildMapping(props.children, function(child) {
		return (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			appear: getProp(child, "appear", props),
			enter: getProp(child, "enter", props),
			exit: getProp(child, "exit", props)
		});
	});
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	var nextChildMapping = getChildMapping(nextProps.children);
	var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	Object.keys(children).forEach(function(key) {
		var child = children[key];
		if (!(0, import_react.isValidElement)(child)) return;
		var hasPrev = key in prevChildMapping;
		var hasNext = key in nextChildMapping;
		var prevChild = prevChildMapping[key];
		var isLeaving = (0, import_react.isValidElement)(prevChild) && !prevChild.props.in;
		if (hasNext && (!hasPrev || isLeaving)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
		else if (!hasNext && hasPrev && !isLeaving) children[key] = (0, import_react.cloneElement)(child, { in: false });
		else if (hasNext && hasPrev && (0, import_react.isValidElement)(prevChild)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: prevChild.props.in,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
	});
	return children;
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
	return Object.keys(obj).map(function(k) {
		return obj[k];
	});
};
var defaultProps = {
	component: "div",
	childFactory: function childFactory(child) {
		return child;
	}
};
/**
* The `<TransitionGroup>` component manages a set of transition components
* (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
* components, `<TransitionGroup>` is a state machine for managing the mounting
* and unmounting of components over time.
*
* Consider the example below. As items are removed or added to the TodoList the
* `in` prop is toggled automatically by the `<TransitionGroup>`.
*
* Note that `<TransitionGroup>`  does not define any animation behavior!
* Exactly _how_ a list item animates is up to the individual transition
* component. This means you can mix and match animations across different list
* items.
*/
var TransitionGroup = /*#__PURE__*/ function(_React$Component) {
	_inheritsLoose(TransitionGroup, _React$Component);
	function TransitionGroup(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		_this.state = {
			contextValue: { isMounting: true },
			handleExited: _this.handleExited.bind(_assertThisInitialized(_this)),
			firstRender: true
		};
		return _this;
	}
	var _proto = TransitionGroup.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.mounted = true;
		this.setState({ contextValue: { isMounting: false } });
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.mounted = false;
	};
	TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
		var prevChildMapping = _ref.children, handleExited = _ref.handleExited;
		return {
			children: _ref.firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
			firstRender: false
		};
	};
	_proto.handleExited = function handleExited(child, node) {
		var currentChildMapping = getChildMapping(this.props.children);
		if (child.key in currentChildMapping) return;
		if (child.props.onExited) child.props.onExited(node);
		if (this.mounted) this.setState(function(state) {
			var children = _extends({}, state.children);
			delete children[child.key];
			return { children };
		});
	};
	_proto.render = function render() {
		var _this$props = this.props, Component = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
		var contextValue = this.state.contextValue;
		var children = values(this.state.children).map(childFactory);
		delete props.appear;
		delete props.enter;
		delete props.exit;
		if (Component === null) return /*#__PURE__*/ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, children);
		return /*#__PURE__*/ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, /*#__PURE__*/ import_react.createElement(Component, props, children));
	};
	return TransitionGroup;
}(import_react.Component);
TransitionGroup.propTypes = {
	/**
	* `<TransitionGroup>` renders a `<div>` by default. You can change this
	* behavior by providing a `component` prop.
	* If you use React v16+ and would like to avoid a wrapping `<div>` element
	* you can pass in `component={null}`. This is useful if the wrapping div
	* borks your css styles.
	*/
	component: import_prop_types.default.any,
	/**
	* A set of `<Transition>` components, that are toggled `in` and out as they
	* leave. the `<TransitionGroup>` will inject specific transition props, so
	* remember to spread them through if you are wrapping the `<Transition>` as
	* with our `<Fade>` example.
	*
	* While this component is meant for multiple `Transition` or `CSSTransition`
	* children, sometimes you may want to have a single transition child with
	* content that you want to be transitioned out and in when you change it
	* (e.g. routes, images etc.) In that case you can change the `key` prop of
	* the transition child as you change its content, this will cause
	* `TransitionGroup` to transition the child out and back in.
	*/
	children: import_prop_types.default.node,
	/**
	* A convenience prop that enables or disables appear animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	appear: import_prop_types.default.bool,
	/**
	* A convenience prop that enables or disables enter animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	enter: import_prop_types.default.bool,
	/**
	* A convenience prop that enables or disables exit animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	exit: import_prop_types.default.bool,
	/**
	* You may need to apply reactive updates to a child as it is exiting.
	* This is generally done by using `cloneElement` however in the case of an exiting
	* child the element has already been removed and not accessible to the consumer.
	*
	* If you do need to update a child as it leaves you can provide a `childFactory`
	* to wrap every child, even the ones that are leaving.
	*
	* @type Function(child: ReactElement) -> ReactElement
	*/
	childFactory: import_prop_types.default.func
};
TransitionGroup.defaultProps = defaultProps;
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/pickersFadeTransitionGroupClasses.mjs
var getPickersFadeTransitionGroupUtilityClass = (slot) => generateUtilityClass("MuiPickersFadeTransitionGroup", slot);
generateUtilityClasses("MuiPickersFadeTransitionGroup", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/PickersFadeTransitionGroup.mjs
var _excluded$9 = ["children"];
var useUtilityClasses$9 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersFadeTransitionGroupUtilityClass, classes);
};
var PickersFadeTransitionGroupRoot = styled(TransitionGroup, {
	name: "MuiPickersFadeTransitionGroup",
	slot: "Root"
})({
	display: "block",
	position: "relative"
});
/**
* @ignore - do not document.
*/
function PickersFadeTransitionGroup(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersFadeTransitionGroup"
	});
	const { className, reduceAnimations, transKey, classes: classesProp } = props;
	const { children } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
	const classes = useUtilityClasses$9(classesProp);
	const theme = useTheme();
	if (reduceAnimations) return children;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroupRoot, {
		className: clsx(classes.root, className),
		ownerState: other,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Fade, {
			appear: false,
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: {
				appear: theme.transitions.duration.enteringScreen,
				enter: theme.transitions.duration.enteringScreen,
				exit: 0
			},
			children
		}, transKey)
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/PickerDay/pickerDayClasses.mjs
function getPickerDayUtilityClass(slot) {
	return generateUtilityClass("MuiPickerDay", slot);
}
var pickerDayClasses = generateUtilityClasses("MuiPickerDay", [
	"root",
	"dayOutsideMonth",
	"today",
	"selected",
	"disabled",
	"fillerCell"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/internals/hooks/usePickerDayOwnerState.mjs
function usePickerDayOwnerState(parameters) {
	const { disabled, selected, today, outsideCurrentMonth, day, disableHighlightToday, showDaysOutsideCurrentMonth } = parameters;
	const adapter = usePickerAdapter();
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, {
		day,
		isDaySelected: selected ?? false,
		isDayDisabled: disabled ?? false,
		isDayCurrent: today ?? false,
		isDayOutsideMonth: outsideCurrentMonth ?? false,
		isDayStartOfWeek: adapter.isSameDay(day, adapter.startOfWeek(day)),
		isDayEndOfWeek: adapter.isSameDay(day, adapter.endOfWeek(day)),
		disableHighlightToday: disableHighlightToday ?? false,
		showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth ?? false
	}), [
		adapter,
		pickerOwnerState,
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/PickerDay/PickerDay.mjs
var _excluded$8 = [
	"autoFocus",
	"className",
	"classes",
	"hidden",
	"isAnimating",
	"onClick",
	"onDaySelect",
	"onFocus",
	"onBlur",
	"onKeyDown",
	"onMouseDown",
	"onMouseEnter",
	"children",
	"isFirstVisibleCell",
	"isLastVisibleCell",
	"day",
	"selected",
	"disabled",
	"today",
	"outsideCurrentMonth",
	"disableHighlightToday",
	"showDaysOutsideCurrentMonth",
	"isVisuallySelected",
	"isDayFillerCell"
];
var useUtilityClasses$8 = (ownerState, classes) => {
	const { isDaySelected, disableHighlightToday, isDayCurrent, isDayDisabled, isDayOutsideMonth, isDayFillerCell } = ownerState;
	return composeClasses({ root: [
		"root",
		isDaySelected && !isDayFillerCell && "selected",
		isDayDisabled && "disabled",
		!disableHighlightToday && isDayCurrent && !isDaySelected && !isDayFillerCell && "today",
		isDayOutsideMonth && "dayOutsideMonth",
		isDayFillerCell && "fillerCell"
	] }, getPickerDayUtilityClass, classes);
};
var PickerDayRoot = styled(ButtonBase, {
	name: "MuiPickerDay",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disableHighlightToday && ownerState.isDayCurrent && styles.today,
			ownerState.isDayOutsideMonth && styles.dayOutsideMonth,
			ownerState.isDayFillerCell && styles.fillerCell
		];
	}
})(({ theme }) => _extends({
	"--PickerDay-horizontalMargin": `2px`,
	"--PickerDay-size": `36px`
}, theme.typography.caption, {
	lineHeight: 1,
	display: "flex",
	width: "var(--PickerDay-size)",
	height: "var(--PickerDay-size)",
	borderRadius: "calc(var(--PickerDay-size) / 2)",
	padding: 0,
	backgroundColor: "transparent",
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.short }),
	color: (theme.vars || theme).palette.text.primary,
	"@media (pointer: fine)": { "&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.hoverOpacity) } },
	"&:focus": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.focusOpacity) },
	marginLeft: "var(--PickerDay-horizontalMargin)",
	marginRight: "var(--PickerDay-horizontalMargin)",
	variants: [
		{
			props: { isDaySelected: true },
			style: {
				color: (theme.vars || theme).palette.primary.contrastText,
				backgroundColor: (theme.vars || theme).palette.primary.main,
				fontWeight: theme.typography.fontWeightMedium,
				"&:focus, &:hover": {
					willChange: "background-color",
					backgroundColor: (theme.vars || theme).palette.primary.dark
				},
				[`&.${pickerDayClasses.disabled}`]: { opacity: .6 }
			}
		},
		{
			props: { isDayDisabled: true },
			style: { color: (theme.vars || theme).palette.text.disabled }
		},
		{
			props: { isDayFillerCell: true },
			style: {
				opacity: 0,
				pointerEvents: "none"
			}
		},
		{
			props: { isDayOutsideMonth: true },
			style: { color: (theme.vars || theme).palette.text.secondary }
		},
		{
			props: {
				isDayCurrent: true,
				isDaySelected: false
			},
			style: {
				outline: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
				outlineOffset: -1
			}
		}
	]
}));
var noop = () => {};
var PickerDayRaw = /*#__PURE__*/ import_react.forwardRef(function PickerDay(inProps, forwardedRef) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickerDay"
	});
	const adapter = usePickerAdapter();
	const { autoFocus = false, className, classes: classesProp, isAnimating, onClick, onDaySelect, onFocus = noop, onBlur = noop, onKeyDown = noop, onMouseDown = noop, onMouseEnter = noop, children, day, selected, disabled, today, outsideCurrentMonth, disableHighlightToday, showDaysOutsideCurrentMonth, isDayFillerCell: isDayFillerCellProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
	const ownerState = _extends({}, usePickerDayOwnerState({
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	}), { isDayFillerCell: isDayFillerCellProp ?? (outsideCurrentMonth && !showDaysOutsideCurrentMonth) });
	const classes = useUtilityClasses$8(ownerState, classesProp);
	const ref = import_react.useRef(null);
	const handleRef = useForkRef(ref, forwardedRef);
	useEnhancedEffect(() => {
		if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) ref.current.focus();
	}, [
		autoFocus,
		disabled,
		isAnimating,
		outsideCurrentMonth
	]);
	const handleMouseDown = (event) => {
		onMouseDown(event);
		if (outsideCurrentMonth) event.preventDefault();
	};
	const handleClick = (event) => {
		event.defaultMuiPrevented = true;
		if (!disabled) onDaySelect(day);
		if (outsideCurrentMonth) event.currentTarget.focus();
		if (onClick) onClick(event);
	};
	if (ownerState.isDayFillerCell) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerDayRoot, {
		ref: handleRef,
		role: other.role,
		ownerState,
		className: clsx(classes.root, className),
		as: "div"
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerDayRoot, _extends({
		ref: handleRef,
		centerRipple: true,
		disabled,
		tabIndex: selected ? 0 : -1,
		onKeyDown: (event) => onKeyDown(event, day),
		onFocus: (event) => onFocus(event, day),
		onBlur: (event) => onBlur(event, day),
		onMouseEnter: (event) => onMouseEnter(event, day),
		onClick: handleClick,
		onMouseDown: handleMouseDown
	}, other, {
		ownerState,
		className: clsx(classes.root, className),
		children: children ?? adapter.format(day, "dayOfMonth")
	}));
});
PickerDayRaw.displayName = "PickerDayRaw";
PickerDayRaw.propTypes = {
	/**
	* A ref for imperative actions.
	* It currently only supports `focusVisible()` action.
	*/
	action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({ focusVisible: import_prop_types.default.func.isRequired }) })]),
	/**
	* If `true`, the ripples are centered.
	* They won't start at the cursor interaction position.
	* @default false
	*/
	centerRipple: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	/**
	* The date to show.
	*/
	day: import_prop_types.default.object.isRequired,
	/**
	* If `true`, the day is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, today's day is not highlighted.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
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
	* If `true`, the day is being animated.
	* @default false
	*/
	isAnimating: import_prop_types.default.bool,
	/**
	* If `true`, the day is a filler day (its content is hidden).
	* @default false
	*/
	isDayFillerCell: import_prop_types.default.bool,
	/**
	* If `true`, the day is the first visible cell of the month.
	* @default false
	*/
	isFirstVisibleCell: import_prop_types.default.bool,
	/**
	* If `true`, the day is the last visible cell of the month.
	* @default false
	*/
	isLastVisibleCell: import_prop_types.default.bool,
	/**
	* Indicates if the day should be visually selected.
	*/
	isVisuallySelected: import_prop_types.default.bool,
	/**
	* Whether the custom component is expected to render a native `<button>` element
	* when passing a React component to the `component` or `slots` prop.
	*/
	nativeButton: import_prop_types.default.bool,
	/**
	* Callback fired when the component is blurred.
	* @param {React.FocusEvent<HTMLButtonElement>} event The event object.
	* @param {PickerValidDate} day The day.
	* @default () => {}
	*/
	onBlur: import_prop_types.default.func,
	/**
	* Callback fired when the component is clicked.
	* @param {MuiEvent<React.MouseEvent<HTMLButtonElement>>} event The event object.
	* @default () => {}
	*/
	onClick: import_prop_types.default.func,
	/**
	* Callback fired when the day is selected.
	* @param {PickerValidDate} day The day to select.
	*/
	onDaySelect: import_prop_types.default.func.isRequired,
	/**
	* Callback fired when the component is focused.
	* @param {React.FocusEvent<HTMLButtonElement>} event The event object.
	* @param {PickerValidDate} day The day.
	* @default () => {}
	*/
	onFocus: import_prop_types.default.func,
	/**
	* Callback fired when the component is focused with a keyboard.
	* We trigger a `onFocus` callback too.
	*/
	onFocusVisible: import_prop_types.default.func,
	/**
	* Callback fired when a key is pressed.
	* @param {React.KeyboardEvent<HTMLButtonElement>} event The event object.
	* @param {PickerValidDate} day The day.
	* @default () => {}
	*/
	onKeyDown: import_prop_types.default.func,
	/**
	* Callback fired when the mouse button is pressed.
	* @param {React.MouseEvent<HTMLButtonElement>} event The event object.
	* @default () => {}
	*/
	onMouseDown: import_prop_types.default.func,
	/**
	* Callback fired when the mouse enters the component.
	* @param {React.MouseEvent<HTMLButtonElement>} event The event object.
	* @param {PickerValidDate} day The day.
	* @default () => {}
	*/
	onMouseEnter: import_prop_types.default.func,
	/**
	* If `true`, the day is outside the current month.
	* @default false
	*/
	outsideCurrentMonth: import_prop_types.default.bool,
	/**
	* If `true`, renders as selected.
	* @default false
	*/
	selected: import_prop_types.default.bool,
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
	* @default 0
	*/
	tabIndex: import_prop_types.default.number,
	/**
	* If `true`, today's day is highlighted.
	* @default false
	*/
	today: import_prop_types.default.bool,
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
/**
* Demos:
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
*
* API:
* - [PickerDay API](https://mui.com/x/api/date-pickers/picker-day/)
*/
var PickerDay = /*#__PURE__*/ import_react.memo(PickerDayRaw);
PickerDay.displayName = "PickerDay";
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/pickersSlideTransitionClasses.mjs
var getPickersSlideTransitionUtilityClass = (slot) => generateUtilityClass("MuiPickersSlideTransition", slot);
var pickersSlideTransitionClasses = generateUtilityClasses("MuiPickersSlideTransition", [
	"root",
	"slideEnter-left",
	"slideEnter-right",
	"slideEnterActive",
	"slideExit",
	"slideExitActiveLeft-left",
	"slideExitActiveLeft-right"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/PickersSlideTransition.mjs
var _excluded$7 = [
	"children",
	"className",
	"reduceAnimations",
	"slideDirection",
	"transKey",
	"classes"
];
var useUtilityClasses$7 = (classes, ownerState) => {
	const { slideDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		exit: ["slideExit"],
		enterActive: ["slideEnterActive"],
		enter: [`slideEnter-${slideDirection}`],
		exitActive: [`slideExitActiveLeft-${slideDirection}`]
	}, getPickersSlideTransitionUtilityClass, classes);
};
var elementOverrides = [
	"slideEnter-left",
	"slideEnter-right",
	"slideEnterActive",
	"slideExit",
	"slideExitActiveLeft-left",
	"slideExitActiveLeft-right"
];
var PickersSlideTransitionRoot = styled(TransitionGroup, {
	name: "MuiPickersSlideTransition",
	slot: "Root",
	overridesResolver: (_, styles) => elementOverrides.reduce((acc, key) => {
		acc.push({ [`.${pickersSlideTransitionClasses[key]}`]: styles[key] });
		return acc;
	}, [styles.root])
})(({ theme }) => {
	const slideTransition = theme.transitions.create("transform", {
		duration: theme.transitions.duration.complex,
		easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
	});
	return {
		display: "block",
		position: "relative",
		overflowX: "hidden",
		"& > *": {
			position: "absolute",
			top: 0,
			right: 0,
			left: 0
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-left"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-right"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
			transform: "translate(0%)",
			transition: slideTransition
		},
		[`& .${pickersSlideTransitionClasses.slideExit}`]: { transform: "translate(0%)" },
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			transition: slideTransition,
			zIndex: 0
		},
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			transition: slideTransition,
			zIndex: 0
		}
	};
});
/**
* @ignore - do not document.
*/
function PickersSlideTransition(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersSlideTransition"
	});
	const { children, className, reduceAnimations, slideDirection, transKey, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { slideDirection });
	const classes = useUtilityClasses$7(classesProp, ownerState);
	const theme = useTheme();
	if (reduceAnimations) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		className: clsx(classes.root, className),
		children
	});
	const transitionClasses = {
		exit: classes.exit,
		enterActive: classes.enterActive,
		enter: classes.enter,
		exitActive: classes.exitActive
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersSlideTransitionRoot, {
		className: clsx(classes.root, className),
		childFactory: (element) => /*#__PURE__*/ import_react.cloneElement(element, { classNames: transitionClasses }),
		role: "none",
		ownerState,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CSSTransition, _extends({
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: theme.transitions.duration.complex,
			classNames: transitionClasses
		}, other, { children }), transKey)
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/dayCalendarClasses.mjs
var getDayCalendarUtilityClass = (slot) => generateUtilityClass("MuiDayCalendar", slot);
generateUtilityClasses("MuiDayCalendar", [
	"root",
	"header",
	"weekDayLabel",
	"loadingContainer",
	"slideTransition",
	"monthContainer",
	"weekContainer",
	"weekNumberLabel",
	"weekNumber"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/DayCalendar.mjs
var _excluded$6 = [
	"parentProps",
	"day",
	"focusedDay",
	"selectedDays",
	"isDateDisabled",
	"currentMonthNumber",
	"isViewFocused"
], _excluded2$1 = ["ownerState"];
var useUtilityClasses$6 = (classes) => {
	return composeClasses({
		root: ["root"],
		header: ["header"],
		weekDayLabel: ["weekDayLabel"],
		loadingContainer: ["loadingContainer"],
		slideTransition: ["slideTransition"],
		monthContainer: ["monthContainer"],
		weekContainer: ["weekContainer"],
		weekNumberLabel: ["weekNumberLabel"],
		weekNumber: ["weekNumber"]
	}, getDayCalendarUtilityClass, classes);
};
var weeksContainerHeight = 240;
var PickerCalendarDayRoot = styled("div", {
	name: "MuiDayCalendar",
	slot: "Root"
})({});
var PickerCalendarDayHeader = styled("div", {
	name: "MuiDayCalendar",
	slot: "Header"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
});
var PickerCalendarWeekDayLabel = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekDayLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.secondary
}));
var PickerCalendarWeekNumberLabel = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekNumberLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.disabled
}));
var PickerCalendarWeekNumber = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekNumber"
})(({ theme }) => _extends({}, theme.typography.caption, {
	width: 36,
	height: 36,
	padding: 0,
	margin: `0 2px`,
	color: (theme.vars || theme).palette.text.disabled,
	fontSize: "0.75rem",
	alignItems: "center",
	justifyContent: "center",
	display: "inline-flex"
}));
var PickerCalendarLoadingContainer = styled("div", {
	name: "MuiDayCalendar",
	slot: "LoadingContainer"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: weeksContainerHeight
});
var PickerCalendarSlideTransition = styled(PickersSlideTransition, {
	name: "MuiDayCalendar",
	slot: "SlideTransition"
})({ minHeight: weeksContainerHeight });
var PickerCalendarWeekContainer = styled("div", {
	name: "MuiDayCalendar",
	slot: "MonthContainer"
})({ overflow: "hidden" });
var PickerCalendarWeek = styled("div", {
	name: "MuiDayCalendar",
	slot: "WeekContainer"
})({
	margin: `2px 0`,
	display: "flex",
	justifyContent: "center"
});
function WrappedDay(_ref) {
	let { parentProps, day, focusedDay, selectedDays, isDateDisabled, currentMonthNumber, isViewFocused } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$6);
	const { currentMonth, disabled, disableHighlightToday, isMonthSwitchingAnimating, showDaysOutsideCurrentMonth, slots, slotProps, timezone } = parentProps;
	const adapter = usePickerAdapter();
	const now = useNow(timezone);
	const isFocusableDay = focusedDay != null && adapter.isSameDay(day, focusedDay);
	const isFocusedDay = isViewFocused && isFocusableDay;
	const isSelected = selectedDays.some((selectedDay) => adapter.isSameDay(selectedDay, day));
	const isToday = adapter.isSameDay(day, now);
	const isDisabled = import_react.useMemo(() => disabled || isDateDisabled(day), [
		disabled,
		isDateDisabled,
		day
	]);
	const isOutsideCurrentMonth = import_react.useMemo(() => adapter.getMonth(day) !== currentMonthNumber, [
		adapter,
		day,
		currentMonthNumber
	]);
	const ownerStateBase = usePickerDayOwnerState({
		day,
		selected: isSelected,
		disabled: isDisabled,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	});
	const Day = slots?.day ?? PickerDay;
	const dayProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Day,
		externalSlotProps: slotProps?.day,
		additionalProps: _extends({
			disableHighlightToday,
			showDaysOutsideCurrentMonth,
			role: "gridcell",
			isAnimating: isMonthSwitchingAnimating,
			"data-timestamp": adapter.toJsDate(day).valueOf()
		}, other),
		ownerState: _extends({}, ownerStateBase, {
			day,
			isDayDisabled: isDisabled,
			isDaySelected: isSelected
		})
	}), _excluded2$1);
	const isFirstVisibleCell = import_react.useMemo(() => {
		const startOfMonth = adapter.startOfMonth(currentMonth);
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, startOfMonth);
		return adapter.isSameDay(day, adapter.startOfWeek(startOfMonth));
	}, [
		currentMonth,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	const isLastVisibleCell = import_react.useMemo(() => {
		const endOfMonth = adapter.endOfMonth(currentMonth);
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, endOfMonth);
		return adapter.isSameDay(day, adapter.endOfWeek(endOfMonth));
	}, [
		currentMonth,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Day, _extends({}, dayProps, {
		day,
		disabled: isDisabled,
		autoFocus: !isOutsideCurrentMonth && isFocusedDay,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		isFirstVisibleCell,
		isLastVisibleCell,
		selected: isSelected,
		tabIndex: isFocusableDay ? 0 : -1,
		"aria-selected": isSelected,
		"aria-current": isToday ? "date" : void 0
	}));
}
/**
* @ignore - do not document.
*/
function DayCalendar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDayCalendar"
	});
	const adapter = usePickerAdapter();
	const { onFocusedDayChange, className, classes: classesProp, currentMonth, selectedDays, focusedDay, loading, onSelectedDaysChange, onMonthSwitchingAnimationEnd, readOnly, reduceAnimations, renderLoading = () => /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { children: "…" }), slideDirection, TransitionProps, disablePast, disableFuture, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear, dayOfWeekFormatter = (date) => adapter.format(date, "weekdayShort").charAt(0).toUpperCase(), hasFocus, onFocusedViewChange, gridLabelId, displayWeekNumber, fixedWeekNumber, timezone } = props;
	const now = useNow(timezone);
	const classes = useUtilityClasses$6(classesProp);
	const isRtl = useRtl();
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disablePast,
		disableFuture,
		timezone
	});
	const translations = usePickerTranslations();
	const handleDaySelect = useEventCallback((day) => {
		if (readOnly) return;
		onSelectedDaysChange(day);
	});
	const focusDay = (day) => {
		if (!isDateDisabled(day)) {
			onFocusedDayChange(day);
			onFocusedViewChange?.(true);
		}
	};
	const handleKeyDown = useEventCallback((event, day) => {
		switch (event.key) {
			case "ArrowUp":
				focusDay(adapter.addDays(day, -7));
				event.preventDefault();
				break;
			case "ArrowDown":
				focusDay(adapter.addDays(day, 7));
				event.preventDefault();
				break;
			case "ArrowLeft": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? 1 : -1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? 1 : -1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? newFocusedDayDefault : adapter.startOfMonth(nextAvailableMonth),
					maxDate: isRtl ? adapter.endOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "ArrowRight": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? -1 : 1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? -1 : 1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? adapter.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					maxDate: isRtl ? newFocusedDayDefault : adapter.endOfMonth(nextAvailableMonth),
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "Home":
				focusDay(adapter.startOfWeek(day));
				event.preventDefault();
				break;
			case "End":
				focusDay(adapter.endOfWeek(day));
				event.preventDefault();
				break;
			case "PageUp":
				focusDay(adapter.addMonths(day, 1));
				event.preventDefault();
				break;
			case "PageDown":
				focusDay(adapter.addMonths(day, -1));
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleDaySelect(day);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleFocus = useEventCallback((event, day) => focusDay(day));
	const handleBlur = useEventCallback((event, day) => {
		if (focusedDay != null && adapter.isSameDay(focusedDay, day)) onFocusedViewChange?.(false);
	});
	const currentMonthNumber = adapter.getMonth(currentMonth);
	const currentYearNumber = adapter.getYear(currentMonth);
	const validSelectedDays = import_react.useMemo(() => selectedDays.filter((day) => !!day).map((day) => adapter.startOfDay(day)), [adapter, selectedDays]);
	const transitionKey = `${currentYearNumber}-${currentMonthNumber}`;
	const slideNodeRef = import_react.useMemo(() => /*#__PURE__*/ import_react.createRef(), [transitionKey]);
	const weeksToDisplay = import_react.useMemo(() => {
		const toDisplay = adapter.getWeekArray(currentMonth);
		let nextMonth = adapter.addMonths(currentMonth, 1);
		while (fixedWeekNumber && toDisplay.length < fixedWeekNumber) {
			const additionalWeeks = adapter.getWeekArray(nextMonth);
			const hasCommonWeek = adapter.isSameDay(toDisplay[toDisplay.length - 1][0], additionalWeeks[0][0]);
			additionalWeeks.slice(hasCommonWeek ? 1 : 0).forEach((week) => {
				if (toDisplay.length < fixedWeekNumber) toDisplay.push(week);
			});
			nextMonth = adapter.addMonths(nextMonth, 1);
		}
		return toDisplay;
	}, [
		currentMonth,
		fixedWeekNumber,
		adapter
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickerCalendarDayRoot, {
		role: "grid",
		"aria-labelledby": gridLabelId,
		className: classes.root,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickerCalendarDayHeader, {
			role: "row",
			className: classes.header,
			children: [displayWeekNumber && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarWeekNumberLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": translations.calendarWeekNumberHeaderLabel,
				className: classes.weekNumberLabel,
				children: translations.calendarWeekNumberHeaderText
			}), getWeekdays(adapter, now).map((weekday, i) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarWeekDayLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": adapter.format(weekday, "weekday"),
				className: classes.weekDayLabel,
				children: dayOfWeekFormatter(weekday)
			}, i.toString()))]
		}), loading ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarLoadingContainer, {
			className: classes.loadingContainer,
			children: renderLoading()
		}) : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarSlideTransition, _extends({
			transKey: transitionKey,
			onExited: onMonthSwitchingAnimationEnd,
			reduceAnimations,
			slideDirection,
			className: clsx(className, classes.slideTransition)
		}, TransitionProps, {
			nodeRef: slideNodeRef,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarWeekContainer, {
				ref: slideNodeRef,
				role: "rowgroup",
				className: classes.monthContainer,
				children: weeksToDisplay.map((week, index) => /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickerCalendarWeek, {
					role: "row",
					className: classes.weekContainer,
					"aria-rowindex": index + 1,
					children: [displayWeekNumber && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickerCalendarWeekNumber, {
						className: classes.weekNumber,
						role: "rowheader",
						"aria-label": translations.calendarWeekNumberAriaLabelText(adapter.getWeekNumber(week[0])),
						children: translations.calendarWeekNumberText(adapter.getWeekNumber(week[0]))
					}), week.map((day, dayIndex) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(WrappedDay, {
						parentProps: props,
						day,
						selectedDays: validSelectedDays,
						isViewFocused: hasFocus,
						focusedDay,
						onKeyDown: handleKeyDown,
						onFocus: handleFocus,
						onBlur: handleBlur,
						onDaySelect: handleDaySelect,
						isDateDisabled,
						currentMonthNumber,
						"aria-colindex": dayIndex + 1
					}, day.toString()))]
				}, `week-${week[0]}`))
			})
		}))]
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/monthCalendarClasses.mjs
function getMonthCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiMonthCalendar", slot);
}
var monthCalendarClasses = generateUtilityClasses("MuiMonthCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendarButton.mjs
var _excluded$5 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$5 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isMonthDisabled && "disabled",
		ownerState.isMonthSelected && "selected"
	] }, getMonthCalendarUtilityClass, classes);
};
var DefaultMonthButton = styled("button", {
	name: "MuiMonthCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${monthCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${monthCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity) },
	"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${monthCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${monthCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - do not document.
*/
var MonthCalendarButton = /*#__PURE__*/ import_react.memo(function MonthCalendarButton(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isMonthDisabled: disabled,
		isMonthSelected: selected
	});
	const classes = useUtilityClasses$5(classesProp, ownerState);
	useEnhancedEffect(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const MonthButton = slots?.monthButton ?? DefaultMonthButton;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MonthButton, _extends({}, useSlotProps({
		elementType: MonthButton,
		externalSlotProps: slotProps?.monthButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
MonthCalendarButton.displayName = "MonthCalendarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/MonthCalendar/MonthCalendar.mjs
var _excluded$4 = [
	"autoFocus",
	"className",
	"currentMonth",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"shouldDisableMonth",
	"readOnly",
	"disableHighlightToday",
	"onMonthFocus",
	"hasFocus",
	"onFocusedViewChange",
	"monthsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$4 = (classes) => {
	return composeClasses({ root: ["root"] }, getMonthCalendarUtilityClass, classes);
};
function useMonthCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), { monthsPerRow: themeProps.monthsPerRow ?? 3 });
}
var isSameMonth = (monthA, monthB, yearA, yearB, adapter) => Boolean(monthA === monthB && yearB && adapter.isSameYear(yearA, yearB));
var MonthCalendarRoot = styled("div", {
	name: "MuiMonthCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "monthsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 16,
	padding: "8px 0",
	width: 320,
	boxSizing: "border-box",
	variants: [{
		props: { monthsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { monthsPerRow: 4 },
		style: { columnGap: 0 }
	}]
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [MonthCalendar API](https://mui.com/x/api/date-pickers/month-calendar/)
*/
var MonthCalendar = /*#__PURE__*/ import_react.forwardRef(function MonthCalendar(inProps, ref) {
	const props = useMonthCalendarDefaultizedProps(inProps, "MuiMonthCalendar");
	const { autoFocus, className, currentMonth, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, shouldDisableMonth, readOnly, onMonthFocus, hasFocus, onFocusedViewChange, monthsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "MonthCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.month
	}), []);
	const classes = useUtilityClasses$4(classesProp);
	const todayMonth = import_react.useMemo(() => adapter.getMonth(now), [adapter, now]);
	const selectedMonth = import_react.useMemo(() => {
		if (value != null) return adapter.getMonth(value);
		return null;
	}, [value, adapter]);
	const [focusedMonth, setFocusedMonth] = import_react.useState(() => selectedMonth || adapter.getMonth(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "MonthCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isMonthDisabled = import_react.useCallback((dateToValidate) => {
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		const monthToValidate = adapter.startOfMonth(dateToValidate);
		if (adapter.isBefore(monthToValidate, firstEnabledMonth)) return true;
		if (adapter.isAfter(monthToValidate, lastEnabledMonth)) return true;
		if (!shouldDisableMonth) return false;
		return shouldDisableMonth(monthToValidate);
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableMonth,
		adapter
	]);
	const handleMonthSelection = useEventCallback((_event, month) => {
		if (readOnly) return;
		const baseDateForMonth = (value && currentMonth && !adapter.isSameYear(value, currentMonth) ? adapter.setYear(value, adapter.getYear(currentMonth)) : value) ?? currentMonth ?? referenceDate;
		handleValueChange(adapter.setMonth(baseDateForMonth, month));
	});
	const focusMonth = useEventCallback((month) => {
		if (!isMonthDisabled(adapter.setMonth(value ?? currentMonth ?? referenceDate, month))) {
			setFocusedMonth(month);
			changeHasFocus(true);
			if (onMonthFocus) onMonthFocus(month);
		}
	});
	import_react.useEffect(() => {
		setFocusedMonth((prevFocusedMonth) => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
	}, [selectedMonth]);
	const handleKeyDown = useEventCallback((event, month) => {
		const monthsInYear = 12;
		const monthsInRow = 3;
		switch (event.key) {
			case "ArrowUp":
				focusMonth((monthsInYear + month - monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusMonth((monthsInYear + month + monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusMonth((monthsInYear + month + (isRtl ? 1 : -1)) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusMonth((monthsInYear + month + (isRtl ? -1 : 1)) % monthsInYear);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleMonthSelection(event, month);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleMonthFocus = useEventCallback((event, month) => {
		focusMonth(month);
	});
	const handleMonthBlur = useEventCallback((event, month) => {
		if (focusedMonth === month) changeHasFocus(false);
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MonthCalendarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		monthsPerRow
	}, other, { children: getMonthsInYear(adapter, currentMonth ?? value ?? referenceDate).map((month) => {
		const monthNumber = adapter.getMonth(month);
		const monthText = adapter.format(month, "monthShort");
		const monthLabel = adapter.format(month, "month");
		const isSelected = isSameMonth(monthNumber, selectedMonth, month, value, adapter);
		const isDisabled = disabled || isMonthDisabled(month);
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MonthCalendarButton, {
			selected: isSelected,
			value: monthNumber,
			onClick: handleMonthSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && monthNumber === focusedMonth,
			disabled: isDisabled,
			tabIndex: monthNumber === focusedMonth && !isDisabled ? 0 : -1,
			onFocus: handleMonthFocus,
			onBlur: handleMonthBlur,
			"aria-current": isSameMonth(monthNumber, todayMonth, month, now, adapter) ? "date" : void 0,
			"aria-label": monthLabel,
			slots,
			slotProps,
			classes: classesProp,
			children: monthText
		}, monthText);
	}) }));
});
MonthCalendar.displayName = "MonthCalendar";
MonthCalendar.propTypes = {
	autoFocus: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	currentMonth: import_prop_types.default.object,
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
	* If `true`, today's date is rendering without highlighting with circle.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	gridLabelId: import_prop_types.default.string,
	hasFocus: import_prop_types.default.bool,
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
	* Callback fired when the value changes.
	* @param {PickerValidDate} value The new value.
	*/
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onMonthFocus: import_prop_types.default.func,
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid month using the validation props, except callbacks such as `shouldDisableMonth`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Disable specific month.
	* @param {PickerValidDate} month The month to test.
	* @returns {boolean} If `true`, the month will be disabled.
	*/
	shouldDisableMonth: import_prop_types.default.func,
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
	value: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/yearCalendarClasses.mjs
function getYearCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiYearCalendar", slot);
}
var yearCalendarClasses = generateUtilityClasses("MuiYearCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/YearCalendarButton.mjs
var _excluded$3 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$3 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isYearDisabled && "disabled",
		ownerState.isYearSelected && "selected"
	] }, getYearCalendarUtilityClass, classes);
};
var DefaultYearButton = styled("button", {
	name: "MuiYearCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${yearCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${yearCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.focusOpacity) },
	"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${yearCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${yearCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - internal component.
*/
var YearCalendarButton = /*#__PURE__*/ import_react.memo(function YearCalendarButton(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isYearDisabled: disabled,
		isYearSelected: selected
	});
	const classes = useUtilityClasses$3(classesProp, ownerState);
	useEnhancedEffect(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const YearButton = slots?.yearButton ?? DefaultYearButton;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(YearButton, _extends({}, useSlotProps({
		elementType: YearButton,
		externalSlotProps: slotProps?.yearButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
YearCalendarButton.displayName = "YearCalendarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/YearCalendar/YearCalendar.mjs
var _excluded$2 = [
	"autoFocus",
	"className",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"readOnly",
	"shouldDisableYear",
	"disableHighlightToday",
	"onYearFocus",
	"hasFocus",
	"onFocusedViewChange",
	"yearsOrder",
	"yearsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$2 = (classes) => {
	return composeClasses({ root: ["root"] }, getYearCalendarUtilityClass, classes);
};
function useYearCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		yearsPerRow: themeProps.yearsPerRow ?? 3,
		yearsOrder: themeProps.yearsOrder ?? "asc"
	});
}
var YearCalendarRoot = styled("div", {
	name: "MuiYearCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "yearsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 12,
	padding: "6px 0",
	overflowY: "auto",
	height: "100%",
	width: 320,
	maxHeight: 280,
	boxSizing: "border-box",
	position: "relative",
	variants: [{
		props: { yearsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { yearsPerRow: 4 },
		style: {
			columnGap: 0,
			padding: "0 2px"
		}
	}]
});
var YearCalendarButtonFiller = styled("div", {
	name: "MuiYearCalendar",
	slot: "ButtonFiller"
})({
	height: 36,
	width: 72
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [YearCalendar API](https://mui.com/x/api/date-pickers/year-calendar/)
*/
var YearCalendar = /*#__PURE__*/ import_react.forwardRef(function YearCalendar(inProps, ref) {
	const props = useYearCalendarDefaultizedProps(inProps, "MuiYearCalendar");
	const { autoFocus, className, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, readOnly, shouldDisableYear, onYearFocus, hasFocus, onFocusedViewChange, yearsOrder, yearsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "YearCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.year
	}), []);
	const classes = useUtilityClasses$2(classesProp);
	const todayYear = import_react.useMemo(() => adapter.getYear(now), [adapter, now]);
	const selectedYear = import_react.useMemo(() => {
		if (value != null) return adapter.getYear(value);
		return null;
	}, [value, adapter]);
	const [focusedYear, setFocusedYear] = import_react.useState(() => selectedYear || adapter.getYear(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "YearCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isYearDisabled = import_react.useCallback((dateToValidate) => {
		if (disablePast && adapter.isBeforeYear(dateToValidate, now)) return true;
		if (disableFuture && adapter.isAfterYear(dateToValidate, now)) return true;
		if (minDate && adapter.isBeforeYear(dateToValidate, minDate)) return true;
		if (maxDate && adapter.isAfterYear(dateToValidate, maxDate)) return true;
		if (!shouldDisableYear) return false;
		return shouldDisableYear(adapter.startOfYear(dateToValidate));
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableYear,
		adapter
	]);
	const handleYearSelection = useEventCallback((_event, year) => {
		if (readOnly) return;
		handleValueChange(adapter.setYear(value ?? referenceDate, year));
	});
	const focusYear = useEventCallback((year) => {
		if (!isYearDisabled(adapter.setYear(value ?? referenceDate, year))) {
			setFocusedYear(year);
			changeHasFocus(true);
			onYearFocus?.(year);
		}
	});
	import_react.useEffect(() => {
		setFocusedYear((prevFocusedYear) => selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear);
	}, [selectedYear]);
	const verticalDirection = yearsOrder !== "desc" ? yearsPerRow * 1 : yearsPerRow * -1;
	const horizontalDirection = isRtl && yearsOrder === "asc" || !isRtl && yearsOrder === "desc" ? -1 : 1;
	const handleKeyDown = useEventCallback((event, year) => {
		switch (event.key) {
			case "ArrowUp":
				focusYear(year - verticalDirection);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusYear(year + verticalDirection);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusYear(year - horizontalDirection);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusYear(year + horizontalDirection);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleYearSelection(event, year);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleYearFocus = useEventCallback((event, year) => {
		focusYear(year);
	});
	const handleYearBlur = useEventCallback((event, year) => {
		if (focusedYear === year) changeHasFocus(false);
	});
	const scrollerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, scrollerRef);
	import_react.useEffect(() => {
		if (autoFocus || scrollerRef.current === null) return;
		const tabbableButton = scrollerRef.current.querySelector("[tabindex=\"0\"]");
		if (!tabbableButton) return;
		const offsetHeight = tabbableButton.offsetHeight;
		const offsetTop = tabbableButton.offsetTop;
		const clientHeight = scrollerRef.current.clientHeight;
		const scrollTop = scrollerRef.current.scrollTop;
		const elementBottom = offsetTop + offsetHeight;
		if (offsetHeight > clientHeight || offsetTop < scrollTop) return;
		scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
	}, [autoFocus]);
	const yearRange = adapter.getYearRange([minDate, maxDate]);
	if (yearsOrder === "desc") yearRange.reverse();
	let fillerAmount = yearsPerRow - yearRange.length % yearsPerRow;
	if (fillerAmount === yearsPerRow) fillerAmount = 0;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(YearCalendarRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		yearsPerRow
	}, other, { children: [yearRange.map((year) => {
		const yearNumber = adapter.getYear(year);
		const isSelected = yearNumber === selectedYear;
		const isDisabled = disabled || isYearDisabled(year);
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(YearCalendarButton, {
			selected: isSelected,
			value: yearNumber,
			onClick: handleYearSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && yearNumber === focusedYear,
			disabled: isDisabled,
			tabIndex: yearNumber === focusedYear && !isDisabled ? 0 : -1,
			onFocus: handleYearFocus,
			onBlur: handleYearBlur,
			"aria-current": todayYear === yearNumber ? "date" : void 0,
			slots,
			slotProps,
			classes: classesProp,
			children: adapter.format(year, "year")
		}, adapter.format(year, "year"));
	}), Array.from({ length: fillerAmount }, (_, index) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(YearCalendarButtonFiller, {}, index))] }));
});
YearCalendar.displayName = "YearCalendar";
YearCalendar.propTypes = {
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
	* If `true`, today's date is rendering without highlighting with circle.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
	/**
	* If `true`, disable values before the current date for date components, time for time components and both for date time components.
	* @default false
	*/
	disablePast: import_prop_types.default.bool,
	gridLabelId: import_prop_types.default.string,
	hasFocus: import_prop_types.default.bool,
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
	* Callback fired when the value changes.
	* @param {PickerValidDate} value The new value.
	*/
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onYearFocus: import_prop_types.default.func,
	/**
	* If `true`, the component is read-only.
	* When read-only, the value cannot be changed but the user can interact with the interface.
	* @default false
	*/
	readOnly: import_prop_types.default.bool,
	/**
	* The date used to generate the new value when both `value` and `defaultValue` are empty.
	* @default The closest valid year using the validation props, except callbacks such as `shouldDisableYear`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Disable specific year.
	* @param {PickerValidDate} year The year to test.
	* @returns {boolean} If `true`, the year will be disabled.
	*/
	shouldDisableYear: import_prop_types.default.func,
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
//#region node_modules/@mui/x-date-pickers/PickersCalendarHeader/pickersCalendarHeaderClasses.mjs
var getPickersCalendarHeaderUtilityClass = (slot) => generateUtilityClass("MuiPickersCalendarHeader", slot);
var pickersCalendarHeaderClasses = generateUtilityClasses("MuiPickersCalendarHeader", [
	"root",
	"labelContainer",
	"label",
	"switchViewButton",
	"switchViewIcon"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/PickersCalendarHeader/PickersCalendarHeader.mjs
var _excluded$1 = [
	"slots",
	"slotProps",
	"currentMonth",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onMonthChange",
	"onViewChange",
	"view",
	"reduceAnimations",
	"views",
	"labelId",
	"className",
	"classes",
	"timezone",
	"format"
], _excluded2 = ["ownerState"];
var useUtilityClasses$1 = (classes) => {
	return composeClasses({
		root: ["root"],
		labelContainer: ["labelContainer"],
		label: ["label"],
		switchViewButton: ["switchViewButton"],
		switchViewIcon: ["switchViewIcon"]
	}, getPickersCalendarHeaderUtilityClass, classes);
};
var PickersCalendarHeaderRoot = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Root"
})({
	display: "flex",
	alignItems: "center",
	marginTop: 12,
	marginBottom: 4,
	paddingLeft: 24,
	paddingRight: 12,
	maxHeight: 40,
	minHeight: 40
});
var PickersCalendarHeaderLabelContainer = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "LabelContainer"
})(({ theme }) => _extends({
	display: "flex",
	overflow: "hidden",
	alignItems: "center",
	cursor: "pointer",
	marginRight: "auto"
}, theme.typography.body1, { fontWeight: theme.typography.fontWeightMedium }));
var PickersCalendarHeaderLabel = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Label"
})({ marginRight: 6 });
var PickersCalendarHeaderSwitchViewButton = styled(IconButton, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewButton"
})({
	marginRight: "auto",
	variants: [{
		props: { view: "year" },
		style: { [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: { transform: "rotate(180deg)" } }
	}]
});
var PickersCalendarHeaderSwitchViewIcon = styled(ArrowDropDownIcon, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewIcon"
})(({ theme }) => ({
	willChange: "transform",
	transition: theme.transitions.create("transform"),
	transform: "rotate(0deg)"
}));
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [PickersCalendarHeader API](https://mui.com/x/api/date-pickers/pickers-calendar-header/)
*/
var PickersCalendarHeader = /*#__PURE__*/ import_react.forwardRef(function PickersCalendarHeader(inProps, ref) {
	const translations = usePickerTranslations();
	const adapter = usePickerAdapter();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersCalendarHeader"
	});
	const { slots, slotProps, currentMonth: month, disabled, disableFuture, disablePast, maxDate, minDate, onMonthChange, onViewChange, view, reduceAnimations, views, labelId, className, classes: classesProp, timezone, format = `${adapter.formats.month} ${adapter.formats.year}` } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$1(classesProp);
	const SwitchViewButton = slots?.switchViewButton ?? PickersCalendarHeaderSwitchViewButton;
	const switchViewButtonProps = useSlotProps({
		elementType: SwitchViewButton,
		externalSlotProps: slotProps?.switchViewButton,
		additionalProps: {
			size: "small",
			"aria-label": translations.calendarViewSwitchingButtonAriaLabel(view)
		},
		ownerState: _extends({}, ownerState, { view }),
		className: classes.switchViewButton
	});
	const SwitchViewIcon = slots?.switchViewIcon ?? PickersCalendarHeaderSwitchViewIcon;
	const switchViewIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: SwitchViewIcon,
		externalSlotProps: slotProps?.switchViewIcon,
		ownerState,
		className: classes.switchViewIcon
	}), _excluded2);
	const selectNextMonth = () => onMonthChange(adapter.addMonths(month, 1));
	const selectPreviousMonth = () => onMonthChange(adapter.addMonths(month, -1));
	const isNextMonthDisabled = useNextMonthDisabled(month, {
		disableFuture,
		maxDate,
		timezone
	});
	const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
		disablePast,
		minDate,
		timezone
	});
	const handleToggleView = () => {
		if (views.length === 1 || !onViewChange || disabled) return;
		if (views.length === 2) onViewChange(views.find((el) => el !== view) || views[0]);
		else onViewChange(views[views.indexOf(view) !== 0 ? 0 : 1]);
	};
	if (views.length === 1 && views[0] === "year") return null;
	const label = adapter.formatByString(month, format);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderRoot, _extends({}, other, {
		ownerState,
		className: clsx(classes.root, className),
		ref,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderLabelContainer, {
			role: "none",
			onClick: handleToggleView,
			ownerState,
			"aria-live": "polite",
			className: classes.labelContainer,
			children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroup, {
				reduceAnimations,
				transKey: label,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersCalendarHeaderLabel, {
					id: labelId,
					ownerState,
					className: classes.label,
					children: label
				})
			}), views.length > 1 && !disabled && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SwitchViewButton, _extends({}, switchViewButtonProps, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SwitchViewIcon, _extends({}, switchViewIconProps)) }))]
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Fade, {
			in: view === "day",
			appear: !reduceAnimations,
			enter: !reduceAnimations,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PickersArrowSwitcher, {
				slots,
				slotProps,
				onGoToPrevious: selectPreviousMonth,
				isPreviousDisabled: isPreviousMonthDisabled,
				previousLabel: translations.previousMonth,
				onGoToNext: selectNextMonth,
				isNextDisabled: isNextMonthDisabled,
				nextLabel: translations.nextMonth
			})
		})]
	}));
});
PickersCalendarHeader.displayName = "PickersCalendarHeader";
PickersCalendarHeader.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	currentMonth: import_prop_types.default.object.isRequired,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	/**
	* Format used to display the date.
	* @default `${adapter.formats.month} ${adapter.formats.year}`
	*/
	format: import_prop_types.default.string,
	/**
	* Id of the calendar text element.
	* It is used to establish an `aria-labelledby` relationship with the calendar `grid` element.
	*/
	labelId: import_prop_types.default.string,
	maxDate: import_prop_types.default.object.isRequired,
	minDate: import_prop_types.default.object.isRequired,
	onMonthChange: import_prop_types.default.func.isRequired,
	onViewChange: import_prop_types.default.func,
	reduceAnimations: import_prop_types.default.bool.isRequired,
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
	timezone: import_prop_types.default.string.isRequired,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired,
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired).isRequired
};
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/dateCalendarClasses.mjs
var getDateCalendarUtilityClass = (slot) => generateUtilityClass("MuiDateCalendar", slot);
generateUtilityClasses("MuiDateCalendar", ["root", "viewTransitionContainer"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/DateCalendar/DateCalendar.mjs
var _excluded = [
	"autoFocus",
	"onViewChange",
	"value",
	"defaultValue",
	"referenceDate",
	"disableFuture",
	"disablePast",
	"onChange",
	"onYearChange",
	"onMonthChange",
	"reduceAnimations",
	"shouldDisableDate",
	"shouldDisableMonth",
	"shouldDisableYear",
	"view",
	"views",
	"openTo",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"minDate",
	"maxDate",
	"disableHighlightToday",
	"focusedView",
	"onFocusedViewChange",
	"showDaysOutsideCurrentMonth",
	"fixedWeekNumber",
	"dayOfWeekFormatter",
	"slots",
	"slotProps",
	"loading",
	"renderLoading",
	"displayWeekNumber",
	"yearsOrder",
	"yearsPerRow",
	"monthsPerRow",
	"timezone"
];
var useUtilityClasses = (classes) => {
	return composeClasses({
		root: ["root"],
		viewTransitionContainer: ["viewTransitionContainer"]
	}, getDateCalendarUtilityClass, classes);
};
function useDateCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	const reduceAnimations = useReduceAnimations(themeProps.reduceAnimations);
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		loading: themeProps.loading ?? false,
		openTo: themeProps.openTo ?? "day",
		views: themeProps.views ?? ["year", "day"],
		reduceAnimations,
		renderLoading: themeProps.renderLoading ?? (() => /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { children: "…" }))
	});
}
var DateCalendarRoot = styled(PickerViewRoot, {
	name: "MuiDateCalendar",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	height: 336
});
var DateCalendarViewTransitionContainer = styled(PickersFadeTransitionGroup, {
	name: "MuiDateCalendar",
	slot: "ViewTransitionContainer"
})({});
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DateCalendar API](https://mui.com/x/api/date-pickers/date-calendar/)
*/
var DateCalendar = /*#__PURE__*/ import_react.forwardRef(function DateCalendar(inProps, ref) {
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const id = useId();
	const props = useDateCalendarDefaultizedProps(inProps, "MuiDateCalendar");
	const { autoFocus, onViewChange, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableFuture, disablePast, onChange, onMonthChange, reduceAnimations, shouldDisableDate, shouldDisableMonth, shouldDisableYear, view: inView, views, openTo, className, classes: classesProp, disabled, readOnly, minDate, maxDate, disableHighlightToday, focusedView: focusedViewProp, onFocusedViewChange, showDaysOutsideCurrentMonth, fixedWeekNumber, dayOfWeekFormatter, slots, slotProps, loading, renderLoading, displayWeekNumber, yearsOrder, yearsPerRow, monthsPerRow, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "DateCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const { view, setView, focusedView, setFocusedView, goToNextView, setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onChange: handleValueChange,
		onViewChange,
		autoFocus,
		focusedView: focusedViewProp,
		onFocusedViewChange
	});
	const { referenceDate, calendarState, setVisibleDate, isDateDisabled, onMonthSwitchingAnimationEnd } = useCalendarState({
		value,
		referenceDate: referenceDateProp,
		reduceAnimations,
		onMonthChange,
		minDate,
		maxDate,
		shouldDisableDate,
		disablePast,
		disableFuture,
		timezone,
		getCurrentMonthFromVisibleDate: (visibleDate, prevMonth) => {
			if (adapter.isSameMonth(visibleDate, prevMonth)) return prevMonth;
			return adapter.startOfMonth(visibleDate);
		}
	});
	const minDateWithDisabled = disabled && value || minDate;
	const maxDateWithDisabled = disabled && value || maxDate;
	const gridLabelId = `${id}-grid-label`;
	const hasFocus = focusedView !== null;
	const CalendarHeader = slots?.calendarHeader ?? PickersCalendarHeader;
	const calendarHeaderProps = useSlotProps({
		elementType: CalendarHeader,
		externalSlotProps: slotProps?.calendarHeader,
		additionalProps: {
			views,
			view,
			currentMonth: calendarState.currentMonth,
			onViewChange: setView,
			onMonthChange: (month) => setVisibleDate({
				target: month,
				reason: "header-navigation"
			}),
			minDate: minDateWithDisabled,
			maxDate: maxDateWithDisabled,
			disabled,
			disablePast,
			disableFuture,
			reduceAnimations,
			timezone,
			labelId: gridLabelId
		},
		ownerState
	});
	const handleDateMonthChange = useEventCallback((newDate) => {
		const startOfMonth = adapter.startOfMonth(newDate);
		const endOfMonth = adapter.endOfMonth(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
			maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfMonth,
				reason: "cell-interaction"
			});
		}
	});
	const handleDateYearChange = useEventCallback((newDate) => {
		const startOfYear = adapter.startOfYear(newDate);
		const endOfYear = adapter.endOfYear(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfYear) ? startOfYear : minDate,
			maxDate: adapter.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfYear,
				reason: "cell-interaction"
			});
		}
	});
	const handleSelectedDayChange = useEventCallback((day) => {
		if (day) return handleValueChange(mergeDateAndTime(adapter, day, value ?? referenceDate), "finish", view);
		return handleValueChange(day, "finish", view);
	});
	import_react.useEffect(() => {
		if (adapter.isValid(value)) setVisibleDate({
			target: value,
			reason: "controlled-value-change"
		});
	}, [value]);
	const classes = useUtilityClasses(classesProp);
	const baseDateValidationProps = {
		disablePast,
		disableFuture,
		maxDate,
		minDate
	};
	const commonViewProps = {
		disableHighlightToday,
		readOnly,
		disabled,
		timezone,
		gridLabelId,
		slots,
		slotProps
	};
	const prevOpenViewRef = import_react.useRef(view);
	import_react.useEffect(() => {
		if (prevOpenViewRef.current === view) return;
		if (focusedView === prevOpenViewRef.current) setFocusedView(view, true);
		prevOpenViewRef.current = view;
	}, [
		focusedView,
		setFocusedView,
		view
	]);
	const selectedDays = import_react.useMemo(() => [value], [value]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DateCalendarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(CalendarHeader, _extends({}, calendarHeaderProps, {
		slots,
		slotProps
	})), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DateCalendarViewTransitionContainer, {
		reduceAnimations,
		className: classes.viewTransitionContainer,
		transKey: view,
		ownerState,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", { children: [
			view === "year" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(YearCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				value,
				onChange: handleDateYearChange,
				shouldDisableYear,
				hasFocus,
				onFocusedViewChange: (isViewFocused) => setFocusedView("year", isViewFocused),
				yearsOrder,
				yearsPerRow,
				referenceDate
			})),
			view === "month" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(MonthCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				currentMonth: calendarState.currentMonth,
				hasFocus,
				className,
				value,
				onChange: handleDateMonthChange,
				shouldDisableMonth,
				onFocusedViewChange: (isViewFocused) => setFocusedView("month", isViewFocused),
				monthsPerRow,
				referenceDate
			})),
			view === "day" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DayCalendar, _extends({}, calendarState, baseDateValidationProps, commonViewProps, {
				onMonthSwitchingAnimationEnd,
				hasFocus,
				onFocusedDayChange: (focusedDate) => setVisibleDate({
					target: focusedDate,
					reason: "cell-interaction"
				}),
				reduceAnimations,
				selectedDays,
				onSelectedDaysChange: handleSelectedDayChange,
				shouldDisableDate,
				shouldDisableMonth,
				shouldDisableYear,
				onFocusedViewChange: (isViewFocused) => setFocusedView("day", isViewFocused),
				showDaysOutsideCurrentMonth,
				fixedWeekNumber,
				dayOfWeekFormatter,
				displayWeekNumber,
				loading,
				renderLoading
			}))
		] })
	})] }));
});
DateCalendar.displayName = "DateCalendar";
DateCalendar.propTypes = {
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
	* Formats the day of week displayed in the calendar header.
	* @param {PickerValidDate} date The date of the day of week provided by the adapter.
	* @returns {string} The name to display.
	* @default (date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
	*/
	dayOfWeekFormatter: import_prop_types.default.func,
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
	* If `true`, today's day is not highlighted.
	* @default false
	*/
	disableHighlightToday: import_prop_types.default.bool,
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
	* Controlled focused view.
	*/
	focusedView: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	/**
	* If `true`, calls `renderLoading` instead of rendering the day calendar.
	* Can be used to preload information and show it in calendar.
	* @default false
	*/
	loading: import_prop_types.default.bool,
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
	* Callback fired on month change.
	* @param {PickerValidDate} month The new month.
	*/
	onMonthChange: import_prop_types.default.func,
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
	* @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`.
	*/
	referenceDate: import_prop_types.default.object,
	/**
	* Component displaying when passed `loading` true.
	* @returns {React.ReactNode} The node to render when loading.
	* @default () => <span>…</span>
	*/
	renderLoading: import_prop_types.default.func,
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
//#region node_modules/@mui/x-date-pickers/dateViewRenderers/dateViewRenderers.mjs
var renderDateViewCalendar = ({ view, onViewChange, views, focusedView, onFocusedViewChange, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear, reduceAnimations, onMonthChange, monthsPerRow, onYearChange, yearsOrder, yearsPerRow, slots, slotProps, loading, renderLoading, disableHighlightToday, readOnly, disabled, showDaysOutsideCurrentMonth, dayOfWeekFormatter, sx, autoFocus, fixedWeekNumber, displayWeekNumber, timezone }) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DateCalendar, {
	view,
	onViewChange,
	views: views.filter(isDatePickerView),
	focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minDate,
	maxDate,
	shouldDisableDate,
	shouldDisableMonth,
	shouldDisableYear,
	reduceAnimations,
	onMonthChange,
	monthsPerRow,
	onYearChange,
	yearsOrder,
	yearsPerRow,
	slots,
	slotProps,
	loading,
	renderLoading,
	disableHighlightToday,
	readOnly,
	disabled,
	showDaysOutsideCurrentMonth,
	dayOfWeekFormatter,
	sx,
	autoFocus,
	fixedWeekNumber,
	displayWeekNumber,
	timezone
});
renderDateViewCalendar.displayName = "renderDateViewCalendar";
//#endregion
export { validateDate as i, useApplyDefaultValuesToDateValidationProps as n, useDateManager as r, renderDateViewCalendar as t };

//# sourceMappingURL=dateViewRenderers-BcnUXFC0.js.map