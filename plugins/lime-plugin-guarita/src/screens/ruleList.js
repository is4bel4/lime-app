import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import Loading from "components/loading";

import InternetScheduler from "containers/InternetScheduler";

import style from "../style.less";

const RuleList = () => {
    return (
        <div>
            <InternetScheduler />
        </div>
    );
};

export default RuleList;
