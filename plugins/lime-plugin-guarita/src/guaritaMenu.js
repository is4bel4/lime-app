import { Trans } from "@lingui/macro";

import { CalendarIcon } from "components/icons/teenny/calendar";

const GuaritaMenu = () => (
    <span>
        <CalendarIcon />
        <a href={"#/internetcontrol"}>
            <Trans>Internet Control</Trans>
        </a>
    </span>
);

export default GuaritaMenu;
