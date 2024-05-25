import { maxTextProvider } from "../../utils/helper";

function MaxTxtLength({ children, maxLength }) {
    const text = maxTextProvider(children, maxLength);

    return text;
}

export default MaxTxtLength;
