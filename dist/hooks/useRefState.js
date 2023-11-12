"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefState = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../utils/utils");
function useRefState(initial) {
    const [renderId, setRenderId] = react_1.default.useState((0, utils_1.uuid)());
    const ref = react_1.default.useRef(initial);
    const setValue = react_1.default.useCallback((value) => {
        ref.current = value;
        setRenderId((0, utils_1.uuid)());
    }, [renderId]);
    const value = react_1.default.useMemo(() => ref.current, [renderId]);
    return react_1.default.useMemo(() => [value, setValue], [renderId]);
}
exports.useRefState = useRefState;
